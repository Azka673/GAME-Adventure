// ===== AUDIO.JS =====
// Audio manager untuk background music dan efek suara
// NOTE: Must comply with music licensing requirements!

const AudioManager = (() => {
  let bgMusicEnabled = true;
  let bgMusicLooping = true; // ✅ FITUR BARU: Toggle looping di settings
  let sfxEnabled = true;
  let bgAudio = null;
  let isPlayingMusic = false;
  
  function init() {
    // Load settings dari GS (akan diset dari Settings)
    bgMusicEnabled = true;
    bgMusicLooping = true;
    sfxEnabled = true;
    
    // Create audio element untuk background music
    if (!bgAudio) {
      bgAudio = document.createElement('audio');
      bgAudio.id = 'bgMusic';
      bgAudio.loop = bgMusicLooping; // ✅ LOOPING ON - Musik berputar terus
      bgAudio.volume = 0.4;
      bgAudio.style.display = 'none';
      bgAudio.crossOrigin = 'anonymous';
      
      // Event listeners untuk error handling
      bgAudio.addEventListener('ended', handleMusicEnded);
      bgAudio.addEventListener('error', handleMusicError);
      bgAudio.addEventListener('canplay', () => {
        console.log('[AUDIO] ✅ Music loaded successfully');
      });
      
      // Try to load Sweden – C418 from assets folder
      bgAudio.src = 'assets/music/sweden.mp3';
      
      document.body.appendChild(bgAudio);
      
      console.log('[AUDIO] Initialized. File source: ' + bgAudio.src);
    }
  }

  // ✅ Handle musik selesai - restart otomatis jika looping enabled
  function handleMusicEnded() {
    if (bgMusicEnabled && bgMusicLooping) {
      console.log('[AUDIO] Music ended, restarting...');
      bgAudio.currentTime = 0;
      bgAudio.play().catch(e => console.log('[AUDIO] Failed to restart music:', e));
    }
  }

  // ✅ Handle error saat loading musik
  function handleMusicError(e) {
    const errorMsg = bgAudio.error ? bgAudio.error.message : 'Unknown error';
    console.error('[AUDIO] ❌ Error loading music:', errorMsg);
    console.log('[AUDIO] Current src:', bgAudio.src);
    console.log('[AUDIO] Network state:', bgAudio.networkState);
    console.log('[AUDIO] Ready state:', bgAudio.readyState);
  }

  function setBGMusicEnabled(enabled) {
    bgMusicEnabled = enabled;
    if (enabled) {
      playBGMusic();
    } else {
      stopBGMusic();
    }
  }

  // ✅ Fitur baru: Set looping on/off
  function setBGMusicLooping(enabled) {
    bgMusicLooping = enabled;
    if (bgAudio) {
      bgAudio.loop = enabled;
      console.log('[AUDIO] Looping ' + (enabled ? 'enabled' : 'disabled'));
    }
  }

  function setSFXEnabled(enabled) {
    sfxEnabled = enabled;
  }

  function playBGMusic() {
    if (!bgMusicEnabled || !bgAudio) return;
    
    if (bgAudio.paused) {
      isPlayingMusic = true;
      console.log('[AUDIO] Playing music...');
      bgAudio.play()
        .then(() => {
          console.log('[AUDIO] ✅ Music started playing');
        })
        .catch(e => {
          console.log('[AUDIO] ❌ Browser blocked autoplay or error:', e.message);
          console.log('[AUDIO] Note: User interaction may be required to play audio');
        });
    }
  }

  function stopBGMusic() {
    isPlayingMusic = false;
    if (bgAudio && !bgAudio.paused) {
      bgAudio.pause();
      bgAudio.currentTime = 0;
      console.log('[AUDIO] Music stopped');
    }
  }

  function getBGMusicEnabled() {
    return bgMusicEnabled;
  }

  function getBGMusicLooping() {
    return bgMusicLooping;
  }

  function playSound(soundName) {
    if (!sfxEnabled) return;
    // Can add individual sound effects here later
  }

  return {
    init,
    setBGMusicEnabled,
    setBGMusicLooping,
    setSFXEnabled,
    playBGMusic,
    stopBGMusic,
    playSound,
    getBGMusicEnabled: () => bgMusicEnabled,
    getBGMusicLooping: () => bgMusicLooping,
    getSFXEnabled: () => sfxEnabled,
  };
})();
