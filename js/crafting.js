// ===== CRAFTING.JS =====

const Crafting = (() => {
  // All recipes
  const RECIPES = [
    {
      output: { e: '⚔', n: 'Pedang Perunggu', c: 1 },
      emoji: '⚔',
      name: 'Pedang Perunggu',
      desc: 'Senjata logam kuat dari era Perundagian. Meningkatkan damage serangan.',
      ingredients: [
        { e: '🪨', n: 'Batu', c: 3 },
        { e: '🪵', n: 'Kayu', c: 2 },
      ]
    },
    {
      output: { e: '🏹', n: 'Busur Panah', c: 1 },
      emoji: '🏹',
      name: 'Busur Panah',
      desc: 'Senjata jarak jauh dari era Mesolitikum. Bisa menyerang dari kejauhan.',
      ingredients: [
        { e: '🪵', n: 'Kayu', c: 4 },
        { e: '🪨', n: 'Batu', c: 1 },
      ]
    },
    {
      output: { e: '🪓', n: 'Kapak Batu', c: 1 },
      emoji: '🪓',
      name: 'Kapak Batu',
      desc: 'Kapak Neolitikum yang diasah halus. Lebih efisien menebang pohon.',
      ingredients: [
        { e: '🪨', n: 'Batu', c: 2 },
        { e: '🪵', n: 'Kayu', c: 1 },
      ]
    },
    {
      output: { e: '🍲', n: 'Sup Hutan', c: 2 },
      emoji: '🍲',
      name: 'Sup Hutan',
      desc: 'Makanan olahan yang mengisi lapar lebih banyak dari daging mentah.',
      ingredients: [
        { e: '🍖', n: 'Daging', c: 2 },
        { e: '🪵', n: 'Kayu', c: 1 },
      ]
    },
    {
      output: { e: '🛡', n: 'Perisai Kayu', c: 1 },
      emoji: '🛡',
      name: 'Perisai Kayu',
      desc: 'Pelindung sederhana. Mengurangi damage dari hewan buas.',
      ingredients: [
        { e: '🪵', n: 'Kayu', c: 5 },
        { e: '🪨', n: 'Batu', c: 1 },
      ]
    },
    {
      output: { e: '🔦', n: 'Obor', c: 3 },
      emoji: '🔦',
      name: 'Obor',
      desc: 'Penerangan untuk menjelajahi area gelap dan celah dimensi.',
      ingredients: [
        { e: '🪵', n: 'Kayu', c: 2 },
        { e: '🍖', n: 'Lemak', c: 1 },
      ]
    },
    {
      output: { e: '🏺', n: 'Gerabah', c: 1 },
      emoji: '🏺',
      name: 'Gerabah',
      desc: 'Tembikar dari tanah liat. Peninggalan khas Neolitikum. Bisa menyimpan makanan.',
      ingredients: [
        { e: '🪨', n: 'Batu', c: 4 },
      ]
    },
    {
      output: { e: '🧱', n: 'Menhir Mini', c: 1 },
      emoji: '🧱',
      name: 'Menhir Mini',
      desc: 'Tiang batu ritual Megalitikum. Diperlukan untuk misi Dukun Batu.',
      ingredients: [
        { e: '🪨', n: 'Batu', c: 6 },
        { e: '🪵', n: 'Kayu', c: 2 },
      ]
    },
  ];

  let resultTimer = null;

  function open() {
    document.getElementById('craftingPanel').style.display = 'flex';
    _buildUI();
  }

  function close() {
    document.getElementById('craftingPanel').style.display = 'none';
    document.getElementById('craftResult').style.display = 'none';
  }

  function _buildUI() {
    const grid = document.getElementById('craftGrid');
    grid.innerHTML = '';
    RECIPES.forEach((recipe, idx) => {
      const canCraft = recipe.ingredients.every(ing => Inventory.has(ing.e, ing.c));
      const card = document.createElement('div');
      card.className = `craftRecipe ${canCraft ? 'can-craft' : 'cant-craft'}`;

      let ingsHTML = recipe.ingredients.map(ing => {
        const have = Inventory.count(ing.e);
        const ok   = have >= ing.c;
        return `<span class="craftIng ${ok ? 'have' : 'need'}">
          <span class="ingIcon">${ing.e}</span>
          <span>${have}/${ing.c}</span>
        </span>`;
      }).join('');

      card.innerHTML = `
        <div class="craftOutput">${recipe.emoji}</div>
        <div class="craftInfo">
          <div class="craftName">${recipe.name}</div>
          <div class="craftDesc">${recipe.desc}</div>
          <div class="craftIngredients">${ingsHTML}</div>
        </div>
        <button class="craftBtn" ${canCraft ? '' : 'disabled'}>
          ${canCraft ? 'Buat!' : 'Kurang'}
        </button>`;

      if (canCraft) {
        card.querySelector('.craftBtn').onclick = () => _craft(recipe);
      }
      grid.appendChild(card);
    });
  }

  function _craft(recipe) {
    // Double-check materials
    if (!recipe.ingredients.every(ing => Inventory.has(ing.e, ing.c))) {
      Utils.notify('Material tidak cukup!', '#ff5555');
      return;
    }
    // Consume
    recipe.ingredients.forEach(ing => Inventory.remove(ing.e, ing.c));
    // Give output
    Inventory.add(recipe.output.e, recipe.output.n, recipe.output.c);

    // Show result animation
    const res = document.getElementById('craftResult');
    res.innerHTML = `
      <span class="craftResultEmoji">${recipe.emoji}</span>
      <div class="craftResultText">${recipe.name} berhasil dibuat!</div>`;
    res.style.display = 'block';

    Utils.notify(`🔨 Berhasil membuat ${recipe.name}!`, '#cc9922');
    Utils.vibrate([30, 20, 30]);

    if (resultTimer) clearTimeout(resultTimer);
    resultTimer = setTimeout(() => {
      res.style.display = 'none';
      _buildUI(); // refresh
    }, 2000);

    MissionSystem.check();
  }

  return { open, close };
})();
