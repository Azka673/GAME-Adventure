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
    ]
  };

  let _timer = null;

  function show(topic = 'general') {
    const list = FACTS[topic] || FACTS.general;
    const item = list[Math.floor(Math.random() * list.length)];
    const box  = document.getElementById('learnBox');
    if (!box) return;
    document.getElementById('learnTitle').textContent = item.title;
    document.getElementById('learnText').innerHTML = item.text;
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

  return { show, showRandom, close };
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
};
