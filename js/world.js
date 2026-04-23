// ===== WORLD.JS =====

const World = (() => {
  let objects   = [];
  let particles = [];
  let cam       = { x: 200, y: 200 };
  const MAP_SIZE = 2400;
  const ZONES  = ["🌲 Hutan Paleolitikum","🌿 Padang Mesolitikum","🌾 Ladang Neolitikum","🗿 Bukit Megalitikum","🔨 Tambang Perundagian","🌀 Area Rahasia","🌋 Zona Arkeozoikum","🦕 Zona Paleozoikum","🦖 Zona Mesozoikum","🌿 Zona Neozoikum"];
  const RESPAWN_TIME = 600;
  const KEY_RESPAWN_TIME = 1800;
  const RESPAWN_LIST = [];
  const KEY_CHESTS = [];

  function init() {
    objects   = [];
    particles = [];
    RESPAWN_LIST.length = 0;

    // Trees — spread across larger map
    const treePositions = [
      [128,128],[320,96],[560,144],[832,112],[240,448],[976,432],[624,544],[1152,224],[80,624],
      [1312,624],[384,784],[1056,784],[1472,464],[176,944],[1216,944],[640,1104],[336,1184],
      [976,1184],[1440,1088],[80,1088],[736,288],[464,608],[1184,704],[208,1184],[896,288],
      // Extended zone trees
      [1600,200],[1750,400],[1900,150],[2100,300],[2250,500],[1650,700],[1850,900],
      [2000,1100],[2200,800],[1700,1300],[1950,1500],[2100,1700],[1600,1600],[2300,1000],
      [1800,1800],[2000,2000],[1700,2200],[2200,2100],[1900,2300],[2350,1500],
      [400,1400],[600,1600],[800,1800],[200,1600],[500,2000],[700,2200],[300,2000],
      [1000,1400],[1200,1600],[1100,2000],[900,2200],[1300,1800],[1050,2300],
    ];
    treePositions.forEach(([x,y]) => {
      const obj = { type:'tree', x, y, hp:3, mhp:3, r:22, drop:{e:'🪵',n:'Kayu',c:2}, respawnTimer: 0 };
      objects.push(obj);
      RESPAWN_LIST.push({ type: 'tree', x, y, obj });
    });

    // Rocks
    const rockPositions = [
      [496,304],[736,272],[976,224],[160,784],[656,752],[1136,656],[416,1024],[896,976],
      [1312,864],[1472,304],[576,944],[256,624],[864,480],[1120,896],[1344,448],
      // Extended
      [1600,500],[1800,700],[2000,400],[2200,600],[1650,1000],[1900,1200],
      [2100,900],[2300,1200],[1750,1500],[2050,1700],[1600,1900],[2250,1900],
      [500,1500],[700,1700],[900,1900],[1100,1500],[300,1800],[1200,2100],
    ];
    rockPositions.forEach(([x,y]) => {
      const obj = { type:'rock', x, y, hp:4, mhp:4, r:18, drop:{e:'🪨',n:'Batu',c:1}, respawnTimer: 0 };
      objects.push(obj);
      RESPAWN_LIST.push({ type: 'rock', x, y, obj });
    });

    // Food/plants
    const foodPositions = [
      [288,232],[680,392],[1056,552],[488,712],[888,792],[328,944],[1136,1024],[704,864],[512,448],
      [1700,300],[1900,600],[2100,200],[2200,1000],[1800,1400],[2000,1600],[1650,1800],
      [600,1400],[800,1600],[400,2000],[1000,2000],[1200,1800],
    ];
    foodPositions.forEach(([x,y]) => {
      const obj = { type:'food', x, y, hp:1, mhp:1, r:13, drop:{e:'🍖',n:'Daging',c:1}, respawnTimer: 0 };
      objects.push(obj);
      RESPAWN_LIST.push({ type: 'food', x, y, obj });
    });

    // Iron ore deposits
    const orePositions = [
      [450,280],[950,450],[1200,600],[650,950],[1400,850],
      [1700,800],[2000,700],[2200,1300],[1900,1700],[2300,1600],
    ];
    orePositions.forEach(([x,y]) => {
      const obj = { type:'ore', x, y, hp:2, mhp:2, r:16, drop:{e:'⛏',n:'Besi',c:2}, respawnTimer: 0 };
      objects.push(obj);
      RESPAWN_LIST.push({ type: 'ore', x, y, obj });
    });

    // ═══ CHESTS (5 total) ═══
    const chest1 = { type:'chest', x:600,  y:500,  r:18, opened:false, drop:{e:'🔑', n:'Kunci Portal',   c:1}, chestRespawnTimer:0 };
    const chest2 = { type:'chest', x:784,  y:832,  r:18, opened:false, drop:{e:'⚔',  n:'Pedang Kuno',    c:1}, chestRespawnTimer:0 };
    const chest3 = { type:'chest', x:1376, y:1040, r:18, opened:false, drop:{e:'🛡',  n:'Perisai Kuno',   c:1}, chestRespawnTimer:0 };
    const chest4 = { type:'chest', x:1900, y:900,  r:18, opened:false, drop:{e:'💎',  n:'Kristal Purba',  c:1}, chestRespawnTimer:0 };
    const chest5 = { type:'chest', x:2100, y:1800, r:18, opened:false, drop:{e:'🏺',  n:'Artefak Kuno',   c:1}, chestRespawnTimer:0 };
    objects.push(chest1, chest2, chest3, chest4, chest5);
    KEY_CHESTS.push(chest1, chest2, chest3, chest4, chest5);

    // ═══ 9 DIMENSION PORTALS ═══
    // 1. Arkeozoikum — zona kiri atas
    objects.push({ type:'dimension', x:250,  y:200,  r:32, dimId:1, label:'Zaman Arkeozoikum',  visited:false });
    // 2. Paleozoikum — zona tengah atas
    objects.push({ type:'dimension', x:700,  y:180,  r:32, dimId:2, label:'Zaman Paleozoikum',  visited:false });
    // 3. Mesozoikum — zona kanan atas
    objects.push({ type:'dimension', x:1250, y:220,  r:32, dimId:3, label:'Zaman Mesozoikum',   visited:false });
    // 4. Neozoikum — zona kanan atas jauh
    objects.push({ type:'dimension', x:1800, y:250,  r:32, dimId:4, label:'Zaman Neozoikum',    visited:false });
    // 5. Paleolitikum — zona kiri tengah
    objects.push({ type:'dimension', x:280,  y:900,  r:32, dimId:5, label:'Zaman Paleolitikum', visited:false });
    // 6. Mesolitikum — zona tengah
    objects.push({ type:'dimension', x:900,  y:750,  r:32, dimId:6, label:'Zaman Mesolitikum',  visited:false });
    // 7. Neolitikum — zona kanan tengah
    objects.push({ type:'dimension', x:1500, y:850,  r:32, dimId:7, label:'Zaman Neolitikum',   visited:false });
    // 8. Megalitikum — zona kiri bawah
    objects.push({ type:'dimension', x:400,  y:1700, r:32, dimId:8, label:'Zaman Megalitikum',  visited:false });
    // 9. Perundagian — zona tengah bawah
    objects.push({ type:'dimension', x:1100, y:1900, r:32, dimId:9, label:'Zaman Perundagian',  visited:false });

    // Secret keyhole portal — pojok kanan bawah
    objects.push({ type:'portal', x:2200, y:2200, r:40, isSecret:true, locked:true });

    // Secret area beacon
    objects.push({ type:'secret', x:2200, y:2200, r:35 });
  }

  function update() {
    cam.x += (Player.x - cam.x) * 0.1;
    cam.y += (Player.y - cam.y) * 0.1;

    GS.timeProgress = (GS.timeProgress || 0) + 1;
    if (GS.timeProgress >= 900) {
      GS.timeProgress = 0;
      GS.timeOffset = (GS.timeOffset || 0) + 1;
      if (GS.timeOffset >= 4) GS.timeOffset = 0;
      const timeNames = ['day', 'sore', 'night', 'dawn'];
      const prevTime = GS.timeOfDay;
      GS.timeOfDay = timeNames[GS.timeOffset];
      if (GS.timeOfDay === 'night' && prevTime !== 'night') {
        AnimalSystem.spawnNightEnemies();
        Utils.notify('🌙 Malam tiba! Zombie dan Skeleton muncul!', '#ff0088');
      }
      if (GS.timeOfDay !== 'night' && prevTime === 'night') {
        AnimalSystem.removeNightEnemies();
        Utils.notify('☀️ Pagi kembali! Musuh malam hilang.', '#ffff00');
      }
      Utils.notify(`⏰ Waktu: ${timeNames[GS.timeOffset]}`, '#88ccff');
    }

    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.x += p.vx; p.y += p.vy;
      p.life--;
      p.vx *= 0.9; p.vy *= 0.9;
      if (p.life <= 0) particles.splice(i, 1);
    }

    for (const respawnData of RESPAWN_LIST) {
      const obj = respawnData.obj;
      if (obj.hp !== undefined && obj.hp <= -900) {
        obj.respawnTimer = (obj.respawnTimer || 0) + 1;
        if (obj.respawnTimer >= RESPAWN_TIME) {
          obj.hp = obj.mhp;
          obj.respawnTimer = 0;
          World.spawnParticles(obj.x, obj.y, '#00ff88', 5);
          Utils.notify(`🌱 Resource respawned!`, '#00ff88');
        }
      }
    }

    for (let i = objects.length - 1; i >= 0; i--) {
      const arrow = objects[i];
      if (arrow.type !== 'arrow') continue;
      arrow.x += arrow.vx;
      arrow.y += arrow.vy;
      arrow.life--;
      if (arrow.life <= 0 || arrow.x < 0 || arrow.x > MAP_SIZE || arrow.y < 0 || arrow.y > MAP_SIZE) {
        objects.splice(i, 1);
        continue;
      }
      const arrowDist = Utils.dist(arrow.x, arrow.y, Player.x, Player.y);
      if (arrowDist < 25) {
        const damage = Math.max(1, Math.ceil(Player.hp * 0.12));
        const actualDamage = Math.ceil(damage * Player.getDamageReduction());
        Player.hp = Math.max(0, Player.hp - actualDamage);
        World.spawnBurst(arrow.x, arrow.y, '#ffff00');
        Utils.notify(`🏹 Terkena panah! -${actualDamage} HP`, '#ff9900');
        Utils.vibrate([50, 30, 50]);
        if (!Player.stuckArrows) Player.stuckArrows = 0;
        Player.stuckArrows++;
        objects.splice(i, 1);
      }
    }

    for (let i = objects.length - 1; i >= 0; i--) {
      if (objects[i].hp !== undefined && objects[i].hp <= -900 && objects[i].respawnTimer < 1) {
        objects.splice(i, 1);
      }
    }

    for (const chest of KEY_CHESTS) {
      if (chest.opened) {
        chest.chestRespawnTimer = (chest.chestRespawnTimer || 0) + 1;
        if (chest.chestRespawnTimer >= KEY_RESPAWN_TIME) {
          chest.opened = false;
          chest.chestRespawnTimer = 0;
          World.spawnParticles(chest.x, chest.y, '#ffcc00', 8);
          Utils.notify(`✨ ${chest.drop.n} muncul di chest lagi!`, '#ffcc00');
        }
      }
    }

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

    const halfW = W / 2, halfH = H / 2;
    cam.x = Utils.clamp(cam.x, halfW,  MAP_SIZE - halfW);
    cam.y = Utils.clamp(cam.y, halfH,  MAP_SIZE - halfH);

    const ox = halfW - cam.x;
    const oy = halfH - cam.y;

    ctx.clearRect(0, 0, W, H);

    let bgColor = '#141e0e';
    let tintAlpha = 0.07;
    let overlayColor = null;
    let lightingBoost = 0;

    if (Inventory.has('🔦', 1)) {
      GS.torchActive = true;
      lightingBoost = 0.35;
    } else {
      GS.torchActive = false;
    }

    if (GS.timeOfDay === 'day') {
      bgColor = '#3a4a2a';
      tintAlpha = 0.05;
    } else if (GS.timeOfDay === 'sore') {
      bgColor = '#4a3a1a';
      overlayColor = 'rgba(255, 140, 0, 0.25)';
      tintAlpha = 0.08;
    } else if (GS.timeOfDay === 'night') {
      bgColor = '#0a0a14';
      overlayColor = `rgba(30, 40, 80, ${0.45 - lightingBoost})`;
      tintAlpha = 0.15;
    } else if (GS.timeOfDay === 'dawn') {
      bgColor = '#1a0f1a';
      overlayColor = 'rgba(150, 100, 200, 0.20)';
      tintAlpha = 0.10;
    }

    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, W, H);

    if (overlayColor) {
      ctx.fillStyle = overlayColor;
      ctx.fillRect(0, 0, W, H);
    }

    if (GS.torchActive && GS.timeOfDay === 'night') {
      ctx.save();
      const torchGradient = ctx.createRadialGradient(W/2, H/2, 0, W/2, H/2, Math.max(W,H)*0.7);
      torchGradient.addColorStop(0, 'rgba(255, 180, 0, 0.15)');
      torchGradient.addColorStop(1, 'transparent');
      ctx.fillStyle = torchGradient;
      ctx.fillRect(0, 0, W, H);
      ctx.restore();
    }

    // Zone tints — extended for larger map
    ctx.save(); ctx.globalAlpha = tintAlpha;
    ctx.fillStyle = '#4488ff'; ctx.fillRect(ox,        oy,        400,      MAP_SIZE); // kiri biru
    ctx.fillStyle = '#44cc88'; ctx.fillRect(400+ox,    oy,        400,      600);      // hijau atas
    ctx.fillStyle = '#cc9944'; ctx.fillRect(1200+ox,   900+oy,    400,      600);      // coklat tengah
    ctx.fillStyle = '#884422'; ctx.fillRect(1600+ox,   oy,        800,      MAP_SIZE); // merah kanan
    ctx.fillStyle = '#224488'; ctx.fillRect(ox,        1400+oy,   800,      1000);     // biru bawah
    ctx.fillStyle = '#442288'; ctx.fillRect(1600+ox,   1400+oy,   800,      1000);     // ungu pojok
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

    // Map border
    ctx.save();
    ctx.strokeStyle = 'rgba(0,255,200,0.15)'; ctx.lineWidth = 3;
    ctx.strokeRect(ox, oy, MAP_SIZE, MAP_SIZE);
    ctx.restore();

    // Zone label watermarks
    const zoneLabels = [
      { x:200,  y:400,  text:'🌋 ARKEOZOIKUM',  col:'rgba(255,100,50,0.12)'  },
      { x:700,  y:400,  text:'🌊 PALEOZOIKUM',   col:'rgba(50,150,255,0.12)'  },
      { x:1200, y:400,  text:'🦕 MESOZOIKUM',    col:'rgba(255,80,80,0.12)'   },
      { x:1900, y:400,  text:'🌿 NEOZOIKUM',     col:'rgba(50,200,100,0.12)'  },
      { x:200,  y:1100, text:'🪨 PALEOLITIKUM',  col:'rgba(150,120,80,0.12)'  },
      { x:900,  y:1100, text:'🐚 MESOLITIKUM',   col:'rgba(100,180,150,0.12)' },
      { x:1500, y:1100, text:'🌾 NEOLITIKUM',    col:'rgba(180,200,80,0.12)'  },
      { x:400,  y:1900, text:'🗿 MEGALITIKUM',   col:'rgba(100,100,150,0.12)' },
      { x:1100, y:1900, text:'🔨 PERUNDAGIAN',   col:'rgba(200,150,50,0.12)'  },
      { x:2000, y:2000, text:'🌀 AREA RAHASIA',  col:'rgba(150,50,200,0.12)'  },
    ];
    ctx.save();
    zoneLabels.forEach(zl => {
      ctx.font = 'bold 28px sans-serif';
      ctx.fillStyle = zl.col;
      ctx.textAlign = 'center';
      ctx.fillText(zl.text, zl.x + ox, zl.y + oy);
    });
    ctx.textAlign = 'left';
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

      } else if (obj.type === 'ore') {
        ctx.globalAlpha = 0.15; ctx.fillStyle = '#000';
        ctx.beginPath(); ctx.ellipse(sx, sy+3, obj.r*.9, obj.r*.4, 0,0,Math.PI*2); ctx.fill();
        ctx.globalAlpha = 1;
        ctx.fillStyle = '#4a4a4a'; ctx.beginPath(); ctx.ellipse(sx,   sy,   obj.r,   obj.r*.8, .3,0,Math.PI*2); ctx.fill();
        ctx.fillStyle = '#6a6a6a'; ctx.beginPath(); ctx.ellipse(sx+2, sy-2, obj.r-5, obj.r*.5, .3,0,Math.PI*2); ctx.fill();
        ctx.fillStyle = '#dd8844'; ctx.font = '16px serif'; ctx.textAlign = 'center'; ctx.fillText('⛏', sx, sy+6); ctx.textAlign = 'left';
        if (obj.hp < obj.mhp) {
          ctx.fillStyle = '#222'; ctx.fillRect(sx-14,sy-24,28,5);
          ctx.fillStyle = '#ff8844'; ctx.fillRect(sx-14,sy-24,28*(obj.hp/obj.mhp),5);
        }

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
        // Warna unik per portal
        const dimColors = {
          1:'#ff6644', 2:'#4488ff', 3:'#ff4466', 4:'#44dd88',
          5:'#cc8844', 6:'#44ccaa', 7:'#88cc44', 8:'#8844cc', 9:'#cc4488'
        };
        const dimColor = dimColors[obj.dimId] || '#cc88ff';

        ctx.globalAlpha = 0.18 + Math.sin(GS.tick * 0.06) * 0.12;
        ctx.strokeStyle = dimColor; ctx.lineWidth = 3;
        ctx.beginPath(); ctx.arc(sx, sy, 40+pulse, 0, Math.PI*2); ctx.stroke();
        ctx.strokeStyle = dimColor; ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.arc(sx, sy, 28+pulse*0.6, 0, Math.PI*2); ctx.stroke();
        ctx.globalAlpha = 1;
        ctx.fillStyle = `hsla(${(GS.tick + obj.dimId*40) % 360},70%,30%,0.5)`;
        ctx.beginPath(); ctx.arc(sx, sy, 22, 0, Math.PI*2); ctx.fill();
        ctx.fillStyle = dimColor;
        ctx.beginPath(); ctx.arc(sx, sy, 14, 0, Math.PI*2); ctx.fill();
        ctx.font = '20px serif'; ctx.textAlign = 'center';
        ctx.fillText('🌀', sx, sy+7);

        if (obj.visited) {
          ctx.fillStyle = '#00ff00'; ctx.font = 'bold 28px serif';
          ctx.fillText('✓', sx, sy-8);
        }

        // Label dengan background
        ctx.fillStyle = 'rgba(0,0,0,0.6)';
        ctx.beginPath(); ctx.roundRect(sx-52, sy+28, 104, 18, 4); ctx.fill();
        ctx.fillStyle = dimColor; ctx.font = 'bold 10px sans-serif';
        ctx.fillText(obj.label, sx, sy+41);

        if (Utils.dist(Player.x, Player.y, obj.x, obj.y) < 100) {
          ctx.fillStyle = 'rgba(0,0,0,.65)';
          ctx.beginPath(); ctx.roundRect(sx-48, sy-76, 96, 22, 6); ctx.fill();
          ctx.fillStyle = '#fff'; ctx.font = '11px sans-serif';
          const hintText = obj.visited ? '[✓] Sudah Dikunjungi' : '[E] Masuk';
          ctx.fillText(hintText, sx, sy-61);
        }
        ctx.textAlign = 'left';

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

      } else if (obj.type === 'portal') {
        obj.locked = !SecretSystem.hasSecretKey();
        const pulse = Math.sin(GS.tick * 0.08) * 15;
        ctx.save();
        if (obj.locked) {
          ctx.globalAlpha = 0.15;
          ctx.fillStyle = '#ff4444';
        } else {
          ctx.globalAlpha = 0.25 + Math.sin(GS.tick * 0.06) * 0.15;
          ctx.fillStyle = '#00ffcc';
        }
        ctx.beginPath(); ctx.arc(sx, sy, 50+pulse, 0, Math.PI*2); ctx.fill();
        ctx.globalAlpha = 1;
        ctx.strokeStyle = obj.locked ? '#ff4444' : '#00ffcc';
        ctx.lineWidth = 3;
        ctx.beginPath(); ctx.arc(sx, sy, 45, 0, Math.PI*2); ctx.stroke();
        ctx.font = '32px serif'; ctx.textAlign = 'center';
        ctx.fillStyle = obj.locked ? '#ff4444' : '#00ffcc';
        ctx.fillText(obj.locked ? '🔐' : '⭐', sx, sy+12);
        ctx.fillStyle = obj.locked ? '#ff4444' : '#00ffcc';
        ctx.font = 'bold 11px sans-serif';
        ctx.fillText(obj.locked ? 'RAHASIA' : 'PORTAL BOSS', sx, sy+50);
        ctx.textAlign = 'left';
        if (Utils.dist(Player.x, Player.y, obj.x, obj.y) < 100) {
          ctx.fillStyle = 'rgba(0,0,0,.65)';
          ctx.beginPath(); ctx.roundRect(sx-50, sy-72, 100, 22, 6); ctx.fill();
          ctx.fillStyle = '#fff'; ctx.font = '11px sans-serif'; ctx.textAlign = 'center';
          ctx.fillText(obj.locked ? '[E] Butuh Kunci Rahasia' : '[E] MASUK KE BOSS ARENA', sx, sy-57);
          ctx.textAlign = 'left';
        }
        ctx.restore();
      }
      ctx.restore();
    });

    // Arrows
    objects.forEach(obj => {
      if (obj.type !== 'arrow') return;
      const sx = obj.x + ox, sy = obj.y + oy;
      ctx.save();
      ctx.translate(sx, sy);
      ctx.rotate(obj.angle);
      ctx.fillStyle = '#ffcc00';
      ctx.beginPath();
      ctx.moveTo(8, 0); ctx.lineTo(-8, -4); ctx.lineTo(-4, 0); ctx.lineTo(-8, 4);
      ctx.closePath(); ctx.fill();
      ctx.restore();
    });

    // Particles
    particles.forEach(p => {
      ctx.save();
      let alpha = p.life / 50;
      let col = p.col;
      if (GS.flashEpilepsy) { alpha *= 0.5; col = '#888888'; }
      ctx.globalAlpha = alpha;
      ctx.fillStyle = col;
      ctx.beginPath(); ctx.arc(p.x+ox, p.y+oy, p.sz||2, 0, Math.PI*2); ctx.fill();
      ctx.restore();
    });

    AnimalSystem.draw(ctx, ox, oy);
    NPCSystem.draw(ctx, ox, oy);
    Player.drawProjectiles(ctx, ox, oy);
    _drawPlayer(ctx, Player.x + ox, Player.y + oy);

    ctx.fillStyle = 'rgba(0,0,0,.45)'; ctx.fillRect(0, H-86, W, 86);
    ctx.fillStyle = 'rgba(0,255,200,.15)'; ctx.fillRect(0, H-88, W, 2);

    return { ox, oy };
  }

  function _drawPlayer(ctx, px, py) {
    ctx.save();
    const moving = (GS.tick % 100) < 50 ? Math.sin((GS.tick % 100) * Math.PI / 50) : 0;
    const walkSwing = moving * 15;

    ctx.globalAlpha = 0.25; ctx.fillStyle = '#000';
    ctx.beginPath(); ctx.ellipse(px, py+15, 13, 5, 0,0,Math.PI*2); ctx.fill();
    ctx.globalAlpha = 1;

    if (Player.sprintOn && Player.stamina > 3) {
      ctx.globalAlpha = 0.25; ctx.fillStyle = '#00aaff';
      ctx.beginPath(); ctx.arc(px-Math.cos(Player.facing)*18, py-Math.sin(Player.facing)*18, 7, 0, Math.PI*2); ctx.fill();
      ctx.globalAlpha = 1;
    }

    let leftLegX = px + Math.cos(Player.facing + Math.PI/2) * 6 + Math.cos(Player.facing) * walkSwing;
    let leftLegY = py + Math.sin(Player.facing + Math.PI/2) * 6 + Math.sin(Player.facing) * walkSwing;
    let rightLegX = px - Math.cos(Player.facing + Math.PI/2) * 6 - Math.cos(Player.facing) * walkSwing;
    let rightLegY = py - Math.sin(Player.facing + Math.PI/2) * 6 - Math.sin(Player.facing) * walkSwing;

    ctx.strokeStyle = '#2a3a88'; ctx.lineWidth = 4; ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(leftLegX, leftLegY);
    ctx.lineTo(px + Math.cos(Player.facing + Math.PI/2) * 6 + Math.sin(Player.facing) * (walkSwing - 10),
               py + Math.sin(Player.facing + Math.PI/2) * 6 + Math.cos(Player.facing) * (walkSwing - 10) + 8);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(rightLegX, rightLegY);
    ctx.lineTo(px - Math.cos(Player.facing + Math.PI/2) * 6 - Math.sin(Player.facing) * (walkSwing - 10),
               py - Math.sin(Player.facing + Math.PI/2) * 6 - Math.cos(Player.facing) * (walkSwing - 10) + 8);
    ctx.stroke();

    ctx.fillStyle = '#1a2a68';
    ctx.beginPath(); ctx.arc(leftLegX + Math.sin(Player.facing) * 8, leftLegY + Math.cos(Player.facing) * 8 + 8, 3, 0, Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(rightLegX - Math.sin(Player.facing) * 8, rightLegY - Math.cos(Player.facing) * 8 + 8, 3, 0, Math.PI*2); ctx.fill();

    ctx.fillStyle = '#3366cc';
    ctx.beginPath(); ctx.arc(px, py, 13, 0, Math.PI*2); ctx.fill();
    ctx.fillStyle = '#5588ee';
    ctx.beginPath(); ctx.arc(px-2, py-2, 7, 0, Math.PI*2); ctx.fill();

    ctx.fillStyle = '#1144aa';
    ctx.beginPath(); ctx.arc(px, py-7, 9, Math.PI, Math.PI*2); ctx.fill();
    ctx.fillStyle = '#fff';
    ctx.beginPath(); ctx.arc(px-3, py-9, 2, 0, Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(px+3, py-9, 2, 0, Math.PI*2); ctx.fill();

    const armDist = 10;
    let leftArmX = px + Math.cos(Player.facing + Math.PI/2) * armDist + Math.cos(Player.facing) * walkSwing * 0.7;
    let leftArmY = py + Math.sin(Player.facing + Math.PI/2) * armDist + Math.sin(Player.facing) * walkSwing * 0.7;
    let rightArmX = px - Math.cos(Player.facing + Math.PI/2) * armDist - Math.cos(Player.facing) * walkSwing * 0.7;
    let rightArmY = py - Math.sin(Player.facing + Math.PI/2) * armDist - Math.sin(Player.facing) * walkSwing * 0.7;

    ctx.strokeStyle = '#4477dd'; ctx.lineWidth = 3; ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(px + Math.cos(Player.facing + Math.PI/2) * 8, py + Math.sin(Player.facing + Math.PI/2) * 8);
    ctx.lineTo(leftArmX, leftArmY - 3); ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(px - Math.cos(Player.facing + Math.PI/2) * 8, py - Math.sin(Player.facing + Math.PI/2) * 8);
    ctx.lineTo(rightArmX, rightArmY - 3); ctx.stroke();

    ctx.fillStyle = '#2a4a99';
    ctx.beginPath(); ctx.arc(leftArmX, leftArmY, 4, 0, Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(rightArmX, rightArmY, 4, 0, Math.PI*2); ctx.fill();

    if (Player.equipped) {
      const weapon = Player.WEAPONS[Player.equipped];
      if (weapon) {
        let weaponX = rightArmX, weaponY = rightArmY, weaponAngle = Player.facing, weaponScale = 1;
        if (Player.atkAnim > 0) {
          const atkProgress = 1 - (Player.atkAnim / weapon.atkAnim);
          weaponAngle = Player.facing + Math.sin(atkProgress * Math.PI) * 1.2;
          const swingDist = Math.sin(atkProgress * Math.PI) * 28;
          weaponX = px + Math.cos(weaponAngle) * swingDist;
          weaponY = py + Math.sin(weaponAngle) * swingDist;
          weaponScale = 1 + Math.sin(atkProgress * Math.PI) * 0.2;
        } else {
          weaponX = rightArmX + Math.cos(Player.facing) * 8;
          weaponY = rightArmY + Math.sin(Player.facing) * 8;
        }
        ctx.save();
        ctx.translate(weaponX, weaponY);
        ctx.rotate(weaponAngle + Math.PI / 2);
        ctx.scale(weaponScale, weaponScale);
        ctx.font = '24px serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.fillText(Player.equipped, 0, 0);
        if (Player.atkAnim > 0) {
          ctx.strokeStyle = 'rgba(0, 255, 200, 0.6)'; ctx.lineWidth = 2;
          ctx.beginPath(); ctx.arc(0, 0, 14, 0, Math.PI * 2); ctx.stroke();
        }
        ctx.restore();
      }
    }

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
    ctx.restore();
  }

  function _getZone() {
    const px = Player.x, py = Player.y;
    if (px > 1600 && py > 1400) return ZONES[9]; // Neozoikum pojok
    if (px > 1600 && py < 600)  return ZONES[3];  // Neozoikum atas
    if (px > 1200 && py < 600)  return ZONES[2];  // Mesozoikum
    if (px > 600  && py < 600)  return ZONES[1];  // Paleozoikum
    if (px < 600  && py < 600)  return ZONES[0];  // Arkeozoikum
    if (px < 400  && py > 600)  return ZONES[4];  // Paleolitikum
    if (px < 1200 && py > 1400) return ZONES[7];  // Megalitikum
    if (px > 1200 && py > 900)  return ZONES[4];  // Perundagian
    if (py < 900)               return ZONES[2];
    return ZONES[5];
  }

  return {
    get objects()  { return objects; },
    get cam()      { return cam;     },
    init, update, draw, spawnParticles, spawnBurst, spawnReturn,
  };
})();