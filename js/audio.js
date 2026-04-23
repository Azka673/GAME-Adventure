// ===== AUDIO.JS =====
const AudioManager = (() => {
  let bgMusicEnabled = true;
  let bgMusicLooping = true;
  let sfxEnabled = true;
  let bgAudio = null;
  let bossMusicAudio = null;
  let bossClearAudio = null;
  let isPlayingMusic = false;
  let isPlayingBossMusic = false;
  let userHasInteracted = false;
  let currentMusicTrack = 'normal'; // 'normal', 'boss', 'clear'

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
      bgAudio.src = 'assets/music/Music BG.mp3'; // ✅ Normal gameplay music

      bgAudio.addEventListener('error', handleMusicError);
      bgAudio.addEventListener('canplay', () => {
        console.log('[AUDIO] ✅ Music BG.mp3 loaded');
      });
      bgAudio.addEventListener('ended', () => {
        if (bgMusicLooping && bgMusicEnabled && currentMusicTrack === 'normal') {
          console.log('[AUDIO] 🔁 Music ended, restarting...');
          bgAudio.currentTime = 0;
          bgAudio.play().catch(e => console.warn('[AUDIO] Restart failed:', e.message));
        }
      });

      document.body.appendChild(bgAudio);
      bgAudio.load();
    }

    // Boss Music Audio Element
    if (!bossMusicAudio) {
      bossMusicAudio = document.createElement('audio');
      bossMusicAudio.id = 'bossMusic';
      bossMusicAudio.loop = true;
      bossMusicAudio.volume = 0.4;
      bossMusicAudio.style.display = 'none';
      bossMusicAudio.src = 'assets/music/Boss Music BG.mp3';

      bossMusicAudio.addEventListener('error', () => {
        console.error('[AUDIO] ❌ Boss Music BG.mp3 failed to load');
      });
      bossMusicAudio.addEventListener('canplay', () => {
        console.log('[AUDIO] ✅ Boss Music BG.mp3 loaded');
      });
      bossMusicAudio.addEventListener('ended', () => {
        if (bgMusicLooping && isPlayingBossMusic && currentMusicTrack === 'boss') {
          console.log('[AUDIO] 🔁 Boss Music ended, restarting...');
          bossMusicAudio.currentTime = 0;
          bossMusicAudio.play().catch(e => console.warn('[AUDIO] Boss restart failed:', e.message));
        }
      });

      document.body.appendChild(bossMusicAudio);
      bossMusicAudio.load();
    }

    // Boss Clear Sound (NO LOOP)
    if (!bossClearAudio) {
      bossClearAudio = document.createElement('audio');
      bossClearAudio.id = 'bossClear';
      bossClearAudio.loop = false; // ⚠️ NO LOOP for victory sound
      bossClearAudio.volume = 0.4;
      bossClearAudio.style.display = 'none';
      bossClearAudio.src = 'assets/music/Boss Clear Sound.mp3';

      bossClearAudio.addEventListener('error', () => {
        console.error('[AUDIO] ❌ Boss Clear Sound.mp3 failed to load');
      });
      bossClearAudio.addEventListener('canplay', () => {
        console.log('[AUDIO] ✅ Boss Clear Sound.mp3 loaded');
      });
      bossClearAudio.addEventListener('ended', () => {
        console.log('[AUDIO] 🎵 Boss Clear Sound finished, resuming normal music...');
        // After victory sound, play normal music again
        currentMusicTrack = 'normal';
        playBGMusic();
      });

      document.body.appendChild(bossClearAudio);
      bossClearAudio.load();
    }

    // ✅ KUNCI: Tangkap interaksi pertama user di level document
    const unlockAudio = () => {
      if (!userHasInteracted) {
        userHasInteracted = true;
        console.log('[AUDIO] 🔓 User interaction detected, audio unlocked');
        setTimeout(() => {
          if (bgMusicEnabled) playBGMusic();
        }, 100);
      }
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
    
    console.log('[AUDIO] Creating fallback ambient tone...');
    createFallbackAudio();
  }

  function createFallbackAudio() {
    if (!window.AudioContext && !window.webkitAudioContext) return;

    const AudioContext = window.AudioContext || window.webkitAudioContext;
    const ctx = new AudioContext();
    const duration = 8;
    const sampleRate = ctx.sampleRate;
    const buffer = ctx.createBuffer(1, sampleRate * duration, sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < data.length; i++) {
      const t = i / sampleRate;
      const freq = 100 + Math.sin(t * 0.5) * 20;
      data[i] = Math.sin(2 * Math.PI * freq * t) * 0.15;
      data[i] *= Math.exp(-t * 0.08);
    }

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
    const format = 1;
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

    write(0, 1380533830, 4);
    write(4, 36 + dataLength, 4);
    write(8, 1463899717, 4);
    write(12, 1718449184, 4);
    write(16, 16, 4);
    write(20, format, 2);
    write(22, audioBuffer.numberOfChannels, 2);
    write(24, sampleRate, 4);
    write(28, sampleRate * audioBuffer.numberOfChannels * bytesPerSample, 4);
    write(32, audioBuffer.numberOfChannels * bytesPerSample, 2);
    write(34, bitDepth, 2);
    write(36, 1684108385, 4);
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
    if (!bgAudio.paused) return;

    bgAudio.loop = true;
    isPlayingMusic = true;
    currentMusicTrack = 'normal';
    
    console.log('[AUDIO] ▶ Normal Music playing');
    bgAudio.play()
      .then(() => {
        console.log('[AUDIO] ✅ Normal music started');
        isPlayingMusic = true;
      })
      .catch(e => {
        console.warn('[AUDIO] ❌ Play failed:', e.message);
        isPlayingMusic = false;
      });
  }

  function playBossMusic() {
    if (!bgMusicEnabled || !bossMusicAudio || !userHasInteracted) return;

    // Stop normal music
    if (bgAudio && !bgAudio.paused) {
      bgAudio.pause();
      bgAudio.currentTime = 0;
      console.log('[AUDIO] ■ Normal music stopped');
    }

    bossMusicAudio.loop = true;
    isPlayingBossMusic = true;
    currentMusicTrack = 'boss';
    
    console.log('[AUDIO] 🎸 Boss Music starting...');
    bossMusicAudio.currentTime = 0;
    bossMusicAudio.play()
      .then(() => {
        console.log('[AUDIO] ✅ Boss music started');
      })
      .catch(e => {
        console.warn('[AUDIO] ❌ Boss music play failed:', e.message);
      });
  }

  function playBossClearSound() {
    if (!bgMusicEnabled || !bossClearAudio || !userHasInteracted) return;

    // Stop boss music
    if (bossMusicAudio && !bossMusicAudio.paused) {
      bossMusicAudio.pause();
      bossMusicAudio.currentTime = 0;
      console.log('[AUDIO] ■ Boss music stopped');
    }

    isPlayingBossMusic = false;
    currentMusicTrack = 'clear';
    
    console.log('[AUDIO] 🎉 Boss Clear Sound playing!');
    bossClearAudio.currentTime = 0;
    bossClearAudio.play()
      .then(() => {
        console.log('[AUDIO] ✅ Boss clear sound started');
      })
      .catch(e => {
        console.warn('[AUDIO] ❌ Boss clear sound failed:', e.message);
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
    if (bossMusicAudio) bossMusicAudio.volume = Math.max(0, Math.min(1, val));
    if (bossClearAudio) bossClearAudio.volume = Math.max(0, Math.min(1, val));
  }

  function playSound(soundName) {
    if (!sfxEnabled) return;
  }

  return {
    init,
    setBGMusicEnabled,
    setBGMusicLooping,
    setSFXEnabled,
    playBGMusic,
    stopBGMusic,
    playBossMusic,
    playBossClearSound,
    playSound,
    setVolume,
    getBGMusicEnabled: () => bgMusicEnabled,
    getBGMusicLooping: () => bgMusicLooping,
    getSFXEnabled: () => sfxEnabled,
    isPlaying: () => isPlayingMusic,
    isPlayingBoss: () => isPlayingBossMusic,
  };
})();