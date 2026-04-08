// ===== QUIZ.JS =====

const QuizSystem = (() => {
  const ALL_QUESTIONS = [
    {
      q: "Mengapa manusia Paleolitikum hidup berpindah-pindah (nomaden)?",
      opts: ["Suka berpetualang dan mencari pengalaman", "Mengikuti migrasi hewan buruan dan sumber air musiman", "Diperintah pemimpin suku", "Mencari tanah yang lebih subur untuk bercocok tanam"],
      ans: 1,
      fact: "Manusia nomaden mengikuti hewan buruan karena hewan juga berpindah mengikuti musim dan sumber air. Strategi ini sangat efektif selama jutaan tahun — mereka tidak punya alasan untuk menetap sebelum mengenal pertanian!"
    },
    {
      q: "Apa perubahan TERBESAR yang disebut 'Revolusi Neolitik'?",
      opts: ["Manusia mulai memakai pakaian dari kulit hewan", "Manusia beralih dari berburu-meramu ke bercocok tanam dan menetap", "Manusia pertama kali membuat alat dari batu", "Manusia mulai berlayar mengarungi lautan"],
      ans: 1,
      fact: "Revolusi Neolitik adalah perubahan terbesar dalam sejarah manusia! Dari food gathering ke food producing. Akibatnya: manusia menetap, desa terbentuk, pembagian kerja muncul, dan peradaban dimulai."
    },
    {
      q: "Kjokkenmodinger adalah peninggalan Mesolitikum berupa...",
      opts: ["Lukisan raksasa di dinding gua", "Tumpukan cangkang kerang sisa makanan setinggi 7 meter", "Batu-batu besar yang ditegakkan untuk ritual", "Peti mati dari batu karang"],
      ans: 1,
      fact: "Kjokkenmodinger dari bahasa Denmark: 'kjokken'=dapur, 'modding'=sampah. Tumpukan ini membuktikan manusia mulai kembali ke lokasi yang sama berulang — cikal bakal tempat tinggal tetap!"
    },
    {
      q: "Apa dampak langsung bercocok tanam terhadap kehidupan sosial manusia?",
      opts: ["Manusia jadi lebih individualis karena punya lahan sendiri", "Muncul desa, pembagian kerja, dan stratifikasi sosial", "Manusia berhenti berburu sepenuhnya", "Manusia jadi lebih agresif terhadap alam"],
      ans: 1,
      fact: "Surplus pangan dari pertanian memungkinkan sebagian orang tidak ikut mencari makan — mereka bisa jadi pengrajin, pemimpin, dukun. Inilah awal spesialisasi pekerjaan dan stratifikasi sosial!"
    },
    {
      q: "Alat batu Neolitikum berbeda dari Paleolitikum karena...",
      opts: ["Terbuat dari campuran batu dan logam", "Sudah diasah (diupam) hingga halus, licin, dan sangat tajam", "Berukuran jauh lebih besar", "Ditemukan hanya di Asia Tenggara"],
      ans: 1,
      fact: "Teknik pengupaman (mengasah dengan batu gosok dan air) menghasilkan alat yang luar biasa halus. Kapak lonjong dan kapak persegi Neolitikum bisa setajam pisau modern — tanda kecerdasan dan kesabaran tinggi!"
    },
    {
      q: "Nekara perunggu zaman Perundagian berfungsi untuk...",
      opts: ["Tempat menyimpan air minum suku", "Gendang besar dalam upacara memanggil hujan dan ritual adat", "Senjata lempar dalam peperangan antar suku", "Penanda batas wilayah di perbatasan suku"],
      ans: 1,
      fact: "'Moon of Pejeng' di Bali adalah nekara terbesar di Indonesia — tinggi 1,86 m, masih disimpan di Pura Penataran Sasih sebagai benda sakral. Warga percaya ia adalah bulan yang jatuh dari langit!"
    },
    {
      q: "Mengapa penemuan logam mengubah peradaban secara revolusioner?",
      opts: ["Logam lebih indah dan jadi simbol status semata", "Alat logam lebih kuat dan efisien → pertanian meningkat → populasi meledak → kerajaan terbentuk", "Logam mudah ditemukan di seluruh Indonesia", "Logam bisa menggantikan batu secara langsung tanpa perlu dilebur"],
      ans: 1,
      fact: "Rantai sebab-akibat logam: alat lebih tajam → lebih banyak lahan bisa diolah → panen meningkat → populasi bertambah → perdagangan berkembang → kekuasaan terpusat → kerajaan lahir!"
    },
    {
      q: "Punden berundak zaman Megalitikum adalah cikal bakal...",
      opts: ["Pasar tradisional dan pusat perdagangan", "Rumah adat yang bertingkat-tingkat", "Candi dan bangunan pemujaan bertingkat", "Benteng pertahanan dari serangan musuh"],
      ans: 2,
      fact: "Konsep bangunan bertingkat untuk ritual berkembang menjadi candi Hindu-Buddha! Borobudur dan Prambanan mewarisi tradisi arsitektur sakral yang dimulai dari punden berundak Megalitikum ribuan tahun sebelumnya."
    },
    {
      q: "Kepercayaan animisme pada manusia praaksara artinya...",
      opts: ["Percaya pada satu Tuhan yang Maha Esa", "Percaya bahwa semua benda alam memiliki roh yang hidup", "Tidak percaya pada hal-hal gaib", "Percaya ilmu pengetahuan sebagai pedoman hidup"],
      ans: 1,
      fact: "Animisme membuat manusia memperlakukan alam dengan sangat hormat. Pohon besar, batu aneh, sungai besar — semuanya dianggap punya roh. Ini mendorong konservasi alam secara tidak langsung!"
    },
    {
      q: "Lukisan di dinding gua zaman Paleolitikum berfungsi untuk...",
      opts: ["Dekorasi gua agar lebih nyaman ditempati", "Komunikasi, ritual perburuan, dan merekam kejadian penting", "Latihan seni untuk anak-anak suku", "Menakut-nakuti hewan predator agar tidak masuk gua"],
      ans: 1,
      fact: "Lukisan gua di Maros, Sulawesi Selatan berumur 45.000 tahun — lebih tua dari lukisan gua Altamira (Spanyol) yang selama ini dianggap tertua! Ini menunjukkan seni manusia berkembang di Asia, bukan hanya Eropa."
    },
  ];

  function trigger() {
    if (GS.quizAnswered >= 10) return;
    if (document.getElementById('quizPanel').style.display === 'block') return;
    const remaining = ALL_QUESTIONS.filter((_, i) => !GS.quizAsked.includes(i));
    if (!remaining.length) return;
    const qi = ALL_QUESTIONS.indexOf(remaining[Utils.randInt(0, remaining.length)]);
    GS.quizAsked.push(qi);
    _show(ALL_QUESTIONS[qi]);
  }

  function _show(q) {
    const panel = document.getElementById('quizPanel');
    panel.style.display = 'block';
    document.getElementById('qProg').textContent = `Soal ${GS.quizAnswered + 1} dari 10`;
    document.getElementById('qQ').textContent    = q.q;
    document.getElementById('factBox').style.display = 'none';
    const grid = document.getElementById('qGrid');
    grid.innerHTML = '';
    const shuffled = Utils.shuffle(q.opts.map((o, i) => ({ t: o, oi: i })));
    shuffled.forEach(o => {
      const btn = document.createElement('div');
      btn.className = 'qBtn';
      btn.textContent = o.t;
      btn.onclick = () => _answer(o.oi === q.ans, btn, shuffled, q);
      grid.appendChild(btn);
    });
  }

  function _answer(correct, btn, shuffled, q) {
    const btns = document.getElementById('qGrid').querySelectorAll('.qBtn');
    btns.forEach((b, i) => {
      b.onclick = null;
      if (shuffled[i].oi === q.ans) b.classList.add('ok');
    });
    if (!correct) btn.classList.add('bad');

    if (correct) {
      GS.quizCorrect++;
      GS.score += 100;
      Utils.notify('✅ Benar! +100 Poin', '#00ffcc');
    } else {
      Utils.notify('❌ Salah! Baca fakta berikut...', '#ff5555');
    }
    GS.quizAnswered++;

    setTimeout(() => {
      const factEl = document.getElementById('factTxt');
      document.getElementById('factBox').style.display = 'block';
      const factStr = 'Fakta: ' + q.fact;
      Typewriter.write(factEl, factStr, {
        speed: 14,
        cursor: true,
        onDone: () => {
          // Tahan baca ±3–5 detik setelah teks selesai
          setTimeout(() => {
            document.getElementById('quizPanel').style.display = 'none';
            factEl.textContent = '';
            MissionSystem.check();
            document.getElementById('hQuiz').textContent  = `❓ ${GS.quizAnswered}/10`;
            document.getElementById('hScore').textContent = `🏆 ${Utils.fmt(GS.score)}`;
            if (GS.quizAnswered >= 10) {
              setTimeout(() => EndingSystem.show(), 1500);
            }
          }, 3800);
        },
      });
    }, 700);
  }

  return { trigger };
})();
