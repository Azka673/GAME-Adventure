// ===== NPC.JS =====

const NPCSystem = (() => {
  let npcs = [];

  function init() {
    npcs = [
      {
        id: 'pakgoa',   x: 250, y: 255,
        name: 'Pak Goa',     e: '🧔', col: '#ff8844',
        dialogKey: 'npcPakGoa', done: false,
      },
      {
        id: 'ibutani',  x: 490, y: 305,
        name: 'Ibu Tani',    e: '👩‍🌾', col: '#44dd88',
        dialogKey: 'npcIbuTani', done: false,
      },
      {
        id: 'pande',    x: 660, y: 205,
        name: 'Pande Besi',  e: '👨‍🔧', col: '#ffcc00',
        dialogKey: 'npcPandeBesi', done: false,
      },
      {
        id: 'dukun',    x: 310, y: 605,
        name: 'Dukun Batu',  e: '🧙',  col: '#cc88ff',
        dialogKey: 'npcDukunBatu', done: false,
      },
      {
        id: 'raja',     x: 750, y: 750,
        name: 'Raja Kuno',   e: '👑',  col: '#ffdd44',
        dialogKey: 'npcRajaKuno', done: false,
      },
    ];
  }

  function startDialog(npc) {
    const lines = StoryDialogs[npc.dialogKey] || [];
    if (!lines.length) return;

    let lineIdx = 0;
    function showLine(idx) {
      const line = lines[idx];
      Dialog.show(line.speaker, line.portrait, [line.text], null);
      // Override Dialog.next for multi-line support
      document.getElementById('dialogNext').onclick = () => {
        lineIdx++;
        if (lineIdx < lines.length) {
          showLine(lineIdx);
        } else {
          Dialog.close();
          npc.done = true;
          MissionSystem.markDone('talk');
          MissionSystem.check();
          if (GS.quizAnswered < 10) setTimeout(() => QuizSystem.trigger(), 600);
        }
      };
    }
    showLine(0);
  }

  function draw(ctx, ox, oy) {
    npcs.forEach(npc => {
      const sx = npc.x + ox, sy = npc.y + oy;
      if (sx < -60 || sx > ctx.canvas.width + 60) return;
      ctx.save();
      // Glow
      ctx.globalAlpha = 0.2 + Math.sin(GS.tick * 0.06) * 0.1;
      ctx.fillStyle   = npc.col;
      ctx.beginPath(); ctx.arc(sx, sy, 30, 0, Math.PI * 2); ctx.fill();
      ctx.globalAlpha = 1;
      // Circle body
      ctx.fillStyle   = npc.col + '44';
      ctx.beginPath(); ctx.arc(sx, sy, 21, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = npc.col; ctx.lineWidth = 1.8;
      ctx.beginPath(); ctx.arc(sx, sy, 21, 0, Math.PI * 2); ctx.stroke();
      // Emoji
      ctx.font = '24px serif'; ctx.textAlign = 'center';
      ctx.fillText(npc.e, sx, sy + 9);
      // Name
      ctx.fillStyle = npc.col; ctx.font = 'bold 10px sans-serif';
      ctx.fillText(npc.name, sx, sy - 27);
      // Indicator
      if (!npc.done) {
        ctx.fillStyle = '#ffcc00'; ctx.font = '14px serif';
        ctx.fillText('❗', sx - 5, sy - 37);
      } else {
        ctx.fillStyle = '#00ffcc'; ctx.font = '13px serif';
        ctx.fillText('✓', sx - 4, sy - 37);
      }
      ctx.textAlign = 'left';
      ctx.restore();
    });
  }

  return { npcs, init, startDialog, draw };
})();
