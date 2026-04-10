// ===== AUDIO.JS =====
// Audio manager untuk background music dan efek suara

const AudioManager = (() => {
  let bgMusicEnabled = true;
  let sfxEnabled = true;
  let bgAudio = null;
  
  function init() {
    // Load settings dari GS (akan diset dari Settings)
    bgMusicEnabled = true;
    sfxEnabled = true;
    
    // Create audio element untuk background music
    if (!bgAudio) {
      bgAudio = document.createElement('audio');
      bgAudio.id = 'bgMusic';
      bgAudio.loop = true;
      bgAudio.volume = 0.3;
      bgAudio.style.display = 'none';
      document.body.appendChild(bgAudio);
    }
  }

  function setBGMusicEnabled(enabled) {
    bgMusicEnabled = enabled;
    if (enabled) {
      playBGMusic();
    } else {
      stopBGMusic();
    }
  }

  function setSFXEnabled(enabled) {
    sfxEnabled = enabled;
  }

  function playBGMusic() {
    if (!bgMusicEnabled || !bgAudio) return;
    
    // Set music source - Anda bisa ganti URL dengan musik yang ada
    // Disini menggunakan Web Audio API untuk membuat simple tone
    if (!bgAudio.src) {
      _createBGMusicTone();
    }
    
    if (bgAudio.paused) {
      bgAudio.play().catch(e => console.log('Audio play error:', e));
    }
  }

  function stopBGMusic() {
    if (bgAudio && !bgAudio.paused) {
      bgAudio.pause();
      bgAudio.currentTime = 0;
    }
  }

  function _createBGMusicTone() {
    // Create a simple audio data URL for background ambience
    // This is a very basic ambient tone
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const duration = 8;
    const sampleRate = audioContext.sampleRate;
    const buffer = audioContext.createBuffer(1, sampleRate * duration, sampleRate);
    const data = buffer.getChannelData(0);
    
    // Create ambient sine wave pattern
    for (let i = 0; i < buffer.length; i++) {
      const t = i / sampleRate;
      const freq1 = 60 + Math.sin(t * 0.5) * 10;  // Main ambient frequency
      const freq2 = 90 + Math.sin(t * 0.3) * 15;  
      data[i] = Math.sin(2 * Math.PI * freq1 * t) * 0.1;
      data[i] += Math.sin(2 * Math.PI * freq2 * t) * 0.08;
      data[i] *= Math.exp(-t * 0.2);  // Fade effect
      data[i] *= 0.3;  // Reduce volume
    }
    
    // Convert to audio blob and create data URL
    const offlineContext = new OfflineAudioContext(1, sampleRate * duration, sampleRate);
    const offlineBuffer = offlineContext.createBuffer(1, sampleRate * duration, sampleRate);
    offlineBuffer.getChannelData(0).set(data);
    
    offlineContext.startRendering().then(renderedBuffer => {
      const wav = _audioBufferToWav(renderedBuffer);
      const blob = new Blob([wav], { type: 'audio/wav' });
      bgAudio.src = URL.createObjectURL(blob);
    });
  }

  function _audioBufferToWav(audioBuffer) {
    const numberOfChannels = audioBuffer.numberOfChannels;
    const sampleRate = audioBuffer.sampleRate;
    const format = 1;
    const bitDepth = 16;

    const bytesPerSample = bitDepth / 8;
    const blockAlign = numberOfChannels * bytesPerSample;

    const channels = [];
    for (let i = 0; i < numberOfChannels; i++) {
      channels.push(audioBuffer.getChannelData(i));
    }

    const length = audioBuffer.length * numberOfChannels * bytesPerSample + 44;
    const arrayBuffer = new ArrayBuffer(length);
    const view = new DataView(arrayBuffer);

    const writeString = (offset, string) => {
      for (let i = 0; i < string.length; i++) {
        view.setUint8(offset + i, string.charCodeAt(i));
      }
    };

    const floatTo16BitPCM = (output, offset, input) => {
      for (let i = 0; i < input.length; i++, offset += 2) {
        let s = Math.max(-1, Math.min(1, input[i]));
        output.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
      }
    };

    writeString(0, 'RIFF');
    view.setUint32(4, length - 8, true);
    writeString(8, 'WAVE');

    writeString(12, 'fmt ');
    view.setUint32(16, 16, true);
    view.setUint16(20, format, true);
    view.setUint16(22, numberOfChannels, true);
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, sampleRate * blockAlign, true);
    view.setUint16(32, blockAlign, true);
    view.setUint16(34, bitDepth, true);

    writeString(36, 'data');
    view.setUint32(40, length - 44, true);

    let offset = 44;
    for (let i = 0; i < channels[0].length; i++) {
      for (let channelIndex = 0; channelIndex < numberOfChannels; channelIndex++) {
        floatTo16BitPCM(view, offset, channels[channelIndex].subarray(i, i + 1));
        offset += 2;
      }
    }

    return arrayBuffer;
  }

  function playSound(soundName) {
    if (!sfxEnabled) return;
    // Can add individual sound effects here later
  }

  return {
    init,
    setBGMusicEnabled,
    setSFXEnabled,
    playBGMusic,
    stopBGMusic,
    playSound,
    getBGMusicEnabled: () => bgMusicEnabled,
    getSFXEnabled: () => sfxEnabled,
  };
})();
