/* ===== RESET & BASE ===== */
*, *::before, *::after {
  margin: 0; padding: 0;
  box-sizing: border-box;
  -webkit-tap-highlight-color: transparent;
  user-select: none;
}
html, body {
  width: 100%; height: 100%;
  overflow: hidden;
  background: #000;
  font-family: 'Segoe UI', system-ui, sans-serif;
}
canvas { display: block; }

/* ===== WHIRLPOOL ===== */
#whirlpool {
  position: fixed; inset: 0;
  background: #000; z-index: 300;
  display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  gap: 18px;
}
#wpText {
  color: #fff; font-size: clamp(20px, 5vw, 38px);
  font-weight: 900; letter-spacing: 5px;
  text-shadow: 0 0 30px #00ffcc, 0 0 60px #0088ff;
  animation: wpGlow 1.4s ease-in-out infinite alternate;
}
#wpSub { color: #7ae; font-size: 13px; letter-spacing: 3px; opacity: .7; }
@keyframes wpGlow {
  0% { text-shadow: 0 0 20px #00ffcc; }
  100% { text-shadow: 0 0 50px #00ffcc, 0 0 90px #0088ff, 0 0 120px #0044ff; }
}

/* ===== GAME CANVAS ===== */
#gc {
  position: fixed; inset: 0;
  width: 100vw; height: 100vh;
  display: none;
}

/* ===== SETTINGS ===== */
#settings {
  position: fixed; inset: 0; z-index: 115;
  background: rgba(0,0,0,.92);
  display: none; align-items: center; justify-content: center;
}
.setBox {
  background: #0e0e1e; border: 1px solid #334;
  border-radius: 18px; padding: 24px;
  width: 88%; max-width: 380px;
}
.setTitle { color: #fff; font-size: 18px; font-weight: 700; text-align: center; margin-bottom: 18px; }
.setRow { display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px; }
.setLabel { color: #bcd; font-size: 13px; }
.tog {
  width: 48px; height: 26px;
  background: #333; border-radius: 13px;
  position: relative; cursor: pointer; transition: .2s;
}
.tog.on { background: #00ffcc; }
.tog::after {
  content: ''; position: absolute;
  width: 22px; height: 22px; background: #fff;
  border-radius: 50%; top: 2px; left: 2px; transition: .2s;
}
.tog.on::after { left: 24px; }
.setClose {
  width: 100%; padding: 11px;
  background: rgba(0,255,200,.1);
  border: 1px solid #00ffcc; color: #00ffcc;
  border-radius: 12px; cursor: pointer; font-size: 14px; margin-top: 6px;
}

/* ===== TUTORIAL ===== */
#tutorial {
  position: fixed; inset: 0; z-index: 115;
  background: rgba(0,0,0,.93);
  display: none; align-items: center; justify-content: center;
}
.tutBox {
  background: #0e0e1e; border: 1px solid #334;
  border-radius: 18px; padding: 20px;
  width: 92%; max-width: 440px;
  max-height: 86vh; overflow-y: auto;
}
.tutTitle { color: #00ffcc; font-size: 18px; font-weight: 700; text-align: center; margin-bottom: 14px; }
.tutStep {
  background: #131322; border-radius: 10px;
  padding: 12px; margin-bottom: 8px; border-left: 2px solid #00ffcc;
}
.tutSTitle { color: #fff; font-size: 13px; font-weight: 700; margin-bottom: 3px; }
.tutSDesc { color: #8899aa; font-size: 12px; line-height: 1.6; }
.tutClose {
  width: 100%; padding: 11px;
  background: rgba(0,255,200,.1);
  border: 1px solid #00ffcc; color: #00ffcc;
  border-radius: 12px; cursor: pointer; font-size: 13px; margin-top: 10px;
}

/* ===== NOTIFICATION ===== */
#notif {
  position: fixed; top: 72px; left: 50%;
  transform: translateX(-50%);
  z-index: 90; background: rgba(0,0,0,.9);
  border: 1px solid #00ffcc; border-radius: 12px;
  padding: 9px 18px; color: #00ffcc;
  font-size: 12px; font-weight: 700;
  display: none; max-width: 88vw;
  text-align: center; white-space: nowrap;
  overflow: hidden; text-overflow: ellipsis;
  animation: notifIn .2s ease-out;
}
@keyframes notifIn {
  from { opacity:0; transform: translateX(-50%) translateY(-10px); }
  to   { opacity:1; transform: translateX(-50%) translateY(0); }
}

/* ===== SWORD VFX ===== */
#swordVFX {
  position: fixed; pointer-events: none;
  z-index: 35; display: none;
}

/* ===== EAT ANIMATION ===== */
#eatAnim {
  position: fixed; top: 50%; left: 50%;
  transform: translate(-50%,-50%);
  z-index: 75; display: none;
  text-align: center; pointer-events: none;
}
#eatEmoji { font-size: 64px; display: block; }
#eatTxt {
  color: #ffcc00; font-size: 18px; font-weight: 700;
  text-shadow: 0 0 20px #ffcc00; margin-top: 8px;
}
@keyframes eatPop {
  0%   { transform: scale(0) rotate(-20deg); }
  60%  { transform: scale(1.3) rotate(8deg); }
  100% { transform: scale(1) rotate(0); }
}
