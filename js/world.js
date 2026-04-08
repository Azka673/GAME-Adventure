// ===== WORLD.JS =====

const World = (() => {
  let objects   = [];
  let particles = [];
  let cam       = { x: 200, y: 200 };
  const MAP_SIZE = 1600;   // FIX: was 1000 — objek ada sampai x:1472,y:1360 jadi harus 1600
  const ZONES  = ["🌲 Hutan Paleolitikum","🌿 Padang Mesolitikum","🌾 Ladang Neolitikum","🗿 Bukit Megalitikum","🔨 Tambang Perundagian","🌀 Area Rahasia"];

  function init() {
    objects   = [];
    particles = [];

    // Trees
    [[128,128],[320,96],[560,144],[832,112],[240,448],[976,432],[624,544],[1152,224],[80,624],
     [1312,624],[384,784],[1056,784],[1472,464],[176,944],[1216,944],[640,1104],[336,1184],
     [976,1184],[1440,1088],[80,1088],[736,288],[464,608],[1184,704],[208,1184],[896,288]
    ].forEach(([x,y]) => objects.push({ type:'tree', x, y, hp:3, mhp:3, r:22, drop:{e:'🪵',n:'Kayu',c:2} }));

    // Rocks
    [[496,304],[736,272],[976,224],[160,784],[656,752],[1136,656],[416,1024],[896,976],
     [1312,864],[1472,304],[576,944],[256,624],[864,480],[1120,896],[1344,448]
    ].forEach(([x,y]) => objects.push({ type:'rock', x, y, hp:4, mhp:4, r:18, drop:{e:'🪨',n:'Batu',c:1} }));

    // Food/plants
    [[288,232],[680,392],[1056,552],[488,712],[888,792],[328,944],[1136,1024],[704,864],[512,448]
    ].forEach(([x,y]) => objects.push({ type:'food', x, y, hp:1, mhp:1, r:13, drop:{e:'🍖',n:'Daging',c:1} }));

    // Chests
    objects.push({ type:'chest', x:784,  y:832,  r:18, opened:false, drop:{e:'⚔', n:'Pedang Kuno',   c:1} });
    objects.push({ type:'chest', x:1376, y:1040, r:18, opened:false, drop:{e:'🛡', n:'Perisai Kuno',  c:1} });
    objects.push({ type:'chest', x:320,  y:1360, r:18, opened:false, drop:{e:'🪨', n:'Batu Obsidian', c:3} });

    // Dimension portals
    objects.push({ type:'dimension', x:380,  y:180,  r:32, dimId:1, label:'Dimensi Paleolitikum' });
    objects.push({ type:'dimension', x:700,  y:700,  r:32, dimId:2, label:'Dimensi Neolitikum'   });
    objects.push({ type:'dimension', x:1100, y:220,  r:32, dimId:3, label:'Dimensi Mesozoikum'   });
    objects.push({ type:'dimension', x:1400, y:1200, r:32, dimId:4, label:'Dimensi Perundagian'  });

    // Secret area beacon
    objects.push({ type:'secret', x:1470, y:1350, r:35 });
  }

  function update() {
    // Camera lerp — smooth follow
    cam.x += (Player.x - cam.x) * 0.1;
    cam.y += (Player.y - cam.y) * 0.1;

    // Particles
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.x += p.vx; p.y += p.vy;
      p.life--;
      p.vx *= 0.9; p.vy *= 0.9;
      if (p.life <= 0) particles.splice(i, 1);
    }

    // Remove dead objects
    for (let i = objects.length - 1; i >= 0; i--) {
      if (objects[i].hp !== undefined && objects[i].hp <= -900) objects.splice(i, 1);
    }

    // Zone HUD — guard against missing element
    const zoneEl = document.getElementById('hZone');
    if (zoneEl) zoneEl.textContent = _getZone();
  }

  function spawnParticles(x, y, col, n = 4) {
    for (let i = 0; i < n; i++) {
      particles.push({ x, y, vx:(Math.random()-.5)*3, vy:(Math.random()-.5)*3, life:28, col, sz:2 });
    }
  }

  function spawnBurst(x, y, col) {
    for (let i = 0; i < 14; i++) {
      const a = Math.random()*Math.PI*2, s = 1.5+Math.random()*3;
      particles.push({ x, y, vx:Math.cos(a)*s, vy:Math.sin(a)*s, life:50, col, sz:3+Math.random()*4 });
    }
  }

  function spawnReturn(x, y) {
    for (let i = 0; i < 20; i++) {
      particles.push({ x:x+(Math.random()-.5)*200, y:-50, vx:(Math.random()-.5)*2, vy:2+Math.random()*3, life:100, col:'#00ffcc', sz:4 });
    }
  }

  function draw(ctx) {
    const W = ctx.canvas.width, H = ctx.canvas.height;

    // FIX: clamp camera BEFORE computing offset — prevents jitter/slowdown at edges
    const halfW = W / 2, halfH = H / 2;
    cam.x = Utils.clamp(cam.x, halfW,  MAP_SIZE - halfW);
    cam.y = Utils.clamp(cam.y, halfH,  MAP_SIZE - halfH);

    const ox = halfW - cam.x;
    const oy = halfH - cam.y;

    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = '#141e0e'; ctx.fillRect(0, 0, W, H);

    // Zone tints
    ctx.save(); ctx.globalAlpha = 0.07;
    ctx.fillStyle = '#4488ff'; ctx.fillRect(ox,       oy,       320,      MAP_SIZE);
    ctx.fillStyle = '#44cc88'; ctx.fillRect(320+ox,   oy,       340,      520);
    ctx.fillStyle = '#cc9944'; ctx.fillRect(920+ox,   720+oy,   260,      440);
    ctx.restore();

    // Grid
    ctx.save(); ctx.globalAlpha = 0.05;
    ctx.strokeStyle = '#4a7a30'; ctx.lineWidth = 0.8;
    ctx.beginPath();
    for (let x = 0; x < MAP_SIZE; x += 40) {
      ctx.moveTo(x+ox, oy); ctx.lineTo(x+ox, MAP_SIZE+oy);
    }
    for (let y = 0; y < MAP_SIZE; y += 40) {
      ctx.moveTo(ox, y+oy); ctx.lineTo(MAP_SIZE+ox, y+oy);
    }
    ctx.stroke();
    ctx.restore();

    // Map border — visual boundary
    ctx.save();
    ctx.strokeStyle = 'rgba(0,255,200,0.15)'; ctx.lineWidth = 3;
    ctx.strokeRect(ox, oy, MAP_SIZE, MAP_SIZE);
    ctx.restore();

    // Objects
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
        const pulse = Math.sin(GS.tick * 0.06) * 12;
        ctx.globalAlpha = 0.18 + Math.sin(GS.tick * 0.06) * 0.12;
        ctx.strokeStyle = '#cc88ff'; ctx.lineWidth = 3;
        ctx.beginPath(); ctx.arc(sx, sy, 40+pulse, 0, Math.PI*2); ctx.stroke();
        ctx.strokeStyle = '#8844ff'; ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.arc(sx, sy, 28+pulse*0.6, 0, Math.PI*2); ctx.stroke();
        ctx.globalAlpha = 1;
        ctx.fillStyle = `hsla(${270+GS.tick},70%,40%,0.5)`;
        ctx.beginPath(); ctx.arc(sx, sy, 22, 0, Math.PI*2); ctx.fill();
        ctx.fillStyle = '#cc88ff';
        ctx.beginPath(); ctx.arc(sx, sy, 14, 0, Math.PI*2); ctx.fill();
        ctx.font = '20px serif'; ctx.textAlign = 'center';
        ctx.fillText('🌀', sx, sy+7);
        ctx.fillStyle = '#cc88ff'; ctx.font = 'bold 10px sans-serif';
        ctx.fillText(obj.label, sx, sy+46); ctx.textAlign = 'left';
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
        if (Utils.dist(Player.x, Player.y, obj.x, obj.y) < 100) {
          ctx.fillStyle = 'rgba(0,0,0,.65)';
          ctx.beginPath(); ctx.roundRect(sx-46, sy-72, 92, 22, 6); ctx.fill();
          ctx.fillStyle = '#fff'; ctx.font = '11px sans-serif'; ctx.textAlign = 'center';
          ctx.fillText('TERKUNCI', sx, sy-57); ctx.textAlign = 'left';
        }
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

    // Animals, NPCs, Projectiles, Player
    AnimalSystem.draw(ctx, ox, oy);
    NPCSystem.draw(ctx, ox, oy);
    Player.drawProjectiles(ctx, ox, oy);
    _drawPlayer(ctx, Player.x + ox, Player.y + oy);

    // Bottom bar
    ctx.fillStyle = 'rgba(0,0,0,.45)'; ctx.fillRect(0, H-86, W, 86);
    ctx.fillStyle = 'rgba(0,255,200,.15)'; ctx.fillRect(0, H-88, W, 2);

    return { ox, oy };
  }

  function _drawPlayer(ctx, px, py) {
    ctx.save();
    ctx.globalAlpha = 0.25; ctx.fillStyle = '#000';
    ctx.beginPath(); ctx.ellipse(px, py+15, 13, 5, 0,0,Math.PI*2); ctx.fill();
    ctx.globalAlpha = 1;
    if (Player.sprintOn && Player.stamina > 3) {
      ctx.globalAlpha = 0.25; ctx.fillStyle = '#00aaff';
      ctx.beginPath(); ctx.arc(px-Math.cos(Player.facing)*18, py-Math.sin(Player.facing)*18, 7, 0, Math.PI*2); ctx.fill();
      ctx.globalAlpha = 0.12;
      ctx.beginPath(); ctx.arc(px-Math.cos(Player.facing)*33, py-Math.sin(Player.facing)*33, 5, 0, Math.PI*2); ctx.fill();
      ctx.globalAlpha = 1;
    }
    ctx.fillStyle = '#3366cc'; ctx.beginPath(); ctx.arc(px, py, 13, 0, Math.PI*2); ctx.fill();
    ctx.fillStyle = '#5588ee'; ctx.beginPath(); ctx.arc(px-2, py-2, 7, 0, Math.PI*2); ctx.fill();
    ctx.fillStyle = '#1144aa'; ctx.beginPath(); ctx.arc(px, py-7, 9, Math.PI, Math.PI*2); ctx.fill();
    if (Player.atkAnim > 0) {
      const a = Player.facing, frac = Player.atkAnim/15, alen = 55*frac;
      ctx.globalAlpha = frac * 0.85;
      const gr = ctx.createLinearGradient(px, py, px+Math.cos(a)*alen, py+Math.sin(a)*alen);
      gr.addColorStop(0,'#fff'); gr.addColorStop(0.4,'#00ffcc'); gr.addColorStop(1,'transparent');
      ctx.strokeStyle = gr; ctx.lineWidth = 5;
      ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px+Math.cos(a)*alen, py+Math.sin(a)*alen); ctx.stroke();
      ctx.strokeStyle = 'rgba(0,255,200,.3)'; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.arc(px, py, alen*.65, a-.8, a+.8); ctx.stroke();
      ctx.globalAlpha = 1;
    }
    if (Player.equipped) {
      ctx.font = '18px serif';
      ctx.fillText(Player.equipped, px+Math.cos(Player.facing)*18-8, py+Math.sin(Player.facing)*18+6);
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
    get objects()  { return objects; },
    get cam()      { return cam;     },
    init, update, draw, spawnParticles, spawnBurst, spawnReturn,
  };
})();