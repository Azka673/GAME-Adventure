// ===== ENDING.JS =====

const EndingSystem = (() => {
  let animFrame   = null;
  let dlgLines    = [];
  let dlgIdx      = 0;
  let endingReady = false;

  function show() {
    if (GS.quizAnswered < 10) return;

    // Determine ending type
    const pct      = GS.quizCorrect / 10;
    const missions = GS.missionsDone;
    let type;

    if (GS.secretFound && missions >= 4 && pct >= 0.9) {
      type = 'secret';
    } else if (pct >= 0.8 && missions >= 3) {
      type = 'true';
    } else if (pct >= 0.5 && missions >= 2) {
      type = 'good';
    } else {
      type = 'bad';
    }
    GS.endingType = type;

    // Hide game UI
    document.getElementById('hud').style.display        = 'none';
    document.getElementById('controls').style.display   = 'none';
    document.getElementById('hotbar').style.display     = 'none';
    document.getElementById('npcBox') && (document.getElementById('npcBox').style.display = 'none');
    document.getElementById('quizPanel').style.display  = 'none';
    document.getElementById('dialogBox').style.display  = 'none';

    // Show ending screen
    const screen = document.getElementById('endingScreen');
    screen.style.display = 'block';

    // Setup canvas
    const ec  = document.getElementById('endCvs');
    ec.width  = window.innerWidth;
    ec.height = window.innerHeight;

    // Configure by type
    const cfg = _getConfig(type);
    _animateBackground(ec, cfg);
    _setupBadge(cfg);
    _fillStats();

    // Start dialog sequence
    dlgLines = EndingDialogs[type] || [];
    dlgIdx   = 0;
    endingReady = false;
    document.getElementById('endBack').style.display = 'none';

    // Small delay before first dialog line
    setTimeout(() => _showDlgLine(), 800);
  }

  function nextLine() {
    // If typewriter still running → skip to full text first
    if (_endTyping && _endSkip) { _endSkip(); return; }

    dlgIdx++;
    if (dlgIdx < dlgLines.length) {
      _showDlgLine();
    } else {
      // All dialog done → show back button
      endingReady = true;
      document.getElementById('endDialogBox').style.display = 'none';
      document.getElementById('endBack').style.display      = 'block';
    }
  }

  function backToMenu() {
    if (animFrame) { cancelAnimationFrame(animFrame); animFrame = null; }
    document.getElementById('endingScreen').style.display = 'none';

    // Full reset
    GS.started      = false;
    GS.tick         = 0;
    GS.score        = 0;
    GS.quizAnswered = 0;
    GS.quizCorrect  = 0;
    GS.quizAsked    = [];
    GS.missionsDone = 0;
    GS.secretFound  = false;
    GS.inDimension  = false;
    GS.dimLevel     = 0;
    GS.dimQuizDone  = false;
    GS.endingType   = null;

    Player.reset();
    MissionSystem.reset();

    document.getElementById('mainMenu').style.display = 'flex';
  }

  // ---- private ----

  function _showDlgLine() {
    const line = dlgLines[dlgIdx];
    if (!line) return;
    const box     = document.getElementById('endDialogBox');
    const textEl  = document.getElementById('endCharText');
    box.style.display = 'block';
    document.getElementById('endCharPortrait').textContent = line.portrait;
    document.getElementById('endCharName').textContent     = line.speaker;
    _typeEnd(textEl, line.text, 30);
  }

  // Typewriter for ending — skip on next click if still typing
  let _endTyping = false;
  let _endSkip   = null;

  function _typeEnd(el, text, speed) {
    el.textContent = '';
    _endTyping = true;
    let i = 0, timer;

    // cursor
    const cur = document.createElement('span');
    cur.style.cssText =
      'display:inline-block;width:2px;height:1em;background:currentColor;' +
      'vertical-align:middle;margin-left:2px;' +
      'animation:cursorBlink .75s step-end infinite;';
    el.appendChild(cur);

    function tick() {
      if (i < text.length) {
        el.insertBefore(document.createTextNode(text[i++]), cur);
        timer = setTimeout(tick, speed);
      } else {
        if (cur.parentNode) cur.parentNode.removeChild(cur);
        _endTyping = false; _endSkip = null;
      }
    }
    timer = setTimeout(tick, speed);

    _endSkip = () => {
      clearTimeout(timer);
      el.textContent = text;
      _endTyping = false; _endSkip = null;
    };
  }

  function _getConfig(type) {
    return {
      true: {
        badge: '🟢 TRUE ENDING', badgeColor: '#00ffcc',
        title: 'Sang Penjelajah Bijaksana',
        particles: '#00ffcc', bg1: '#001a12', bg2: '#003322',
        titleGlow: '#00ffcc',
      },
      secret: {
        badge: '⭐ SECRET ENDING', badgeColor: '#cc88ff',
        title: 'Penjaga Waktu Sejati',
        particles: '#cc88ff', bg1: '#0a0018', bg2: '#1a0030',
        titleGlow: '#cc88ff',
      },
      good: {
        badge: '🟡 GOOD ENDING', badgeColor: '#ffcc00',
        title: 'Petualang yang Berkembang',
        particles: '#ffcc00', bg1: '#1a1400', bg2: '#2a2000',
        titleGlow: '#ffcc00',
      },
      bad: {
        badge: '🔴 BAD ENDING', badgeColor: '#ff5555',
        title: 'Terjebak di Arkeozoikum',
        particles: '#ff5555', bg1: '#1a0000', bg2: '#2a0808',
        titleGlow: '#ff5555',
      },
    }[type];
  }

  function _setupBadge(cfg) {
    const badge = document.getElementById('endBadge');
    const title = document.getElementById('endTitle');
    badge.textContent    = cfg.badge;
    badge.style.color    = cfg.badgeColor;
    badge.style.borderColor = cfg.badgeColor;
    title.textContent    = cfg.title;
    title.style.color    = cfg.badgeColor;
    title.style.textShadow = `0 0 40px ${cfg.titleGlow}`;
  }

  function _fillStats() {
    document.getElementById('eScr').textContent  = Utils.fmt(GS.score);
    document.getElementById('eCorr').textContent = `${GS.quizCorrect}/10`;
    document.getElementById('eMiss').textContent = `${GS.missionsDone}/5`;
  }

  function _animateBackground(cvs, cfg) {
    const ctx = cvs.getContext('2d');
    const W = cvs.width, H = cvs.height;

    const particles = Array.from({ length: 120 }, () => ({
      x:  Math.random() * W,
      y:  H + Math.random() * 60,
      vx: (Math.random() - .5) * 1.4,
      vy: -(0.4 + Math.random() * 2.2),
      sz: Math.random() * 4 + 1,
      a:  Math.random(),
    }));

    // Extra stars for secret ending
    const stars = GS.endingType === 'secret'
      ? Array.from({ length: 80 }, () => ({
          x: Math.random() * W, y: Math.random() * H,
          sz: Math.random() * 2 + 0.5, twinkle: Math.random() * Math.PI * 2,
        }))
      : [];

    let t = 0;

    function frame() {
      ctx.clearRect(0, 0, W, H);

      // Gradient BG
      const gr = ctx.createRadialGradient(W/2, H/2, 0, W/2, H/2, Math.max(W,H));
      gr.addColorStop(0, cfg.bg2);
      gr.addColorStop(1, cfg.bg1);
      ctx.fillStyle = gr; ctx.fillRect(0, 0, W, H);

      // Stars (secret ending)
      stars.forEach(s => {
        s.twinkle += 0.05;
        ctx.save();
        ctx.globalAlpha = 0.4 + Math.sin(s.twinkle) * 0.4;
        ctx.fillStyle   = '#fff';
        ctx.beginPath(); ctx.arc(s.x, s.y, s.sz, 0, Math.PI * 2); ctx.fill();
        ctx.restore();
      });

      // Rising particles
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy; p.a -= 0.003;
        if (p.y < -10 || p.a <= 0) {
          p.y = H + 10; p.x = Math.random() * W; p.a = 1;
        }
        ctx.save();
        ctx.globalAlpha = Math.max(0, p.a);
        ctx.fillStyle   = cfg.particles;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.sz, 0, Math.PI * 2); ctx.fill();
        ctx.restore();
      });

      // Center pulse glow (bad ending = red skull)
      if (GS.endingType === 'bad') {
        ctx.save();
        ctx.globalAlpha = 0.06 + Math.sin(t * 0.04) * 0.04;
        ctx.fillStyle   = '#ff0000';
        ctx.beginPath(); ctx.arc(W/2, H/2, 200 + Math.sin(t*0.03)*30, 0, Math.PI*2); ctx.fill();
        ctx.restore();
      }

      // Kingdom glow (secret ending)
      if (GS.endingType === 'secret') {
        ctx.save();
        ctx.globalAlpha = 0.08 + Math.sin(t * 0.03) * 0.04;
        const rg = ctx.createRadialGradient(W/2, H*.6, 0, W/2, H*.6, 180);
        rg.addColorStop(0, '#ffcc00'); rg.addColorStop(1, 'transparent');
        ctx.fillStyle = rg; ctx.fillRect(0, 0, W, H);
        ctx.restore();
      }

      t++;
      if (document.getElementById('endingScreen').style.display !== 'none') {
        animFrame = requestAnimationFrame(frame);
      }
    }
    frame();
  }

  return { show, nextLine, backToMenu };
})();
