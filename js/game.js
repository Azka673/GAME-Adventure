// ===== GAME.JS =====
// Mission system + main game loop orchestrator

// ============================================================
//  MISSION SYSTEM
// ============================================================
const MissionSystem = (() => {
  const MISSIONS = [
    { id:'talk',   label:'Bicara dengan NPC',      done:false },
    { id:'wood',   label:'Kumpulkan 3 Kayu 🪵',     done:false },
    { id:'sword',  label:'Temukan Pedang ⚔',        done:false },
    { id:'dim',    label:'Masuki Celah Dimensi 🌀',  done:false },
    { id:'quiz',   label:'Jawab 10 Soal ❓',         done:false },
  ];

  function check() {
    if (Inventory.has('🪵', 3))  MISSIONS[1].done = true;
    if (Inventory.has('⚔'))      MISSIONS[2].done = true;
    if (GS.dimQuizDone)          MISSIONS[3].done = true;
    if (GS.quizAnswered >= 10)   MISSIONS[4].done = true;

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
      div.innerHTML = `<div class="tCheck${m.done ? ' tCheckDone' : ''}"></div>${m.label}`;
      list.appendChild(div);
    });
  }

  return { check, markDone, reset };
})();

// ============================================================
//  GAME CORE — start / loop
// ============================================================
const GameCore = (() => {
  const canvas = document.getElementById('gc');
  const ctx    = canvas.getContext('2d');

  // Input state
  const keys = {};
  let jDx = 0, jDy = 0, jActive = false;

  function _resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function _setupInput() {
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

    // Joystick
    const jOut = document.getElementById('jOut');
    const jIn  = document.getElementById('jIn');
    jOut.addEventListener('touchstart', e => { jActive = true; e.preventDefault(); }, { passive: false });
    jOut.addEventListener('touchmove', e => {
      e.preventDefault();
      const t   = e.touches[0];
      const r   = jOut.getBoundingClientRect();
      const cx  = r.left + r.width  / 2;
      const cy  = r.top  + r.height / 2;
      let dx = t.clientX - cx, dy = t.clientY - cy;
      const d  = Math.sqrt(dx * dx + dy * dy), mx = 36;
      if (d > mx) { dx = dx / d * mx; dy = dy / d * mx; }
      jIn.style.left      = (50 + dx / r.width  * 100) + '%';
      jIn.style.top       = (50 + dy / r.height * 100) + '%';
      jIn.style.transform = 'translate(-50%,-50%)';
      jDx = dx / mx; jDy = dy / mx;
    }, { passive: false });
    jOut.addEventListener('touchend',    () => { jActive = false; jDx = 0; jDy = 0; jIn.style.left = '50%'; jIn.style.top = '50%'; jIn.style.transform = 'translate(-50%,-50%)'; });
    jOut.addEventListener('touchcancel', () => { jActive = false; jDx = 0; jDy = 0; });

    // Camera swipe
    let lastTx = 0, swiping = false;
    canvas.addEventListener('touchstart', e => {
      if (e.target === canvas) { lastTx = e.touches[0].clientX; swiping = true; }
    });
    canvas.addEventListener('touchmove', e => {
      if (swiping) { World.cam.x -= (e.touches[0].clientX - lastTx) * 0; lastTx = e.touches[0].clientX; }
      // (rotation disabled for simplicity — left/right movement handles camera)
    });
    canvas.addEventListener('touchend', () => { swiping = false; });

    // Chest tap on canvas
    function handleCanvasTap(clientX, clientY) {
      if (!GS.started) return;
      const ox = canvas.width  / 2 - World.cam.x;
      const oy = canvas.height / 2 - World.cam.y;
      World.objects.forEach(obj => {
        if (obj.type === 'chest' && !obj.opened) {
          if (Utils.dist(clientX, clientY, obj.x + ox, obj.y + oy) < 50) {
            obj.opened = true;
            Inventory.add(obj.drop.e, obj.drop.n, obj.drop.c);
            MissionSystem.check();
          }
        }
      });
    }
    canvas.addEventListener('click',    e => handleCanvasTap(e.clientX, e.clientY));
    canvas.addEventListener('touchend', e => {
      const t = e.changedTouches[0];
      handleCanvasTap(t.clientX, t.clientY);
    });
  }

  function start() {
    GS.started = true;
    document.getElementById('mainMenu').style.display  = 'none';
    canvas.style.display                               = 'block';
    document.getElementById('hud').style.display       = 'block';
    document.getElementById('hotbar').style.display    = 'flex';
    document.getElementById('controls').style.display  = 'block';

    // Init subsystems
    World.init();
    AnimalSystem.init();
    NPCSystem.init();
    MissionSystem.reset();

    // Starting inventory
    Inventory.add('🪵', 'Kayu',  2);
    Inventory.add('🍖', 'Daging', 1);

    // Show intro dialog
    _playIntro(() => {
      // After intro, start loop
      requestAnimationFrame(_loop);
    });
  }

  function _playIntro(cb) {
    const lines = StoryDialogs.intro;
    let idx = 0;
    function showLine() {
      if (idx < lines.length) {
        const line = lines[idx];
        Dialog.show(line.speaker, line.portrait, [line.text], null);
        document.getElementById('dialogNext').onclick = () => {
          idx++;
          showLine();
        };
        idx++;
      } else {
        Dialog.close();
        cb();
      }
    }
    // Small delay so canvas is ready
    setTimeout(showLine, 300);
  }

  function _loop() {
    if (!GS.started) return;
    if (GS.inDimension) { requestAnimationFrame(_loop); return; }

    GS.tick++;

    // Update
    Player.update(jActive ? jDx : 0, jActive ? jDy : 0, keys);
    AnimalSystem.update();
    World.update();

    // Draw
    World.draw(ctx);

    // HUD score sync
    document.getElementById('hScore').textContent = `🏆 ${Utils.fmt(GS.score)}`;

    requestAnimationFrame(_loop);
  }

  return { start };
})();
