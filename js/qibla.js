// ====== Qibla Direction Finder ======
// Calculates direction to Kaaba (Makkah) using user's location

const KAABA_LAT = 21.4225;
const KAABA_LNG = 39.8262;

function toRad(deg) { return deg * Math.PI / 180; }
function toDeg(rad) { return rad * 180 / Math.PI; }

function calculateQibla(lat, lng) {
  const phiK = toRad(KAABA_LAT);
  const lambdaK = toRad(KAABA_LNG);
  const phi = toRad(lat);
  const lambda = toRad(lng);

  const y = Math.sin(lambdaK - lambda);
  const x = Math.cos(phi) * Math.tan(phiK) - Math.sin(phi) * Math.cos(lambdaK - lambda);
  let qibla = toDeg(Math.atan2(y, x));
  return (qibla + 360) % 360;
}

function calculateDistance(lat, lng) {
  const R = 6371; // km
  const dLat = toRad(KAABA_LAT - lat);
  const dLng = toRad(KAABA_LNG - lng);
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(lat)) * Math.cos(toRad(KAABA_LAT)) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

let qiblaDirection = 0;
let deviceHeading = 0;

function updateCompass() {
  const arrow = document.getElementById('compassArrow');
  if (!arrow) return;
  const rotation = qiblaDirection - deviceHeading;
  arrow.style.transform = `rotate(${rotation}deg)`;
}

function initQibla() {
  const arrow = document.getElementById('compassArrow');
  const statusEl = document.getElementById('qiblaStatus');
  const infoEl = document.getElementById('qiblaInfo');

  if (!navigator.geolocation) {
    if (statusEl) statusEl.textContent = 'Geolocation not supported by your browser.';
    return;
  }

  if (statusEl) statusEl.textContent = 'Getting your location...';

  navigator.geolocation.getCurrentPosition(
    (pos) => {
      const lat = pos.coords.latitude;
      const lng = pos.coords.longitude;
      qiblaDirection = calculateQibla(lat, lng);
      const distance = calculateDistance(lat, lng);

      if (statusEl) statusEl.textContent = 'Point your phone north to find Qibla direction';

      if (infoEl) {
        infoEl.innerHTML = `
          <div class="qibla-info-row"><span>Your Latitude:</span><strong>${lat.toFixed(4)}°</strong></div>
          <div class="qibla-info-row"><span>Your Longitude:</span><strong>${lng.toFixed(4)}°</strong></div>
          <div class="qibla-info-row"><span>Qibla Direction:</span><strong>${qiblaDirection.toFixed(2)}° from North</strong></div>
          <div class="qibla-info-row"><span>Distance to Kaaba:</span><strong>${distance.toFixed(0)} km</strong></div>
        `;
      }

      updateCompass();

      // Try device orientation (mobile)
      if (window.DeviceOrientationEvent) {
        // iOS 13+ requires permission
        if (typeof DeviceOrientationEvent.requestPermission === 'function') {
          const permBtn = document.getElementById('permBtn');
          if (permBtn) {
            permBtn.style.display = 'inline-block';
            permBtn.addEventListener('click', async () => {
              try {
                const perm = await DeviceOrientationEvent.requestPermission();
                if (perm === 'granted') {
                  window.addEventListener('deviceorientation', handleOrientation, true);
                  permBtn.style.display = 'none';
                }
              } catch (e) { console.error(e); }
            });
          }
        } else {
          window.addEventListener('deviceorientationabsolute', handleOrientation, true);
          window.addEventListener('deviceorientation', handleOrientation, true);
        }
      }
    },
    (err) => {
      if (statusEl) statusEl.textContent = 'Location access denied. Please enable location for accurate Qibla direction.';
      // Default to Dhaka
      qiblaDirection = calculateQibla(23.8103, 90.4125);
      updateCompass();
    }
  );
}

function handleOrientation(event) {
  if (event.webkitCompassHeading !== undefined) {
    deviceHeading = event.webkitCompassHeading;
  } else if (event.alpha !== null) {
    deviceHeading = 360 - event.alpha;
  }
  updateCompass();
}

document.addEventListener('DOMContentLoaded', initQibla);
