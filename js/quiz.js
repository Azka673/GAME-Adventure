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
    {
      q: "Mengapa transisi dari Mesolitikum ke Neolitikum dianggap GRADUAL, bukan tiba-tiba?",
      opts: ["Karena manusia Mesolitik menolak pertanian dari awal", "Kedua sistem bertahan beriringan — ada desa pertanian sambil berburu-meramu masih berlangsung", "Karena hanya terjadi di daerah tertentu saja", "Perubahan ini soal kebudayaan, bukan cara hidup"],
      ans: 1,
      fact: "Arkeolog menemukan situs dengan bukti 'orang transisi' — punya keduanya! Misalnya di Levant, manusia punya kebun sayur SAMBIL masih memburu. Pertanian bukan revolusi 1 hari, tapi proses ratusan tahun!"
    },
    {
      q: "Jika manusia Neolitikum menetap dan bercocok tanam, bagian masyarakat manakah yang PALING DIUNTUNGKAN secara sosial?",
      opts: ["Petani, karena punya hasil panen terbanyak", "Prajurit, karena bisa mengambil alih desa lain", "Pemimpin dan pendeta, karena mengontrol surplus pangan dan membuat aturan", "Pengrajin, karena bisa menjual barang dengan harga tinggi"],
      ans: 2,
      fact: "Surplus pangan memungkinkan elit terbentuk! Mereka yang MENGONTROL distribusi pangan jadi kaya dan berkuasa. Inilah awal hierarki sosial — pemimpin/pendeta di puncak, petani biasa di bawah. Sistem ini berlanjut ribuan tahun!"
    },
    {
      q: "Mengapa Paleolitikum dan Mesolitikum tidaklah 'zaman gelap' seperti anggapan lama?",
      opts: ["Karena ada bukti tulisan dari zaman itu", "Karena mereka sudah punya seni, bahasa kompleks, ritual spiritual, dan adaptasi kreatif terhadap lingkungan", "Karena peradaban sudah ada sejak awal", "Karena teknologi mereka sama dengan Neolitikum"],
      ans: 1,
      fact: "Para arkeolog modern menyadari manusia praaksara sangat CERDAS! Mereka punya seni (45.000 tahun), musik (flute dari tulang gajah tertua ~40.000 tahun), berburu dengan strategi, ritual, dan budaya. Tidak ada 'yang gelap' — mereka hidup penuh makna!"
    },
    {
      q: "Jika Mesolitikum adalah 'era transisi', bukti apa yang menunjukkan manusia perlahan MENERIMA pertanian meskipun tidak wajib?",
      opts: ["Pertambahan jumlah situs dengan tanda-tanda pertanian sambil alat berburu masih dominan", "Semua orang tiba-tiba berhenti berburu", "Adanya catatan tertulis dari manusia Mesolitik", "Semua desa menjadi besar sekaligus"],
      ans: 0,
      fact: "Arkeolog menemukan LEBIH BANYAK situs Mesolitik akhir dengan benih tanaman half-burned di dalam rumah, plus tanda-tanda ladang kecil. Pertanian bukan KEHARUSAN, tapi jadi PILIHAN LOGIS karena bisa menunjang berburu! Gradual adoption!"
    },
    {
      q: "Jika kita menggabungkan ALL sistem zaman pra-aksara (Paleolitikum berburu → Mesolitikum transisi → Neolitikum bertani), apa pola perkembangan manusia yang paling jelas?",
      opts: ["Manusia selalu memilih hidup yang lebih mudah", "Adaptasi kreatif terhadap lingkungan → Inovasi teknologi → Perubahan sosial → Peradaban terstruktur", "Manusia tidak pernah berkembang sampai ada logam", "Setiap zaman adalah pilihan random tanpa sebab"],
      ans: 1,
      fact: "Ini adalah POLA UNIVERSAL sejarah! Manusia bertemu tantangan lingkungan → ciptakan alat/cara baru → teknologi baru dorong inovasi sosial → terbentuklah hierarki baru. Logam, bukti tulisan, negara — semuanya hasil dari 'respons terhadap kebutuhan'. Smart species indeed!"
    },
    {
      q: "Apa fungsi utama menhir pada zaman Megalitikum?",
      opts: ["Penanda batas wilayah antar suku", "Tugu peringatan atau tempat pemujaan arwah leluhur", "Tempat menyimpan hasil panen", "Fondasi bangunan rumah panggung"],
      ans: 1,
      fact: "Menhir berasal dari bahasa Celtic: 'men'=batu, 'hir'=panjang. Di Indonesia, menhir masih ditemukan di Sumatra Barat dan Sulawesi Tengah — bahkan beberapa masih digunakan dalam ritual adat hingga hari ini!"
    },
    {
      q: "Mengapa zaman perunggu dianggap lebih maju dari zaman batu meski batu lebih mudah ditemukan?",
      opts: ["Perunggu lebih murah dan mudah dibentuk", "Perunggu hasil paduan tembaga dan timah — lebih keras, tahan lama, dan bisa dicetak ulang jika rusak", "Perunggu ditemukan lebih dulu dari batu", "Batu tidak bisa dipakai sebagai senjata"],
      ans: 1,
      fact: "Keunggulan perunggu: bisa dilebur dan dicetak ulang! Batu yang patah = dibuang, perunggu yang patah = dilebur lagi → dibentuk baru. Efisiensi material ini merevolusi cara manusia mengelola sumber daya!"
    },
    {
      q: "Abris sous roche adalah peninggalan Mesolitikum berupa...",
      opts: ["Rakit bambu untuk menyeberangi sungai", "Gua ceruk di kaki tebing batu yang dipakai sebagai tempat tinggal", "Perangkap hewan dari batu yang disusun melingkar", "Kubur batu yang dipahat di dinding tebing"],
      ans: 1,
      fact: "Abris sous roche (bahasa Prancis: 'penampungan di bawah batu') ditemukan di Besuki dan Bojonegoro. Di dalamnya ditemukan alat batu, tulang hewan, dan abu sisa api — bukti manusia mulai punya 'alamat tetap' meski belum mendirikan rumah!"
    },
    {
      q: "Apa yang dimaksud dengan sistem food producing pada zaman Neolitikum?",
      opts: ["Manusia memproduksi makanan dari bahan kimia", "Manusia aktif menghasilkan makanan sendiri melalui bercocok tanam dan beternak", "Manusia membeli makanan dari suku lain", "Manusia mengumpulkan makanan yang sudah jadi di alam"],
      ans: 1,
      fact: "Food producing adalah lompatan kognitif luar biasa! Manusia tidak lagi bergantung pada alam yang 'kebetulan menyediakan' — mereka MENCIPTAKAN lingkungan pangan sendiri. Ini dasar dari semua sistem ekonomi modern!"
    },
    {
      q: "Sarkofagus pada zaman Megalitikum digunakan untuk...",
      opts: ["Tempat menyimpan air bersih untuk upacara adat", "Wadah kubur dari batu berbentuk seperti palung dengan tutup", "Meja persembahan sesaji kepada roh leluhur", "Pondasi tiang rumah adat bertingkat"],
      ans: 1,
      fact: "Sarkofagus banyak ditemukan di Bali — bentuknya seperti perahu atau binatang, karena orang Megalitikum percaya roh perlu 'kendaraan' menuju alam baka. Di dalamnya sering ditemukan bekal kubur seperti perhiasan dan alat sehari-hari!"
    },
  ];

  function trigger() {
    if (GS.quizAnswered >= 15) return;
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
    document.getElementById('qProg').textContent = `Soal ${GS.quizAnswered + 1} dari 15`;
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
          setTimeout(() => {
            document.getElementById('quizPanel').style.display = 'none';
            factEl.textContent = '';
            MissionSystem.check();
            document.getElementById('hQuiz').textContent  = `❓ ${GS.quizAnswered}/15`;
            document.getElementById('hScore').textContent = `🏆 ${Utils.fmt(GS.score)}`;
            if (GS.quizAnswered >= 15) {
              setTimeout(() => EndingSystem.show(), 1500);
            }
          }, 3800);
        },
      });
    }, 700);
  }

  return { trigger };
})();