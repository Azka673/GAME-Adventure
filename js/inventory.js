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
        const FOOD_ITEMS = { '🍖': 25, '🍲': 40 };
        if (it.e in FOOD_ITEMS) {
          slot.classList.add('food');
          slot.onclick = () => { _eat(it.e); _buildUI(); };
        } else if (Player.WEAPONS && Player.WEAPONS[it.e]) {
          // Equip weapon on tap
          if (Player.equipped === it.e) slot.style.outline = '2px solid #cc88ff';
          slot.onclick = () => { Player.equip(it.e); _buildUI(); };
        } else if (Player.ARMORS && Player.ARMORS[it.e]) {
          // Equip armor on tap
          if (Player.armor === it.e) slot.style.outline = '2px solid #ffaa00';
          slot.onclick = () => { Player.equipArmor(it.e); _buildUI(); };
        } else if (Player.SHIELDS && Player.SHIELDS[it.e]) {
          // Equip shield on tap
          if (Player.shield === it.e) slot.style.outline = '2px solid #ff8844';
          slot.onclick = () => { Player.equipShield(it.e); _buildUI(); };
        }
      }
      grid.appendChild(slot);
    }
  }

  function _eat(emoji) {
    const FOOD_ITEMS = { '🍖': { hunger: 25, hp: 5 }, '🍲': { hunger: 40, hp: 15 } };
    const food = FOOD_ITEMS[emoji];
    if (!food || !has(emoji)) return;
    remove(emoji);
    Player.hunger = Math.min(100, Player.hunger + food.hunger);
    Player.hp     = Math.min(100, Player.hp + food.hp);
    close();
    Utils.showEatAnim(emoji, `+${food.hunger} Kenyang!`);
    Utils.vibrate(30);
  }

  function _updateHotbar() {
    const order = ['🍖', '🍲', '🪵', '🪨', '⚔'];
    order.forEach((e, i) => {
      const it = items.find(x => x.e === e);
      document.getElementById('hse' + i).textContent = it ? e : '';
      document.getElementById('hsc' + i).textContent = it && it.c > 1 ? it.c : '';
    });
  }

  return { add, remove, has, count, getAll, open, close };
})();
