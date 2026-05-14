// ====== Zakat Calculator ======
// Zakat rate is 2.5% on wealth held for one lunar year above Nisab threshold

let currentGoldPrice = 6500; // per gram BDT (fallback default, user can change)
let currentSilverPrice = 80;  // per gram BDT

function calculateZakat() {
  const cash = parseFloat(document.getElementById('cash').value) || 0;
  const bank = parseFloat(document.getElementById('bank').value) || 0;
  const gold = parseFloat(document.getElementById('gold').value) || 0;
  const silver = parseFloat(document.getElementById('silver').value) || 0;
  const investments = parseFloat(document.getElementById('investments').value) || 0;
  const business = parseFloat(document.getElementById('business').value) || 0;
  const loans = parseFloat(document.getElementById('loans').value) || 0;
  const debts = parseFloat(document.getElementById('debts').value) || 0;

  const goldPrice = parseFloat(document.getElementById('goldPrice').value) || currentGoldPrice;

  const totalAssets = cash + bank + (gold * goldPrice) + (silver * currentSilverPrice) + investments + business + loans;
  const totalLiabilities = debts;
  const netWealth = totalAssets - totalLiabilities;

  // Nisab threshold: 87.48 grams of gold
  const nisab = 87.48 * goldPrice;

  const resultEl = document.getElementById('zakatResult');
  const resultContent = document.getElementById('zakatResultContent');

  if (netWealth < nisab) {
    resultContent.innerHTML = `
      <h3 style="margin-bottom:1rem;">Zakat Not Required</h3>
      <div style="font-size:1.1rem; margin-bottom:1rem;">Your wealth is below the Nisab threshold.</div>
      <div style="margin-top:1rem; opacity:0.9;">
        <div>Your Net Wealth: <strong>${formatMoney(netWealth)}</strong></div>
        <div>Nisab Threshold: <strong>${formatMoney(nisab)}</strong></div>
        <div style="margin-top:0.5rem;">Shortfall: <strong>${formatMoney(nisab - netWealth)}</strong></div>
      </div>
    `;
  } else {
    const zakatAmount = netWealth * 0.025;
    resultContent.innerHTML = `
      <h3 style="margin-bottom:0.5rem;">Your Zakat Amount</h3>
      <div class="zakat-amount">${formatMoney(zakatAmount)}</div>
      <div style="font-size:1.05rem; margin-top:1rem; opacity:0.95;">
        <div>Total Assets: ${formatMoney(totalAssets)}</div>
        <div>Total Liabilities: ${formatMoney(totalLiabilities)}</div>
        <div>Net Zakatable Wealth: ${formatMoney(netWealth)}</div>
        <div style="margin-top:0.5rem;">Nisab Threshold: ${formatMoney(nisab)}</div>
        <div style="margin-top:1rem; padding-top:1rem; border-top:1px solid rgba(255,255,255,0.2); font-size:0.95rem;">
          May Allah accept your zakat. Distribute to the 8 categories mentioned in Quran 9:60.
        </div>
      </div>
    `;
  }
  resultEl.classList.add('show');
  resultEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function formatMoney(amount) {
  const currency = document.getElementById('currency')?.value || 'BDT';
  const symbols = { BDT: '৳', USD: '$', SAR: 'SAR ', EUR: '€', GBP: '£', INR: '₹', PKR: 'Rs ' };
  const symbol = symbols[currency] || '';
  return `${symbol}${amount.toLocaleString('en-US', { maximumFractionDigits: 2 })}`;
}

function resetForm() {
  document.querySelectorAll('.calculator-card input[type="number"]').forEach(i => i.value = '');
  document.getElementById('zakatResult').classList.remove('show');
}

document.addEventListener('DOMContentLoaded', () => {
  const calcBtn = document.getElementById('calculateBtn');
  const resetBtn = document.getElementById('resetBtn');
  if (calcBtn) calcBtn.addEventListener('click', calculateZakat);
  if (resetBtn) resetBtn.addEventListener('click', resetForm);
});
