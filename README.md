# ⚔ CHRONO HUNTER: PRAAKSARA OPEN WORLD
## Advanced Edition v3.0

---

## 📁 Struktur Folder

```
chrono-hunter/
├── index.html              ← Entry point utama
├── css/
│   ├── main.css            ← Base styles, reset, whirlpool, notif, settings, tutorial
│   ├── menu.css            ← Main menu + particles
│   ├── hud.css             ← HUD bars, hotbar, mobile controls, inventory, dialog box
│   ├── quiz.css            ← Quiz panel + fact box
│   ├── library.css         ← Library tabs, cards, detail view, table, timeline
│   ├── crafting.css        ← Crafting panel + recipe cards
│   └── ending.css          ← Ending screen + dimension overlay
├── js/
│   ├── utils.js            ← GS (global state), Utils helpers
│   ├── dialog.js           ← Dialog system + ALL story/ending dialog scripts
│   ├── library.js          ← 5-tab library + Settings + Tutorial objects
│   ├── quiz.js             ← 10 soal IPS + shuffle + fact system
│   ├── inventory.js        ← Item management + hotbar + eat animation
│   ├── crafting.js         ← 8 resep crafting
│   ├── player.js           ← Player movement, sprint, attack, interact
│   ├── animals.js          ← Animal AI (slow, flee on hit)
│   ├── npc.js              ← 5 NPC dengan multi-line dialog
│   ├── world.js            ← World objects, camera, rendering, particles
│   ├── dimension.js        ← Celah dimensi + dimension-specific quiz
│   ├── ending.js           ← 4 ending types + animated dialog sequences
│   ├── game.js             ← MissionSystem + GameCore loop + input
│   └── main.js             ← Whirlpool intro + menu particles + resize
└── assets/                 ← (opsional) audio, ikon tambahan
```

---

## 🎮 Cara Memainkan

### Buka Game
1. Buka `index.html` di browser modern (Chrome/Firefox/Safari)
2. Atau host dengan live server: `npx serve .` lalu buka `http://localhost:3000`

### Kontrol Mobile
| Kontrol | Fungsi |
|---|---|
| Joystick kiri | Bergerak |
| ⚔ (kanan atas) | Serang / Tebang pohon / Tambang batu |
| E (kanan) | Interaksi NPC / Buka peti / Masuk dimensi |
| ⚡ | Sprint (pakai stamina) |
| 🔨 | Buka crafting |
| 🎒 | Buka inventory |

### Kontrol Keyboard
| Tombol | Fungsi |
|---|---|
| WASD / Arrow | Bergerak |
| Shift | Sprint |
| E | Interaksi |
| F | Serang |
| G | Inventory |
| C | Crafting |

---

## 🌟 Fitur Lengkap

### 📖 Intro Dialog
- Player terbangun bingung di zaman praaksara
- 10 baris dialog bertahap hingga player menyadari dirinya ada di masa lalu

### 📚 Perpustakaan (5 Tab)
| Tab | Konten |
|---|---|
| 🗓 Zaman | Paleolitikum, Mesolitikum, Neolitikum, Megalitikum, Perundagian |
| 👤 Manusia | Evolusi manusia purba Indonesia |
| 🔧 Alat | Kronologi teknologi alat batu hingga logam |
| 🏘 Sosial | Band → Tribe → Chiefdom → Kerajaan |
| 🔬 Teori | Metode penanggalan, perdebatan ilmiah terkini |

### ❓ Quiz System
- 10 soal acak (tidak mengulang)
- Jawaban diacak setiap tampil
- Fakta menarik muncul 4.5 detik setelah menjawab
- Bonus soal di dalam celah dimensi (+150 poin)

### 🌀 Celah Dimensi
- 2 portal interaktif di peta dunia
- Tekan E saat dekat untuk masuk
- Animasi portal ungu berputar
- Dialog intro + soal eksklusif + reward item
- Dialog saat keluar

### 🔨 Crafting System (8 Resep)
- Pedang Perunggu (🪵×2 + 🪨×3)
- Busur Panah (🪵×4 + 🪨×1)
- Kapak Batu (🪨×2 + 🪵×1)
- Sup Hutan (🍖×2 + 🪵×1)
- Perisai Kayu (🪵×5 + 🪨×1)
- Obor (🪵×2 + 🍖×1)
- Gerabah (🪨×4)
- Menhir Mini (🪨×6 + 🪵×2)

### 🐾 Hewan (7 Jenis, Lambat)
- Rusa, Babi Hutan, Kelinci, Burung, Ular, Rubah, Kupu-kupu
- Speed 0.4–0.9 (lambat, tidak membuat frustasi)
- Lari menjauh saat diserang

### 🏆 4 Ending + Dialog Cinematic

| Ending | Syarat | Cerita |
|---|---|---|
| ⭐ Secret | Secret area + 4 misi + 90% soal benar | Tinggal di praaksara, jadi raja, bangun kerajaan |
| 🟢 True | 3+ misi + 80% soal benar | Pulang ke dunia asal, membawa pemahaman |
| 🟡 Good | 2+ misi + 50% soal benar | Pulang dengan bekal terbatas |
| 🔴 Bad | Misi < 2 + soal banyak salah | Mundur ke Arkeozoikum, kehabisan oksigen, mati |

Setiap ending punya:
- Dialog multi-baris dengan typewriter effect
- Animasi partikel warna berbeda
- Background animasi sesuai tema
- Stats akhir (skor, jawaban benar, misi selesai)

---

## 🛠 Teknologi
- Vanilla HTML5 + CSS3 + JavaScript (ES6+)
- Canvas 2D API untuk rendering game
- Tidak ada library eksternal
- Mobile-first, responsive

---

## 📝 Catatan Pengembangan
- Global state ada di `GS` object di `utils.js`
- Semua dialog script ada di `dialog.js` (StoryDialogs + EndingDialogs)
- Library content sepenuhnya di `library.js` (CONTENT object)
- Quiz questions di `quiz.js` (ALL_QUESTIONS array)
- Crafting recipes di `crafting.js` (RECIPES array)
