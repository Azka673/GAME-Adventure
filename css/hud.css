/* ===== HUD ===== */
#hud {
  position: fixed; top: 0; left: 0; width: 100%;
  pointer-events: none; z-index: 30; padding: 10px;
  display: none;
}
#hudLeft  { position: absolute; top: 10px; left: 10px; }
#hudRight { position: absolute; top: 10px; right: 10px; text-align: right; }

.hLabel { color: #9ab; font-size: 9px; font-weight: 700; letter-spacing: 1px; margin-bottom: 2px; }
.hBar {
  width: 132px; height: 8px;
  background: #111; border-radius: 4px;
  border: 1px solid #223; overflow: hidden; margin-bottom: 5px;
}
.hFill { height: 100%; border-radius: 4px; transition: width .3s; }
.hStat { font-size: 12px; font-weight: 700; color: #fff; text-shadow: 0 0 8px #00ffcc; margin-bottom: 2px; }

/* Task Panel */
#taskPanel {
  margin-top: 6px;
  background: rgba(0,0,0,.72);
  border: 1px solid #223; border-radius: 10px;
  padding: 9px 12px; min-width: 168px;
}
.tPTitle { color: #ffaa00; font-size: 10px; font-weight: 700; letter-spacing: 1px; margin-bottom: 5px; }
.tPItem  { color: #aab; font-size: 10px; margin-bottom: 2px; display: flex; align-items: center; gap: 5px; }
.tPDone  { color: #00ffcc; text-decoration: line-through; }
.tCheck     { width: 10px; height: 10px; border-radius: 2px; border: 1px solid #445; flex-shrink: 0; }
.tCheckDone { background: #00ffcc; border-color: #00ffcc; }

/* Hotbar */
#hotbar {
  position: fixed; bottom: 100px;
  left: 50%; transform: translateX(-50%);
  display: none; gap: 4px; z-index: 28;
}
.hSlot {
  width: 46px; height: 46px;
  background: rgba(0,0,0,.68);
  border: 2px solid #334; border-radius: 8px;
  display: flex; align-items: center; justify-content: center;
  font-size: 20px; position: relative;
}
.hSlot.active { border-color: #00ffcc; box-shadow: 0 0 10px #00ffcc55; }
.hcnt { position: absolute; bottom: 1px; right: 3px; font-size: 9px; color: #ffaa00; font-weight: 700; }

/* Mobile Controls */
#controls {
  position: fixed; bottom: 0; left: 0; width: 100%;
  z-index: 25; pointer-events: none;
  display: none;
}
#joystickWrap { position: absolute; bottom: 18px; left: 18px; pointer-events: all; }
#jOut {
  width: 98px; height: 98px;
  background: rgba(255,255,255,.1);
  border-radius: 50%; border: 2px solid rgba(255,255,255,.25);
  display: flex; align-items: center; justify-content: center;
  position: relative;
}
#jIn {
  width: 40px; height: 40px;
  background: rgba(255,255,255,.45);
  border-radius: 50%; position: absolute;
  top: 50%; left: 50%;
  transform: translate(-50%,-50%);
}
#actionBtns {
  position: absolute; bottom: 18px; right: 18px;
  display: flex; flex-direction: column;
  gap: 8px; align-items: flex-end; pointer-events: all;
}
.aBtn {
  border-radius: 50%; border: 2px solid;
  display: flex; align-items: center; justify-content: center;
  cursor: pointer; color: #fff; pointer-events: all;
}
#bAtk  { width: 58px; height: 58px; background: rgba(255,60,60,.3); border-color: #ff5555; font-size: 22px; }
#bAct  { width: 52px; height: 52px; background: rgba(0,200,255,.3); border-color: #00ccff; font-size: 15px; }
#bSpr  { width: 46px; height: 46px; background: rgba(255,200,0,.3); border-color: #ffcc00; font-size: 18px; }
#bCraft{ width: 44px; height: 44px; background: rgba(200,150,50,.3); border-color: #cc9922; font-size: 18px; }
#bInv  { width: 44px; height: 44px; background: rgba(150,100,255,.3); border-color: #aa88ff; font-size: 18px; }

/* Inventory */
#inventory {
  position: fixed; inset: 0; z-index: 55;
  display: none; align-items: center; justify-content: center;
  background: rgba(0,0,0,.88);
}
.invBox {
  background: #0e0e1e; border: 1px solid #334;
  border-radius: 18px; padding: 18px;
  width: 92%; max-width: 390px;
}
.invTitle { color: #aa88ff; font-size: 17px; font-weight: 700; margin-bottom: 12px; text-align: center; }
#invGrid { display: grid; grid-template-columns: repeat(5,1fr); gap: 6px; margin-bottom: 12px; }
.iSlot {
  aspect-ratio: 1; background: #131325;
  border: 1px solid #2a2a4a; border-radius: 8px;
  display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  font-size: 22px; cursor: pointer; position: relative;
}
.iSlot.food  { border-color: #ffaa0077; }
.iSlot.craft { border-color: #cc992277; }
.iSlot .icnt { position: absolute; bottom: 2px; right: 4px; font-size: 9px; color: #ffaa00; font-weight: 700; }
.invClose {
  width: 100%; padding: 10px;
  background: rgba(170,136,255,.1);
  border: 1px solid #aa88ff; color: #aa88ff;
  border-radius: 12px; cursor: pointer; font-size: 13px;
}

/* Dialog Box */
#dialogBox {
  position: fixed; bottom: 112px;
  left: 14px; right: 14px; z-index: 56;
  display: none;
  background: linear-gradient(135deg, #0a180a, #180a1a);
  border: 1px solid #445; border-radius: 14px;
  padding: 0; overflow: hidden;
  flex-direction: row;
}
#dialogPortrait {
  width: 64px; min-height: 80px;
  background: rgba(0,0,0,.4);
  display: flex; align-items: center; justify-content: center;
  font-size: 32px; flex-shrink: 0;
  border-right: 1px solid #334;
}
#dialogBody { flex: 1; padding: 12px 14px; }
#dialogName  { color: #ffaa00; font-size: 11px; font-weight: 700; margin-bottom: 5px; }
#dialogText  { color: #eee; font-size: 13px; line-height: 1.6; }
#dialogNext  {
  margin-top: 10px; float: right;
  background: rgba(0,255,200,.1);
  border: 1px solid #00ffcc; color: #00ffcc;
  padding: 6px 14px; border-radius: 10px;
  cursor: pointer; font-size: 11px; pointer-events: all;
}
