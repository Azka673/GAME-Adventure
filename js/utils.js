// ===== UTILS.JS =====
// Shared utility functions used across all modules

const Utils = {
  // Euclidean distance
  dist(x1, y1, x2, y2) {
    return Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
  },

  // Shuffle array (Fisher-Yates)
  shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  },

  // Clamp number
  clamp(val, min, max) {
    return Math.max(min, Math.min(max, val));
  },

  // Linear interpolation
  lerp(a, b, t) {
    return a + (b - a) * t;
  },

  // Show notification
  _notifTimer: null,
  notify(msg, color = '#00ffcc') {
    const el = document.getElementById('notif');
    el.textContent = msg;
    el.style.borderColor = color;
    el.style.color = color;
    el.style.display = 'block';
    el.style.animation = 'none';
    setTimeout(() => { el.style.animation = 'notifIn .2s ease-out'; }, 10);
    if (this._notifTimer) clearTimeout(this._notifTimer);
    this._notifTimer = setTimeout(() => { el.style.display = 'none'; }, 2800);
  },

  showLearningTip(topic = 'general') {
    Learning.showRandom(topic);
  },

  // Eat animation
  showEatAnim(emoji, txt) {
    const el  = document.getElementById('eatAnim');
    const ee  = document.getElementById('eatEmoji');
    const et  = document.getElementById('eatTxt');
    ee.textContent = emoji;
    et.textContent = txt;
    el.style.display = 'block';
    ee.style.animation = 'none';
    setTimeout(() => { ee.style.animation = 'eatPop .6s ease-out forwards'; }, 10);
    setTimeout(() => { el.style.display = 'none'; }, 2100);
  },

  // Haptic feedback (mobile)
  vibrate(pattern = 30) {
    if (navigator.vibrate && document.getElementById('togVib')?.classList.contains('on')) {
      navigator.vibrate(pattern);
    }
  },

  // Random int in range [min, max)
  randInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  },

  // Random float in range
  randFloat(min, max) {
    return Math.random() * (max - min) + min;
  },

  // Angle from point a to point b
  angleTo(ax, ay, bx, by) {
    return Math.atan2(by - ay, bx - ax);
  },

  // Format big number
  fmt(n) {
    return n.toLocaleString('id-ID');
  },
};

const Learning = (() => {
  const FACTS = {
    general: [
      {
        title: 'Zaman Praaksara',
        text: 'Zaman Praaksara adalah era ketika manusia pertama bergantung pada berburu dan meramu. Mereka hidup bergerak mengikuti sumber makanan, dan kemampuan membuat alat batu sangat krusial untuk bertahan hidup.'
      },
      {
        title: 'Manusia Nomaden',
        text: 'Sebelum pertanian, manusia hidup nomaden. Mereka pindah dari satu tempat ke tempat lain untuk mencari hewan buruan, buah, dan air. Mobilitas ini adalah strategi bertahan hidup penting.'
      },
      {
        title: 'Alat Batu',
        text: 'Alat batu memungkinkan manusia memotong, memecah, dan mengolah makanan. Inovasi seperti kapak genggam dan pisau serpih menjadi kunci kemajuan teknologi awal.'
      }
    ],
    combat: [
      {
        title: 'Predator Praaksara',
        text: 'Hewan karnivora dan omnivora seperti babi hutan, ular, dan rubah mampu menyerang balik ketika merasa terancam. Mereka berperan sebagai bagian penting dari ekosistem predator-mangsa.'
      },
      {
        title: 'Strategi Pertahanan',
        text: 'Banyak hewan yang tidak agresif justru melarikan diri saat didekati. Ini membantu mereka bertahan hidup dan menunjukkan bagaimana ekosistem alam bekerja secara alami.'
      }
    ],
    crafting: [
      {
        title: 'Krafting & Teknologi',
        text: 'Membuat alat bukan hanya soal bahan. Pemilihan bahan, bentuk, dan fungsi alat menentukan seberapa efisien alat itu digunakan dalam kehidupan sehari-hari.'
      },
      {
        title: 'Inovasi Alat',
        text: 'Alat batu pertama dibuat dengan teknik sederhana, tetapi perlahan berkembang menjadi alat yang lebih presisi. Proses ini menunjukkan bagaimana pengetahuan diwariskan dan diperbaiki generasi ke generasi.'
      }
    ],
    ecology: [
      {
        title: 'Jaring Makanan',
        text: 'Ekosistem Praaksara terdiri dari predator dan mangsa. Setiap hewan memiliki peran: herbivora memakan tumbuhan, karnivora memangsa hewan lain, dan omnivora memakan keduanya.'
      },
      {
        title: 'Adaptasi Lingkungan',
        text: 'Manusia praaksara harus beradaptasi dengan kondisi alam. Musim, cuaca, dan ketersediaan makanan mempengaruhi cara mereka hidup dan bergerak.'
      }
    ],
    dimension: [
      {
        title: 'Waktu & Dimensi',
        text: 'Dalam permainan ini, celah dimensi membawa kamu ke periode penting lainnya. Setiap dimensi menawarkan pelajaran unik jadi gunakan kesempatan itu untuk belajar lebih banyak.'
      },
      {
        title: 'Rahasia Dimensi',
        text: 'Soal dimensi tidak hanya untuk hadiah. Mereka mengajarkan fakta sejarah yang membuat permainan ini lebih bermakna dan membantu kamu memahami evolusi manusia.'
      }
    ],
    paleolith: [
      {
        title: 'Zaman Batu Tua (Paleolith)',
        text: '🦖 Zaman Batu Tua berlangsung dari 2.6 juta SM hingga 10.000 SM. Manusia hidup berburu dan meramu, menggunakan alat batu sederhana untuk bertahan. Periode ini mencakup Old Stone Age dengan evolusi pesat dalam teknologi alat.',
        img: 'assets/Item/Axe.jpg',
        engagement: '⚔️ Alat macam apa yang kamu gunakan untuk berburu hari ini? Bandingkan dengan kapak batu primitif!'
      },
      {
        title: 'Early Paleolithic (2.6-300 rb SM)',
        text: '⚫ Fase awal Paleolith ditandai oleh kemunculan Homo habilis. Alat berupa serpih dan choppers (kapak) sederhana. Manusia mulai menggunakan api untuk memasak daging. Pola hidup masih sangat primitif dan sangat bergantung pada alam.',
        img: 'assets/Item/Axe.jpg',
        engagement: '🔥 Bagaimana hidup tanpa api? Pikirkan tentang makanan mentah vs matang!'
      },
      {
        title: 'Middle Paleolithic (300-30 rb SM)',
        text: '🔨 Neanderthal mendominasi periode ini. Alat menjadi lebih canggih dengan teknik Levallois. Mereka mulai menguburkan jenazah dengan ritual, menunjukkan kesadaran spiritual. Diketahui menggunakan api secara teratur.',
        img: 'assets/Item/Axe.jpg',
        engagement: '💀 Ritual pemakaman pertama! Apa artinya? Ini tanda kesadaran manusia berkembang.'
      },
      {
        title: 'Upper Paleolithic (40-10 rb SM)',
        text: '🎨 Modern humans (Homo sapiens) mendominasi. Seni muncul di gua-gua. Alat dibuat sangat spesialisasi: mata panah, jarum tulang, gading terukir. Bahasa berkembang. Munculnya budaya, musik, dan spiritualitas kompleks.',
        img: 'assets/Item/Sword.png',
        engagement: '🎯 Mata panah lebih presisi! Dapatkah kamu membedakan kapak vs mata panah dalam efektivitas?'
      },
      {
        title: 'Alat Batu Paleolith',
        text: '🪨 Evolusi alat: batu pecah → serpih → kapak → mata panah. Batu dipilih dengan cermat (obsidian, flint). Teknik knapping berkembang. Alat multifungsi muncul. Setiap inovasi memperbaiki efisiensi berburu dan pengolahan makanan.',
        img: 'assets/Item/Axe.jpg',
        engagement: '⚙️ 3 alat apa yang paling penting untuk survival? Peringkatkan prioritasmu!'
      },
      {
        title: 'Organisasi Sosial Paleolith',
        text: '👥 Manusia Paleolith hidup dalam kelompok kecil (20-50 orang). Pembagian kerja berdasarkan gender: pria berburu, wanita meramu. Hierarki sosial mulai terbentuk. Kerja sama penting untuk berburu hewan besar.',
        img: 'assets/Item/Shield.jpg',
        engagement: '🛡️ Pertahanan bersama > kekuatan individu. Bagaimana ini mirip dengan timmu?'
      },
      {
        title: 'Makanan & Nutrisi Paleolith',
        text: '🍖 Daging dari berburu (mammoth, rusa, babi hutan). Makanan meramu: buah, akar, serangga. Penggunaan api memungkinkan memasak yang lebih baik. Musim mempengaruhi ketersediaan makanan, memaksa migrasi musiman.',
        img: 'assets/Item/Sword.png',
        engagement: '🍽️ 70% energy dari mana? Berburu atau meramu? Hitung kalori-nya!'
      },
      {
        title: 'Perdagangan & Migrasi Paleolith',
        text: '🌍 Manusia Paleolith bermigrasi dari Afrika ke seluruh dunia. Perdagangan terbentuk: batu obsidian dipertukarkan jarak jauh. Jaringan sosial antar kelompok bermula. Pertukaran barang dan pengetahuan mendorong penyebaran teknologi.',
        img: 'assets/Item/Shield.jpg',
        engagement: '🌐 Obsidian ≈ emas bitcoin zaman dulu! Apa "mata uang" tertua menurut kamu?'
      }
    ],
    neolith: [
      {
        title: 'Zaman Batu Baru (Neolith)',
        text: '🌾 Zaman Batu Baru berlangsung dari 10.000 SM hingga 3.000 SM. Revolusi Pertanian terjadi: manusia mulai menanam padi, gandum, dan meternak hewan. Pola hidup berubah dari nomaden ke sedenter (menetap).',
        img: 'assets/Item/Sword.png',
        engagement: '🌱 Pertanian mengubah SEGALANYA! Apa 3 konsekuensi terbesar dari perubahan ini?'
      },
      {
        title: 'Revolusi Pertanian',
        text: '🌱 Penemuan pertanian adalah moment terbesar dalam sejarah manusia. Manusia belajar menanam benih, mengairi tanah, dan memanen. Hasil panen dapat disimpan untuk survival. Populasi meledak karena nutrisi stabil.',
        img: 'assets/Item/Axe.jpg',
        engagement: '🌾 Dari berburu 4 jam/hari → bertani 8 jam/hari. Untung atau rugi? Jelaskan!'
      },
      {
        title: 'Domestikasi Hewan Neolith',
        text: '🐑 Manusia mulai meternak: domba, kambing, babi, sapi, ayam. Hewan memberikan susu, daging, kulit, dan tenaga kerja. Peternak dan petani membedakan pekerjaan. Hewan peliharaan menjadi simbol kekayaan dan status.',
        img: 'assets/Item/Shield.jpg',
        engagement: '🐑 Ternak = kekayaan. Siapa pemilik hewan → pemimpin. Adil? Berdebatlah!'
      },
      {
        title: 'Permukiman Tetap (Kampung)',
        text: '🏘️ Pertanian memungkinkan manusia menetap. Desa pertama dibangun di Mesopotamia dan Lembah Sungai Nil. Rumah-rumah dibangun dari batu dan batu bata. Infrastruktur sosial berkembang: pasar, tempat penyimpanan, tempat ibadah.',
        img: 'assets/Item/Shield.jpg',
        engagement: '🏘️ Dari nomaden → menetap. Apa yang kamu korbankan? Apa yang kamu dapatkan?'
      },
      {
        title: 'Senjata & Alat Neolith',
        text: '⚙️ Alat batu dipoles halus (bukan dipecah). Mata panah lebih efisien. Kapak batu masuk ke gagang kayu. Peralatan pertanian: cangkul, arit, bajak. Batu dan kayu dikombinasi dengan keahlian tinggi.',
        img: 'assets/Item/Axe.jpg',
        engagement: '⚙️ Polished stone tools vs pecahan batu. Mana yang lebih presisi? Coba mainkan!'
      },
      {
        title: 'Stratifikasi Sosial Neolith',
        text: '👑 Muncul kepemimpinan tetap dan kelas sosial. Petani lahan, pemilik hewan, dan pemimpin memiliki status berbeda. Kekayaan dapat diwariskan. Tukar menukar kekayaan membentuk sistem ekonomi awal.',
        img: 'assets/Item/Shield.jpg',
        engagement: '👑 Kelas sosial pertama! Adakah cara untuk naik kelas? Bagaimana prospekmu?'
      },
      {
        title: 'Agama & Ritual Neolith',
        text: '⛪ Praktik keagamaan menjadi lebih kompleks. Leluhur disembah. Upacara pertanian diminta untuk panen baik. Tempat ibadah dibangun. Pemimpin spiritual memiliki pengaruh besar dalam komunitas.',
        img: 'assets/Item/Sword.png',
        engagement: '⛪ Ritual pertanian → dewa-dewa. Mengapa manusia perlu agama? Pikirkan!'
      },
      {
        title: 'Seni & Estetika Neolith',
        text: '🎭 Seni berkembang: keramik dengan pola, patung terracotta, tekstil. Simbol-simbol spiritual diukir di alat. Seni mencerminkan kehidupan sehari-hari: pertanian, hewan, manusia. Keindahan dan fungsi bergabung.',
        img: 'assets/Item/Axe.jpg',
        engagement: '🎨 Kapak cantik + fungsional. Seni penting untuk survival? Terjawab!'
      },
      {
        title: 'Perdagangan Jarak Jauh Neolith',
        text: '🛤️ Pertanian menghasilkan surplus yang dapat ditukar. Rute perdagangan terbentuk. Obsidian, keramik, dan kulit dipertukarkan antar desa. Jaringan perdagangan ini menjadi awal jalur sutra dan perdagangan global.',
        img: 'assets/Item/Shield.jpg',
        engagement: '💰 Surplus pertanian → perdagangan → peradaban. Bagaimana kabar ekonomimu?'
      },
      {
        title: 'Transisi Paleolith ke Neolith',
        text: '🔄 Transisi memakan waktu ribuan tahun. Beberapa grup tetap berburu-meramu. Lainnya mencoba bertani sambor. Akhirnya pertanian terbukti lebih produktif dan menjadi dominan. Ini perubahan cara hidup paling besar dalam sejarah.',
        img: 'assets/Item/Sword.png',
        engagement: '🔄 Ribuan tahun transisi! Dapatkah kamu mengubah cara hidup dalam 1 hari?'
      }
    ]
  };

  // ── Tracking fakta yang sudah pernah ditampilkan ──
  // Key: "topic:index" → sudah ditampilkan atau belum
  const _shown = new Set();

  // Bangun antrian acak per topik dari fakta yang belum pernah muncul
  function _getUnseenFact(topic) {
    const list = FACTS[topic] || FACTS.general;

    // Cari indeks yang belum pernah ditampilkan
    const unseen = [];
    list.forEach((_, i) => {
      if (!_shown.has(`${topic}:${i}`)) unseen.push(i);
    });

    // Kalau semua sudah ditampilkan, tidak ada yang muncul lagi
    if (unseen.length === 0) return null;

    // Pilih acak dari yang belum muncul
    const pick = unseen[Math.floor(Math.random() * unseen.length)];
    _shown.add(`${topic}:${pick}`);
    return list[pick];
  }

  // Cek apakah masih ada fakta yang belum tampil (lintas semua topik)
  function _hasAnyUnseen() {
    for (const topic of Object.keys(FACTS)) {
      const list = FACTS[topic];
      for (let i = 0; i < list.length; i++) {
        if (!_shown.has(`${topic}:${i}`)) return true;
      }
    }
    return false;
  }

  let _timer = null;

  function show(topic = 'general') {
    // Ambil fakta yang belum pernah ditampilkan
    const item = _getUnseenFact(topic);

    // Tidak ada fakta baru → diam saja, tidak ganggu player
    if (!item) return;

    const box = document.getElementById('learnBox');
    if (!box) return;

    document.getElementById('learnTitle').textContent = item.title;
    document.getElementById('learnText').innerHTML    = item.text;

    // Gambar item (opsional)
    const iconDiv = document.getElementById('learnIcon');
    if (iconDiv) {
      iconDiv.innerHTML = item.img
        ? `<img src="${item.img}" alt="${item.title}">`
        : '';
    }

    // Engagement prompt (opsional)
    const engDiv = document.getElementById('learnEngagement');
    if (engDiv) {
      engDiv.innerHTML = item.engagement || '';
    }

    box.style.display = 'flex';
    if (_timer) clearTimeout(_timer);
    _timer = setTimeout(close, 12000);
  }

  function showRandom(topic = 'general') {
    show(topic);
  }

  function close() {
    const box = document.getElementById('learnBox');
    if (!box) return;
    box.style.display = 'none';
    if (_timer) { clearTimeout(_timer); _timer = null; }
  }

  // Reset semua tracking (berguna jika game di-restart)
  function reset() {
    _shown.clear();
  }

  return { show, showRandom, close, reset };
})();

// ----- Typewriter (per-huruf) — dipakai loading, dialog, kuis, dimensi -----
const Typewriter = {
  write(el, text, options = {}) {
    const speed  = options.speed  ?? 30;
    const onDone = options.onDone ?? null;
    const cursor = options.cursor ?? false;

    if (!document.getElementById('twCursorKeyframes')) {
      const s = document.createElement('style');
      s.id = 'twCursorKeyframes';
      s.textContent = '@keyframes cursorBlink{0%,100%{opacity:1}50%{opacity:0}}';
      document.head.appendChild(s);
    }

    el.textContent = '';
    let i = 0;
    let cursorEl = null;
    if (cursor) {
      cursorEl = document.createElement('span');
      cursorEl.className = 'twCursor';
      cursorEl.style.cssText =
        'display:inline-block;width:2px;height:1em;background:currentColor;' +
        'vertical-align:middle;margin-left:2px;' +
        'animation:cursorBlink .75s step-end infinite;';
      el.appendChild(cursorEl);
    }

    const tick = () => {
      if (i < text.length) {
        const ch = document.createTextNode(text[i]);
        if (cursorEl) el.insertBefore(ch, cursorEl);
        else el.appendChild(ch);
        i++;
        setTimeout(tick, speed);
      } else {
        if (cursorEl && cursorEl.parentNode) cursorEl.parentNode.removeChild(cursorEl);
        if (onDone) onDone();
      }
    };
    setTimeout(tick, speed);
  },

  skip(el, text) {
    el.textContent = text;
  },
};

// Global state object shared by all modules
const GS = {
  started:     false,
  paused:      false,
  tick:        0,
  score:       0,
  quizAnswered:0,
  quizCorrect: 0,
  quizAsked:   [],
  missionsDone:0,
  secretFound: false,
  secretEventDone: false,
  inDimension: false,
  dimLevel:    0,   // which dimension we're in (0=none, 1=paleolith, 2=neolith)
  dimQuizDone: false,
  endingType:  null,
  returnAnim:  false,
  timeOfDay:   'day', // 'day', 'sore', 'night', 'dawn'
  timeProgress: 0,   // 0-900 countdown untuk 1 menit 30 detik
  timeOffset:   0,   // 0=pagi, 1=sore, 2=malam, 3=dawn (untuk auto-cycle)
  portalActive: false,
  bossDead:     false,
  torchActive:  false, // apakah sedang memegang obor
  
  // CHALLENGE MODE ADDITIONS
  gameMode:    'normal', // 'normal' atau 'challenge'
  challengeTime: 0, // countdown timer untuk challenge mode (dalam detik)
  weather:     'normal', // 'normal', 'rain', 'storm', 'heat', 'darkness'
  weatherTimer: 0, // countdown untuk weather change
  enemyMultiplier: 1.0, // scale enemy count/difficulty di challenge mode
  
  // ACCESSIBILITY
  flashEpilepsy: false, // Reduce visual flash intensity when ON
};