// ====== Ramadan Calendar Logic (v2 — Robust) ======
// Always shows Sehri & Iftar for entire Ramadan month (29 or 30 days)

let ramadanData = [];
let currentLocation = { lat: 23.8103, lng: 90.4125, name: 'Dhaka, Bangladesh' };
let displayYear = null;

async function getNextRamadanYear() {
  try {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    const res = await fetch(`https://api.aladhan.com/v1/gToH/${dd}-${mm}-${yyyy}`);
    const data = await res.json();
    const hijriYear = parseInt(data.data.hijri.year);
    const hijriMonth = parseInt(data.data.hijri.month.number);
    // If currently in Ramadan or before it (months 1-9) → this year's Ramadan
    // If after Ramadan (months 10-12) → next year's Ramadan
    return hijriMonth > 9 ? hijriYear + 1 : hijriYear;
  } catch (e) {
    // Sensible default: next year's Ramadan
    return 1448;
  }
}

async function loadRamadanCalendar() {
  const tableEl = document.getElementById('ramadanTable');
  const statusEl = document.getElementById('ramadanStatus');
  if (!tableEl) return;

  tableEl.innerHTML = '<div class="spinner"></div>';

  try {
    displayYear = await getNextRamadanYear();
    if (statusEl) {
      statusEl.innerHTML = `<i data-icon="mapPin" data-size="14"></i> Loading Ramadan ${displayYear} AH calendar...`;
      if (window.injectIcons) window.injectIcons();
    }

    // Use lat/lng — most reliable method (works globally)
    const url = `https://api.aladhan.com/v1/hijriCalendar?latitude=${currentLocation.lat}&longitude=${currentLocation.lng}&method=2&month=9&year=${displayYear}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`API returned ${res.status}`);
    const data = await res.json();

    if (!data?.data || !Array.isArray(data.data) || data.data.length === 0) {
      throw new Error('No data returned');
    }

    ramadanData = data.data;
    renderRamadanTable();
    renderRamadanStats();

    if (statusEl) {
      const gregYear = ramadanData[0]?.date?.gregorian?.year || '';
      statusEl.innerHTML = `<i data-icon="mapPin" data-size="14"></i> Ramadan ${displayYear} AH ${gregYear ? '(' + gregYear + ')' : ''} • ${currentLocation.name}`;
      if (window.injectIcons) window.injectIcons();
    }

  } catch (e) {
    console.error('Ramadan calendar error:', e);
    tableEl.innerHTML = `<div style="text-align:center; padding:3rem 1rem; color:var(--text-muted);">
      <p style="font-weight:600; color:var(--text); margin-bottom:0.5rem;">Unable to load Ramadan calendar</p>
      <p style="font-size:0.9rem;">Please check your internet connection and try again.</p>
      <button class="btn btn-outline btn-small" onclick="loadRamadanCalendar()" style="margin-top:1rem;">Retry</button>
    </div>`;
  }
}

function renderRamadanStats() {
  const statsEl = document.getElementById('ramadanStats');
  if (!statsEl || ramadanData.length === 0) return;

  const totalDays = ramadanData.length;
  const startDate = ramadanData[0].date.gregorian.date;
  const endDate = ramadanData[ramadanData.length - 1].date.gregorian.date;
  const today = new Date().toDateString();

  // Calculate avg fasting hours
  let totalMinutes = 0;
  ramadanData.forEach(day => {
    const sehri = (day.timings.Imsak || day.timings.Fajr).split(' ')[0];
    const iftar = day.timings.Maghrib.split(' ')[0];
    const [sH, sM] = sehri.split(':').map(Number);
    const [iH, iM] = iftar.split(':').map(Number);
    totalMinutes += (iH * 60 + iM) - (sH * 60 + sM);
  });
  const avgMin = Math.round(totalMinutes / totalDays);
  const avgH = Math.floor(avgMin / 60);
  const avgM = avgMin % 60;

  // Day count remaining (if Ramadan in future)
  const firstGreg = new Date(startDate.split('-').reverse().join('-'));
  const daysUntil = Math.ceil((firstGreg - new Date()) / (1000 * 60 * 60 * 24));
  const isInRamadan = daysUntil <= 0 && daysUntil >= -totalDays;

  statsEl.innerHTML = `
    <div class="bento-card" style="text-align:center; padding:1.25rem 0.75rem;">
      <div style="font-size:1.8rem; font-weight:800; color:var(--primary); line-height:1;">${totalDays}</div>
      <div style="font-size:0.78rem; color:var(--text-muted); font-weight:700; text-transform:uppercase; letter-spacing:0.05em; margin-top:0.4rem;">Total Days</div>
    </div>
    <div class="bento-card" style="text-align:center; padding:1.25rem 0.75rem;">
      <div style="font-size:1.2rem; font-weight:800; color:#6366f1; line-height:1.3;">${formatShortDate(startDate)}</div>
      <div style="font-size:0.78rem; color:var(--text-muted); font-weight:700; text-transform:uppercase; letter-spacing:0.05em; margin-top:0.4rem;">Starts</div>
    </div>
    <div class="bento-card" style="text-align:center; padding:1.25rem 0.75rem;">
      <div style="font-size:1.2rem; font-weight:800; color:var(--gold-dark); line-height:1.3;">${formatShortDate(endDate)}</div>
      <div style="font-size:0.78rem; color:var(--text-muted); font-weight:700; text-transform:uppercase; letter-spacing:0.05em; margin-top:0.4rem;">Ends (Eid Eve)</div>
    </div>
    <div class="bento-card" style="text-align:center; padding:1.25rem 0.75rem;">
      <div style="font-size:1.8rem; font-weight:800; color:#ec4899; line-height:1;">${avgH}h ${avgM}m</div>
      <div style="font-size:0.78rem; color:var(--text-muted); font-weight:700; text-transform:uppercase; letter-spacing:0.05em; margin-top:0.4rem;">Avg Fasting</div>
    </div>
    ${daysUntil > 0 ? `
      <div class="bento-card" style="text-align:center; padding:1.25rem 0.75rem; background:linear-gradient(135deg, #fef3c7, #fbbf24); color:var(--navy); border:none; grid-column:span 2;">
        <div style="font-size:1.8rem; font-weight:800; line-height:1;">${daysUntil} days</div>
        <div style="font-size:0.78rem; font-weight:700; text-transform:uppercase; letter-spacing:0.05em; margin-top:0.4rem;">Until Ramadan ${displayYear}</div>
      </div>
    ` : isInRamadan ? `
      <div class="bento-card" style="text-align:center; padding:1.25rem 0.75rem; background:var(--gradient-emerald); color:white; border:none; grid-column:span 2;">
        <div style="font-size:1.8rem; font-weight:800; line-height:1;">Day ${-daysUntil + 1}</div>
        <div style="font-size:0.78rem; font-weight:700; text-transform:uppercase; letter-spacing:0.05em; margin-top:0.4rem;">of Ramadan • Ramadan Mubarak 🌙</div>
      </div>
    ` : ''}
  `;
}

function formatShortDate(d) {
  // d is DD-MM-YYYY
  const [day, month, year] = d.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function renderRamadanTable() {
  const tableEl = document.getElementById('ramadanTable');
  if (!tableEl || ramadanData.length === 0) return;

  const today = new Date().toDateString();

  let html = `
    <div class="ramadan-grid-wrapper">
      <div class="ramadan-grid">
  `;

  ramadanData.forEach((day, idx) => {
    const greg = day.date.gregorian;
    const hij = day.date.hijri;
    const timings = day.timings;
    const sehri = (timings.Imsak || timings.Fajr).split(' ')[0];
    const iftar = timings.Maghrib.split(' ')[0];
    const fajr = timings.Fajr.split(' ')[0];
    const isha = timings.Isha.split(' ')[0];

    const gregDate = new Date(greg.date.split('-').reverse().join('-'));
    const isToday = gregDate.toDateString() === today;
    const isPast = gregDate < new Date(today);

    const [sH, sM] = sehri.split(':').map(Number);
    const [iH, iM] = iftar.split(':').map(Number);
    const lengthMin = (iH * 60 + iM) - (sH * 60 + sM);
    const lengthH = Math.floor(lengthMin / 60);
    const lengthMins = lengthMin % 60;

    html += `
      <div class="ramadan-day-card ${isToday ? 'today' : ''} ${isPast ? 'past' : ''}">
        <div class="ramadan-day-header">
          <div class="ramadan-day-number">${idx + 1}</div>
          <div>
            <div class="ramadan-day-greg">${greg.weekday.en.substring(0, 3)} • ${greg.day} ${greg.month.en.substring(0, 3)}</div>
            <div class="ramadan-day-hijri">${hij.day} Ramaḍān ${hij.year}</div>
          </div>
        </div>
        <div class="ramadan-times">
          <div class="ramadan-time-row sehri-row">
            <div class="ramadan-time-label">
              <i data-icon="moonStar" data-size="14"></i>
              <span>Sehri</span>
            </div>
            <div class="ramadan-time-value">${formatTime12(sehri)}</div>
          </div>
          <div class="ramadan-time-row iftar-row">
            <div class="ramadan-time-label">
              <i data-icon="sunset" data-size="14"></i>
              <span>Iftar</span>
            </div>
            <div class="ramadan-time-value">${formatTime12(iftar)}</div>
          </div>
          <div class="ramadan-time-row duration-row">
            <div class="ramadan-time-label">
              <i data-icon="clock" data-size="14"></i>
              <span>Fasting</span>
            </div>
            <div class="ramadan-time-value duration">${lengthH}h ${lengthMins}m</div>
          </div>
        </div>
      </div>
    `;
  });

  html += `</div></div>`;

  // Also add a toggle for compact table view
  html += `
    <div style="margin-top:1.5rem; text-align:center;">
      <button class="btn btn-outline btn-small" onclick="toggleViewMode()">
        <i data-icon="palette" data-size="14"></i>
        <span id="viewModeLabel">Switch to Table View</span>
      </button>
    </div>
    <div id="tableView" style="display:none; margin-top:1.5rem; overflow-x:auto;">
      ${renderTableView()}
    </div>
  `;

  tableEl.innerHTML = html;
  if (window.injectIcons) window.injectIcons();

  // Auto-scroll to today if in Ramadan
  setTimeout(() => {
    const todayEl = tableEl.querySelector('.ramadan-day-card.today');
    if (todayEl) todayEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, 300);
}

function renderTableView() {
  if (ramadanData.length === 0) return '';
  let html = `
    <table class="ramadan-table">
      <thead>
        <tr>
          <th>Day</th>
          <th>Date</th>
          <th>Sehri</th>
          <th>Iftar</th>
          <th>Length</th>
        </tr>
      </thead>
      <tbody>
  `;
  const today = new Date().toDateString();
  ramadanData.forEach((day, idx) => {
    const greg = day.date.gregorian;
    const sehri = (day.timings.Imsak || day.timings.Fajr).split(' ')[0];
    const iftar = day.timings.Maghrib.split(' ')[0];
    const gregDate = new Date(greg.date.split('-').reverse().join('-'));
    const isToday = gregDate.toDateString() === today;
    const [sH, sM] = sehri.split(':').map(Number);
    const [iH, iM] = iftar.split(':').map(Number);
    const lengthMin = (iH * 60 + iM) - (sH * 60 + sM);
    html += `
      <tr class="${isToday ? 'today-row' : ''}">
        <td><div class="day-circle ${isToday ? 'active' : ''}">${idx + 1}</div></td>
        <td><strong>${greg.day} ${greg.month.en}</strong><br><small style="color:var(--text-muted);">${greg.weekday.en}</small></td>
        <td class="sehri-time">${formatTime12(sehri)}</td>
        <td class="iftar-time">${formatTime12(iftar)}</td>
        <td><small style="color:var(--text-muted);">${Math.floor(lengthMin / 60)}h ${lengthMin % 60}m</small></td>
      </tr>
    `;
  });
  html += `</tbody></table>`;
  return html;
}

function toggleViewMode() {
  const tableView = document.getElementById('tableView');
  const grid = document.querySelector('.ramadan-grid-wrapper');
  const label = document.getElementById('viewModeLabel');
  if (!tableView || !grid || !label) return;
  if (tableView.style.display === 'none') {
    tableView.style.display = 'block';
    grid.style.display = 'none';
    label.textContent = 'Switch to Card View';
  } else {
    tableView.style.display = 'none';
    grid.style.display = 'block';
    label.textContent = 'Switch to Table View';
  }
}

function formatTime12(time24) {
  const [h, m] = time24.split(':').map(Number);
  const period = h >= 12 ? 'PM' : 'AM';
  const h12 = h % 12 || 12;
  return `${h12}:${String(m).padStart(2, '0')} ${period}`;
}

async function setLocation() {
  if (!navigator.geolocation) {
    loadRamadanCalendar();
    return;
  }
  navigator.geolocation.getCurrentPosition(
    async (pos) => {
      currentLocation.lat = pos.coords.latitude;
      currentLocation.lng = pos.coords.longitude;
      try {
        const geo = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&format=json`);
        const gd = await geo.json();
        currentLocation.city = gd.address.city || gd.address.town || gd.address.state || 'Your Location';
        currentLocation.country = gd.address.country || '';
        currentLocation.name = `${currentLocation.city}, ${currentLocation.country}`;
      } catch {
        currentLocation.name = 'Your Location';
      }
      loadRamadanCalendar();
    },
    () => { loadRamadanCalendar(); },
    { timeout: 5000 }
  );
}

window.loadRamadanCalendar = loadRamadanCalendar;
window.toggleViewMode = toggleViewMode;

document.addEventListener('DOMContentLoaded', () => {
  setLocation();
});
