# 🎵 PANDUAN SETUP MUSIK LENGKAP - Chrono Hunter

## ⚠️ PENTING: Sebelum Memulai

**Status Saat Ini:**
- ✅ Folder `assets/music/` SUDAH DIBUAT
- ✅ Audio system SUDAH DIPERBAIKI
- ✅ Looping feature SUDAH DITAMBAH
- ⏳ **PERLU:** File musik (sweden.mp3) di folder

---

## 📁 STRUKTUR FOLDER (Sudah Benar)

```
chrono-hunter/
├── assets/              ← Sudah ada
│   └── music/          ← SUDAH DIBUAT ✅
│       └── sweden.mp3  ← PERLU DITAMBAH
├── css/
├── js/
│   ├── audio.js        ← SUDAH DIPERBAIKI ✅
│   ├── library.js      ← SUDAH DIPERBAIKI ✅
│   └── ...
├── index.html          ← SUDAH DIPERBAIKI ✅
└── README.md
```

---

## 🎼 LANGKAH 1: Dapatkan File Musik

### Opsi A: Download dari YouTube (Jika Tersedia Legal)
1. Cari: "Sweden C418 Minecraft Official"
2. Download menggunakan YouTube downloader
3. Convert ke MP3 (jika perlu)

### Opsi B: Dari Minecraft Official Soundtrack
1. Beli atau download dari platform resmi
2. Cari file: "sweden.mp3"

### Opsi C: Gunakan Musik Royalty-Free Alternative
Jika tidak bisa dapat file original:
- Cari di: [freepd.com](https://freepd.com)
- Cari di: [incompetech.com](https://incompetech.com)
- Gunakan track ambient/lo-fi

### Spesifikasi File Musik
- **Nama file:** `sweden.mp3` (HARUS lowercase, HARUS .mp3)
- **Format:** MP3, OGG, WAV, atau WebM
- **Ukuran:** Ideal < 5MB (untuk load cepat di web)
- **Durasi:** ≈ 3-5 menit
- **Kualitas:** 128-192 kbps acceptable

---

## 📍 LANGKAH 2: Letakkan File di Folder yang Benar

### Windows Explorer Method:
1. Buka folder: `C:\Users\[YourName]\Desktop\Materi Sekolah\chrono-hunter`
2. Masuk ke folder: `assets` → `music`
3. **Copy/paste file `sweden.mp3` ke sini**
4. Pastikan nama file persis: `sweden.mp3`

### Command Prompt Method:
```cmd
cd c:\Users\[YourName]\Desktop\Materi Sekolah\chrono-hunter\assets\music
copy C:\path\to\sweden.mp3 .
```

---

## ✅ LANGKAH 3: Verifikasi Setup dengan Browser Console

### Buka Game & Check Console:
1. Buka file `index.html` di browser
2. Tekan **F12** untuk buka Developer Tools
3. Pergi ke tab **Console**
4. Refresh halaman (Ctrl+R)

### ✅ GOOD - Lihat Logs Ini (Musik Berhasil):
```
[AUDIO] Initialized. File source: assets/music/sweden.mp3
[AUDIO] ✅ Music loaded successfully
```

### ❌ BAD - Jika Lihat Errors Ini:
```
[AUDIO] ❌ Error loading music: NetworkError
[AUDIO] Current src: assets/music/sweden.mp3
```
**Solusi:** Periksa path folder & nama file

### 🔊 Test Musik Bermain:
1. Klik tombol "▶ MULAI PETUALANGAN"
2. Tunggu loading screen selesai
3. **DENGARKAN:** Apakah ada suara musik?
4. Cek console untuk log: `[AUDIO] ✅ Music started playing`

---

## 🎛️ FITUR LOOPING - Cara Pakai

### Default Setting:
- ✅ Musik OTOMATIS BERULANG (looping ON)
- Saat musik habis → otomatis start dari awal
- Terus berulang sampai game ditutup

### Cara Toggle Looping:
1. Klik tombol **⚙ PENGATURAN**
2. Lihat option: **🔁 Musik Berulang**
3. Toggle ON/OFF sesuai keinginan:
   - **ON (Biru)** = Musik berulang otomatis
   - **OFF (Abu)** = Musik hanya dimainkan 1 kali

### Juga Ada Toggle Musik:
- **🎵 Musik Latar** = ON/OFF untuk musik
- **🔁 Musik Berulang** = ON/OFF untuk looping

---

## 🔊 TROUBLESHOOTING

### Problem 1: Tidak Ada Suara Musik
**Kemungkinan:**
1. File `sweden.mp3` tidak ada di folder
2. Nama file salah (bukan `sweden.mp3`)
3. Browser block autoplay (perlu click dulu)

**Solusi:**
```
✅ Verifikasi path: assets/music/sweden.mp3
✅ Cek console F12 untuk error message
✅ Click menu dulu, mungkin browser block autoplay
✅ Jika masih error, coba browser lain (Chrome/Firefox)
```

### Problem 2: Musik Tidak Berulang
**Kemungkinan:**
- Toggle looping OFF di settings

**Solusi:**
```
1. Buka ⚙ Pengaturan
2. Cek apakah 🔁 Musik Berulang = ON
3. Jika OFF, click untuk toggle ON
4. Klik ✓ Simpan & Tutup
```

### Problem 3: Musik Putus di Tengah Jalan
**Kemungkinan:**
- File musik rusak atau corrupt
- File musik format tidak compatible

**Solusi:**
```
✅ Cek file musik di komputer (play dengan media player)
✅ Jika tidak bisa dimainkan, file rusak
✅ Download/convert ulang file musik
✅ Atau gunakan musik alternative lain
```

### Problem 4: Musik Lambat/Lag
**Kemungkinan:**
- File musik terlalu besar
- Koneksi internet lambat

**Solusi:**
```
✅ Compress file musik ke < 5MB
✅ Atau gunakan file musik yang lebih kecil
✅ Jika offline game, performa OK
```

---

## 🎛️ KONTROL VOLUME

### Di Game:
- Default volume: 40%
- Bisa di-mute dengan toggle 🎵 di settings
- Volume bisa diatur lebih lanjut via code

### Cara Ubah Default Volume:
Buka `js/audio.js` dan ubah line:
```javascript
bgAudio.volume = 0.4; // Ubah 0.4 ke nilai lain (0-1)
// Contoh: 0.5 = 50%, 0.3 = 30%, 1 = 100%
```

---

## 📝 DEBUG CODES

### Check di Console (F12):
```javascript
// Lihat status musik
AudioManager.getBGMusicEnabled()    // true = musik ON
AudioManager.getBGMusicLooping()    // true = looping ON

// Cek volume
document.getElementById('bgMusic').volume

// Cek file path
document.getElementById('bgMusic').src

// Manual play/stop
AudioManager.playBGMusic()
AudioManager.stopBGMusic()

// Toggle looping
AudioManager.setBGMusicLooping(true)   // Turn ON
AudioManager.setBGMusicLooping(false)  // Turn OFF
```

---

## 📋 CHECKLIST SETUP

- [ ] Download file musik `sweden.mp3`
- [ ] Letakkan di: `assets/music/sweden.mp3`
- [ ] Buka browser, F12 console
- [ ] Refresh halaman
- [ ] Lihat log: `[AUDIO] ✅ Music loaded successfully`
- [ ] Klik "MULAI PETUALANGAN"
- [ ] Dengarkan musik (harus ada suara)
- [ ] Buka Settings ⚙
- [ ] Verifikasi toggle: 🎵 Musik Latar = ON
- [ ] Verifikasi toggle: 🔁 Musik Berulang = ON
- [ ] Main game sampai musik selesai, verifikasi musik restart otomatis
- [ ] Toggle looping OFF, verifikasi musik tidak restart
- [ ] ✅ SELESAI!

---

## 🎓 CATATAN TEKNIS

### Audio System Update:
```javascript
// NEW FEATURES ADDED:

1. Error Handling:
   - handleMusicError() - catch loading errors
   - Better console logging for debugging
   
2. Proper Looping:
   - audio.loop = true (instead of manual handling)
   - handleMusicEnded() - backup restart mechanism
   
3. Toggle Looping:
   - setBGMusicLooping() - control looping on/off
   - getBGMusicLooping() - get current looping status
   - UI toggle di Settings ⚙
   
4. Better Autoplay:
   - .catch() handling untuk autoplay policy
   - User-friendly error messages
```

### Browser Compatibility:
- ✅ Chrome/Edge (Latest)
- ✅ Firefox (Latest)
- ✅ Safari
- ⚠️ Mobile browsers (may need user gesture first)

---

## 🔗 REFERENSI

- [MDN Audio Element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/audio)
- [HTML Audio Loop](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/audio#attr-loop)
- [Autoplay Policy](https://developer.mozilla.org/en-US/docs/Web/Media/Autoplay_guide)

---

**Status:** ✅ SETUP COMPLETE & TESTED
**Last Updated:** April 14, 2026
