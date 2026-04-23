// ===== LIBRARY.JS =====
// Comprehensive multi-tab learning library

const Library = (() => {
  let activeTab = 'zaman';
  let fromGame  = false;

  // ============================================================
  //  CONTENT DATABASE
  // ============================================================
  const CONTENT = {

    // ---- TAB: ZAMAN ----
    zaman: [
      // ============================================================
      // SEKSI ARKEOLOGI (isGeologi: false / tidak ada flag)
      // ============================================================
      {
        id: 'pale', title: '🪨 Paleolitikum', tag: '2,5 juta – 10.000 SM', tc: '#ff8844',
        difficulty: 'basic',
        desc: 'Zaman batu tua. Manusia pertama yang hidup nomaden menggunakan alat batu kasar yang dipukul, bukan diasah.',
        sections: [
          {
            t: 'Pengertian & Latar Belakang',
            d: 'Paleolitikum berasal dari bahasa Yunani: <b>palaios</b> (kuno) + <b>lithos</b> (batu). Ini adalah periode terpanjang dalam sejarah manusia — berlangsung sekitar 2,5 juta tahun atau lebih dari 99% seluruh eksistensi manusia di bumi. Manusia masih sangat bergantung pada alam dan belum mampu mengubah lingkungan secara signifikan. Mereka hidup sepenuhnya dari apa yang disediakan alam: hewan buruan, buah, umbi, dan ikan.',
            sub: [
              { t: 'Ciri Utama Kehidupan', d: 'Nomaden (berpindah-pindah mengikuti hewan buruan dan musim buah), berburu dan meramu (food gathering), tinggal di gua atau di bawah pohon besar, membuat alat batu dengan cara dipukul (teknik perkusi), belum mengenal bercocok tanam, peternakan, atau penyimpanan makanan jangka panjang.' },
              { t: 'Pembagian Tiga Fase', d: '(1) <b>Awal Paleolitikum</b> (2,5 juta – 200.000 SM): alat sangat primitif, hanya batu dipukul kasar, manusia masih sangat bergantung pada insting. (2) <b>Tengah Paleolitikum</b> (200.000 – 40.000 SM): mulai ada ritual penguburan, manusia mulai berpikir tentang kematian dan alam baka. (3) <b>Akhir Paleolitikum</b> (40.000 – 10.000 SM): seni gua berkembang pesat, manusia modern anatomis (Homo sapiens) menggantikan spesies lain.' }
            ]
          },
          {
            t: 'Kehidupan Sosial & Organisasi',
            d: 'Manusia Paleolitikum hidup dalam kelompok kecil 20–50 orang yang disebut <b>band</b>. Tidak ada pemimpin tetap yang diwarisi — kepemimpinan berdasarkan kemampuan nyata: siapa yang paling mahir berburu, siapa yang paling tahu rute migrasi hewan. Pengambilan keputusan bersifat kolektif dan konsensus.',
            sub: [
              { t: 'Struktur Sosial Egaliter', d: 'Tidak ada stratifikasi sosial berdasarkan kekayaan — karena tidak ada yang bisa ditimbun dalam hidup nomaden. Semua anggota band punya hak yang kurang lebih sama dalam pembagian hasil buruan. Ini mungkin adalah sistem paling "adil" yang pernah ada dalam sejarah manusia, bukan karena idealisme, tapi karena keadaan yang memaksanya.' },
              { t: 'Pembagian Kerja', d: 'Pembagian kerja ada tapi fleksibel: secara umum laki-laki berburu hewan besar (butuh kecepatan dan jangkauan), perempuan meramu tumbuhan, buah, dan berburu hewan kecil. Namun analisis tulang modern menunjukkan ini tidak mutlak — ada perempuan yang berburu, ada laki-laki yang meramu.' },
              { t: 'Komunikasi & Bahasa', d: 'Awal Paleolitikum: gestur dan suara sederhana. Pada akhir Paleolitikum, manusia sudah memiliki bahasa lisan yang cukup kompleks untuk bercerita, merencanakan berburu, dan mentransmisikan pengetahuan. Lukisan gua juga diduga berfungsi sebagai media komunikasi visual lintas kelompok.' }
            ]
          },
          {
            t: 'Teknologi Alat Batu',
            d: 'Teknik pembuatan alat utama: <b>perkusi langsung</b> (memukul batu dengan batu lain menghasilkan serpihan tajam) dan <b>perkusi tidak langsung</b> (memakai perantara tulang atau kayu untuk kontrol lebih presisi). Alat utama: kapak genggam (hand axe), kapak perimbas (chopper), alat serpih (flake tool), dan alat serut.',
            sub: [
              { t: 'Kapak Perimbas (Chopper)', d: 'Alat tertua yang ditemukan, berumur hingga 2,6 juta tahun dari Olduvai Gorge, Tanzania. Bentuk tidak beraturan, hanya satu sisi yang dipertajam. Fungsi: memotong daging hewan, menggali tanah mencari umbi, dan memecah tulang untuk mengambil sumsum — sumber lemak dan kalori yang sangat berharga.' },
              { t: 'Kapak Genggam Acheulean', d: 'Inovasi besar sekitar 1,7 juta tahun lalu: kapak simetris dua sisi berbentuk tetesan air mata. Alat paling serbaguna zaman Paleolitikum — bisa memotong, menggali, membelah, menguliti hewan. Desainnya hampir tidak berubah selama 1 juta tahun — bukti efisiensinya yang luar biasa.' },
              { t: 'Teknik Levallois', d: 'Inovasi Paleolitikum Tengah (~300.000 SM): pengrajin lebih dulu membentuk "inti batu" (core) menjadi kubah, lalu memukul ujungnya untuk mendapat serpihan dengan bentuk yang diinginkan. Jauh lebih efisien dari perkusi langsung — menghasilkan alat lebih tipis, ringan, dan presisi.' }
            ]
          },
          {
            t: 'Seni, Budaya & Spiritualitas',
            d: 'Manusia Paleolitikum sudah memiliki kehidupan spiritual dan seni yang kaya — jauh lebih kompleks dari bayangan populer tentang "manusia gua". Lukisan gua ditemukan di seluruh dunia dan menunjukkan kapasitas seni yang mengagumkan.',
            sub: [
              { t: 'Lukisan Gua Indonesia — Tertua di Dunia', d: 'Gua Leang-Leang dan Leang Bulu Sipong 4 di Maros, Sulawesi Selatan menyimpan lukisan tangan dan babi rusa berumur 45.500 – 51.200 tahun — lebih tua dari lukisan gua Altamira (Spanyol) dan Lascaux (Prancis) yang selama ini dianggap tertua! Indonesia adalah pusat seni figuratif tertua yang diketahui manusia.' },
              { t: 'Fungsi Lukisan Gua', d: 'Bukan sekedar dekorasi! Diduga fungsinya beragam: ritual sebelum berburu (sympathetic magic — menggambar hewan = menguasai roh hewan), perekaman kejadian penting untuk generasi berikut, peta wilayah berburu, atau komunikasi antar kelompok yang melewati gua yang sama.' },
              { t: 'Ritual Penguburan', d: 'Bukti penguburan pertama (~300.000 tahun lalu di Atapuerca, Spanyol): jenazah diletakkan dalam posisi tertentu, ada bekal kubur sederhana. Ini bukti manusia sudah berpikir tentang kematian, alam baka, dan memiliki rasa hormat terhadap sesama yang meninggal. Kapasitas empati manusia sudah sangat tua.' },
              { t: 'Perhiasan & Ekspresi Diri', d: 'Manik-manik dari cangkang laut berumur 82.000 tahun ditemukan di Maroko — manusia sudah berhias diri sebelum Homo sapiens meninggalkan Afrika! Di Sulawesi juga ditemukan tanda-tanda penggunaan pigmen oker merah, kemungkinan untuk dekorasi tubuh.' }
            ]
          },
          {
            t: 'Manusia Paleolitikum di Indonesia',
            d: 'Indonesia adalah salah satu laboratorium Paleolitikum terpenting di dunia. Situs Sangiran (Jawa Tengah) bahkan ditetapkan sebagai Situs Warisan Dunia UNESCO karena kekayaan fosil manusia purba dan alat batunya.',
            sub: [
              { t: 'Situs Sangiran', d: 'Terletak di Sragen dan Karanganyar, Jawa Tengah. Ditemukan lebih dari 100 fosil manusia purba (Pithecanthropus/Homo erectus) dan ribuan alat batu Paleolitikum. Ditetapkan UNESCO World Heritage Site tahun 1996. "Jendela" terpenting ke kehidupan manusia purba Asia.' },
              { t: 'Alat Batu Pacitan', d: 'Kapak perimbas dan alat batu lain ditemukan di Pacitan, Jawa Timur oleh von Koenigswald (1935). Disebut "Kebudayaan Pacitan" — representasi alat Paleolitikum gaya Asia Selatan yang menyebar ke seluruh Asia Tenggara.' },
              { t: 'Kebudayaan Ngandong', d: 'Di sepanjang Sungai Bengawan Solo (Solo, Jawa Tengah) ditemukan alat-alat dari tulang dan tanduk rusa — termasuk senjata dan penggaruk. Ini contoh manusia purba yang sudah memanfaatkan bahan organik selain batu.' }
            ]
          }
        ],
        table: {
          headers: ['Aspek', 'Awal (2,5 jt–200 rb SM)', 'Tengah (200–40 rb SM)', 'Akhir (40–10 rb SM)'],
          rows: [
            ['Alat', 'Sangat kasar, chopper', 'Levallois, lebih halus', 'Mikrolith, alat tulang'],
            ['Sosial', 'Band 20–30 orang', 'Ritual muncul, penguburan', 'Seni berkembang pesat'],
            ['Tempat tinggal', 'Alam terbuka, bawah pohon', 'Gua dan ceruk batu', 'Gua + tenda kulit hewan'],
            ['Spesies dominan', 'Homo habilis, H. erectus', 'Homo heidelbergensis', 'Homo sapiens, Neanderthal'],
            ['Teknologi api', 'Belum ada bukti konsisten', 'Dikendalikan (~400.000 SM)', 'Dikuasai sepenuhnya'],
          ]
        },
        facts: [
          'Lukisan tangan di Gua Leang Bulu Sipong, Sulawesi berumur 51.200 tahun — lebih tua dari semua lukisan gua Eropa! Para arkeolog terperangah karena ini artinya kapasitas seni simbolik manusia jauh lebih tua dari dugaan sebelumnya.',
          'Manusia Paleolitikum sudah merawat anggota suku yang cacat atau lumpuh — fosil Neanderthal berumur 50.000 tahun di Shanidar, Irak menunjukkan seorang individu yang bertahan hidup hingga tua meski lengannya diamputasi dan matanya buta. Ini hanya mungkin jika komunitasnya merawatnya selama bertahun-tahun.',
          'Kapak genggam Acheulean digunakan selama 1 JUTA TAHUN tanpa perubahan desain — jauh melebihi seluruh era iPhone, era komputer, bahkan era industri. Ini bukan karena manusia bodoh, tapi karena desainnya sudah sempurna untuk kebutuhannya.',
          'Rata-rata manusia Paleolitikum bekerja hanya 3–5 jam per hari untuk memenuhi kebutuhan makan. Sisanya digunakan untuk istirahat, bersosialisasi, dan bermain. Kita yang hidup di era modern justru bekerja jauh lebih keras!'
        ]
      },
      {
        id: 'meso', title: '🌿 Mesolitikum', tag: '10.000 – 5.000 SM', tc: '#44dd88',
        difficulty: 'basic',
        desc: 'Zaman batu tengah. Manusia mulai semi-menetap, menemukan panah, dan meninggalkan "dapur raksasa" dari cangkang kerang.',
        sections: [
          {
            t: 'Konteks Perubahan Besar',
            d: 'Mesolitikum adalah masa transisi antara kehidupan nomaden murni ke semi-menetap. Pemicu utamanya bukan pilihan manusia, melainkan perubahan iklim drastis: Zaman Es Terakhir berakhir (~12.000 SM), suhu global naik, gletser mencair, permukaan laut naik 120 meter, dan lanskap berubah total. Mammoth, badak berbulu, dan megafauna lain punah — manusia harus menemukan strategi bertahan hidup baru.',
            sub: [
              { t: 'Pengaruh Perubahan Iklim', d: 'Pencairan es menyebabkan naiknya permukaan laut sekitar 120 meter — daratan seluas benua tenggelam. "Sundaland" (daratan yang menyatukan Sumatera, Jawa, Kalimantan) mulai tenggelam, membentuk kepulauan Nusantara yang kita kenal sekarang. Ini memaksa migrasi besar-besaran populasi manusia purba Asia Tenggara.' },
              { t: 'Strategi Subsistensi Baru', d: 'Tanpa megafauna, manusia mengembangkan strategi "broad-spectrum" — mengeksploitasi sumber pangan jauh lebih beragam: ikan, kerang, kepiting, burung, hewan kecil, biji-bijian liar, umbi, buah. Diversifikasi ini membuat mereka lebih tahan terhadap kegagalan satu sumber pangan.' }
            ]
          },
          {
            t: 'Kjokkenmodinger — Tumpukan Sampah Dapur Raksasa',
            d: 'Peninggalan paling ikonik dan unik Mesolitikum: tumpukan cangkang kerang setinggi hingga 7 meter, panjang ratusan meter, dan lebar puluhan meter! Kata Kjokkenmodinger berasal dari bahasa Denmark — arkeolog Denmark yang pertama menemukannya di pesisir Denmark, lalu mengenali pola serupa di pantai timur Sumatera.',
            sub: [
              { t: 'Kandungan Kjokkenmodinger', d: 'Bukan hanya cangkang kerang! Di dalamnya juga terdapat: tulang ikan, tulang mamalia darat, alat batu dan alat tulang, sisa api unggun (arang), biji-bijian yang gosong, dan terkadang rangka manusia yang dikubur di dalam atau di dekat tumpukan — menunjukkan lokasi ini juga berfungsi sebagai tempat pemakaman komunitas.' },
              { t: 'Makna Arkeologis', d: 'Kjokkenmodinger membuktikan manusia sudah menempati lokasi yang sama berulang kali — bukan sekadar singgah. Ini adalah cikal bakal konsep "tempat tinggal tetap" dan keterikatan manusia pada suatu lokasi geografis. Dari tumpukan sampah, kita bisa membaca seluruh pola makan, teknologi, dan ritual kematian suatu komunitas!' },
              { t: 'Di Indonesia', d: 'Kjokkenmodinger terbesar di Indonesia ditemukan di sepanjang pantai timur Sumatera, terutama di daerah Medan dan sekitarnya. Ukurannya sebanding dengan yang ada di Denmark — menunjukkan kesamaan pola hidup manusia pesisir di belahan dunia yang berbeda.' }
            ]
          },
          {
            t: 'Abris Sous Roche — Tempat Tinggal Ceruk Batu',
            d: 'Selain kjokkenmodinger, bukti tempat tinggal Mesolitikum yang penting adalah ceruk-ceruk batu karang (abris sous roche) yang digunakan sebagai shelter semi-permanen. Berbeda dengan gua yang gelap dan dalam, abris sous roche adalah ceruk dangkal di tebing batu yang memiliki atap alami.',
            sub: [
              { t: 'Situs di Indonesia', d: 'Abris sous roche ditemukan di beberapa lokasi penting: <b>Lamoncong, Sulawesi Selatan</b> (lukisan dinding dan alat batu), <b>Besuki, Jawa Timur</b> (alat tulang, alat batu), <b>Sampung, Jawa Tengah</b> (terkenal karena "Kebudayaan Sampung" — ditemukan alat tulang, alat batu, serta tulang manusia dan hewan dalam jumlah besar).' },
              { t: 'Kebudayaan Sampung (Bone Culture)', d: 'Salah satu penemuan Mesolitikum terpenting di Indonesia. Di Gua Lawa, Sampung, Ponorogo ditemukan ratusan alat dari tulang: jarum, pisau, penggaruk, dan mata pancing. Ini bukti manusia sudah sangat mahir mengolah tulang hewan menjadi alat-alat presisi — teknologi yang diwarisi turun-temurun.' },
              { t: 'Ciri Temuan Umum', d: 'Di dalam ceruk biasanya ditemukan: alat batu mikrolith, alat tulang dan tanduk, sisa makanan (tulang hewan, cangkang), abu sisa api, pigmen oker (untuk melukis atau hiasan tubuh), dan kadang lukisan dinding sederhana berupa tanda-tanda geometris atau gambar tangan.' }
            ]
          },
          {
            t: 'Revolusi Mikrolith & Alat Komposit',
            d: 'Alat Mesolitikum jauh lebih kecil dan presisi dari Paleolitikum — disebut <b>mikrolith</b> (batu kecil). Inovasi terbesar: menggabungkan beberapa mikrolith ke dalam gagang kayu atau tulang membentuk <b>alat komposit</b> — seperti panah, tombak bertangkai, atau sabit.',
            sub: [
              { t: 'Keunggulan Mikrolith', d: 'Lebih ringan dan mudah dibawa saat berpindah. Jika satu bagian rusak, hanya komponen itu yang perlu diganti — bukan seluruh alat. Efisiensi material sangat meningkat. Satu batu besar bisa menghasilkan puluhan mikrolith untuk berbagai keperluan.' },
              { t: 'Busur dan Panah — Revolusi Berburu', d: 'Busur dan panah kemungkinan besar berkembang di era Mesolitikum. Dampaknya revolusioner: bisa berburu dari jarak 30–50 meter, jauh lebih aman (tidak perlu berhadapan langsung dengan hewan berbahaya), lebih akurat, dan lebih senyap sehingga bisa menghindari membuat hewan lain lari.' },
              { t: 'Perahu dan Navigasi', d: 'Bukti tidak langsung menunjukkan manusia Mesolitikum sudah mampu membuat perahu sederhana (rakit atau kano) — terbukti dari penyebaran manusia ke pulau-pulau yang hanya bisa dicapai lewat laut, termasuk ke Australia (~50.000 SM) dan pulau-pulau Pasifik.' }
            ]
          },
          {
            t: 'Kehidupan Sosial & Kepercayaan',
            d: 'Mesolitikum menandai perkembangan sosial yang signifikan: kelompok semakin besar, identitas kelompok semakin kuat, dan sistem kepercayaan semakin kompleks.',
            sub: [
              { t: 'Perdagangan Jarak Jauh Pertama', d: 'Bukti mengejutkan dari arkeologi: batu obsidian (kaca vulkanik dari gunung berapi) ditemukan di lokasi ratusan kilometer dari sumber terdekatnya. Artinya ada pertukaran material antar kelompok yang berbeda wilayah — cikal bakal perdagangan! Pertukaran ini kemungkinan bukan "jual beli" tapi "gift exchange" yang membangun hubungan diplomatik.' },
              { t: 'Ritual Kematian Semakin Kompleks', d: 'Penguburan Mesolitikum lebih kompleks dari Paleolitikum: jenazah dicat dengan pigmen oker merah (simbol darah/kehidupan/kelahiran kembali), dikubur dalam posisi tertentu (duduk, fetal, atau terlentang tergantung budaya), disertai bekal kubur yang lebih kaya — perhiasan cangkang, alat batu, makanan.' }
            ]
          }
        ],
        facts: [
          'Kata "Kjokkenmodinger" memang aneh — karena berasal dari bahasa Denmark: "kjokken" (dapur) + "modding" (tumpukan sampah). Arkeolog Denmark pertama menemukannya di pesisir Denmark, lalu terkejut menemukan hal yang persis sama di Sumatera — bukti kehidupan pesisir Mesolitikum sangat mirip di seluruh dunia!',
          'Manusia Mesolitikum sudah punya "dokter gigi"! Ditemukan gigi manusia berumur 14.000 tahun di Italia yang sudah dicabut dan ditambal dengan pitch (resin pohon) — menunjukkan pengetahuan medis dasar sudah ada jauh sebelum peradaban.',
          'Kepercayaan pada kehidupan setelah mati di era Mesolitikum sangat kuat — jenazah dikubur menghadap matahari terbit, dicat merah, dan dibekali makanan untuk "perjalanan". Ini menunjukkan manusia sudah punya sistem keyakinan yang terstruktur sejak puluhan ribu tahun lalu.',
          'Manusia Mesolitikum di Asia Tenggara sudah mengenal navigasi laut — terbukti dari distribusi alat batu obsidian dari Kepulauan Filipina yang ditemukan di Malaysia dan bahkan Sulawesi. Mereka adalah pelaut pertama di Asia!'
        ]
      },
      {
        id: 'neo', title: '🌾 Neolitikum', tag: '5.000 – 2.000 SM', tc: '#44aaff',
        difficulty: 'medium',
        desc: 'Revolusi Neolitik — perubahan terbesar dalam 10.000 tahun terakhir: dari mengumpulkan makanan menjadi memproduksi makanan.',
        sections: [
          {
            t: 'Revolusi Neolitik — Mengapa Disebut Revolusi?',
            d: 'Disebut "revolusi" bukan karena terjadi dalam semalam, tapi karena dampaknya sangat drastis dan tak terbalikkan — mengubah segalanya: cara makan, cara tinggal, cara berorganisasi, cara berpikir, dan akhirnya peradaban itu sendiri. Perubahannya dari <b>food gathering</b> (mengumpulkan makanan yang ada) ke <b>food producing</b> (menciptakan makanan yang diinginkan).',
            sub: [
              { t: 'Mengapa Revolusi Ini Bisa Terjadi?', d: 'Kombinasi beberapa faktor yang bertemu pada waktu yang sama: (1) Iklim Holosen yang lebih hangat dan stabil setelah Zaman Es. (2) Populasi bertambah melebihi kapasitas dukung lingkungan berburu-meramu. (3) Akumulasi pengetahuan selama ribuan tahun tentang siklus tumbuhan — manusia sudah "tahu" kapan dan di mana tanaman tumbuh, tinggal selangkah lagi ke bertani.' },
              { t: 'Dampak Berantai yang Mengubah Dunia', d: '(1) Menetap untuk merawat tanaman → (2) Penyimpanan surplus pangan → (3) Tidak semua orang harus mencari makan → (4) Spesialisasi kerja: pengrajin, pedagang, pemimpin, dukun → (5) Muncul pemilikan harta dan lahan → (6) Pertidaksamaan sosial → (7) Hukum dan pemerintahan untuk mengatur konflik → (8) Kota dan peradaban. Pertanian adalah akar semua ini!' }
            ]
          },
          {
            t: 'Pertanian Pertama — Kapan dan Di Mana?',
            d: 'Pertanian tidak ditemukan di satu tempat lalu menyebar ke seluruh dunia — ia muncul SECARA INDEPENDEN di beberapa tempat yang berbeda, hampir bersamaan.',
            sub: [
              { t: 'Fertile Crescent — Tempat Lahir Pertanian Barat', d: 'Lembah "Bulan Sabit Subur" (Irak, Suriah, Israel, Yordania): gandum emmer dan jelai pertama didomestikasi ~9.500 SM. Kambing dan domba pertama dijinakkan ~9.000 SM. Ini asal-usul pertanian yang kelak menjadi dasar peradaban Mesir Kuno, Yunani, dan seluruh Eropa.' },
              { t: 'Cina — Kelahiran Padi', d: 'Lembah Yangtze, Cina: padi pertama didomestikasi ~8.500 SM, millet di lembah Kuning ~7.000 SM. Dari sinilah pertanian padi menyebar ke Korea, Jepang, Asia Tenggara, dan akhirnya ke Nusantara melalui gelombang migrasi panjang selama ribuan tahun.' },
              { t: 'Nusantara — Tanaman Asli Tropis', d: 'Di Asia Tenggara termasuk Nusantara, tanaman yang pertama dibudidayakan berbeda: <b>ubi (talas/taro), sagu, kelapa, pisang, sukun</b>, dan kemudian padi basah. Ini bukan "meniru" pertanian Timur Tengah — ini sistem pertanian tropis yang dikembangkan secara independen, disesuaikan dengan ekologi hutan tropis yang sangat berbeda.' },
              { t: 'Amerika — Jagung yang Mengubah Dunia', d: 'Di Meksiko, jagung (maize) didomestikasi dari teosinte liar ~7.000 SM — transformasi yang memerlukan ribuan tahun seleksi. Di Peru: kentang, quinoa, llama. Seluruh peradaban Maya, Aztec, dan Inca dibangun di atas fondasi pertanian ini.' }
            ]
          },
          {
            t: 'Peternakan — Revolusi Protein',
            d: 'Bersamaan dengan pertanian, manusia Neolitikum mulai menjinakkan hewan untuk sumber protein yang lebih stabil dibanding berburu.',
            sub: [
              { t: 'Urutan Domestikasi Hewan', d: '<b>Anjing</b> (~15.000 SM) — pertama dari semua hewan, dari serigala abu-abu; awalnya untuk perburuan dan keamanan. <b>Kambing dan domba</b> (~9.000 SM) — untuk daging, susu, dan wol. <b>Sapi</b> (~8.000 SM) — daging, susu, dan tenaga tarik. <b>Babi</b> (~7.000 SM) — daging dan pembuang sampah organik. <b>Ayam</b> (~5.000 SM) — dari ayam hutan Asia Selatan.' },
              { t: 'Dampak Susu pada Genetika Manusia', d: 'Menariknya: manusia dewasa pada awalnya tidak bisa mencerna susu (laktosa). Setelah ribuan tahun berternak sapi, gen toleransi laktosa bermutasi dan menyebar pada populasi yang menggantungkan diri pada susu — bukti nyata bahwa budaya bisa mengubah genetika manusia!' }
            ]
          },
          {
            t: 'Perubahan Sosial Fundamental',
            d: 'Menetap + surplus pangan = perubahan sosial paling dramatik dalam sejarah manusia. Masyarakat yang sebelumnya setara kini mulai terpecah menjadi kelas-kelas sosial.',
            sub: [
              { t: 'Lahirnya Ketimpangan', d: 'Siapa yang memiliki lahan lebih subur, atau benih lebih unggul, atau mengontrol irigasi, akan menghasilkan surplus lebih besar. Surplus = kekuatan. Untuk pertama kalinya dalam sejarah, sebagian orang bisa SANGAT kaya sementara yang lain miskin — dan kekayaan ini bisa diwariskan ke anak cucu. Ketimpangan mulai terlembaga.' },
              { t: 'Spesialisasi Kerja', d: 'Tidak semua orang harus mencari makan. Sebagian bisa fokus membuat gerabah (tembikar), membangun rumah kayu atau bambu, menjadi dukun/pemimpin spiritual, atau memimpin komunitas. Spesialisasi ini mendorong kemajuan teknologi yang eksponensial.' },
              { t: 'Konsep Kepemilikan & Hukum Pertama', d: 'Lahan pertanian memerlukan batas yang jelas dan konsep "milik". Untuk pertama kalinya manusia berselisih dan berperang tentang batas tanah — cikal bakal hukum kepemilikan dan pemerintahan. Pertanian bukan hanya menciptakan makanan, ia menciptakan konflik — dan sistem untuk menyelesaikan konflik.' },
              { t: 'Peran Perempuan yang Berubah', d: 'Dalam masyarakat berburu-meramu, perempuan menyediakan 60–80% kalori melalui meramu — sangat dihargai. Di masyarakat pertanian Neolitikum, pekerjaan "perempuan" (pengolahan pangan, kerajinan, mengasuh anak) dianggap bernilai lebih rendah dari pekerjaan "laki-laki" (membajak, beternak). Inilah momen awal patriarki.' }
            ]
          },
          {
            t: 'Teknologi Neolitikum',
            d: 'Kemajuan teknologi di era Neolitikum sangat pesat dan berdampak langsung pada kehidupan sehari-hari.',
            sub: [
              { t: 'Kapak Lonjong & Kapak Persegi', d: '<b>Kapak lonjong</b>: penampang melintang oval/lonjong, diasah halus dari segala sisi, tangkainya dimasukkan dalam lubang. Dibawa migrasi dari Cina ke seluruh Asia Tenggara. <b>Kapak persegi</b>: penampang melintang persegi empat, sisi atas datar, menyebar dari daratan Asia. Di Indonesia: kapak lonjong dominan di Indonesia Timur, kapak persegi di Indonesia Barat.' },
              { t: 'Gerabah (Tembikar) — Revolusi Penyimpanan', d: 'Penemuan gerabah mengubah segalanya. Untuk pertama kali manusia bisa: menyimpan air dan biji-bijian dalam jumlah besar (surplus!), memasak makanan bertekstur lunak (sup, bubur) yang lebih mudah dimakan oleh bayi dan orang tua, dan mengangkut cairan. Gerabah Neolitikum sudah dihias dengan motif geometris — awal seni dekoratif yang kemudian berkembang menjadi seni keramik.' },
              { t: 'Tenun & Tekstil', d: 'Bukti tenun paling awal berumur ~7.000 SM dari serat rami di Turki. Di Nusantara, tenun dari kulit kayu (tapa) kemungkinan sudah ada di Neolitikum. Tekstil mengubah pakaian dari sekadar kulit hewan menjadi barang seni, identitas budaya, dan komoditas perdagangan.' },
              { t: 'Konstruksi Rumah', d: 'Dari tenda sementara ke rumah semi-permanen dari kayu, bambu, dan tanah liat. Di Nusantara: rumah panggung (rumah di atas tiang) mungkin sudah mulai berkembang di Neolitikum — adaptasi terhadap iklim tropis lembab dan ancaman binatang buas.' }
            ]
          }
        ],
        timeline: [
          { date: '9.500 SM', desc: 'Pertanian gandum pertama di Fertile Crescent, Timur Tengah', color: '#44cc88' },
          { date: '8.500 SM', desc: 'Domestikasi padi pertama di Lembah Yangtze, Cina', color: '#44cc88' },
          { date: '7.000 SM', desc: 'Jagung pertama didomestikasi di Meksiko', color: '#ffaa44' },
          { date: '6.000 SM', desc: 'Pertanian menyebar ke Asia Tenggara, termasuk kawasan Nusantara', color: '#44aaff' },
          { date: '5.000 SM', desc: 'Desa-desa pertanian permanen terbentuk di seluruh penjuru Asia', color: '#44aaff' },
          { date: '4.000 SM', desc: 'Irigasi pertama di Mesopotamia, produktivitas pertanian meledak', color: '#ffcc00' },
          { date: '3.500 SM', desc: 'Bajak pertama (dengan tenaga hewan) merevolusi pertanian skala besar', color: '#ffcc00' },
          { date: '3.000 SM', desc: 'Kota pertama muncul di Mesopotamia — pertanian memungkinkan urbanisasi', color: '#ff8844' },
        ],
        facts: [
          'Pertanian padi di Yangtze dimulai ~9.000 tahun lalu dan butuh sekitar 3.000 tahun untuk menyebar dari Cina ke Nusantara — bukan melalui satu gelombang migrasi tunggal, tapi melalui ratusan generasi manusia yang perlahan bergerak ke selatan dan tenggara.',
          'Menetap karena bertani juga berarti hidup berdekatan dengan kotoran hewan ternak. Inilah yang menyebabkan wabah penyakit pertama dalam sejarah manusia! Penyakit seperti cacar, influenza, dan TB adalah "hadiah" dari domestikasi hewan — tapi juga yang memberi populasi petani kekebalan terhadap penyakit yang kemudian memusnahkan populasi pemburu-meramu yang terisolasi.',
          'Rata-rata tinggi tubuh manusia justru MENURUN sekitar 5–10 cm di zaman Neolitikum dibanding Paleolitikum — diet berbasis biji-bijian kurang bervariasi dan kurang bergizi dibanding diet berburu-meramu yang kaya protein hewani dan beragam sayuran liar. Ironisnya, pertanian membuat manusia lebih banyak tapi lebih pendek dan kurang sehat!',
          'Bir ditemukan sebelum roti! Arkeolog menemukan bukti fermentasi biji-bijian untuk membuat minuman beralkohol berumur ~13.000 tahun di Israel — mungkin bahkan sebelum pertanian resmi dimulai. Sebagian ilmuwan berspekulasi bahwa keinginan akan bir-lah yang mendorong manusia mulai menanam biji-bijian secara sistematis!'
        ]
      },
      {
        id: 'mega', title: '🗿 Megalitikum', tag: '3.000 – 500 SM', tc: '#cc88ff',
        difficulty: 'medium',
        desc: 'Zaman batu besar. Manusia membangun monumen batu raksasa untuk leluhur, ritual, dan astronomi — tanpa mesin, tanpa semen.',
        sections: [
          {
            t: 'Definisi, Konteks & Mengapa Megalit?',
            d: 'Megalitikum (Yunani: <b>mega</b>=besar, <b>lithos</b>=batu) bukan zaman tersendiri yang menggantikan Neolitikum — melainkan <b>tradisi budaya</b> yang berkembang pada akhir Neolitikum dan berlanjut ke era logam. Bisa berlangsung bersamaan dengan era perundagian di daerah berbeda. Ciri khas: bangunan monumental dari batu-batu besar tanpa semen atau perekat kimiawi.',
            sub: [
              { t: 'Mengapa Membangun Megalit?', d: 'Motivasi sangat beragam tergantung budaya: <b>Penghormatan leluhur</b> (roh leluhur dianggap masih ada dan perlu "rumah"). <b>Ritual kematian</b> — kubur megah untuk orang penting. <b>Kalender astronomis</b> — Stonehenge menandai solstis dengan presisi menakjubkan. <b>Penanda batas wilayah</b> suku. <b>Simbol kekuasaan</b> pemimpin. Satu megalit bisa punya beberapa fungsi sekaligus.' },
              { t: 'Syarat Sosial yang Dibutuhkan', d: 'Membangun megalit bukan proyek sembarangan — memerlukan: ratusan orang bekerja bersama selama bertahun-tahun, pemimpin yang diakui otoritasnya, sistem pengorganisasian kerja, surplus pangan untuk menghidupi pekerja yang tidak bertani, dan pengetahuan teknik (tali, tuas, bidang miring, rol kayu). Ini semua bukti masyarakat sudah sangat terorganisir!' }
            ]
          },
          {
            t: 'Jenis-jenis Megalit di Indonesia — Terkaya di Dunia',
            d: 'Indonesia adalah salah satu negara dengan warisan megalitik paling kaya dan beragam di dunia. Tradisi megalitik bahkan masih hidup di beberapa daerah hingga hari ini!',
            sub: [
              { t: 'Menhir — Tiang Batu Berdiri', d: 'Batu tunggal berdiri tegak, bisa setinggi 1–8 meter. Fungsi: tempat roh leluhur bersemayam sehingga bisa dipuja, tanda batas wilayah suku, atau memorial seseorang yang meninggal. Ditemukan di Sumatera (terutama Sumatera Selatan dan Bengkulu), Jawa, Sulawesi, dan Flores. Di Nagari Talang Batu, Sumatera Barat terdapat menhir setinggi lebih dari 4 meter!' },
              { t: 'Dolmen — Meja Batu Raksasa', d: 'Dua atau lebih batu vertikal menopang satu batu datar di atasnya seperti meja. Fungsi: altar untuk menaruh sesaji (persembahan) kepada roh leluhur, atau kubur di mana jenazah diletakkan di bawah batu datar. Sering ditemukan berpasangan atau berkelompok dengan menhir. Ditemukan di Sumatera, Jawa, dan Sulawesi.' },
              { t: 'Sarkofagus — Peti Mati Batu', d: 'Peti mati monolitik dari batu — isinya dipahat dari satu batu besar. Khas Bali kuno (terutama ditemukan di situs-situs Bali Kuno). Biasanya berbentuk perahu atau hewan mitologis (kepiting, buaya). Jenazah diletakkan bersama bekal kubur (perhiasan, tembikar, alat). Beberapa sarkofagus Bali didekorasi dengan motif manusia berkepala hewan.' },
              { t: 'Waruga — Kubur Silinder Minahasa', d: 'Kubur batu berbentuk silinder dengan tutup berbentuk kerucut atau pelana, khas Minahasa, Sulawesi Utara. Yang membuat unik: jenazah dimasukkan dalam posisi <b>fetal</b> (meringkuk seperti bayi dalam kandungan) — melambangkan kematian sebagai "kembali ke rahim bumi" untuk dilahirkan kembali. Ribuan waruga ditemukan di desa-desa Minahasa!' },
              { t: 'Punden Berundak — Cikal Bakal Candi', d: 'Bangunan berundak (bertingkat) dari batu dan tanah, menyerupai piramida bertangga. Ini adalah <b>cikal bakal arsitektur candi</b> Hindu-Buddha di Nusantara! Berfungsi sebagai tempat pemujaan leluhur dan dewa alam — semakin tinggi undakan, semakin suci. Situs terbesar: Gunung Padang (Cianjur) dan beberapa situs di Jawa Barat.' },
              { t: 'Arca (Patung) Megalitik', d: 'Patung batu berbentuk manusia atau hewan mitologis. Khas Sumatera Selatan (situs Besemah/Pagaralam) dan Sulawesi Tengah (Lembah Bada dan Napu). Arca Besemah menggambarkan prajurit berbaju besi dengan ekspresi ekspresif — menunjukkan kemampuan seni pahat yang sangat tinggi.' }
            ]
          },
          {
            t: 'Sistem Kepercayaan Megalitikum',
            d: 'Megalitikum menandai perkembangan kepercayaan yang paling kompleks sebelum masuknya agama-agama besar.',
            sub: [
              { t: 'Animisme — Semua Punya Roh', d: 'Kepercayaan bahwa SEMUA benda di alam memiliki roh (anima): pohon tua, batu besar, sungai, gunung, angin, bahkan peralatan. Manusia harus menjaga hubungan harmonis dengan roh-roh ini melalui ritual, sesaji, dan pantangan. Pelanggaran = bencana. Animisme adalah fondasi kepercayaan yang masih tersisa dalam banyak tradisi adat Indonesia.' },
              { t: 'Dinamisme — Kekuatan Gaib (Mana)', d: 'Kepercayaan pada kekuatan gaib yang tidak berpribadi — disebut <b>mana</b> dalam tradisi Austronesia — yang terkandung dalam benda-benda tertentu: batu meteroit, keris tua, tulang harimau, bulu burung tertentu. Benda itu bisa memberikan kekuatan, perlindungan, atau keberuntungan kepada pemegangnya. Inilah asal-usul jimat dan pusaka dalam budaya Nusantara.' },
              { t: 'Pemujaan Leluhur', d: 'Inti dari tradisi megalitik: leluhur yang sudah meninggal tidak benar-benar pergi — roh mereka masih ada dan bisa membantu atau mengganggu kehidupan orang yang masih hidup. Maka perlu "rumah" yang megah (megalit) untuk roh leluhur, dan ritual reguler (sesaji, doa) untuk menjaga hubungan baik. Ini masih hidup kuat dalam tradisi Toraja, Batak, dan Nias.' }
            ]
          },
          {
            t: 'Gunung Padang — Misteri Arkeologi Terbesar Indonesia',
            d: 'Situs Gunung Padang di Cianjur, Jawa Barat adalah punden berundak terbesar di Asia Tenggara dengan luas ~900 m². Namun penelitian terbaru (2023, tim Dr. Danny Hilman Natawidjaja) menghasilkan klaim kontroversial yang menggemparkan dunia.',
            sub: [
              { t: 'Temuan Menggemparkan', d: 'Menggunakan ground-penetrating radar dan pengeboran, tim menemukan ada struktur di bawah permukaan yang jauh lebih dalam. Penanggalan radiokarbon lapisan terdalam menunjukkan usia 25.000–14.000 tahun — jauh sebelum pertanian ditemukan! Jika benar, ini berarti manusia membangun struktur arsitektur kompleks saat masih berburu-meramu.' },
              { t: 'Kontroversi Ilmiah', d: 'Klaim ini ditolak keras oleh banyak arkeolog. Argumen kontra: sampel yang dipenanggalan mungkin bukan artefak tapi sedimen alam, metodologi diragukan, dan tidak ada paralel di mana pun di dunia untuk konstruksi megalitik 25.000 tahun lalu. Perdebatan masih sangat sengit di komunitas ilmiah internasional.' },
              { t: 'Nilai yang Tidak Terbantahkan', d: 'Terlepas dari kontroversi usia, Gunung Padang jelas merupakan situs arkeologi sangat penting: punden berundak dengan 5 teras bertingkat, ribuan pilar batu andesit berbentuk prisma heksagonal yang ditata dengan sangat presisi, dan bukti penggunaan berulang selama ribuan tahun.' }
            ]
          },
          {
            t: 'Stonehenge & Megalit Dunia',
            d: 'Untuk memahami skala kehebatan megalitikum, penting membandingkan dengan situs-situs ikonik dunia.',
            sub: [
              { t: 'Stonehenge, Inggris', d: 'Dibangun dalam 3 fase selama 1.500 tahun (3.000–1.500 SM). Batu terbesar (Sarsen Stones) beratnya 25 ton dan dibawa dari Marlborough Downs, 25 km jauhnya. Batu biru (Blue Stones) beratnya 4 ton dan berasal dari Preseli Hills, Wales — 250 km jauhnya! Bagaimana cara membawanya masih menjadi perdebatan.' },
              { t: 'Göbekli Tepe, Turki', d: 'Situs megalitik TERTUA yang diketahui: berumur 11.600 tahun! Anehnya, dibangun oleh pemburu-meramu SEBELUM pertanian ada. Ini membalikkan teori bahwa masyarakat kompleks butuh pertanian dulu. Mungkin kebutuhan membangun tempat suci yang mendorong manusia mulai menetap dan bertani!' }
            ]
          }
        ],
        facts: [
          'Stonehenge bukan satu-satunya lingkaran batu di Inggris — ada lebih dari 900 lingkaran batu di seluruh Kepulauan Britania! Dan Stonehenge bukan yang terbesar: Avebury, 30 km dari Stonehenge, punya lingkaran batu yang jauh lebih besar dan mengelilingi seluruh desa.',
          'Di Nias, Sumatera Utara, tradisi megalitik masih HIDUP hingga hari ini. Beberapa desa Nias masih mendirikan menhir baru untuk upacara "owasa" (pesta adat) — menjadikan Nias salah satu satu tempat di dunia di mana tradisi Neolitikum masih dipraktikkan langsung, bukan hanya diingat.',
          'Cara mengangkut batu megalit tanpa mesin masih diteliti. Eksperimen modern membuktikan: 50 orang menggunakan tali, rol kayu, dan bidang miring bisa memindahkan batu 10 ton sejauh 100 meter per hari. Untuk jarak 250 km seperti Blue Stones Stonehenge, butuh beberapa bulan perjalanan dengan ratusan orang.',
          'Situs Besemah (Pagaralam, Sumatera Selatan) menyimpan arca megalitik yang menggambarkan prajurit dengan baju besi dan mengendarai kerbau atau gajah — gambaran yang sangat vivid tentang kehidupan dan peperangan di era megalitikum Nusantara, lebih dari 2.000 tahun lalu.'
        ]
      },
      {
        id: 'perd', title: '🔨 Perundagian', tag: '1.500 – 300 SM', tc: '#ffcc00',
        difficulty: 'advanced',
        desc: 'Era logam. Manusia menguasai metalurgi — melebur batu bijih menjadi perunggu dan besi — revolusi industri pertama dalam sejarah.',
        sections: [
          {
            t: 'Revolusi Metalurgi — Mengapa Logam Mengubah Segalanya?',
            d: 'Kemampuan melebur logam dari batu bijih adalah pencapaian teknologi paling revolusioner di praaksara. Logam mengubah hampir setiap aspek kehidupan: pertanian, peperangan, perdagangan, dan stratifikasi sosial. Urutan perkembangan: <b>Tembaga → Perunggu → Besi</b>.',
            sub: [
              { t: 'Keunggulan Fundamental Logam', d: 'Batu: jika retak, selesai — buang dan cari batu baru. Logam: jika rusak, bisa dilebur ulang, dicetak ulang, diasah berulang kali. Satu bongkahan logam bisa menjadi kapak, kemudian tombak, kemudian jarum, lalu cangkul — sesuai kebutuhan. Fleksibilitas dan daur ulang inilah keunggulan terbesar logam.' },
              { t: 'Bagaimana Manusia Menemukan Metalurgi?', d: 'Kemungkinan besar tidak disengaja: batu hijau (malachite, bijih tembaga) digunakan sebagai cat tubuh dan dilempar ke api unggun. Panas api melebur bijih dan menghasilkan tembaga cair yang mengeras menjadi logam. Pengamatan kebetulan yang kemudian dikembangkan selama berabad-abad menjadi ilmu metalurgi.' },
              { t: 'Distribusi Bijih Logam & Perdagangan', d: 'Bijih logam tidak tersebar merata di seluruh dunia — beberapa daerah kaya, banyak daerah tidak punya sama sekali. Ini menciptakan kebutuhan perdagangan jarak jauh yang intens, jalur-jalur niaga yang menjadi cikal bakal jalur perdagangan, dan kekuasaan politik bagi daerah yang mengontrol sumber atau jalur bijih logam.' }
            ]
          },
          {
            t: 'Teknik Pembuatan Logam',
            d: 'Dua teknik utama yang dikembangkan pengrajin Nusantara kuno untuk menciptakan artefak logam kompleks:',
            sub: [
              { t: 'Bivalve — Cetakan Dua Bagian', d: 'Membuat cetakan dari dua bagian batu atau tanah liat yang disatukan membentuk rongga berbentuk alat yang diinginkan. Logam cair dituang ke dalam rongga, dibiarkan mengeras, cetakan dibuka. Keunggulan: cetakan bisa digunakan berkali-kali untuk produksi massal alat standar seperti kapak, tombak, dan pisau. Cocok untuk bentuk sederhana dan simetris.' },
              { t: 'A Cire Perdue — Teknik Lilin Hilang', d: 'Proses kompleks 6 tahap: (1) Buat model sempurna dari lilin lebah. (2) Lapisi seluruh model dengan tanah liat dan biarkan mengering. (3) Panaskan — lilin meleleh dan keluar, meninggalkan rongga berbentuk sempurna di dalam tanah liat. (4) Tuang logam cair ke dalam rongga. (5) Biarkan mengeras sempurna. (6) Pecahkan cetakan tanah liat. Cetakan TIDAK bisa digunakan lagi. Digunakan untuk karya masterpiece: nekara, arca, dan perhiasan kompleks.' },
              { t: 'Keahlian Undagi — Kelas Tersendiri', d: 'Pengrajin logam disebut <b>undagi</b> di Nusantara. Mereka adalah kelas sosial tersendiri yang sangat dihormati sekaligus ditakuti — pengetahuan metalurgi bersifat rahasia, diwariskan hanya dalam keluarga atau kelompok tertentu. Kemampuan "mengubah batu menjadi logam" dianggap memiliki kekuatan gaib.' }
            ]
          },
          {
            t: 'Peninggalan Perundagian Indonesia — Kelas Dunia',
            d: 'Indonesia menyimpan koleksi artefak perunggu kuno yang menunjukkan kemahiran metalurgi tingkat tinggi dari pengrajin Nusantara.',
            sub: [
              { t: 'Nekara — Gendang Perunggu Sakral', d: 'Gendang perunggu besar berbentuk jamur terbalik, dihias motif geometris, burung, gajah, dan adegan upacara. Fungsi: memanggil hujan, mengiringi upacara kematian, dan sebagai simbol kekuasaan. <b>Moon of Pejeng</b> di Bali adalah nekara tunggal terbesar di dunia — tinggi 1,86 meter, diameter 160 cm, dibuat dengan teknik a cire perdue yang sangat presisi. Dipercaya warga sebagai bulan yang jatuh dari langit!' },
              { t: 'Kapak Corong — Inovasi Ergonomis', d: 'Kapak perunggu dengan "corong" berlubang sebagai tempat memasukkan tangkai kayu — desain yang jauh lebih kuat dari sekadar mengikat kapak ke tangkai. Fungsi ganda: alat pertanian sehari-hari DAN benda upacara. Ditemukan dalam berbagai ukuran di seluruh Indonesia dan Asia Tenggara — bukti jaringan produksi dan perdagangan yang luas.' },
              { t: 'Bejana Perunggu', d: 'Wadah berbentuk periuk/tong besar dari perunggu, dihias motif geometris spiral dan figur hewan. Fungsi: menyimpan benda berharga, wadah upacara, atau simbol status. Khas Asia Tenggara Kepulauan — ditemukan di Sumatera, Jawa, Kalimantan, dan Sulawesi. Menunjukkan koneksi budaya regional yang sangat kuat melalui jalur maritim.' },
              { t: 'Perhiasan Perunggu & Emas', d: 'Gelang, anting, kalung, dan cincin dari perunggu dan emas ditemukan di situs-situs perundagian. Beberapa memiliki kualitas artistik luar biasa dengan filigri (ukiran halus) yang membuktikan pengrajin Nusantara sudah menguasai teknik perhiasan halus ribuan tahun lalu.' }
            ]
          },
          {
            t: 'Dampak Sosial, Ekonomi & Militer',
            d: 'Logam bukan hanya soal alat yang lebih baik — ia secara fundamental mengubah struktur masyarakat, ekonomi, dan cara berperang.',
            sub: [
              { t: 'Peperangan yang Lebih Mematikan', d: 'Senjata logam (pedang, tombak berujung perunggu, helm) jauh lebih mematikan dan tahan lama dari batu. Ini mendorong munculnya <b>tentara profesional</b> yang khusus berlatih berperang, <b>benteng-benteng</b> untuk perlindungan, dan <b>strategi militer</b> yang lebih kompleks. Peperangan menjadi lebih terorganisir dan lebih mematikan.' },
              { t: 'Pertanian yang Lebih Produktif', d: 'Cangkul dan bajak dari logam jauh lebih efisien dari kayu atau batu. Bisa membajak lahan yang lebih keras dan lebih dalam, meningkatkan produktivitas pertanian secara dramatis. Lebih banyak makanan = mendukung populasi yang lebih besar dan lebih banyak spesialisasi pekerjaan.' },
              { t: 'Jaringan Perdagangan Regional', d: 'Karena bijih logam tidak tersebar merata, daerah kaya bijih jadi pusat produksi dan ekspor. Jalur perdagangan perunggu dan besi menghubungkan seluruh Asia Tenggara — inilah fondasi jaringan maritim Nusantara yang kemudian berkembang menjadi jalur rempah. Pedagang logam adalah orang-orang terkaya dan paling berpengaruh.' }
            ]
          },
          {
            t: 'Kebudayaan Dongson — Pengaruh Regional',
            d: 'Kebudayaan Dongson dari Vietnam Utara (~1.000 – 200 SM) adalah pusat metalurgi perunggu terbesar Asia Tenggara yang mempengaruhi seluruh kawasan termasuk Nusantara.',
            sub: [
              { t: 'Pengaruh pada Nusantara', d: 'Nekara bergaya Dongson ditemukan di seluruh Nusantara: Sumatera, Jawa, Bali, Lombok, Sumbawa, Flores, Selayar, Kalimantan — membuktikan jaringan perdagangan laut yang sangat aktif. Motif hias geometris Dongson (spiral, bintang, figur perahu) menjadi standar estetika perunggu Asia Tenggara.' },
              { t: 'Teknologi Transfer', d: 'Bukan hanya barang yang diperdagangkan — tapi juga pengetahuan. Pengrajin logam dari Vietnam Utara kemungkinan berpindah dan mengajarkan teknik mereka kepada pengrajin lokal, yang kemudian mengembangkan gaya Nusantara sendiri. Ini adalah globalisasi pertama dalam sejarah Nusantara.' }
            ]
          }
        ],
        table: {
          headers: ['Logam', 'Komposisi', 'Titik Lebur', 'Keunggulan', 'Masa Dominan'],
          rows: [
            ['Tembaga', 'Cu murni', '1.085°C', 'Lunak, mudah dibentuk, tahan korosi', '5.000 – 3.000 SM'],
            ['Perunggu', 'Cu 90% + Sn 10%', '950°C', 'Lebih keras dari Cu, tidak mudah pecah', '3.000 – 1.200 SM'],
            ['Besi', 'Fe dari bijih hematit', '1.538°C', 'Paling keras, sangat melimpah', '1.200 SM – kini'],
          ]
        },
        facts: [
          'Perunggu lebih keras dari tembaga MURNI karena penambahan timah mengubah struktur kristal logam. Penemuan rasio tembaga:timah yang optimal (9:1) adalah pencapaian kimia yang luar biasa bagi manusia zaman itu — dan mungkin ditemukan secara tidak sengaja melalui eksperimen berulang selama berabad-abad.',
          'Nekara "Moon of Pejeng" di Pura Penataran Sasih, Bali dipercaya oleh masyarakat setempat sebagai "bulan yang jatuh dari langit" karena ukurannya yang sangat besar dan permukaannya yang berkilau seperti bulan. Legenda mengatakan seorang pencuri pernah mencoba mencuri dan kencing di atasnya — dan langsung meninggal. Sampai sekarang nekara ini dianggap sangat sakral dan dijaga ketat.',
          'Besi sebenarnya LEBIH UMUM dari tembaga di kerak bumi (5% vs 0,005%), tapi butuh suhu lebih tinggi (1.538°C vs 1.085°C) untuk melebur bijih besinya. Teknologi untuk mencapai suhu setinggi itu baru berkembang sekitar 1.200 SM — itulah mengapa zaman Besi datang lebih belakangan meski besi lebih melimpah.',
          'Di Nias, Sumatera Utara, ditemukan "harta karun" berupa ratusan perhiasan emas dan perunggu kuno yang menunjukkan Nias adalah pusat perdagangan logam penting di pantai barat Sumatera selama era perundagian. Beberapa perhiasan menunjukkan pengaruh budaya India, membuktikan kontak dengan peradaban luar sudah terjadi sebelum kerajaan Hindu pertama berdiri di Nusantara.'
        ]
      },

      // ============================================================
      // SEKSI GEOLOGI (isGeologi: true)
      // ============================================================
      {
        id: 'arke', title: '🔥 Arkeozoikum', tag: '4,6 miliar – 2,5 miliar tahun lalu', tc: '#ff4444',
        difficulty: 'expert',
        isGeologi: true,
        desc: 'Eon tertua bumi. Planet baru lahir dari gas dan debu kosmik, permukaan masih membara, dan kehidupan pertama muncul sebagai sel-sel mikroskopis di lautan primordial.',
        sections: [
          {
            t: 'Kelahiran Bumi — 4,6 Miliar Tahun Lalu',
            d: 'Bumi terbentuk sekitar 4,6 miliar tahun lalu dari awan gas dan debu kosmik (nebula surya) yang runtuh akibat gravitasi. Selama ratusan juta tahun pertama — disebut periode <b>Hades</b> — bumi adalah neraka: permukaan cair karena tabrakan meteorit terus-menerus, tidak ada kerak padat, tidak ada atmosfer yang stabil, dan tidak ada air cair.',
            sub: [
              { t: 'Pembentukan Bulan dari Tabrakan Raksasa', d: 'Sekitar 4,5 miliar tahun lalu, sebuah benda seukuran planet Mars (disebut Theia) menghantam bumi yang masih muda. Serpihan raksasa terlempar ke orbit dan bergabung membentuk Bulan. Inilah mengapa Bulan dan Bumi memiliki komposisi batuan yang sangat mirip — mereka lahir dari materi yang sama.' },
              { t: 'Pembentukan Samudra', d: 'Sekitar 4,4 miliar tahun lalu, bumi cukup mendingin untuk membentuk kerak padat pertama. Air berasal dari dua sumber: uap air yang terperangkap dalam batuan bumi dan keluar melalui letusan gunung berapi, serta es dari komet dan asteroid yang menghantam bumi secara terus-menerus selama jutaan tahun.' },
              { t: 'Atmosfer Purba yang Beracun', d: 'Atmosfer awal bumi sangat berbeda dari sekarang: didominasi karbon dioksida (CO₂), metana (CH₄), amonia (NH₃), dan uap air — tidak ada oksigen bebas sama sekali. Gas-gas ini adalah racun bagi kehidupan seperti yang kita kenal, tapi justru kondisi ideal untuk kemunculan molekul-molekul organik pertama.' }
            ]
          },
          {
            t: 'Asal-Usul Kehidupan — Misteri Terbesar Sains',
            d: 'Bagaimana kehidupan pertama muncul dari bahan kimia non-hidup masih menjadi salah satu pertanyaan terbesar dalam sains. Yang kita ketahui: kehidupan pertama muncul lebih cepat dari dugaan — hanya 700 juta tahun setelah bumi terbentuk.',
            sub: [
              { t: 'Hipotesis Primordial Soup (Miller-Urey)', d: 'Stanley Miller dan Harold Urey (1953) mensimulasikan atmosfer purba bumi dan menunjukkan bahwa asam amino — blok bangunan protein — bisa terbentuk secara spontan dari reaksi kimia sederhana. Percobaan revolusioner yang membuktikan "bahan baku" kehidupan bisa muncul secara alami.' },
              { t: 'Hydrothermal Vents — Kehidupan dari Kegelapan Laut', d: 'Teori yang semakin populer: kehidupan pertama muncul di sekitar mata air hidrotermal (hydrothermal vents) di dasar laut — celah-celah di kerak samudera yang menyemburkan air panas kaya mineral. Di sini ada energi kimia (bukan cahaya matahari), panas, dan bahan kimia yang bisa mendorong reaksi kimia untuk membentuk molekul organik kompleks.' },
              { t: 'Prokariota — Sel Pertama Tanpa Inti', d: 'Kehidupan pertama adalah sel prokariota: sel tanpa inti sejati, tanpa organel kompleks, hanya membran dan DNA yang mengambang bebas. Bakteri dan arkea adalah keturunan langsung sel-sel purba ini. Mereka muncul ~3,8 – 3,5 miliar tahun lalu dan mendominasi bumi selama lebih dari 2 miliar tahun — jauh lebih lama dari semua kehidupan kompleks lainnya.' }
            ]
          },
          {
            t: 'Stromatolit — Monumen Kehidupan Tertua',
            d: 'Bukti paling kuat kehidupan purba adalah <b>stromatolit</b>: struktur berlapis-lapis yang dibentuk oleh koloni bakteri sianobakteri (cyanobacteria). Fosil stromatolit tertua berumur 3,5 miliar tahun ditemukan di Pilbara, Australia Barat.',
            sub: [
              { t: 'Cara Terbentuknya', d: 'Koloni sianobakteri tumbuh sebagai lapisan tipis di dasar laut dangkal. Saat mati, lapisan mineral terbentuk di atasnya. Koloni baru tumbuh di atas lapisan mineral. Proses berulang selama ribuan tahun membentuk "kue lapis" batu berlapis yang bisa setinggi beberapa meter. Di Shark Bay, Australia, stromatolit hidup masih bisa dilihat hari ini!' },
              { t: 'The Great Oxidation Event — Bencana & Berkah', d: 'Sekitar 2,4 miliar tahun lalu, sianobakteri sudah begitu banyak sehingga produksi oksigen dari fotosintesis mereka MENGUBAH ATMOSFER BUMI secara fundamental. Kadar oksigen melonjak dari hampir nol menjadi ~2%. Bagi makhluk anaerob yang mendominasi bumi, ini bencana — "The Oxygen Catastrophe" membunuh sebagian besar kehidupan yang ada. Tapi bagi evolusi kehidupan kompleks, oksigen adalah bahan bakar yang menunggu.' }
            ]
          },
          {
            t: 'Lahirnya Sel Eukariotik — Lompatan Evolusi Terbesar',
            d: 'Sekitar 2 – 1,8 miliar tahun lalu terjadi salah satu peristiwa terpenting dalam sejarah kehidupan: kemunculan sel eukariotik — sel dengan inti sejati yang terbungkus membran dan organel-organel khusus.',
            sub: [
              { t: 'Teori Endosimbiosis', d: 'Lynn Margulis (1967) mengusulkan: sel eukariotik terbentuk ketika satu bakteri besar "menelan" bakteri kecil — tapi alih-alih mencernanya, mereka hidup bersama secara mutualistik! Mitokondria (pembangkit energi sel) adalah bakteri yang ditelan dan "menjadi bagian" dari sel inang. Begitu pula kloroplas pada tumbuhan. Evolusi terbesar melalui kerjasama, bukan kompetisi!' }
            ]
          }
        ],
        facts: [
          'Bumi purba sangat "sibuk" dihantam asteroid — periode 4,1 – 3,8 miliar tahun lalu disebut "Late Heavy Bombardment". Ribuan kawah terbentuk di seluruh permukaan bumi seperti permukaan Bulan. Tapi anehnya, justru di periode ini kehidupan pertama muncul — mungkin panas tabrakan asteroid justru mendorong reaksi kimia pembentuk kehidupan!',
          'Mitokondria di dalam sel tubuh kamu MASIH memiliki DNA sendiri yang berbeda dari DNA inti selmu — sisa dari identitas bakteri leluhurnya 2 miliar tahun lalu. Dan mitokondria membelah diri secara independen dari pembelahan sel. Kamu sejatinya adalah "komunitas" dua organisme yang hidup bersimbiosis!',
          'Jika seluruh sejarah bumi (4,6 miliar tahun) dipadatkan menjadi satu tahun kalender, maka: Bumi lahir 1 Januari, kehidupan pertama muncul akhir Februari, oksigen mengubah atmosfer pada bulan Agustus, dinosaurus muncul 13 Desember, manusia modern muncul 31 Desember pukul 23:48 — dan seluruh sejarah manusia yang tercatat hanya sekitar 10 detik terakhir di malam tahun baru!',
          'Bebatuan paling tua yang pernah ditemukan di Bumi berumur 4,28 miliar tahun — ditemukan di Kanada (Hudson Bay). Tapi ada kristal zirkon individual berumur 4,4 miliar tahun dari Australia — hampir setua Bumi itu sendiri. Kristal-kristal ini adalah "kapsul waktu" yang menyimpan informasi tentang kondisi bumi paling awal.'
        ]
      },
      {
        id: 'paleo', title: '🐚 Paleozoikum', tag: '541 – 252 juta tahun lalu', tc: '#ff8844',
        difficulty: 'advanced',
        isGeologi: true,
        desc: 'Zaman kehidupan kuno. Invertebrata laut mendominasi, ikan berevolusi, hewan pertama merangkak ke darat, dan era berakhir dengan kepunahan massal terbesar dalam sejarah.',
        sections: [
          {
            t: 'Ledakan Kambrium — Big Bang Kehidupan',
            d: 'Paleozoikum dimulai dengan peristiwa paling dramatis dalam sejarah kehidupan: <b>Cambrian Explosion</b> (~541 juta tahun lalu). Dalam rentang geologis yang sangat singkat (~20 juta tahun), hampir semua <b>filum</b> hewan modern muncul secara bersamaan — tiba-tiba ada mata, cangkang keras, sistem pencernaan, anggota gerak. Sebelumnya: hanya organisme lunak sederhana. Sesudahnya: hampir semua rencana tubuh hewan yang kita kenal.',
            sub: [
              { t: 'Mengapa Terjadi Begitu Tiba-tiba?', d: 'Beberapa hipotesis: (1) Oksigen atmosfer akhirnya cukup tinggi untuk mendukung metabolisme aktif. (2) Predasi muncul — setelah predator pertama ada, evolusi alat pertahanan (cangkang, duri) terjadi sangat cepat. (3) "Ekologi kosong" — tidak ada kompetisi, sehingga evolusi bisa bereksperimen bebas. Kemungkinan ketiga faktor ini bergabung.' },
              { t: 'Trilobit — Raja Kambrium', d: 'Trilobit adalah hewan paling ikonik Paleozoikum — arthropoda laut dengan cangkang keras tersegmentasi, mata majemuk (beberapa spesies punya 360 derajat pandang!), dan antena. Mereka hidup dan berkembang selama 270 juta tahun — jauh lebih lama dari dinosaurus (165 jt tahun) — sebelum akhirnya punah di akhir Permian.' },
              { t: 'Fauna Burgess Shale — Kehidupan "Aneh" yang Punah', d: 'Di British Columbia, Kanada, fosil Burgess Shale menyimpan hewan-hewan yang tidak mirip apapun yang hidup sekarang: Hallucigenia (berduri dan berkaki aneh), Anomalocaris (predator raksasa bermata stalked setinggi 1 meter!), Opabinia (5 mata, belalai seperti selang). Evolusi sedang "bereksperimen" dengan berbagai desain tubuh — banyak yang gagal dan punah.' }
            ]
          },
          {
            t: 'Enam Periode Paleozoikum',
            d: 'Paleozoikum dibagi menjadi 6 periode berdasarkan perubahan kehidupan yang signifikan:',
            sub: [
              { t: 'Kambrium (541–485 jtl)', d: 'Explosion kehidupan laut. Trilobit mendominasi. Semua kehidupan masih di laut. Tidak ada kehidupan darat sama sekali.' },
              { t: 'Ordovisium (485–444 jtl)', d: 'Diversifikasi laut luar biasa — terumbu karang pertama, moluska, ikan tanpa rahang pertama (Agnatha). Berakhir dengan kepunahan massal kedua terbesar: 85% spesies punah akibat glasiasi besar.' },
              { t: 'Silur (444–419 jtl)', d: 'Pemulihan setelah kepunahan. Ikan dengan rahang pertama (Gnathostomata) — revolusioner! Tumbuhan pertama di darat (lumut dan tanaman vaskular primitif). Arthropoda darat pertama (kalajengking dan kelabang).' },
              { t: 'Devon (419–359 jtl)', d: '"Age of Fishes" — ikan mendominasi lautan. Hutan pertama di bumi (pohon Archaeopteris). Amfibi pertama merangkak ke darat (~375 jtl) dari ikan bersirip daging seperti Tiktaalik. Devon berakhir dengan kepunahan massal besar yang membunuh 75% spesies.' },
              { t: 'Karbon (359–299 jtl)', d: 'Hutan raksasa dari pohon lycopsid dan sigillaria (setinggi 40 meter!) menutupi daratan. Reptil pertama — bisa bertelur di darat, tidak perlu air lagi. Iklim hangat dan lembab, kadar oksigen tinggi (35%) — serangga raksasa! Kecoak sudah ada dan belum berubah hingga sekarang.' },
              { t: 'Permian (299–252 jtl)', d: 'Superbenua Pangaea terbentuk sempurna — iklim semakin kering dan panas di interior. Reptil semakin beragam. Berakhir dengan <b>Kepunahan Massal Permian-Trias</b> ("The Great Dying") — kepunahan TERBESAR dalam sejarah: 96% spesies laut dan 70% spesies darat punah.' }
            ]
          },
          {
            t: 'Hewan Pertama ke Darat — Momen Paling Penting',
            d: 'Sekitar 375 juta tahun lalu, ikan bersirip daging (lobe-finned fish) mulai menjelajahi daerah pasang-surut dan kolam dangkal di tepi sungai. Beberapa mengembangkan kemampuan luar biasa: bernapas udara menggunakan paru-paru primitif dan berjalan menggunakan sirip yang berfungsi seperti lengan.',
            sub: [
              { t: 'Tiktaalik — Fosil Penghubung yang Dicari', d: 'Ditemukan di Kanada (2004), Tiktaalik adalah hewan yang sempurna berada di antara ikan dan amfibi: memiliki insang tapi juga paru-paru, memiliki sisik tapi juga leher yang bisa menoleh, dan siripnya memiliki tulang-tulang yang homolog dengan bahu, lengan atas, lengan bawah, dan pergelangan tangan manusia. Ini nenek moyang semua vertebrata darat termasuk kita!' },
              { t: 'Mengapa Ke Darat?', d: 'Mungkin untuk menghindari predator di air, atau mencari kolam air yang masih ada saat musim kering, atau memanfaatkan sumber makanan baru di darat (serangga awal). Bukan karena "ingin" — tapi karena yang bisa bertahan di tepi daratan punya keunggulan reproduktif.' }
            ]
          },
          {
            t: '"The Great Dying" — Kepunahan Permian',
            d: 'Akhir Paleozoikum (~252 jtl) ditandai kepunahan massal terbesar dalam sejarah kehidupan. Penyebab utama: letusan gunung berapi Siberian Traps yang berlangsung selama ~1 juta tahun, melepaskan karbon dioksida dan sulfur dalam jumlah astronomis.',
            sub: [
              { t: 'Skala Bencana', d: '96% spesies laut dan 70% spesies darat punah. Lebih dari 90% semua spesies yang pernah ada di bumi musnah. Lautan menjadi asam. Suhu global naik 10-15°C. Lapisan ozon rusak. Butuh 10 juta tahun bagi kehidupan untuk pulih ke tingkat keanekaragaman sebelumnya.' },
              { t: 'Pemenang yang Selamat', d: 'Yang berhasil melewati kepunahan Permian: reptil primitif (yang kemudian berevolusi menjadi dinosaurus dan mamalia), beberapa ikan, dan serangga. Dari sisa-sisa 4% spesies yang selamat inilah seluruh kehidupan Mesozoikum dan seterusnya berevolusi.' }
            ]
          }
        ],
        facts: [
          'Batubara yang dibakar di pembangkit listrik hari ini sebagian besar adalah sisa hutan raksasa zaman Karbon (~300 jtl). Pohon-pohon itu mati dan tenggelam ke rawa, tapi tidak bisa diurai! Mengapa? Karena jamur pengurai lignin (zat kayu) belum berevolusi — mereka baru muncul beberapa juta tahun kemudian. Jadi hutan itu "menumpuk" selama jutaan tahun hingga menjadi batu bara.',
          'Di zaman Karbon, kadar oksigen mencapai 35% (sekarang 21%). Akibatnya serangga bisa tumbuh raksasa karena pernapasan serangga bergantung pada difusi oksigen pasif — lebih banyak oksigen, lebih besar tubuh yang bisa didukung. Capung Meganeura punya sayap selebar 65 cm — lebih besar dari gagak! Kecoak sepanjang 45 cm. Kalajengking laut (sea scorpion) sepanjang 2,5 meter!',
          'Trilobit memiliki mata kristal kalsit yang secara optik sempurna — para ahli optik abad ke-20 menemukan bahwa desain lensa trilobit IDENTIK dengan desain lensa yang secara independen dikembangkan oleh matematikawan Descartes dan Huygens pada abad ke-17 untuk meminimalkan aberasi cahaya. Hewan berevolusi solusi optik yang sama dengan matematika tingkat tinggi!',
          '"The Great Dying" di akhir Permian sangat parah sehingga ada periode di mana hampir tidak ada batuan batubara sama sekali selama beberapa juta tahun — menunjukkan bahkan hutan di darat hampir musnah total. Para geolog menyebutnya "the Coal Gap". Bumi menjadi planet yang hampir kosong dari kehidupan kompleks selama jutaan tahun.'
        ]
      },
      {
        id: 'meso2', title: '🦕 Mesozoikum', tag: '252 – 66 juta tahun lalu', tc: '#44dd88',
        difficulty: 'advanced',
        isGeologi: true,
        desc: 'Era dinosaurus. Reptil mendominasi darat, laut, dan udara selama 186 juta tahun sebelum dimusnahkan oleh asteroid raksasa 66 juta tahun lalu.',
        sections: [
          {
            t: 'Awal Mesozoikum — Pemulihan dari "The Great Dying"',
            d: 'Setelah kepunahan massal Permian yang memusnahkan 96% spesies, bumi hampir kosong. Mesozoikum dimulai dengan periode pemulihan ekologis yang lambat — butuh 5–10 juta tahun sebelum keanekaragaman hayati kembali. Yang tersisa adalah generalis tangguh yang bisa memanfaatkan ekologi yang kosong.',
            sub: [
              { t: 'Superbenua Pangaea', d: 'Saat Mesozoikum dimulai, semua benua masih bersatu menjadi satu superbenua: <b>Pangaea</b> (Yunani: "semua bumi"). Ini berarti hewan bisa berjalan dari "Amerika" ke "Asia" tanpa menyeberang laut. Iklim interior Pangaea sangat kering dan panas. Selama Mesozoikum, Pangaea perlahan pecah menjadi benua-benua yang kita kenal sekarang.' },
              { t: 'Pecahnya Pangaea & Pembentukan Samudra Atlantik', d: 'Sekitar 200 jtl: Pangaea mulai terbelah. Amerika Utara dan Eropa-Afrika berpisah, membentuk Samudra Atlantik yang sempit. Sekitar 150 jtl: Amerika Selatan dan Afrika mulai berpisah. Sekitar 65 jtl: India terpisah dari Antartika dan mulai bergerak ke utara menuju Asia. Nusantara mulai terbentuk dari kepingan-kepingan benua yang bergerak.' }
            ]
          },
          {
            t: 'Tiga Periode Mesozoikum',
            d: 'Mesozoikum terbagi menjadi tiga periode dengan karakteristik kehidupan yang berbeda-beda.',
            sub: [
              { t: 'Trias (252–201 jtl)', d: 'Periode pemulihan dan eksperimen evolusi. Kelompok hewan baru berevolusi mengisi niche kosong: dinosaurus pertama muncul di akhir Trias (~230 jtl) — masih kecil dan dua kaki. Mamalia pertama juga muncul di Trias — ukuran tikus, aktif malam hari untuk menghindari dinosaurus. Pterosaurus (reptil terbang) pertama. Berakhir dengan kepunahan massal besar lagi (~50% spesies).' },
              { t: 'Jura (201–145 jtl)', d: '"Age of Giants" — dinosaurus berkembang menjadi makhluk terbesar yang pernah berjalan di bumi. Sauropoda raksasa: Brachiosaurus (berat 60 ton), Diplodocus (panjang 26 meter), Brontosaurus. Di laut: Ichthyosaurus dan Plesiosaur mendominasi. Di udara: Pterosaurus berukuran makin besar. Dan... <b>Archaeopteryx</b> muncul — hewan perantara antara dinosaurus dan burung! Tumbuhan berbunga belum ada — hutan didominasi tumbuhan runjung, pakis, dan ginkgo.' },
              { t: 'Kapur (145–66 jtl)', d: 'Puncak keanekaragaman dinosaurus. Predator terbesar: T-Rex (6 ton, gigi pisau), Spinosaurus (lebih besar dari T-Rex!), Mosasaurus (predator laut sepanjang 18 meter). Herbivora: Triceratops, Ankylosaurus, Parasaurolophus. Tumbuhan berbunga (Angiospermae) berevolusi dan menyebar — bersama lebah pertama. Berakhir dengan kepunahan massal K-Pg akibat asteroid.' }
            ]
          },
          {
            t: 'Dinosaurus — Makhluk yang Disalahpahami',
            d: 'Banyak mitos tentang dinosaurus yang sudah dibantah oleh penelitian modern. Dinosaurus jauh lebih kompleks, cerdas, dan menarik dari bayangan populer.',
            sub: [
              { t: 'Dinosaurus Berbulu', d: 'Sejak tahun 1990-an, fosil luar biasa dari Cina membuktikan banyak dinosaurus theropoda (termasuk kerabat dekat T-Rex seperti Yutyrannus) memiliki bulu! T-Rex sendiri mungkin punya bulu di beberapa bagian tubuhnya, terutama saat masih muda. Ini karena burung adalah dinosaurus — lebih tepatnya, burung ADALAH dinosaurus theropoda berbulu yang selamat.' },
              { t: 'T-Rex yang Sebenarnya', d: 'T-Rex kemungkinan adalah pemburu aktif SEKALIGUS scavenger — seperti singa modern. Bisa berlari 17–20 km/jam (bukan lambat seperti di film). Daya gigit 35.000–57.000 Newton — terkuat dari semua hewan darat yang pernah ada. Matanya menghadap ke depan (bukan ke samping) menunjukkan pandangan binokular yang baik untuk estimasi jarak.' },
              { t: 'Dinosaurus "Kecil" yang Berbahaya', d: 'Velociraptor dalam Jurassic Park salah — ukurannya hanya sebesar kalkun, berbulu, dan tidak bisa membuka pintu. Tapi yang besar dan benar-benar menakutkan adalah Utahraptor: setinggi manusia, panjang 6 meter, dengan cakar sabit 24 cm. Deinonychus (nenek moyang Velociraptor) berburu dalam kelompok dan sangat cerdas.' }
            ]
          },
          {
            t: 'Kepunahan K-Pg — Akhir Era Dinosaurus',
            d: 'Sekitar 66 juta tahun lalu, sebuah asteroid berdiameter 10–15 km menghantam Semenanjung Yucatan, Meksiko (kawah Chicxulub). Inilah salah satu momen paling dramatis dalam sejarah bumi.',
            sub: [
              { t: 'Skala Dampak', d: 'Energi tabrakan: setara dengan 1 miliar bom atom meledak serentak. Gelombang panas membakar seluruh Amerika Utara dan Selatan dalam hitungan jam. Debris yang terlempar ke atmosfer menyebar ke seluruh bumi. Selama berbulan-bulan, langit tertutup debu dan jelaga — "nuclear winter" yang memblokir matahari dan membunuh hampir semua tanaman.' },
              { t: 'Siapa yang Selamat?', d: 'Hanya hewan kecil yang bisa bertahan dalam kegelapan berbulan-bulan: mamalia kecil (makan biji dan serangga), burung kecil (dinosaurus berbulu), ular dan kadal kecil, buaya (sudah ada sejak Trias dan masih bertahan!), dan hewan air yang bergantung pada ekosistem berbeda. Dari para pemenang kecil inilah seluruh dunia Kenozoikum berevolusi.' },
              { t: 'Dinosaurus Belum Punah', d: 'Ini bukan metafora — secara saintifik, burung ADALAH dinosaurus theropoda yang selamat. Dari 10.000 lebih spesies burung yang ada hari ini, semuanya adalah keturunan dinosaurus. Ayam, elang, penguin, kolibri — semua dinosaurus. Dinosaurus tidak punah, mereka berevolusi.' }
            ]
          },
          {
            t: 'Hubungan Mesozoikum dengan Nusantara',
            d: 'Pada era Mesozoikum, wilayah yang kini menjadi kepulauan Indonesia belum terbentuk seperti sekarang.',
            sub: [
              { t: 'Pembentukan Awal Kepulauan', d: 'Sebagian besar Nusantara berada di bawah laut Tethys selama Mesozoikum. Pulau-pulau yang ada sekarang baru mulai terangkat melalui aktivitas tektonik dan vulkanik yang sangat intens. Bebatuan kapur dan batuan sedimen laut dalam dari era Mesozoikum bisa ditemukan di Jawa, Kalimantan, dan Sulawesi.' },
              { t: 'Potensi Fosil', d: 'Meskipun temuan fosil dinosaurus langsung di Indonesia masih sangat terbatas, penelitian geologi membuktikan ada lapisan batuan dari era Mesozoikum di Kalimantan dan Papua. Eksplorasi paleontologi yang lebih intensif di masa depan berpotensi menemukan fosil-fosil penting.' }
            ]
          }
        ],
        facts: [
          'Burung adalah dinosaurus — secara taksonomi ini bukan perbandingan, ini klasifikasi ilmiah. Burung masuk dalam kelompok Theropoda, salah satu ordo Dinosauria. Jadi dinosaurus tidak punah 66 juta tahun lalu — ada sekitar 10.000 spesies yang masih terbang di langit hari ini. Ayam goreng kesukaan kamu adalah dinosaurus.',
          'Mesozoikum dimulai dengan bumi yang satu benua (Pangaea) dan berakhir dengan benua-benua yang mulai menyerupai peta modern. Ini berarti selama era dinosaurus, hewan bisa berjalan dari wilayah "Argentina" ke "Mongolia" tanpa pernah menyeberangi laut — menjelaskan mengapa fosil spesies yang sama atau serupa ditemukan di benua yang kini terpisah jauh.',
          'Asteroid Chicxulub yang membunuh dinosaurus menghantam dengan kecepatan ~20 km/detik (72.000 km/jam). Energi tabrakan diperkirakan 100 juta megaton TNT — sekitar 2 juta kali lebih besar dari seluruh persenjataan nuklir yang ada di bumi saat ini. Gelombang seismiknya setara gempa bumi Magnitude 11 — skala yang tidak pernah dicatat dalam sejarah manusia.',
          'T-Rex hanya hidup ~68–66 juta tahun lalu — sangat dekat ke akhir era Dinosaurus. Yang mengejutkan: jarak waktu antara T-Rex dan kita (66 juta tahun) lebih DEKAT daripada jarak waktu antara T-Rex dan Stegosaurus (83 juta tahun). T-Rex lebih dekat ke manusia secara waktu daripada ke Stegosaurus!'
        ]
      },
      {
        id: 'neo2', title: '🧊 Neozoikum', tag: '66 juta tahun lalu – kini', tc: '#44aaff',
        difficulty: 'medium',
        isGeologi: true,
        desc: 'Era mamalia. Setelah dinosaurus punah, mamalia meledak dalam keanekaragaman. Manusia muncul di akhir era ini — hanya sekejap dalam skala geologis.',
        sections: [
          {
            t: 'Kenozoikum — Era Baru Setelah Asteroid',
            d: 'Neozoikum (sering disebut <b>Kenozoikum</b> dalam taksonomi modern) dimulai tepat setelah kepunahan K-Pg 66 juta tahun lalu. "Kesempatan kosong" yang ditinggalkan kepunahan dinosaurus memungkinkan mamalia — yang selama 165 juta tahun sebelumnya tertekan oleh dinosaurus — untuk berevolusi dan mendominasi bumi.',
            sub: [
              { t: 'Mengapa Mamalia Bisa Mendominasi?', d: 'Mamalia yang selamat dari kepunahan K-Pg adalah hewan kecil generalis yang makan apa saja (biji, serangga, bangkai). Mereka berdarah panas — bisa aktif dalam kondisi dingin saat "nuclear winter". Hamil dalam tubuh (vivipara) — anak lebih terlindungi dari pada telur di sarang. Dan paling penting: mereka punya <b>neokorteks</b> — bagian otak yang memproses informasi kompleks — yang terus berkembang.' },
              { t: 'Adaptive Radiation Mamalia', d: 'Dalam 10 juta tahun pertama Kenozoikum, mamalia berevolusi mengisi hampir setiap niche ekologis yang pernah ditempati dinosaurus: ada mamalia raksasa (Paraceratherium — badak tanpa tanduk setinggi 5 meter, hewan darat terbesar sepanjang masa), ada mamalia laut (paus berevolusi dari ungulata darat!), ada yang terbang (kelelawar), ada yang predator (carnivora). Diversifikasi yang luar biasa cepat.' }
            ]
          },
          {
            t: 'Tiga Periode Kenozoikum',
            d: 'Kenozoikum dibagi menjadi tiga periode yang masing-masing memiliki karakteristik iklim dan kehidupan yang berbeda.',
            sub: [
              { t: 'Paleogen (66–23 jtl)', d: 'Dunia hangat — tidak ada lapisan es di kutub! Hutan tropis mencapai Antartika. Mamalia bereksperimen dengan ukuran raksasa di semua lini. Paus pertama berevolusi dari Pakicetus (hewan darat berkuku) ke hewan laut sepenuhnya dalam ~15 juta tahun — salah satu transisi evolusi paling dramatis yang terdokumentasi. Primata pertama muncul ~55 jtl: hewan kecil arboreal (hidup di pohon) seperti kukang.' },
              { t: 'Neogen (23–2,6 jtl)', d: 'Bumi mulai mendingin. Padang rumput (grassland) menyebar karena hutan berkurang. Herbivora penggembalaan meledak: kuda berkembang dari Eohippus (ukuran anjing) ke kuda modern, gajah dari Moeritherium (ukuran babi), bison, badak. Hominid pertama berevolusi: sekitar 7 jtl nenek moyang manusia dan simpanse berpisah. Australopithecus berjalan tegak ~4 jtl lalu.' },
              { t: 'Kuarter (2,6 jtl – kini)', d: 'Zaman Es bergantian dengan periode hangat (interglasial) setiap ~100.000 tahun. Ini memaksa evolusi dan migrasi besar-besaran. Genus Homo muncul dan menyebar ke seluruh dunia. Megafauna raksasa (mammoth, mastodon, harimau gigi pedang) punah — sebagian besar akibat kombinasi perburuan manusia dan perubahan iklim.' }
            ]
          },
          {
            t: 'Zaman Es Kuarter & Manusia',
            d: 'Selama 2,6 juta tahun terakhir, bumi mengalami siklus glasial-interglasial yang berulang — Zaman Es yang membuat kehidupan sangat menantang, dan periode hangat yang memungkinkan ekspansi.',
            sub: [
              { t: 'Mekanisme Siklus Milankovitch', d: 'Zaman Es bukan acak — dipicu oleh tiga siklus orbital bumi: <b>Eksentrisitas</b> (bentuk orbit elips berubah, 100.000 tahun), <b>Obliquitas</b> (kemiringan sumbu bumi, 41.000 tahun), dan <b>Presesi</b> (goyangan sumbu bumi, 23.000 tahun). Kombinasi ketiga siklus ini menentukan berapa banyak sinar matahari yang diterima bumi di waktu tertentu.' },
              { t: 'Zaman Es & Nusantara', d: 'Pada puncak Zaman Es terakhir (~20.000 tahun lalu), permukaan laut turun 120 meter. Sumatera, Jawa, dan Kalimantan terhubung ke daratan Asia sebagai satu daratan besar: <b>Sundaland</b>. Manusia bisa berjalan kaki dari Thailand ke Jawa! Saat Zaman Es berakhir dan laut naik, daratan tenggelam membentuk kepulauan Nusantara — dan memisahkan populasi manusia yang kelak berkembang menjadi berbagai suku bangsa.' },
              { t: 'Kepunahan Megafauna Pleistosen', d: 'Gajah berbulu, mammoth, harimau gigi pedang, beruang gua, badak berbulu, kuda liar, dan banyak megafauna lain punah dalam rentang 50.000 – 10.000 tahun lalu. Korelasi sangat kuat dengan kedatangan manusia modern di berbagai wilayah — manusia membawa teknologi berburu yang terlalu efisien untuk hewan yang berevolusi tanpa tekanan perburuan intensif.' }
            ]
          },
          {
            t: 'Holosen & Anthropocene — Zaman Manusia',
            d: 'Sejak ~11.700 tahun lalu, bumi memasuki periode interglasial yang hangat dan stabil: <b>Holosen</b>. Stabilitas iklim inilah yang memungkinkan Revolusi Neolitik, pertanian, peradaban, kota, dan semua sejarah manusia yang kita kenal.',
            sub: [
              { t: 'Holosen — Iklim Stabil yang Mengubah Segalanya', d: 'Variasi suhu Holosen hanya sekitar ±1°C selama 11.700 tahun — sangat stabil dibanding periode glasial sebelumnya. Variabilitas iklim rendah ini memungkinkan pertanian: petani bisa memprediksi musim, merencanakan tanam, dan menyimpan surplus. Tanpa stabilitas Holosen, mungkin tidak ada pertanian, tidak ada kota, tidak ada peradaban.' },
              { t: 'Anthropocene — Kita Mengubah Bumi', d: 'Banyak ilmuwan mengusulkan kita sudah memasuki <b>Anthropocene</b> (Zaman Manusia): era geologis baru yang ditandai dampak manusia yang begitu besar hingga meninggalkan jejak permanen dalam rekaman geologi. Bukti: perubahan iklim, kepunahan massal ke-6 (kali ini disebabkan manusia), sedimen plastik di seluruh samudra, sisa nuklir di seluruh lapisan tanah, dan penggalian manusia yang lebih besar dari semua proses geologi alami.' },
              { t: 'Persimpangan Penting', d: 'Praaksara manusia (Paleolitikum, Mesolitikum, Neolitikum) berlangsung seluruhnya dalam Kenozoikum akhir — Kuarter, tepatnya Pleistosen dan awal Holosen. Situs Sangiran, manusia purba, megafauna Nusantara yang punah, dan Revolusi Neolitik — semua adalah cerita dari Kenozoikum.' }
            ]
          },
          {
            t: 'Evolusi Manusia dalam Konteks Kenozoikum',
            d: 'Perjalanan evolusi dari nenek moyang primata bersama simpanse hingga Homo sapiens modern — semua terjadi dalam Kenozoikum.',
            sub: [
              { t: 'Garis Waktu Evolusi Hominid', d: '~7 jtl: Sahelanthropus tchadensis — tertua yang diketahui, bisa berjalan tegak. ~4 jtl: Australopithecus afarensis (termasuk "Lucy") — berjalan tegak tapi otak masih kecil. ~2,5 jtl: Homo habilis — pembuat alat pertama. ~1,8 jtl: Homo erectus — meninggalkan Afrika, menyebar ke Asia (termasuk ke Jawa menjadi Pithecanthropus). ~300.000 tl: Homo sapiens muncul di Afrika. ~70.000 tl: Homo sapiens mulai menyebar ke seluruh dunia.' },
              { t: 'Apa yang Membuat Manusia Berbeda?', d: 'Bukan hanya kecerdasan — banyak hewan cerdas. Yang unik pada manusia: <b>bahasa simbolik</b> (bisa bicara tentang hal abstrak yang tidak ada di depan mata), <b>budaya kumulatif</b> (pengetahuan diwariskan dan dibangun dari generasi ke generasi), <b>kerjasama dengan orang asing</b> dalam skala besar (ribuan orang yang tidak saling kenal bisa bekerja sama untuk satu tujuan melalui "cerita bersama" seperti agama, hukum, atau uang), dan <b>kemampuan membayangkan masa depan</b>.' }
            ]
          }
        ],
        timeline: [
          { date: '66 jtl', desc: 'Kepunahan K-Pg — dinosaurus punah, mamalia mulai mendominasi', color: '#ff4444' },
          { date: '55 jtl', desc: 'Primata pertama muncul di hutan tropis — nenek moyang semua monyet dan kera', color: '#ff8844' },
          { date: '34 jtl', desc: 'Antartika mulai membeku — iklim bumi mulai mendingin secara bertahap', color: '#44aaff' },
          { date: '7 jtl', desc: 'Percabangan manusia dan simpanse — nenek moyang bersama terakhir', color: '#44dd88' },
          { date: '2,6 jtl', desc: 'Kuarter dimulai — Zaman Es bergantian dengan periode hangat', color: '#44aaff' },
          { date: '1,8 jtl', desc: 'Homo erectus tiba di Jawa — Pithecanthropus yang ditemukan Dubois', color: '#cc88ff' },
          { date: '300.000 tl', desc: 'Homo sapiens pertama muncul di Afrika', color: '#ffcc00' },
          { date: '20.000 tl', desc: 'Puncak Zaman Es — permukaan laut turun 120 m, Sundaland terbentuk', color: '#44aaff' },
          { date: '11.700 tl', desc: 'Holosen dimulai — iklim hangat stabil yang memungkinkan peradaban', color: '#44dd88' },
          { date: '11.000 tl', desc: 'Revolusi Neolitik — manusia mulai bertani', color: '#ffaa44' },
        ],
        facts: [
          'Manusia muncul pada 31 Desember pukul 23:48 dalam kalender kosmik (jika 13,8 miliar tahun sejarah alam semesta = 1 tahun). Seluruh peradaban manusia yang tercatat — dari Mesir Kuno hingga era digital — terjadi dalam 10 detik terakhir tahun kosmik. Perspektif yang merendahkan hati sekaligus mengagumkan.',
          'Paus berevolusi dari hewan darat berkuku mirip rusa kecil (Pakicetus, hidup ~50 jtl lalu) menjadi mamalia laut sepenuhnya dalam sekitar 15 juta tahun. Kita bahkan punya fosil-fosil transisinya: Ambulocetus (bisa berjalan dan berenang), Rodhocetus (kaki belakang mengecil, hidung bergeser ke atas), hingga Basilosaurus (sudah sepenuhnya seperti paus tapi masih punya kaki belakang kecil). Evolusi yang terdokumentasi dengan indah.',
          'Mammoth berbulu terakhir tidak punah pada zaman es jauh sebelum peradaban — mereka masih hidup di Pulau Wrangel, Arktik, hingga hanya 4.000 tahun lalu. Itu berarti ketika piramida Agung Giza dibangun di Mesir, masih ada mammoth hidup di dunia! Mereka punah bukan karena iklim, tapi karena terisolasi di pulau kecil dan mengalami depresi genetik.',
          'Jika mengambil seluruh DNA Homo sapiens yang hidup saat ini dan membangun pohon keluarga berdasarkan variasi genetik, semua manusia modern bisa ditelusuri ke seorang perempuan yang hidup di Afrika ~150.000 – 200.000 tahun lalu — disebut "Mitochondrial Eve" (bukan karena dia satu-satunya perempuan, tapi karena garis mitokondria lain semuanya putus). Kita semua adalah keluarga yang sangat dekat.'
        ]
      },
    ],

    // ---- TAB: MANUSIA ----
    manusia: [
      {
        id: 'homo', title: '🦴 Evolusi Manusia Praaksara di Indonesia', tag: 'Biologi & Evolusi', tc: '#ff7755',
        difficulty: 'advanced',
        desc: 'Perjalanan evolusi manusia dari Australopithecus hingga Homo sapiens — dengan fokus pada temuan-temuan revolusioner dari bumi Nusantara.',
        sections: [
          {
            t: 'Pohon Evolusi Manusia — Gambaran Besar',
            d: 'Genus <b>Homo</b> muncul sekitar 2,5 juta tahun lalu di Afrika dari leluhur Australopithecus. Homo kemudian menyebar ke seluruh dunia dalam beberapa gelombang migrasi besar. Di Asia, khususnya di Indonesia, ditemukan beberapa spesies manusia purba yang sangat penting bagi pemahaman evolusi manusia global.',
            sub: [
              { t: 'Australopithecus (4–2 jt SM)', d: 'Nenek moyang paling awal dalam garis manusia. Berjalan tegak (bipedal) tapi otak masih sangat kecil (400–550 cc, mirip simpanse). Wajah masih menonjol seperti kera. Hidup di sabana Afrika. "Lucy" (A. afarensis, 3,2 jtl, Ethiopia) adalah spesimen paling terkenal — kerangka 40% lengkap.' },
              { t: 'Homo habilis (2,4–1,5 jt SM)', d: '"Manusia terampil" — pertama yang terbukti membuat alat batu secara sistematis (Oldowan tools). Otak 600–750 cc. Masih bertubuh kecil dan lengannya panjang. Hidup di Afrika. Namanya dari kata Latin "habilis" = terampil, cekatan.' },
              { t: 'Homo erectus (1,9 jt – 140.000 SM)', d: 'Spesies PERTAMA yang meninggalkan Afrika dan menyebar ke Eropa dan Asia. Tinggi seperti manusia modern. Otak 800–1.100 cc. Menguasai api (~800.000 SM) dan membuat alat lebih halus (Acheulean). Di Indonesia ditemukan sebagai Pithecanthropus.' },
              { t: 'Homo neanderthalensis (400.000–40.000 SM)', d: 'Kerabat dekat tapi bukan nenek moyang langsung manusia modern. Hidup di Eropa dan Asia Barat. Otak lebih besar dari manusia modern (1.600 cc)! Sudah punya ritual penguburan, alat sangat canggih, dan mungkin punya bahasa. Kawin campur dengan Homo sapiens — DNA kita mengandung 1–4% DNA Neanderthal.' },
              { t: 'Homo sapiens (300.000 SM – kini)', d: 'Manusia modern. Otak 1.350–1.500 cc. Wajah datar, dagu menonjol, tulang tipis. Kemampuan unik: bahasa simbolik kompleks, seni abstrak, teknologi yang terus berkembang, kerjasama sosial skala besar. Menyebar dari Afrika ke seluruh dunia mulai ~70.000 tahun lalu.' }
            ]
          },
          {
            t: 'Manusia Purba Indonesia — Temuan Kelas Dunia',
            d: 'Indonesia adalah salah satu laboratorium evolusi manusia paling penting di dunia. Dari Sangiran hingga Flores, temuan-temuan dari bumi Nusantara terus mengubah pemahaman kita tentang evolusi manusia.',
            sub: [
              { t: 'Meganthropus Paleojavanicus', d: '"Manusia besar tertua Jawa." Ditemukan G.H.R. von Koenigswald di Sangiran, Jawa Tengah (1941–1945). Dikenal dari fragmen rahang bawah dan gigi yang sangat besar dan kokoh — jauh lebih besar dari Homo erectus. Diperkirakan berumur 1–2 juta tahun. Statusnya masih diperdebatkan: apakah spesies tersendiri, atau Homo erectus bertubuh besar?' },
              { t: 'Pithecanthropus Erectus (Homo erectus)', d: '"Manusia kera yang berjalan tegak." Ditemukan Eugene Dubois di Trinil, Ngawi, Jawa Tengah (1891). Fosil pertama yang ditemukan: tempurung kepala (calotte), gigi geraham, dan tulang paha. Temuan ini MENGGEMPARKAN dunia ilmu pengetahuan — bukti pertama Homo erectus di luar Afrika. Dubois didebat habis-habisan selama 30 tahun, tapi akhirnya terbukti benar.' },
              { t: 'Homo Soloensis', d: 'Ditemukan di pinggir Bengawan Solo oleh Oppenoorth dan von Koenigswald (1931–1933). Berumur sekitar 300.000 – 100.000 tahun. Lebih modern dari Pithecanthropus tapi lebih primitif dari manusia modern. Hanya ditemukan 11 tempurung kepala dan 2 tulang kering — tanpa rahang. Mengindikasikan ritual — mungkin kepala dipisah dari tubuh untuk upacara.' },
              { t: 'Homo Wajakensis', d: 'Ditemukan di Wajak (Tulungagung, Jawa Timur) oleh B.D. van Rietschoten (1889) dan kemudian diteliti Dubois. Lebih modern dan mirip manusia (ras Australoid) dibanding Homo erectus. Diperkirakan berumur 40.000 – 10.000 tahun. Kemungkinan merupakan bagian dari populasi yang kemudian menjadi nenek moyang orang Papua dan Aborigin Australia.' },
              { t: 'Homo Floresiensis — "Hobbit" dari Flores', d: 'Penemuan paling menggemparkan abad ke-21: ditemukan di Gua Liang Bua, Flores oleh tim Indonesia-Australia (2003). Tinggi hanya sekitar 1 meter, berat ~25 kg, otak hanya 380 cc (lebih kecil dari H. erectus!). Namun membuat alat batu yang cukup canggih! Hidup bersama manusia modern hingga ~50.000 tahun lalu. Asal-usulnya masih diperdebatkan sengit — sebagian ilmuwan percaya ini adalah H. erectus yang mengalami <b>insular dwarfism</b> (mengecil karena isolasi di pulau).' }
            ]
          },
          {
            t: 'Migrasi Manusia ke Nusantara',
            d: 'Kepulauan Nusantara dihuni oleh beberapa gelombang migrasi manusia purba dan modern dalam jangka waktu yang sangat panjang.',
            sub: [
              { t: 'Gelombang Pertama — Homo erectus (1,5 jtl)', d: 'Homo erectus mencapai Jawa sekitar 1,5 – 1,8 juta tahun lalu — ketika Jawa masih terhubung ke daratan Asia (Sundaland). Mereka adalah manusia pertama di Nusantara.' },
              { t: 'Gelombang Kedua — Manusia Modern Awal (70.000–50.000 tl)', d: 'Homo sapiens pertama dari Afrika tiba di Asia Tenggara, melewati India dan Sundaland. Inilah yang kemudian terus bergerak ke selatan dan timur — sebagian menjadi leluhur orang Papua dan Aborigin Australia (Australomelanesid).' },
              { t: 'Gelombang Ketiga — Austronesia (4.000–3.500 tl)', d: 'Gelombang migrasi besar dari Taiwan/daratan Cina selatan membawa bahasa Austronesia, teknologi pertanian padi, dan perahu layar. Inilah leluhur dominan sebagian besar suku-suku di Indonesia bagian barat dan tengah saat ini.' }
            ]
          },
          {
            t: 'Situs Sangiran — Museum Evolusi Manusia',
            d: 'Terletak di perbatasan Kabupaten Sragen dan Karanganyar, Jawa Tengah, Sangiran adalah situs paleoantropologi terpenting di Asia Tenggara.',
            sub: [
              { t: 'Statistik yang Menakjubkan', d: 'Sangiran menyimpan lebih dari 13.685 fosil (data 2016) — termasuk 100+ fosil manusia purba yang mewakili setengah dari total temuan Homo erectus di seluruh dunia! Lapisan tanah Sangiran menyimpan rekaman sejarah selama 2 juta tahun.' },
              { t: 'UNESCO World Heritage Site', d: 'Ditetapkan sebagai Situs Warisan Dunia UNESCO pada 1996. Museum Sangiran yang modern menyimpan dan memamerkan ribuan fosil dengan tampilan interaktif dan informatif. Wajib dikunjungi untuk memahami asal-usul manusia di Nusantara.' }
            ]
          }
        ],
        facts: [
          'Eugene Dubois menemukan Pithecanthropus di Trinil tahun 1891 dan langsung dikucilkan oleh komunitas ilmiah Eropa yang saat itu menolak keras gagasan manusia berevolusi dari primata. Dubois bahkan menyembunyikan fosil di bawah lantai rumahnya dan menolak membiarkan orang lain menelitinya selama bertahun-tahun karena frustrasi. Baru setelah temuan serupa di Cina (Peking Man, 1920-an), dunia mengakui kebenaran Dubois.',
          '"Hobbit" Flores (Homo floresiensis) pertama kali dikirim oleh beberapa ilmuwan sebagai tulang anak yang menderita microcephaly (kepala kecil akibat kelainan genetik). Perdebatan sangat sengit. Baru setelah ditemukan beberapa individu serupa (termasuk yang berumur berbeda dan dari lapisan waktu berbeda), konsensus ilmiah mengakui ini adalah spesies tersendiri. Debat tentang asal-usulnya masih berlanjut.',
          'DNA manusia modern mengandung 1–4% DNA Neanderthal — artinya nenek moyang Homo sapiens dan Neanderthal kawin campur saat bertemu di Timur Tengah dan Eropa. Bahkan ada populasi Asia dan Amerika yang mengandung sedikit DNA Denisovan (spesies manusia purba yang ditemukan hanya dari DNA di tulang jari dari Gua Denisova, Siberia). Kita adalah produk percampuran beberapa spesies manusia!',
          'Insular dwarfism (pengerdilan karena isolasi pulau) adalah fenomena nyata dalam evolusi — hewan yang terisolasi di pulau kecil cenderung mengecil dari generasi ke generasi karena sumber daya terbatas. Gajah kerdil ada di beberapa pulau Mediterania di masa lalu. Homo floresiensis mungkin mengalami hal yang sama dari populasi Homo erectus yang terisolasi di Flores. Ini juga menjelaskan mengapa badak Sumatra jauh lebih kecil dari badak Afrika.'
        ]
      },
      {
        id: 'ras', title: '🌏 Asal-Usul Penduduk Nusantara', tag: 'Antropologi', tc: '#44ddaa',
        difficulty: 'advanced',
        desc: 'Dari mana asal-usul berbagai suku bangsa Indonesia? Gelombang migrasi, percampuran genetik, dan keberagaman manusia Nusantara.',
        sections: [
          {
            t: 'Teori Asal-Usul — Perdebatan Panjang',
            d: 'Para ilmuwan sudah lama berdebat tentang asal-usul penduduk Nusantara. Dua teori utama:',
            sub: [
              { t: 'Teori "Out of Taiwan" (Peter Bellwood)', d: 'Penduduk Nusantara saat ini sebagian besar adalah keturunan penutur bahasa Austronesia yang bermigrasi dari Taiwan/Cina selatan ~4.000 – 3.500 tahun lalu. Mereka membawa bahasa Austronesia (induk bahasa-bahasa Indonesia modern), pertanian padi, dan teknologi perahu. Ini menjelaskan kesamaan bahasa dari Madagaskar hingga Hawaii.' },
              { t: 'Teori "Out of Sundaland" (Oppenheimer)', d: 'Populasi berbasis di Sundaland (Asia Tenggara yang tenggelam) bermigrasi ke utara setelah Zaman Es — bukan sebaliknya. Ini berimplikasi bahwa nenek moyang orang Melayu-Indonesia justru berasal dari kawasan Nusantara sendiri, bukan dari Taiwan. Teori ini lebih kontroversial tapi mendapat dukungan dari beberapa penelitian genetik.' },
              { t: 'Gambaran Modern dari DNA', d: 'Penelitian genetik terbaru (2016–2021, termasuk studi besar oleh Genome Institute of Singapore) menunjukkan: penduduk Nusantara modern adalah campuran dari setidaknya 3 komponen: Australomelanesid purba (dari gelombang pertama), Austronesia (dari Taiwan/Cina), dan komponen Asia daratan. Proporsi campurannya berbeda di setiap wilayah.' }
            ]
          },
          {
            t: 'Keberagaman Suku Bangsa Indonesia',
            d: 'Indonesia adalah salah satu negara dengan keberagaman suku bangsa terbanyak di dunia — lebih dari 1.300 suku bangsa dengan bahasa masing-masing.',
            sub: [
              { t: 'Proto-Melayu vs Deutero-Melayu', d: '<b>Proto-Melayu</b> (Melayu Tua): gelombang kedua neolitik ~3.000 SM. Ciri: kulit lebih gelap, rambut ikal. Keturunannya: Dayak, Toraja, Batak, Sasak, Nias. <b>Deutero-Melayu</b> (Melayu Muda): gelombang perundagian ~1.500 SM membawa budaya Dongson. Keturunannya: Jawa, Melayu, Bugis, Minangkabau.' },
              { t: 'Papua & Melanesia', d: 'Penduduk Papua adalah keturunan langsung gelombang migrasi Australomelanesid pertama (~70.000 – 40.000 tahun lalu) — gelombang tertua dan paling sedikit tercampur. Ini menjelaskan perbedaan fisik dan linguistik yang signifikan antara Papua dan Indonesia barat.' }
            ]
          }
        ],
        facts: [
          'Bahasa Melayu/Indonesia termasuk dalam rumpun bahasa Austronesia yang berbicara oleh lebih dari 380 juta orang di 1.200 pulau — dari Madagaskar (Afrika Timur) hingga Easter Island (Pasifik Timur), jarak 24.000 km. Ini adalah keluarga bahasa dengan persebaran geografis terluas di dunia sebelum era kolonialisme.',
          'Bahasa Papua (Non-Austronesia) di Pulau Papua sangat beragam — ada sekitar 800–900 bahasa yang berbeda, mewakili lebih dari 10 rumpun bahasa yang tidak berhubungan satu sama lain. Ini lebih banyak keluarga bahasa daripada seluruh benua Afrika! Papua adalah "Galapagos linguistik" — isolasi geografis ribuan tahun menciptakan keanekaragaman bahasa yang luar biasa.',
          'Penelitian DNA mitokondria tahun 2018 menemukan bahwa orang Nias (Sumatera Utara) dan orang Mentawai memiliki haplogroup genetik unik yang tidak ditemukan di tempat lain — bukti mereka sudah terisolasi di pulau-pulau mereka selama ribuan tahun, mengembangkan kebudayaan yang unik tanpa pengaruh luar yang signifikan.'
        ]
      }
    ],

    // ---- TAB: ALAT ----
    alat: [
      {
        id: 'tools', title: '🔧 Evolusi Teknologi Alat Batu', tag: 'Teknologi', tc: '#55aaff',
        difficulty: 'medium',
        desc: 'Dari kapak batu kasar 2,6 juta tahun lalu hingga senjata logam — bagaimana manusia membangun fondasi teknologi yang menjadi dasar semua peradaban.',
        sections: [
          {
            t: 'Mengapa Alat Adalah Kunci Keberhasilan Manusia?',
            d: 'Manusia tidak punya cakar tajam, gigi besar, kecepatan tinggi, atau kulit tebal seperti hewan lain. Kelemahan biologis ini justru menjadi kekuatan evolusioner: karena tidak punya alat bawaan, manusia harus terus berinovasi. <b>Alat adalah "evolusi budaya" manusia</b> — jauh lebih cepat dari evolusi biologis. Sementara butuh ribuan generasi untuk mengubah anatomi, satu generasi cukup untuk menyebarkan teknologi baru ke seluruh komunitas.',
          },
          {
            t: 'Lima Mode Teknologi Alat Batu',
            d: 'Para arkeolog mengklasifikasikan teknologi alat batu menjadi 5 "mode" yang mencerminkan kemajuan kognitif dan teknis:',
            sub: [
              { t: 'Mode 1: Oldowan (2,6 jt – 1,7 jt SM)', d: 'Alat paling primitif dari Olduvai Gorge, Tanzania. Teknik: batu dipukul dengan batu lain ("percussor") untuk menghasilkan serpihan tajam. Hasil: chopper (kapak perimbas) kasar tanpa desain konsisten. Dibuat oleh Homo habilis — otak 600 cc. Sudah luar biasa untuk saatnya: yang sebelumnya membutuhkan gigi dan cakar tajam, kini bisa dilakukan dengan batu.' },
              { t: 'Mode 2: Acheulean (1,7 jt – 250 rb SM)', d: 'Kapak genggam (hand axe) simetris dua sisi berbentuk tetesan air mata. Pertama kali di Acheul, Prancis tapi menyebar ke Afrika, Eropa, dan Asia. Dibuat oleh Homo erectus. Butuh perencanaan: harus membayangkan bentuk akhir sebelum memulai. Alat paling sukses dalam sejarah manusia — desainnya hampir tidak berubah selama 1 juta tahun dan ditemukan di 3 benua.' },
              { t: 'Mode 3: Mousterian/Levallois (300 rb – 30 rb SM)', d: 'Teknik revolusioner: siapkan "inti batu" (core) menjadi bentuk tertentu terlebih dahulu, lalu pukul untuk mendapat serpihan dengan ukuran dan bentuk yang bisa diprediksi. Hasilnya: serpihan lebih tipis, ringan, dan tajam dengan bentuk yang lebih konsisten. Dibuat Neanderthal dan Homo sapiens awal. Bukti kemampuan perencanaan jauh ke depan.' },
              { t: 'Mode 4: Upper Paleolithic (40 rb – 10 rb SM)', d: 'Lompatan besar dalam variasi dan kecepatan inovasi. Produksi "bilah" (blade) panjang dan sempit yang efisien dari material batu. Alat semakin terspesialisasi: burin (pahat tulang dan gading), serper (menguliti), mata panah, jarum tulang. Inovasi baru muncul setiap beberapa ribu tahun, bukan setiap juta tahun.' },
              { t: 'Mode 5: Mikrolith (10 rb – 2 rb SM)', d: 'Alat batu sangat kecil (<3 cm) yang dirancang sebagai komponen dari alat komposit. Satu batang tombak bisa terdiri dari 10+ mikrolith sebagai mata tombak bertanda batas. Keunggulan: standardisasi (semua komponen bisa saling dipertukar), reparabilitas (ganti hanya komponen rusak), dan efisiensi material (satu nodule batu menghasilkan puluhan alat).' }
            ]
          },
          {
            t: 'Alat Organik — Yang Tidak Terawetkan',
            d: 'Alat batu hanya sebagian kecil dari arsenal peralatan manusia purba. Bahan organik jarang terawetkan, tapi bukti tidak langsung dan temuan luar biasa menunjukkan pemanfaatan luas:',
            sub: [
              { t: 'Alat Kayu', d: 'Tombak kayu tertua yang ditemukan berumur 400.000 tahun dari Schöningen, Jerman — 8 tombak kayu sempris yang sangat canggih, disesuaikan bobot dan keseimbangannya seperti tombak lempar modern. Ini mengubah gambaran tentang Homo heidelbergensis yang membuatnya — mereka bukan "manusia primitif" tapi pemburu terencana yang sangat mahir.' },
              { t: 'Alat Tulang & Gading', d: 'Jarum tulang tertua berumur 50.000 tahun dari Gua Sibudu, Afrika Selatan — membuktikan manusia sudah menjahit pakaian dari kulit hewan dengan teknik yang cukup halus. Harpun (tombak berkait) dari tulang dan gading untuk menangkap ikan dan mamalia laut. Penggaruk kulit untuk menyiapkan pakaian. Di Sampung, Indonesia: jarum, pisau, dan penggaruk dari tulang.' },
              { t: 'Perekat & Komposit', d: 'Manusia Paleolitikum sudah membuat perekat! Residu birch tar (resin pohon birch) ditemukan pada alat batu Neanderthal berumur 180.000 tahun — membuktikan kemampuan kimia yang mengejutkan. Mereka memanaskan kulit kayu birch tanpa oksigen untuk menghasilkan tar lengket. Di Afrika Selatan, ditemukan bukti produksi resin dari campuran mineral kompleks berumur 65.000 tahun.' }
            ]
          },
          {
            t: 'Alat Khusus Indonesia — Kebudayaan Lokal',
            d: 'Nusantara tidak hanya menerima teknologi alat dari luar — tapi juga mengembangkan tradisi alat batu lokal yang khas.',
            sub: [
              { t: 'Kebudayaan Pacitan (Chopper-Chopping Tool)', d: 'Ditemukan di Pacitan, Jawa Timur oleh von Koenigswald (1935). Alat batu kasar berupa kapak perimbas dan alat serut — serupa dengan tradisi Paleolitikum Asia Selatan dan Tenggara. Mencerminkan tradisi "kapak genggam Asia" yang berbeda dari tradisi Acheulean Eropa-Afrika.' },
              { t: 'Kebudayaan Ngandong (Bone Tool)', d: 'Alat-alat dari tulang dan tanduk rusa ditemukan di Ngandong, Blora, Jawa Tengah. Ini menunjukkan Homo soloensis — manusia purba yang hidup di tepian Bengawan Solo — sudah memanfaatkan tulang hewan yang diburu sebagai bahan baku alat secara intensif.' },
              { t: 'Kebudayaan Sampung (Mixed Tool)', d: 'Gua Lawa di Sampung, Ponorogo, Jawa Tengah menyimpan salah satu koleksi alat organik Mesolitikum terlengkap di Indonesia: alat batu mikrolith, alat tulang, alat dari tanduk rusa, serta temuan manusia dan hewan yang menunjukkan hunian intensif.' }
            ]
          }
        ],
        table: {
          headers: ['Periode', 'Mode', 'Material', 'Alat Khas', 'Pembuat'],
          rows: [
            ['Paleolitikum Awal', 'Oldowan', 'Batu kasar', 'Chopper/kapak perimbas', 'Homo habilis'],
            ['Paleolitikum Tengah', 'Acheulean', 'Batu & tulang', 'Kapak genggam simetris', 'Homo erectus'],
            ['Paleolitikum Akhir', 'Levallois', 'Batu halus', 'Serpih Levallois, scraper', 'Neanderthal, H. sapiens awal'],
            ['Mesolitikum', 'Upper Paleo/Mikrolith', 'Batu+kayu+tulang', 'Panah, tombak komposit', 'Homo sapiens'],
            ['Neolitikum', 'Polished Stone', 'Batu halus, gerabah', 'Kapak upam, gerabah hias', 'Homo sapiens'],
            ['Perundagian', 'Metalurgi', 'Tembaga, perunggu, besi', 'Kapak corong, nekara, senjata', 'Homo sapiens'],
          ]
        },
        facts: [
          'Obsidian (kaca vulkanik) adalah material tajam alami terbaik yang pernah ada — tepinya tajam hingga level molekular, lebih tajam dari pisau bedah baja terbaik! Beberapa dokter spesialis jantung masih menggunakan pisau bedah obsidian untuk operasi yang memerlukan sayatan sangat halus, karena luka obsidian sembuh lebih cepat dengan bekas luka lebih kecil dari sayatan baja.',
          'Kapak genggam Acheulean adalah alat dengan desain terpanjang dalam sejarah manusia — digunakan hampir tanpa perubahan selama 1,4 JUTA TAHUN, dari Afrika Timur hingga Eropa Barat hingga India. Bandingkan: iPhone generasi pertama hingga iPhone terbaru hanya butuh ~17 tahun untuk berubah total. Stabilitas desain Acheulean yang ekstrem ini mungkin mengindikasikan pengetahuan sudah "dikunci" dalam cara berpikir — bukan karena manusia tidak bisa berinovasi.',
          'Bukti tertua pengendalian api oleh manusia ditemukan di Wonderwerk Cave, Afrika Selatan berumur 1 juta tahun. Tapi mengontrol api dan menciptakan api adalah hal berbeda — bukti pembuatan api (fire-making) melalui batu api (flint) baru ada ~800.000 tahun lalu. Api mengubah diet manusia secara radikal: memasak menghancurkan parasit, meningkatkan ketersediaan kalori, dan memungkinkan makan daging dengan aman — berkontribusi besar pada pertumbuhan otak manusia.',
          'Penemuan alat batu berumur 3,3 juta tahun di Lomekwi, Kenya (2015) — lebih tua dari genus Homo! — memaksa revisi besar dalam pemahaman kita tentang penggunaan alat. Siapa yang membuatnya? Australopithecus? Atau ada spesies yang belum ditemukan? Ini menunjukkan teknologi alat mungkin sudah ada sebelum manusia sendiri berevolusi — "teknologi" mendahului "manusia" sebagaimana kita mendefinisikannya.'
        ]
      },
      {
        id: 'api', title: '🔥 Api & Revolusi Kognitif', tag: 'Teknologi & Evolusi', tc: '#ff6644',
        difficulty: 'advanced',
        desc: 'Api bukan sekadar alat — ia adalah katalisator yang mengubah biologi, diet, sosialitas, dan kemampuan kognitif manusia secara revolusioner.',
        sections: [
          {
            t: 'Api — Teknologi yang Mengubah Biologi Manusia',
            d: 'Richard Wrangham (Harvard) mengajukan hipotesis bahwa penguasaan api dan memasak adalah faktor terpenting dalam evolusi otak manusia besar. Argumennya: memasak memecah molekul makanan, meningkatkan ketersediaan kalori dan protein, mengurangi waktu mengunyah (dari 6 jam seperti gorila menjadi 1 jam manusia modern), dan membebaskan energi untuk otak.',
            sub: [
              { t: 'Bukti Kronologis', d: 'Penggunaan api pertama: ~1 juta tahun lalu (Wonderwerk Cave, Afrika Selatan). Pengendalian api lebih konsisten: ~400.000 tahun lalu. Perapian yang terstruktur: ~200.000 tahun lalu. Pembuatan api aktif: ~800.000 tahun lalu. Lompatan besar dalam ukuran otak manusia bertepatan dengan bukti penggunaan api yang semakin konsisten.' },
              { t: 'Dampak Sosial Api', d: 'Api unggun menciptakan "pusat sosial" pertama: tempat di mana kelompok berkumpul malam hari, berbagi cerita, memperkuat ikatan sosial, dan mentransmisikan pengetahuan lintas generasi. Malam hari yang sebelumnya berbahaya menjadi aman — dan waktu malam di sekitar api adalah waktu belajar dan bersosialisasi yang sangat berharga.' }
            ]
          }
        ],
        facts: [
          'Manusia purba memasak jauh sebelum ada "resep" — tapi bukti menunjukkan mereka sudah memilih cara memasak tertentu. Tulang hewan dari situs Homo erectus menunjukkan pola gosong yang konsisten — hewan tidak asal dibakar tapi dimasak dengan metode yang relatif terkontrol.',
          'Api juga merevolusi pertahanan diri. Tidak ada predator — bahkan singa dan harimau — yang mau mendekati api. Ini berarti manusia bisa tidur lebih aman dan nyenyak, memulihkan tenaga lebih baik, dan mengurangi stres dari ancaman predasi yang sebelumnya konstan.',
          'Sebelum api, manusia purba kemungkinan tidur di pohon seperti simpanse — untuk menghindari predator. Api di tanah memungkinkan mereka tidur di bawah pohon, kemudian di gua, dengan jauh lebih aman. Transisi ini juga mengubah postur tidur dan mungkin berkontribusi pada evolusi punggung bawah yang lebih lurus pada manusia.'
        ]
      }
    ],

    // ---- TAB: SOSIAL ----
    sosial: [
      {
        id: 'social', title: '🏘 Kehidupan Sosial & Organisasi Praaksara', tag: 'Sosiologi Purba', tc: '#44ddaa',
        difficulty: 'medium',
        desc: 'Bagaimana manusia praaksara membangun komunitas, membagi kerja, berdagang, berkomunikasi, dan menciptakan sistem kepercayaan yang kompleks.',
        sections: [
          {
            t: 'Evolusi Organisasi Sosial — Dari Band ke Kerajaan',
            d: 'Masyarakat manusia tidak pernah diam — ia terus berkembang dari kelompok kecil yang sederhana menjadi organisasi yang semakin besar dan kompleks seiring kemajuan teknologi dan ekonomi.',
            sub: [
              { t: 'Band — 20 sampai 50 Orang (Paleolitikum)', d: 'Unit sosial paling mendasar. Semua anggota saling kenal secara personal. Kepemimpinan berdasarkan kemampuan, bukan warisan. Pengambilan keputusan kolektif dan konsensus. Sangat fleksibel — anggota bisa berpindah antara band yang berbeda. Tidak ada "pemerintahan" formal, tapi ada norma sosial yang kuat yang mengatur perilaku.' },
              { t: 'Tribe/Suku — 150 sampai 1.500 Orang (Mesolitikum)', d: 'Beberapa band yang saling berhubungan melalui pertalian kekerabatan, pernikahan, dan ritual bersama. Mulai ada identitas kelompok yang kuat: nama suku, bahasa khusus, simbol identitas. Pemimpin semakin permanen tapi masih berdasarkan prestise personal. Pertukaran perempuan antar band untuk menghindari inbreeding dan membangun aliansi.' },
              { t: 'Chiefdom — Ribuan Orang (Neolitikum)', d: 'Pemimpin (kepala suku/chieftain) punya kekuasaan yang diwariskan dari orang tua. Surplus pangan memungkinkan membiayai spesialis non-pertanian: pengrajin, tentara, dukun, pedagang. Mulai ada stratifikasi sosial yang jelas: bangsawan vs rakyat biasa. Redistribusi pangan: kepala suku mengumpulkan dan mendistribusikan surplus — cikal bakal pajak dan layanan publik.' },
              { t: 'Awal Negara (Perundagian)', d: 'Teknologi logam + surplus pertanian + perdagangan intensif + pertumbuhan populasi = munculnya negara awal. Ciri-ciri: wilayah geografis yang tetap dengan batas yang diakui, sistem hukum yang tertulis atau kuat secara oral, tentara profesional, sistem pajak, dan birokrasi sederhana. Inilah awal peradaban dan akhir praaksara.' }
            ]
          },
          {
            t: 'Sistem Keluarga & Pernikahan',
            d: 'Sistem keluarga dan pernikahan di masyarakat praaksara jauh lebih beragam dari yang dibayangkan.',
            sub: [
              { t: 'Monogami Serial', d: 'Studi primatologi dan arkeologi menunjukkan sebagian besar masyarakat band bersifat monogam serial: pasangan jangka panjang tapi tidak harus seumur hidup. Ini berbeda dari monogami ketat maupun poligami ekstrem.' },
              { t: 'Sistem Kekerabatan Matrilineal & Patrilineal', d: 'Masyarakat berburu-meramu umumnya lebih egaliter antara gender. Dengan kemunculan pertanian dan kepemilikan lahan, sistem patrilineal (garis ayah) cenderung mendominasi karena kontrol atas lahan wariskan lewat anak laki-laki. Namun banyak suku di Nusantara (Minangkabau, Suku Kerinci) mempertahankan sistem matrilineal — kemungkinan warisan dari era sebelum pertanian.' },
              { t: 'Pernikahan sebagai Aliansi Politik', d: 'Di era Neolitikum dan seterusnya, pernikahan semakin menjadi instrumen politik dan ekonomi. Pernikahan antar kepala suku yang berbeda menciptakan aliansi, mencegah perang, dan membuka akses perdagangan. Perempuan sering menjadi "mata uang" diplomasi dalam masyarakat patrilineal.' }
            ]
          },
          {
            t: 'Sistem Perdagangan & Pertukaran',
            d: 'Manusia praaksara sudah berdagang jauh sebelum ada uang atau pasar formal. Sistem pertukaran mereka lebih kompleks dari sekedar barter.',
            sub: [
              { t: 'Gift Economy — Ekonomi Hadiah', d: 'Bukan "jual beli" tapi pertukaran hadiah yang menciptakan kewajiban sosial. Memberi = membangun hubungan dan kewajiban balasan. Hutang dalam gift economy bukan uang tapi kewajiban sosial: "kamu pernah memberi kami daging, kami akan membantu kalian saat musim kemarau." Sistem ini membangun jaring pengaman sosial yang sangat kuat.' },
              { t: 'Bukti Perdagangan Jarak Jauh', d: 'Obsidian dari gunung berapi di Kepulauan Filipina ditemukan di situs-situs di Malaysia dan Sulawesi (>1.000 km). Shell (Spondylus — kerang laut dari pantai) ditemukan di permukiman pedalaman ratusan km dari pantai. Pigmen oker (red ochre) ditemukan jauh dari sumber batuan merahnya. Ini semua menunjukkan jaringan pertukaran regional yang aktif.' },
              { t: 'Jalur Perdagangan Maritim Nusantara', d: 'Kemampuan navigasi laut manusia Nusantara sudah berkembang dari Mesolitikum. Perahu dayung sederhana kemudian berkembang menjadi prahu layar dengan cadik (outrigger) yang memungkinkan pelayaran jarak jauh. Jaringan perdagangan antar pulau Nusantara adalah cikal bakal Jalur Rempah yang kemudian menarik perhatian dunia.' }
            ]
          },
          {
            t: 'Sistem Komunikasi & Bahasa',
            d: 'Kemampuan bahasa manusia adalah fitur paling revolusioner yang membedakan kita dari semua hewan lain.',
            sub: [
              { t: 'Evolusi Bahasa', d: 'Bahasa manusia tidak muncul tiba-tiba. Secara bertahap berkembang dari: komunikasi gestural dan vokal sederhana (sudah ada sejak Homo erectus) → proto-bahasa dengan kosakata terbatas → bahasa simbolik kompleks dengan tata bahasa (mungkin muncul ~100.000 – 70.000 tahun lalu pada Homo sapiens). Munculnya bahasa penuh ini kemungkinan yang memungkinkan Revolusi Kognitif dan ekspansi manusia ke seluruh dunia.' },
              { t: 'Peran Narasi & Cerita', d: 'Kemampuan manusia untuk bercerita tentang hal-hal yang tidak ada di depan mata ("ada harimau di lembah sebelah") adalah keunggulan evolusioner yang luar biasa. Lebih dari itu: cerita tentang hal yang tidak nyata (dewa, leluhur, roh, nasib) memungkinkan koordinasi sosial dalam skala besar — ribuan orang yang tidak saling kenal bisa bekerja sama berdasarkan kepercayaan pada cerita yang sama.' },
              { t: 'Lukisan Gua sebagai Bahasa Visual', d: 'Seni gua bukan hanya ekspresi estetika — ia adalah sistem komunikasi visual yang melampaui batas waktu dan kelompok. Tanda-tanda abstrak yang ditemukan di gua-gua di berbagai benua memiliki kemiripan yang sulit dijelaskan oleh kebetulan — mungkin ada "kosakata visual" bersama yang disebarkan melalui migrasi atau kontak antar kelompok.' }
            ]
          },
          {
            t: 'Kepercayaan & Spiritualitas Praaksara',
            d: 'Manusia praaksara memiliki kehidupan spiritual yang jauh lebih kaya dan kompleks dari bayangan populer.',
            sub: [
              { t: 'Animisme — Sistem Kepercayaan Paling Tua', d: 'Kepercayaan bahwa semua benda di alam memiliki roh atau kesadaran — pohon, sungai, gunung, angin, hewan — kemungkinan adalah sistem kepercayaan paling awal manusia. Ini bukan "takhayul" primitif tapi sistem penjelasan yang masuk akal untuk orang yang hidup sangat dekat dengan alam dan mengamatinya dengan sangat teliti. Animisme masih bertahan dalam berbagai bentuk di seluruh dunia.' },
              { t: 'Dukun (Shaman) — Mediator Manusia dan Roh', d: 'Di hampir semua masyarakat pemburu-meramu yang diteliti, ada individu khusus (dukun/shaman) yang dianggap mampu berkomunikasi dengan dunia roh: menyembuhkan penyakit, meramalkan berburu, memediasi konflik antara manusia dan alam. Ini adalah "profesi" paling tua dalam sejarah manusia — lebih tua dari petani, pedagang, atau pemimpin politik.' },
              { t: 'Akhirat & Penguburan', d: 'Kepercayaan pada kehidupan setelah kematian hampir universal di seluruh budaya manusia — dan sudah ada sejak setidaknya 300.000 tahun lalu (bukti penguburan Neanderthal). Bekal kubur (alat, makanan, perhiasan) menunjukkan keyakinan bahwa almarhum akan "membutuhkan" benda-benda ini di alam lain. Orientasi penguburan (menghadap matahari terbit) menunjukkan kepercayaan pada kelahiran kembali.' }
            ]
          }
        ],
        facts: [
          'Manusia Paleolitikum rata-rata bekerja hanya 3–5 jam per hari untuk memenuhi kebutuhan makan — jauh lebih sedikit dari manusia pertanian (8–12 jam) atau manusia modern (8+ jam). Antropolog Marshall Sahlins menyebut masyarakat berburu-meramu sebagai "Original Affluent Society" (Masyarakat Sejahtera Pertama) — bukan kaya harta, tapi kaya waktu bebas.',
          'Sebuah penelitian pada populasi San (!Kung) di Kalahari menunjukkan bahwa mereka rata-rata mengonsumsi lebih dari 80 spesies tanaman dan berbagai hewan — diet jauh lebih bervariasi dan bergizi dari petani yang bergantung pada 2–3 tanaman pokok. Perubahan ke pertanian adalah pertukaran: lebih banyak kalori, lebih sedikit keragaman nutrisi.',
          'Konsep "properti privat" sangat asing bagi masyarakat band. Di antara banyak suku pemburu-meramu, memberi adalah norma kultural yang sangat kuat — bahkan ada tekanan sosial yang kuat terhadap orang yang terlalu menimbun. Seseorang yang berburu rusa besar wajib membagikannya ke seluruh band, bukan menyimpannya untuk keluarga inti. Kegagalan berbagi adalah kejahatan sosial paling serius.',
          'Ukuran otak manusia justru mengecil sekitar 10% dalam 30.000 tahun terakhir (dari ~1.500 cc menjadi ~1.350 cc). Ini bukan berarti kita semakin bodoh — kemungkinan karena spesialisasi sosial: dalam masyarakat yang sangat terorganisir, tidak semua orang perlu jadi "generalis" serba bisa. Kita "mengoutsource" banyak kecerdasan ke institusi sosial, teknologi, dan spesialis — otak individual tidak perlu sebesar dulu.'
        ]
      },
      {
        id: 'warisan', title: '🏛 Warisan Praaksara dalam Budaya Modern', tag: 'Kesinambungan Budaya', tc: '#ffaa44',
        difficulty: 'basic',
        desc: 'Jejak kehidupan praaksara yang masih hidup dalam tradisi, bahasa, kepercayaan, dan budaya Indonesia hingga hari ini.',
        sections: [
          {
            t: 'Tradisi Adat yang Berakar Praaksara',
            d: 'Banyak tradisi adat Indonesia yang masih dipraktikkan hari ini memiliki akar yang bisa ditelusuri langsung ke era praaksara.',
            sub: [
              { t: 'Tradisi Megalitik Nias', d: 'Desa-desa Nias di Sumatera Utara masih mendirikan menhir baru dalam upacara "owasa" — pesta adat yang membutuhkan pendirian batu besar sebagai simbol status dan penghormatan leluhur. Ini adalah salah satu tempat di dunia di mana tradisi yang berasal dari era Neolitikum masih dipraktikkan langsung, bukan hanya sebagai museum.' },
              { t: 'Upacara Kematian Toraja', d: '"Rambu Solo" (upacara kematian Toraja, Sulawesi Selatan) mencerminkan kepercayaan megalitik tentang kehidupan setelah mati: almarhum disimpan berbulan-bulan atau bertahun-tahun sebelum dikuburkan, menerima "bekal" (hewan kurban, barang berharga), dan arwahnya diyakini masih hadir. Patung "Tau Tau" (patung kayu berbentuk almarhum) adalah kelanjutan dari tradisi arca megalitik.' },
              { t: 'Animisme dalam Kepercayaan Lokal', d: 'Kepercayaan akan roh pohon tua, roh sungai, roh gunung, dan benda-benda keramat (pusaka) yang masih ditemukan di hampir seluruh daerah di Indonesia adalah warisan langsung sistem kepercayaan animisme-dinamisme praaksara — yang bertahan bahkan setelah agama-agama besar masuk.' }
            ]
          },
          {
            t: 'Teknologi Praaksara yang Masih Digunakan',
            d: 'Beberapa teknologi yang dikembangkan di era praaksara masih digunakan atau menjadi fondasi teknologi modern.',
            sub: [
              { t: 'Gerabah & Keramik', d: 'Teknologi membakar tanah liat yang pertama dikembangkan di Neolitikum kini telah berkembang menjadi industri keramik, ubin, dan bata modern. Di Indonesia, pusat-pusat keramik tradisional seperti Kasongan (Yogyakarta) dan Bayat (Klaten) masih menggunakan teknik pembentukan tangan yang berusia ribuan tahun.' },
              { t: 'Tenun Tradisional', d: 'Seni tenun yang akarnya ada di Neolitikum — memisahkan dan menyilangkan serat menjadi kain — masih hidup dalam ratusan tradisi tenun daerah Indonesia: batik, ikat, songket, tenun Nusa Tenggara, dan banyak lagi. Masing-masing mempertahankan motif yang kadang berakar pada simbol-simbol praaksara.' },
              { t: 'Pertanian Ladang Berpindah', d: 'Sistem pertanian "slash and burn" (tebang-bakar) yang pertama kali dikembangkan di Neolitikum masih dipraktikkan oleh komunitas-komunitas adat di Kalimantan, Sumatera, dan Papua. Meski sering dikritik secara lingkungan, sistem ini sebenarnya dirancang untuk kondisi hutan tropis dan memiliki rotasi yang berkelanjutan jika dilakukan dengan benar.' }
            ]
          }
        ],
        facts: [
          'Bahasa Indonesia yang kita gunakan sehari-hari adalah keturunan langsung dari Proto-Austronesia — bahasa nenek moyang yang dituturkan oleh pelaut-pelaut yang bermigrasi dari Taiwan ~4.000 tahun lalu. Kata-kata dasar seperti "aku", "ikan", "laut", "mata" memiliki kerabat dalam bahasa Malagasi (Madagaskar), Tagalog (Filipina), dan bahkan bahasa Māori (Selandia Baru) — semua dari akar Proto-Austronesia yang sama.',
          'Sistem gotong royong dalam masyarakat Indonesia — tradisi bekerja bersama tanpa bayaran untuk kepentingan bersama — adalah warisan langsung dari struktur band dan tribe praaksara, di mana kerjasama adalah satu-satunya cara bertahan. Ini bukan "nilai baru" yang diciptakan — ini adalah naluri kerjasama kolektif yang sudah ada jauh sebelum Indonesia ada sebagai konsep.',
          'Motif-motif pada tenun ikat tradisional NTT, kain ulos Batak, dan batik tradisional Jawa mengandung simbol-simbol yang para etnolog percaya berasal dari era megalitikum atau bahkan Neolitikum — spiral (lambang kelahiran kembali/kesuburan), tumpal (segitiga — gunung suci), dan pola geombang (air/kehidupan). Seni tekstil Indonesia adalah museum hidup praaksara yang bisa dipakai.'
        ]
      }
    ],

    // ---- TAB: TEORI ----
    teori: [
      {
        id: 'teori', title: '🔬 Teori & Metode Penelitian Praaksara', tag: 'Metodologi & Filosofi Ilmu', tc: '#ffcc55',
        difficulty: 'expert',
        desc: 'Bagaimana ilmuwan mempelajari masa yang tidak memiliki catatan tertulis — metode, teori, dan perdebatan terpanas dalam arkeologi & paleoantropologi modern.',
        sections: [
          {
            t: 'Mengapa Disebut "Praaksara"?',
            d: '"Praaksara" = sebelum aksara (tulisan). Di Eropa: <b>Prehistory</b>. Di Indonesia: <b>Prasejarah</b> atau Praaksara. Ini bukan masa tanpa sejarah — tapi masa tanpa catatan tertulis. Sejarah tetap terjadi, hanya kita harus membacanya dari artefak, fosil, dan lapisan tanah.',
            sub: [
              { t: 'Masalah Definisi yang Menarik', d: 'Kapan praaksara berakhir berbeda di setiap daerah — tergantung kapan tulisan pertama kali digunakan di sana. Di Mesopotamia, tulisan muncul ~3.200 SM. Di Mesir ~3.100 SM. Di Cina ~1.200 SM. Di Nusantara, prasasti tertua (Prasasti Yupa dari Kerajaan Kutai) berumur ~400 M. Jadi "praaksara Indonesia" berlangsung jauh lebih lama dari "praaksara Mesir" — perbedaan 3.500 tahun!' },
              { t: 'Sumber Sejarah Praaksara', d: 'Tidak ada dokumen tertulis sama sekali. Sumber utama: <b>Fosil</b> (tulang manusia dan hewan), <b>Artefak</b> (alat, perhiasan, tembikar), <b>Ekofak</b> (sisa organik non-artefak: biji, tulang hewan, serbuk sari), <b>Fitur</b> (struktur permanen: perapian, lubang tiang, parit), <b>Pigmen</b> (cat untuk lukisan gua), dan kini juga <b>DNA kuno</b> dari tulang.' }
            ]
          },
          {
            t: 'Metode Penanggalan — Bagaimana Kita Tahu Usianya?',
            d: 'Salah satu tantangan terbesar arkeologi adalah menentukan usia artefak dan situs. Para ilmuwan menggunakan berbagai metode yang saling melengkapi.',
            sub: [
              { t: 'Penanggalan Radiokarbon (C-14)', d: 'Semua makhluk hidup menyerap karbon-14 dari atmosfer. Setelah mati, C-14 meluruh pada laju konstan (waktu paruh 5.730 tahun). Dengan mengukur berapa C-14 yang tersisa, bisa diperkirakan kapan organisme itu mati. Akurat untuk bahan organik berumur hingga ~50.000 tahun (setelah itu C-14 terlalu sedikit untuk diukur). Cocok untuk: tulang, arang, kayu, cangkang, biji.' },
              { t: 'Penanggalan Kalium-Argon (K-Ar) & Argon-Argon (Ar-Ar)', d: 'Kalium-40 dalam batuan vulkanik meluruh menjadi Argon-40 pada laju sangat lambat (waktu paruh 1,25 miliar tahun). Mengukur rasio K-40:Ar-40 memberikan usia batuan vulkanik dengan akurasi tinggi untuk rentang jutaan tahun. Digunakan untuk menentukan usia lapisan abu vulkanik di atas atau bawah fosil — dan dengan demikian usia fosil itu sendiri.' },
              { t: 'Luminescence Dating (OSL & TL)', d: '<b>Optically Stimulated Luminescence (OSL)</b>: mengukur berapa lama mineral (kuarsa, feldspar) terakhir kali terkena cahaya matahari. <b>Thermoluminescence (TL)</b>: mengukur berapa lama benda terakhir dipanaskan hingga suhu tinggi. Sangat berguna untuk menentukan usia benda yang tidak mengandung karbon organik, seperti batu yang dipanaskan dan gerabah.' },
              { t: 'Stratigrafi — Membaca Lapisan Waktu', d: 'Prinsip dasar: lapisan tanah yang lebih dalam = lebih tua (Hukum Superposisi, Nicolas Steno, 1669). Dengan menganalisis urutan lapisan (stratum) dan apa yang ada di masing-masing lapisan, arkeolog bisa menentukan urutan kronologis relatif temuan — bahkan tanpa penanggalan absolut. Ini dasar arkeologi lapangan yang masih digunakan setiap hari.' },
              { t: 'DNA Kuno (Ancient DNA)', d: 'Revolusi terbaru dalam arkeologi. DNA bisa diekstrak dari tulang berumur hingga 700.000 tahun (jika tersimpan di lingkungan dingin). DNA kuno dapat mengungkap: hubungan antara individu yang ditemukan, migrasi populasi masa lalu, kawin campur antar spesies, dan bahkan sifat fisik (warna rambut, mata, kulit). Svante Pääbo mendapat Nobel Fisiologi 2022 untuk karyanya di bidang ini.' }
            ]
          },
          {
            t: 'Perdebatan Ilmiah Terpanas Saat Ini',
            d: 'Praaksara bukan bidang yang "sudah selesai" — ini adalah salah satu bidang sains yang paling dinamis dan penuh debat.',
            sub: [
              { t: '"Out of Africa" vs Kontribusi Regional', d: '"Out of Africa" (OOA) theory: manusia modern (Homo sapiens) berevolusi di Afrika dan kemudian menyebar ke seluruh dunia, menggantikan semua populasi lokal (Homo erectus, Neanderthal, dll). Kini dimodifikasi: DNA kuno membuktikan ada kawin campur signifikan antara Homo sapiens dan Neanderthal (di Timur Tengah/Eropa), serta dengan Denisovan (di Asia). Jadi OOA dengan beberapa "campuran lokal" adalah gambaran yang paling akurat saat ini.' },
              { t: 'Usia Gunung Padang — Kontroversi Besar', d: 'Tim Riset 2023 yang dipimpin Dr. Danny Hilman Natawidjaja mengklaim struktur terdalam Gunung Padang berumur 25.000 – 14.000 tahun — jauh sebelum pertanian ada. Klaim ini akan membalikkan semua teori tentang kemampuan manusia purba. Komunitas arkeologi internasional sangat skeptis: metodologi dipertanyakan, penafsiran data diperdebatkan. Diperlukan penelitian independen yang lebih ketat.' },
              { t: 'Kepunahan Megafauna — Manusia atau Iklim?', d: 'Mammoth, mastodon, harimau gigi pedang, dan banyak megafauna lain punah dalam 50.000 – 10.000 tahun terakhir. Penyebab: (A) Overkill manusia — korelasi kuat antara kedatangan manusia modern di suatu wilayah dan kepunahan megafauna setempat. (B) Perubahan iklim — akhir Zaman Es mengubah habitat secara drastis. Konsensus saat ini: KEDUANYA berperan, tapi proporsinya berbeda di setiap kasus.' },
              { t: 'Asal-Usul Bahasa — Kapan Manusia Pertama Berbicara?', d: 'Tidak ada fosil bahasa. Kita tidak bisa tahu kapan tepatnya bahasa kompleks muncul. Bukti tidak langsung: ukuran area Broca di otak (kontrol bahasa), anatomi laring dan hioid (tulang lidah), dan kapan seni simbolik kompleks pertama kali muncul. Kebanyakan ilmuwan menduga bahasa penuh muncul antara 100.000 – 50.000 tahun lalu, dipicu oleh atau bersamaan dengan "Revolusi Kognitif" yang menghasilkan seni, perhiasan, dan perdagangan jarak jauh.' }
            ]
          },
          {
            t: 'Etika dalam Arkeologi Modern',
            d: 'Arkeologi modern sangat berbeda dari era "penggalian besar-besaran" abad ke-19 — ada dimensi etika yang semakin penting.',
            sub: [
              { t: 'Repatriasi Artefak', d: 'Ratusan ribu artefak praaksara dan arkeologis dari negara berkembang (termasuk Indonesia) berada di museum-museum Eropa dan Amerika — diambil selama era kolonial. Gerakan repatriasi semakin kuat: beberapa negara menuntut kembali warisan budaya mereka. Museum-museum besar di Eropa kini mulai mengembalikan sejumlah koleksi secara bertahap.' },
              { t: 'Penggalian yang Bertanggung Jawab', d: 'Penggalian arkeologi merusak situs secara permanen — tidak bisa diulang. Etika modern: gali hanya sebagian dari situs (sisakan untuk teknologi masa depan yang lebih baik), dokumentasikan secara menyeluruh, libatkan komunitas lokal, dan pastikan temuan bermanfaat bagi masyarakat yang wilayahnya digali.' },
              { t: 'Hak Komunitas Adat', d: 'Situs praaksara sering berada di tanah adat atau berkaitan dengan leluhur komunitas adat yang masih hidup. Penelitian modern harus melibatkan izin dan persetujuan komunitas, berbagi temuan dengan mereka, dan menghormati perspektif mereka tentang masa lalu yang diteliti.' }
            ]
          }
        ],
        facts: [
          'Willard Libby menemukan teknik penanggalan radiokarbon pada 1949 dan langsung merevolusi seluruh arkeologi — tiba-tiba setiap artefak organik bisa diberi tanggal absolut. Ia mendapat Nobel Kimia 1960. Sebelum C-14, arkeolog hanya bisa menentukan usia relatif (mana yang lebih tua dari yang lain) berdasarkan stratigrafi. Dengan C-14, mereka pertama kali bisa berkata "benda ini berumur persis 14.800 tahun".',
          'Svante Pääbo, yang mendapat Nobel Fisiologi 2022 untuk penelitian DNA kuno, menemukan cara mengekstrak dan membaca DNA dari tulang Neanderthal yang berumur 40.000 tahun — dan membuktikan bahwa Homo sapiens kawin campur dengan Neanderthal. Ini membalikkan konsensus puluhan tahun sebelumnya yang menyatakan kedua spesies tidak pernah berinteraksi secara reproduktif. DNA kuno adalah revolusi terbesar dalam arkeologi sejak penanggalan radiokarbon.',
          'Paradoks arkeologi: hal-hal yang paling penting sering adalah yang paling sulit ditemukan. Bahasa — tidak meninggalkan fosil. Emosi, mimpi, cerita, musik, kepercayaan — tidak meninggalkan jejak materi. Alat batu yang merupakan "sampah" bertahan 2,6 juta tahun; sementara barang berharga dari kayu, kulit, serat, dan kain dari manusia yang sama sudah hilang tanpa jejak dalam ribuan tahun. Kita mengetahui praaksara terutama dari "sampah" mereka.',
          'Sebuah situs arkeologi yang digali secara ilmiah hancur permanen — tidak bisa "dikembalikan". Inilah mengapa arkeolog modern menggunakan metodologi yang sangat hati-hati, mendokumentasikan setiap milimeter, dan sengaja meninggalkan sebagian besar situs untuk digali oleh generasi mendatang yang akan memiliki teknologi lebih baik. Filosofinya: "arkeologi terbaik adalah yang tidak perlu dilakukan karena sumber sudah cukup terawat".'
        ]
      },
      {
        id: 'sumber', title: '📜 Sumber & Prasasti Awal Nusantara', tag: 'Transisi ke Sejarah', tc: '#ff9944',
        difficulty: 'medium',
        desc: 'Bagaimana Nusantara bertransisi dari praaksara ke sejarah — prasasti pertama, pengaruh India, dan awal kerajaan-kerajaan Nusantara.',
        sections: [
          {
            t: 'Transisi dari Praaksara ke Sejarah di Nusantara',
            d: 'Berbeda dari Mesir atau Mesopotamia yang memasuki era tulisan ribuan tahun lebih awal, Nusantara baru memasuki era sejarah (aksara) pada sekitar abad ke-4 Masehi — dengan masuknya pengaruh budaya India.',
            sub: [
              { t: 'Prasasti Yupa — Tulisan Tertua di Indonesia', d: 'Ditemukan di tepian Sungai Mahakam, Kalimantan Timur. Tujuh prasasti batu yang ditulis dalam bahasa Sansekerta menggunakan aksara Pallawa, menceritakan kerajaan Kutai Martapura dan rajanya Mulawarman yang mengadakan upacara yajña (kurban). Diperkirakan berasal dari abad ke-4 M. Ini menandai berakhirnya era praaksara Indonesia secara formal.' },
              { t: 'Mengapa India?', d: 'Masuknya pengaruh India bukan melalui penaklukan militer (tidak ada bukti invasi India ke Nusantara) tapi melalui perdagangan. Pedagang India membawa agama Hindu-Buddha, sistem tulisan (aksara Pallawa), bahasa Sansekerta, dan konsep kerajaan. Elit lokal Nusantara mengadopsi unsur-unsur ini untuk memperkuat kekuasaan dan status mereka — disebut "Indianisasi" atau "Hinduisasi".' }
            ]
          },
          {
            t: 'Warisan Praaksara dalam Prasasti Awal',
            d: 'Menariknya, prasasti-prasasti awal Nusantara tidak memotong tradisi praaksara secara total — banyak elemen praaksara yang bertahan dan bercampur dengan unsur India.',
            sub: [
              { t: 'Animisme dalam Naskah Hindu', d: 'Ritual-ritual yang digambarkan dalam prasasti awal dan naskah Jawa kuno sering menggabungkan unsur animisme dan dinamisme lokal dengan upacara Hindu. Konsep "kekuatan gaib" dalam benda (mana/wahyu) tetap hidup dan dibalut dalam terminologi Hindu-Jawa.' },
              { t: 'Kontinuitas Kepemimpinan', d: 'Konsep "kepala suku" yang kekuasaannya dilegitimasi oleh hubungan dengan roh leluhur dan alam gaib — warisan praaksara — bertransformasi menjadi raja yang dilegitimasi oleh hubungan dengan dewa-dewa Hindu. Struktur sosialnya serupa, hanya terminologi dan kosmologinya yang berubah.' }
            ]
          }
        ],
        facts: [
          'Aksara Jawa (Hanacaraka) yang kini diajarkan di sekolah-sekolah Jawa adalah keturunan langsung aksara Pallawa India yang dibawa ke Nusantara ~1.600 tahun lalu — yang sendirinya adalah keturunan aksara Brahmi India Kuno. Jadi saat menulis aksara Jawa, kamu sedang menggunakan sistem tulisan yang akarnya ada di India kuno lebih dari 2.000 tahun lalu.',
          'Di beberapa daerah terpencil Indonesia, transisi dari "praaksara" ke "beraksara" baru terjadi dalam abad ke-20 — ketika misionaris Kristen atau Islam pertama kali membawa tulisan ke komunitas yang sebelumnya hanya menggunakan tradisi oral. Jadi secara teknis, ada bagian dari Indonesia yang baru keluar dari "era praaksara" dalam 100 tahun terakhir — sesuai definisi praaksara = sebelum ada tulisan.',
          'Bahasa Sansekerta meninggalkan jejak luar biasa besar dalam bahasa Indonesia dan bahasa daerah Nusantara. Perkiraan: 20–25% kosakata bahasa Jawa kuno adalah serapan Sansekerta. Bahasa Indonesia modern pun penuh kata Sansekerta: "bahasa" (bhāṣā), "manusia" (manuṣya), "desa" (deśa), "bangsa" (vaṃśa), "nusantara" (dvīpāntara = "pulau lain" atau "pulau seberang"). Warisan linguistik ini adalah salah satu dampak terkuat dari Indianisasi Nusantara.'
        ]
      }
    ]
  };

  // ============================================================
  //  HELPER: CREATE SECTION HEADER (untuk tab zaman)
  // ============================================================
  function createSectionHeader(label, subtitle) {
    const frag = document.createDocumentFragment();

    const hdr = document.createElement('div');
    hdr.className = 'libSectionHeader';
    hdr.innerHTML = `
      <div class="libSectionLine"></div>
      <div class="libSectionLabel">${label}</div>
      <div class="libSectionLine"></div>`;

    const sub = document.createElement('div');
    sub.className = 'libSectionSub';
    sub.textContent = '— ' + subtitle;

    frag.appendChild(hdr);
    frag.appendChild(sub);
    return frag;
  }

  // ============================================================
  //  HELPER: CREATE CARD ELEMENT
  // ============================================================
  function createCard(item) {
    const diffMap = {
      basic:    ['diff-basic',    'Dasar'],
      medium:   ['diff-medium',   'Menengah'],
      advanced: ['diff-advanced', 'Lanjutan'],
      expert:   ['diff-expert',   'Ahli']
    };
    const [dc, dl] = diffMap[item.difficulty] || ['diff-basic', 'Dasar'];
    const card = document.createElement('div');
    card.className = 'libCard';
    card.style.borderColor = item.tc + '55';
    card.innerHTML = `
      <div class="libCardTitle">${item.title}</div>
      <div class="libCardDesc">${item.desc}</div>
      <span class="libTag" style="background:${item.tc}22;color:${item.tc};border:1px solid ${item.tc}44;">${item.tag}</span>
      <span class="libDiff ${dc}">${dl}</span>`;
    card.onclick = () => openDetail(item);
    return card;
  }

  // ============================================================
  //  UI FUNCTIONS (identik dengan asli, hanya buildGrid diperluas)
  // ============================================================
  function open(fromGameMode = false) {
    fromGame = fromGameMode;
    document.getElementById('library').style.display = 'flex';
    document.getElementById('library').style.flexDirection = 'column';
    switchTab('zaman');
  }

  function close() {
    document.getElementById('library').style.display = 'none';
    if (!fromGame) {
      document.getElementById('mainMenu').style.display = 'flex';
    }
  }

  function switchTab(tab) {
    activeTab = tab;
    document.querySelectorAll('.libTab').forEach(t => t.classList.remove('active'));
    document.querySelector(`.libTab[onclick*="${tab}"]`)?.classList.add('active');
    buildGrid(tab);
  }

  function buildGrid(tab) {
    const grid = document.getElementById('libGrid');
    grid.innerHTML = '';
    const items = CONTENT[tab] || [];

    if (tab === 'zaman') {
      // ---- Seksi Arkeologi ----
      grid.appendChild(createSectionHeader(
        '🏛 MENURUT ARKEOLOGI',
        'Berdasarkan perkembangan teknologi & kebudayaan manusia'
      ));
      items.filter(i => !i.isGeologi).forEach(item => grid.appendChild(createCard(item)));

      // ---- Seksi Geologi ----
      grid.appendChild(createSectionHeader(
        '🌍 MENURUT GEOLOGI',
        'Berdasarkan lapisan batuan & kondisi bumi purba (dari yang tertua)'
      ));
      items.filter(i => i.isGeologi).forEach(item => grid.appendChild(createCard(item)));
    } else {
      items.forEach(item => grid.appendChild(createCard(item)));
    }

    if (items.length === 0) {
      grid.innerHTML = '<div style="color:#556;padding:20px;text-align:center;">Konten segera hadir...</div>';
    }
  }

  function openDetail(item) {
    const id = 'ld_' + item.id;
    let el = document.getElementById(id);
    if (!el) {
      el = document.createElement('div');
      el.className = 'libDetail';
      el.id = id;
      el.innerHTML = buildDetailHTML(item);
      document.body.appendChild(el);
    }
    el.style.display = 'block';
    el.scrollTop = 0;
  }

  function buildDetailHTML(item) {
    let h = `<button class="ldClose" onclick="document.getElementById('ld_${item.id}').style.display='none'">✕ Tutup</button>`;
    h += `<div class="ldTitle">${item.title}</div>`;
    h += `<div class="ldHint">Mode interaktif: tap kartu 💡 untuk mengungkap fakta per-huruf.</div>`;

    // Sections
    item.sections.forEach(s => {
      h += `<div class="ldSection"><div class="ldSTitle">${s.t}</div><div class="ldText">${s.d}</div>`;
      if (s.sub) {
        s.sub.forEach(sub => {
          h += `<div class="ldSubSection"><div class="ldSubTitle">${sub.t}</div><div class="ldSubText">${sub.d}</div></div>`;
        });
      }
      h += '</div>';
    });

    // Timeline
    if (item.timeline) {
      h += `<div class="ldSection"><div class="ldSTitle">📅 Garis Waktu</div><div class="ldTimeline">`;
      item.timeline.forEach(tl => {
        h += `<div class="ldTLItem">
          <div class="ldTLDot" style="background:${tl.color};"></div>
          <div class="ldTLLine"><div class="ldTLDate">${tl.date}</div><div class="ldTLDesc">${tl.desc}</div></div>
        </div>`;
      });
      h += '</div></div>';
    }

    // Table
    if (item.table) {
      h += `<div class="ldSection"><div class="ldSTitle">📊 Perbandingan</div>
        <table class="ldTable"><thead><tr>`;
      item.table.headers.forEach(hdr => { h += `<th>${hdr}</th>`; });
      h += '</tr></thead><tbody>';
      item.table.rows.forEach(row => {
        h += '<tr>';
        row.forEach(cell => { h += `<td>${cell}</td>`; });
        h += '</tr>';
      });
      h += '</tbody></table></div>';
    }

    // Facts
    if (item.facts) {
      h += `<div class="ldSection"><div class="ldSTitle">💡 Fakta Mengejutkan</div>`;
      item.facts.forEach((f, idx) => {
        h += `
          <div class="ldFact ldFactCard" onclick="Library.revealFact('ld_${item.id}',${idx})">
            <div class="ldFactLabel">💡 FAKTA (tap untuk buka)</div>
            <div class="ldFactText" id="lf_${item.id}_${idx}">•••</div>
            <div class="ldFactReal" id="lfr_${item.id}_${idx}" style="display:none;">${f}</div>
          </div>`;
      });
      h += '</div>';
    }

    return h;
  }

  function revealFact(detailId, idx) {
    const real = document.getElementById(`lfr_${detailId.replace('ld_','')}_${idx}`);
    const tgt  = document.getElementById(`lf_${detailId.replace('ld_','')}_${idx}`);
    if (!real || !tgt) return;
    const text = real.textContent;
    Typewriter.write(tgt, text, { speed: 14, cursor: true });
  }

  return { open, close, switchTab, revealFact };
})();

const Tutorial = {
  currentPage: 0,
  totalPages: 2,

  open(fromMenu, onDone = null) {
    document.getElementById('tutorial').style.display = 'flex';
    if (!fromMenu) document.getElementById('mainMenu').style.display = 'none';
    this.currentPage = 0;
    this.showPage(0);
  },

  close() {
    document.getElementById('tutorial').style.display = 'none';
    if (!GS.started) document.getElementById('mainMenu').style.display = 'flex';
  },

  showPage(pageNum) {
    if (pageNum < 0 || pageNum >= this.totalPages) return;
    this.currentPage = pageNum;
    document.querySelectorAll('.tutPage').forEach(page => {
      page.classList.remove('active');
    });
    const pageId = `tutPage${pageNum + 1}`;
    const activePage = document.getElementById(pageId);
    if (activePage) activePage.classList.add('active');
    const pageNumEl = document.querySelector('.tutPageNum');
    if (pageNumEl) pageNumEl.textContent = pageNum + 1;
    document.querySelectorAll('.dot').forEach((dot, idx) => {
      dot.classList.toggle('active', idx === pageNum);
    });
    const prevBtn = document.querySelector('.tutNavBtn:first-of-type');
    const nextBtn = document.querySelector('.tutNavBtn:last-of-type');
    if (prevBtn) {
      if (pageNum === 0) {
        prevBtn.classList.add('disable');
      } else {
        prevBtn.classList.remove('disable');
      }
    }
    if (nextBtn) {
      if (pageNum === this.totalPages - 1) {
        nextBtn.textContent = '✓ Mengerti! Mulai Bermain';
        nextBtn.onclick = () => this.close();
      } else {
        nextBtn.textContent = 'Lanjut →';
        nextBtn.onclick = () => this.nextPage();
      }
    }
  },

  nextPage() {
    if (this.currentPage < this.totalPages - 1) {
      this.showPage(this.currentPage + 1);
    }
  },

  prevPage() {
    if (this.currentPage > 0) {
      this.showPage(this.currentPage - 1);
    }
  },

  goToPage(pageNum) {
    this.showPage(pageNum);
  }
};

const Settings = {
  open() {
    document.getElementById('settings').style.display = 'flex';
    const timeSelect = document.getElementById('timeOfDay');
    if (timeSelect) timeSelect.value = GS.timeOfDay;
    const musicToggle = document.getElementById('togMusic');
    if (musicToggle) {
      if (AudioManager.getBGMusicEnabled()) {
        musicToggle.classList.add('on');
      } else {
        musicToggle.classList.remove('on');
      }
    }
    const loopingToggle = document.getElementById('togLooping');
    if (loopingToggle) {
      if (AudioManager.getBGMusicLooping()) {
        loopingToggle.classList.add('on');
      } else {
        loopingToggle.classList.remove('on');
      }
    }
    const flashToggle = document.getElementById('togFlashEpilepsy');
    if (flashToggle) {
      if (GS.flashEpilepsy) {
        flashToggle.classList.add('on');
      } else {
        flashToggle.classList.remove('on');
      }
    }
  },
  close() {
    document.getElementById('settings').style.display = 'none';
    const timeSelect = document.getElementById('timeOfDay');
    if (timeSelect) GS.timeOfDay = timeSelect.value;
  },
  openInGame() {
    PauseMenu.pauseGame();
    document.getElementById('settings').style.display = 'flex';
    const timeSelect = document.getElementById('timeOfDay');
    if (timeSelect) timeSelect.value = GS.timeOfDay;
  },
  toggle(el) { el.classList.toggle('on'); },
  toggleMusic(el) {
    el.classList.toggle('on');
    const enabled = el.classList.contains('on');
    AudioManager.setBGMusicEnabled(enabled);
  },
  toggleLooping(el) {
    el.classList.toggle('on');
    const enabled = el.classList.contains('on');
    AudioManager.setBGMusicLooping(enabled);
  },
  toggleFlashEpilepsy(el) {
    el.classList.toggle('on');
    GS.flashEpilepsy = el.classList.contains('on');
  }
};

const PauseMenu = {
  isPaused: false,

  open() {
    if (!GS.started) return;
    this.pauseGame();
    document.getElementById('pauseMenu').style.display = 'flex';
  },

  resume() {
    this.resumeGame();
    document.getElementById('pauseMenu').style.display = 'none';
    document.getElementById('settings').style.display = 'none';
  },

  backToMenu() {
    if (confirm('Apakah Anda yakin ingin kembali ke menu utama? Progress tidak akan tersimpan.')) {
      this.resumeGame();
      document.getElementById('pauseMenu').style.display = 'none';
      document.getElementById('settings').style.display = 'none';
      GS.started = false;
      Player.reset();
      document.getElementById('gc').style.display = 'none';
      document.getElementById('hud').style.display = 'none';
      document.getElementById('hotbar').style.display = 'none';
      document.getElementById('controls').style.display = 'none';
      document.getElementById('mainMenu').style.display = 'flex';
      AudioManager.stopBGMusic();
    }
  },

  pauseGame() {
    this.isPaused = true;
    GS.paused = true;
  },

  resumeGame() {
    this.isPaused = false;
    GS.paused = false;
  }
};

// ===== MODE SELECT =====
const ModeSelect = {
  open() {
    document.getElementById('mainMenu').style.display = 'none';
    document.getElementById('modeSelect').style.display = 'flex';
  },

  close() {
    document.getElementById('modeSelect').style.display = 'none';
    document.getElementById('mainMenu').style.display = 'flex';
  },

  startGame(mode) {
    GS.gameMode = mode;
    if (mode === 'challenge') {
      GS.challengeTime = 600 * 60;
      GS.enemyMultiplier = 1.5;
    } else {
      GS.challengeTime = 0;
      GS.enemyMultiplier = 1.0;
    }
    document.getElementById('modeSelect').style.display = 'none';
    GameCore.start();
  }
};

/* ===== VERIFIKASI AKHIR (hapus baris ini sebelum deploy) =====
   Tab Zaman    : 5 Arkeologi + 4 Geologi = 9 total ✓
   Tab Manusia  : 2 kartu (evolusi + asal-usul penduduk) ✓
   Tab Alat     : 2 kartu (evolusi alat batu + api) ✓
   Tab Sosial   : 2 kartu (kehidupan sosial + warisan budaya) ✓
   Tab Teori    : 2 kartu (metodologi + sumber prasasti) ✓
   Struktur asli: Library, Tutorial, Settings, PauseMenu, ModeSelect - SEMUA UTUH ✓
   isGeologi flag: hanya ada pada 4 zaman geologi ✓
   buildGrid    : render section header hanya untuk tab 'zaman' ✓
=========================================================== */
