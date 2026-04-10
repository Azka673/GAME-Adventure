// ===== ANIMALS.JS =====

const AnimalSystem = (() => {
  const TYPES = [
    { e:'🦌', n:'Rusa',       spd:0.65, hp:3, mhp:3, drop:{ e:'🍖', n:'Daging' }, r:20, aggressive:false, atkPct:0 },
    { e:'🐗', n:'Babi Hutan', spd:0.85, hp:5, mhp:5, drop:{ e:'🍖', n:'Daging' }, r:22, aggressive:true,  atkPct:0.20 },
    { e:'🐇', n:'Kelinci',    spd:0.90, hp:1, mhp:1, drop:{ e:'🍖', n:'Daging' }, r:12, aggressive:false, atkPct:0 },
    { e:'🐦', n:'Burung',     spd:0.55, hp:1, mhp:1, drop:null,                  r:10, aggressive:false, atkPct:0 },
    { e:'🐍', n:'Ular',       spd:0.50, hp:2, mhp:2, drop:null,                  r:14, aggressive:true,  atkPct:0.15 },
    { e:'🦊', n:'Rubah',      spd:0.80, hp:2, mhp:2, drop:{ e:'🍖', n:'Daging' }, r:16, aggressive:true,  atkPct:0.15 },
    { e:'🦋', n:'Kupu-kupu',  spd:0.40, hp:1, mhp:1, drop:null,                  r:10, aggressive:false, atkPct:0 },
    // Night enemies
    { e:'🧟', n:'Zombie',     spd:0.40, hp:6, mhp:6, drop:{ e:'🪦', n:'Tulang' }, r:20, aggressive:true,  atkPct:0.25, nightOnly:true, ranged:false },
    { e:'💀', n:'Skeleton',   spd:0.60, hp:4, mhp:4, drop:{ e:'🪦', n:'Tulang' }, r:18, aggressive:true,  atkPct:0.15, nightOnly:true, ranged:true },
    // Boss
    { e:'🦖', n:'T-Rex Purba', spd:0.50, hp:40, mhp:40, drop:{ e:'👑', n:'Mahkota Kuno', c:1 }, r:32, aggressive:true, atkPct:0.30, boss:true, hasSkills:true },
  ];

  let animals = [];
  const nightEnemies = []; // track night enemies untuk easy removal

  function init(count = 14) {
    animals = [];
    nightEnemies.length = 0;
    for (let i = 0; i < count; i++) {
      const t = TYPES.slice(0, 7)[i % 7]; // Only spawn day animals
      animals.push({
        ...t, hp: t.hp,
        x: 80  + Math.random() * 860,
        y: 80  + Math.random() * 860,
        vx: 0, vy: 0,
        dir: Math.random() * Math.PI * 2,
        timer: Math.random() * 120,
        flee: false, fleeTimer: 0,
        atkTimer: 20 + Math.random() * 40,
        alerted: false, alertTimer: 0,
        stunned: false, stunTimer: 0,
        stuckArrows: 0,
        arrowCooldown: 0,
      });
    }
  }

  function spawnNightEnemies() {
    // Spawn 4-5 zombies dan 2-3 skeletons
    const zombieCount = 4 + Math.floor(Math.random() * 2);
    const skeletonCount = 2 + Math.floor(Math.random() * 2);
    
    for (let i = 0; i < zombieCount; i++) {
      const t = TYPES[7]; // Zombie
      const newZombie = {
        ...t, hp: t.hp,
        x: 80 + Math.random() * 860,
        y: 80 + Math.random() * 860,
        vx: 0, vy: 0,
        dir: Math.random() * Math.PI * 2,
        timer: Math.random() * 120,
        flee: false, fleeTimer: 0,
        atkTimer: 20 + Math.random() * 40,
        alerted: false, alertTimer: 0,
        stunned: false, stunTimer: 0,
        stuckArrows: 0,
        arrowCooldown: 0,
        nightEnemy: true,
      };
      animals.push(newZombie);
      nightEnemies.push(newZombie);
    }
    
    for (let i = 0; i < skeletonCount; i++) {
      const t = TYPES[8]; // Skeleton
      const newSkeleton = {
        ...t, hp: t.hp,
        x: 80 + Math.random() * 860,
        y: 80 + Math.random() * 860,
        vx: 0, vy: 0,
        dir: Math.random() * Math.PI * 2,
        timer: Math.random() * 120,
        flee: false, fleeTimer: 0,
        atkTimer: 20 + Math.random() * 60, // Longer cooldown for ranged
        alerted: false, alertTimer: 0,
        stunned: false, stunTimer: 0,
        stuckArrows: 0,
        arrowCooldown: 0,
        nightEnemy: true,
      };
      animals.push(newSkeleton);
      nightEnemies.push(newSkeleton);
    }
  }

  function removeNightEnemies() {
    for (const enemy of nightEnemies) {
      const idx = animals.indexOf(enemy);
      if (idx !== -1) animals.splice(idx, 1);
    }
    nightEnemies.length = 0;
  }

  function update() {
    animals.forEach(a => {
      if (a.hp < 0) return;
      
      // Update stun status
      if (a.stunned) {
        a.stunTimer--;
        if (a.stunTimer <= 0) a.stunned = false;
      }
      
      const pd = Utils.dist(Player.x, Player.y, a.x, a.y);
      a.atkTimer = Math.max(0, a.atkTimer - 1);
      if (a.alerted) {
        a.alertTimer--;
        if (a.alertTimer <= 0) a.alerted = false;
      }
      
      // Skeleton ranged attack
      if (a.ranged && a.aggressive && a.alerted && pd < 400 && a.atkTimer <= 0 && !a.stunned) {
        // Skeleton shoots with some inaccuracy
        const targetX = Player.x + (Math.random() - 0.5) * 100; // Random inaccuracy
        const targetY = Player.y + (Math.random() - 0.5) * 100;
        const angle = Math.atan2(targetY - a.y, targetX - a.x);
        const vel = 3.5;
        
        // Create arrow as a world object
        World.objects.push({
          type: 'arrow',
          x: a.x + Math.cos(angle) * 15,
          y: a.y + Math.sin(angle) * 15,
          vx: Math.cos(angle) * vel,
          vy: Math.sin(angle) * vel,
          angle: angle,
          life: 150,
          shooter: a,
        });
        
        Utils.notify(`💘 Skeleton menembak!`, '#ffcc00');
        a.atkTimer = 80 + Math.random() * 40;
      }
      
      // Melee attack - damage adalah persentase dari HP player
      if (a.aggressive && a.alerted && pd < 42 && a.atkTimer <= 0 && !a.stunned && !a.ranged) {
        const damage = Math.max(1, Math.ceil(Player.hp * a.atkPct));
        const actualDamage = Math.ceil(damage * Player.getDamageReduction());
        Player.hp = Math.max(0, Player.hp - actualDamage);
        World.spawnParticles(Player.x, Player.y, '#ff4444', 6);
        Utils.notify(`💢 ${a.n} serang! -${actualDamage} HP`, '#ff5555');
        Utils.showLearningTip('combat');
        Utils.vibrate(30);
        a.atkTimer = 45 + Math.random() * 30;
      }
      
      // Movement
      if (a.flee || pd < 90) {
        a.flee = true;
        a.fleeTimer--;
        const ang = Math.atan2(a.y - Player.y, a.x - Player.x);
        a.vx += Math.cos(ang) * 0.09;
        a.vy += Math.sin(ang) * 0.09;
        if (a.fleeTimer <= 0) a.flee = false;
      } else {
        a.timer--;
        if (a.timer <= 0) {
          a.dir   = Math.random() * Math.PI * 2;
          a.timer = 50 + Math.random() * 130;
        }
        a.vx += Math.cos(a.dir) * 0.025;
        a.vy += Math.sin(a.dir) * 0.025;
      }
      // Friction
      a.vx *= 0.87; a.vy *= 0.87;
      const sv = Math.sqrt(a.vx * a.vx + a.vy * a.vy);
      if (sv > a.spd) { a.vx = a.vx / sv * a.spd; a.vy = a.vy / sv * a.spd; }
      a.x = Utils.clamp(a.x + a.vx, 15, 1585);
      a.y = Utils.clamp(a.y + a.vy, 15, 1585);
    });
  }

  function draw(ctx, ox, oy) {
    animals.forEach(a => {
      if (a.hp < 0) return;
      const sx = a.x + ox, sy = a.y + oy;
      if (sx < -50 || sx > ctx.canvas.width + 50 || sy < -50 || sy > ctx.canvas.height + 50) return;
      // Shadow
      ctx.save();
      ctx.globalAlpha = 0.15;
      ctx.fillStyle   = '#000';
      ctx.beginPath(); ctx.ellipse(sx, sy + a.r * 0.4, a.r * 0.8, a.r * 0.3, 0, 0, Math.PI * 2); ctx.fill();
      ctx.globalAlpha = 1;
      ctx.font = `${a.r * 1.9}px serif`;
      ctx.fillText(a.e, sx - a.r * 0.9, sy + a.r * 0.7);
      // Stuck arrows visual
      if (a.stuckArrows) {
        ctx.strokeStyle = 'rgba(255,255,255,.85)';
        ctx.lineWidth = 2;
        for (let k = 0; k < Math.min(3, a.stuckArrows); k++) {
          const ax = sx + (k - 1) * 6;
          const ay = sy - a.r * 0.2 - k * 4;
          ctx.beginPath();
          ctx.moveTo(ax, ay);
          ctx.lineTo(ax - 10, ay - 6);
          ctx.stroke();
        }
      }
      // HP bar
      if (a.hp < a.mhp && a.hp > 0) {
        ctx.fillStyle = '#222'; ctx.fillRect(sx - 14, sy - a.r - 9, 28, 5);
        ctx.fillStyle = '#f44'; ctx.fillRect(sx - 14, sy - a.r - 9, 28 * (a.hp / a.mhp), 5);
      }
      
      // Stun visual effect
      if (a.stunned) {
        ctx.strokeStyle = 'rgba(255, 220, 100, 0.8)';
        ctx.lineWidth = 2;
        for (let i = 0; i < 4; i++) {
          const angle = (GS.tick * 0.15 + i * Math.PI * 0.5) % (Math.PI * 2);
          const r = a.r + 8 + Math.sin(GS.tick * 0.1) * 3;
          ctx.beginPath();
          ctx.arc(sx, sy, r, angle, angle + Math.PI * 0.3);
          ctx.stroke();
        }
        ctx.fillStyle = 'rgba(255, 220, 100, 0.4)';
        ctx.font = '20px sans-serif';
        ctx.fillText('⭐', sx - 8, sy - a.r - 15);
      }
      ctx.restore();
    });
  }

  function stun(animal, duration) {
    animal.stunned = true;
    animal.stunTimer = duration;
    animal.vx = 0;
    animal.vy = 0;
  }

  return {
    get animals() { return animals; },
    init,
    update,
    draw,
    stun,
    spawnNightEnemies,
    removeNightEnemies,
  };
})();
