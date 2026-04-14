// ===== GAME.JS =====

// ============================================================
//  MISSION SYSTEM
// ============================================================
const MissionSystem = (() => {
  const MISSIONS = [
    { id:'talk',  label:'Bicara dengan NPC',      done:false },
    { id:'wood',  label:'Kumpulkan 3 Kayu 🪵',     done:false },
    { id:'sword', label:'Temukan Pedang ⚔',        done:false },
    { id:'dim',   label:'Masuki Celah Dimensi 🌀',  done:false },
    { id:'quiz',  label:'Jawab 10 Soal ❓',         done:false },
    { id:'secret', label:'RAHASIA: Alahlah Dragon Proto 🦖 ⭐', done:false },
  ];

  function check() {
    if (Inventory.has('🪵', 3)) MISSIONS[1].done = true;
    if (Inventory.has('⚔'))     MISSIONS[2].done = true;
    if (GS.dimQuizDone)         MISSIONS[3].done = true;
    if (GS.quizAnswered >= 10)  MISSIONS[4].done = true;
    GS.missionsDone = MISSIONS.filter(m => m.done).length;
    _updateUI();
  }

  function markDone(id) {
    const m = MISSIONS.find(m => m.id === id);
    if (m) m.done = true;
    check();
  }

  function reset() {
    MISSIONS.forEach(m => m.done = false);
    _updateUI();
  }

  function _updateUI() {
    const list = document.getElementById('taskList');
    if (!list) return;
    list.innerHTML = '';
    MISSIONS.forEach(m => {
      const div = document.createElement('div');
      div.className = 'tPItem' + (m.done ? ' tPDone' : '');
      div.innerHTML =
        '<div class="tCheck' + (m.done ? ' tCheckDone' : '') + '"></div>' + m.label;
      list.appendChild(div);
    });
  }

  return { check, markDone, reset };
})();

// ============================================================
//  GAME CORE
// ============================================================
const GameCore = (() => {
  const canvas = document.getElementById('gc');
  if (!canvas) { console.error('[GAME] Canvas #gc not found!'); return {}; }
  const ctx    = canvas.getContext('2d');
  if (!ctx) { console.error('[GAME] Canvas context not available!'); return {}; }

  const keys  = {};
  let jDx     = 0, jDy = 0, jActive = false;
  let inputBound  = false;
  let loopRunning = false;

  // ---- resize ----
  function _resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  // ---- equip from hotbar ----
  function _equipFromHotbar(slotIdx) {
    const items = Inventory.getAll();
    if (slotIdx >= items.length) return;
    
    const item = items[slotIdx];
    if (!item) return;
    
    // Cek tipe item dan equip sesuai tipenya
    if (Player.WEAPONS && Player.WEAPONS[item.e]) {
      Player.equip(item.e);
    } else if (Player.ARMORS && Player.ARMORS[item.e]) {
      Player.equipArmor(item.e);
    } else if (Player.SHIELDS && Player.SHIELDS[item.e]) {
      Player.equipShield(item.e);
    }
  }

  // ---- input ----
  function _setupInput() {
    if (inputBound) return;
    inputBound = true;

    // Attach to WINDOW with capture phase to catch all keyboard events EARLY
    window.addEventListener('keydown', e => {
      keys[e.code] = true;
      if (e.code === 'ShiftLeft' || e.code === 'ShiftRight') Player.sprintOn = true;
    }, true);
    
    window.addEventListener('keyup', e => {
      keys[e.code] = false;
      if (e.code === 'ShiftLeft' || e.code === 'ShiftRight') Player.sprintOn = false;
      if (e.code === 'KeyG') Inventory.open();
      if (e.code === 'KeyE') Player.interact();
      if (e.code === 'KeyQ') Player.talk();
      if (e.code === 'KeyF') Player.attack();
      if (e.code === 'KeyX') Player.activateSkill();
      if (e.code === 'KeyC') Crafting.open();
      if (e.code === 'Escape') PauseMenu.open();
      // Hotbar equip dengan 1-5
      if (e.code === 'Digit1') _equipFromHotbar(0);
      if (e.code === 'Digit2') _equipFromHotbar(1);
      if (e.code === 'Digit3') _equipFromHotbar(2);
      if (e.code === 'Digit4') _equipFromHotbar(3);
      if (e.code === 'Digit5') _equipFromHotbar(4);
    }, true);

    // Joystick — Pointer Events (works mouse + touch + pen)
    const jOut   = document.getElementById('jOut');
    const jIn    = document.getElementById('jIn');
    if (!jOut || !jIn) return;
    
    const JOY_R  = 36; // max radius in px

    function joyMove(clientX, clientY) {
      const r  = jOut.getBoundingClientRect();
      const cx = r.left + r.width  / 2;
      const cy = r.top  + r.height / 2;
      let dx = clientX - cx;
      let dy = clientY - cy;
      const d = Math.sqrt(dx * dx + dy * dy);
      if (d > JOY_R) { dx = (dx / d) * JOY_R; dy = (dy / d) * JOY_R; }
      jIn.style.left      = (50 + (dx / r.width)  * 100) + '%';
      jIn.style.top       = (50 + (dy / r.height) * 100) + '%';
      jIn.style.transform = 'translate(-50%,-50%)';
      jDx = dx / JOY_R;
      jDy = dy / JOY_R;
    }

    function joyReset() {
      jActive = false; jDx = 0; jDy = 0;
      jIn.style.left      = '50%';
      jIn.style.top       = '50%';
      jIn.style.transform = 'translate(-50%,-50%)';
    }

    jOut.addEventListener('pointerdown', e => {
      jActive = true;
      try { jOut.setPointerCapture(e.pointerId); } catch(_) {}
      joyMove(e.clientX, e.clientY);
      e.preventDefault();
    }, { passive: false });

    jOut.addEventListener('pointermove', e => {
      if (!jActive) return;
      joyMove(e.clientX, e.clientY);
      e.preventDefault();
    }, { passive: false });

    jOut.addEventListener('pointerup',     e => {
      try { if (jOut.hasPointerCapture(e.pointerId)) jOut.releasePointerCapture(e.pointerId); } catch(_) {}
      joyReset();
    });
    jOut.addEventListener('pointercancel', e => {
      try { if (jOut.hasPointerCapture(e.pointerId)) jOut.releasePointerCapture(e.pointerId); } catch(_) {}
      joyReset();
    });
    console.log('[INPUT] Joystick handler setup complete');

    function handleTap(clientX, clientY) {
      if (!GS.started) return false;
      const ox = canvas.width  / 2 - World.cam.x;
      const oy = canvas.height / 2 - World.cam.y;
      let consumed = false;
      World.objects.forEach(obj => {
        if (obj.type === 'chest' && !obj.opened &&
            Utils.dist(clientX, clientY, obj.x + ox, obj.y + oy) < 52) {
          obj.opened = true;
          Inventory.add(obj.drop.e, obj.drop.n, obj.drop.c);
          Utils.notify('📦 ' + obj.drop.n + ' ditemukan!', '#ffcc00');
          MissionSystem.check();
          consumed = true;
        }
      });
      return consumed;
    }

    canvas.addEventListener('click', e => {
      if (!handleTap(e.clientX, e.clientY)) Player.attack();
    });
    canvas.addEventListener('touchend', e => {
      const t = e.changedTouches[0];
      if (!handleTap(t.clientX, t.clientY)) Player.attack();
    });

    window.addEventListener('resize', _resize);
  }

  // ---- start ----
  function start() {
    GS.started = true;

    // Show game UI
    document.getElementById('mainMenu').style.display = 'none';
    canvas.style.display                              = 'block';
    document.getElementById('hud').style.display      = 'block';
    document.getElementById('hotbar').style.display   = 'flex';
    document.getElementById('controls').style.display = 'block';

    _resize();
    _setupInput();

    // Init audio
    AudioManager.init();
    if (AudioManager.getBGMusicEnabled()) {
      AudioManager.playBGMusic();
    }

    // Reset & init
    Player.reset();
    World.init();
    AnimalSystem.init();
    NPCSystem.init();
    MissionSystem.reset();

    // Starting items
    Inventory.add('🪵', 'Kayu',   2);
    Inventory.add('🍖', 'Daging', 1);

    // Start loop immediately so world renders
    if (!loopRunning) {
      loopRunning = true;
      requestAnimationFrame(_loop);
    }

    // Tutorial dulu, baru dialog intro
    Tutorial.open(false, () => {
      setTimeout(_playIntro, 250);
    });
  }

  // ---- intro dialog ----
  function _playIntro() {
    const lines = StoryDialogs.intro;
    let idx = 0;   // start at 0, advance only on tap

    function showLine() {
      if (idx >= lines.length) {
        Dialog.close();
        return;
      }
      const line = lines[idx];
      // Show ONE line; clicking Next → idx++ → showLine()
      Dialog.show(line.speaker, line.portrait, [line.text], null);
      document.getElementById('dialogNext').onclick = () => {
        idx++;
        showLine();
      };
    }

    showLine();
  }

  // ---- main loop ----
  function _loop() {
    if (!GS.started) { loopRunning = false; return; }

    // Always keep looping even inside dimension (so world stays rendered)
    requestAnimationFrame(_loop);

    if (GS.inDimension) return;   // skip update/draw while in dimension
    if (GS.paused) {
      World.draw(ctx);  // Still draw world in pause
      return;
    }

    GS.tick++;

    // Ensure input is passed correctly
    const joyX = jActive ? jDx : 0;
    const joyY = jActive ? jDy : 0;
    Player.update(joyX, joyY, keys);
    Player.updateProjectiles();
    
    // Check if player is dead - trigger bad ending
    if (Player.hp <= 0) {
      GS.started = false;
      EndingSystem.showBadEnding();
      return;
    }

    AnimalSystem.update();
    World.update();
    World.draw(ctx);

    // Sync score HUD
    const sc = document.getElementById('hScore');
    if (sc) sc.textContent = '🏆 ' + Utils.fmt(GS.score);
    
    // Sync time and timer HUD
    const timeEl = document.getElementById('hTime');
    const timerEl = document.getElementById('hTimer');
    if (timeEl) {
      const timeIcons = { 'day': '🌞', 'sore': '🌅', 'night': '🌙', 'dawn': '🌄' };
      const timeNames = { 'day': 'Pagi', 'sore': 'Sore', 'night': 'Malam', 'dawn': 'Fajar' };
      timeEl.textContent = `⏰ ${timeIcons[GS.timeOfDay]} ${timeNames[GS.timeOfDay]}`;
    }
    if (timerEl) {
      const remaining = 900 - GS.timeProgress;
      const mins = Math.floor(remaining / 60);
      const secs = remaining % 60;
      timerEl.textContent = `⏱ ${mins}:${secs.toString().padStart(2, '0')}`;
    }
  }

  return { start };
})();
