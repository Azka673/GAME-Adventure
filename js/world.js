// ===== WORLD.JS =====

const World = (() => {
  let objects   = [];
  let particles = [];
  let cam       = { x: 200, y: 200 };
  const MAP_SIZE = 1600;   // FIX: was 1000 — objek ada sampai x:1472,y:1360 jadi harus 1600
  const ZONES  = ["🌲 Hutan Paleolitikum","🌿 Padang Mesolitikum","🌾 Ladang Neolitikum","🗿 Bukit Megalitikum","🔨 Tambang Perundagian","🌀 Area Rahasia"];
  const RESPAWN_TIME = 600; // 10 detik (60 tick/detik)
  const KEY_RESPAWN_TIME = 1800; // 30 detik untuk key chest respawn
  const RESPAWN_LIST = []; // track original positions untuk respawn
  const KEY_CHESTS = []; // track key chests untuk respawn mechanic

  function init() {
    objects   = [];
    particles = [];
    RESPAWN_LIST.length = 0; // clear respawn list

    // Trees
    const treePositions = [[128,128],[320,96],[560,144],[832,112],[240,448],[976,432],[624,544],[1152,224],[80,624],
     [1312,624],[384,784],[1056,784],[1472,464],[176,944],[1216,944],[640,1104],[336,1184],
     [976,1184],[1440,1088],[80,1088],[736,288],[464,608],[1184,704],[208,1184],[896,288]];
    treePositions.forEach(([x,y]) => {
      const obj = { type:'tree', x, y, hp:3, mhp:3, r:22, drop:{e:'🪵',n:'Kayu',c:2}, respawnTimer: 0 };
      objects.push(obj);
      RESPAWN_LIST.push({ type: 'tree', x, y, obj });
    });

    // Rocks
    const rockPositions = [[496,304],[736,272],[976,224],[160,784],[656,752],[1136,656],[416,1024],[896,976],
     [1312,864],[1472,304],[576,944],[256,624],[864,480],[1120,896],[1344,448]];
    rockPositions.forEach(([x,y]) => {
      const obj = { type:'rock', x, y, hp:4, mhp:4, r:18, drop:{e:'🪨',n:'Batu',c:1}, respawnTimer: 0 };
      objects.push(obj);
      RESPAWN_LIST.push({ type: 'rock', x, y, obj });
    });

    // Food/plants
    const foodPositions = [[288,232],[680,392],[1056,552],[488,712],[888,792],[328,944],[1136,1024],[704,864],[512,448]];
    foodPositions.forEach(([x,y]) => {
      const obj = { type:'food', x, y, hp:1, mhp:1, r:13, drop:{e:'🍖',n:'Daging',c:1}, respawnTimer: 0 };
      objects.push(obj);
      RESPAWN_LIST.push({ type: 'food', x, y, obj });
    });

    // Iron ore deposits (baru!)
    const orePositions = [[450,280],[950,450],[1200,600],[650,950],[1400,850]];
    orePositions.forEach(([x,y]) => {
      const obj = { type:'ore', x, y, hp:2, mhp:2, r:16, drop:{e:'⛏',n:'Besi',c:2}, respawnTimer: 0 };
      objects.push(obj);
      RESPAWN_LIST.push({ type: 'ore', x, y, obj });
    });

    // ═══ CHESTS (MAX 3 ONLY - ALL RESPAWN EVERY 30 SEC) ═══
    const chest1 = { type:'chest', x:600,  y:500,  r:18, opened:false, drop:{e:'🔑', n:'Kunci Portal',   c:1}, chestRespawnTimer:0 };
    const chest2 = { type:'chest', x:784,  y:832,  r:18, opened:false, drop:{e:'⚔', n:'Pedang Kuno',   c:1}, chestRespawnTimer:0 };
    const chest3 = { type:'chest', x:1376, y:1040, r:18, opened:false, drop:{e:'🛡', n:'Perisai Kuno',  c:1}, chestRespawnTimer:0 };
    objects.push(chest1, chest2, chest3);
    KEY_CHESTS.push(chest1, chest2, chest3);

    // Secret keyhole (portal rahasia) - spawn at special location
    objects.push({ type:'portal', x:1470, y:1350, r:40, isSecret:true, locked:true });

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

    // ═══ AUTO TIME CYCLING ═══ (setiap 900 ticks = 1 menit 30 detik)
    GS.timeProgress = (GS.timeProgress || 0) + 1;
    if (GS.timeProgress >= 900) {
      GS.timeProgress = 0;
      GS.timeOffset = (GS.timeOffset || 0) + 1;
      if (GS.timeOffset >= 4) GS.timeOffset = 0;
      
      // Map offset to time of day
      const timeNames = ['day', 'sore', 'night', 'dawn'];
      const prevTime = GS.timeOfDay;
      GS.timeOfDay = timeNames[GS.timeOffset];
      
      // Spawn night enemies saat masuk malam
      if (GS.timeOfDay === 'night' && prevTime !== 'night') {
        AnimalSystem.spawnNightEnemies();
        Utils.notify('🌙 Malam tiba! Zombie dan Skeleton muncul!', '#ff0088');
      }
      // Remove night enemies saat keluar malam
      if (GS.timeOfDay !== 'night' && prevTime === 'night') {
        AnimalSystem.removeNightEnemies();
        Utils.notify('☀️ Pagi kembali! Musuh malam hilang.', '#ffff00');
      }
      
      Utils.notify(`⏰ Waktu: ${timeNames[GS.timeOffset]}`, '#88ccff');
    }

    // Particles
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.x += p.vx; p.y += p.vy;
      p.life--;
      p.vx *= 0.9; p.vy *= 0.9;
      if (p.life <= 0) particles.splice(i, 1);
    }

    // Handle resource respawn
    for (const respawnData of RESPAWN_LIST) {
      const obj = respawnData.obj;
      if (obj.hp !== undefined && obj.hp <= -900) {
        // Dead resource - increment respawn timer
        obj.respawnTimer = (obj.respawnTimer || 0) + 1;
        if (obj.respawnTimer >= RESPAWN_TIME) {
          // Respawn!
          obj.hp = obj.mhp;
          obj.respawnTimer = 0;
          World.spawnParticles(obj.x, obj.y, '#00ff88', 5);
          Utils.notify(`🌱 Resource respawned!`, '#00ff88');
        }
      }
    }

    // Handle arrow updates and collisions
    for (let i = objects.length - 1; i >= 0; i--) {
      const arrow = objects[i];
      if (arrow.type !== 'arrow') continue;
      
      arrow.x += arrow.vx;
      arrow.y += arrow.vy;
      arrow.life--;
      
      // Arrow out of bounds or expired
      if (arrow.life <= 0 || arrow.x < 0 || arrow.x > 1600 || arrow.y < 0 || arrow.y > 1600) {
        objects.splice(i, 1);
        continue;
      }
      
      // Arrow hits player
      const arrowDist = Utils.dist(arrow.x, arrow.y, Player.x, Player.y);
      if (arrowDist < 25) {
        const damage = Math.max(1, Math.ceil(Player.hp * 0.12)); // 12% HP damage from arrow
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

    // Remove completely dead objects that have been respawned
    for (let i = objects.length - 1; i >= 0; i--) {
      if (objects[i].hp !== undefined && objects[i].hp <= -900 && objects[i].respawnTimer < 1) {
        objects.splice(i, 1);
      }
    }

    // Handle chest respawn (setiap 30 detik chest bisa diambil lagi)
    for (const chest of KEY_CHESTS) {
      if (chest.opened) {
        chest.chestRespawnTimer = (chest.chestRespawnTimer || 0) + 1;
        if (chest.chestRespawnTimer >= KEY_RESPAWN_TIME) {
          // Reset chest
          chest.opened = false;
          chest.chestRespawnTimer = 0;
          World.spawnParticles(chest.x, chest.y, '#ffcc00', 8);
          Utils.notify(`✨ ${chest.drop.n} muncul di chest lagi!`, '#ffcc00');
        }
      }
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
    
    // Time of day background colors
    let bgColor = '#141e0e';
    let tintAlpha = 0.07;
    let overlayColor = null;
    let overlayAlpha = 0;
    
    if (GS.timeOfDay === 'day') {
      bgColor = '#1a2410';
    } else if (GS.timeOfDay === 'sore') {
      bgColor = '#2a1810';
      overlayColor = 'rgba(255, 100, 0, 0.15)';
      overlayAlpha = 0.15;
    } else if (GS.timeOfDay === 'night') {
      bgColor = '#0a0f14';
      overlayColor = 'rgba(50, 80, 150, 0.25)';
      overlayAlpha = 0.25;
    } else if (GS.timeOfDay === 'dawn') {
      bgColor = '#1a0a20';
      overlayColor = 'rgba(150, 100, 200, 0.12)';
      overlayAlpha = 0.12;
    }
    
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, W, H);
    
    // Apply time-of-day overlay
    if (overlayColor) {
      ctx.fillStyle = overlayColor;
      ctx.fillRect(0, 0, W, H);
    }

    // Zone tints
    ctx.save(); ctx.globalAlpha = tintAlpha;
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

      } else if (obj.type === 'portal') {
        // Secret portal dengan lock status
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
        ctx.fillText(obj.locked ? '🔐' : '🌀', sx, sy+12);
        
        ctx.fillStyle = obj.locked ? '#ff4444' : '#00ffcc';
        ctx.font = 'bold 11px sans-serif';
        ctx.fillText(obj.locked ? 'TERKUNCI' : 'PORTAL BOS', sx, sy+50);
        ctx.textAlign = 'left';
        ctx.restore();
      }
      ctx.restore();
    });

    // Draw arrows
    objects.forEach(obj => {
      if (obj.type !== 'arrow') return;
      const sx = obj.x + ox, sy = obj.y + oy;
      ctx.save();
      ctx.translate(sx, sy);
      ctx.rotate(obj.angle);
      ctx.fillStyle = '#ffcc00';
      ctx.beginPath();
      ctx.moveTo(8, 0);
      ctx.lineTo(-8, -4);
      ctx.lineTo(-4, 0);
      ctx.lineTo(-8, 4);
      ctx.closePath();
      ctx.fill();
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
    
    // Determine if player is moving for animation
    const dx = Player.speed > 0 ? Player.facing : 0;
    const moving = (GS.tick % 100) < 50 ? Math.sin((GS.tick % 100) * Math.PI / 50) : 0;
    const walkSwing = moving * 15;
    
    // Shadow
    ctx.globalAlpha = 0.25; ctx.fillStyle = '#000';
    ctx.beginPath(); ctx.ellipse(px, py+15, 13, 5, 0,0,Math.PI*2); ctx.fill();
    ctx.globalAlpha = 1;
    
    // Sprint effect
    if (Player.sprintOn && Player.stamina > 3) {
      ctx.globalAlpha = 0.25; ctx.fillStyle = '#00aaff';
      ctx.beginPath(); ctx.arc(px-Math.cos(Player.facing)*18, py-Math.sin(Player.facing)*18, 7, 0, Math.PI*2); ctx.fill();
      ctx.globalAlpha = 0.12;
      ctx.beginPath(); ctx.arc(px-Math.cos(Player.facing)*33, py-Math.sin(Player.facing)*33, 5, 0, Math.PI*2); ctx.fill();
      ctx.globalAlpha = 1;
    }
    
    // ========== LEGS/FEET ==========
    // Left leg
    let leftLegX = px + Math.cos(Player.facing + Math.PI/2) * 6;
    let leftLegY = py + Math.sin(Player.facing + Math.PI/2) * 6;
    leftLegX += Math.cos(Player.facing) * walkSwing;
    leftLegY += Math.sin(Player.facing) * walkSwing;
    
    // Right leg
    let rightLegX = px - Math.cos(Player.facing + Math.PI/2) * 6;
    let rightLegY = py - Math.sin(Player.facing + Math.PI/2) * 6;
    rightLegX -= Math.cos(Player.facing) * walkSwing;
    rightLegY -= Math.sin(Player.facing) * walkSwing;
    
    // Draw legs
    ctx.strokeStyle = '#2a3a88';
    ctx.lineWidth = 4;
    ctx.lineCap = 'round';
    
    // Left leg line
    ctx.beginPath();
    ctx.moveTo(leftLegX, leftLegY);
    ctx.lineTo(px + Math.cos(Player.facing + Math.PI/2) * 6 + Math.sin(Player.facing) * (walkSwing - 10), 
               py + Math.sin(Player.facing + Math.PI/2) * 6 + Math.cos(Player.facing) * (walkSwing - 10) + 8);
    ctx.stroke();
    
    // Right leg line
    ctx.beginPath();
    ctx.moveTo(rightLegX, rightLegY);
    ctx.lineTo(px - Math.cos(Player.facing + Math.PI/2) * 6 - Math.sin(Player.facing) * (walkSwing - 10),
               py - Math.sin(Player.facing + Math.PI/2) * 6 - Math.cos(Player.facing) * (walkSwing - 10) + 8);
    ctx.stroke();
    
    // Feet
    ctx.fillStyle = '#1a2a68';
    ctx.beginPath(); ctx.arc(leftLegX + Math.sin(Player.facing) * 8, leftLegY + Math.cos(Player.facing) * 8 + 8, 3, 0, Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(rightLegX - Math.sin(Player.facing) * 8, rightLegY - Math.cos(Player.facing) * 8 + 8, 3, 0, Math.PI*2); ctx.fill();
    
    // ========== BODY (TORSO) ==========
    ctx.fillStyle = '#3366cc';
    ctx.beginPath();
    ctx.arc(px, py, 13, 0, Math.PI*2);
    ctx.fill();
    
    // Body detail
    ctx.fillStyle = '#5588ee';
    ctx.beginPath();
    ctx.arc(px-2, py-2, 7, 0, Math.PI*2);
    ctx.fill();
    
    // ========== HEAD ==========
    ctx.fillStyle = '#1144aa';
    ctx.beginPath();
    ctx.arc(px, py-7, 9, Math.PI, Math.PI*2);
    ctx.fill();
    
    // Face/eyes
    ctx.fillStyle = '#fff';
    ctx.beginPath(); ctx.arc(px-3, py-9, 2, 0, Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(px+3, py-9, 2, 0, Math.PI*2); ctx.fill();
    
    // ========== ARMS/HANDS ==========
    // Left arm
    const armDist = 10;
    let leftArmX = px + Math.cos(Player.facing + Math.PI/2) * armDist + Math.cos(Player.facing) * walkSwing * 0.7;
    let leftArmY = py + Math.sin(Player.facing + Math.PI/2) * armDist + Math.sin(Player.facing) * walkSwing * 0.7;
    
    // Right arm
    let rightArmX = px - Math.cos(Player.facing + Math.PI/2) * armDist - Math.cos(Player.facing) * walkSwing * 0.7;
    let rightArmY = py - Math.sin(Player.facing + Math.PI/2) * armDist - Math.sin(Player.facing) * walkSwing * 0.7;
    
    // Draw arms
    ctx.strokeStyle = '#4477dd';
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    
    // Left arm
    ctx.beginPath();
    ctx.moveTo(px + Math.cos(Player.facing + Math.PI/2) * 8, py + Math.sin(Player.facing + Math.PI/2) * 8);
    ctx.lineTo(leftArmX, leftArmY - 3);
    ctx.stroke();
    
    // Right arm
    ctx.beginPath();
    ctx.moveTo(px - Math.cos(Player.facing + Math.PI/2) * 8, py - Math.sin(Player.facing + Math.PI/2) * 8);
    ctx.lineTo(rightArmX, rightArmY - 3);
    ctx.stroke();
    
    // Hands (circles)
    ctx.fillStyle = '#2a4a99';
    ctx.beginPath(); ctx.arc(leftArmX, leftArmY, 4, 0, Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(rightArmX, rightArmY, 4, 0, Math.PI*2); ctx.fill();
    
    // ========== ATTACK ANIMATION ==========
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
    
    // ========== EQUIPPED WEAPON ==========
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