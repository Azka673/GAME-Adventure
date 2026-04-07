// ===== DIALOG.JS =====
// Handles all narrative dialog boxes (NPC, intro, ending)

const Dialog = (() => {
  let lines   = [];
  let idx     = 0;
  let onDone  = null;
  let typing  = false;   // true while typewriter is running
  let _skipFn = null;    // call this to instantly finish current typewrite

  // ---- Internal typewriter ----
  // Writes `text` into `el` char by char.
  // Returns a skip function that completes instantly.
  function _type(el, text, speed = 28) {
    el.textContent = '';
    typing = true;
    let i = 0;
    let timer;

    // Cursor span
    const cursor = document.createElement('span');
    cursor.style.cssText =
      'display:inline-block;width:2px;height:1em;background:#00ffcc;' +
      'vertical-align:middle;margin-left:2px;' +
      'animation:cursorBlink .75s step-end infinite;';
    el.appendChild(cursor);

    // Ensure keyframe exists
    if (!document.getElementById('dlgCursorStyle')) {
      const s = document.createElement('style');
      s.id = 'dlgCursorStyle';
      s.textContent = '@keyframes cursorBlink{0%,100%{opacity:1}50%{opacity:0}}';
      document.head.appendChild(s);
    }

    function tick() {
      if (i < text.length) {
        const ch = document.createTextNode(text[i++]);
        el.insertBefore(ch, cursor);
        timer = setTimeout(tick, speed);
      } else {
        // Done
        if (cursor.parentNode) cursor.parentNode.removeChild(cursor);
        typing  = false;
        _skipFn = null;
      }
    }

    timer = setTimeout(tick, speed);

    // Skip function: fill instantly
    _skipFn = () => {
      clearTimeout(timer);
      el.textContent = text; // no cursor
      typing  = false;
      _skipFn = null;
    };
  }

  // ---- Public API ----
  function show(speakerName, portraitEmoji, dialogLines, callback = null) {
    lines   = dialogLines;
    idx     = 0;
    onDone  = callback;

    document.getElementById('dialogPortrait').textContent = portraitEmoji;
    document.getElementById('dialogName').textContent     = speakerName;
    document.getElementById('dialogBox').style.display    = 'flex';

    _type(document.getElementById('dialogText'), lines[0]);
  }

  function next() {
    // If still typing → skip to end first
    if (typing && _skipFn) { _skipFn(); return; }

    idx++;
    if (idx >= lines.length) {
      document.getElementById('dialogBox').style.display = 'none';
      if (onDone) onDone();
    } else {
      document.getElementById('dialogPortrait').textContent =
        /* portrait may not change per-line — keep same */ document.getElementById('dialogPortrait').textContent;
      _type(document.getElementById('dialogText'), lines[idx]);
    }
  }

  function close() {
    if (_skipFn) _skipFn();
    document.getElementById('dialogBox').style.display = 'none';
    typing = false;
  }

  function isOpen() {
    return document.getElementById('dialogBox').style.display === 'flex';
  }

  return { show, next, close, isOpen };
})();

// ===== ALL STORY DIALOG DATA =====
const StoryDialogs = {

  // ---- INTRO: player wakes up confused ----
  intro: [
    { speaker: '???',      portrait: '😵', text: 'Ugh... kepalaku... di mana aku ini?' },
    { speaker: 'Kamu',     portrait: '😰', text: 'Hutan? Gua? Ini bukan rumahku! Aku tadi sedang belajar IPS di kelas...' },
    { speaker: 'Kamu',     portrait: '😨', text: 'Cuacanya aneh. Tidak ada aspal, tidak ada gedung, tidak ada HP... sinyal juga hilang.' },
    { speaker: 'Kamu',     portrait: '🤔', text: 'Tunggu... pohon-pohon ini... sangat besar dan kuno. Batu-batu ini berbentuk aneh...' },
    { speaker: 'Kamu',     portrait: '😱', text: 'Ini... bukan zamanku. SAMA SEKALI BUKAN ZAMANKU!' },
    { speaker: 'Suara Aneh','portrait':'🌀', text: 'Petualang dari masa depan... kau terjatuh ke celah dimensi waktu.' },
    { speaker: 'Suara Aneh','portrait':'🌀', text: 'Kau kini berada di zaman Praaksara — ribuan tahun sebelum kelahiranmu.' },
    { speaker: 'Kamu',     portrait: '😤', text: 'Praaksara?! Zaman yang kupelajari di buku IPS?! Serius?!' },
    { speaker: 'Suara Aneh','portrait':'🌀', text: 'Untuk pulang, kau harus memahami zaman ini dari dalam. Temukan pengetahuan, selesaikan misi.' },
    { speaker: 'Kamu',     portrait: '😤', text: 'Baiklah... kalau ini satu-satunya cara pulang, aku tidak punya pilihan. Mari mulai!' },
  ],

  // ---- NPC DIALOGS ----
  npcPakGoa: [
    { speaker: 'Pak Goa',  portrait: '🧔', text: 'Hei, pendatang aneh berbaju ganjil! Dari mana kau berasal?' },
    { speaker: 'Pak Goa',  portrait: '🧔', text: 'Masa depan? Hahaha! Cerita yang menarik. Aku tidak mengerti, tapi aku percaya.' },
    { speaker: 'Pak Goa',  portrait: '🧔', text: 'Aku Pak Goa, penjaga pengetahuan suku ini. Kami hidup di gua-gua sekitar sini.' },
    { speaker: 'Pak Goa',  portrait: '🧔', text: 'Kami berburu, berpindah mengikuti hewan. Tidak ada tempat tetap — itulah kehidupan kami.' },
    { speaker: 'Pak Goa',  portrait: '🧔', text: 'Jika kau ingin memahami dunia ini, jawab pertanyaan-pertanyaanku. Itu satu-satunya jalan!' },
  ],
  npcIbuTani: [
    { speaker: 'Ibu Tani', portrait: '👩‍🌾', text: 'Oh, pendatang! Kau datang di waktu yang tepat. Ladangku butuh tangan ekstra.' },
    { speaker: 'Ibu Tani', portrait: '👩‍🌾', text: 'Dulu kami selalu berpindah. Tapi kakek kami menemukan... kalau biji-bijian bisa ditanam!' },
    { speaker: 'Ibu Tani', portrait: '👩‍🌾', text: 'Sejak itu, kami tidak perlu lari-lari lagi. Kami membangun rumah, membuat desa.' },
    { speaker: 'Ibu Tani', portrait: '👩‍🌾', text: 'Bantu aku kumpulkan kayu untuk memperkuat pagar ladang. Hewan liar sering masuk!' },
    { speaker: 'Ibu Tani', portrait: '👩‍🌾', text: 'Gunakan kapakmu untuk menebang pohon. Kembalilah jika sudah dapat 3 kayu!' },
  ],
  npcPandeBesi: [
    { speaker: 'Pande Besi', portrait: '👨‍🔧', text: 'Ssst! Jangan ganggu! Aku sedang melebur logam ini di tungku.' },
    { speaker: 'Pande Besi', portrait: '👨‍🔧', text: 'Logam, anak muda! Ini bukan batu biasa. Kita panaskan, bentuk, jadikan senjata dan alat.' },
    { speaker: 'Pande Besi', portrait: '👨‍🔧', text: 'Dulu nenek moyangku pakai batu. Tapi batu tidak sekuat ini. Logam mengubah segalanya!' },
    { speaker: 'Pande Besi', portrait: '👨‍🔧', text: 'Ada peti tua di ujung hutan timur. Di sana tersimpan Pedang Kuno peninggalan leluhur.' },
    { speaker: 'Pande Besi', portrait: '👨‍🔧', text: 'Temukan pedang itu! Dengan logam di tanganmu, kau jauh lebih kuat menghadapi alam liar ini.' },
  ],
  npcDukunBatu: [
    { speaker: 'Dukun Batu', portrait: '🧙', text: 'Batu-batu besar ini bukan sekadar batu, anak muda. Mereka menyimpan roh leluhur kami.' },
    { speaker: 'Dukun Batu', portrait: '🧙', text: 'Kami membangunnya bersama-sama. Ratusan tangan, berhari-hari bekerja. Itulah kekuatan komunitas.' },
    { speaker: 'Dukun Batu', portrait: '🧙', text: 'Animisme — kepercayaan bahwa segalanya punya roh. Sungai, pohon, batu, semuanya hidup.' },
    { speaker: 'Dukun Batu', portrait: '🧙', text: 'Di ujung timur laut, ada celah dimensi. Portal waktu yang membuka ke dimensi lain.' },
    { speaker: 'Dukun Batu', portrait: '🧙', text: 'Masuklah jika kau berani. Di sana, rahasia terdalam praaksara akan terungkap.' },
  ],
  npcRajaKuno: [
    { speaker: 'Raja Kuno',  portrait: '👑', text: 'Petualang dari masa depan... aku sudah mendengar tentangmu.' },
    { speaker: 'Raja Kuno',  portrait: '👑', text: 'Kami di sini sudah membangun peradaban kecil. Tapi masih rapuh, masih perlu pemimpin.' },
    { speaker: 'Raja Kuno',  portrait: '👑', text: 'Jika kau berhasil mengumpulkan semua pengetahuan — mungkin... kau layak menjadi penguasa kami.' },
    { speaker: 'Raja Kuno',  portrait: '👑', text: 'Tunjukkan dirimu, jawab semua soal, temukan semua rahasia. Baru kita lihat!' },
  ],

  // ---- DIMENSION DIALOGS ----
  dimensionEnter: [
    { speaker: 'Suara Dimensi', portrait: '🌀', text: 'Kau memasuki celah antara dua zaman...' },
    { speaker: 'Suara Dimensi', portrait: '🌀', text: 'Di sini waktu bergerak berbeda. Kau bisa melihat masa lalu yang jauh lebih dalam.' },
    { speaker: 'Suara Dimensi', portrait: '🌀', text: 'Jawab pertanyaan rahasia ini untuk mendapatkan pengetahuan tersembunyi!' },
  ],
  dimensionExit: [
    { speaker: 'Suara Dimensi', portrait: '🌀', text: 'Kau berhasil. Pengetahuan dimensi ini sudah menjadi milikmu.' },
    { speaker: 'Suara Dimensi', portrait: '🌀', text: 'Kembali ke dunia praaksara. Jalan pulangmu semakin dekat...' },
  ],
};

// ===== ENDING DIALOG SCRIPTS =====
const EndingDialogs = {

  // ---- TRUE ENDING: Player pulang ke dunia asal ----
  true: [
    { speaker: 'Kamu',      portrait: '😊', text: 'Aku... aku merasakan sesuatu bergetar. Portal itu — terbuka kembali!' },
    { speaker: 'Pak Goa',   portrait: '🧔', text: 'Kau memang luar biasa, pendatang. Kau memahami kami lebih dari yang kuduga.' },
    { speaker: 'Ibu Tani',  portrait: '👩‍🌾', text: 'Terima kasih sudah membantu ladang kami. Semoga masa depanmu seindah pagi ini.' },
    { speaker: 'Kamu',      portrait: '😭', text: 'Aku... tidak menyangka akan merindukannya. Selamat tinggal, zaman praaksara.' },
    { speaker: 'Suara Waktu','portrait':'⌛', text: 'Pengetahuanmu tentang praaksara sudah lengkap. Portal pulang kini terbuka.' },
    { speaker: 'Kamu',      portrait: '🥹', text: 'Aku pulang ke zamanku — tapi membawa pemahaman yang tidak akan pernah kulupakan.' },
    { speaker: 'Suara Waktu','portrait':'⌛', text: 'Manusia bukan hanya makhluk masa kini. Kita adalah hasil panjang dari jutaan tahun perjuangan leluhur.' },
    { speaker: 'Kamu',      portrait: '😄', text: 'Aku tahu sekarang mengapa belajar sejarah itu penting. Terima kasih, Praaksara!' },
  ],

  // ---- BAD ENDING: Player mundur ke Arkeozoikum dan mati ----
  bad: [
    { speaker: 'Suara Gelap','portrait':'💀', text: 'Kau gagal memahami perjalanan waktu... celah dimensi menarikmu mundur.' },
    { speaker: 'Kamu',       portrait: '😰', text: 'Tunggu— ini bukan praaksara lagi. Langitnya... merah. Udaranya berbeda.' },
    { speaker: 'Kamu',       portrait: '😱', text: 'Hei, tidak ada pohon sama sekali! Batu vulkanik di mana-mana. Ini... ini...' },
    { speaker: 'Suara Gelap','portrait':'💀', text: 'Zaman Arkeozoikum. 3,8 miliar tahun yang lalu. Belum ada kehidupan kompleks.' },
    { speaker: 'Kamu',       portrait: '😨', text: 'TIDAK! Udara di sini... tidak bisa kupernafas! Oksigen sangat sedikit!' },
    { speaker: 'Suara Gelap','portrait':'💀', text: 'Tanpa pengetahuan, manusia tidak bisa bertahan. Bahkan di zamannya sendiri.' },
    { speaker: 'Kamu',       portrait: '💀', text: 'A-aku... tidak kuat... dunia ini terlalu primitif... tolong...' },
    { speaker: 'Narrator',   portrait: '📖', text: 'Petualang itu tidak berhasil pulang. Pengetahuan adalah kunci bertahan hidup.' },
    { speaker: 'Narrator',   portrait: '📖', text: 'Coba lagi — jawab lebih banyak soal, selesaikan lebih banyak misi!' },
  ],

  // ---- SECRET ENDING: Player tinggal dan menjadi raja ----
  secret: [
    { speaker: 'Suara Dimensi','portrait':'🌀', text: 'Portal pulang... ada. Tapi di tanganmu ada pilihan lain.' },
    { speaker: 'Raja Kuno',    portrait: '👑', text: 'Petualang! Kau telah membuktikan dirimu. Suku-suku di sini sepakat: kami butuh pemimpin sepertimu!' },
    { speaker: 'Kamu',         portrait: '🤔', text: 'Aku... bisa memimpin kalian? Tapi aku dari masa depan. Aku tidak termasuk di sini.' },
    { speaker: 'Dukun Batu',   portrait: '🧙', text: 'Justru karena itu! Kau tahu masa depan. Kau bisa membimbing kami menuju peradaban yang lebih baik.' },
    { speaker: 'Pak Goa',      portrait: '🧔', text: 'Bersama kau, kami tidak perlu menunggu ribuan tahun untuk berkembang. Pimpinlah kami!' },
    { speaker: 'Kamu',         portrait: '😤', text: '...Baiklah. Aku memilih tinggal. Aku akan membangun kerajaan yang adil dan makmur bersama kalian!' },
    { speaker: 'Raja Kuno',    portrait: '👑', text: 'PRAAKSARA MENYAMBUT RAJANYA YANG BARU! HIDUPLAH SANG RAJA!' },
    { speaker: 'Narrator',     portrait: '📜', text: 'Dan begitulah, sang petualang dari masa depan membangun kerajaan pertama di zaman praaksara.' },
    { speaker: 'Narrator',     portrait: '📜', text: 'Ia mengajarkan pertanian maju, teknik logam, dan sistem hukum — memajukan peradaban ratusan tahun lebih cepat.' },
    { speaker: 'Narrator',     portrait: '📜', text: 'Kerajaannya dikenal sebagai "Kerajaan Chrono" — legenda yang hidup dalam kisah-kisah purba yang belum terpecahkan...' },
    { speaker: 'Kamu (Raja)',  portrait: '👑', text: 'Aku tidak pernah menyangka berakhir di sini. Tapi ini adalah takdirku. Dan aku... bahagia.' },
  ],

  // ---- GOOD ENDING ----
  good: [
    { speaker: 'Kamu',      portrait: '😊', text: 'Portal itu... bergetar samar. Sepertinya aku bisa pulang, tapi belum sempurna.' },
    { speaker: 'Pak Goa',   portrait: '🧔', text: 'Kau sudah belajar banyak, pendatang. Meski belum semua kau pahami, perjalananmu tidak sia-sia.' },
    { speaker: 'Kamu',      portrait: '😌', text: 'Terima kasih atas semuanya. Aku membawa sedikit pemahaman tentang leluhur manusia.' },
    { speaker: 'Suara Waktu','portrait':'⌛', text: 'Kembali ke zamanmu dengan bekal yang kau miliki. Jangan berhenti belajar.' },
    { speaker: 'Kamu',      portrait: '🙂', text: 'Aku akan kembali... dan kali ini aku akan benar-benar memahami segalanya!' },
  ],
};
