// ====== 99 Names of Allah Page ======

function renderNames(filter = '') {
  const container = document.getElementById('namesGrid');
  if (!container) return;

  const q = filter.toLowerCase().trim();
  const filtered = q
    ? asmaUlHusna.filter(n =>
        n.trans.toLowerCase().includes(q) ||
        n.meaning.toLowerCase().includes(q) ||
        n.num.toString() === q
      )
    : asmaUlHusna;

  if (filtered.length === 0) {
    container.innerHTML = '<p class="text-center loading">No names matching your search.</p>';
    return;
  }

  container.innerHTML = filtered.map(n => `
    <div class="name-card">
      <div class="name-number">${n.num}</div>
      <div class="name-arabic">${n.arabic}</div>
      <div class="name-transliteration">${n.trans}</div>
      <div class="name-meaning">${n.meaning}</div>
    </div>
  `).join('');
}

document.addEventListener('DOMContentLoaded', () => {
  renderNames();
  const search = document.getElementById('namesSearch');
  if (search) {
    search.addEventListener('input', (e) => renderNames(e.target.value));
  }
});
