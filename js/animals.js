// ===== ANIMALS.JS =====

const AnimalSystem = (() => {
  const TYPES = [
    { e:'🦌', n:'Rusa',       spd:0.65, hp:3, mhp:3, drop:{ e:'🍖', n:'Daging' }, r:20 },
    { e:'🐗', n:'Babi Hutan', spd:0.85, hp:5, mhp:5, drop:{ e:'🍖', n:'Daging' }, r:22 },
    { e:'🐇', n:'Kelinci',    spd:0.90, hp:1, mhp:1, drop:{ e:'🍖', n:'Daging' }, r:12 },
    { e:'🐦', n:'Burung',     spd:0.55, hp:1, mhp:1, drop:null,                  r:10 },
    { e:'🐍', n:'Ular',       spd:0.50, hp:2, mhp:2, drop:null,                  r:14 },
    { e:'🦊', n:'Rubah',      spd:0.80, hp:2, mhp:2, drop:{ e:'🍖', n:'Daging' }, r:16 },
    { e:'🦋', n:'Kupu-kupu',  spd:0.40, hp:1, mhp:1, drop:null,                  r:10 },
  ];

  let animals = [];

  function init(count = 14) {
    animals = [];
    for (let i = 0; i < count; i++) {
      const t = TYPES[i % TYPES.length];
      animals.push({
        ...t, hp: t.hp,
        x: 80  + Math.random() * 860,
        y: 80  + Math.random() * 860,
        vx: 0, vy: 0,
        dir: Math.random() * Math.PI * 2,
        timer: Math.random() * 120,
        flee: false, fleeTimer: 0,
      });
    }
  }

  function update() {
    animals.forEach(a => {
      if (a.hp < 0) return;
      const pd = Utils.dist(Player.x, Player.y, a.x, a.y);
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
      a.x = Utils.clamp(a.x + a.vx, 15, 985);
      a.y = Utils.clamp(a.y + a.vy, 15, 985);
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
      // HP bar
      if (a.hp < a.mhp && a.hp > 0) {
        ctx.fillStyle = '#222'; ctx.fillRect(sx - 14, sy - a.r - 9, 28, 5);
        ctx.fillStyle = '#f44'; ctx.fillRect(sx - 14, sy - a.r - 9, 28 * (a.hp / a.mhp), 5);
      }
      ctx.restore();
    });
  }

  return { animals, init, update, draw };
})();
