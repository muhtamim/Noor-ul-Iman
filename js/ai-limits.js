// ====== AI Rate Limiting & Tier System ======

const TIER_STORAGE = 'aiTier';
const USAGE_STORAGE = 'aiUsage';
const UNLOCK_CODE_STORAGE = 'aiUnlockedCodes';

const TIERS = {
  free:    { name: 'Free',    dailyLimit: 10,    badge: '🌱', color: '#10b981' },
  plus:    { name: 'Plus',    dailyLimit: 100,   badge: '✨', color: '#8b5cf6' },
  pro:     { name: 'Pro',     dailyLimit: 9999,  badge: '🌟', color: '#f59e0b' },  // effectively unlimited
  lifetime:{ name: 'Lifetime',dailyLimit: 9999,  badge: '👑', color: '#ec4899' }
};

// SHA-256 hashed codes (codes themselves not visible)
// To add a new code: hash it via SHA-256, then add the hash here with its tier
// Generator utility: /utils/code-gen.html (gitignored)
const VALID_CODE_HASHES = {
  // PLUS tier codes
  'a8b9c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z7a8b9c0d1e2f3': 'plus',  // placeholder
  // PRO tier codes
  'b9c0d1e2f3g4h5i6j7k8l9m0n1o2p3q4r5s6t7u8v9w0x1y2z3a4b5c6d7e8f9g0': 'pro',  // placeholder
  // LIFETIME tier codes
  'c0d1e2f3g4h5i6j7k8l9m0n1o2p3q4r5s6t7u8v9w0x1y2z3a4b5c6d7e8f9g0h1': 'lifetime'  // placeholder
};

// ====== Helpers ======

async function hashCode(code) {
  const encoder = new TextEncoder();
  const data = encoder.encode(code.trim().toUpperCase());
  const buffer = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(buffer))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

function getCurrentTier() {
  return localStorage.getItem(TIER_STORAGE) || 'free';
}

function setTier(tier) {
  if (!TIERS[tier]) return false;
  localStorage.setItem(TIER_STORAGE, tier);
  return true;
}

function getTierInfo(tier = null) {
  return TIERS[tier || getCurrentTier()] || TIERS.free;
}

// ====== Usage Tracking ======

function getTodayKey() {
  return new Date().toISOString().split('T')[0]; // YYYY-MM-DD
}

function getUsage() {
  const data = JSON.parse(localStorage.getItem(USAGE_STORAGE) || '{}');
  const today = getTodayKey();
  if (data.date !== today) {
    return { date: today, count: 0 };
  }
  return data;
}

function incrementUsage() {
  const usage = getUsage();
  usage.count += 1;
  localStorage.setItem(USAGE_STORAGE, JSON.stringify(usage));
  return usage;
}

function getRemainingQuota() {
  const tier = getTierInfo();
  const usage = getUsage();
  return Math.max(0, tier.dailyLimit - usage.count);
}

function canSendMessage() {
  return getRemainingQuota() > 0;
}

// ====== Code Redemption ======

async function redeemCode(code) {
  if (!code) return { success: false, message: 'Please enter a code' };

  const hash = await hashCode(code);
  const tier = VALID_CODE_HASHES[hash];

  if (!tier) {
    return { success: false, message: 'Invalid code. Please check and try again.' };
  }

  // Check if already redeemed
  const redeemed = JSON.parse(localStorage.getItem(UNLOCK_CODE_STORAGE) || '[]');
  if (redeemed.includes(hash)) {
    return { success: false, message: 'This code has already been used on this device.' };
  }

  redeemed.push(hash);
  localStorage.setItem(UNLOCK_CODE_STORAGE, JSON.stringify(redeemed));
  setTier(tier);

  return {
    success: true,
    tier,
    message: `🎉 Welcome to ${TIERS[tier].name}! ${TIERS[tier].badge}`,
    tierInfo: TIERS[tier]
  };
}

// ====== UI Components ======

function renderUsageBadge(targetSelector = '#usageBadge') {
  const el = document.querySelector(targetSelector);
  if (!el) return;
  const tier = getTierInfo();
  const remaining = getRemainingQuota();
  const used = tier.dailyLimit - remaining;
  const percent = (used / tier.dailyLimit) * 100;

  const isUnlimited = tier.dailyLimit >= 9999;

  el.innerHTML = `
    <div class="usage-badge tier-${getCurrentTier()}" title="Tier: ${tier.name}">
      <span class="tier-icon">${tier.badge}</span>
      <span class="tier-name">${tier.name}</span>
      ${isUnlimited
        ? `<span class="tier-quota">Unlimited</span>`
        : `<span class="tier-quota">${remaining}/${tier.dailyLimit} today</span>`
      }
    </div>
    ${!isUnlimited && remaining <= 3 && remaining > 0 ? `
      <button class="btn btn-gold btn-small" onclick="showUpgradeModal()" style="margin-left:0.5rem;">
        <i data-icon="sparkle" data-size="14"></i>
        <span>Upgrade</span>
      </button>
    ` : ''}
  `;
}

function showUpgradeModal() {
  const existing = document.getElementById('upgradeModal');
  if (existing) existing.remove();

  const modal = document.createElement('div');
  modal.id = 'upgradeModal';
  modal.className = 'upgrade-modal';
  modal.innerHTML = `
    <div class="modal-bg" onclick="closeUpgradeModal()"></div>
    <div class="modal-content upgrade-content">
      <button class="modal-close" onclick="closeUpgradeModal()">✕</button>
      <div style="text-align:center; margin-bottom:1.5rem;">
        <div style="font-size:3rem;">✨</div>
        <h2 style="font-size:1.6rem; font-weight:800; margin:0.5rem 0;">Upgrade Your AI Access</h2>
        <p style="color:var(--text-muted);">Unlock more AI conversations for your spiritual journey</p>
      </div>

      <div class="tier-grid">
        <div class="tier-card tier-plus">
          <div class="tier-card-badge">✨</div>
          <h3>Plus</h3>
          <div class="tier-price">৳149 <span class="tier-period">/ month</span></div>
          <div class="tier-price-usd">or $1.49</div>
          <ul class="tier-features">
            <li>✓ 100 AI questions/day</li>
            <li>✓ Priority response</li>
            <li>✓ Conversation history</li>
            <li>✓ All Islamic features</li>
          </ul>
          <a href="upgrade.html?tier=plus" class="btn btn-outline" style="width:100%; justify-content:center;">
            <span>Get Plus</span>
          </a>
        </div>

        <div class="tier-card tier-pro popular">
          <div class="tier-popular-badge">MOST POPULAR</div>
          <div class="tier-card-badge">🌟</div>
          <h3>Pro</h3>
          <div class="tier-price">৳299 <span class="tier-period">/ month</span></div>
          <div class="tier-price-usd">or $2.99</div>
          <ul class="tier-features">
            <li>✓ <strong>Unlimited</strong> AI questions</li>
            <li>✓ Priority response</li>
            <li>✓ Custom prompts</li>
            <li>✓ Voice input (coming)</li>
            <li>✓ All features included</li>
          </ul>
          <a href="upgrade.html?tier=pro" class="btn btn-gold" style="width:100%; justify-content:center;">
            <span>Get Pro</span>
          </a>
        </div>

        <div class="tier-card tier-lifetime">
          <div class="tier-card-badge">👑</div>
          <h3>Lifetime</h3>
          <div class="tier-price">৳1,999</div>
          <div class="tier-price-usd">or $19.99 once</div>
          <ul class="tier-features">
            <li>✓ Pay once, use forever</li>
            <li>✓ Unlimited AI access</li>
            <li>✓ All future features</li>
            <li>✓ Premium support</li>
            <li>✓ Sadaqah Jariyah ❤</li>
          </ul>
          <a href="upgrade.html?tier=lifetime" class="btn btn-outline" style="width:100%; justify-content:center;">
            <span>Get Lifetime</span>
          </a>
        </div>
      </div>

      <div class="have-code">
        <p style="text-align:center; color:var(--text-muted); margin:1.5rem 0 0.75rem; font-size:0.92rem;">
          Already have an unlock code?
        </p>
        <div style="display:flex; gap:0.5rem; max-width:400px; margin:0 auto;">
          <input type="text" id="codeInput" placeholder="NOOR-XXXX-XXXX-XXXX" style="flex:1; padding:0.75rem 1rem; border:1.5px solid var(--border); border-radius:8px; font-family:monospace; text-transform:uppercase; background:var(--bg); color:var(--text);">
          <button class="btn" onclick="submitCode()" style="white-space:nowrap;">
            <span>Redeem</span>
          </button>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(modal);
  if (window.injectIcons) window.injectIcons();
}

function closeUpgradeModal() {
  document.getElementById('upgradeModal')?.remove();
}

async function submitCode() {
  const input = document.getElementById('codeInput');
  if (!input) return;
  const code = input.value.trim();
  const result = await redeemCode(code);

  if (result.success) {
    if (window.showToast) window.showToast(result.message);
    closeUpgradeModal();
    renderUsageBadge();
    // Show success modal
    setTimeout(() => {
      const success = document.createElement('div');
      success.className = 'upgrade-modal';
      success.innerHTML = `
        <div class="modal-bg" onclick="this.parentElement.remove()"></div>
        <div class="modal-content" style="text-align:center; padding:3rem 2rem;">
          <div style="font-size:5rem;">${result.tierInfo.badge}</div>
          <h2 style="font-size:1.8rem; font-weight:800; margin:1rem 0 0.5rem;">Welcome to ${result.tierInfo.name}!</h2>
          <p style="color:var(--text-muted); margin-bottom:2rem;">
            ${result.tierInfo.dailyLimit >= 9999
              ? 'You now have <strong>unlimited</strong> AI conversations!'
              : `You can now ask <strong>${result.tierInfo.dailyLimit} questions per day</strong>`
            }
          </p>
          <button class="btn btn-gold" onclick="this.parentElement.parentElement.remove()">
            <span>Start Using</span>
          </button>
        </div>
      `;
      document.body.appendChild(success);
    }, 300);
  } else {
    if (window.showToast) window.showToast(result.message);
    input.style.borderColor = '#ef4444';
    setTimeout(() => { input.style.borderColor = ''; }, 2000);
  }
}

// Expose globally
window.getCurrentTier = getCurrentTier;
window.setTier = setTier;
window.getTierInfo = getTierInfo;
window.getUsage = getUsage;
window.incrementUsage = incrementUsage;
window.getRemainingQuota = getRemainingQuota;
window.canSendMessage = canSendMessage;
window.redeemCode = redeemCode;
window.renderUsageBadge = renderUsageBadge;
window.showUpgradeModal = showUpgradeModal;
window.closeUpgradeModal = closeUpgradeModal;
window.submitCode = submitCode;
window.hashCode = hashCode;
