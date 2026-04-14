// ===== SECRET.JS =====
// Sistem for Secret Portal, Secret Key, dan Secret Boss Battle

const SecretSystem = (() => {
  let secretState = {
    keyFound: false,
    portalUnlocked: false,
    bossSpawned: false,
    bossFight: false,
    bossDefeated: false,
    bossHP: 0,
    bossMaxHP: 40,
  };

  let boss = null;

  // ═══ SECRET KEY MECHANICS ═══
  function initSecretKey() {
    // Peluang spawning secret key di chest (15% chance setiap kali chest di-respawn)
    if (Math.random() < 0.15) {
      return { 
        e: '🔑', 
        n: 'Kunci Rahasia', 
        c: 1,
        isSecretKey: true 
      };
    }
    return null;
  }

  // Cek apakah player punya secret key
  function hasSecretKey() {
    return Inventory.has('🔑', 1) && secretState.keyFound;
  }

  // ═══ SECRET PORTAL INTERACTION ═══
  function interactPortal() {
    if (!hasSecretKey()) {
      Utils.notify('🔒 Portal terkunci. Butuh Kunci Rahasia 🔑', '#ff0088');
      return;
    }

    Utils.notify('🔓 Portal membuka dengan kilau cahaya cyan!', '#00ffcc');
    Inventory.remove('🔑', 1);
    secretState.keyFound = false;
    secretState.portalUnlocked = true;
    
    // Bawa ke secret boss area
    setTimeout(() => enterSecretArea(), 500);
  }

  // ═══ SECRET AREA ENTRY ═══
  function enterSecretArea() {
    // Hide game UI
    document.getElementById('hud').style.display = 'none';
    document.getElementById('controls').style.display = 'none';
    document.getElementById('hotbar').style.display = 'none';
    document.getElementById('npcBox') && (document.getElementById('npcBox').style.display = 'none');
    document.getElementById('quizPanel').style.display = 'none';
    document.getElementById('dialogBox').style.display = 'none';

    // Show secret boss fight screen
    const secretScreen = document.getElementById('secretScreen');
    if (!secretScreen) _createSecretScreen();
    
    document.getElementById('secretScreen').style.display = 'flex';
    secretState.bossFight = true;
    
    // Show intro dialog
    _showSecretIntro();
  }

  function _createSecretScreen() {
    const screen = document.createElement('div');
    screen.id = 'secretScreen';
    screen.style.cssText = `
      display: none;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(135deg, #1a0033 0%, #330066 50%, #1a0033 100%);
      flex-direction: column;
      justify-content: center;
      align-items: center;
      z-index: 9999;
      font-family: 'Arial', sans-serif;
      color: #00ffcc;
    `;

    screen.innerHTML = `
      <div style="position: relative; width: 100%; height: 100%;">
        <canvas id="secretCvs" style="position: absolute; top: 0; left: 0;"></canvas>
        
        <div id="secretContent" style="
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          text-align: center;
          z-index: 2;
        ">
          <div id="secretTitle" style="
            font-size: 48px;
            margin-bottom: 20px;
            color: #ff00ff;
            text-shadow: 0 0 20px #ff00ff, 0 0 40px #9900ff;
          "></div>
          
          <div id="secretBossHP" style="
            margin: 20px 0;
            font-size: 24px;
            color: #00ffcc;
            text-shadow: 0 0 10px #00ffcc;
          "></div>
          
          <div id="secretDialog" style="
            background: rgba(0, 20, 40, 0.8);
            border: 2px solid #00ffcc;
            border-radius: 10px;
            padding: 20px;
            margin: 20px 0;
            max-width: 600px;
            font-size: 18px;
            line-height: 1.6;
            color: #00ffcc;
          "></div>
          
          <div id="secretActions" style="
            margin-top: 20px;
          "></div>
        </div>
      </div>
    `;

    document.body.appendChild(screen);
  }

  function _showSecretIntro() {
    const dialogEl = document.getElementById('secretDialog');
    dialogEl.innerHTML = '';

    const introLines = [
      '🌀 Kau memasuki celah dimensi terakhir...',
      '🦖 Sesuatu bergerak di kegelapan. Mata merah membara menghampirimu!',
      '🦖 TERDENGAR JERITAN MONSTER PURBA YANG MENAKUTKAN!',
      '👿 "Intruder... Kau telah membuka kunci terlarang. Kini... kau harus bertarung dengan diriku!"',
      '🦖 Dragon Proto — Raja monster zaman Praaksara — menyerangmu dengan furia penuh!',
    ];

    let lineIdx = 0;
    function showLine() {
      if (lineIdx < introLines.length) {
        const text = introLines[lineIdx];
        lineIdx++;
        Typewriter.write(dialogEl, text, {
          speed: 25,
          cursor: true,
          onDone: () => setTimeout(showLine, 1200),
        });
      } else {
        // Start boss fight
        _startBossFight();
      }
    }

    showLine();
  }

  // ═══ BOSS FIGHT MECHANICS ═══
  function _startBossFight() {
    secretState.bossSpawned = true;
    secretState.bossHP = secretState.bossMaxHP;

    boss = {
      x: window.innerWidth / 2,
      y: 200,
      vx: 0,
      vy: 0,
      hp: secretState.bossMaxHP,
      maxhp: secretState.bossMaxHP,
      e: '🦖',
      name: 'Dragon Proto',
      atkTimer: 0,
      autoAtkTimer: 120 + Math.random() * 100, // Auto-attack timer
      atkPattern: 0, // 0=roar, 1=charge, 2=bite, 3=tail
    };

    _updateBossHPDisplay();
    _drawBossFight();
    _showBossControls();
  }

  function _updateBossHPDisplay() {
    const hpBar = document.getElementById('secretBossHP');
    const hpPct = Math.max(0, (boss.hp / boss.maxhp) * 100);
    hpBar.innerHTML = `
      <div>${boss.name} 🦖</div>
      <div style="
        width: 300px;
        height: 30px;
        background: #003300;
        border: 2px solid #00ff00;
        border-radius: 5px;
        margin: 10px auto;
        position: relative;
      ">
        <div style="
          width: ${hpPct}%;
          height: 100%;
          background: linear-gradient(90deg, #ff0000, #ff6600);
          transition: width 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: bold;
        ">${Math.max(0, Math.floor(boss.hp))} / ${boss.maxhp}</div>
      </div>
    `;
  }

  function _showBossControls() {
    const actionEl = document.getElementById('secretActions');
    actionEl.innerHTML = `
      <div style="font-size: 16px; margin-bottom: 10px;">Gunakan senjata atau skill untuk menyerang:</div>
      <button onclick="SecretSystem.bossDamage(5)" style="${_buttonStyle()}">⚔ SERANG NORMAL (5 dmg)</button>
      <button onclick="SecretSystem.bossDamage(15)" style="${_buttonStyle()}">💥 SKILL BERAT (15 dmg)</button>
      <button onclick="SecretSystem.bossDamage(10)" style="${_buttonStyle()}">🎯 TEMBAK (10 dmg)</button>
    `;
  }

  function _buttonStyle() {
    return `
      background: linear-gradient(135deg, #ff00ff, #9900ff);
      color: #00ffcc;
      border: 2px solid #00ffcc;
      padding: 12px 20px;
      margin: 5px;
      font-size: 16px;
      border-radius: 5px;
      cursor: pointer;
      transition: all 0.2s;
    `;
  }

  function bossDamage(amount) {
    if (!boss || secretState.bossFight === false) return;

    boss.hp -= amount;
    secretState.bossHP = boss.hp;

    const dialogEl = document.getElementById('secretDialog');
    
    if (boss.hp <= 0) {
      boss.hp = 0;
      _bossFightWin();
    } else {
      // Boss counter attack
      const damage = Math.floor(Math.random() * 15) + 5;
      const actualDamage = Math.max(1, Math.ceil(damage * Player.getDamageReduction()));
      Player.hp -= actualDamage;
      
      // Reset auto-attack timer untuk counter
      boss.autoAtkTimer = 20 + Math.random() * 30;

      if (Player.hp <= 0) {
        _bossFightLose();
      } else {
        _updateBossHPDisplay();
        
        const attacks = [
          `🦖 Dragon mencabik dengan cakarnya! [${actualDamage} DMG]`,
          `🦖 Dragon menggeram menggelegar! [${actualDamage} DMG]`,
          `🦖 Dragon mencengkeram dengan mulutnya! [${actualDamage} DMG]`,
          `🦖 Dragon menyapu ekor raksasanya! [${actualDamage} DMG]`,
        ];

        dialogEl.innerHTML = `
          <strong>Kau serang dengan ${amount} DMG!</strong><br><br>
          ${attacks[Math.floor(Math.random() * attacks.length)]}
        `;
        
        // Boss auto-attack jika sudah waktunya
        if (boss.autoAtkTimer <= 0) {
          setTimeout(() => {
            if (secretState.bossFight && boss) {
              const bossDmg = Math.floor(Math.random() * 12) + 3;
              const actualBossDmg = Math.max(1, Math.ceil(bossDmg * Player.getDamageReduction()));
              Player.hp -= actualBossDmg;
              
              const autoAttacks = [
                `🦖 Dragon menyerang sendiri! [-${actualBossDmg} DMG]`,
                `🦖 Boss Dragon bergerak menyerang! [-${actualBossDmg} DMG]`,
                `🦖 Dragon menggerakkan ekornya ke arahmu! [-${actualBossDmg} DMG]`,
              ];
              
              dialogEl.innerHTML = autoAttacks[Math.floor(Math.random() * autoAttacks.length)];
              
              if (Player.hp <= 0) {
                _bossFightLose();
              }
              boss.autoAtkTimer = 100 + Math.random() * 80;
            }
          }, 800);
        }
      }
    }
  }

  function _bossFightWin() {
    secretState.bossDefeated = true;
    secretState.bossFight = false;
    GS.secretFound = true;

    const dialogEl = document.getElementById('secretDialog');
    dialogEl.innerHTML = '';
    
    const victoryLines = [
      '⚡ Serangan terusan memporak-porandakan tubuh dragon proto!',
      '🦖 ROOOAAARRRRR... Dragon jatuh dengan keras, gemuruh menggelegar!',
      '✨ Cahaya cyan menyembur dari mayat dragon. Ini pengetahuan purba yang sangat in!',
      '👑 "...Kau... menang... Selamat datang, pemimpin sejati praaksara..."',
      '💫 Dragon proto berubah menjadi cahaya dan hilang. Sekarang kau adalah penguasa area rahasia ini!',
    ];

    let lineIdx = 0;
    function showLine() {
      if (lineIdx < victoryLines.length) {
        const text = victoryLines[lineIdx];
        lineIdx++;
        Typewriter.write(dialogEl, text, {
          speed: 25,
          cursor: true,
          onDone: () => setTimeout(showLine, 1500),
        });
      } else {
        // Show reward and exit
        setTimeout(() => {
          Inventory.add('👑', 'Mahkota Pemimpin Praaksara', 1);
          Inventory.add('🦴', 'Tulang Dragon Proto', 5);
          
          const dialogEl = document.getElementById('secretDialog');
          dialogEl.innerHTML = `
            <strong>🎉 KEMENANGAN! 🎉</strong><br><br>
            + Mahkota Pemimpin Praaksara 👑<br>
            + Tulang Dragon Proto 🦴 x5<br><br>
            <button onclick="SecretSystem.exitSecretArea()" style="${_buttonStyle()}">Kembali ke Dunia</button>
          `;
        }, 1500);
      }
    }

    showLine();
  }

  function _bossFightLose() {
    secretState.bossFight = false;
    
    const dialogEl = document.getElementById('secretDialog');
    dialogEl.innerHTML = `
      <strong style="color: #ff0000;">Kamu DIKALAHKAN!</strong><br><br>
      🦖 Dragon proto memusnahkanmu dengan satu gigitan terakhir...<br><br>
      <button onclick="SecretSystem.exitSecretArea()" style="${_buttonStyle()}">Kembali dan Coba Lagi</button>
    `;
  }

  function _drawBossFight() {
    const cvs = document.getElementById('secretCvs');
    cvs.width = window.innerWidth;
    cvs.height = window.innerHeight;

    const ctx = cvs.getContext('2d');

    // Animated background
    const time = Date.now() * 0.001;
    const grad = ctx.createLinearGradient(0, 0, cvs.width, cvs.height);
    grad.addColorStop(0, '#1a0033');
    grad.addColorStop(0.5, '#330066');
    grad.addColorStop(1, '#1a0033');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, cvs.width, cvs.height);

    // Boss AI Update
    if (boss && secretState.bossFight) {
      // Boss auto-attack countdown
      boss.autoAtkTimer--;
      
      // Boss movement - move toward center, avoiding being too close
      const centerX = cvs.width / 2;
      const centerY = cvs.height / 2.5;
      const dx = centerX - boss.x;
      const dy = centerY - boss.y;
      const dist = Math.sqrt(dx*dx + dy*dy);
      
      // Move toward center if far away
      if (dist > 100) {
        boss.vx += (dx / dist) * 0.15;
        boss.vy += (dy / dist) * 0.15;
      } else if (dist < 80) {
        // Move away from center if too close
        boss.vx -= (dx / (dist || 1)) * 0.08;
        boss.vy -= (dy / (dist || 1)) * 0.08;
      }
      
      // Apply friction
      boss.vx *= 0.92;
      boss.vy *= 0.92;
      
      // Limit speed
      const speed = Math.sqrt(boss.vx*boss.vx + boss.vy*boss.vy);
      if (speed > 3) {
        boss.vx = (boss.vx / speed) * 3;
        boss.vy = (boss.vy / speed) * 3;
      }
      
      // Update position
      boss.x += boss.vx;
      boss.y += boss.vy;
      
      // Keep boss in bounds
      boss.x = Math.max(60, Math.min(cvs.width - 60, boss.x));
      boss.y = Math.max(60, Math.min(cvs.height - 60, boss.y));
    }

    // Dragon animation
    if (boss) {
      const wobble = Math.sin(time * 2) * 5;
      const scale = 1 + Math.sin(time * 1.5) * 0.1;

      ctx.save();
      ctx.translate(boss.x + wobble, boss.y);
      ctx.scale(scale, scale);
      ctx.font = `bold ${80}px serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.shadowColor = '#ff00ff';
      ctx.shadowBlur = 30;
      ctx.fillText(boss.e, 0, 0);
      ctx.restore();

      // Health glow effect
      if (boss.hp < boss.maxhp * 0.3) {
        ctx.globalAlpha = Math.sin(time * 4) * 0.5 + 0.5;
        ctx.fillStyle = '#ff0000';
        ctx.beginPath();
        ctx.arc(boss.x + wobble, boss.y, 100, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      }
    }

    // Ambient particles
    for (let i = 0; i < 5; i++) {
      const x = (time * 30 + i * 80) % cvs.width;
      const y = Math.sin(x * 0.01 + time) * cvs.height * 0.3 + cvs.height * 0.5;
      ctx.globalAlpha = 0.3;
      ctx.fillStyle = '#00ffcc';
      ctx.fillRect(x, y, 2, 2);
    }

    ctx.globalAlpha = 1;
    if (secretState.bossFight) {
      requestAnimationFrame(_drawBossFight);
    }
  }

  function exitSecretArea() {
    // Clean up
    boss = null;
    secretState.bossFight = false;

    // Hide secret screen
    document.getElementById('secretScreen').style.display = 'none';

    // Show game UI again
    document.getElementById('hud').style.display = 'block';
    document.getElementById('controls').style.display = 'flex';
    document.getElementById('hotbar').style.display = 'flex';

    // Reset player position
    if (secretState.bossDefeated) {
      Player.x = 1470;
      Player.y = 1350;
      MissionSystem.markDone('secret');
      MissionSystem.check();
      Utils.notify('🎉 MISI RAHASIA SELESAI!', '#ff00ff');
    } else {
      Player.x = 100;
      Player.y = 100;
      Utils.notify('💔 Sekali lagi!', '#ff0000');
    }

    secretState.portalUnlocked = false;
  }

  // ═══ KEY FOUND LISTENER ═══
  function onKeyPickup() {
    secretState.keyFound = true;
    Utils.notify('🔑 Kunci Rahasia ditemukan! Cari portal di timur laut!', '#ffff00');
  }

  return {
    initSecretKey,
    hasSecretKey,
    interactPortal,
    enterSecretArea,
    bossDamage,
    exitSecretArea,
    onKeyPickup,
    getState: () => secretState,
  };
})();
