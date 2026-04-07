// ===== DIMENSION.JS =====
// Celah dimensi — interactable portals with dimension-specific quiz and environment

const Dimension = (() => {
  let animFrame = null;
  let currentDim = 0;

  const DIM_DATA = {
    1: {
      name: 'Dimensi Paleolitikum',
      color: '#ff8844',
      bg1: '#1a0800', bg2: '#2a1400',
      intro: [
        "Kau memasuki celah dimensi yang terbuka ke masa 500.000 tahun yang lalu...",
        "Udara berbeda. Lebih dingin. Tidak ada suara kota sama sekali.",
        "Di sini manusia baru saja mulai membuat alat batu pertama mereka.",
        "Jawab pertanyaan rahasia ini untuk mendapatkan pengetahuan dimensi Paleolitikum!",
      ],
      quizQ: "Di zaman Paleolitikum, sumber makanan utama manusia adalah...",
      quizOpts: ["Bertani padi dan jagung", "Berburu hewan liar dan meramu tumbuhan", "Beternak domba dan sapi", "Membeli dari pasar desa"],
      quizAns: 1,
      quizFact: "Manusia Paleolitikum 100% bergantung pada alam: berburu hewan dan meramu buah/umbi. Tidak ada pertanian — konsep itu belum ada!",
      reward: { e: '🪨', n: 'Batu Purba', c: 5 },
    },
    2: {
      name: 'Dimensi Neolitikum',
      color: '#44dd88',
      bg1: '#001a08', bg2: '#001408',
      intro: [
        "Kau masuk ke dimensi yang menampilkan zaman 7.000 tahun yang lalu...",
        "Aroma tanah basah dan api unggun. Samar-samar terdengar suara cangkul.",
        "Di sini manusia baru saja menemukan cara bercocok tanam!",
        "Jawab pertanyaan ini untuk mendapatkan pengetahuan dimensi Neolitikum!",
      ],
      quizQ: "Apa alasan utama manusia Neolitikum MULAI menetap di satu tempat?",
      quizOpts: ["Terlalu lelah untuk berpindah", "Harus merawat tanaman pertanian yang ditanam", "Diperintah raja untuk diam", "Takut hewan buas di hutan"],
      quizAns: 1,
      quizFact: "Tanaman butuh perawatan rutin — disiram, dijaga dari hama, dipanen. Tidak bisa ditinggal pergi begitu saja. Inilah yang memaksa manusia menetap!",
      reward: { e: '🌾', n: 'Benih Purba', c: 3 },
    },
  };

  function enter(dimId) {
    if (GS.inDimension) return;
    GS.inDimension = true;
    GS.dimLevel    = dimId;
    currentDim     = dimId;

    const data = DIM_DATA[dimId];
    if (!data) { _exit(); return; }

    const overlay = document.getElementById('dimensionOverlay');
    const dimCvs  = document.getElementById('dimCvs');
    dimCvs.width  = window.innerWidth;
    dimCvs.height = window.innerHeight;

    overlay.style.display = 'flex';
    document.getElementById('hDim').style.display = 'block';

    _animateDim(dimCvs, data.color, data.bg1, data.bg2);
    _showIntroLines(data, dimId);
  }

  function _showIntroLines(data, dimId) {
    let idx = 0;
    const dimText  = document.getElementById('dimText');
    const dimQuiz  = document.getElementById('dimQuiz');
    const dimTitle = document.getElementById('dimTitle');

    dimTitle.textContent = '🌀 ' + data.name;
    dimTitle.style.color = data.color;
    dimQuiz.innerHTML    = '';

    function showLine() {
      if (idx < data.intro.length) {
        const text = data.intro[idx];
        idx++;
        dimText.style.borderColor = data.color + '44';
        Typewriter.write(dimText, text, {
          speed: 30,
          cursor: true,
          onDone: () => setTimeout(showLine, 1400),
        });
      } else {
        _showDimQuiz(data, dimId);
      }
    }
    showLine();
  }

  function _showDimQuiz(data, dimId) {
    const dimQuiz = document.getElementById('dimQuiz');
    const dimText = document.getElementById('dimText');
    dimQuiz.innerHTML = '';
    Typewriter.write(dimText, data.quizQ, {
      speed: 28,
      cursor: true,
      onDone: () => {
        const shuffled = Utils.shuffle(data.quizOpts.map((o, i) => ({ t: o, oi: i })));
        let html = `<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:12px;">`;
        shuffled.forEach((o, i) => {
          html += `<div class="qBtn" id="dimOpt${i}" onclick="Dimension._answerDim(${o.oi},${data.quizAns},${i},${shuffled.length},'${dimId}')">${o.t}</div>`;
        });
        html += '</div>';
        dimQuiz.innerHTML = html;
      },
    });
  }

  function _answerDim(chosen, correct, btnIdx, total, dimId) {
    const data = DIM_DATA[dimId];
    // Disable all buttons
    for (let i = 0; i < total; i++) {
      const b = document.getElementById('dimOpt' + i);
      if (b) b.onclick = null;
    }
    const btn = document.getElementById('dimOpt' + btnIdx);

    const isCorrect = chosen === correct;
    if (isCorrect) {
      if (btn) btn.classList.add('ok');
      GS.quizCorrect++;
      GS.score += 150;
      Utils.notify('✅ Benar! +150 Poin (Bonus Dimensi)', '#cc88ff');
    } else {
      if (btn) btn.classList.add('bad');
      Utils.notify('❌ Salah!', '#ff5555');
    }
    GS.quizAnswered++;
    GS.dimQuizDone = true;

    const dimText = document.getElementById('dimText');
    setTimeout(() => {
      const factStr = 'Fakta: ' + data.quizFact;
      Typewriter.write(dimText, factStr, {
        speed: 26,
        cursor: true,
        onDone: () => {
          setTimeout(() => {
            Inventory.add(data.reward.e, data.reward.n, data.reward.c);
            _showExitPrompt(data);
          }, 3200);
        },
      });
    }, 800);

    MissionSystem.check();
    document.getElementById('hQuiz').textContent  = `❓ ${GS.quizAnswered}/10`;
    document.getElementById('hScore').textContent = `🏆 ${Utils.fmt(GS.score)}`;
  }

  function _showExitPrompt(data) {
    Typewriter.write(
      document.getElementById('dimText'),
      `Dimensi ${data.name} telah memberikan pengetahuannya. Kau bisa keluar sekarang.`,
      { speed: 28, cursor: false },
    );
    document.getElementById('dimExit').style.display = 'block';
  }

  function exit() {
    GS.inDimension = false;
    document.getElementById('dimensionOverlay').style.display = 'none';
    document.getElementById('hDim').style.display = 'none';
    document.getElementById('dimExit').style.display = 'none';

    if (animFrame) { cancelAnimationFrame(animFrame); animFrame = null; }

    // Dialog on exit
    const exitLines = StoryDialogs.dimensionExit;
    let idx = 0;
    function showExit() {
      if (idx < exitLines.length) {
        Dialog.show(exitLines[idx].speaker, exitLines[idx].portrait, [exitLines[idx].text], null);
        document.getElementById('dialogNext').onclick = () => { idx++; showExit(); };
        idx++;
      } else {
        Dialog.close();
        if (GS.quizAnswered >= 10) setTimeout(() => EndingSystem.show(), 1200);
      }
    }
    showExit();
  }

  function _animateDim(cvs, color, bg1, bg2) {
    const ctx = cvs.getContext('2d');
    const W = cvs.width, H = cvs.height;
    let t = 0;
    const parts = Array.from({ length: 60 }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random()-.5)*1.5, vy: -0.5-Math.random()*2,
      sz: Math.random()*4+1, a: Math.random()
    }));

    function frame() {
      ctx.clearRect(0, 0, W, H);
      // Animated BG
      const gr = ctx.createRadialGradient(W/2, H/2, 0, W/2, H/2, Math.max(W,H)*.8);
      gr.addColorStop(0, bg2);
      gr.addColorStop(1, bg1);
      ctx.fillStyle = gr; ctx.fillRect(0, 0, W, H);
      // Ripple rings
      for (let i = 0; i < 5; i++) {
        const r = ((t * 2 + i * 60) % 300);
        ctx.save();
        ctx.globalAlpha = (1 - r/300) * 0.3;
        ctx.strokeStyle = color; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.arc(W/2, H/2, r, 0, Math.PI*2); ctx.stroke();
        ctx.restore();
      }
      // Particles
      parts.forEach(p => {
        p.x += p.vx; p.y += p.vy; p.a -= 0.004;
        if (p.y < -10 || p.a <= 0) { p.y = H+10; p.x = Math.random()*W; p.a = 1; }
        ctx.save();
        ctx.globalAlpha = Math.max(0, p.a);
        ctx.fillStyle = color;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.sz, 0, Math.PI*2); ctx.fill();
        ctx.restore();
      });
      t++;
      if (document.getElementById('dimensionOverlay').style.display !== 'none') {
        animFrame = requestAnimationFrame(frame);
      }
    }
    frame();
  }

  return { enter, exit, _answerDim };
})();
