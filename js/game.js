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
  const ctx    = canvas.getContext('2d');

  const keys  = {};
  let jDx     = 0, jDy = 0, jActive = false;
  let inputBound  = false;
  let loopRunning = false;

  // ---- resize ----
  function _resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  // ---- input ----
  function _setupInput() {
    if (inputBound) return;
    inputBound = true;

    // Keyboard
    document.addEventListener('keydown', e => {
      keys[e.code] = true;
      if (e.code === 'ShiftLeft' || e.code === 'ShiftRight') Player.sprintOn = true;
    });
    document.addEventListener('keyup', e => {
      keys[e.code] = false;
      if (e.code === 'ShiftLeft' || e.code === 'ShiftRight') Player.sprintOn = false;
      if (e.code === 'KeyG') Inventory.open();
      if (e.code === 'KeyE') Player.interact();
      if (e.code === 'KeyF') Player.attack();
      if (e.code === 'KeyC') Crafting.open();
    });

    // Joystick — Pointer Events (works mouse + touch + pen)
    const jOut   = document.getElementById('jOut');
    const jIn    = document.getElementById('jIn');
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

    // Canvas chest-tap
    function handleTap(clientX, clientY) {
      if (!GS.started) return;
      const ox = canvas.width  / 2 - World.cam.x;
      const oy = canvas.height / 2 - World.cam.y;
      World.objects.forEach(obj => {
        if (obj.type === 'chest' && !obj.opened &&
            Utils.dist(clientX, clientY, obj.x + ox, obj.y + oy) < 52) {
          obj.opened = true;
          Inventory.add(obj.drop.e, obj.drop.n, obj.drop.c);
          Utils.notify('📦 ' + obj.drop.n + ' ditemukan!', '#ffcc00');
          MissionSystem.check();
        }
      });
    }
    canvas.addEventListener('click',    e => handleTap(e.clientX, e.clientY));
    canvas.addEventListener('touchend', e => {
      const t = e.changedTouches[0];
      handleTap(t.clientX, t.clientY);
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

    // Intro dialog after short delay
    setTimeout(_playIntro, 500);
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

    GS.tick++;

    Player.update(jActive ? jDx : 0, jActive ? jDy : 0, keys);
    Player.updateProjectiles();
    AnimalSystem.update();
    World.update();
    World.draw(ctx);

    // Sync score HUD
    const sc = document.getElementById('hScore');
    if (sc) sc.textContent = '🏆 ' + Utils.fmt(GS.score);
  }

  return { start };
})();
