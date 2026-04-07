// ===== PLAYER.JS =====

const Player = {
  x: 200, y: 200,
  hp: 100, hunger: 100, stamina: 100,
  speed: 2.2, facing: 0,
  sprintOn: false,
  atkAnim: 0, atkCooldown: 0,
  equipped: null, // emoji of equipped item (weapon)
  projectiles: [],

  reset() {
    this.x = 200; this.y = 200;
    this.hp = 100; this.hunger = 100; this.stamina = 100;
    this.facing = 0; this.sprintOn = false;
    this.atkAnim = 0; this.atkCooldown = 0;
    this.equipped = null;
    this.projectiles = [];
  },

  // ---- Weapon definitions ----
  WEAPONS: {
    '⚔': { name: 'Pedang', dmg: 1, range: 68, cooldown: 22, atkAnim: 15, vfx: 'sword' },
    '🪓': { name: 'Kapak',  dmg: 2, range: 62, cooldown: 28, atkAnim: 16, vfx: 'axe'   },
    '🏹': { name: 'Busur',  dmg: 1, range: 520, cooldown: 34, atkAnim: 10, vfx: 'bow'   },
  },

  equip(emoji) {
    if (!this.WEAPONS[emoji]) return false;
    this.equipped = (this.equipped === emoji) ? null : emoji;
    Utils.notify(this.equipped ? `🧤 Equip: ${emoji}` : '🧤 Unequip', '#cc88ff');
    return true;
  },

  update(jDx, jDy, keys) {
    // Movement input
    let dx = jDx || 0, dy = jDy || 0;
    if (keys['ArrowLeft']  || keys['KeyA']) dx -= 1;
    if (keys['ArrowRight'] || keys['KeyD']) dx += 1;
    if (keys['ArrowUp']    || keys['KeyW']) dy -= 1;
    if (keys['ArrowDown']  || keys['KeyS']) dy += 1;

    const moving   = Math.abs(dx) > 0.05 || Math.abs(dy) > 0.05;
    const sprinting = this.sprintOn && moving && this.stamina > 3;
    const spd      = this.speed * (sprinting ? 1.9 : 1);

    if (moving) {
      const len = Math.sqrt(dx * dx + dy * dy);
      this.x += dx / len * spd;
      this.y += dy / len * spd;
      this.facing = Math.atan2(dy, dx);
    }

    // Stamina
    if (sprinting) this.stamina = Math.max(0, this.stamina - 1.1);
    else           this.stamina = Math.min(100, this.stamina + 0.5);

    // Bounds
    this.x = Utils.clamp(this.x, 15, 985);
    this.y = Utils.clamp(this.y, 15, 985);

    // Hunger / HP drain
    // 5% per detik (≈60 tick/detik)
    if (GS.tick % 60 === 0)  this.hunger = Math.max(0, this.hunger - 5);
    if (this.hunger === 0 && GS.tick % 200 === 0) this.hp = Math.max(0, this.hp - 1);
    if (this.hunger > 60  && GS.tick % 700 === 0) this.hp = Math.min(100, this.hp + 1);

    // Attack cooldown / anim
    if (this.atkCooldown > 0) this.atkCooldown--;
    if (this.atkAnim > 0)     this.atkAnim--;

    // HUD bars
    document.getElementById('hpF').style.width = this.hp      + '%';
    document.getElementById('huF').style.width = this.hunger  + '%';
    document.getElementById('stF').style.width = this.stamina + '%';
  },

  updateProjectiles() {
    if (!this.projectiles.length) return;
    for (let i = this.projectiles.length - 1; i >= 0; i--) {
      const p = this.projectiles[i];
      if (p.stuck && p.target) {
        // follow animal
        if (p.target.hp < 0) { this.projectiles.splice(i, 1); continue; }
        p.x = p.target.x + p.ox;
        p.y = p.target.y + p.oy;
        p.life--;
        if (p.life <= 0) this.projectiles.splice(i, 1);
        continue;
      }

      p.x += p.vx;
      p.y += p.vy;
      p.life--;
      if (p.life <= 0 || p.x < 0 || p.y < 0 || p.x > 1000 || p.y > 1000) {
        this.projectiles.splice(i, 1);
        continue;
      }

      // hit animals
      for (const a of AnimalSystem.animals) {
        if (a.hp < 0) continue;
        if (Utils.dist(p.x, p.y, a.x, a.y) < (a.r || 18)) {
          a.hp -= p.dmg;
          a.flee = true; a.fleeTimer = 160;
          World.spawnParticles(a.x, a.y, '#ffcc00', 3);
          if (a.hp <= 0 && a.drop) { Inventory.add(a.drop.e, a.drop.n); a.hp = -999; }
          // stick arrow
          a.stuckArrows = (a.stuckArrows || 0) + 1;
          p.stuck = true;
          p.target = a;
          p.ox = (Math.random() - 0.5) * 10;
          p.oy = (Math.random() - 0.5) * 10;
          p.vx = 0; p.vy = 0;
          p.life = 120; // stick duration
          break;
        }
      }
    }
  },

  drawProjectiles(ctx, ox, oy) {
    if (!this.projectiles.length) return;
    ctx.save();
    this.projectiles.forEach(p => {
      const sx = p.x + ox, sy = p.y + oy;
      ctx.globalAlpha = 0.9;
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(sx, sy);
      ctx.lineTo(sx - Math.cos(p.ang) * 10, sy - Math.sin(p.ang) * 10);
      ctx.stroke();
      ctx.fillStyle = '#ffcc00';
      ctx.beginPath();
      ctx.arc(sx, sy, 2.2, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.restore();
  },

  attack() {
    if (this.atkCooldown > 0) return;
    const w = this.equipped && this.WEAPONS[this.equipped] ? this.WEAPONS[this.equipped] : this.WEAPONS['⚔'];
    this.atkCooldown = w.cooldown;
    this.atkAnim     = w.atkAnim;
    _showWeaponVFX(w.vfx, this.x, this.y, this.facing);
    Utils.vibrate(25);

    // Bow shoots projectile
    if (w.vfx === 'bow') {
      const spd = 8.2;
      const ang = this.facing;
      this.projectiles.push({
        type: 'arrow',
        x: this.x + Math.cos(ang) * 16,
        y: this.y + Math.sin(ang) * 16,
        vx: Math.cos(ang) * spd,
        vy: Math.sin(ang) * spd,
        ang,
        dmg: w.dmg,
        life: 120,
        stuck: false,
        target: null,
        ox: 0, oy: 0,
      });
      return;
    }

    // Hit game objects
    World.objects.forEach(obj => {
      if (obj.hp === undefined || obj.hp < 0) return;
      const r = w.range;
      if (Utils.dist(obj.x, obj.y, Player.x, Player.y) < r) {
        // Axe is better for trees
        const dmg = (w.vfx === 'axe' && obj.type === 'tree') ? 2 : w.dmg;
        obj.hp -= dmg;
        World.spawnParticles(obj.x, obj.y, obj.type === 'tree' ? '#44dd88' : '#aaaaaa', 4);
        if (obj.hp <= 0) {
          Inventory.add(obj.drop.e, obj.drop.n, obj.drop.c);
          World.spawnBurst(obj.x, obj.y, obj.type === 'tree' ? '#44dd88' : '#888888');
          obj.hp = -999;
          MissionSystem.check();
        }
      }
    });

    // Hit animals
    AnimalSystem.animals.forEach(a => {
      if (a.hp < 0) return;
      if (Utils.dist(a.x, a.y, Player.x, Player.y) < w.range) {
        a.hp -= w.dmg;
        a.flee = true; a.fleeTimer = 120;
        World.spawnParticles(a.x, a.y, '#ff4444', 3);
        if (a.hp <= 0 && a.drop) {
          Inventory.add(a.drop.e, a.drop.n);
          a.hp = -999;
        }
      }
    });
  },

  interact() {
    if (Dialog.isOpen()) { Dialog.next(); return; }

    // NPC proximity
    for (const npc of NPCSystem.npcs) {
      if (Utils.dist(npc.x, npc.y, Player.x, Player.y) < 65) {
        NPCSystem.startDialog(npc);
        return;
      }
    }

    // Chest
    for (const obj of World.objects) {
      if (obj.type === 'chest' && !obj.opened && Utils.dist(obj.x, obj.y, Player.x, Player.y) < 55) {
        obj.opened = true;
        Inventory.add(obj.drop.e, obj.drop.n, obj.drop.c);
        MissionSystem.check();
        return;
      }
    }

    // Dimension portal
    for (const obj of World.objects) {
      if (obj.type === 'dimension' && Utils.dist(obj.x, obj.y, Player.x, Player.y) < 70) {
        Dimension.enter(obj.dimId);
        return;
      }
    }

    // Secret zone
    if (Player.x > 880 && Player.y > 740 && !GS.secretFound) {
      GS.secretFound = true;
      Utils.notify('🌀 Area Rahasia Ditemukan!', '#cc88ff');
      MissionSystem.check();
      return;
    }

    // Fallback: quiz
    if (GS.quizAnswered < 10) QuizSystem.trigger();
  },
};

function _showWeaponVFX(kind, wx, wy, angle) {
  if (kind === 'axe') return _showAxeVFX(wx, wy, angle);
  if (kind === 'bow') return _showBowVFX(wx, wy, angle);
  return _showSwordVFX(wx, wy, angle);
}

function _showBowVFX(wx, wy, angle) {
  // quick glow pulse at center (UI overlay)
  const vfx = document.getElementById('swordVFX');
  const cvs = document.getElementById('gc');
  const cx  = cvs.width / 2;
  const cy  = cvs.height / 2;
  vfx.style.left    = cx + 'px';
  vfx.style.top     = cy + 'px';
  vfx.style.display = 'block';
  vfx.innerHTML     = '';

  const ring = document.createElement('div');
  ring.style.cssText = `
    position:absolute; width:70px; height:70px;
    border:3px solid rgba(255,200,0,.7); border-radius:50%;
    top:-35px; left:-35px;
    box-shadow:0 0 25px rgba(255,200,0,.7), 0 0 60px rgba(255,200,0,.25);
    animation:bowPulse .22s ease-out forwards;`;
  vfx.appendChild(ring);

  if (!document.getElementById('bowPulseStyle')) {
    const st = document.createElement('style');
    st.id = 'bowPulseStyle';
    st.textContent = '@keyframes bowPulse{0%{transform:scale(.5);opacity:1;}100%{transform:scale(1.7);opacity:0;}}';
    document.head.appendChild(st);
  }
  setTimeout(() => { vfx.style.display = 'none'; vfx.innerHTML = ''; }, 260);
}

function _showAxeVFX(wx, wy, angle) {
  const vfx = document.getElementById('swordVFX');
  const cvs = document.getElementById('gc');
  const cx  = cvs.width / 2;
  const cy  = cvs.height / 2;
  vfx.style.left    = cx + 'px';
  vfx.style.top     = cy + 'px';
  vfx.style.display = 'block';
  vfx.innerHTML     = '';

  const arc = document.createElement('div');
  arc.style.cssText = `
    position:absolute; width:90px; height:90px;
    border:3px solid rgba(80,255,160,0.55); border-radius:50%;
    top:-45px; left:-45px;
    filter:drop-shadow(0 0 18px rgba(80,255,160,0.55));
    animation:axeArc .26s ease-out forwards;`;
  vfx.appendChild(arc);

  if (!document.getElementById('axeArcStyle')) {
    const st = document.createElement('style');
    st.id = 'axeArcStyle';
    st.textContent = '@keyframes axeArc{0%{transform:scale(.3) rotate(-10deg);opacity:1;}100%{transform:scale(1.9) rotate(15deg);opacity:0;}}';
    document.head.appendChild(st);
  }
  setTimeout(() => { vfx.style.display = 'none'; vfx.innerHTML = ''; }, 300);
}

function _showSwordVFX(wx, wy, angle) {
  const vfx = document.getElementById('swordVFX');
  const cvs = document.getElementById('gc');
  const cx  = cvs.width / 2;
  const cy  = cvs.height / 2;
  vfx.style.left    = cx + 'px';
  vfx.style.top     = cy + 'px';
  vfx.style.display = 'block';
  vfx.innerHTML     = '';

  for (let i = 0; i < 12; i++) {
    const s   = document.createElement('div');
    const a   = (i / 12) * 360;
    const len = 16 + Math.random() * 36;
    s.style.cssText = `
      position:absolute; width:3px; height:${len}px;
      background:linear-gradient(0deg,transparent,#00ffcc,#fff);
      border-radius:2px; transform-origin:bottom center;
      transform:rotate(${a}deg) translateY(-${len / 2}px);
      left:-1px; top:-${len}px;
      transition: opacity .3s;`;
    vfx.appendChild(s);
  }

  // Arc flash
  const arc = document.createElement('div');
  arc.style.cssText = `
    position:absolute; width:80px; height:80px;
    border:3px solid rgba(0,255,200,0.6); border-radius:50%;
    top:-40px; left:-40px;
    animation:swordArc .25s ease-out forwards;`;
  vfx.appendChild(arc);

  if (!document.getElementById('swordArcStyle')) {
    const st = document.createElement('style');
    st.id = 'swordArcStyle';
    st.textContent = '@keyframes swordArc{0%{transform:scale(0);opacity:1;}100%{transform:scale(2);opacity:0;}}';
    document.head.appendChild(st);
  }

  setTimeout(() => {
    vfx.querySelectorAll('div').forEach(s => s.style.opacity = '0');
  }, 120);
  setTimeout(() => {
    vfx.style.display = 'none';
    vfx.innerHTML = '';
  }, 420);
}
