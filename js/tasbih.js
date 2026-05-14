// ====== Tasbih Counter Logic ======

const dhikrList = [
  { arabic: "سُبْحَانَ ٱللَّٰهِ", trans: "SubhanAllah", meaning: "Glory be to Allah", target: 33 },
  { arabic: "ٱلْحَمْدُ لِلَّٰهِ", trans: "Alhamdulillah", meaning: "All praise is for Allah", target: 33 },
  { arabic: "ٱللَّٰهُ أَكْبَرُ", trans: "Allahu Akbar", meaning: "Allah is the Greatest", target: 34 },
  { arabic: "لَا إِلَٰهَ إِلَّا ٱللَّٰهُ", trans: "La ilaha illallah", meaning: "There is no god but Allah", target: 100 },
  { arabic: "أَسْتَغْفِرُ اللَّهَ", trans: "Astaghfirullah", meaning: "I seek forgiveness from Allah", target: 100 },
  { arabic: "صَلَّى ٱللَّٰهُ عَلَيْهِ وَسَلَّمَ", trans: "Sallallahu alayhi wa sallam", meaning: "Peace be upon him", target: 100 }
];

let currentDhikrIdx = 0;
let count = parseInt(localStorage.getItem('tasbihCount') || '0');
let totalCount = parseInt(localStorage.getItem('tasbihTotal') || '0');

function updateDisplay() {
  const d = dhikrList[currentDhikrIdx];
  document.getElementById('dhikrArabic').textContent = d.arabic;
  document.getElementById('dhikrTrans').textContent = `${d.trans} — ${d.meaning}`;
  document.getElementById('tasbihCount').textContent = count;
  document.getElementById('tasbihTarget').textContent = `Target: ${d.target} • Total: ${totalCount}`;

  // Vibration on milestone
  if (count > 0 && count === d.target) {
    if (navigator.vibrate) navigator.vibrate([100, 50, 100, 50, 200]);
    document.getElementById('tasbihCount').style.color = 'var(--accent)';
    setTimeout(() => {
      document.getElementById('tasbihCount').style.color = '';
    }, 1500);
  }
}

function incrementCount() {
  count++;
  totalCount++;
  localStorage.setItem('tasbihCount', count);
  localStorage.setItem('tasbihTotal', totalCount);

  // Haptic feedback (mobile)
  if (navigator.vibrate) navigator.vibrate(30);

  updateDisplay();
}

function resetCount() {
  count = 0;
  localStorage.setItem('tasbihCount', '0');
  updateDisplay();
}

function resetTotal() {
  if (confirm('Reset total counter? This will clear all your dhikr count history.')) {
    count = 0;
    totalCount = 0;
    localStorage.setItem('tasbihCount', '0');
    localStorage.setItem('tasbihTotal', '0');
    updateDisplay();
  }
}

function selectDhikr(idx) {
  currentDhikrIdx = idx;
  count = 0;
  localStorage.setItem('tasbihCount', '0');
  renderDhikrOptions();
  updateDisplay();
}

function renderDhikrOptions() {
  const container = document.getElementById('dhikrSelector');
  if (!container) return;
  container.innerHTML = dhikrList.map((d, i) => `
    <div class="dhikr-option ${i === currentDhikrIdx ? 'active' : ''}" onclick="selectDhikr(${i})">
      <div class="dhikr-arabic-small">${d.arabic}</div>
      <div style="font-size:0.85rem; font-weight:700;">${d.trans}</div>
    </div>
  `).join('');
  if (window.injectIcons) window.injectIcons();
}

document.addEventListener('DOMContentLoaded', () => {
  renderDhikrOptions();
  updateDisplay();

  const btn = document.getElementById('tasbihBtn');
  if (btn) btn.addEventListener('click', incrementCount);

  // Keyboard support
  document.addEventListener('keydown', (e) => {
    if (e.code === 'Space' || e.code === 'Enter') {
      e.preventDefault();
      incrementCount();
    }
  });
});
