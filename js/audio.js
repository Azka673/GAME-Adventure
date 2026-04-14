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
        // ✅ Auto-play jika user sudah pernah klik sesuatu
        if (userHasInteracted && bgMusicEnabled) {
          playBGMusic();
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
        if (bgMusicEnabled) playBGMusic();
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
  }

  function playBGMusic() {
    if (!bgMusicEnabled || !bgAudio || !userHasInteracted) return;
    if (!bgAudio.paused) return; // Sudah playing, skip

    bgAudio.loop = bgMusicLooping;
    isPlayingMusic = true;

    bgAudio.play()
      .then(() => console.log('[AUDIO] ▶ Music playing'))
      .catch(e => console.warn('[AUDIO] ❌ Play failed:', e.message));
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