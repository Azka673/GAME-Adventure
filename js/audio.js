// ===== AUDIO.JS =====
const AudioManager = (() => {
  let bgMusicEnabled = true;
  let bgMusicLooping = true;
  let sfxEnabled = true;
  let bgAudio = null;
  let isPlayingMusic = false;
  let userHasInteracted = false;

  function init() {
    bgMusicEnabled = true;
    bgMusicLooping = true;
    sfxEnabled = true;

    if (!bgAudio) {
      bgAudio = document.createElement('audio');
      bgAudio.id = 'bgMusic';
      bgAudio.loop = true;
      bgAudio.volume = 0.4;
      bgAudio.style.display = 'none';
      bgAudio.src = 'assets/music/sweden.mp3'; // ✅ File kamu sudah ada

      bgAudio.addEventListener('error', handleMusicError);
      bgAudio.addEventListener('canplay', () => {
        console.log('[AUDIO] ✅ sweden.mp3 loaded');
      });
      bgAudio.addEventListener('ended', () => {
        if (bgMusicLooping && bgMusicEnabled) {
          console.log('[AUDIO] 🔁 Music ended, restarting...');
          bgAudio.currentTime = 0;
          bgAudio.play().catch(e => console.warn('[AUDIO] Restart failed:', e.message));
        }
      });

      document.body.appendChild(bgAudio);
      bgAudio.load();
    }

    // ✅ KUNCI: Tangkap interaksi pertama user di level document
    // Browser hanya mengizinkan audio setelah ada klik/tap
    const unlockAudio = () => {
      if (!userHasInteracted) {
        userHasInteracted = true;
        console.log('[AUDIO] 🔓 User interaction detected, audio unlocked');
        // Mainkan musik setelah 100ms untuk memastikan siap
        setTimeout(() => {
          if (bgMusicEnabled) playBGMusic();
        }, 100);
      }
      // Hapus listener setelah sekali jalan
      document.removeEventListener('click', unlockAudio);
      document.removeEventListener('keydown', unlockAudio);
      document.removeEventListener('touchstart', unlockAudio);
    };

    document.addEventListener('click', unlockAudio);
    document.addEventListener('keydown', unlockAudio);
    document.addEventListener('touchstart', unlockAudio);

    console.log('[AUDIO] Initialized. Waiting for user interaction...');
  }

  function handleMusicError() {
    const code = bgAudio.error ? bgAudio.error.code : '?';
    const msg = bgAudio.error ? bgAudio.error.message : 'Unknown';
    console.error(`[AUDIO] ❌ Error loading music (code ${code}):`, msg);
    console.log('[AUDIO] Src:', bgAudio.src);
    
    // Fallback: Buat ambient tone sederhana jika file tidak ada
    console.log('[AUDIO] Creating fallback ambient tone...');
    createFallbackAudio();
  }

  function createFallbackAudio() {
    // Membuat simple ambient tone menggunakan Web Audio API
    if (!window.AudioContext && !window.webkitAudioContext) return;

    const AudioContext = window.AudioContext || window.webkitAudioContext;
    const ctx = new AudioContext();
    const duration = 8;
    const sampleRate = ctx.sampleRate;
    const buffer = ctx.createBuffer(1, sampleRate * duration, sampleRate);
    const data = buffer.getChannelData(0);

    // Simple sine wave ambient tone
    for (let i = 0; i < data.length; i++) {
      const t = i / sampleRate;
      const freq = 100 + Math.sin(t * 0.5) * 20;
      data[i] = Math.sin(2 * Math.PI * freq * t) * 0.15;
      data[i] *= Math.exp(-t * 0.08); // Fade envelope
    }

    // Convert to blob dan set sebagai audio source
    const offlineCtx = new OfflineAudioContext(1, sampleRate * duration, sampleRate);
    const src = offlineCtx.createBufferSource();
    src.buffer = buffer;
    src.connect(offlineCtx.destination);
    src.start();

    offlineCtx.startRendering().then(renderedBuffer => {
      const blob = bufferToWav(renderedBuffer);
      const url = URL.createObjectURL(blob);
      bgAudio.src = url;
      bgAudio.load();
      console.log('[AUDIO] ✅ Fallback audio created');
    });
  }

  function bufferToWav(audioBuffer) {
    const channels = [];
    for (let i = 0; i < audioBuffer.numberOfChannels; i++) {
      channels.push(audioBuffer.getChannelData(i));
    }

    const sampleRate = audioBuffer.sampleRate;
    const format = 1; // PCM
    const bitDepth = 16;
    const bytesPerSample = bitDepth / 8;

    const dataLength = audioBuffer.length * audioBuffer.numberOfChannels * bytesPerSample;
    const buffer = new ArrayBuffer(44 + dataLength);
    const view = new DataView(buffer);

    const write = (offset, value, bytes, littleEndian) => {
      for (let i = 0; i < bytes; i++) {
        view.setUint8(offset + i, (value >> (i * 8)) & 0xff);
      }
    };

    write(0, 1380533830, 4); // "RIFF"
    write(4, 36 + dataLength, 4);
    write(8, 1463899717, 4); // "WAVE"
    write(12, 1718449184, 4); // "fmt "
    write(16, 16, 4);
    write(20, format, 2);
    write(22, audioBuffer.numberOfChannels, 2);
    write(24, sampleRate, 4);
    write(28, sampleRate * audioBuffer.numberOfChannels * bytesPerSample, 4);
    write(32, audioBuffer.numberOfChannels * bytesPerSample, 2);
    write(34, bitDepth, 2);
    write(36, 1684108385, 4); // "data"
    write(40, dataLength, 4);

    let offset = 44;
    for (let i = 0; i < audioBuffer.length; i++) {
      for (let channel = 0; channel < audioBuffer.numberOfChannels; channel++) {
        let s = Math.max(-1, Math.min(1, channels[channel][i]));
        view.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7fff, true);
        offset += 2;
      }
    }

    return new Blob([buffer], { type: 'audio/wav' });
  }

  function playBGMusic() {
    if (!bgMusicEnabled || !bgAudio || !userHasInteracted) return;
    if (!bgAudio.paused) return; // Sudah playing, skip

    bgAudio.loop = bgMusicLooping;
    isPlayingMusic = true;
    
    console.log('[AUDIO] Attempting to play...');
    console.log('[AUDIO] Ready state:', bgAudio.readyState); // 0=HAVE_NOTHING, 4=HAVE_ENOUGH_DATA

    bgAudio.play()
      .then(() => {
        console.log('[AUDIO] ▶ Music playing');
        isPlayingMusic = true;
      })
      .catch(e => {
        console.warn('[AUDIO] ❌ Play failed:', e.message);
        isPlayingMusic = false;
      });
  }

  function stopBGMusic() {
    isPlayingMusic = false;
    if (bgAudio && !bgAudio.paused) {
      bgAudio.pause();
      bgAudio.currentTime = 0;
      console.log('[AUDIO] ■ Music stopped');
    }
  }

  function setBGMusicEnabled(enabled) {
    bgMusicEnabled = enabled;
    enabled ? playBGMusic() : stopBGMusic();
  }

  function setBGMusicLooping(enabled) {
    bgMusicLooping = enabled;
    if (bgAudio) bgAudio.loop = enabled;
    console.log('[AUDIO] Loop:', enabled ? 'ON' : 'OFF');
  }

  function setSFXEnabled(enabled) {
    sfxEnabled = enabled;
  }

  function setVolume(val) {
    if (bgAudio) bgAudio.volume = Math.max(0, Math.min(1, val));
  }

  function playSound(soundName) {
    if (!sfxEnabled) return;
    // Tambah SFX di sini nanti
  }

  return {
    init,
    setBGMusicEnabled,
    setBGMusicLooping,
    setSFXEnabled,
    playBGMusic,
    stopBGMusic,
    playSound,
    setVolume,
    getBGMusicEnabled: () => bgMusicEnabled,
    getBGMusicLooping: () => bgMusicLooping,
    getSFXEnabled: () => sfxEnabled,
    isPlaying: () => isPlayingMusic,
  };
})();