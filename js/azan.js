// ====== Azan Player System ======
// Plays azan at prayer times + shows post-azan dua

let azanAudio = null;
let nextPrayerCheckInterval = null;
let lastPrayerNotified = null;

const AZAN_ENABLED_KEY = 'azanEnabled';
const AZAN_VOLUME_KEY = 'azanVolume';

function isAzanEnabled() {
  return localStorage.getItem(AZAN_ENABLED_KEY) !== 'false';
}

function setAzanEnabled(enabled) {
  localStorage.setItem(AZAN_ENABLED_KEY, enabled ? 'true' : 'false');
}

function getAzanVolume() {
  return parseFloat(localStorage.getItem(AZAN_VOLUME_KEY) || '0.7');
}

function setAzanVolume(vol) {
  localStorage.setItem(AZAN_VOLUME_KEY, vol);
  if (azanAudio) azanAudio.volume = vol;
}

// Play azan for a given prayer
function playAzan(prayerName, isFajr = false) {
  if (!isAzanEnabled()) return;
  if (azanAudio) {
    azanAudio.pause();
    azanAudio = null;
  }

  const audioUrl = isFajr || prayerName === 'Fajr' ? fajrAzanUrl : azanAudioUrls[0];
  azanAudio = new Audio(audioUrl);
  azanAudio.volume = getAzanVolume();
  azanAudio.crossOrigin = "anonymous";

  azanAudio.play().catch(err => {
    console.log('Azan autoplay blocked. User interaction required.', err);
  });

  showAzanModal(prayerName);

  azanAudio.addEventListener('ended', () => {
    showPostAzanDua();
  });
}

function stopAzan() {
  if (azanAudio) {
    azanAudio.pause();
    azanAudio.currentTime = 0;
  }
  closeAzanModal();
}

function showAzanModal(prayerName) {
  // Remove existing
  const existing = document.getElementById('azanModal');
  if (existing) existing.remove();

  const modal = document.createElement('div');
  modal.id = 'azanModal';
  modal.className = 'azan-modal';
  modal.innerHTML = `
    <div class="azan-modal-bg" onclick="stopAzan()"></div>
    <div class="azan-modal-content">
      <div class="azan-pulse"></div>
      <div style="position:relative; z-index:2;">
        <div style="display:flex; align-items:center; justify-content:center; gap:0.5rem; margin-bottom:0.5rem; opacity:0.9; font-size:0.85rem; font-weight:700; text-transform:uppercase; letter-spacing:0.15em;">
          <i data-icon="mosque" data-size="16"></i>
          <span>Time for ${prayerName}</span>
        </div>
        <div class="azan-arabic">حَيَّ عَلَى الصَّلَاةِ</div>
        <div class="azan-trans">Hayya 'alas-Salah</div>
        <div class="azan-meaning">Come to Prayer</div>
        <button class="btn btn-gold" onclick="stopAzan()" style="margin-top:2rem;">
          <i data-icon="check" data-size="16"></i>
          <span>Acknowledged</span>
        </button>
      </div>
    </div>
  `;
  document.body.appendChild(modal);
  if (window.injectIcons) window.injectIcons();
}

function closeAzanModal() {
  const modal = document.getElementById('azanModal');
  if (modal) modal.remove();
}

function showPostAzanDua() {
  closeAzanModal();
  const modal = document.createElement('div');
  modal.id = 'azanModal';
  modal.className = 'azan-modal';
  modal.innerHTML = `
    <div class="azan-modal-bg" onclick="this.parentElement.remove()"></div>
    <div class="azan-modal-content" style="background:var(--gradient-emerald);">
      <div style="position:relative; z-index:2;">
        <div style="display:flex; align-items:center; justify-content:center; gap:0.5rem; margin-bottom:1rem; opacity:0.9; font-size:0.85rem; font-weight:700; text-transform:uppercase; letter-spacing:0.15em;">
          <i data-icon="hands" data-size="16"></i>
          <span>${postAzanDua.title}</span>
        </div>
        <div class="azan-arabic" style="font-size:1.5rem; line-height:2.2;">${postAzanDua.arabic}</div>
        <div class="azan-meaning" style="font-style:italic; padding-left:1rem; border-left:3px solid var(--gold-light); text-align:left;">"${postAzanDua.translation}"</div>
        <div style="margin-top:1rem; padding-top:1rem; border-top:1px solid rgba(255,255,255,0.2); font-size:0.85rem; opacity:0.9;">
          ${postAzanDua.reference}
        </div>
        <button class="btn btn-gold" onclick="this.parentElement.parentElement.parentElement.remove()" style="margin-top:1.5rem;">
          <i data-icon="check" data-size="16"></i>
          <span>Ameen</span>
        </button>
      </div>
    </div>
  `;
  document.body.appendChild(modal);
  if (window.injectIcons) window.injectIcons();
}

// Check every 30 seconds if a prayer time has been reached
function startPrayerWatcher() {
  if (nextPrayerCheckInterval) clearInterval(nextPrayerCheckInterval);

  async function checkPrayerTime() {
    if (!isAzanEnabled()) return;

    const pos = await getStoredOrCurrentLocation();
    if (!pos) return;

    try {
      const res = await fetch(`https://api.aladhan.com/v1/timings?latitude=${pos.lat}&longitude=${pos.lng}&method=2`);
      const data = await res.json();
      const t = data.data.timings;

      const prayers = [
        { name: 'Fajr', time: t.Fajr },
        { name: 'Dhuhr', time: t.Dhuhr },
        { name: 'Asr', time: t.Asr },
        { name: 'Maghrib', time: t.Maghrib },
        { name: 'Isha', time: t.Isha }
      ];

      const now = new Date();
      const currentMinutes = now.getHours() * 60 + now.getMinutes();
      const today = now.toDateString();

      for (const p of prayers) {
        const [h, m] = p.time.split(':').map(Number);
        const prayerMins = h * 60 + m;
        const diff = currentMinutes - prayerMins;
        const notificationKey = `${today}-${p.name}`;

        // Trigger if within 1 minute of prayer time and not already notified
        if (diff >= 0 && diff <= 1 && lastPrayerNotified !== notificationKey) {
          lastPrayerNotified = notificationKey;
          playAzan(p.name);
          break;
        }
      }
    } catch (e) {
      console.log('Prayer check failed:', e);
    }
  }

  // Check immediately and then every 30 seconds
  checkPrayerTime();
  nextPrayerCheckInterval = setInterval(checkPrayerTime, 30000);
}

function getStoredOrCurrentLocation() {
  return new Promise((resolve) => {
    const stored = localStorage.getItem('userLocation');
    if (stored) {
      try {
        const p = JSON.parse(stored);
        if (p.lat && p.lng) return resolve(p);
      } catch {}
    }
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const loc = { lat: pos.coords.latitude, lng: pos.coords.longitude };
          localStorage.setItem('userLocation', JSON.stringify(loc));
          resolve(loc);
        },
        () => resolve({ lat: 23.8103, lng: 90.4125 }),
        { timeout: 5000 }
      );
    } else {
      resolve({ lat: 23.8103, lng: 90.4125 });
    }
  });
}

// Test azan (for settings button)
function testAzan() {
  playAzan('Test');
}

// Initialize azan settings UI
function initAzanSettings() {
  const toggle = document.getElementById('azanToggle');
  const volumeSlider = document.getElementById('azanVolume');
  const testBtn = document.getElementById('testAzanBtn');

  if (toggle) {
    toggle.checked = isAzanEnabled();
    toggle.addEventListener('change', (e) => {
      setAzanEnabled(e.target.checked);
      if (e.target.checked && window.showToast) window.showToast('Azan notifications enabled');
      else if (window.showToast) window.showToast('Azan notifications disabled');
    });
  }

  if (volumeSlider) {
    volumeSlider.value = getAzanVolume();
    volumeSlider.addEventListener('input', (e) => {
      setAzanVolume(parseFloat(e.target.value));
    });
  }

  if (testBtn) {
    testBtn.addEventListener('click', testAzan);
  }
}

// Auto-start watcher on page load
document.addEventListener('DOMContentLoaded', () => {
  startPrayerWatcher();
  initAzanSettings();
});

window.playAzan = playAzan;
window.stopAzan = stopAzan;
window.testAzan = testAzan;
