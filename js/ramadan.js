// ====== Ramadan Calendar Logic ======
// Fetches Sehri (Imsak) & Iftar times for the whole Ramadan month

let ramadanData = [];
let currentLocation = { lat: 23.8103, lng: 90.4125, name: 'Dhaka, Bangladesh' };

async function getRamadanYear() {
  // Get current Hijri year & check if we're in/near Ramadan
  try {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    const res = await fetch(`https://api.aladhan.com/v1/gToH/${dd}-${mm}-${yyyy}`);
    const data = await res.json();
    const hijriYear = parseInt(data.data.hijri.year);
    const hijriMonth = parseInt(data.data.hijri.month.number);
    // If we're past Ramadan (month 9), show next year's Ramadan
    return hijriMonth > 9 ? hijriYear + 1 : hijriYear;
  } catch (e) {
    return 1447; // Default Hijri year for 2026
  }
}

async function loadRamadanCalendar() {
  const tableEl = document.getElementById('ramadanTable');
  const statusEl = document.getElementById('ramadanStatus');
  if (!tableEl) return;

  tableEl.innerHTML = '<div class="spinner"></div>';

  try {
    const hijriYear = await getRamadanYear();
    if (statusEl) statusEl.textContent = `Loading Ramadan ${hijriYear} AH calendar...`;

    const res = await fetch(`https://api.aladhan.com/v1/hijriCalendarByCity?city=${encodeURIComponent(currentLocation.city || 'Dhaka')}&country=${encodeURIComponent(currentLocation.country || 'Bangladesh')}&method=2&month=9&year=${hijriYear}`);

    let data;
    try {
      data = await res.json();
    } catch {
      throw new Error('Invalid response');
    }

    if (!data || !data.data || !Array.isArray(data.data)) {
      // Fallback: use lat/lng method
      const res2 = await fetch(`https://api.aladhan.com/v1/hijriCalendar?latitude=${currentLocation.lat}&longitude=${currentLocation.lng}&method=2&month=9&year=${hijriYear}`);
      data = await res2.json();
    }

    ramadanData = data.data || [];

    if (ramadanData.length === 0) {
      tableEl.innerHTML = `<div style="text-align:center; padding:3rem 1rem; color:var(--text-muted);">
        <p>Ramadan ${hijriYear} AH calendar not yet available.</p>
        <p style="margin-top:0.5rem; font-size:0.9rem;">Calendar will load once data becomes available from the API.</p>
      </div>`;
      return;
    }

    renderRamadanTable();
    if (statusEl) statusEl.innerHTML = `<i data-icon="mapPin" data-size="14"></i> Ramadan ${hijriYear} AH • ${currentLocation.name}`;
    if (window.injectIcons) window.injectIcons();

  } catch (e) {
    console.error(e);
    tableEl.innerHTML = `<div style="text-align:center; padding:3rem 1rem; color:var(--text-muted);">
      <p>Unable to load Ramadan calendar at the moment.</p>
      <p style="margin-top:0.5rem; font-size:0.9rem;">Please check your internet connection and try again.</p>
    </div>`;
  }
}

function renderRamadanTable() {
  const tableEl = document.getElementById('ramadanTable');
  if (!tableEl || ramadanData.length === 0) return;

  const today = new Date().toDateString();

  let html = `
    <div style="overflow-x:auto;">
    <table class="ramadan-table">
      <thead>
        <tr>
          <th>Day</th>
          <th>Date</th>
          <th>Hijri</th>
          <th><i data-icon="moonStar" data-size="14"></i> Sehri</th>
          <th><i data-icon="sunset" data-size="14"></i> Iftar</th>
          <th>Day Length</th>
        </tr>
      </thead>
      <tbody>
  `;

  ramadanData.forEach((day, idx) => {
    const greg = day.date.gregorian;
    const hij = day.date.hijri;
    const timings = day.timings;

    const sehri = timings.Imsak ? timings.Imsak.split(' ')[0] : timings.Fajr.split(' ')[0];
    const iftar = timings.Maghrib.split(' ')[0];

    const gregDate = new Date(greg.date.split('-').reverse().join('-'));
    const isToday = gregDate.toDateString() === today;
    const isPast = gregDate < new Date(today);

    // Calculate day length
    const [sH, sM] = sehri.split(':').map(Number);
    const [iH, iM] = iftar.split(':').map(Number);
    const lengthMin = (iH * 60 + iM) - (sH * 60 + sM);
    const lengthH = Math.floor(lengthMin / 60);
    const lengthMins = lengthMin % 60;

    html += `
      <tr class="${isToday ? 'today-row' : ''} ${isPast ? 'past-row' : ''}">
        <td><div class="day-circle ${isToday ? 'active' : ''}">${idx + 1}</div></td>
        <td><strong>${greg.day} ${greg.month.en}</strong><br><small style="color:var(--text-muted);">${greg.weekday.en}</small></td>
        <td>${hij.day} ${hij.month.en}</td>
        <td class="sehri-time">${formatTime12(sehri)}</td>
        <td class="iftar-time">${formatTime12(iftar)}</td>
        <td><small style="color:var(--text-muted);">${lengthH}h ${lengthMins}m</small></td>
      </tr>
    `;
  });

  html += `</tbody></table></div>`;
  tableEl.innerHTML = html;
  if (window.injectIcons) window.injectIcons();
}

function formatTime12(time24) {
  const [h, m] = time24.split(':').map(Number);
  const period = h >= 12 ? 'PM' : 'AM';
  const h12 = h % 12 || 12;
  return `${h12}:${String(m).padStart(2, '0')} ${period}`;
}

async function setLocation() {
  if (!navigator.geolocation) return;
  navigator.geolocation.getCurrentPosition(
    async (pos) => {
      currentLocation.lat = pos.coords.latitude;
      currentLocation.lng = pos.coords.longitude;
      try {
        const geo = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&format=json`);
        const gd = await geo.json();
        currentLocation.city = gd.address.city || gd.address.town || 'Dhaka';
        currentLocation.country = gd.address.country || 'Bangladesh';
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

document.addEventListener('DOMContentLoaded', () => {
  setLocation();
});
