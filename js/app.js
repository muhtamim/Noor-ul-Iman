// ====== Noor-ul-Iman v2 - Main App JS ======

// Register service worker for PWA — always use root path so scope = /
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    const isPagesDir = window.location.pathname.includes('/pages/');
    const swPath = isPagesDir ? '../sw.js' : 'sw.js';
    const scope = isPagesDir ? '../' : '/';
    navigator.serviceWorker.register(swPath, { scope }).catch(err => console.log('SW registration failed:', err));
  });
}


// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', savedTheme);

function updateThemeIcon(theme) {
  if (!themeToggle || !window.Icons) return;
  const iconName = theme === 'dark' ? 'sun' : 'moon';
  themeToggle.innerHTML = window.Icons[iconName].replace('<svg', '<svg width="20" height="20" class="icon"');
}

if (themeToggle) {
  // Wait for Icons to load
  setTimeout(() => updateThemeIcon(savedTheme), 0);

  themeToggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    updateThemeIcon(next);
  });
}

// Mobile menu toggle
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('show');
  });
}

// ====== Hijri Date Display ======
async function loadHijriDate(elementId) {
  const el = document.getElementById(elementId);
  if (!el) return;
  try {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    const res = await fetch(`https://api.aladhan.com/v1/gToH/${dd}-${mm}-${yyyy}`);
    const data = await res.json();
    const h = data.data.hijri;
    el.innerHTML = `
      <div style="display:flex; align-items:center; justify-content:center; gap:0.5rem; margin-bottom:0.5rem;">
        <i data-icon="calendar" data-size="16" style="color:var(--gold);"></i>
        <span style="font-size:0.75rem; font-weight:700; text-transform:uppercase; letter-spacing:0.1em; color:var(--text-muted);">Hijri Date</span>
      </div>
      <div class="hijri-arabic">${h.day} ${h.month.ar} ${h.year}</div>
      <div class="hijri-date">${h.day} ${h.month.en} ${h.year} AH</div>
      <div class="gregorian-date">${today.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</div>
    `;
    if (window.injectIcons) window.injectIcons();
  } catch (e) {
    el.innerHTML = `<div class="gregorian-date">${new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</div>`;
  }
}

// ====== Calculate countdown to next prayer ======
function getCountdown(prayerTime) {
  const now = new Date();
  const [h, m] = prayerTime.split(':').map(Number);
  const target = new Date();
  target.setHours(h, m, 0, 0);
  if (target < now) target.setDate(target.getDate() + 1);
  const diff = target - now;
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  return `in ${hours}h ${mins}m`;
}

// ====== Prayer Times Widget ======
async function loadPrayerTimes(containerId, locationId, nextPrayerId) {
  const container = document.getElementById(containerId);
  const locationEl = document.getElementById(locationId);
  const nextPrayerEl = document.getElementById(nextPrayerId);
  if (!container) return;

  container.innerHTML = '<div class="spinner"></div>';

  const showTimes = async (lat, lng, locName) => {
    try {
      const res = await fetch(`https://api.aladhan.com/v1/timings?latitude=${lat}&longitude=${lng}&method=2`);
      const data = await res.json();
      const t = data.data.timings;
      const meta = data.data.meta;

      const prayers = [
        { name: 'Fajr', time: t.Fajr, icon: 'sunrise' },
        { name: 'Sunrise', time: t.Sunrise, icon: 'sunHigh' },
        { name: 'Dhuhr', time: t.Dhuhr, icon: 'sunHigh' },
        { name: 'Asr', time: t.Asr, icon: 'sunset' },
        { name: 'Maghrib', time: t.Maghrib, icon: 'sunset' },
        { name: 'Isha', time: t.Isha, icon: 'moonStar' }
      ];

      const now = new Date();
      const currentMinutes = now.getHours() * 60 + now.getMinutes();
      let nextIdx = -1;
      for (let i = 0; i < prayers.length; i++) {
        const [h, m] = prayers[i].time.split(':').map(Number);
        if (h * 60 + m > currentMinutes) { nextIdx = i; break; }
      }
      if (nextIdx === -1) nextIdx = 0;

      container.innerHTML = prayers.map((p, i) => {
        const [h, m] = p.time.split(':').map(Number);
        const passed = h * 60 + m < currentMinutes && i !== nextIdx;
        return `
        <div class="prayer-time-card ${i === nextIdx ? 'active' : ''} ${passed ? 'passed' : ''}">
          <div class="prayer-icon"><i data-icon="${p.icon}" data-size="22"></i></div>
          <div class="prayer-name">${p.name}</div>
          <div class="prayer-time">${formatTime(p.time)}</div>
        </div>
      `;
      }).join('');

      if (locationEl) {
        locationEl.innerHTML = `<i data-icon="mapPin" data-size="14"></i><span>${locName || meta.timezone}</span>`;
      }

      if (nextPrayerEl) {
        const next = prayers[nextIdx];
        nextPrayerEl.innerHTML = `
          <div>
            <div class="next-prayer-label">Next Prayer</div>
            <div class="next-prayer-name" style="display:flex; align-items:center; gap:0.5rem;">
              <i data-icon="${next.icon}" data-size="22"></i>
              <span>${next.name}</span>
            </div>
            <div class="next-prayer-countdown">${getCountdown(next.time)}</div>
          </div>
          <div class="next-prayer-time">${formatTime(next.time)}</div>
        `;
      }

      if (window.injectIcons) window.injectIcons();
    } catch (e) {
      container.innerHTML = '<p class="text-center" style="color:var(--text-muted); padding:1rem;">Unable to load prayer times.</p>';
    }
  };

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        try {
          const geo = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`);
          const gd = await geo.json();
          const city = gd.address.city || gd.address.town || gd.address.state || 'Your Location';
          const country = gd.address.country || '';
          showTimes(lat, lng, `${city}, ${country}`);
        } catch {
          showTimes(lat, lng, 'Your Location');
        }
      },
      () => {
        showTimes(23.8103, 90.4125, 'Dhaka, Bangladesh');
      },
      { timeout: 5000 }
    );
  } else {
    showTimes(23.8103, 90.4125, 'Dhaka, Bangladesh');
  }
}

function formatTime(time24) {
  const [h, m] = time24.split(':').map(Number);
  const period = h >= 12 ? 'PM' : 'AM';
  const h12 = h % 12 || 12;
  return `${h12}:${String(m).padStart(2, '0')} ${period}`;
}

// ====== Live Clock ======
function startClock(elementId) {
  const el = document.getElementById(elementId);
  if (!el) return;
  const update = () => {
    const n = new Date();
    el.textContent = n.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
  };
  update();
  setInterval(update, 1000);
}

// ====== Daily Verse Display ======
function loadDailyContent() {
  if (typeof getDailyContent !== 'function') return;
  const { verse, hadith, quote } = getDailyContent();

  const verseEl = document.getElementById('dailyVerse');
  if (verseEl) {
    verseEl.innerHTML = `
      <div class="daily-verse-label">
        <i data-icon="sparkle" data-size="14"></i>
        <span>Verse of the Day</span>
      </div>
      <div class="daily-verse-arabic">${verse.arabic}</div>
      <div class="daily-verse-translation">"${verse.translation}"</div>
      <div class="daily-verse-ref">— ${verse.reference}</div>
    `;
  }

  const hadithEl = document.getElementById('dailyHadith');
  if (hadithEl) {
    hadithEl.innerHTML = `
      <div class="hadith-text">"${hadith.text}"</div>
      <div class="hadith-source">${hadith.source}</div>
    `;
  }

  if (window.injectIcons) window.injectIcons();
}

// ====== Prayer Streak Tracker (localStorage) ======
function initStreakTracker() {
  const streakEl = document.getElementById('streakNumber');
  const daysEl = document.getElementById('streakDays');
  if (!streakEl || !daysEl) return;

  const today = new Date().toDateString();
  let streak = JSON.parse(localStorage.getItem('prayerStreak') || '{"count":0, "lastDate":null, "days":[]}');

  // Check if today is already counted
  const last = streak.lastDate ? new Date(streak.lastDate).toDateString() : null;
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  // Reset if missed a day
  if (last && last !== today && last !== yesterday.toDateString()) {
    streak = { count: 0, lastDate: null, days: [] };
  }

  streakEl.textContent = streak.count;

  // Render last 7 days
  const dayNames = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const todayDay = new Date().getDay();
  daysEl.innerHTML = '';
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const dStr = d.toDateString();
    const completed = streak.days.includes(dStr);
    const isToday = dStr === today;
    const cls = isToday ? 'today' : (completed ? 'completed' : '');
    daysEl.innerHTML += `<div class="streak-day ${cls}">${dayNames[d.getDay()]}</div>`;
  }
}

function markPrayerDone() {
  const today = new Date().toDateString();
  let streak = JSON.parse(localStorage.getItem('prayerStreak') || '{"count":0, "lastDate":null, "days":[]}');

  if (streak.lastDate !== today) {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    if (streak.lastDate === yesterday.toDateString() || streak.count === 0) {
      streak.count += 1;
    } else {
      streak.count = 1;
    }
    streak.lastDate = today;
    streak.days = streak.days.slice(-6);
    streak.days.push(today);
    localStorage.setItem('prayerStreak', JSON.stringify(streak));
    initStreakTracker();
    showToast('Prayer marked! Streak: ' + streak.count + ' days');
  } else {
    showToast('Already marked today');
  }
}

// ====== Toast Notifications ======
function showToast(message) {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  toast.style.cssText = `
    position: fixed; bottom: 2rem; left: 50%; transform: translateX(-50%);
    background: var(--gradient-emerald); color: white; padding: 1rem 2rem;
    border-radius: 999px; font-weight: 600; box-shadow: var(--shadow-lg);
    z-index: 9999; animation: fadeInUp 0.3s ease;
  `;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}

// ====== Mood Selector ======
function initMoodSelector() {
  const moodGrid = document.getElementById('moodGrid');
  const moodResult = document.getElementById('moodResult');
  if (!moodGrid) return;

  const moods = [
    { key: 'anxious', icon: 'moodAnxious', label: 'Anxious', color: '#8b5cf6' },
    { key: 'grateful', icon: 'moodGrateful', label: 'Grateful', color: '#10b981' },
    { key: 'hopeful', icon: 'moodHopeful', label: 'Hopeful', color: '#f59e0b' },
    { key: 'guidance', icon: 'moodGuidance', label: 'Need Guidance', color: '#0ea5e9' },
    { key: 'forgiveness', icon: 'moodForgiveness', label: 'Forgiveness', color: '#a78bfa' },
    { key: 'protection', icon: 'moodProtection', label: 'Protection', color: '#059669' },
    { key: 'difficulty', icon: 'moodDifficulty', label: 'In Difficulty', color: '#64748b' },
    { key: 'happy', icon: 'moodHappy', label: 'Happy', color: '#f97316' }
  ];

  moodGrid.innerHTML = moods.map(m => `
    <div class="mood-chip" onclick="selectMood('${m.key}', this)" data-color="${m.color}">
      <div class="mood-emoji" style="color:${m.color};"><i data-icon="${m.icon}" data-size="32"></i></div>
      <div class="mood-label">${m.label}</div>
    </div>
  `).join('');

  if (window.injectIcons) window.injectIcons();
}

function selectMood(key, el) {
  document.querySelectorAll('.mood-chip').forEach(c => c.classList.remove('selected'));
  el.classList.add('selected');

  const dua = moodDuas[key];
  if (!dua) return;

  const result = document.getElementById('moodResult');
  if (result) {
    result.innerHTML = `
      <div style="background:var(--gradient-emerald); color:white; padding:1.75rem; border-radius:var(--radius); margin-top:1.5rem; box-shadow: var(--shadow-md);">
        <div style="display:flex; align-items:center; gap:0.5rem; font-size:0.85rem; opacity:0.9; text-transform:uppercase; letter-spacing:0.1em; margin-bottom:1rem; font-weight:700;">
          <i data-icon="hands" data-size="16"></i>
          <span>${dua.title}</span>
        </div>
        <div class="arabic" style="font-size:1.6rem; text-align:right; margin-bottom:1rem; color:white;">${dua.arabic}</div>
        <div style="font-style:italic; opacity:0.95; line-height:1.7; padding-left:1rem; border-left:3px solid var(--gold-light);">"${dua.translation}"</div>
        <div style="font-size:0.85rem; color:var(--gold-light); margin-top:1rem; font-weight:600;">— ${dua.reference}</div>
      </div>
    `;
    if (window.injectIcons) window.injectIcons();
    result.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
}

// ====== Initialize ======
document.addEventListener('DOMContentLoaded', () => {
  loadHijriDate('hijriDate');
  loadPrayerTimes('prayerTimes', 'prayerLocation', 'nextPrayer');
  startClock('liveClock');
  loadDailyContent();
  initStreakTracker();
  initMoodSelector();
});
