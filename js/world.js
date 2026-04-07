// ===== WORLD.JS =====

const World = (() => {
  let objects  = [];
  let particles= [];
  let cam      = { x: 200, y: 200 };
  const ZONES  = ["🌲 Hutan Paleolitikum","🌿 Padang Mesolitikum","🌾 Ladang Neolitikum","🗿 Bukit Megalitikum","🔨 Tambang Perundagian","🌀 Area Rahasia"];

  function init() {
    objects   = [];
    particles = [];

    // Trees
    [[80,80],[200,60],[350,90],[520,70],[150,280],[610,270],[390,340],[720,140],[50,390],
     [820,390],[240,490],[660,490],[920,290],[110,590],[760,590],[400,690],[210,740],
     [610,740],[900,680],[50,680],[460,180],[290,380],[740,440],[130,740],[560,180]
    ].forEach(([x,y]) => objects.push({ type:'tree', x, y, hp:3, mhp:3, r:22, drop:{e:'🪵',n:'Kayu',c:2} }));

    // Rocks
    [[310,190],[460,170],[610,140],[100,490],[410,470],[710,410],[260,640],[560,610],
     [820,540],[920,190],[360,590],[160,390],[540,300],[700,560],[840,280]
    ].forEach(([x,y]) => objects.push({ type:'rock', x, y, hp:4, mhp:4, r:18, drop:{e:'🪨',n:'Batu',c:1} }));

    // Food/plants
    [[180,145],[425,245],[660,345],[305,445],[555,495],[205,590],[710,640],[440,540],[320,280]
    ].forEach(([x,y]) => objects.push({ type:'food', x, y, hp:1, mhp:1, r:13, drop:{e:'🍖',n:'Daging',c:1} }));

    // Chests
    objects.push({ type:'chest', x:490, y:520, r:18, opened:false, drop:{e:'⚔',n:'Pedang Kuno',c:1} });
    objects.push({ type:'chest', x:860, y:650, r:18, opened:false, drop:{e:'🛡',n:'Perisai Kuno',c:1} });
    objects.push({ type:'chest', x:200, y:850, r:18, opened:false, drop:{e:'🪨',n:'Batu Obsidian',c:3} });

    // Dimension portals — INTERACTABLE celah dimensi
    objects.push({ type:'dimension', x:380, y:180, r:32, dimId:1, label:'Dimensi Paleolitikum' });
    objects.push({ type:'dimension', x:700, y:700, r:32, dimId:2, label:'Dimensi Neolitikum' });

    // Secret area beacon
    objects.push({ type:'secret', x:920, y:760, r:35 });
  }

  function update() {
    // Camera follow player
    cam.x += (Player.x - cam.x) * 0.1;
    cam.y += (Player.y - cam.y) * 0.1;

    // Particles — filter in-place
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.x += p.vx; p.y += p.vy;
      p.life--;
      p.vx *= 0.9; p.vy *= 0.9;
      if (p.life <= 0) particles.splice(i, 1);
    }

    // Remove dead objects in-place (don't reassign — breaks getter)
    for (let i = objects.length - 1; i >= 0; i--) {
      const o = objects[i];
      if (o.hp !== undefined && o.hp <= -900) objects.splice(i, 1);
    }

    // Zone / HUD
    document.getElementById('hZone').textContent = _getZone();
  }

  function spawnParticles(x, y, col, n = 4) {
    for (let i = 0; i < n; i++) {
      particles.push({ x, y, vx: (Math.random()-.5)*3, vy: (Math.random()-.5)*3, life:28, col, sz:2 });
    }
  }

  function spawnBurst(x, y, col) {
    for (let i = 0; i < 14; i++) {
      const a = Math.random() * Math.PI * 2, s = 1.5 + Math.random() * 3;
      particles.push({ x, y, vx: Math.cos(a)*s, vy: Math.sin(a)*s, life:50, col, sz: 3+Math.random()*4 });
    }
  }

  function draw(ctx) {
    const W = ctx.canvas.width, H = ctx.canvas.height;
    const ox = W/2 - cam.x, oy = H/2 - cam.y;

    ctx.clearRect(0, 0, W, H);

    // Background
    ctx.fillStyle = '#141e0e'; ctx.fillRect(0, 0, W, H);

    // Zone tints
    ctx.save(); ctx.globalAlpha = 0.07;
    ctx.fillStyle = '#4488ff'; ctx.fillRect(ox,     oy,      215, 1000);
    ctx.fillStyle = '#44cc88'; ctx.fillRect(215+ox, oy,      215, 320);
    ctx.fillStyle = '#cc9944'; ctx.fillRect(870+ox, 720+oy, 130, 280);
    ctx.restore();

    // Grid
    ctx.save(); ctx.globalAlpha = 0.05;
    ctx.strokeStyle = '#4a7a30'; ctx.lineWidth = 0.8;
    for (let x = 0; x < 1000; x += 40) { ctx.beginPath(); ctx.moveTo(x+ox,oy);     ctx.lineTo(x+ox,1000+oy); ctx.stroke(); }
    for (let y = 0; y < 1000; y += 40) { ctx.beginPath(); ctx.moveTo(ox,y+oy);     ctx.lineTo(1000+ox,y+oy); ctx.stroke(); }
    ctx.restore();

    // Game Objects
    objects.forEach(obj => {
      if (obj.hp !== undefined && obj.hp < -900) return;
      const sx = obj.x + ox, sy = obj.y + oy;
      if (sx < -70 || sx > W+70 || sy < -70 || sy > H+70) return;
      ctx.save();

      if (obj.type === 'tree') {
        ctx.globalAlpha = 0.15; ctx.fillStyle = '#000';
        ctx.beginPath(); ctx.ellipse(sx, sy+8, obj.r*.9, obj.r*.3, 0,0,Math.PI*2); ctx.fill();
        ctx.globalAlpha = 1;
        ctx.fillStyle = '#7a4e28'; ctx.fillRect(sx-5, sy-6, 10, 24);
        ctx.fillStyle = '#1e6e1e'; ctx.beginPath(); ctx.arc(sx,   sy-14, obj.r+2, 0,Math.PI*2); ctx.fill();
        ctx.fillStyle = '#2a8e2a'; ctx.beginPath(); ctx.arc(sx-4, sy-24, obj.r-4, 0,Math.PI*2); ctx.fill();
        ctx.fillStyle = '#38b038'; ctx.beginPath(); ctx.arc(sx+4, sy-30, obj.r-8, 0,Math.PI*2); ctx.fill();
        if (obj.hp < obj.mhp) {
          ctx.fillStyle = '#222'; ctx.fillRect(sx-14,sy-45,28,5);
          ctx.fillStyle = '#3c3'; ctx.fillRect(sx-14,sy-45,28*(obj.hp/obj.mhp),5);
        }

      } else if (obj.type === 'rock') {
        ctx.globalAlpha = 0.15; ctx.fillStyle = '#000';
        ctx.beginPath(); ctx.ellipse(sx, sy+4, obj.r*.9, obj.r*.4, 0,0,Math.PI*2); ctx.fill();
        ctx.globalAlpha = 1;
        ctx.fillStyle = '#5a5a5a'; ctx.beginPath(); ctx.ellipse(sx,   sy,   obj.r,   obj.r*.7, .4,0,Math.PI*2); ctx.fill();
        ctx.fillStyle = '#7a7a7a'; ctx.beginPath(); ctx.ellipse(sx-2, sy-3, obj.r-5, obj.r*.4, .4,0,Math.PI*2); ctx.fill();
        if (obj.hp < obj.mhp) {
          ctx.fillStyle = '#222'; ctx.fillRect(sx-14,sy-28,28,5);
          ctx.fillStyle = '#aaa'; ctx.fillRect(sx-14,sy-28,28*(obj.hp/obj.mhp),5);
        }

      } else if (obj.type === 'food') {
        ctx.font = '20px serif'; ctx.fillText('🌿', sx-10, sy+8);

      } else if (obj.type === 'chest') {
        if (!obj.opened) {
          ctx.fillStyle = '#7a5a14'; ctx.fillRect(sx-13, sy-10, 26, 20);
          ctx.fillStyle = '#c8920a'; ctx.fillRect(sx-15, sy-12, 30, 7);
          ctx.fillStyle = '#FFD700'; ctx.beginPath(); ctx.arc(sx, sy-3, 5, 0, Math.PI*2); ctx.fill();
          ctx.fillStyle = '#fff'; ctx.font = '8px sans-serif'; ctx.textAlign = 'center';
          ctx.fillText('BUKA', sx, sy+18); ctx.textAlign = 'left';
        } else {
          ctx.fillStyle = '#444'; ctx.fillRect(sx-13, sy-10, 26, 20);
        }

      } else if (obj.type === 'dimension') {
        // Animated portal / celah dimensi
        const pulse = Math.sin(GS.tick * 0.06) * 12;
        ctx.globalAlpha = 0.18 + Math.sin(GS.tick * 0.06) * 0.12;
        // Outer glow rings
        ctx.strokeStyle = '#cc88ff'; ctx.lineWidth = 3;
        ctx.beginPath(); ctx.arc(sx, sy, 40 + pulse, 0, Math.PI*2); ctx.stroke();
        ctx.strokeStyle = '#8844ff'; ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.arc(sx, sy, 28 + pulse*0.6, 0, Math.PI*2); ctx.stroke();
        ctx.globalAlpha = 1;
        // Swirling inner fill
        ctx.fillStyle = `hsla(${270 + GS.tick}, 70%, 40%, 0.5)`;
        ctx.beginPath(); ctx.arc(sx, sy, 22, 0, Math.PI*2); ctx.fill();
        ctx.fillStyle = '#cc88ff';
        ctx.beginPath(); ctx.arc(sx, sy, 14, 0, Math.PI*2); ctx.fill();
        // Label
        ctx.font = '20px serif'; ctx.textAlign = 'center';
        ctx.fillText('🌀', sx, sy+7);
        ctx.fillStyle = '#cc88ff'; ctx.font = 'bold 10px sans-serif';
        ctx.fillText(obj.label, sx, sy + 46); ctx.textAlign = 'left';
        // Tekan E prompt if near
        if (Utils.dist(Player.x, Player.y, obj.x, obj.y) < 100) {
          ctx.fillStyle = 'rgba(0,0,0,.65)';
          ctx.beginPath(); ctx.roundRect(sx-32, sy-72, 64, 22, 6); ctx.fill();
          ctx.fillStyle = '#fff'; ctx.font = '11px sans-serif'; ctx.textAlign = 'center';
          ctx.fillText('[E] Masuk', sx, sy-57); ctx.textAlign = 'left';
        }

      } else if (obj.type === 'secret') {
        const pulse = Math.sin(GS.tick * 0.05) * 10;
        ctx.globalAlpha = 0.18 + Math.sin(GS.tick * 0.05) * 0.12;
        ctx.fillStyle = '#cc88ff';
        ctx.beginPath(); ctx.arc(sx, sy, 45+pulse, 0, Math.PI*2); ctx.fill();
        ctx.globalAlpha = 1;
        ctx.font = '28px serif'; ctx.textAlign = 'center';
        ctx.fillText('🌀', sx, sy+10);
        ctx.fillStyle = '#cc88ff'; ctx.font = 'bold 10px sans-serif';
        ctx.fillText('AREA RAHASIA', sx, sy+36); ctx.textAlign = 'left';
      }
      ctx.restore();
    });

    // Particles
    particles.forEach(p => {
      ctx.save();
      ctx.globalAlpha = p.life / 50;
      ctx.fillStyle   = p.col;
      ctx.beginPath(); ctx.arc(p.x+ox, p.y+oy, p.sz||2, 0, Math.PI*2); ctx.fill();
      ctx.restore();
    });

    // Animals
    AnimalSystem.draw(ctx, ox, oy);

    // NPCs
    NPCSystem.draw(ctx, ox, oy);

    // Player
    _drawPlayer(ctx, W/2, H/2);

    // Bottom bar
    ctx.fillStyle = 'rgba(0,0,0,.45)'; ctx.fillRect(0, H-86, W, 86);
    ctx.fillStyle = 'rgba(0,255,200,.15)'; ctx.fillRect(0, H-88, W, 2);

    return { ox, oy };
  }

  function _drawPlayer(ctx, px, py) {
    ctx.save();
    // Shadow
    ctx.globalAlpha = 0.25; ctx.fillStyle = '#000';
    ctx.beginPath(); ctx.ellipse(px, py+15, 13, 5, 0,0,Math.PI*2); ctx.fill();
    ctx.globalAlpha = 1;
    // Sprint trail
    if (Player.sprintOn && Player.stamina > 3) {
      ctx.globalAlpha = 0.25; ctx.fillStyle = '#00aaff';
      ctx.beginPath(); ctx.arc(px - Math.cos(Player.facing)*18, py - Math.sin(Player.facing)*18, 7, 0, Math.PI*2); ctx.fill();
      ctx.globalAlpha = 0.12;
      ctx.beginPath(); ctx.arc(px - Math.cos(Player.facing)*33, py - Math.sin(Player.facing)*33, 5, 0, Math.PI*2); ctx.fill();
      ctx.globalAlpha = 1;
    }
    // Body
    ctx.fillStyle = '#3366cc'; ctx.beginPath(); ctx.arc(px, py, 13, 0, Math.PI*2); ctx.fill();
    ctx.fillStyle = '#5588ee'; ctx.beginPath(); ctx.arc(px-2, py-2, 7, 0, Math.PI*2); ctx.fill();
    // Helmet
    ctx.fillStyle = '#1144aa'; ctx.beginPath(); ctx.arc(px, py-7, 9, Math.PI, Math.PI*2); ctx.fill();
    // Sword VFX during attack
    if (Player.atkAnim > 0) {
      const a = Player.facing, frac = Player.atkAnim / 15, alen = 55 * frac;
      ctx.globalAlpha = frac * 0.85;
      const gr = ctx.createLinearGradient(px, py, px+Math.cos(a)*alen, py+Math.sin(a)*alen);
      gr.addColorStop(0, '#fff'); gr.addColorStop(0.4, '#00ffcc'); gr.addColorStop(1, 'transparent');
      ctx.strokeStyle = gr; ctx.lineWidth = 5;
      ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px+Math.cos(a)*alen, py+Math.sin(a)*alen); ctx.stroke();
      ctx.strokeStyle = 'rgba(0,255,200,.3)'; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.arc(px, py, alen*.65, a-.8, a+.8); ctx.stroke();
      ctx.globalAlpha = 1;
    }
    ctx.restore();
  }

  function _getZone() {
    if (Player.x > 870 && Player.y > 720) return ZONES[5];
    if (Player.x < 200) return ZONES[0];
    if (Player.x < 420) return ZONES[1];
    if (Player.y < 280) return ZONES[2];
    if (Player.y > 580) return ZONES[3];
    return ZONES[4];
  }

  return {
    get objects()  { return objects;  },
    get cam()      { return cam;      },
    init, update, draw, spawnParticles, spawnBurst,
  };
})();
