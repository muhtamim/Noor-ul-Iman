// ====== Duas Page Logic ======

const categories = [
  { key: 'all', label: 'All Duas', icon: 'sparkle' },
  { key: 'morning', label: 'Morning', icon: 'sunrise' },
  { key: 'evening', label: 'Evening', icon: 'sunset' },
  { key: 'food', label: 'Food', icon: 'bowl' },
  { key: 'travel', label: 'Travel', icon: 'plane' },
  { key: 'protection', label: 'Protection', icon: 'shield' },
  { key: 'forgiveness', label: 'Forgiveness', icon: 'hands' },
  { key: 'daily', label: 'Daily', icon: 'beads' }
];

let currentCategory = 'all';

function renderCategories() {
  const container = document.getElementById('duaCategories');
  if (!container) return;
  container.innerHTML = categories.map(c => `
    <div class="category-chip ${currentCategory === c.key ? 'active' : ''}" onclick="filterCategory('${c.key}')">
      <i data-icon="${c.icon}" data-size="14" style="vertical-align:-3px;"></i>
      <span style="margin-left:0.4rem;">${c.label}</span>
    </div>
  `).join('');
  if (window.injectIcons) window.injectIcons();
}

function filterCategory(key) {
  currentCategory = key;
  renderCategories();
  renderDuas();
}

function renderDuas() {
  const container = document.getElementById('duasList');
  if (!container) return;

  let duasToShow = [];
  if (currentCategory === 'all') {
    Object.entries(duasCollection).forEach(([cat, duas]) => {
      duas.forEach(d => duasToShow.push({ ...d, category: cat }));
    });
  } else {
    duasToShow = (duasCollection[currentCategory] || []).map(d => ({ ...d, category: currentCategory }));
  }

  if (duasToShow.length === 0) {
    container.innerHTML = '<p class="text-center loading">No duas in this category yet.</p>';
    return;
  }

  container.innerHTML = duasToShow.map(d => `
    <div class="dua-card">
      <div class="dua-title">${d.title}</div>
      <div class="dua-arabic">${d.arabic}</div>
      <div class="dua-transliteration">${d.transliteration}</div>
      <div class="dua-translation">${d.translation}</div>
      <div class="dua-reference">— ${d.reference}</div>
    </div>
  `).join('');
  if (window.injectIcons) window.injectIcons();
}

document.addEventListener('DOMContentLoaded', () => {
  renderCategories();
  renderDuas();
});
