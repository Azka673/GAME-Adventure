// ===== LOADING.JS =====
// Layar muat: judul game di atas + bar progres + sambutan per huruf (Typewriter di utils.js)

// ============================================================
//  LOADING SCREEN
// ============================================================
const LoadingScreen = (() => {

  // Steps shown in the progress bar
  const LOAD_STEPS = [
    { label: 'Memuat dunia praaksara…',   pct: 18 },
    { label: 'Menghidupkan hewan liar…',  pct: 36 },
    { label: 'Menyiapkan soal IPS…',      pct: 54 },
    { label: 'Membuka perpustakaan…',     pct: 72 },
    { label: 'Mengisi celah dimensi…',    pct: 88 },
    { label: 'Siap petualangan!',         pct: 100 },
  ];

  // Welcome messages — typewritten one by one
  const WELCOME_LINES = [
    'Selamat datang, Petualang.',
    'Dunia yang belum pernah kau bayangkan menantimu…',
    'Di sini, batu berbicara. Api menyimpan rahasia.',
    'Pelajari sejarah — bukan dari buku, tapi dari dalamnya.',
    'Perjalananmu dimulai sekarang.',
  ];

  let stepIdx    = 0;
  let lineIdx    = 0;
  let bgFrame    = null;
  let onDoneCb   = null;

  // ── Public: mount loading screen HTML then run ──
  function show(onDone) {
    onDoneCb = onDone;
    _mountHTML();
    _startStarfield();

    // Fade in logo
    setTimeout(() => {
      document.getElementById('loadLogo').classList.add('visible');
      document.getElementById('loadSubtitle').classList.add('visible');
      document.getElementById('loadDivider').classList.add('visible');
    }, 200);

    // Start progress bar after brief pause
    setTimeout(() => {
      document.getElementById('loadBarWrap').classList.add('visible');
      _runProgress();
    }, 900);
  }

  // ── Mount HTML into body ──
  function _mountHTML() {
    const el = document.createElement('div');
    el.id = 'loadingScreen';
    el.innerHTML = `
      <canvas id="loadBg"></canvas>
      <div id="loadingContent">
        <div id="loadLogo">⚔ CHRONO HUNTER</div>
        <div id="loadSubtitle">PRAAKSARA OPEN WORLD · ADVANCED EDITION</div>
        <div id="loadDivider"></div>
        <div id="loadWelcome">
          <div id="loadWelcomeText"></div>
        </div>
        <div id="loadBarWrap">
          <div id="loadBarTrack">
            <div id="loadBarFill"></div>
          </div>
        </div>
        <div id="loadStatus">Mempersiapkan…</div>
        <button id="loadContinue" onclick="LoadingScreen._continue()">
          ▶ &nbsp; MULAI
        </button>
      </div>
      <div id="loadVersion">v3.0 · Edisi Pendidikan IPS</div>
    `;
    document.body.prepend(el);

    // Resize starfield canvas
    const cvs = document.getElementById('loadBg');
    cvs.width  = window.innerWidth;
    cvs.height = window.innerHeight;
    window.addEventListener('resize', () => {
      cvs.width  = window.innerWidth;
      cvs.height = window.innerHeight;
    });
  }

  // ── Animated starfield on canvas ──
  function _startStarfield() {
    const cvs = document.getElementById('loadBg');
    const ctx = cvs.getContext('2d');

    // Generate stars
    const stars = Array.from({ length: 200 }, () => ({
      x:   Math.random() * cvs.width,
      y:   Math.random() * cvs.height,
      r:   Math.random() * 1.5 + 0.3,
      a:   Math.random(),
      da:  (Math.random() * 0.006 + 0.002) * (Math.random() < .5 ? 1 : -1),
    }));

    // Shooting stars
    const shoots = [];
    let shootTimer = 0;

    function frame() {
      const W = cvs.width, H = cvs.height;
      ctx.clearRect(0, 0, W, H);

      // Deep space gradient BG
      const gr = ctx.createRadialGradient(W*.5, H*.4, 0, W*.5, H*.4, Math.max(W,H)*.8);
      gr.addColorStop(0, '#050b18');
      gr.addColorStop(1, '#000');
      ctx.fillStyle = gr;
      ctx.fillRect(0, 0, W, H);

      // Nebula blobs
      [[W*.2,H*.3,'#001a3a',.18],[W*.7,H*.6,'#0a001a',.14],[W*.5,H*.5,'#001a10',.10]].forEach(([nx,ny,nc,na])=>{
        ctx.save();
        ctx.globalAlpha = na;
        const ng = ctx.createRadialGradient(nx,ny,0,nx,ny,Math.min(W,H)*.45);
        ng.addColorStop(0,nc); ng.addColorStop(1,'transparent');
        ctx.fillStyle=ng; ctx.fillRect(0,0,W,H);
        ctx.restore();
      });

      // Stars
      stars.forEach(s => {
        s.a = Math.max(0.05, Math.min(1, s.a + s.da));
        if (s.a <= 0.05 || s.a >= 1) s.da *= -1;
        ctx.save();
        ctx.globalAlpha = s.a;
        ctx.fillStyle   = '#fff';
        ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI*2); ctx.fill();
        ctx.restore();
      });

      // Shooting stars
      shootTimer++;
      if (shootTimer > 90 && Math.random() < 0.04) {
        shoots.push({
          x: Math.random() * W, y: Math.random() * H * .5,
          vx: 4 + Math.random() * 6, vy: 2 + Math.random() * 3,
          life: 40, maxLife: 40,
        });
        shootTimer = 0;
      }
      shoots.forEach((s, i) => {
        s.x += s.vx; s.y += s.vy; s.life--;
        ctx.save();
        ctx.globalAlpha = s.life / s.maxLife * 0.8;
        ctx.strokeStyle = '#fff';
        ctx.lineWidth   = 1.5;
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(s.x - s.vx * 6, s.y - s.vy * 6);
        ctx.stroke();
        ctx.restore();
        if (s.life <= 0) shoots.splice(i, 1);
      });

      bgFrame = requestAnimationFrame(frame);
    }
    frame();
  }

  // ── Run progress bar step by step ──
  function _runProgress() {
    if (stepIdx >= LOAD_STEPS.length) {
      // All steps done — show welcome typewriter
      _runWelcomeLines();
      return;
    }
    const step = LOAD_STEPS[stepIdx];
    document.getElementById('loadStatus').textContent  = step.label;
    document.getElementById('loadBarFill').style.width = step.pct + '%';
    stepIdx++;

    // Each step takes 380–600ms
    const delay = 380 + Math.random() * 220;
    setTimeout(_runProgress, delay);
  }

  // ── Type welcome lines one by one ──
  function _runWelcomeLines() {
    if (lineIdx >= WELCOME_LINES.length) {
      // All lines done → show continue button
      document.getElementById('loadStatus').textContent = '✓ Semuanya siap!';
      document.getElementById('loadStatus').style.color = '#00ffcc';
      document.getElementById('loadContinue').classList.add('visible');
      return;
    }
    const el   = document.getElementById('loadWelcomeText');
    const text = WELCOME_LINES[lineIdx];
    lineIdx++;

    Typewriter.write(el, text, {
      speed: 38,
      cursor: true,
      onDone: () => {
        // Hold each line 900ms then clear and type next
        setTimeout(() => {
          el.textContent = '';
          setTimeout(_runWelcomeLines, 200);
        }, 900);
      },
    });
  }

  // ── Continue button handler ──
  function _continue() {
    const screen = document.getElementById('loadingScreen');
    screen.style.transition = 'opacity .7s ease';
    screen.style.opacity    = '0';
    if (bgFrame) { cancelAnimationFrame(bgFrame); bgFrame = null; }
    setTimeout(() => {
      screen.remove();
      if (onDoneCb) onDoneCb();
    }, 700);
  }

  return { show, _continue };
})();
