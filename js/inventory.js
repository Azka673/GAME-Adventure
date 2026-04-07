// ===== INVENTORY.JS =====

const Inventory = (() => {
  const items = [];

  function add(emoji, name, count = 1) {
    const ex = items.find(i => i.e === emoji);
    if (ex) ex.c += count;
    else items.push({ e: emoji, n: name, c: count });
    Utils.notify(`+${count} ${name} ${emoji}`);
    _updateHotbar();
    MissionSystem.check();
  }

  function remove(emoji, count = 1) {
    const ex = items.find(i => i.e === emoji);
    if (!ex) return false;
    ex.c -= count;
    if (ex.c <= 0) items.splice(items.indexOf(ex), 1);
    _updateHotbar();
    return true;
  }

  function has(emoji, count = 1) {
    const ex = items.find(i => i.e === emoji);
    return ex && ex.c >= count;
  }

  function count(emoji) {
    const ex = items.find(i => i.e === emoji);
    return ex ? ex.c : 0;
  }

  function getAll() { return items; }

  function open() {
    document.getElementById('inventory').style.display = 'flex';
    _buildUI();
  }

  function close() {
    document.getElementById('inventory').style.display = 'none';
  }

  function _buildUI() {
    const grid = document.getElementById('invGrid');
    grid.innerHTML = '';
    for (let i = 0; i < 20; i++) {
      const slot = document.createElement('div');
      slot.className = 'iSlot';
      const it = items[i];
      if (it) {
        slot.innerHTML = it.e + `<span class="icnt">${it.c > 1 ? it.c : ''}</span>`;
        slot.title = it.n;
        if (it.e === '🍖') {
          slot.classList.add('food');
          slot.onclick = () => { _eat(); _buildUI(); };
        }
      }
      grid.appendChild(slot);
    }
  }

  function _eat() {
    if (!has('🍖')) return;
    remove('🍖');
    Player.hunger = Math.min(100, Player.hunger + 25);
    Player.hp     = Math.min(100, Player.hp + 5);
    close();
    Utils.showEatAnim('🍖', '+25 Kenyang!');
    Utils.vibrate(30);
  }

  function _updateHotbar() {
    const order = ['🍖', '🪵', '🪨', '⚔', '🛡'];
    order.forEach((e, i) => {
      const it = items.find(x => x.e === e);
      document.getElementById('hse' + i).textContent = it ? e : '';
      document.getElementById('hsc' + i).textContent = it && it.c > 1 ? it.c : '';
    });
  }

  return { add, remove, has, count, getAll, open, close };
})();
