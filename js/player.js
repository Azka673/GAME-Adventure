// ===== PLAYER.JS =====

const Player = {
  x: 200, y: 200,
  hp: 100, hunger: 100, stamina: 100,
  speed: 2.2, facing: 0,
  sprintOn: false,
  atkAnim: 0, atkCooldown: 0,

  reset() {
    this.x = 200; this.y = 200;
    this.hp = 100; this.hunger = 100; this.stamina = 100;
    this.facing = 0; this.sprintOn = false;
    this.atkAnim = 0; this.atkCooldown = 0;
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
    if (GS.tick % 320 === 0)  this.hunger = Math.max(0, this.hunger - 1);
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

  attack() {
    if (this.atkCooldown > 0) return;
    this.atkCooldown = 22;
    this.atkAnim     = 15;
    _showSwordVFX(this.x, this.y, this.facing);
    Utils.vibrate(25);

    // Hit game objects
    World.objects.forEach(obj => {
      if (obj.hp === undefined || obj.hp < 0) return;
      if (Utils.dist(obj.x, obj.y, Player.x, Player.y) < 68) {
        obj.hp--;
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
      if (Utils.dist(a.x, a.y, Player.x, Player.y) < 60) {
        a.hp--;
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
