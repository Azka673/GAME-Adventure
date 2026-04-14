# ⚠️ MUSIK - PANDUAN INTEGRASI DAN HAK CIPTA

## PERINGATAN HUKUM 🚨

**Game ini dirancang untuk menggunakan musik "Sweden – C418" oleh C418.**

Sebelum menggunakan musik ini, Anda HARUS:

### 1. ✅ CARA LEGAL MENDAPATKAN MUSIK
- **Download dari Minecraft Soundtrack Official** (Jika legal tersedia)
- **Beli lisensi dari platform pemberi lisensi musik** (Spotify, licensing sites)
- **Gunakan musik royalty-free** sebagai alternatif
- **Dapatkan izin tertulis** dari pemegang hak cipta

### 2. ❌ DILARANG
- ❌ Download dari YouTube illegal
- ❌ Menggunakan musik yang diproduksi ulang tanpa izin
- ❌ Mendistribusikan file musik tanpa lisensi
- ❌ Klaim bahwa Anda memiliki hak cipta musik

### 3. ✅ UNTUK KEPERLUAN SEKOLAH
- Jika ini untuk **proyek pendidikan sekolah saja**, minta izin kepada:
  - Pemegang hak cipta (C418/Minecraft Official)
  - Guru/kepala sekolah Anda
  - Pastikan tidak untuk distribusi komersial

---

## SETUP MUSIK - LANGKAH DEMI LANGKAH

### Langkah 1: Buat Folder Musik
```
chrono-hunter/
├── assets/          ← BUAT JIKA BELUM ADA
│   └── music/       ← BUAT FOLDER INI
│       └── sweden.mp3   ← LETAKKAN FILE MUSIK DI SINI
```

### Langkah 2: Format File Audio
- **Nama file**: `sweden.mp3` (HARUS lowercase)
- **Format**: MP3, OGG, WAV, atau WebM
- **Ukuran**: Optimal < 5MB untuk web
- **Durasi**: Sweden – C418 ≈ 3-4 menit

### Langkah 3: Verifikasi Sistem
File sudah siap:
- ✅ `js/audio.js` - Already configured untuk load `assets/music/sweden.mp3`
- ✅ `index.html` - Copyright notice sudah ditambah
- ✅ `js/main.js` - Audio system auto-initialize

---

## CARA KERJA AUDIO SYSTEM

### 1. **Autostart pada Menu Utama**
- Musik otomatis bermain saat halaman dimuat
- Jika browser memblok autoplay → perlu user click pertama

### 2. **Loop Mechanics** ✅ DIPERBAIKI
```javascript
Audio Configuration:
- loop = true (Musik otomatis berulang)
- Ketika ended → auto-restart dari awal
- Continue sampai tab ditutup atau dipause

✨ Fitur Baru:
- Toggle looping on/off di Settings ⚙️
- Default: ON (musik berulang)
- Bisa di-disable jika ingin musik main hanya 1 kali
```

### 3. **Volume Control**
- Default volume: 40% (0.4)
- Dapat diatur di Settings ⚙️
- Dapat di-mute dengan tombol 🎵

### 4. **Error Handling** ✅ DITINGKATKAN
- Console logging untuk debug
- Show error jika file musik tidak ditemukan
- Support fallback jika file tidak tersedia
- Auto-detect autoplay policy block

---

## SETUP MUSIK - CHECKLIST LENGKAP

### ✅ Folder Structure (SUDAH DIBUAT)
```
chrono-hunter/
├── assets/
│   └── music/
│       └── sweden.mp3  ← LETAKKAN FILE MUSIK DI SINI
```

### ✅ Cara Memasukkan File Musik
1. **Cari atau download file musik "Sweden – C418"**
   - Format: MP3, OGG, WAV, atau WebM
   - Ukuran: Optimal < 5MB
   - Durasi: ≈ 3-4 menit

2. **Letakkan di folder yang tepat**
   - Path: `chrono-hunter/assets/music/sweden.mp3`
   - Nama file HARUS: `sweden.mp3` (lowercase)
   - Jika sudah ada: timpa file lama

3. **Verifikasi di browser**
   - Buka F12 (Developer Console)
   - Cari log: `[AUDIO] ✅ Music loaded successfully`
   - Jika error: cek path dan nama file

---

## FILE YANG SUDAH DIUPDATE

### ✅ `js/audio.js` - MAJOR UPDATE!
- ✅ Support load music dari `assets/music/sweden.mp3`
- ✅ Proper looping dengan `audio.loop = true`
- ✅ Auto-restart musik saat selesai
- ✅ Error handling & debugging logs
- ✅ Toggle looping on/off (method: `setBGMusicLooping()`)
- ✅ Better autoplay policy handling

### ✅ `index.html`
- ✅ Folder assets/music sudah dibuat
- ✅ Copyright notice di main menu
- ✅ Warning tentang music licensing
- ✅ **BARU:** Toggle looping 🔁 di Settings

### ✅ `js/main.js`
- ✅ `AudioManager.init()` called saat boot
- ✅ Music siap untuk autoplay

### ✅ `js/library.js` - UPDATED!
- ✅ Sync looping toggle state di Settings.open()
- ✅ Method baru: `Settings.toggleLooping()`
- ✅ Integrasi dengan AudioManager.setBGMusicLooping()

---

## FILE YANG SUDAH DIUPDATE
```

### Test 2: Play Music
1. Refresh halaman
2. Harusnya ada suara musik background
3. Jika tidak, check:
   - File benar-benar ada di `assets/music/sweden.mp3`?
   - Browser tidak memblok autoplay? (Click gambar dulu)
   - Volume browser tidak mute?

### Test 3: Loop
1. Biarkan musik bermain sampai selesai
2. Harusnya restart otomatis setelah ~100ms
3. Terus-terusan sampai tab ditutup

---

## SETTINGS & KONTROL

### Mute Music (Settings ⚙️)
- Toggle music on/off
- Status bar: 🔊 (on) atau 🔇 (mute)

### Volume Control
- Dapat diatur di `js/audio.js` baris: `bgAudio.volume = 0.4`
- Range: 0.0 (silent) hingga 1.0 (full volume)

---

## DISCLAIMER LENGKAP

```
⚠️ COPYRIGHT NOTICE

Game ini menggunakan:
📀 Musik: "Sweden – C418"
© Hak Cipta: C418 / Minecraft Official

Penggunaan dibatasi untuk:
- ✅ Pendidikan sekolah (dengan izin)
- ✅ Proyek non-komersial
- ❌ Distribusi tanpa lisensi
- ❌ Penggunaan komersial

Pengguna bertanggung jawab untuk:
1. Memastikan hak legal menggunakan musik
2. Tidak mendistribusikan file musik
3. Mematuhi lisensi yang berlaku
4. Menghormati hak cipta pencipta
```

---

## ALTERNATIF (Jika tidak punya lisensi musik)

Gunakan musik royalty-free dari:
- 🎵 Free Music Archive (freemusicarchive.org)
- 🎵 ccMixter (ccmixter.org)
- 🎵 OpenGameArt (opengameart.org)
- 🎵 YouTube Audio Library

Ubah nama file dan path di `audio.js` sesuai musik baru.

---

## TROUBLESHOOTING

| Masalah | Solusi |
|---------|--------|
| Musik tidak terdengar | Check file path, volume browser |
| Browser blok autoplay | Klik button apapun dulu |
| Musik terputus | Check file integrity, browser console |
| Sound buruk/distorted | Reduce volume, check format |

---

**Status:** ✅ SIAP - Tinggal masukkan file musik legal Anda
**Tanggung Jawab:** PENGGUNA (memastikan musik legal)
**Last Updated:** 2026-04-11

