// ===== DIMENSION.JS =====

const Dimension = (() => {
  let animFrame = null;
  let currentDim = 0;
  let canExit = false;
  let _currentData = null;
  let _introSkipped = false;

  const DIM_DATA = {
    1: {
      name: 'Dimensi Arkeozoikum',
      color: '#ff6644',
      bg1: '#1a0800', bg2: '#2a0a00',
      intro: [
        "Kau terjatuh ke era 4 miliar tahun yang lalu...",
        "Tidak ada kehidupan. Hanya batuan panas dan lautan asam.",
        "Tanda-tanda pertama kehidupan: bakteri primitif di laut dalam.",
        "Jawab pertanyaan untuk mendapatkan pengetahuan era ini!",
      ],
      quizQ: "Apa bentuk kehidupan pertama yang muncul di Zaman Arkeozoikum?",
      quizOpts: ["Dinosaurus besar", "Organisme bersel tunggal seperti bakteri", "Manusia purba", "Ikan dan amfibi"],
      quizAns: 1,
      quizFact: "Arkeozoikum (4–2,5 miliar tahun lalu) adalah era munculnya kehidupan paling awal — organisme bersel satu (prokariota) di lautan purba yang kaya mineral.",
      reward: { e: '🧫', n: 'Fosil Bakteri', c: 3 },
    },
    2: {
      name: 'Dimensi Paleozoikum',
      color: '#4488ff',
      bg1: '#000a1a', bg2: '#001428',
      intro: [
        "Kau memasuki era 540–250 juta tahun yang lalu...",
        "Lautan penuh dengan makhluk aneh: trilobit, ubur-ubur raksasa, hiu purba.",
        "Daratan mulai ditumbuhi tumbuhan paku dan amfibi merangkak keluar dari air.",
        "Jawab pertanyaan untuk mendapatkan pengetahuan era ini!",
      ],
      quizQ: "Apa peristiwa penting yang menandai awal Zaman Paleozoikum?",
      quizOpts: ["Kepunahan dinosaurus", "Ledakan Kambrium — kemunculan besar-besaran kehidupan multiseluler", "Manusia mulai berjalan tegak", "Terbentuknya benua Afrika"],
      quizAns: 1,
      quizFact: "Ledakan Kambrium (~540 juta tahun lalu) adalah saat hampir semua filum hewan modern muncul dalam waktu relatif singkat secara geologis — keajaiban evolusi terbesar!",
      reward: { e: '🦐', n: 'Fosil Trilobit', c: 3 },
    },
    3: {
      name: 'Dimensi Mesozoikum',
      color: '#ff4466',
      bg1: '#2a0a10', bg2: '#3b121d',
      intro: [
        "Kau melangkah ke era ketika dinosaurus menguasai bumi...",
        "Langit berawan, vegetasi rimbun, dan suara gemuruh hewan raksasa.",
        "Di sini predator dan mangsa hidup berdampingan dalam keseimbangan yang keras.",
        "Jawab pertanyaan untuk mendapatkan pengetahuan era ini!",
      ],
      quizQ: "Apa ciri utama ekosistem Mesozoikum?",
      quizOpts: ["Kehidupan di laut saja", "Dominasi dinosaurus dan reptil besar", "Manusia sudah bertani", "Bebatuan es menutupi daratan"],
      quizAns: 1,
      quizFact: "Mesozoikum dikenal sebagai era dinosaurus (252–66 juta tahun lalu). Berakhir dengan kepunahan massal akibat asteroid yang menghantam Bumi.",
      reward: { e: '🦴', n: 'Tulang Fosil', c: 2 },
    },
    4: {
      name: 'Dimensi Neozoikum',
      color: '#44dd88',
      bg1: '#001a08', bg2: '#002010',
      intro: [
        "Kau memasuki era 66 juta tahun lalu hingga kini...",
        "Dinosaurus punah. Mamalia mengambil alih daratan.",
        "Kera besar mulai berevolusi, dan akhirnya manusia pertama muncul di Afrika.",
        "Jawab pertanyaan untuk mendapatkan pengetahuan era ini!",
      ],
      quizQ: "Apa yang terjadi setelah kepunahan dinosaurus di Zaman Neozoikum?",
      quizOpts: ["Bumi menjadi kosong tanpa kehidupan", "Mamalia berkembang pesat mengisi relung ekologi yang kosong", "Reptil semakin besar", "Lautan mengering"],
      quizAns: 1,
      quizFact: "Neozoikum adalah era kebangkitan mamalia! Tanpa tekanan predator dinosaurus, mamalia berevolusi menjadi ratusan spesies — termasuk garis evolusi yang melahirkan manusia.",
      reward: { e: '🦣', n: 'Gigi Mammoth', c: 2 },
    },
    5: {
      name: 'Dimensi Paleolitikum',
      color: '#cc8844',
      bg1: '#1a0800', bg2: '#2a1400',
      intro: [
        "Kau memasuki celah dimensi ke masa 500.000 tahun yang lalu...",
        "Udara berbeda. Lebih dingin. Tidak ada suara kota sama sekali.",
        "Di sini manusia baru saja mulai membuat alat batu pertama mereka.",
        "Jawab pertanyaan untuk mendapatkan pengetahuan Paleolitikum!",
      ],
      quizQ: "Di zaman Paleolitikum, sumber makanan utama manusia adalah...",
      quizOpts: ["Bertani padi dan jagung", "Berburu hewan liar dan meramu tumbuhan", "Beternak domba dan sapi", "Membeli dari pasar desa"],
      quizAns: 1,
      quizFact: "Manusia Paleolitikum 100% bergantung pada alam: berburu hewan dan meramu buah/umbi. Tidak ada pertanian — konsep itu belum ada!",
      reward: { e: '🪨', n: 'Batu Purba', c: 5 },
    },
    6: {
      name: 'Dimensi Mesolitikum',
      color: '#44ccaa',
      bg1: '#001a14', bg2: '#002a1e',
      intro: [
        "Kau memasuki masa transisi 10.000 tahun yang lalu...",
        "Es mencair, iklim memanas. Hewan besar mulai punah.",
        "Manusia mulai tinggal di ceruk batu dan tepi sungai secara semi-menetap.",
        "Jawab pertanyaan untuk mendapatkan pengetahuan Mesolitikum!",
      ],
      quizQ: "Apa yang dimaksud dengan Kjokkenmodinger di zaman Mesolitikum?",
      quizOpts: ["Lukisan di dinding gua", "Tumpukan sampah dapur berupa cangkang kerang", "Batu-batu besar ritual", "Peti mati batu"],
      quizAns: 1,
      quizFact: "Kjokkenmodinger adalah tumpukan cangkang kerang sisa makanan setinggi 7 meter — bukti manusia mulai kembali ke lokasi yang sama berulang kali!",
      reward: { e: '🐚', n: 'Cangkang Purba', c: 4 },
    },
    7: {
      name: 'Dimensi Neolitikum',
      color: '#88cc44',
      bg1: '#001a08', bg2: '#001408',
      intro: [
        "Kau masuk ke dimensi 7.000 tahun yang lalu...",
        "Aroma tanah basah dan api unggun. Samar-samar terdengar suara cangkul.",
        "Di sini manusia baru saja menemukan cara bercocok tanam!",
        "Jawab pertanyaan untuk mendapatkan pengetahuan Neolitikum!",
      ],
      quizQ: "Apa alasan utama manusia Neolitikum mulai menetap di satu tempat?",
      quizOpts: ["Terlalu lelah untuk berpindah", "Harus merawat tanaman pertanian yang ditanam", "Diperintah raja untuk diam", "Takut hewan buas di hutan"],
      quizAns: 1,
      quizFact: "Tanaman butuh perawatan rutin — disiram, dijaga dari hama, dipanen. Tidak bisa ditinggal pergi begitu saja. Inilah yang memaksa manusia menetap!",
      reward: { e: '🌾', n: 'Benih Purba', c: 3 },
    },
    8: {
      name: 'Dimensi Megalitikum',
      color: '#8844cc',
      bg1: '#0a0014', bg2: '#140028',
      intro: [
        "Kau memasuki zaman batu besar 3.000 tahun yang lalu...",
        "Batu-batu raksasa berdiri tegak di tengah padang. Menhir. Dolmen. Sarkofagus.",
        "Manusia memuja roh leluhur dan membangun monumen permanen.",
        "Jawab pertanyaan untuk mendapatkan pengetahuan Megalitikum!",
      ],
      quizQ: "Apa fungsi utama menhir pada zaman Megalitikum?",
      quizOpts: ["Tempat menyimpan hasil panen", "Tugu peringatan atau tempat pemujaan arwah leluhur", "Fondasi bangunan rumah", "Penanda batas wilayah perang"],
      quizAns: 1,
      quizFact: "Menhir berasal dari bahasa Celtic: 'men'=batu, 'hir'=panjang. Di Indonesia, menhir masih ditemukan di Sumatra Barat dan Sulawesi Tengah — bahkan beberapa masih digunakan dalam ritual adat!",
      reward: { e: '🗿', n: 'Batu Menhir', c: 2 },
    },
    9: {
      name: 'Dimensi Perundagian',
      color: '#cc4488',
      bg1: '#2d2206', bg2: '#1a1200',
      intro: [
        "Kau memasuki zaman ketika manusia mulai mengolah logam...",
        "Suara palu dan percikan api dari tungku terdengar di seluruh lembah.",
        "Perunggu dan besi membawa perubahan besar pada senjata dan alat.",
        "Jawab pertanyaan untuk mendapatkan pengetahuan Perundagian!",
      ],
      quizQ: "Apa bahan utama yang mulai digunakan manusia pada Zaman Perundagian?",
      quizOpts: ["Kayu keras", "Batu obsidian", "Logam seperti besi dan perunggu", "Tulang hewan besar"],
      quizAns: 2,
      quizFact: "Zaman Perundagian menandai penggunaan logam: pembuatan senjata, alat tani, dan perhiasan mulai berkembang pesat. Nekara perunggu adalah salah satu peninggalan paling ikonik!",
      reward: { e: '🛠', n: 'Alat Perundagian', c: 1 },
    },
  };

  function enter(dimId) {
    if (GS.inDimension) return;

    const dimPortal = World.objects.find(o => o.type === 'dimension' && o.dimId === dimId);
    if (dimPortal && dimPortal.visited) {
      Utils.notify('❌ Kamu sudah memasuki dimensi ini. Portal tertutup selamanya.', '#ff3333');
      return;
    }

    GS.inDimension = true;
    GS.dimLevel    = dimId;
    currentDim     = dimId;
    canExit        = false;
    _introSkipped  = false;

    const data = DIM_DATA[dimId];
    if (!data) { _exit(); return; }
    _currentData = data;

    document.getElementById('dimExit').style.display = 'none';

    const overlay = document.getElementById('dimensionOverlay');
    const dimCvs  = document.getElementById('dimCvs');
    dimCvs.width  = window.innerWidth;
    dimCvs.height = window.innerHeight;

    overlay.style.display = 'flex';
    document.getElementById('hDim').style.display = 'block';

    _animateDim(dimCvs, data.color, data.bg1, data.bg2);

    // Inject skip button
    _injectSkipBtn(data, dimId);
    _showIntroLines(data, dimId);
  }

  function _injectSkipBtn(data, dimId) {
    // Remove existing skip btn if any
    const existing = document.getElementById('dimSkipBtn');
    if (existing) existing.remove();

    const btn = document.createElement('button');
    btn.id = 'dimSkipBtn';
    btn.textContent = '⏩ Skip Dialog';
    btn.style.cssText = `
      position:absolute; top:16px; right:16px;
      background:rgba(0,0,0,0.6); color:#ffcc00;
      border:1px solid #ffcc0066; border-radius:8px;
      padding:8px 14px; font-size:12px; cursor:pointer; z-index:99;
    `;
    btn.onclick = () => {
      if (_introSkipped) return;
      _introSkipped = true;
      btn.remove();
      // Stop typewriter if running
      if (Typewriter && Typewriter.stop) Typewriter.stop();
      document.getElementById('dimText').textContent = '';
      _showDimQuiz(data, dimId);
    };
    document.getElementById('dimContent').appendChild(btn);
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
      if (_introSkipped) return;
      if (idx < data.intro.length) {
        const text = data.intro[idx];
        idx++;
        dimText.style.borderColor = data.color + '44';
        Typewriter.write(dimText, text, {
          speed: 30,
          cursor: true,
          onDone: () => { if (!_introSkipped) setTimeout(showLine, 1400); },
        });
      } else {
        // Remove skip btn when intro naturally ends
        const skipBtn = document.getElementById('dimSkipBtn');
        if (skipBtn) skipBtn.remove();
        _showDimQuiz(data, dimId);
      }
    }
    showLine();
  }

  function _showDimQuiz(data, dimId) {
    const dimQuiz  = document.getElementById('dimQuiz');
    const dimText  = document.getElementById('dimText');
    const dimTitle = document.getElementById('dimTitle');

    // Ensure title still correct after skip
    dimTitle.textContent = '🌀 ' + data.name;
    dimTitle.style.color = data.color;
    dimQuiz.innerHTML    = '';

    Typewriter.write(dimText, data.quizQ, {
      speed: 28,
      cursor: true,
      onDone: () => {
        const shuffled = Utils.shuffle(data.quizOpts.map((o, i) => ({ t: o, oi: i })));
        let html = `<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:12px;">`;
        shuffled.forEach((o, i) => {
          html += `<div class="qBtn" id="dimOpt${i}" onclick="Dimension._answerDim(${o.oi},${data.quizAns},${i},${shuffled.length},${dimId})">${o.t}</div>`;
        });
        html += '</div>';
        dimQuiz.innerHTML = html;
      },
    });
  }

  function _answerDim(chosen, correct, btnIdx, total, dimId) {
    const data = DIM_DATA[dimId];
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
    document.getElementById('hQuiz').textContent  = `❓ ${GS.quizAnswered}/15`;
    document.getElementById('hScore').textContent = `🏆 ${Utils.fmt(GS.score)}`;
  }

  function _showExitPrompt(data) {
    Typewriter.write(
      document.getElementById('dimText'),
      `Dimensi ${data.name} telah memberikan pengetahuannya. Kau bisa keluar sekarang.`,
      { speed: 28, cursor: false },
    );
    document.getElementById('dimExit').style.display = 'block';
    canExit = true;
  }

  function exit() {
    if (!canExit) {
      Utils.notify('Selesaikan soal dimensi dulu untuk keluar!', '#ffcc00');
      return;
    }

    const dimPortal = World.objects.find(o => o.type === 'dimension' && o.dimId === currentDim);
    if (dimPortal) dimPortal.visited = true;

    GS.inDimension = false;
    GS.returnAnim  = true;
    Player.y = -100;
    document.getElementById('dimensionOverlay').style.display = 'none';
    document.getElementById('hDim').style.display = 'none';
    document.getElementById('dimExit').style.display = 'none';

    // Remove skip btn if still there
    const skipBtn = document.getElementById('dimSkipBtn');
    if (skipBtn) skipBtn.remove();

    if (animFrame) { cancelAnimationFrame(animFrame); animFrame = null; }

    const exitLines = StoryDialogs.dimensionExit;
    let idx = 0;
    function showExit() {
      if (idx < exitLines.length) {
        Dialog.show(exitLines[idx].speaker, exitLines[idx].portrait, [exitLines[idx].text], null);
        document.getElementById('dialogNext').onclick = () => { idx++; showExit(); };
        idx++;
      } else {
        Dialog.close();
        if (GS.quizAnswered >= 15) setTimeout(() => EndingSystem.show(), 1200);
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
      const gr = ctx.createRadialGradient(W/2, H/2, 0, W/2, H/2, Math.max(W,H)*.8);
      gr.addColorStop(0, bg2);
      gr.addColorStop(1, bg1);
      ctx.fillStyle = gr; ctx.fillRect(0, 0, W, H);
      for (let i = 0; i < 5; i++) {
        const r = ((t * 2 + i * 60) % 300);
        ctx.save();
        ctx.globalAlpha = (1 - r/300) * 0.3;
        ctx.strokeStyle = color; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.arc(W/2, H/2, r, 0, Math.PI*2); ctx.stroke();
        ctx.restore();
      }
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

// ===== SECRET EVENT =====
const SecretEvent = (() => {
  let anim = null;
  let t = 0;
  let returnPos = { x: 200, y: 200 };

  const LINES = [
    { speaker: 'Suara Dimensi', portrait: '🌀', text: 'Kau melangkah melewati batas rahasia... waktu mulai runtuh.' },
    { speaker: 'Kamu', portrait: '😨', text: 'Udara panas... langitnya merah. Ini... bukan praaksara biasa.' },
    { speaker: 'Narrator', portrait: '🦖', text: '65 juta tahun lalu. Detik-detik sebelum kepunahan dinosaurus.' },
    { speaker: 'Dinosaurus', portrait: '🦖', text: 'RAHHHHHHHH!!!' },
    { speaker: 'Kamu', portrait: '😱', text: 'METEOR?! Kalau kena... aku harus keluar SEKARANG!' },
    { speaker: 'Suara Dimensi', portrait: '🌀', text: 'Kau belum boleh mati di sini. Aku tarik kau kembali.' },
  ];

  function enter() {
    if (GS.inDimension) return;
    returnPos = { x: Player.x, y: Player.y };
    GS.secretFound = true;
    GS.secretEventDone = true;
    GS.inDimension = true;
    GS.dimLevel = 99;
    Utils.notify('🌀 Kamu memasuki Area Rahasia...', '#cc88ff');
    Utils.showLearningTip('dimension');

    const overlay = document.getElementById('dimensionOverlay');
    const dimCvs  = document.getElementById('dimCvs');
    dimCvs.width  = window.innerWidth;
    dimCvs.height = window.innerHeight;
    overlay.style.display = 'flex';
    document.getElementById('hDim').style.display = 'none';
    document.getElementById('dimExit').style.display = 'none';
    document.getElementById('dimTitle').textContent = '🌀 AREA RAHASIA — ZAMAN DINOSAURUS';
    document.getElementById('dimTitle').style.color = '#ff7755';
    document.getElementById('dimQuiz').innerHTML = '';

    t = 0;
    _animateMeteor(dimCvs);
    _runDialog(() => {
      setTimeout(() => {
        _flashExplosion();
        setTimeout(() => exit(true), 520);
      }, 900);
    });
  }

  function exit(withAfterDialog = false) {
    GS.inDimension = false;
    GS.dimLevel = 0;
    document.getElementById('dimensionOverlay').style.display = 'none';
    document.getElementById('dimExit').style.display = 'none';
    if (anim) { cancelAnimationFrame(anim); anim = null; }
    Player.x = returnPos.x;
    Player.y = returnPos.y;

    if (withAfterDialog) {
      const after = [
        { speaker: 'Kamu', portrait: '😵', text: 'Apa yang baru saja terjadi...?!' },
        { speaker: 'Suara Dimensi', portrait: '🌀', text: 'Kau terseret ke masa 65 juta tahun lalu — saat meteor memicu kepunahan dinosaurus.' },
        { speaker: 'Suara Dimensi', portrait: '🌀', text: 'Aku mengembalikanmu sebelum gelombang ledakan mengenainya. Itu peringatan: waktu bisa membunuh.' },
      ];
      let i = 0;
      const next = () => {
        if (i >= after.length) { Dialog.close(); return; }
        const l = after[i++];
        Dialog.show(l.speaker, l.portrait, [l.text], null);
        document.getElementById('dialogNext').onclick = () => next();
      };
      next();
    }
  }

  function _flashExplosion() {
    const cvs = document.getElementById('dimCvs');
    const ctx = cvs.getContext('2d');
    const W = cvs.width, H = cvs.height;
    ctx.save();
    ctx.globalAlpha = 0.65;
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, W, H);
    ctx.restore();
    Utils.vibrate([30, 40, 30]);
  }

  function _runDialog(onDone) {
    let i = 0;
    const next = () => {
      if (i >= LINES.length) { Dialog.close(); onDone && onDone(); return; }
      const l = LINES[i++];
      Dialog.show(l.speaker, l.portrait, [l.text], null);
      document.getElementById('dialogNext').onclick = () => next();
    };
    next();
  }

  function _animateMeteor(cvs) {
    const ctx = cvs.getContext('2d');
    const W = cvs.width, H = cvs.height;
    const meteor = { x: W * 0.52, y: -90, vx: 0, vy: H * 0.016 };
    const trail = [];

    function frame() {
      ctx.clearRect(0, 0, W, H);
      const gr = ctx.createLinearGradient(0, 0, 0, H);
      gr.addColorStop(0, '#2b0000');
      gr.addColorStop(0.55, '#140008');
      gr.addColorStop(1, '#000');
      ctx.fillStyle = gr; ctx.fillRect(0, 0, W, H);

      ctx.save(); ctx.globalAlpha = 0.12;
      for (let i = 0; i < 60; i++) {
        const ax = (Math.sin((t + i) * 0.07) * 0.5 + 0.5) * W;
        const ay = (Math.cos((t + i) * 0.09) * 0.5 + 0.5) * H;
        ctx.fillStyle = i % 2 ? '#ff6600' : '#ffcc55';
        ctx.beginPath(); ctx.arc(ax, ay, 1.2 + (i % 3), 0, Math.PI * 2); ctx.fill();
      }
      ctx.restore();

      meteor.x += meteor.vx;
      meteor.y += meteor.vy;
      trail.push({ x: meteor.x, y: meteor.y });
      if (trail.length > 28) trail.shift();

      ctx.save();
      for (let i = 0; i < trail.length; i++) {
        const p = trail[i];
        const a = i / trail.length;
        ctx.globalAlpha = 0.05 + a * 0.4;
        ctx.strokeStyle = 'rgba(255,160,60,1)';
        ctx.lineWidth = 2 + a * 6;
        if (i > 0) {
          ctx.beginPath();
          ctx.moveTo(trail[i-1].x, trail[i-1].y);
          ctx.lineTo(p.x, p.y);
          ctx.stroke();
        }
      }
      ctx.restore();

      const rg = ctx.createRadialGradient(meteor.x, meteor.y, 0, meteor.x, meteor.y, 55);
      rg.addColorStop(0, 'rgba(255,255,255,.9)');
      rg.addColorStop(0.25, 'rgba(255,210,80,.8)');
      rg.addColorStop(1, 'rgba(255,90,0,0)');
      ctx.fillStyle = rg;
      ctx.beginPath(); ctx.arc(meteor.x, meteor.y, 55, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#fff';
      ctx.beginPath(); ctx.arc(meteor.x, meteor.y, 6, 0, Math.PI * 2); ctx.fill();

      if (meteor.y > H * 0.72) {
        meteor.y = H * 0.72;
        meteor.vx = 0; meteor.vy = 0;
        ctx.save();
        ctx.globalAlpha = 0.08 + Math.sin(t * 0.3) * 0.05;
        ctx.fillStyle = '#ff2200';
        ctx.fillRect(0, 0, W, H);
        ctx.restore();
      }

      t++;
      if (document.getElementById('dimensionOverlay').style.display !== 'none' && GS.inDimension && GS.dimLevel === 99) {
        anim = requestAnimationFrame(frame);
      }
    }
    frame();
  }

  return { enter, exit };
})();