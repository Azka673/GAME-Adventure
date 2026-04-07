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
      {
        id: 'pale', title: '🪨 Paleolitikum', tag: '2,5 juta – 10.000 SM', tc: '#ff8844',
        difficulty: 'basic',
        desc: 'Zaman batu tua. Manusia pertama yang hidup nomaden menggunakan alat batu kasar.',
        sections: [
          {
            t: 'Pengertian & Latar Belakang',
            d: 'Paleolitikum berasal dari bahasa Yunani: <b>palaios</b> (kuno) + <b>lithos</b> (batu). Ini adalah periode terpanjang dalam sejarah manusia — berlangsung sekitar 2,5 juta tahun. Manusia masih sangat bergantung pada alam dan belum mampu mengubah lingkungan secara signifikan.',
            sub: [
              { t: 'Ciri Utama', d: 'Nomaden (berpindah-pindah), berburu dan meramu, tinggal di gua, alat batu kasar, belum mengenal bercocok tanam atau peternakan.' },
              { t: 'Pembagian Zaman', d: '1) Awal Paleolitikum (2,5 juta – 200.000 SM): alat sangat primitif. 2) Tengah Paleolitikum (200.000 – 40.000 SM): mulai ada ritual penguburan. 3) Akhir Paleolitikum (40.000 – 10.000 SM): seni gua mulai berkembang.' }
            ]
          },
          {
            t: 'Kehidupan Sosial',
            d: 'Manusia Paleolitikum hidup dalam kelompok kecil 20–30 orang yang disebut band. Tidak ada pemimpin tetap — kepemimpinan berdasarkan kemampuan berburu. Pembagian kerja sederhana: laki-laki berburu, perempuan meramu tumbuhan.',
            sub: [
              { t: 'Struktur Sosial', d: 'Egaliter (setara). Tidak ada stratifikasi sosial berdasarkan kekayaan. Semua anggota band punya hak yang kurang lebih sama dalam pembagian hasil buruan.' },
              { t: 'Komunikasi', d: 'Awal: gestur dan suara. Kemudian berkembang bahasa lisan sederhana. Lukisan gua juga berfungsi sebagai media komunikasi lintas waktu.' }
            ]
          },
          {
            t: 'Teknologi Alat Batu',
            d: 'Teknik pembuatan alat: <b>perkusi langsung</b> (memukul batu dengan batu lain) menghasilkan serpihan tajam. Alat utama: kapak genggam (hand axe), kapak perimbas, alat serpih (flake tool), dan chopper.',
            sub: [
              { t: 'Kapak Perimbas', d: 'Alat tertua yang ditemukan. Bentuk tidak beraturan, hanya satu sisi yang dipertajam. Fungsi: memotong, menggali, dan memecah tulang hewan.' },
              { t: 'Perkembangan Alat', d: 'Dari Acheulean (kapak genggam simetris) ke Mousterian (serpih lebih halus). Setiap generasi membuat alat yang lebih efisien.' }
            ]
          },
          {
            t: 'Seni & Budaya',
            d: 'Manusia Paleolitikum sudah memiliki kehidupan spiritual dan seni. Lukisan gua ditemukan di seluruh dunia: dari Eropa (Altamira, Lascaux) hingga Indonesia (Maros, Sulawesi Selatan).',
            sub: [
              { t: 'Fungsi Lukisan Gua', d: 'Bukan sekedar dekorasi! Diduga untuk ritual berburu (sympathetic magic), peta wilayah, perekaman kejadian penting, atau komunikasi antar kelompok.' },
              { t: 'Seni di Indonesia', d: 'Gua Leang-Leang (Maros, Sulawesi Selatan) menyimpan lukisan tangan dan babi rusa berumur 45.000 tahun — salah satu seni figuratif tertua di dunia!' }
            ]
          }
        ],
        table: {
          headers: ['Aspek', 'Awal', 'Tengah', 'Akhir'],
          rows: [
            ['Alat', 'Sangat kasar', 'Lebih halus', 'Mikrolith'],
            ['Sosial', 'Band kecil', 'Ritual muncul', 'Seni berkembang'],
            ['Tempat tinggal', 'Alam terbuka', 'Gua', 'Gua + tenda'],
          ]
        },
        facts: [
          'Lukisan tangan di Gua Maros, Sulawesi berumur 45.000 tahun — lebih tua dari lukisan gua Eropa yang selama ini dianggap paling tua!',
          'Manusia Paleolitikum sudah merawat anggota suku yang cacat atau terluka — bukti empati manusia sudah ada sejak 300.000 tahun lalu!',
          'Kapak genggam Acheulean digunakan selama 1 juta tahun tanpa perubahan desain — "teknologi paling sukses" dalam sejarah manusia!'
        ]
      },
      {
        id: 'meso', title: '🌿 Mesolitikum', tag: '10.000 – 5.000 SM', tc: '#44dd88',
        difficulty: 'basic',
        desc: 'Zaman batu tengah. Manusia mulai semi-menetap dan mengembangkan kebudayaan baru.',
        sections: [
          {
            t: 'Transisi Besar',
            d: 'Mesolitikum adalah masa transisi antara kehidupan nomaden murni ke semi-menetap. Iklim bumi mulai memanas setelah Zaman Es berakhir (~12.000 SM), mengubah lanskap dan distribusi hewan buruan.',
            sub: [
              { t: 'Pengaruh Iklim', d: 'Pencairan es menyebabkan naiknya permukaan laut, mengubah garis pantai. Banyak hewan besar (mammoth, badak berbulu) punah — manusia harus beradaptasi.' },
              { t: 'Strategi Baru', d: 'Manusia mulai mengeksploitasi sumber pangan yang lebih beragam: ikan, kerang, burung. Tidak lagi hanya mengandalkan perburuan hewan besar.' }
            ]
          },
          {
            t: 'Kjokkenmodinger — Sampah Dapur Raksasa',
            d: 'Peninggalan paling ikonik Mesolitikum: tumpukan cangkang kerang setinggi hingga 7 meter dan panjang ratusan meter! Ditemukan di pantai timur Sumatera dan Denmark.',
            sub: [
              { t: 'Kandungan', d: 'Berisi: cangkang kerang, tulang ikan, tulang mamalia, alat batu, sisa api unggun, dan terkadang rangka manusia yang dikubur.' },
              { t: 'Makna Arkeologis', d: 'Kjokkenmodinger membuktikan manusia mulai menempati lokasi yang sama berulang kali — cikal bakal konsep "tempat tinggal tetap".' }
            ]
          },
          {
            t: 'Abris Sous Roche',
            d: 'Selain kjokkenmodinger, bukti tempat tinggal Mesolitikum adalah ceruk-ceruk batu karang (abris sous roche) yang digunakan sebagai shelter semi-permanen.',
            sub: [
              { t: 'Di Indonesia', d: 'Abris sous roche ditemukan di Lamoncong (Sulawesi Selatan), Besuki (Jawa Timur), Sampung (Jawa Tengah). Di Sampung ditemukan alat tulang dan gigi hewan.' },
              { t: 'Ciri Temuan', d: 'Di dalam ceruk: alat batu, alat tulang, sisa makanan, abu sisa api, dan kadang lukisan dinding sederhana.' }
            ]
          },
          {
            t: 'Revolusi Mikrolith',
            d: 'Alat Mesolitikum jauh lebih kecil dan presisi — disebut <b>mikrolith</b>. Inovasi besar: alat komposit (gabungan beberapa mikrolith dipasang di gagang kayu/tulang) seperti panah dan tombak bertangkai.',
            sub: [
              { t: 'Keuntungan Mikrolith', d: 'Lebih ringan, lebih mudah dibawa saat berpindah, bisa diganti jika rusak tanpa membuang seluruh alat. Efisiensi jauh meningkat!' },
              { t: 'Panah Busur', d: 'Kemungkinan besar berkembang di era Mesolitikum. Revolusioner! Bisa berburu dari jarak jauh, lebih aman, dan lebih akurat.' }
            ]
          }
        ],
        facts: [
          'Kata Kjokkenmodinger dari bahasa Denmark: "kjokken" = dapur, "modding" = sampah. Arkeolog Denmark pertama menemukan pola ini, lalu mengenali hal serupa di Sumatera!',
          'Manusia Mesolitikum sudah berdagang! Ditemukan batu obsidian (kaca vulkanik) di lokasi jauh dari sumbernya — bukti pertukaran material antar kelompok.',
          'Kepercayaan pada kehidupan setelah mati mulai muncul — jenazah dikubur dengan bekal (alat, makanan), menunjukkan manusia sudah berpikir tentang alam baka.'
        ]
      },
      {
        id: 'neo', title: '🌾 Neolitikum', tag: '5.000 – 2.000 SM', tc: '#44aaff',
        difficulty: 'medium',
        desc: 'Revolusi Neolitik — perubahan terbesar dalam sejarah manusia: bertani dan menetap.',
        sections: [
          {
            t: 'Revolusi Neolitik',
            d: 'Disebut "revolusi" karena perubahannya sangat drastis dan fundamental: dari <b>food gathering</b> (mengumpulkan makanan) ke <b>food producing</b> (memproduksi makanan). Ini mengubah segalanya!',
            sub: [
              { t: 'Mengapa Bisa Terjadi?', d: 'Kombinasi faktor: iklim yang lebih stabil pasca Zaman Es, populasi bertambah sehingga perlu pangan lebih banyak, dan akumulasi pengetahuan tentang siklus tumbuhan selama berabad-abad.' },
              { t: 'Dampak Langsung', d: '1) Manusia HARUS menetap untuk merawat tanaman. 2) Surplus pangan memungkinkan spesialisasi pekerjaan. 3) Populasi meledak. 4) Muncul pemilikan lahan dan konflik territorial.' }
            ]
          },
          {
            t: 'Pertanian & Tanaman',
            d: 'Tanaman pertama yang didomestikasi: gandum dan jelai (Timur Tengah, ~9.000 SM), padi (Cina, ~8.000 SM), jagung (Amerika, ~7.000 SM), ubi dan keladi (Papua/Asia Tenggara).',
            sub: [
              { t: 'Di Indonesia', d: 'Manusia Neolitikum di Nusantara menanam: ubi (talas), sagu, kelapa, pisang, dan kemudian padi. Bercocok tanam di ladang (slash and burn) maupun sawah sederhana.' },
              { t: 'Peternakan', d: 'Bersamaan dengan pertanian: anjing (pertama didomestikasi), babi, kambing, sapi, dan unggas mulai dipelihara untuk pangan dan tenaga kerja.' }
            ]
          },
          {
            t: 'Perubahan Sosial Fundamental',
            d: 'Menetap + surplus pangan = perubahan sosial besar-besaran. Muncul pembagian kerja: petani, pengrajin, pemimpin, dukun. Inilah cikal bakal stratifikasi sosial!',
            sub: [
              { t: 'Pembagian Kerja', d: 'Tidak semua orang harus mencari makan. Sebagian bisa fokus membuat gerabah, membangun rumah, atau menjadi pemimpin. Spesialisasi mendorong kemajuan teknologi.' },
              { t: 'Konsep Kepemilikan', d: 'Lahan pertanian memerlukan konsep "milik". Untuk pertama kalinya manusia berselisih tentang batas tanah — awal dari hukum dan pemerintahan!' }
            ]
          },
          {
            t: 'Teknologi Neolitikum',
            d: 'Kemajuan teknologi pesat: alat batu <b>diupam</b> (diasah) hingga sangat halus dan tajam. Muncul gerabah, alat tenun, dan teknik bangunan dari kayu dan bambu.',
            sub: [
              { t: 'Kapak Lonjong & Kapak Persegi', d: 'Kapak lonjong: oval, diasah halus, dibawa dari Cina ke seluruh Asia Tenggara. Kapak persegi: penampang melintang persegi, menyebar dari daratan Asia.' },
              { t: 'Gerabah (Tembikar)', d: 'Revolusi penyimpanan! Gerabah memungkinkan penyimpanan air dan biji-bijian dalam jumlah besar. Dihias dengan motif geometris — awal seni dekoratif.' }
            ]
          }
        ],
        timeline: [
          { date: '9.000 SM', desc: 'Pertanian gandum pertama di Lembah Fertile Crescent (Timur Tengah)', color: '#44cc88' },
          { date: '8.000 SM', desc: 'Domestikasi padi di Lembah Yangtze, Cina', color: '#44cc88' },
          { date: '6.000 SM', desc: 'Pertanian menyebar ke Asia Tenggara termasuk kawasan Nusantara', color: '#44aaff' },
          { date: '5.000 SM', desc: 'Desa-desa pertanian permanen terbentuk di berbagai penjuru Asia', color: '#44aaff' },
          { date: '3.000 SM', desc: 'Teknologi irigasi sederhana mulai dikembangkan', color: '#ffaa00' },
        ],
        facts: [
          'Pertanian padi di Yangtze (Cina) dimulai ~9.000 tahun lalu dan menyebar ke Asia Tenggara selama ribuan tahun — bukan "ditemukan" di satu tempat serentak!',
          'Menetap karena bertani menciptakan konsep kepemilikan lahan — dan dari situlah muncul konsep pajak, hukum, dan akhirnya pemerintahan pertama!',
          'Rata-rata tinggi tubuh manusia justru MENURUN di zaman Neolitikum — diet pertanian kurang bervariasi dibanding diet berburu-meramu yang kaya protein!'
        ]
      },
      {
        id: 'mega', title: '🗿 Megalitikum', tag: '3.000 – 500 SM', tc: '#cc88ff',
        difficulty: 'medium',
        desc: 'Zaman batu besar. Manusia membangun monumen raksasa untuk ritual dan kepercayaan.',
        sections: [
          {
            t: 'Definisi & Konteks',
            d: 'Megalitikum (Yunani: <b>mega</b>=besar, <b>lithos</b>=batu) bukan zaman tersendiri — melainkan tradisi budaya yang berkembang pada akhir Neolitikum dan berlanjut ke era logam. Ciri khas: bangunan dari batu-batu besar tanpa semen.',
            sub: [
              { t: 'Motivasi Pembuatan', d: 'Penghormatan leluhur, ritual kematian dan kelahiran kembali, kalender astronomis (seperti Stonehenge), batas wilayah suku, atau simbol kekuasaan pemimpin.' },
              { t: 'Persyaratan Sosial', d: 'Membangun megalit butuh ratusan orang bekerja sama, kepemimpinan yang diakui, dan surplus pangan untuk menghidupi para pekerja. Ini bukti masyarakat sudah terorganisir!' }
            ]
          },
          {
            t: 'Jenis-jenis Megalit di Indonesia',
            d: 'Indonesia adalah salah satu negara terkaya peninggalan megalitik di dunia!',
            sub: [
              { t: 'Menhir', d: 'Tiang batu tegak berdiri. Fungsi: tempat roh leluhur bersemayam, tanda batas wilayah. Ditemukan di Sumatera, Jawa, Sulawesi, Flores.' },
              { t: 'Dolmen', d: 'Dua atau lebih batu berdiri menopang batu datar di atasnya seperti meja. Fungsi: altar sesaji atau kubur. Sering ditemukan bersama menhir.' },
              { t: 'Sarkofagus', d: 'Peti mati dari batu. Khas Bali kuno. Biasanya berbentuk perahu atau hewan mitologis. Jenazah diletakkan bersama bekal kubur (alat, perhiasan).' },
              { t: 'Waruga', d: 'Kubur batu berbentuk silinder dengan tutup kerucut. Khas Minahasa, Sulawesi Utara. Jenazah dimasukkan dalam posisi fetal (janin) — simbol kelahiran kembali.' },
              { t: 'Punden Berundak', d: 'Bangunan berundak (bertingkat) dari batu dan tanah. CIKAL BAKAL CANDI! Berfungsi sebagai tempat pemujaan leluhur dan dewa alam.' }
            ]
          },
          {
            t: 'Sistem Kepercayaan Kompleks',
            d: 'Megalitikum menandai perkembangan kepercayaan yang lebih kompleks. Dua sistem utama:',
            sub: [
              { t: 'Animisme', d: 'Kepercayaan bahwa SEMUA benda di alam memiliki roh (anima): pohon, batu, sungai, gunung, angin. Manusia harus menjaga hubungan harmonis dengan roh-roh ini.' },
              { t: 'Dinamisme', d: 'Kepercayaan pada kekuatan gaib (mana) yang ada di benda-benda tertentu — batu aneh, keris, tulang harimau. Benda itu bisa memberi kekuatan atau perlindungan.' }
            ]
          },
          {
            t: 'Gunung Padang: Misteri Terbesar',
            d: 'Situs Gunung Padang di Cianjur, Jawa Barat adalah situs punden berundak terbesar di Asia Tenggara. Penelitian terbaru (2023) menunjukkan usia lapisan terdalamnya mungkin mencapai 25.000 tahun!',
            sub: [
              { t: 'Kontroversi', d: 'Jika benar berumur 25.000 tahun, ini berarti manusia membangun struktur arsitektur kompleks sebelum pertanian ditemukan — membalikkan teori konvensional!' },
              { t: 'Temuan Arkeologi', d: 'Ditemukan: pilar-pilar batu andesit, ruang bawah tanah, dan tanda-tanda penggunaan berulang selama ribuan tahun.' }
            ]
          }
        ],
        facts: [
          'Stonehenge di Inggris dibangun dalam 3 fase selama 1.500 tahun (3.000 – 1.500 SM). Batu terbesarnya beratnya 25 ton dan dibawa dari jarak 250 km!',
          'Di Nias, Sumatera Utara, tradisi megalitik masih HIDUP hingga hari ini! Beberapa desa masih mendirikan menhir baru untuk upacara adat.',
          'Punden berundak Gunung Padang punya 5 teras dengan total luas 900 m² — jauh lebih besar dari kebanyakan candi kecil di Jawa!'
        ]
      },
      {
        id: 'perd', title: '🔨 Perundagian', tag: '1.500 – 300 SM', tc: '#ffcc00',
        difficulty: 'advanced',
        desc: 'Era logam. Manusia menguasai teknologi melebur dan membentuk logam — revolusi industri pertama!',
        sections: [
          {
            t: 'Revolusi Metalurgi',
            d: 'Kemampuan melebur logam dari batu bijih adalah pencapaian teknologi paling revolusioner di praaksara. Urutan perkembangan: <b>Tembaga → Perunggu → Besi</b>. Masing-masing memberikan lompatan besar!',
            sub: [
              { t: 'Mengapa Logam Lebih Unggul?', d: 'Batu: sekali retak, tidak bisa diperbaiki. Logam: bisa dilebur ulang, dibentuk ulang, diasah berulang kali. Jauh lebih efisien dan ekonomis!' },
              { t: 'Sumber Bijih Logam', d: 'Bijih tembaga: malachite (hijau), azurite (biru). Bijih timah: cassiterite. Bijih besi: hematite, magnetite. Tersebar tidak merata → mendorong perdagangan jarak jauh!' }
            ]
          },
          {
            t: 'Teknik Pembuatan Logam',
            d: 'Dua teknik utama pembuatan alat logam kompleks:',
            sub: [
              { t: 'Bivalve (Cetakan Dua Bagian)', d: 'Cetakan dari batu atau tanah liat dua bagian yang bisa dilepas. Cocok untuk alat sederhana seperti kapak dan tombak. Bisa digunakan berkali-kali.' },
              { t: 'A Cire Perdue (Lost Wax)', d: 'Buat model dari lilin lebah → lapisi tanah liat → panaskan hingga lilin meleleh keluar → tuang logam cair → pecahkan cetakan. Untuk bentuk SANGAT kompleks seperti nekara dan arca. Cetakan hanya sekali pakai.' }
            ]
          },
          {
            t: 'Dampak Sosial & Ekonomi',
            d: 'Logam bukan hanya soal alat — ia mengubah struktur masyarakat secara mendasar.',
            sub: [
              { t: 'Kelas Undagi', d: 'Pengrajin logam (undagi) menjadi kelas tersendiri yang sangat dihormati dan kaya. Pengetahuan mereka adalah aset berharga — sering dirahasiakan dan diwariskan turun-temurun.' },
              { t: 'Perdagangan & Diplomasi', d: 'Bijih logam tidak tersebar merata → jalur perdagangan muncul. Daerah kaya bijih jadi pusat kekuasaan. Alat logam juga jadi simbol status dan alat diplomasi.' },
              { t: 'Peperangan', d: 'Senjata logam jauh lebih mematikan dari batu. Ini mendorong munculnya tentara profesional, benteng, dan strategi militer — cikal bakal kerajaan-kerajaan awal.' }
            ]
          },
          {
            t: 'Peninggalan Perundagian Indonesia',
            d: 'Indonesia kaya peninggalan perunggu yang menunjukkan kemahiran tinggi pengrajin Nusantara!',
            sub: [
              { t: 'Nekara', d: 'Gendang perunggu besar untuk memanggil hujan dan upacara adat. "Moon of Pejeng" di Bali adalah nekara terbesar di Indonesia — tinggi 1,86 meter, dibuat dengan teknik a cire perdue!' },
              { t: 'Kapak Corong', d: 'Kapak perunggu dengan "corong" sebagai tempat memasukkan tangkai kayu. Fungsi ganda: peralatan dan benda upacara. Ditemukan di seluruh Indonesia.' },
              { t: 'Bejana Perunggu', d: 'Wadah berbentuk periuk besar dari perunggu, dihias motif geometris dan binatang. Khas Asia Tenggara Kepulauan, menunjukkan koneksi budaya regional yang kuat.' }
            ]
          }
        ],
        table: {
          headers: ['Logam', 'Komposisi', 'Keunggulan', 'Masa Dominan'],
          rows: [
            ['Tembaga', 'Cu murni', 'Lunak, mudah dibentuk', '3.500 – 3.000 SM'],
            ['Perunggu', 'Cu + Sn (90:10)', 'Lebih keras, tahan lama', '3.000 – 1.200 SM'],
            ['Besi', 'Fe (dari bijih)', 'Paling keras, melimpah', '1.200 SM – kini'],
          ]
        },
        facts: [
          'Perunggu lebih keras dari tembaga MURNI karena adanya timah. Penemuan ini mungkin tidak disengaja: batu tembaga dan timah jatuh bersamaan ke dalam api unggun!',
          'Nekara "Moon of Pejeng" di Bali DIPERCAYA warga setempat sebagai bulan yang jatuh dari langit. Sampai sekarang disimpan di Pura Penataran Sasih sebagai benda sakral!',
          'Besi sebenarnya lebih umum dari tembaga di kerak bumi, tapi butuh suhu lebih tinggi (1.538°C vs 1.085°C) untuk meleburnya — itulah mengapa teknologi besi datang belakangan.'
        ]
      },
    ],

    // ---- TAB: MANUSIA ----
    manusia: [
      {
        id: 'homo', title: '🦴 Evolusi Manusia Praaksara', tag: 'Biologi & Evolusi', tc: '#ff7755',
        difficulty: 'advanced',
        desc: 'Perjalanan evolusi manusia dari Australopithecus hingga Homo sapiens di Nusantara.',
        sections: [
          {
            t: 'Pohon Evolusi Manusia',
            d: 'Genus <b>Homo</b> muncul sekitar 2,5 juta tahun lalu di Afrika. Kemudian menyebar ke seluruh dunia dalam beberapa gelombang migrasi.',
            sub: [
              { t: 'Australopithecus (4–2 jt SM)', d: 'Nenek moyang tertua. Berjalan tegak tapi otak masih kecil (400–500 cc). Masih sangat mirip kera. Ditemukan di Afrika.' },
              { t: 'Homo habilis (2,5 jt SM)', d: '"Manusia terampil" — pertama membuat alat batu sederhana. Otak 600–700 cc. Masih di Afrika.' },
              { t: 'Homo erectus (1,8 jt – 300 rb SM)', d: 'Pertama meninggalkan Afrika! Menyebar ke Eropa dan Asia. Otak 900 cc. Di Jawa dikenal sebagai Pithecanthropus.' },
              { t: 'Homo sapiens (300 rb SM – kini)', d: 'Manusia modern. Otak 1.400 cc. Kemampuan berpikir abstrak, bahasa kompleks, seni. Menggantikan semua spesies Homo lainnya.' }
            ]
          },
          {
            t: 'Manusia Purba Indonesia',
            d: 'Indonesia adalah salah satu lokasi temuan fosil manusia purba terpenting di dunia!',
            sub: [
              { t: 'Meganthropus Paleojavanicus', d: '"Manusia besar tertua Jawa." Rahang sangat besar dan kokoh. Ditemukan Rudolf Koenigswald di Sangiran (1941). Berumur ~1-2 juta tahun.' },
              { t: 'Pithecanthropus Erectus', d: '"Manusia kera yang berjalan tegak." Ditemukan Eugene Dubois di Trinil, Jawa Tengah (1891). Sangat menggemparkan dunia — bukti pertama Homo erectus di luar Afrika!' },
              { t: 'Homo Soloensis', d: 'Ditemukan di Solo (Bengawan Solo), berumur 300.000 – 100.000 tahun. Lebih modern dari Pithecanthropus tapi belum sepenuhnya seperti manusia modern.' },
              { t: 'Homo Wajakensis', d: 'Ditemukan di Tulungagung, Jawa Timur. Lebih mirip manusia modern (ras Australoid). Mungkin nenek moyang orang Papua dan Aborigin Australia.' },
              { t: 'Homo Floresiensis (Hobbit)', d: 'Penemuan menggemparkan (2003) di Liang Bua, Flores. Tinggi hanya ~1 meter! Hidup bersama manusia modern hingga 50.000 tahun lalu. Masih diperdebatkan statusnya.' }
            ]
          }
        ],
        facts: [
          'Homo floresiensis ("Hobbit") di Flores ditemukan pada 2003 dan masih hidup bersama manusia modern hingga 50.000 tahun lalu — mungkin menginspirasi legenda Ebu Gogo di Flores!',
          'Dubois menemukan Pithecanthropus di Trinil tahun 1891 — dan ilmu pengetahuan menolaknya selama 30 tahun sebelum akhirnya mengakui penemuan revolusioner ini!',
          'DNA manusia modern mengandung 1-4% DNA Neanderthal — artinya nenek moyang kita pernah kawin campur dengan spesies manusia lain!'
        ]
      },
    ],

    // ---- TAB: ALAT ----
    alat: [
      {
        id: 'tools', title: '🔧 Perkembangan Teknologi Alat', tag: 'Teknologi', tc: '#55aaff',
        difficulty: 'medium',
        desc: 'Dari kapak batu kasar hingga senjata logam — evolusi teknologi manusia praaksara.',
        sections: [
          {
            t: 'Mengapa Alat Sangat Penting?',
            d: 'Manusia tidak punya cakar tajam, gigi besar, atau kecepatan tinggi. <b>Alat adalah "evolusi budaya" manusia</b> — pengganti adaptasi biologis. Semakin canggih alat, semakin besar kemampuan bertahan dan berkembang.',
          },
          {
            t: 'Kronologi Teknologi Alat',
            d: 'Perkembangan alat manusia dari yang paling primitif hingga logam:',
            sub: [
              { t: 'Mode 1: Oldowan (2,6 jt SM)', d: 'Alat paling primitif: batu yang dipukul hingga terbentuk serpihan tajam. Kapak perimbas (chopper). Tidak ada desain konsisten.' },
              { t: 'Mode 2: Acheulean (1,7 jt SM)', d: 'Kapak genggam (hand axe) simetris dua sisi. Desain konsisten selama 1 juta tahun — "teknologi paling sukses" dalam sejarah!' },
              { t: 'Mode 3: Mousterian (300 rb SM)', d: 'Teknik Levallois: menyiapkan "inti batu" terlebih dahulu untuk mendapat serpihan dengan bentuk yang diinginkan. Jauh lebih efisien.' },
              { t: 'Mode 4: Upper Paleolithic (40 rb SM)', d: 'Bilah panjang dan sempit, mata panah, alat tulang dan gading. Inovasi dan variasi pesat. Alat semakin terspesialisasi.' },
              { t: 'Mode 5: Mikrolith (10 rb SM)', d: 'Alat sangat kecil (<2 cm) untuk dipasang sebagai komponen alat komposit. Efisiensi material dan fungsi mencapai puncak di era batu.' }
            ]
          },
          {
            t: 'Alat Non-Batu: Tulang, Kayu, Kulit',
            d: 'Alat batu hanya sebagian kecil dari peralatan manusia purba. Bahan organik jarang terawetkan, tapi bukti tidak langsung menunjukkan pemanfaatan luas.',
            sub: [
              { t: 'Alat Tulang', d: 'Jarum dari tulang untuk menjahit pakaian kulit (10.000 SM!), mata kail, tombak bertangkai tulang, penggaruk kulit binatang.' },
              { t: 'Alat Kayu', d: 'Tombak kayu tertua: 400.000 tahun dari Jerman (Schöningen). Kemungkinan besar juga ada jebakan, keranjang, rakit — tapi tidak terawetkan.' }
            ]
          }
        ],
        table: {
          headers: ['Periode', 'Jenis Alat', 'Material', 'Fungsi Utama'],
          rows: [
            ['Paleolitikum Awal', 'Kapak perimbas', 'Batu', 'Memotong, menggali'],
            ['Paleolitikum Tengah', 'Kapak genggam', 'Batu', 'Serbaguna'],
            ['Mesolitikum', 'Mikrolith', 'Batu+kayu', 'Panah, tombak'],
            ['Neolitikum', 'Kapak diupam', 'Batu halus', 'Pertanian, membangun'],
            ['Perundagian', 'Kapak corong', 'Perunggu/besi', 'Pertanian, perang'],
          ]
        },
        facts: [
          'Jarum jahit dari tulang ditemukan di Cina berumur 50.000 tahun — manusia sudah membuat pakaian yang dijahit jauh lebih awal dari dugaan!',
          'Kapak genggam Acheulean ditemukan di 3 benua dengan desain yang HAMPIR IDENTIK — apakah ada "template mental" yang diwariskan, atau ini evolusi teknologi yang konvergen?',
          'Obsidian (kaca vulkanik) adalah alat batu paling tajam yang pernah ada — lebih tajam dari pisau bedah modern! Masih digunakan untuk operasi jantung oleh beberapa dokter!'
        ]
      },
    ],

    // ---- TAB: SOSIAL ----
    sosial: [
      {
        id: 'social', title: '🏘 Kehidupan Sosial Praaksara', tag: 'Sosiologi', tc: '#44ddaa',
        difficulty: 'medium',
        desc: 'Bagaimana manusia praaksara berorganisasi, berkomunikasi, dan membangun komunitas.',
        sections: [
          {
            t: 'Evolusi Organisasi Sosial',
            d: 'Dari band kecil nomaden hingga desa pertanian — masyarakat manusia semakin kompleks seiring waktu.',
            sub: [
              { t: 'Band (Paleolitikum)', d: '20–50 orang, hubungan kekerabatan erat, kepemimpinan berdasarkan kemampuan (bukan warisan), pengambilan keputusan bersama. Setara dan fleksibel.' },
              { t: 'Tribe/Suku (Mesolitikum)', d: 'Beberapa band yang saling berhubungan, punya identitas bersama (bahasa, ritual, simbol), pemimpin mulai permanen, mulai ada konflik antar suku.' },
              { t: 'Chiefdom (Neolitikum)', d: 'Pemimpin (kepala suku) punya kekuasaan turun-temurun, surplus pangan memungkinkan membiayai spesialis dan tentara, mulai ada stratifikasi sosial.' },
              { t: 'Awal Kerajaan (Perundagian)', d: 'Teknologi logam + surplus pertanian + perdagangan = munculnya pusat kekuasaan, tentara profesional, sistem pajak, dan akhirnya kerajaan.' }
            ]
          },
          {
            t: 'Peran Gender & Kerja',
            d: 'Pembagian kerja berdasarkan gender sudah ada sejak Paleolitikum, tapi tidak sesederhana yang sering digambarkan.',
            sub: [
              { t: 'Bukti dari Arkeologi', d: 'Analisis tulang menunjukkan perempuan Paleolitikum juga ikut berburu hewan kecil. Tidak semua laki-laki berburu — ada yang membuat alat, mengurus anak, dll.' },
              { t: 'Perubahan di Neolitikum', d: 'Pertanian dan peternakan mengubah peran gender: laki-laki lebih ke ladang dan ternak besar, perempuan ke pengolahan pangan, kerajinan, dan pengasuhan. Tapi ini pun tidak mutlak.' }
            ]
          },
          {
            t: 'Perdagangan & Pertukaran',
            d: 'Manusia praaksara sudah berdagang jauh sebelum ada uang atau pasar formal!',
            sub: [
              { t: 'Pertukaran Gift', d: 'Bukan "jual beli" tapi pertukaran hadiah yang menciptakan kewajiban sosial. Memberi = membangun hubungan dan kewajiban balasan. Dasar ekonomi praaksara.' },
              { t: 'Bukti Perdagangan Jarak Jauh', d: 'Obsidian dari pulau-pulau vulkanik ditemukan di lokasi 1.000 km jauhnya. Shell (kerang laut) ditemukan di permukiman pedalaman. Pigmen oker ditemukan jauh dari sumbernya.' }
            ]
          }
        ],
        facts: [
          'Manusia Paleolitikum rata-rata bekerja LEBIH SEDIKIT dari manusia modern — sekitar 3-5 jam per hari untuk mencari makan. Sisanya untuk istirahat dan sosial!',
          'Barter langsung sebenarnya bukan cara utama perdagangan purba — "debt" (hutang) dan "gift economy" jauh lebih umum sebelum uang ditemukan.',
          'Ukuran otak Homo sapiens justru mengecil sedikit (~10%) dalam 30.000 tahun terakhir — mungkin karena spesialisasi sosial mengurangi kebutuhan "general problem-solving"!'
        ]
      }
    ],

    // ---- TAB: TEORI ----
    teori: [
      {
        id: 'teori', title: '🔬 Teori & Metode Penelitian', tag: 'Metodologi', tc: '#ffcc55',
        difficulty: 'expert',
        desc: 'Bagaimana ilmuwan mempelajari praaksara — metode, teori, dan perdebatan terkini.',
        sections: [
          {
            t: 'Mengapa Disebut "Praaksara"?',
            d: '"Praaksara" = sebelum aksara (tulisan). Di Eropa disebut <b>Prehistory</b>, di Indonesia <b>Prasejarah</b>. Periode ini berakhir berbeda di setiap daerah — ketika tulisan pertama kali digunakan.',
            sub: [
              { t: 'Masalah Definisi', d: 'Di Mesir, aksara muncul ~3.100 SM. Di Nusantara, prasasti tertua (~400 M) jauh lebih muda. Jadi "praaksara Indonesia" jauh lebih panjang dari praaksara Mesir!' },
              { t: 'Sumber Sejarah Praaksara', d: 'Tidak ada dokumen tertulis! Sumber utama: fosil tulang, alat batu, sisa makanan (tulang hewan, biji-bijian), struktur bangunan, pigmen, dan DNA kuno.' }
            ]
          },
          {
            t: 'Metode Penanggalan',
            d: 'Bagaimana ilmuwan tahu usia peninggalan praaksara?',
            sub: [
              { t: 'Penanggalan Radiokarbon (C-14)', d: 'Mengukur peluruhan karbon-14 dalam material organik. Akurat hingga 50.000 tahun. Cocok untuk tulang, kayu, arang, cangkang.' },
              { t: 'Penanggalan Kalium-Argon (K-Ar)', d: 'Mengukur peluruhan kalium-40 menjadi argon-40 dalam batuan vulkanik. Untuk penanggalan fosil sangat tua (jutaan tahun). Dipakai untuk fosil manusia purba.' },
              { t: 'Luminescence Dating (OSL/TL)', d: 'Mengukur berapa lama mineral terakhir terkena cahaya. Cocok untuk artefak yang tidak mengandung karbon organik. Akurat hingga 1 juta tahun.' },
              { t: 'Stratigrafi', d: 'Prinsip dasar: lapisan tanah yang lebih dalam = lebih tua. Dengan analisis lapisan tanah (stratum), bisa menentukan urutan kronologis temuan.' }
            ]
          },
          {
            t: 'Perdebatan Ilmiah Terkini',
            d: 'Praaksara bukan bidang yang "sudah selesai" — banyak perdebatan seru di kalangan ilmuwan!',
            sub: [
              { t: '"Out of Africa" vs "Multiregional"', d: 'Apakah manusia modern hanya berasal dari Afrika (Out of Africa) lalu menggantikan semua populasi lokal? Atau manusia modern berevolusi paralel di berbagai tempat? DNA kuno mendukung Out of Africa tapi dengan beberapa kawin campur lokal.' },
              { t: 'Usia Gunung Padang', d: 'Tim riset 2023 mengklaim lapisan terdalam Gunung Padang berumur 25.000 tahun — sebelum pertanian ada! Kalau benar, ini membalikkan semua teori tentang kemampuan manusia purba. Komunitas arkeologi masih debat sengit!' },
              { t: 'Kepunahan Megafauna', d: 'Hewan besar (mammoth, mastodon, dll) punah ~12.000 tahun lalu. Penyebab: perburuan manusia, perubahan iklim, atau keduanya? Debat belum selesai.' }
            ]
          }
        ],
        facts: [
          'Radiokarbon (C-14) ditemukan oleh Willard Libby tahun 1949 dan langsung merevolusi arkeologi. Ia mendapat Nobel Kimia 1960 untuk penemuannya!',
          'DNA kuno bisa diekstrak dari tulang berumur 700.000 tahun yang tersimpan di lapisan es permafrost — membuka jendela baru ke masa lalu yang tidak bisa dilakukan arkeologi konvensional.',
          '"Hobbit" Flores (Homo floresiensis) pertama kali dikira tulang anak penderita microcephaly. Baru setelah ditemukan beberapa individu serupa, komunitas ilmiah mengakui ini spesies baru!'
        ]
      }
    ]
  };

  // ============================================================
  //  UI FUNCTIONS
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
    items.forEach(item => {
      const card = document.createElement('div');
      card.className = 'libCard';
      card.style.borderColor = item.tc + '55';
      const diffMap = { basic: ['diff-basic','Dasar'], medium: ['diff-medium','Menengah'], advanced: ['diff-advanced','Lanjutan'], expert: ['diff-expert','Ahli'] };
      const [dc, dl] = diffMap[item.difficulty] || ['diff-basic','Dasar'];
      card.innerHTML = `
        <div class="libCardTitle">${item.title}</div>
        <div class="libCardDesc">${item.desc}</div>
        <span class="libTag" style="background:${item.tc}22;color:${item.tc};border:1px solid ${item.tc}44;">${item.tag}</span>
        <span class="libDiff ${dc}">${dl}</span>`;
      card.onclick = () => openDetail(item);
      grid.appendChild(card);
    });
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
      item.facts.forEach(f => {
        h += `<div class="ldFact"><div class="ldFactLabel">💡 FAKTA</div><div class="ldFactText">${f}</div></div>`;
      });
      h += '</div>';
    }

    return h;
  }

  return { open, close, switchTab };
})();

const Tutorial = {
  open(fromMenu) {
    document.getElementById('tutorial').style.display = 'flex';
    if (!fromMenu) document.getElementById('mainMenu').style.display = 'none';
  },
  close() {
    document.getElementById('tutorial').style.display = 'none';
    if (!GS.started) document.getElementById('mainMenu').style.display = 'flex';
  }
};

const Settings = {
  open() { document.getElementById('settings').style.display = 'flex'; },
  close() { document.getElementById('settings').style.display = 'none'; },
  toggle(el) { el.classList.toggle('on'); }
};
