// ===== PLAYER.JS =====

const Player = {
  x: 200, y: 200,
  hp: 100, maxHp: 100, hunger: 100, stamina: 100,
  speed: 3.5, facing: 0,
  sprintOn: false,
  atkAnim: 0, atkCooldown: 0,
  equipped: null,
  armor: null,
  shield: null,
  shieldDurability: 0,
  projectiles: [],
  skillCooldown: 0,
  skillActive: false,
  stuckArrows: 0,

  reset() {
    this.x = 200; this.y = 200;
    this.hp = 100; this.maxHp = 100; this.hunger = 100; this.stamina = 100;
    this.facing = 0; this.sprintOn = false;
    this.atkAnim = 0; this.atkCooldown = 0;
    this.equipped = null;
    this.armor = null;
    this.shield = null;
    this.shieldDurability = 0;
    this.projectiles = [];
    this.skillCooldown = 0;
    this.skillActive = false;
    this.stuckArrows = 0;
  },

  WEAPONS: {
    '⚔': {
      name: 'Pedang', dmg: 1, range: 68, cooldown: 22, atkAnim: 15, vfx: 'sword',
      skill: 'SWEEP', skillDesc: '⚡ Sweep: Serang radius lebar, hit multiple enemies',
      skillCooldown: 60, skillRadius: 120
    },
    '🪓': {
      name: 'Kapak',  dmg: 2, range: 62, cooldown: 28, atkAnim: 16, vfx: 'axe',
      skill: 'HEAVY', skillDesc: '💥 Heavy Hit: Damage 3x lebih besar, stun musuh',
      skillCooldown: 80, skillStunDuration: 40
    },
    '🏹': {
      name: 'Busur',  dmg: 1, range: 520, cooldown: 34, atkAnim: 10, vfx: 'bow',
      skill: 'PIERCING', skillDesc: '💫 Piercing Shot: Tembus 2 musuh',
      skillCooldown: 70, piercingCount: 2
    },
  },

  ARMORS: {
    '🛡': { name: 'Perisai Kayu', def: 0.85, desc: 'Mengurangi 15% damage', hpBonus: 150 },
    '🧥': { name: 'Baju Kulit',   def: 0.80, desc: 'Mengurangi 20% damage', hpBonus: 150 },
    '🪨': { name: 'Mantel Batu',  def: 0.75, desc: 'Mengurangi 25% damage', hpBonus: 150 },
    '🔔': { name: 'Baju Besi',    def: 0.70, desc: 'Mengurangi 30% damage - ARMOR TERBAIK!', hpBonus: 200 },
  },

  SHIELDS: {
    '🔰':  { name: 'Perisai Kayu', maxDur: 50,  blockChance: 0.6 },
    '🛡️': { name: 'Perisai Besi', maxDur: 100, blockChance: 0.7 },
  },

  equip(emoji) {
    if (!this.WEAPONS[emoji]) return false;
    this.equipped = (this.equipped === emoji) ? null : emoji;
    Utils.notify(this.equipped ? `🧤 Equip: ${emoji}` : '🧤 Unequip', '#cc88ff');
    return true;
  },

  equipArmor(emoji) {
    if (!this.ARMORS[emoji]) return false;
    if (this.armor === emoji) {
      this.maxHp = 100;
      this.hp = Math.min(this.hp, this.maxHp);
      this.armor = null;
      Utils.notify('🛡 Remove Armor', '#ffaa00');
    } else {
      const armor = this.ARMORS[emoji];
      this.armor = emoji;
      this.maxHp = armor.hpBonus;
      this.hp = Math.min(this.hp, this.maxHp);
      Utils.notify(`🛡 Armor: ${emoji} ${armor.desc} | +${armor.hpBonus} Max HP`, '#ffaa00');
    }
    return true;
  },

  equipShield(emoji) {
    if (!this.SHIELDS[emoji]) return false;
    if (this.shield === emoji) {
      this.shield = null;
      this.shieldDurability = 0;
      Utils.notify('🔰 Shield removed', '#ff8844');
    } else {
      this.shield = emoji;
      this.shieldDurability = this.SHIELDS[emoji].maxDur;
      Utils.notify(`🔰 Shield equipped: ${emoji} (${this.shieldDurability} durability)`, '#ff8844');
    }
    return true;
  },

  attemptShieldBlock(damage) {
    if (!this.shield || !this.SHIELDS[this.shield] || this.shieldDurability <= 0) return false;
    const shield = this.SHIELDS[this.shield];
    if (Math.random() > shield.blockChance) return false;
    this.shieldDurability -= Math.ceil(damage * 0.3);
    Utils.notify(`🔰 Shield blocks! (${Math.max(0, this.shieldDurability)} dur)`, '#88ff88');
    Utils.vibrate([20, 10, 20]);
    if (this.shieldDurability <= 0) {
      Utils.notify(`💔 Shield is destroyed!`, '#ff0000');
      this.shield = null;
      this.shieldDurability = 0;
    }
    return true;
  },

  getDamageReduction() {
    if (!this.armor || !this.ARMORS[this.armor]) return 1.0;
    return this.ARMORS[this.armor].def;
  },

  activateSkill() {
    if (!this.equipped || !this.WEAPONS[this.equipped]) return;
    if (this.skillCooldown > 0) return;
    const weapon = this.WEAPONS[this.equipped];
    const skill  = weapon.skill;
    if (skill === 'SWEEP')         this._skillSweep(weapon);
    else if (skill === 'HEAVY')    this._skillHeavy(weapon);
    else if (skill === 'PIERCING') this._skillPiercing(weapon);
    this.skillCooldown = weapon.skillCooldown;
  },

  _skillSweep(weapon) {
    Utils.notify(`⚡ SWEEP ATTACK!`, '#ffff00');
    World.spawnBurst(this.x, this.y, GS.flashEpilepsy ? '#666666' : '#ffff00');
    for (const animal of AnimalSystem.animals) {
      if (animal.hp < 0) continue;
      if (Utils.dist(this.x, this.y, animal.x, animal.y) < weapon.skillRadius) {
        if (!animal.nightEnemy) { animal.alerted = true; animal.alertTimer = 120; }
        animal.hp -= weapon.dmg;
        World.spawnParticles(animal.x, animal.y, '#ffff00', 5);
        if (animal.hp <= 0) Inventory.add(animal.drop.e, animal.drop.n, animal.drop.c);
        animal.hp = -999;
      }
    }
  },

  _skillHeavy(weapon) {
    Utils.notify(`💥 HEAVY HIT!`, '#ff6600');
    for (const animal of AnimalSystem.animals) {
      if (animal.hp < 0) continue;
      if (Utils.dist(this.x, this.y, animal.x, animal.y) < weapon.range) {
        if (!animal.nightEnemy) { animal.alerted = true; animal.alertTimer = 120; }
        const dmg = weapon.dmg * 3;
        animal.hp -= dmg;
        World.spawnParticles(animal.x, animal.y, '#ff6600', 6);
        AnimalSystem.stun(animal, weapon.skillStunDuration);
        if (animal.hp <= 0) Inventory.add(animal.drop.e, animal.drop.n, animal.drop.c);
        animal.hp = -999;
      }
    }
  },

  _skillPiercing(weapon) {
    Utils.notify(`💫 PIERCING SHOT!`, '#88ffff');
    let hitCount = 0;
    for (const animal of AnimalSystem.animals) {
      if (animal.hp < 0) continue;
      if (hitCount >= weapon.piercingCount) break;
      if (Utils.dist(this.x, this.y, animal.x, animal.y) < weapon.range * 1.5) {
        if (!animal.nightEnemy) { animal.alerted = true; animal.alertTimer = 120; }
        animal.hp -= weapon.dmg * 2;
        World.spawnParticles(animal.x, animal.y, '#88ffff', 4);
        if (animal.hp <= 0) Inventory.add(animal.drop.e, animal.drop.n, animal.drop.c);
        animal.hp = -999;
        hitCount++;
      }
    }
  },

  update(jDx, jDy, keys) {
    if (this.skillCooldown > 0) this.skillCooldown--;

    let dx = jDx || 0, dy = jDy || 0;
    if (keys['ArrowLeft']  || keys['KeyA']) dx -= 1;
    if (keys['ArrowRight'] || keys['KeyD']) dx += 1;
    if (keys['ArrowUp']    || keys['KeyW']) dy -= 1;
    if (keys['ArrowDown']  || keys['KeyS']) dy += 1;

    const moving    = Math.abs(dx) > 0.05 || Math.abs(dy) > 0.05;
    const sprinting = this.sprintOn && moving && this.stamina > 3;
    const spd       = this.speed * (sprinting ? 2.8 : 1);

    if (moving) {
      const len = Math.sqrt(dx * dx + dy * dy);
      this.x += dx / len * spd;
      this.y += dy / len * spd;
      this.facing = Math.atan2(dy, dx);
    }

    if (GS.returnAnim) {
      this.y += 10;
      if (this.y >= 200) {
        GS.returnAnim = false;
        this.y = 200;
        World.spawnBurst(this.x, this.y, GS.flashEpilepsy ? '#444444' : '#00ffcc');
      }
    }

    // Sprint drain lebih pelan, regen lebih cepat — cocok untuk map besar
    if (sprinting) this.stamina = Math.max(0,   this.stamina - 0.6);
    else           this.stamina = Math.min(100,  this.stamina + 1.8);

    // Batas hanya di tepi map 2400x2400 — tidak ada barrier antar zona
    this.x = Utils.clamp(this.x, 15, 2385);
    this.y = Utils.clamp(this.y, 15, 2385);

    if (GS.tick % 60  === 0) this.hunger = Math.max(0,   this.hunger - 1);
    if (this.hunger === 0 && GS.tick % 200 === 0) this.hp = Math.max(0,   this.hp - 1);
    if (this.hunger > 60  && GS.tick % 700 === 0) this.hp = Math.min(100, this.hp + 1);

    if (this.atkCooldown > 0) this.atkCooldown--;
    if (this.atkAnim     > 0) this.atkAnim--;

    document.getElementById('hpF').style.width = this.hp      + '%';
    document.getElementById('huF').style.width = this.hunger  + '%';
    document.getElementById('stF').style.width = this.stamina + '%';
  },

  updateProjectiles() {
    if (!this.projectiles.length) return;
    for (let i = this.projectiles.length - 1; i >= 0; i--) {
      const p = this.projectiles[i];
      if (p.stuck && p.target) {
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

      if (p.life <= 0 || p.x < 0 || p.y < 0 || p.x > 2400 || p.y > 2400) {
        this.projectiles.splice(i, 1);
        continue;
      }

      for (const a of AnimalSystem.animals) {
        if (a.hp < 0) continue;
        if (Utils.dist(p.x, p.y, a.x, a.y) < (a.r || 18)) {
          a.hp -= p.dmg;
          a.flee = true; a.fleeTimer = 160;
          a.alerted = true; a.alertTimer = 160;
          World.spawnParticles(a.x, a.y, '#ffcc00', 3);
          if (a.hp <= 0 && a.drop) { Inventory.add(a.drop.e, a.drop.n); a.hp = -999; }
          a.stuckArrows = (a.stuckArrows || 0) + 1;
          p.stuck  = true;
          p.target = a;
          p.ox = (Math.random() - 0.5) * 10;
          p.oy = (Math.random() - 0.5) * 10;
          p.vx = 0; p.vy = 0;
          p.life = 120;
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
      ctx.lineWidth   = 2;
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
    const w = this.equipped && this.WEAPONS[this.equipped]
      ? this.WEAPONS[this.equipped]
      : this.WEAPONS['⚔'];
    this.atkCooldown = w.cooldown;
    this.atkAnim     = w.atkAnim;
    _showWeaponVFX(w.vfx, this.x, this.y, this.facing);
    Utils.vibrate(25);

    if (w.vfx === 'bow') {
      const spd = 8.2;
      const ang = this.facing;
      this.projectiles.push({
        type: 'arrow',
        x: this.x + Math.cos(ang) * 16,
        y: this.y + Math.sin(ang) * 16,
        vx: Math.cos(ang) * spd,
        vy: Math.sin(ang) * spd,
        ang, dmg: w.dmg, life: 120,
        stuck: false, target: null, ox: 0, oy: 0,
      });
      return;
    }

    World.objects.forEach(obj => {
      if (obj.hp === undefined || obj.hp < 0) return;
      const r = w.range;
      if (Utils.dist(obj.x, obj.y, Player.x, Player.y) < r) {
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

    AnimalSystem.animals.forEach(a => {
      if (a.hp < 0) return;
      if (Utils.dist(a.x, a.y, Player.x, Player.y) < w.range) {
        a.hp -= w.dmg;
        a.flee = true; a.fleeTimer = 120;
        a.alerted = true; a.alertTimer = 160;
        World.spawnParticles(a.x, a.y, '#ff4444', 3);
        if (a.hp <= 0 && a.drop) {
          Inventory.add(a.drop.e, a.drop.n);
          a.hp = -999;
        }
      }
    });
  },

  quiz() {
    if (Dialog.isOpen()) { Dialog.next(); return; }
    if (GS.quizAnswered < 15) QuizSystem.trigger();
    else Utils.notify('Semua soal sudah selesai.', '#00ffcc');
  },

  interact() {
    if (Dialog.isOpen()) { Dialog.next(); return; }

    for (const obj of World.objects) {
      if (obj.type === 'portal' && obj.isSecret && Utils.dist(obj.x, obj.y, Player.x, Player.y) < 70) {
        SecretSystem.interactPortal();
        return;
      }
    }

    for (const obj of World.objects) {
      if (obj.type === 'chest' && !obj.opened && Utils.dist(obj.x, obj.y, Player.x, Player.y) < 55) {
        obj.opened = true;
        const secretKeyItem = SecretSystem.initSecretKey();
        if (secretKeyItem) {
          Inventory.add(secretKeyItem.e, secretKeyItem.n, secretKeyItem.c);
          SecretSystem.onKeyPickup();
          Dialog.show('Kunci Rahasia', '🔑', StoryDialogs.secretKey, null);
        } else {
          Inventory.add(obj.drop.e, obj.drop.n, obj.drop.c);
        }
        MissionSystem.check();
        Utils.showLearningTip();
        return;
      }
    }

    for (const obj of World.objects) {
      if (obj.type === 'dimension' && Utils.dist(obj.x, obj.y, Player.x, Player.y) < 70) {
        Dimension.enter(obj.dimId);
        return;
      }
    }

    for (const obj of World.objects) {
      if (obj.type === 'secret' && Utils.dist(obj.x, obj.y, Player.x, Player.y) < 80) {
        Utils.notify('Area rahasia terkunci. Coba celah dimensi lain.', '#ffcc00');
        return;
      }
    }

    Utils.notify('Tidak ada portal/peti/area rahasia di dekatmu.', '#778');
  },

  talk() {
    if (Dialog.isOpen()) { Dialog.next(); return; }
    for (const npc of NPCSystem.npcs) {
      if (Utils.dist(npc.x, npc.y, Player.x, Player.y) < 65) {
        NPCSystem.startDialog(npc);
        return;
      }
    }
    Utils.notify('Tidak ada NPC di dekatmu.', '#778');
  },
};

function _showWeaponVFX(kind, wx, wy, angle) {
  if (kind === 'axe') return _showAxeVFX(wx, wy, angle);
  if (kind === 'bow') return _showBowVFX(wx, wy, angle);
  return _showSwordVFX(wx, wy, angle);
}

function _showBowVFX(wx, wy, angle) {
  const vfx = document.getElementById('swordVFX');
  const cvs = document.getElementById('gc');
  const cx  = cvs.width / 2, cy = cvs.height / 2;
  vfx.style.left = cx + 'px'; vfx.style.top = cy + 'px';
  vfx.style.display = 'block'; vfx.innerHTML = '';
  const ring = document.createElement('div');
  ring.style.cssText = `
    position:absolute;width:70px;height:70px;
    border:3px solid rgba(255,200,0,.7);border-radius:50%;
    top:-35px;left:-35px;
    box-shadow:0 0 25px rgba(255,200,0,.7),0 0 60px rgba(255,200,0,.25);
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
  const cx  = cvs.width / 2, cy = cvs.height / 2;
  vfx.style.left = cx + 'px'; vfx.style.top = cy + 'px';
  vfx.style.display = 'block'; vfx.innerHTML = '';
  const arc = document.createElement('div');
  arc.style.cssText = `
    position:absolute;width:90px;height:90px;
    border:3px solid rgba(80,255,160,0.55);border-radius:50%;
    top:-45px;left:-45px;
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
  const cx  = cvs.width / 2, cy = cvs.height / 2;
  vfx.style.left = cx + 'px'; vfx.style.top = cy + 'px';
  vfx.style.display = 'block'; vfx.innerHTML = '';
  for (let i = 0; i < 12; i++) {
    const s   = document.createElement('div');
    const a   = (i / 12) * 360;
    const len = 16 + Math.random() * 36;
    s.style.cssText = `
      position:absolute;width:3px;height:${len}px;
      background:linear-gradient(0deg,transparent,#00ffcc,#fff);
      border-radius:2px;transform-origin:bottom center;
      transform:rotate(${a}deg) translateY(-${len/2}px);
      left:-1px;top:-${len}px;transition:opacity .3s;`;
    vfx.appendChild(s);
  }
  const arc = document.createElement('div');
  arc.style.cssText = `
    position:absolute;width:80px;height:80px;
    border:3px solid rgba(0,255,200,0.6);border-radius:50%;
    top:-40px;left:-40px;
    animation:swordArc .25s ease-out forwards;`;
  vfx.appendChild(arc);
  if (!document.getElementById('swordArcStyle')) {
    const st = document.createElement('style');
    st.id = 'swordArcStyle';
    st.textContent = '@keyframes swordArc{0%{transform:scale(0);opacity:1;}100%{transform:scale(2);opacity:0;}}';
    document.head.appendChild(st);
  }
  setTimeout(() => { vfx.querySelectorAll('div').forEach(s => s.style.opacity = '0'); }, 120);
  setTimeout(() => { vfx.style.display = 'none'; vfx.innerHTML = ''; }, 420);
}