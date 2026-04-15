// ===== WEATHER.JS =====
// Dynamic weather system that affects gameplay

const WeatherSystem = (() => {
  const WEATHER_TYPES = {
    normal: {
      name: 'Normal',
      icon: '⛅',
      playerSpeedMult: 1.0,
      enemyAggrMult: 1.0,
      visibilityMult: 1.0,
      hpDrainRate: 0,
      duration: [120, 180],
      effectColor: null,
    },
    rain: {
      name: 'Hujan',
      icon: '🌧️',
      playerSpeedMult: 0.75, // Slower movement
      enemyAggrMult: 1.2,    // More aggressive
      visibilityMult: 0.85,  // Slightly reduced visibility
      hpDrainRate: 0,
      duration: [90, 150],
      effectColor: 'rgba(0,150,255,.08)',
    },
    storm: {
      name: 'Badai',
      icon: '⛈️',
      playerSpeedMult: 0.6,  // Very slow
      enemyAggrMult: 1.5,    // Very aggressive
      visibilityMult: 0.7,   // Bad visibility
      hpDrainRate: 0.002,    // Slow HP drain
      duration: [60, 120],
      effectColor: 'rgba(200,100,0,.1)',
    },
    heat: {
      name: 'Terang/Panas',
      icon: '☀️',
      playerSpeedMult: 1.3,  // Faster movement
      enemyAggrMult: 0.8,    // Less aggressive
      visibilityMult: 1.2,   // Better visibility
      hpDrainRate: 0,
      duration: [150, 200],
      effectColor: 'rgba(255,200,0,.06)',
    },
    darkness: {
      name: 'Gelap Mendadak',
      icon: '🌑',
      playerSpeedMult: 0.8,
      enemyAggrMult: 2.0,    // VERY aggressive (like night mode)
      visibilityMult: 0.6,   // Poor visibility
      hpDrainRate: 0.001,
      duration: [45, 90],
      effectColor: 'rgba(50,0,100,.12)',
      spawnEnemies: true,    // Spawn extra enemies
    },
  };

  let currentWeather = 'normal';
  let weatherTimeLeft = 0;
  
  function init() {
    // Start with normal weather, then potentially change
    setWeather('normal');
  }

  function update() {
    // Update weather timer (only in normal mode)
    if (GS.gameMode === 'normal' && GS.started && !GS.paused) {
      GS.weatherTimer--;
      
      // Time to change weather (every 2-3 minutes)
      if (GS.weatherTimer <= 0) {
        _changeWeather();
      }
    }
  }

  function _changeWeather() {
    // Randomly pick a new weather type
    const types = Object.keys(WEATHER_TYPES);
    const newWeather = types[Math.floor(Math.random() * types.length)];
    setWeather(newWeather);
  }

  function setWeather(weatherType) {
    if (!WEATHER_TYPES[weatherType]) return;
    
    currentWeather = weatherType;
    GS.weather = weatherType;
    
    const cfg = WEATHER_TYPES[weatherType];
    
    // Set timer for next change
    const [minTime, maxTime] = cfg.duration;
    GS.weatherTimer = minTime + Math.floor(Math.random() * (maxTime - minTime));
    
    // Notify player
    if (weatherType !== 'normal') {
      Utils.notify(`${cfg.icon} ${cfg.name} datang!`, '#ffaa00');
    }
    
    // Spawn extra enemies if darkness
    if (cfg.spawnEnemies && GS.started) {
      const extraAnim = 3 + Math.floor(Math.random() * 3);
      for (let i = 0; i < extraAnim; i++) {
        const t = TYPES[7 + Math.floor(Math.random() * 2)]; // Random night enemy
        AnimalSystem.animals.push({
          ...t, hp: t.hp,
          x: 80 + Math.random() * 860,
          y: 80 + Math.random() * 860,
          vx: 0, vy: 0,
          dir: Math.random() * Math.PI * 2,
          timer: Math.random() * 120,
          flee: false, fleeTimer: 0,
          atkTimer: 20 + Math.random() * 40,
          alerted: false, alertTimer: 0,
          stunned: false, stunTimer: 0,
          stuckArrows: 0,
          arrowCooldown: 0,
          nightEnemy: true,
          weatherSpawned: true, // Mark so we can clean up
        });
      }
    }
  }

  function getWeatherEffect() {
    return WEATHER_TYPES[currentWeather] || WEATHER_TYPES['normal'];
  }

  function getPlayerSpeedMult() {
    return getWeatherEffect().playerSpeedMult;
  }

  function getEnemyAggrMult() {
    return getWeatherEffect().enemyAggrMult;
  }

  function getVisibilityMult() {
    return getWeatherEffect().visibilityMult;
  }

  function getHpDrainRate() {
    return getWeatherEffect().hpDrainRate;
  }

  function draw(ctx) {
    const effect = getWeatherEffect();
    
    // Draw weather effect overlay
    if (effect.effectColor && GS.started) {
      ctx.fillStyle = effect.effectColor;
      ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      
      // Add some visual effects based on weather
      if (currentWeather === 'rain') {
        _drawRain(ctx);
      } else if (currentWeather === 'storm') {
        _drawStorm(ctx);
      } else if (currentWeather === 'darkness') {
        _drawDarkness(ctx);
      }
    }
  }

  function _drawRain(ctx) {
    ctx.strokeStyle = 'rgba(0,150,255,.15)';
    ctx.lineWidth = 1;
    const tick = GS.tick % 30;
    
    for (let i = 0; i < 20; i++) {
      const x = (i * 80 + tick * 3) % ctx.canvas.width;
      const y = (i * 60 + tick * 5) % ctx.canvas.height;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x - 15, y + 20);
      ctx.stroke();
    }
  }

  function _drawStorm(ctx) {
    // Lightning flashes
    if (GS.tick % 90 < 5) {
      ctx.fillStyle = 'rgba(255,200,0,.2)';
      ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    }
    _drawRain(ctx);
  }

  function _drawDarkness(ctx) {
    // Vignette effect for darkness
    const g = ctx.createRadialGradient(
      ctx.canvas.width / 2, ctx.canvas.height / 2, 200,
      ctx.canvas.width / 2, ctx.canvas.height / 2, 900
    );
    g.addColorStop(0, 'rgba(0,0,0,0)');
    g.addColorStop(1, 'rgba(0,0,0,.6)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  }

  return {
    init,
    update,
    setWeather,
    getWeatherEffect,
    getPlayerSpeedMult,
    getEnemyAggrMult,
    getVisibilityMult,
    getHpDrainRate,
    draw,
    getCurrentWeather: () => currentWeather,
  };
})();
