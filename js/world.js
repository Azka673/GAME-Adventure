// ===== WORLD.JS =====

const World = (() => {
  let objects   = [];
  let particles = [];
  let cam       = { x: 200, y: 200 };
  const MAP_SIZE = 2400;
  const ZONES  = ["🌲 Hutan Paleolitikum","🌿 Padang Mesolitikum","🌾 Ladang Neolitikum","🗿 Bukit Megalitikum","🔨 Tambang Perundagian","🌀 Area Rahasia","🌋 Zona Arkeozoikum","🦕 Zona Paleozoikum","🦖 Zona Mesozoikum","🌿 Zona Neozoikum"];
  const RESPAWN_TIME     = 600;
  const KEY_RESPAWN_TIME = 1800;
  const RESPAWN_LIST = [];
  const KEY_CHESTS   = [];

  // ═══ MINIMAP ═══
  // Langsung terbuka dari awal
  let minimapOpen = true;
  const MM = { x:0, y:0, size:160, scale:0 }; // ukuran lebih kecil agar pas di taskbar

  // Struktur dekoratif — drawn once, stored as static objects
  const STRUCTURES = [];

  function _buildStructures() {
    STRUCTURES.length = 0;

    // ── Stonehenge mini (Megalitikum zona) ──────────────────
    const SH = { cx:500, cy:1800 };
    for (let i = 0; i < 8; i++) {
      const a = (i / 8) * Math.PI * 2;
      STRUCTURES.push({ type:'menhir', x: SH.cx + Math.cos(a)*60, y: SH.cy + Math.sin(a)*60 });
    }
    STRUCTURES.push({ type:'altar', x: SH.cx, y: SH.cy });

    // ── Desa Neolitikum (rumah jerami) ──────────────────────
    const villagePos = [
      [1450,900],[1520,860],[1480,960],[1560,920],[1420,980],[1550,1000],
    ];
    villagePos.forEach(([x,y]) => STRUCTURES.push({ type:'hut', x, y }));
    // Perapian desa
    STRUCTURES.push({ type:'campfire', x:1490, y:930 });

    // ── Gua batu (Paleolitikum) ─────────────────────────────
    STRUCTURES.push({ type:'cave', x:200, y:950 });
    STRUCTURES.push({ type:'cave', x:320, y:1050 });

    // ── Tambang (Perundagian) ───────────────────────────────
    STRUCTURES.push({ type:'mine_entrance', x:1200, y:1950 });
    STRUCTURES.push({ type:'mine_entrance', x:1350, y:2050 });
    // Rel tambang
    for (let i = 0; i < 5; i++) {
      STRUCTURES.push({ type:'rail', x:1220 + i*30, y:1980 });
    }

    // ── Kolam lava / kawah (Arkeozoikum) ───────────────────
    STRUCTURES.push({ type:'lava_pool', x:250, y:350 });
    STRUCTURES.push({ type:'lava_pool', x:180, y:500 });

    // ── Reruntuhan kuno (Paleozoikum) ──────────────────────
    const ruinPos = [[700,300],[760,280],[820,320],[750,360],[830,380]];
    ruinPos.forEach(([x,y]) => STRUCTURES.push({ type:'ruin_pillar', x, y }));

    // ── Tulang dinosaurus raksasa (Mesozoikum) ─────────────
    STRUCTURES.push({ type:'dino_skull', x:1300, y:350 });
    for (let i = 0; i < 6; i++) {
      STRUCTURES.push({ type:'dino_bone', x:1320 + i*28, y:390 + (i%2)*14 });
    }

    // ── Pohon purba raksasa (Neozoikum) ────────────────────
    STRUCTURES.push({ type:'giant_tree', x:1950, y:400 });
    STRUCTURES.push({ type:'giant_tree', x:2100, y:500 });

    // ── Perkemahan pemburu ──────────────────────────────────
    STRUCTURES.push({ type:'campfire', x:850, y:900 });
    STRUCTURES.push({ type:'tent',     x:800, y:870 });
    STRUCTURES.push({ type:'tent',     x:890, y:870 });

    // ── Sumur batu ──────────────────────────────────────────
    STRUCTURES.push({ type:'well', x:1480, y:1000 });
    STRUCTURES.push({ type:'well', x:900,  y:1950 });

    // ── Jembatan kayu di sungai ────────────────────────────
    for (let i = 0; i < 6; i++) {
      STRUCTURES.push({ type:'bridge_plank', x:600 + i*18, y:680 });
    }

    // ── Pagar kayu (batas desa) ─────────────────────────────
    for (let i = 0; i < 10; i++) {
      STRUCTURES.push({ type:'fence', x:1380 + i*22, y:850 });
      STRUCTURES.push({ type:'fence', x:1380 + i*22, y:1060 });
    }
    for (let i = 0; i < 10; i++) {
      STRUCTURES.push({ type:'fence', x:1380, y:870 + i*20 });
      STRUCTURES.push({ type:'fence', x:1590, y:870 + i*20 });
    }

    // ── Piramid kecil (Megalitikum) ────────────────────────
    STRUCTURES.push({ type:'pyramid', x:1100, y:1750 });

    // ── Area api unggun malam ──────────────────────────────
    [[300,700],[1000,500],[1700,1100],[800,2000],[2000,1500]].forEach(([x,y]) => {
      STRUCTURES.push({ type:'campfire', x, y });
    });

    // ── Bebatuan sungai / jalur air ─────────────────────────
    for (let i = 0; i < 12; i++) {
      STRUCTURES.push({ type:'river_rock', x:580 + i*14, y:640 + Math.sin(i)*20 });
    }

    // ── Tanda arah (signpost) ──────────────────────────────
    STRUCTURES.push({ type:'signpost', x:400,  y:600,  label:'← Gua' });
    STRUCTURES.push({ type:'signpost', x:1100, y:800,  label:'Desa →' });
    STRUCTURES.push({ type:'signpost', x:1000, y:1800, label:'↓ Tambang' });
  }

  function init() {
    objects   = [];
    particles = [];
    RESPAWN_LIST.length = 0;
    _buildStructures();

    // Trees
    const treePositions = [
      [128,128],[320,96],[560,144],[832,112],[240,448],[976,432],[624,544],[1152,224],[80,624],
      [1312,624],[384,784],[1056,784],[1472,464],[176,944],[1216,944],[640,1104],[336,1184],
      [976,1184],[1440,1088],[80,1088],[736,288],[464,608],[1184,704],[208,1184],[896,288],
      [1600,200],[1750,400],[1900,150],[2100,300],[2250,500],[1650,700],[1850,900],
      [2000,1100],[2200,800],[1700,1300],[1950,1500],[2100,1700],[1600,1600],[2300,1000],
      [1800,1800],[2000,2000],[1700,2200],[2200,2100],[1900,2300],[2350,1500],
      [400,1400],[600,1600],[800,1800],[200,1600],[500,2000],[700,2200],[300,2000],
      [1000,1400],[1200,1600],[1100,2000],[900,2200],[1300,1800],[1050,2300],
    ];
    treePositions.forEach(([x,y]) => {
      const obj = { type:'tree', x, y, hp:3, mhp:3, r:22, drop:{e:'🪵',n:'Kayu',c:2}, respawnTimer:0 };
      objects.push(obj);
      RESPAWN_LIST.push({ type:'tree', x, y, obj });
    });

    // Rocks
    const rockPositions = [
      [496,304],[736,272],[976,224],[160,784],[656,752],[1136,656],[416,1024],[896,976],
      [1312,864],[1472,304],[576,944],[256,624],[864,480],[1120,896],[1344,448],
      [1600,500],[1800,700],[2000,400],[2200,600],[1650,1000],[1900,1200],
      [2100,900],[2300,1200],[1750,1500],[2050,1700],[1600,1900],[2250,1900],
      [500,1500],[700,1700],[900,1900],[1100,1500],[300,1800],[1200,2100],
    ];
    rockPositions.forEach(([x,y]) => {
      const obj = { type:'rock', x, y, hp:4, mhp:4, r:18, drop:{e:'🪨',n:'Batu',c:1}, respawnTimer:0 };
      objects.push(obj);
      RESPAWN_LIST.push({ type:'rock', x, y, obj });
    });

    // Food/plants
    const foodPositions = [
      [288,232],[680,392],[1056,552],[488,712],[888,792],[328,944],[1136,1024],[704,864],[512,448],
      [1700,300],[1900,600],[2100,200],[2200,1000],[1800,1400],[2000,1600],[1650,1800],
      [600,1400],[800,1600],[400,2000],[1000,2000],[1200,1800],
    ];
    foodPositions.forEach(([x,y]) => {
      const obj = { type:'food', x, y, hp:1, mhp:1, r:13, drop:{e:'🍖',n:'Daging',c:1}, respawnTimer:0 };
      objects.push(obj);
      RESPAWN_LIST.push({ type:'food', x, y, obj });
    });

    // Ore
    const orePositions = [
      [450,280],[950,450],[1200,600],[650,950],[1400,850],
      [1700,800],[2000,700],[2200,1300],[1900,1700],[2300,1600],
    ];
    orePositions.forEach(([x,y]) => {
      const obj = { type:'ore', x, y, hp:2, mhp:2, r:16, drop:{e:'⛏',n:'Besi',c:2}, respawnTimer:0 };
      objects.push(obj);
      RESPAWN_LIST.push({ type:'ore', x, y, obj });
    });

    // Chests
    const chest1 = { type:'chest', x:600,  y:500,  r:18, opened:false, drop:{e:'🔑',n:'Kunci Portal',  c:1}, chestRespawnTimer:0 };
    const chest2 = { type:'chest', x:784,  y:832,  r:18, opened:false, drop:{e:'⚔', n:'Pedang Kuno',   c:1}, chestRespawnTimer:0 };
    const chest3 = { type:'chest', x:1376, y:1040, r:18, opened:false, drop:{e:'🛡', n:'Perisai Kuno',  c:1}, chestRespawnTimer:0 };
    const chest4 = { type:'chest', x:1900, y:900,  r:18, opened:false, drop:{e:'💎', n:'Kristal Purba', c:1}, chestRespawnTimer:0 };
    const chest5 = { type:'chest', x:2100, y:1800, r:18, opened:false, drop:{e:'🏺', n:'Artefak Kuno',  c:1}, chestRespawnTimer:0 };
    objects.push(chest1, chest2, chest3, chest4, chest5);
    KEY_CHESTS.push(chest1, chest2, chest3, chest4, chest5);

    // 9 Dimension Portals
    objects.push({ type:'dimension', x:250,  y:200,  r:32, dimId:1, label:'Zaman Arkeozoikum',  visited:false });
    objects.push({ type:'dimension', x:700,  y:180,  r:32, dimId:2, label:'Zaman Paleozoikum',  visited:false });
    objects.push({ type:'dimension', x:1250, y:220,  r:32, dimId:3, label:'Zaman Mesozoikum',   visited:false });
    objects.push({ type:'dimension', x:1800, y:250,  r:32, dimId:4, label:'Zaman Neozoikum',    visited:false });
    objects.push({ type:'dimension', x:280,  y:900,  r:32, dimId:5, label:'Zaman Paleolitikum', visited:false });
    objects.push({ type:'dimension', x:900,  y:750,  r:32, dimId:6, label:'Zaman Mesolitikum',  visited:false });
    objects.push({ type:'dimension', x:1500, y:850,  r:32, dimId:7, label:'Zaman Neolitikum',   visited:false });
    objects.push({ type:'dimension', x:400,  y:1700, r:32, dimId:8, label:'Zaman Megalitikum',  visited:false });
    objects.push({ type:'dimension', x:1100, y:1900, r:32, dimId:9, label:'Zaman Perundagian',  visited:false });

    // Secret portal + beacon
    objects.push({ type:'portal', x:2200, y:2200, r:40, isSecret:true, locked:true });
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
      const timeNames = ['day','sore','night','dawn'];
      const prevTime  = GS.timeOfDay;
      GS.timeOfDay    = timeNames[GS.timeOffset];
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
      p.x += p.vx; p.y += p.vy; p.life--;
      p.vx *= 0.9; p.vy *= 0.9;
      if (p.life <= 0) particles.splice(i, 1);
    }

    for (const rd of RESPAWN_LIST) {
      const obj = rd.obj;
      if (obj.hp !== undefined && obj.hp <= -900) {
        obj.respawnTimer = (obj.respawnTimer || 0) + 1;
        if (obj.respawnTimer >= RESPAWN_TIME) {
          obj.hp = obj.mhp; obj.respawnTimer = 0;
          World.spawnParticles(obj.x, obj.y, '#00ff88', 5);
          Utils.notify(`🌱 Resource respawned!`, '#00ff88');
        }
      }
    }

    for (let i = objects.length - 1; i >= 0; i--) {
      const arrow = objects[i];
      if (arrow.type !== 'arrow') continue;
      arrow.x += arrow.vx; arrow.y += arrow.vy; arrow.life--;
      if (arrow.life <= 0 || arrow.x < 0 || arrow.x > MAP_SIZE || arrow.y < 0 || arrow.y > MAP_SIZE) {
        objects.splice(i, 1); continue;
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
      if (objects[i].hp !== undefined && objects[i].hp <= -900 && objects[i].respawnTimer < 1)
        objects.splice(i, 1);
    }

    for (const chest of KEY_CHESTS) {
      if (chest.opened) {
        chest.chestRespawnTimer = (chest.chestRespawnTimer || 0) + 1;
        if (chest.chestRespawnTimer >= KEY_RESPAWN_TIME) {
          chest.opened = false; chest.chestRespawnTimer = 0;
          World.spawnParticles(chest.x, chest.y, '#ffcc00', 8);
          Utils.notify(`✨ ${chest.drop.n} muncul di chest lagi!`, '#ffcc00');
        }
      }
    }

    const zoneEl = document.getElementById('hZone');
    if (zoneEl) zoneEl.textContent = _getZone();
  }

  function spawnParticles(x, y, col, n = 4) {
    for (let i = 0; i < n; i++)
      particles.push({ x, y, vx:(Math.random()-.5)*3, vy:(Math.random()-.5)*3, life:28, col, sz:2 });
  }

  function spawnBurst(x, y, col) {
    for (let i = 0; i < 14; i++) {
      const a = Math.random()*Math.PI*2, s = 1.5+Math.random()*3;
      particles.push({ x, y, vx:Math.cos(a)*s, vy:Math.sin(a)*s, life:50, col, sz:3+Math.random()*4 });
    }
  }

  function spawnReturn(x, y) {
    for (let i = 0; i < 20; i++)
      particles.push({ x:x+(Math.random()-.5)*200, y:-50, vx:(Math.random()-.5)*2, vy:2+Math.random()*3, life:100, col:'#00ffcc', sz:4 });
  }

  // ═══════════════════════════════════════════════════════════
  //  DRAW STRUCTURES
  // ═══════════════════════════════════════════════════════════
  function _drawStructures(ctx, ox, oy, W, H) {
    const t = GS.tick;
    STRUCTURES.forEach(s => {
      const sx = s.x + ox, sy = s.y + oy;
      if (sx < -120 || sx > W+120 || sy < -120 || sy > H+120) return;
      ctx.save();

      switch (s.type) {

        case 'menhir': {
          // Shadow
          ctx.globalAlpha = 0.2; ctx.fillStyle = '#000';
          ctx.beginPath(); ctx.ellipse(sx+4, sy+8, 8, 4, 0, 0, Math.PI*2); ctx.fill();
          ctx.globalAlpha = 1;
          // Stone pillar
          ctx.fillStyle = '#7a7a8a';
          ctx.fillRect(sx-6, sy-28, 12, 32);
          ctx.fillStyle = '#9a9aaa';
          ctx.fillRect(sx-5, sy-26, 5, 10);
          // Cap
          ctx.fillStyle = '#6a6a7a';
          ctx.fillRect(sx-8, sy-30, 16, 5);
          break;
        }

        case 'altar': {
          ctx.globalAlpha = 0.2; ctx.fillStyle = '#000';
          ctx.beginPath(); ctx.ellipse(sx, sy+6, 20, 8, 0, 0, Math.PI*2); ctx.fill();
          ctx.globalAlpha = 1;
          ctx.fillStyle = '#8888aa';
          ctx.fillRect(sx-18, sy-10, 36, 14);
          ctx.fillStyle = '#aaaabb';
          ctx.fillRect(sx-14, sy-14, 28, 6);
          // Glow on altar
          ctx.globalAlpha = 0.15 + Math.sin(t*0.05)*0.1;
          ctx.fillStyle = '#cc88ff';
          ctx.beginPath(); ctx.arc(sx, sy-10, 12, 0, Math.PI*2); ctx.fill();
          break;
        }

        case 'hut': {
          // Shadow
          ctx.globalAlpha = 0.18; ctx.fillStyle = '#000';
          ctx.beginPath(); ctx.ellipse(sx+3, sy+10, 20, 7, 0, 0, Math.PI*2); ctx.fill();
          ctx.globalAlpha = 1;
          // Walls
          ctx.fillStyle = '#a0784a';
          ctx.fillRect(sx-14, sy-12, 28, 22);
          // Door
          ctx.fillStyle = '#5a3a18';
          ctx.fillRect(sx-4, sy+2, 8, 10);
          // Roof (thatch)
          ctx.fillStyle = '#c8a844';
          ctx.beginPath();
          ctx.moveTo(sx-18, sy-10);
          ctx.lineTo(sx,    sy-30);
          ctx.lineTo(sx+18, sy-10);
          ctx.closePath(); ctx.fill();
          ctx.fillStyle = '#e0c060';
          ctx.beginPath();
          ctx.moveTo(sx-14, sy-12);
          ctx.lineTo(sx,    sy-28);
          ctx.lineTo(sx+14, sy-12);
          ctx.closePath(); ctx.fill();
          // Window
          ctx.fillStyle = '#ffeeaa';
          ctx.fillRect(sx-12, sy-6, 6, 6);
          ctx.fillRect(sx+6,  sy-6, 6, 6);
          break;
        }

        case 'campfire': {
          // Logs
          ctx.fillStyle = '#6a3a18';
          ctx.save(); ctx.translate(sx, sy);
          ctx.rotate(0.4); ctx.fillRect(-10, -3, 20, 5); ctx.restore();
          ctx.save(); ctx.translate(sx, sy);
          ctx.rotate(-0.4); ctx.fillRect(-10, -3, 20, 5); ctx.restore();
          // Fire flicker
          const flicker = Math.sin(t * 0.22) * 0.3 + 0.7;
          ctx.globalAlpha = flicker;
          // Outer flame
          ctx.fillStyle = '#ff6600';
          ctx.beginPath();
          ctx.ellipse(sx, sy-6, 7, 10, 0, 0, Math.PI*2); ctx.fill();
          // Inner flame
          ctx.fillStyle = '#ffdd00';
          ctx.beginPath();
          ctx.ellipse(sx, sy-8, 4, 7, 0, 0, Math.PI*2); ctx.fill();
          // Core
          ctx.fillStyle = '#fff';
          ctx.beginPath();
          ctx.ellipse(sx, sy-9, 2, 3, 0, 0, Math.PI*2); ctx.fill();
          ctx.globalAlpha = 1;
          // Embers / smoke
          if (t % 8 === 0) spawnParticles(sx - ox, sy - oy - 12, '#ff8844', 1);
          break;
        }

        case 'cave': {
          // Ground shadow
          ctx.globalAlpha = 0.25; ctx.fillStyle = '#000';
          ctx.beginPath(); ctx.ellipse(sx+5, sy+8, 34, 14, 0, 0, Math.PI*2); ctx.fill();
          ctx.globalAlpha = 1;
          // Cliff face
          ctx.fillStyle = '#5a5a5a';
          ctx.beginPath();
          ctx.moveTo(sx-40, sy+10);
          ctx.lineTo(sx-30, sy-30);
          ctx.lineTo(sx+30, sy-35);
          ctx.lineTo(sx+40, sy+10);
          ctx.closePath(); ctx.fill();
          // Cave mouth (dark ellipse)
          ctx.fillStyle = '#111';
          ctx.beginPath();
          ctx.ellipse(sx, sy, 22, 16, 0, 0, Math.PI*2); ctx.fill();
          // Rock highlights
          ctx.fillStyle = '#7a7a7a';
          ctx.beginPath();
          ctx.moveTo(sx-38, sy+8);
          ctx.lineTo(sx-28, sy-28);
          ctx.lineTo(sx-14, sy-28);
          ctx.lineTo(sx-20, sy+8);
          ctx.closePath(); ctx.fill();
          break;
        }

        case 'mine_entrance': {
          ctx.globalAlpha = 0.2; ctx.fillStyle = '#000';
          ctx.beginPath(); ctx.ellipse(sx, sy+6, 22, 8, 0, 0, Math.PI*2); ctx.fill();
          ctx.globalAlpha = 1;
          // Frame kayu
          ctx.fillStyle = '#6a4a1a';
          ctx.fillRect(sx-16, sy-28, 6, 32); // kiri
          ctx.fillRect(sx+10, sy-28, 6, 32); // kanan
          ctx.fillRect(sx-16, sy-30, 32, 6); // atas
          // Pintu gelap
          ctx.fillStyle = '#111';
          ctx.fillRect(sx-10, sy-24, 20, 28);
          // Glow dari dalam
          ctx.globalAlpha = 0.2 + Math.sin(t*0.04)*0.1;
          ctx.fillStyle = '#ffaa44';
          ctx.beginPath(); ctx.arc(sx, sy-10, 8, 0, Math.PI*2); ctx.fill();
          break;
        }

        case 'rail': {
          ctx.fillStyle = '#884422';
          ctx.fillRect(sx-6, sy-2, 12, 5);
          ctx.fillStyle = '#aaaaaa';
          ctx.fillRect(sx-7, sy-1, 14, 2);
          break;
        }

        case 'lava_pool': {
          const lf = Math.sin(t * 0.07 + s.x) * 0.15;
          ctx.globalAlpha = 0.85 + lf;
          ctx.fillStyle = '#ff4400';
          ctx.beginPath(); ctx.ellipse(sx, sy, 28, 18, 0, 0, Math.PI*2); ctx.fill();
          ctx.globalAlpha = 0.7 + lf;
          ctx.fillStyle = '#ff8800';
          ctx.beginPath(); ctx.ellipse(sx-4, sy-4, 16, 10, 0.3, 0, Math.PI*2); ctx.fill();
          ctx.globalAlpha = 0.5 + lf;
          ctx.fillStyle = '#ffcc00';
          ctx.beginPath(); ctx.ellipse(sx-6, sy-6, 8, 5, 0.3, 0, Math.PI*2); ctx.fill();
          ctx.globalAlpha = 1;
          // Bubble effect
          if (t % 30 === 0) spawnParticles(sx - ox + (Math.random()-0.5)*20, sy - oy - 5, '#ff6600', 2);
          break;
        }

        case 'ruin_pillar': {
          ctx.globalAlpha = 0.15; ctx.fillStyle = '#000';
          ctx.beginPath(); ctx.ellipse(sx+3, sy+6, 10, 4, 0, 0, Math.PI*2); ctx.fill();
          ctx.globalAlpha = 1;
          const h = 20 + (s.x % 3) * 10; // varied heights
          ctx.fillStyle = '#9a8866';
          ctx.fillRect(sx-7, sy-h, 14, h+4);
          ctx.fillStyle = '#ccc0a0';
          ctx.fillRect(sx-6, sy-h, 6, 8);
          // Cracks
          ctx.strokeStyle = '#6a5844'; ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(sx-2, sy-h+10); ctx.lineTo(sx+4, sy-h+20); ctx.stroke();
          break;
        }

        case 'dino_skull': {
          ctx.globalAlpha = 0.2; ctx.fillStyle = '#000';
          ctx.beginPath(); ctx.ellipse(sx+4, sy+10, 30, 10, 0, 0, Math.PI*2); ctx.fill();
          ctx.globalAlpha = 1;
          // Skull body
          ctx.fillStyle = '#e8dcc8';
          ctx.beginPath(); ctx.ellipse(sx, sy, 28, 20, 0, 0, Math.PI*2); ctx.fill();
          // Snout
          ctx.fillStyle = '#d8ccb8';
          ctx.beginPath();
          ctx.moveTo(sx+20, sy-4);
          ctx.lineTo(sx+50, sy-2);
          ctx.lineTo(sx+50, sy+8);
          ctx.lineTo(sx+20, sy+6);
          ctx.closePath(); ctx.fill();
          // Eye socket
          ctx.fillStyle = '#222';
          ctx.beginPath(); ctx.arc(sx+6, sy-6, 9, 0, Math.PI*2); ctx.fill();
          ctx.fillStyle = '#444';
          ctx.beginPath(); ctx.arc(sx+6, sy-6, 5, 0, Math.PI*2); ctx.fill();
          // Teeth
          ctx.fillStyle = '#fff';
          for (let i = 0; i < 5; i++) {
            ctx.fillRect(sx+22+i*6, sy+6, 4, 8);
          }
          break;
        }

        case 'dino_bone': {
          ctx.globalAlpha = 0.15; ctx.fillStyle = '#000';
          ctx.beginPath(); ctx.ellipse(sx+2, sy+4, 12, 4, 0, 0, Math.PI*2); ctx.fill();
          ctx.globalAlpha = 1;
          ctx.fillStyle = '#e0d4b8';
          ctx.fillRect(sx-2, sy-14, 6, 20);
          ctx.beginPath(); ctx.arc(sx+1, sy-14, 6, 0, Math.PI*2); ctx.fill();
          ctx.beginPath(); ctx.arc(sx+1, sy+6,  6, 0, Math.PI*2); ctx.fill();
          break;
        }

        case 'giant_tree': {
          ctx.globalAlpha = 0.2; ctx.fillStyle = '#000';
          ctx.beginPath(); ctx.ellipse(sx+6, sy+16, 26, 10, 0, 0, Math.PI*2); ctx.fill();
          ctx.globalAlpha = 1;
          // Trunk
          ctx.fillStyle = '#5a3a18';
          ctx.fillRect(sx-10, sy-20, 20, 40);
          ctx.fillStyle = '#7a5a28';
          ctx.fillRect(sx-8,  sy-18, 8,  20);
          // Canopy layers
          ctx.fillStyle = '#1a5a1a';
          ctx.beginPath(); ctx.arc(sx, sy-30, 36, 0, Math.PI*2); ctx.fill();
          ctx.fillStyle = '#2a7a2a';
          ctx.beginPath(); ctx.arc(sx-8, sy-46, 26, 0, Math.PI*2); ctx.fill();
          ctx.fillStyle = '#3a9a3a';
          ctx.beginPath(); ctx.arc(sx+6, sy-56, 18, 0, Math.PI*2); ctx.fill();
          ctx.fillStyle = '#44aa44';
          ctx.beginPath(); ctx.arc(sx, sy-64, 10, 0, Math.PI*2); ctx.fill();
          break;
        }

        case 'tent': {
          ctx.globalAlpha = 0.15; ctx.fillStyle = '#000';
          ctx.beginPath(); ctx.ellipse(sx+2, sy+6, 16, 5, 0, 0, Math.PI*2); ctx.fill();
          ctx.globalAlpha = 1;
          ctx.fillStyle = '#8a6a3a';
          ctx.beginPath();
          ctx.moveTo(sx-18, sy+4);
          ctx.lineTo(sx,    sy-22);
          ctx.lineTo(sx+18, sy+4);
          ctx.closePath(); ctx.fill();
          ctx.fillStyle = '#aa8844';
          ctx.beginPath();
          ctx.moveTo(sx-14, sy+4);
          ctx.lineTo(sx,    sy-18);
          ctx.lineTo(sx+14, sy+4);
          ctx.closePath(); ctx.fill();
          // Door flap
          ctx.fillStyle = '#6a4a2a';
          ctx.beginPath();
          ctx.moveTo(sx-4, sy+4);
          ctx.lineTo(sx,   sy-8);
          ctx.lineTo(sx+4, sy+4);
          ctx.closePath(); ctx.fill();
          break;
        }

        case 'well': {
          ctx.globalAlpha = 0.2; ctx.fillStyle = '#000';
          ctx.beginPath(); ctx.ellipse(sx+3, sy+8, 18, 6, 0, 0, Math.PI*2); ctx.fill();
          ctx.globalAlpha = 1;
          // Base
          ctx.fillStyle = '#7a7a7a';
          ctx.beginPath(); ctx.arc(sx, sy, 16, 0, Math.PI*2); ctx.fill();
          ctx.fillStyle = '#555';
          ctx.beginPath(); ctx.arc(sx, sy, 12, 0, Math.PI*2); ctx.fill();
          ctx.fillStyle = '#224488';
          ctx.beginPath(); ctx.arc(sx, sy, 10, 0, Math.PI*2); ctx.fill();
          // Roof posts
          ctx.fillStyle = '#8a6a2a';
          ctx.fillRect(sx-14, sy-22, 4, 22);
          ctx.fillRect(sx+10, sy-22, 4, 22);
          // Roof
          ctx.fillStyle = '#aa8833';
          ctx.beginPath();
          ctx.moveTo(sx-18, sy-20);
          ctx.lineTo(sx,    sy-36);
          ctx.lineTo(sx+18, sy-20);
          ctx.closePath(); ctx.fill();
          // Rope
          ctx.strokeStyle = '#885522'; ctx.lineWidth = 2;
          ctx.beginPath(); ctx.moveTo(sx, sy-20); ctx.lineTo(sx, sy-10); ctx.stroke();
          break;
        }

        case 'bridge_plank': {
          ctx.fillStyle = '#8a6030';
          ctx.fillRect(sx-7, sy-3, 14, 7);
          ctx.fillStyle = '#aa8040';
          ctx.fillRect(sx-6, sy-2, 5, 4);
          ctx.strokeStyle = '#6a4820'; ctx.lineWidth = 1;
          ctx.strokeRect(sx-7, sy-3, 14, 7);
          break;
        }

        case 'fence': {
          ctx.fillStyle = '#8a6030';
          ctx.fillRect(sx-2, sy-14, 5, 18);
          ctx.fillRect(sx-4, sy-12, 9, 3);
          ctx.fillRect(sx-4, sy-5,  9, 3);
          break;
        }

        case 'pyramid': {
          ctx.globalAlpha = 0.25; ctx.fillStyle = '#000';
          ctx.beginPath(); ctx.ellipse(sx+5, sy+12, 50, 14, 0, 0, Math.PI*2); ctx.fill();
          ctx.globalAlpha = 1;
          // Base
          ctx.fillStyle = '#c8a866';
          ctx.beginPath();
          ctx.moveTo(sx-55, sy+10);
          ctx.lineTo(sx,    sy-60);
          ctx.lineTo(sx+55, sy+10);
          ctx.closePath(); ctx.fill();
          // Shading
          ctx.fillStyle = '#a88844';
          ctx.beginPath();
          ctx.moveTo(sx,    sy-60);
          ctx.lineTo(sx+55, sy+10);
          ctx.lineTo(sx,    sy+10);
          ctx.closePath(); ctx.fill();
          // Blocks detail
          ctx.strokeStyle = '#b09050'; ctx.lineWidth = 1;
          for (let row = 0; row < 4; row++) {
            const yy = sy - 50 + row * 16;
            const ww = (row + 1) * 25;
            ctx.beginPath();
            ctx.moveTo(sx - ww, yy);
            ctx.lineTo(sx + ww, yy);
            ctx.stroke();
          }
          // Capstone glow
          ctx.globalAlpha = 0.3 + Math.sin(t * 0.04) * 0.2;
          ctx.fillStyle = '#ffdd44';
          ctx.beginPath(); ctx.arc(sx, sy-60, 6, 0, Math.PI*2); ctx.fill();
          break;
        }

        case 'river_rock': {
          ctx.fillStyle = '#5a6a6a';
          ctx.beginPath(); ctx.ellipse(sx, sy, 7, 5, s.x*0.3, 0, Math.PI*2); ctx.fill();
          ctx.fillStyle = '#7a8a8a';
          ctx.beginPath(); ctx.ellipse(sx-2, sy-1, 3, 2, 0.2, 0, Math.PI*2); ctx.fill();
          break;
        }

        case 'signpost': {
          ctx.fillStyle = '#7a5a20';
          ctx.fillRect(sx-2, sy-24, 5, 28);
          ctx.fillStyle = '#a07830';
          ctx.fillRect(sx-18, sy-28, 36, 12);
          ctx.fillStyle = '#fff';
          ctx.font = 'bold 8px sans-serif'; ctx.textAlign = 'center';
          ctx.fillText(s.label || '?', sx, sy-19);
          ctx.textAlign = 'left';
          break;
        }
      }
      ctx.restore();
    });
  }

  // ═══════════════════════════════════════════════════════════
  //  MINIMAP — posisi di atas joystick, di bawah taskbar kanan
  // ═══════════════════════════════════════════════════════════
  function _drawMinimap(ctx, W, H) {
    if (!minimapOpen) return;

    const mmSize = MM.size; // 160px
    const scale  = mmSize / MAP_SIZE;

    // ── Posisi: pojok kanan bawah, di atas joystick ──
    // Joystick biasanya ada di kiri bawah, taskbar di atas 86px dari bawah.
    // Kita taruh minimap di kanan bawah, tepat di atas taskbar (H-86).
    // Beri padding 8px dari tepi kanan dan 8px di atas taskbar.
    const TASKBAR_H = 86; // tinggi bottom bar
    const PAD = 8;
    const mmX = W - mmSize - PAD;
    const mmY = H - TASKBAR_H - mmSize - PAD;

    // Background panel
    ctx.save();
    ctx.globalAlpha = 0.90;
    ctx.fillStyle = '#0a1208';
    ctx.strokeStyle = '#00ffcc';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.roundRect(mmX, mmY, mmSize, mmSize, 6);
    ctx.fill();
    ctx.stroke();

    // Title bar tipis di atas minimap
    ctx.globalAlpha = 1;
    ctx.fillStyle = '#00ffcc';
    ctx.font = 'bold 9px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('🗺 PETA  [M]', mmX + mmSize/2, mmY - 3);
    ctx.textAlign = 'left';

    // Clip ke dalam kotak minimap
    ctx.beginPath();
    ctx.roundRect(mmX, mmY, mmSize, mmSize, 6);
    ctx.clip();

    // Zone color fills
    const zones = [
      { x:0,    y:0,    w:600,  h:2400, col:'rgba(68,136,255,0.18)'  },
      { x:600,  y:0,    w:600,  h:600,  col:'rgba(68,204,136,0.18)'  },
      { x:1200, y:900,  w:400,  h:600,  col:'rgba(204,153,68,0.18)'  },
      { x:1600, y:0,    w:800,  h:2400, col:'rgba(136,68,34,0.18)'   },
      { x:0,    y:1400, w:800,  h:1000, col:'rgba(34,68,136,0.18)'   },
      { x:1600, y:1400, w:800,  h:1000, col:'rgba(68,34,136,0.18)'   },
    ];
    zones.forEach(z => {
      ctx.fillStyle = z.col;
      ctx.fillRect(mmX + z.x*scale, mmY + z.y*scale, z.w*scale, z.h*scale);
    });

    // Trees (green dots)
    ctx.fillStyle = '#2a8a2a';
    objects.forEach(o => {
      if (o.type !== 'tree' || (o.hp !== undefined && o.hp < -900)) return;
      ctx.beginPath();
      ctx.arc(mmX + o.x*scale, mmY + o.y*scale, 1.5, 0, Math.PI*2);
      ctx.fill();
    });

    // Rocks (grey)
    ctx.fillStyle = '#777';
    objects.forEach(o => {
      if (o.type !== 'rock' || (o.hp !== undefined && o.hp < -900)) return;
      ctx.beginPath();
      ctx.arc(mmX + o.x*scale, mmY + o.y*scale, 1, 0, Math.PI*2);
      ctx.fill();
    });

    // Chests (gold)
    objects.forEach(o => {
      if (o.type !== 'chest') return;
      ctx.fillStyle = o.opened ? '#555' : '#ffcc00';
      ctx.beginPath();
      ctx.arc(mmX + o.x*scale, mmY + o.y*scale, 2.5, 0, Math.PI*2);
      ctx.fill();
    });

    // Dimension portals
    const dimColors = {
      1:'#ff6644',2:'#4488ff',3:'#ff4466',4:'#44dd88',
      5:'#cc8844',6:'#44ccaa',7:'#88cc44',8:'#8844cc',9:'#cc4488'
    };
    objects.forEach(o => {
      if (o.type !== 'dimension') return;
      ctx.fillStyle = dimColors[o.dimId] || '#cc88ff';
      ctx.globalAlpha = o.visited ? 0.4 : 1;
      ctx.beginPath();
      ctx.arc(mmX + o.x*scale, mmY + o.y*scale, 3, 0, Math.PI*2);
      ctx.fill();
      ctx.globalAlpha = 1;
    });

    // Secret portal
    ctx.fillStyle = '#cc88ff';
    ctx.beginPath();
    ctx.arc(mmX + 2200*scale, mmY + 2200*scale, 3, 0, Math.PI*2);
    ctx.fill();

    // Campfires (orange dots)
    STRUCTURES.forEach(s => {
      if (s.type === 'campfire') {
        ctx.fillStyle = '#ff8844';
        ctx.beginPath();
        ctx.arc(mmX + s.x*scale, mmY + s.y*scale, 1.5, 0, Math.PI*2);
        ctx.fill();
      }
    });

    // Border dalam
    ctx.strokeStyle = 'rgba(0,255,200,0.25)';
    ctx.lineWidth = 1;
    ctx.strokeRect(mmX, mmY, mmSize, mmSize);

    // Player dot (berkedip)
    const blink = Math.sin(GS.tick * 0.18) > 0;
    if (blink) {
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(mmX + Player.x*scale, mmY + Player.y*scale, 3.5, 0, Math.PI*2);
      ctx.fill();
      // Direction arrow
      ctx.strokeStyle = '#00ffcc'; ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(mmX + Player.x*scale, mmY + Player.y*scale);
      ctx.lineTo(
        mmX + Player.x*scale + Math.cos(Player.facing)*7,
        mmY + Player.y*scale + Math.sin(Player.facing)*7
      );
      ctx.stroke();
    }

    ctx.restore();

    // ── Legend kecil DI DALAM panel bawah minimap (di dalam taskbar area) ──
    // Tampilkan legend ringkas di dalam taskbar, sejajar kanan
    ctx.save();
    ctx.globalAlpha = 0.85;
    ctx.fillStyle = 'rgba(0,0,0,0.5)';
    const legH = 18;
    ctx.beginPath();
    ctx.roundRect(mmX, mmY + mmSize + 2, mmSize, legH, 3);
    ctx.fill();
    ctx.globalAlpha = 1;
    ctx.font = '8px sans-serif';
    ctx.textAlign = 'left';
    const leg = [
      { col:'#fff',    t:'◉Kamu' },
      { col:'#2a8a2a', t:'●Pohon' },
      { col:'#ffcc00', t:'●Chest' },
      { col:'#cc88ff', t:'●Portal' },
    ];
    leg.forEach((l, i) => {
      ctx.fillStyle = l.col;
      ctx.fillText(l.t, mmX + 4 + i * 38, mmY + mmSize + 12);
    });
    ctx.restore();
  }

  function toggleMinimap() {
    minimapOpen = !minimapOpen;
    Utils.notify(minimapOpen ? '🗺 Minimap dibuka [M]' : '🗺 Minimap ditutup [M]', '#00ffcc');
  }

  // ═══════════════════════════════════════════════════════════
  //  MAIN DRAW
  // ═══════════════════════════════════════════════════════════
  function draw(ctx) {
    const W = ctx.canvas.width, H = ctx.canvas.height;

    const halfW = W / 2, halfH = H / 2;
    cam.x = Utils.clamp(cam.x, halfW,  MAP_SIZE - halfW);
    cam.y = Utils.clamp(cam.y, halfH,  MAP_SIZE - halfH);

    const ox = halfW - cam.x;
    const oy = halfH - cam.y;

    ctx.clearRect(0, 0, W, H);

    // Time of day background
    let bgColor = '#141e0e', tintAlpha = 0.07, overlayColor = null, lightingBoost = 0;
    GS.torchActive = Inventory.has('🔦', 1);
    if (GS.torchActive) lightingBoost = 0.35;

    if (GS.timeOfDay === 'day')  { bgColor = '#3a4a2a'; tintAlpha = 0.05; }
    else if (GS.timeOfDay === 'sore')  { bgColor = '#4a3a1a'; overlayColor = 'rgba(255,140,0,0.25)'; tintAlpha = 0.08; }
    else if (GS.timeOfDay === 'night') { bgColor = '#0a0a14'; overlayColor = `rgba(30,40,80,${0.45-lightingBoost})`; tintAlpha = 0.15; }
    else if (GS.timeOfDay === 'dawn')  { bgColor = '#1a0f1a'; overlayColor = 'rgba(150,100,200,0.20)'; tintAlpha = 0.10; }

    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, W, H);
    if (overlayColor) { ctx.fillStyle = overlayColor; ctx.fillRect(0, 0, W, H); }

    if (GS.torchActive && GS.timeOfDay === 'night') {
      ctx.save();
      const tg = ctx.createRadialGradient(W/2,H/2,0,W/2,H/2,Math.max(W,H)*0.7);
      tg.addColorStop(0,'rgba(255,180,0,0.15)'); tg.addColorStop(1,'transparent');
      ctx.fillStyle = tg; ctx.fillRect(0,0,W,H);
      ctx.restore();
    }

    // Zone tints
    ctx.save(); ctx.globalAlpha = tintAlpha;
    ctx.fillStyle='#4488ff'; ctx.fillRect(ox,       oy,       400, MAP_SIZE);
    ctx.fillStyle='#44cc88'; ctx.fillRect(400+ox,   oy,       400, 600);
    ctx.fillStyle='#cc9944'; ctx.fillRect(1200+ox,  900+oy,   400, 600);
    ctx.fillStyle='#884422'; ctx.fillRect(1600+ox,  oy,       800, MAP_SIZE);
    ctx.fillStyle='#224488'; ctx.fillRect(ox,       1400+oy,  800, 1000);
    ctx.fillStyle='#442288'; ctx.fillRect(1600+ox,  1400+oy,  800, 1000);
    ctx.restore();

    // Grid
    ctx.save(); ctx.globalAlpha = 0.04;
    ctx.strokeStyle = '#4a7a30'; ctx.lineWidth = 0.8;
    ctx.beginPath();
    for (let x = 0; x < MAP_SIZE; x += 40) { ctx.moveTo(x+ox,oy); ctx.lineTo(x+ox,MAP_SIZE+oy); }
    for (let y = 0; y < MAP_SIZE; y += 40) { ctx.moveTo(ox,y+oy); ctx.lineTo(MAP_SIZE+ox,y+oy); }
    ctx.stroke(); ctx.restore();

    // Map border
    ctx.save();
    ctx.strokeStyle = 'rgba(0,255,200,0.15)'; ctx.lineWidth = 3;
    ctx.strokeRect(ox, oy, MAP_SIZE, MAP_SIZE);
    ctx.restore();

    // Zone watermark labels
    const zoneLabels = [
      { x:200,  y:400,  text:'🌋 ARKEOZOIKUM', col:'rgba(255,100,50,0.10)'  },
      { x:700,  y:400,  text:'🌊 PALEOZOIKUM',  col:'rgba(50,150,255,0.10)'  },
      { x:1200, y:400,  text:'🦕 MESOZOIKUM',   col:'rgba(255,80,80,0.10)'   },
      { x:1900, y:400,  text:'🌿 NEOZOIKUM',    col:'rgba(50,200,100,0.10)'  },
      { x:200,  y:1100, text:'🪨 PALEOLITIKUM', col:'rgba(150,120,80,0.10)'  },
      { x:900,  y:1100, text:'🐚 MESOLITIKUM',  col:'rgba(100,180,150,0.10)' },
      { x:1500, y:1100, text:'🌾 NEOLITIKUM',   col:'rgba(180,200,80,0.10)'  },
      { x:400,  y:1900, text:'🗿 MEGALITIKUM',  col:'rgba(100,100,150,0.10)' },
      { x:1100, y:1900, text:'🔨 PERUNDAGIAN',  col:'rgba(200,150,50,0.10)'  },
      { x:2000, y:2000, text:'🌀 AREA RAHASIA', col:'rgba(150,50,200,0.10)'  },
    ];
    ctx.save();
    zoneLabels.forEach(zl => {
      ctx.font = 'bold 32px sans-serif';
      ctx.fillStyle = zl.col;
      ctx.textAlign = 'center';
      ctx.fillText(zl.text, zl.x+ox, zl.y+oy);
    });
    ctx.textAlign = 'left';
    ctx.restore();

    // ── STRUCTURES (drawn below objects) ──
    _drawStructures(ctx, ox, oy, W, H);

    // ── OBJECTS ──
    objects.forEach(obj => {
      if (obj.hp !== undefined && obj.hp < -900) return;
      const sx = obj.x + ox, sy = obj.y + oy;
      if (sx < -70 || sx > W+70 || sy < -70 || sy > H+70) return;
      ctx.save();

      if (obj.type === 'tree') {
        ctx.globalAlpha = 0.15; ctx.fillStyle = '#000';
        ctx.beginPath(); ctx.ellipse(sx,sy+8,obj.r*.9,obj.r*.3,0,0,Math.PI*2); ctx.fill();
        ctx.globalAlpha = 1;
        ctx.fillStyle = '#7a4e28'; ctx.fillRect(sx-5,sy-6,10,24);
        ctx.fillStyle = '#1e6e1e'; ctx.beginPath(); ctx.arc(sx,sy-14,obj.r+2,0,Math.PI*2); ctx.fill();
        ctx.fillStyle = '#2a8e2a'; ctx.beginPath(); ctx.arc(sx-4,sy-24,obj.r-4,0,Math.PI*2); ctx.fill();
        ctx.fillStyle = '#38b038'; ctx.beginPath(); ctx.arc(sx+4,sy-30,obj.r-8,0,Math.PI*2); ctx.fill();
        if (obj.hp < obj.mhp) {
          ctx.fillStyle='#222'; ctx.fillRect(sx-14,sy-45,28,5);
          ctx.fillStyle='#3c3'; ctx.fillRect(sx-14,sy-45,28*(obj.hp/obj.mhp),5);
        }

      } else if (obj.type === 'rock') {
        ctx.globalAlpha = 0.15; ctx.fillStyle = '#000';
        ctx.beginPath(); ctx.ellipse(sx,sy+4,obj.r*.9,obj.r*.4,0,0,Math.PI*2); ctx.fill();
        ctx.globalAlpha = 1;
        ctx.fillStyle = '#5a5a5a'; ctx.beginPath(); ctx.ellipse(sx,sy,obj.r,obj.r*.7,.4,0,Math.PI*2); ctx.fill();
        ctx.fillStyle = '#7a7a7a'; ctx.beginPath(); ctx.ellipse(sx-2,sy-3,obj.r-5,obj.r*.4,.4,0,Math.PI*2); ctx.fill();
        if (obj.hp < obj.mhp) {
          ctx.fillStyle='#222'; ctx.fillRect(sx-14,sy-28,28,5);
          ctx.fillStyle='#aaa'; ctx.fillRect(sx-14,sy-28,28*(obj.hp/obj.mhp),5);
        }

      } else if (obj.type === 'food') {
        ctx.font = '20px serif'; ctx.fillText('🌿', sx-10, sy+8);

      } else if (obj.type === 'ore') {
        ctx.globalAlpha = 0.15; ctx.fillStyle = '#000';
        ctx.beginPath(); ctx.ellipse(sx,sy+3,obj.r*.9,obj.r*.4,0,0,Math.PI*2); ctx.fill();
        ctx.globalAlpha = 1;
        ctx.fillStyle = '#4a4a4a'; ctx.beginPath(); ctx.ellipse(sx,sy,obj.r,obj.r*.8,.3,0,Math.PI*2); ctx.fill();
        ctx.fillStyle = '#6a6a6a'; ctx.beginPath(); ctx.ellipse(sx+2,sy-2,obj.r-5,obj.r*.5,.3,0,Math.PI*2); ctx.fill();
        ctx.fillStyle='#dd8844'; ctx.font='16px serif'; ctx.textAlign='center'; ctx.fillText('⛏',sx,sy+6); ctx.textAlign='left';
        if (obj.hp < obj.mhp) {
          ctx.fillStyle='#222'; ctx.fillRect(sx-14,sy-24,28,5);
          ctx.fillStyle='#ff8844'; ctx.fillRect(sx-14,sy-24,28*(obj.hp/obj.mhp),5);
        }

      } else if (obj.type === 'chest') {
        if (!obj.opened) {
          ctx.fillStyle='#7a5a14'; ctx.fillRect(sx-13,sy-10,26,20);
          ctx.fillStyle='#c8920a'; ctx.fillRect(sx-15,sy-12,30,7);
          ctx.fillStyle='#FFD700'; ctx.beginPath(); ctx.arc(sx,sy-3,5,0,Math.PI*2); ctx.fill();
          ctx.fillStyle='#fff'; ctx.font='8px sans-serif'; ctx.textAlign='center';
          ctx.fillText('BUKA',sx,sy+18); ctx.textAlign='left';
        } else {
          ctx.fillStyle='#444'; ctx.fillRect(sx-13,sy-10,26,20);
        }

      } else if (obj.type === 'dimension') {
        const pulse = Math.sin(GS.tick*0.06)*12;
        const dimColors = {1:'#ff6644',2:'#4488ff',3:'#ff4466',4:'#44dd88',5:'#cc8844',6:'#44ccaa',7:'#88cc44',8:'#8844cc',9:'#cc4488'};
        const dimColor = dimColors[obj.dimId] || '#cc88ff';
        ctx.globalAlpha = 0.18+Math.sin(GS.tick*0.06)*0.12;
        ctx.strokeStyle=dimColor; ctx.lineWidth=3;
        ctx.beginPath(); ctx.arc(sx,sy,40+pulse,0,Math.PI*2); ctx.stroke();
        ctx.strokeStyle=dimColor; ctx.lineWidth=1.5;
        ctx.beginPath(); ctx.arc(sx,sy,28+pulse*0.6,0,Math.PI*2); ctx.stroke();
        ctx.globalAlpha=1;
        ctx.fillStyle=`hsla(${(GS.tick+obj.dimId*40)%360},70%,30%,0.5)`;
        ctx.beginPath(); ctx.arc(sx,sy,22,0,Math.PI*2); ctx.fill();
        ctx.fillStyle=dimColor; ctx.beginPath(); ctx.arc(sx,sy,14,0,Math.PI*2); ctx.fill();
        ctx.font='20px serif'; ctx.textAlign='center'; ctx.fillText('🌀',sx,sy+7);
        if (obj.visited) { ctx.fillStyle='#00ff00'; ctx.font='bold 28px serif'; ctx.fillText('✓',sx,sy-8); }
        ctx.fillStyle='rgba(0,0,0,0.6)';
        ctx.beginPath(); ctx.roundRect(sx-52,sy+28,104,18,4); ctx.fill();
        ctx.fillStyle=dimColor; ctx.font='bold 10px sans-serif'; ctx.fillText(obj.label,sx,sy+41);
        if (Utils.dist(Player.x,Player.y,obj.x,obj.y)<100) {
          ctx.fillStyle='rgba(0,0,0,.65)';
          ctx.beginPath(); ctx.roundRect(sx-48,sy-76,96,22,6); ctx.fill();
          ctx.fillStyle='#fff'; ctx.font='11px sans-serif';
          ctx.fillText(obj.visited?'[✓] Sudah Dikunjungi':'[E] Masuk',sx,sy-61);
        }
        ctx.textAlign='left';

      } else if (obj.type === 'secret') {
        const pulse=Math.sin(GS.tick*0.05)*10;
        ctx.globalAlpha=0.18+Math.sin(GS.tick*0.05)*0.12;
        ctx.fillStyle='#cc88ff'; ctx.beginPath(); ctx.arc(sx,sy,45+pulse,0,Math.PI*2); ctx.fill();
        ctx.globalAlpha=1;
        ctx.font='28px serif'; ctx.textAlign='center'; ctx.fillText('🌀',sx,sy+10);
        ctx.fillStyle='#cc88ff'; ctx.font='bold 10px sans-serif';
        ctx.fillText('AREA RAHASIA',sx,sy+36); ctx.textAlign='left';
        if (Utils.dist(Player.x,Player.y,obj.x,obj.y)<100) {
          ctx.fillStyle='rgba(0,0,0,.65)';
          ctx.beginPath(); ctx.roundRect(sx-46,sy-72,92,22,6); ctx.fill();
          ctx.fillStyle='#fff'; ctx.font='11px sans-serif'; ctx.textAlign='center';
          ctx.fillText('TERKUNCI',sx,sy-57); ctx.textAlign='left';
        }

      } else if (obj.type === 'portal') {
        obj.locked = !SecretSystem.hasSecretKey();
        const pulse=Math.sin(GS.tick*0.08)*15;
        ctx.save();
        ctx.globalAlpha = obj.locked ? 0.15 : 0.25+Math.sin(GS.tick*0.06)*0.15;
        ctx.fillStyle = obj.locked ? '#ff4444' : '#00ffcc';
        ctx.beginPath(); ctx.arc(sx,sy,50+pulse,0,Math.PI*2); ctx.fill();
        ctx.globalAlpha=1;
        ctx.strokeStyle=obj.locked?'#ff4444':'#00ffcc'; ctx.lineWidth=3;
        ctx.beginPath(); ctx.arc(sx,sy,45,0,Math.PI*2); ctx.stroke();
        ctx.font='32px serif'; ctx.textAlign='center';
        ctx.fillStyle=obj.locked?'#ff4444':'#00ffcc';
        ctx.fillText(obj.locked?'🔐':'⭐',sx,sy+12);
        ctx.font='bold 11px sans-serif';
        ctx.fillText(obj.locked?'RAHASIA':'PORTAL BOSS',sx,sy+50);
        ctx.textAlign='left';
        if (Utils.dist(Player.x,Player.y,obj.x,obj.y)<100) {
          ctx.fillStyle='rgba(0,0,0,.65)';
          ctx.beginPath(); ctx.roundRect(sx-50,sy-72,100,22,6); ctx.fill();
          ctx.fillStyle='#fff'; ctx.font='11px sans-serif'; ctx.textAlign='center';
          ctx.fillText(obj.locked?'[E] Butuh Kunci Rahasia':'[E] MASUK KE BOSS ARENA',sx,sy-57);
          ctx.textAlign='left';
        }
        ctx.restore();
      }
      ctx.restore();
    });

    // Arrows
    objects.forEach(obj => {
      if (obj.type !== 'arrow') return;
      const sx=obj.x+ox, sy=obj.y+oy;
      ctx.save(); ctx.translate(sx,sy); ctx.rotate(obj.angle);
      ctx.fillStyle='#ffcc00';
      ctx.beginPath(); ctx.moveTo(8,0); ctx.lineTo(-8,-4); ctx.lineTo(-4,0); ctx.lineTo(-8,4);
      ctx.closePath(); ctx.fill(); ctx.restore();
    });

    // Particles
    particles.forEach(p => {
      ctx.save();
      let alpha=p.life/50, col=p.col;
      if (GS.flashEpilepsy) { alpha*=0.5; col='#888888'; }
      ctx.globalAlpha=alpha; ctx.fillStyle=col;
      ctx.beginPath(); ctx.arc(p.x+ox,p.y+oy,p.sz||2,0,Math.PI*2); ctx.fill();
      ctx.restore();
    });

    AnimalSystem.draw(ctx, ox, oy);
    NPCSystem.draw(ctx, ox, oy);
    Player.drawProjectiles(ctx, ox, oy);
    _drawPlayer(ctx, Player.x+ox, Player.y+oy);

    // Bottom bar
    ctx.fillStyle='rgba(0,0,0,.45)'; ctx.fillRect(0,H-86,W,86);
    ctx.fillStyle='rgba(0,255,200,.15)'; ctx.fillRect(0,H-88,W,2);

    // ── MINIMAP (drawn last = on top, di atas joystick) ──
    _drawMinimap(ctx, W, H);

    return { ox, oy };
  }

  function _drawPlayer(ctx, px, py) {
    ctx.save();
    const moving = (GS.tick%100)<50 ? Math.sin((GS.tick%100)*Math.PI/50) : 0;
    const walkSwing = moving*15;

    ctx.globalAlpha=0.25; ctx.fillStyle='#000';
    ctx.beginPath(); ctx.ellipse(px,py+15,13,5,0,0,Math.PI*2); ctx.fill();
    ctx.globalAlpha=1;

    if (Player.sprintOn && Player.stamina>3) {
      ctx.globalAlpha=0.25; ctx.fillStyle='#00aaff';
      ctx.beginPath(); ctx.arc(px-Math.cos(Player.facing)*18,py-Math.sin(Player.facing)*18,7,0,Math.PI*2); ctx.fill();
      ctx.globalAlpha=1;
    }

    let llx=px+Math.cos(Player.facing+Math.PI/2)*6+Math.cos(Player.facing)*walkSwing;
    let lly=py+Math.sin(Player.facing+Math.PI/2)*6+Math.sin(Player.facing)*walkSwing;
    let rlx=px-Math.cos(Player.facing+Math.PI/2)*6-Math.cos(Player.facing)*walkSwing;
    let rly=py-Math.sin(Player.facing+Math.PI/2)*6-Math.sin(Player.facing)*walkSwing;

    ctx.strokeStyle='#2a3a88'; ctx.lineWidth=4; ctx.lineCap='round';
    ctx.beginPath();
    ctx.moveTo(llx,lly);
    ctx.lineTo(px+Math.cos(Player.facing+Math.PI/2)*6+Math.sin(Player.facing)*(walkSwing-10),
               py+Math.sin(Player.facing+Math.PI/2)*6+Math.cos(Player.facing)*(walkSwing-10)+8);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(rlx,rly);
    ctx.lineTo(px-Math.cos(Player.facing+Math.PI/2)*6-Math.sin(Player.facing)*(walkSwing-10),
               py-Math.sin(Player.facing+Math.PI/2)*6-Math.cos(Player.facing)*(walkSwing-10)+8);
    ctx.stroke();

    ctx.fillStyle='#1a2a68';
    ctx.beginPath(); ctx.arc(llx+Math.sin(Player.facing)*8,lly+Math.cos(Player.facing)*8+8,3,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(rlx-Math.sin(Player.facing)*8,rly-Math.cos(Player.facing)*8+8,3,0,Math.PI*2); ctx.fill();

    ctx.fillStyle='#3366cc'; ctx.beginPath(); ctx.arc(px,py,13,0,Math.PI*2); ctx.fill();
    ctx.fillStyle='#5588ee'; ctx.beginPath(); ctx.arc(px-2,py-2,7,0,Math.PI*2); ctx.fill();
    ctx.fillStyle='#1144aa'; ctx.beginPath(); ctx.arc(px,py-7,9,Math.PI,Math.PI*2); ctx.fill();
    ctx.fillStyle='#fff';
    ctx.beginPath(); ctx.arc(px-3,py-9,2,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(px+3,py-9,2,0,Math.PI*2); ctx.fill();

    const ad=10;
    let lax=px+Math.cos(Player.facing+Math.PI/2)*ad+Math.cos(Player.facing)*walkSwing*0.7;
    let lay=py+Math.sin(Player.facing+Math.PI/2)*ad+Math.sin(Player.facing)*walkSwing*0.7;
    let rax=px-Math.cos(Player.facing+Math.PI/2)*ad-Math.cos(Player.facing)*walkSwing*0.7;
    let ray=py-Math.sin(Player.facing+Math.PI/2)*ad-Math.sin(Player.facing)*walkSwing*0.7;

    ctx.strokeStyle='#4477dd'; ctx.lineWidth=3; ctx.lineCap='round';
    ctx.beginPath(); ctx.moveTo(px+Math.cos(Player.facing+Math.PI/2)*8,py+Math.sin(Player.facing+Math.PI/2)*8); ctx.lineTo(lax,lay-3); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(px-Math.cos(Player.facing+Math.PI/2)*8,py-Math.sin(Player.facing+Math.PI/2)*8); ctx.lineTo(rax,ray-3); ctx.stroke();

    ctx.fillStyle='#2a4a99';
    ctx.beginPath(); ctx.arc(lax,lay,4,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(rax,ray,4,0,Math.PI*2); ctx.fill();

    if (Player.equipped) {
      const weapon=Player.WEAPONS[Player.equipped];
      if (weapon) {
        let wx=rax,wy=ray,wa=Player.facing,ws=1;
        if (Player.atkAnim>0) {
          const ap=1-(Player.atkAnim/weapon.atkAnim);
          wa=Player.facing+Math.sin(ap*Math.PI)*1.2;
          const sd=Math.sin(ap*Math.PI)*28;
          wx=px+Math.cos(wa)*sd; wy=py+Math.sin(wa)*sd;
          ws=1+Math.sin(ap*Math.PI)*0.2;
        } else { wx=rax+Math.cos(Player.facing)*8; wy=ray+Math.sin(Player.facing)*8; }
        ctx.save(); ctx.translate(wx,wy); ctx.rotate(wa+Math.PI/2); ctx.scale(ws,ws);
        ctx.font='24px serif'; ctx.textAlign='center'; ctx.textBaseline='middle';
        ctx.fillText(Player.equipped,0,0);
        if (Player.atkAnim>0) { ctx.strokeStyle='rgba(0,255,200,0.6)'; ctx.lineWidth=2; ctx.beginPath(); ctx.arc(0,0,14,0,Math.PI*2); ctx.stroke(); }
        ctx.restore();
      }
    }

    if (Player.atkAnim>0) {
      const a=Player.facing, frac=Player.atkAnim/15, alen=55*frac;
      ctx.globalAlpha=frac*0.85;
      const gr=ctx.createLinearGradient(px,py,px+Math.cos(a)*alen,py+Math.sin(a)*alen);
      gr.addColorStop(0,'#fff'); gr.addColorStop(0.4,'#00ffcc'); gr.addColorStop(1,'transparent');
      ctx.strokeStyle=gr; ctx.lineWidth=5;
      ctx.beginPath(); ctx.moveTo(px,py); ctx.lineTo(px+Math.cos(a)*alen,py+Math.sin(a)*alen); ctx.stroke();
      ctx.strokeStyle='rgba(0,255,200,.3)'; ctx.lineWidth=2;
      ctx.beginPath(); ctx.arc(px,py,alen*.65,a-.8,a+.8); ctx.stroke();
      ctx.globalAlpha=1;
    }
    ctx.restore();
  }

  function _getZone() {
    const px=Player.x, py=Player.y;
    if (px>1600&&py>1400) return ZONES[9];
    if (px>1600&&py<600)  return ZONES[3];
    if (px>1200&&py<600)  return ZONES[2];
    if (px>600 &&py<600)  return ZONES[1];
    if (px<600 &&py<600)  return ZONES[0];
    if (px<400 &&py>600)  return ZONES[4];
    if (px<1200&&py>1400) return ZONES[7];
    if (px>1200&&py>900)  return ZONES[4];
    if (py<900)           return ZONES[2];
    return ZONES[5];
  }

  return {
    get objects()  { return objects; },
    get cam()      { return cam;     },
    init, update, draw, spawnParticles, spawnBurst, spawnReturn, toggleMinimap,
  };
})();