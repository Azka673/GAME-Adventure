/* ===== LOADING SCREEN ===== */
#loadingScreen {
  position: fixed;
  inset: 0;
  z-index: 999;
  background: #000;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0;
  overflow: hidden;
}

/* Animated starfield background */
#loadingScreen canvas#loadBg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

/* Content wrapper */
#loadingContent {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 0 24px;
  gap: 0;
}

/* ── Game logo / title ── */
#loadLogo {
  font-size: clamp(28px, 7vw, 64px);
  font-weight: 900;
  letter-spacing: 6px;
  color: #fff;
  text-align: center;
  text-shadow:
    0 0 20px #00ffcc,
    0 0 50px #0088ff,
    0 0 90px #0044ff;
  margin-bottom: 6px;
  opacity: 0;
  transform: translateY(-20px);
  transition: opacity .8s ease, transform .8s ease;
}
#loadLogo.visible {
  opacity: 1;
  transform: translateY(0);
}

/* subtitle under logo */
#loadSubtitle {
  font-size: clamp(11px, 2.5vw, 15px);
  letter-spacing: 5px;
  color: #7ae;
  text-align: center;
  margin-bottom: 48px;
  opacity: 0;
  transition: opacity .6s ease .4s;
}
#loadSubtitle.visible { opacity: 1; }

/* ── Divider line ── */
#loadDivider {
  width: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, #00ffcc, transparent);
  margin-bottom: 40px;
  transition: width 1.2s ease .6s;
}
#loadDivider.visible { width: min(400px, 80vw); }

/* ── Welcome typewriter area ── */
#loadWelcome {
  min-height: 64px;
  max-width: 520px;
  width: 100%;
  text-align: center;
  margin-bottom: 52px;
}
#loadWelcomeText {
  font-size: clamp(14px, 3.5vw, 20px);
  color: #ddeeff;
  line-height: 1.7;
  font-weight: 400;
  letter-spacing: .5px;
}
/* blinking cursor */
#loadCursor {
  display: inline-block;
  width: 2px;
  height: 1.15em;
  background: #00ffcc;
  vertical-align: middle;
  margin-left: 2px;
  animation: cursorBlink .75s step-end infinite;
}
@keyframes cursorBlink {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0; }
}

/* ── Progress bar ── */
#loadBarWrap {
  width: min(360px, 80vw);
  margin-bottom: 14px;
  opacity: 0;
  transition: opacity .4s ease;
}
#loadBarWrap.visible { opacity: 1; }
#loadBarTrack {
  width: 100%;
  height: 4px;
  background: #111;
  border-radius: 2px;
  overflow: hidden;
  border: 1px solid #223;
}
#loadBarFill {
  height: 100%;
  width: 0%;
  border-radius: 2px;
  background: linear-gradient(90deg, #0088ff, #00ffcc);
  transition: width .35s ease;
  box-shadow: 0 0 8px #00ffcc88;
}

/* ── Loading status label ── */
#loadStatus {
  font-size: 11px;
  color: #445;
  letter-spacing: 2px;
  text-transform: uppercase;
  margin-bottom: 40px;
  min-height: 16px;
  transition: color .3s;
}

/* ── Press to continue button ── */
#loadContinue {
  padding: 13px 44px;
  border: 2px solid #00ffcc;
  border-radius: 30px;
  background: rgba(0, 255, 200, .08);
  color: #00ffcc;
  font-size: 15px;
  font-weight: 700;
  letter-spacing: 2px;
  cursor: pointer;
  opacity: 0;
  transform: translateY(12px);
  transition: opacity .5s ease, transform .5s ease, background .2s;
  pointer-events: none;
  text-transform: uppercase;
}
#loadContinue.visible {
  opacity: 1;
  transform: translateY(0);
  pointer-events: all;
  animation: continuePulse 2s ease-in-out infinite;
}
#loadContinue:active { background: rgba(0, 255, 200, .2); transform: scale(.96); }
@keyframes continuePulse {
  0%, 100% { box-shadow: 0 0 12px #00ffcc44; }
  50%       { box-shadow: 0 0 28px #00ffcc88, 0 0 50px #0088ff44; }
}

/* ── Version tag ── */
#loadVersion {
  position: absolute;
  bottom: 16px;
  right: 20px;
  color: #222;
  font-size: 10px;
  letter-spacing: 1px;
}
