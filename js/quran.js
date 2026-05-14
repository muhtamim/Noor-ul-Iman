// ====== Quran Page Logic (v3 - Production) ======
// API: alquran.cloud + islamic.network audio CDN

let allSurahs = [];
let currentReciter = localStorage.getItem('quranReciter') || 'ar.alafasy';
let currentLanguage = localStorage.getItem('quranLanguage') || 'en.sahih';
let currentSurahAudio = null;
let currentAyahAudio = null;
let currentSurahNum = null;
let showTafsir = false;

const reciters = [
  { id: 'ar.alafasy',          name: 'Mishary Alafasy' },
  { id: 'ar.abdulbasitmurattal', name: 'Abdul Basit (Murattal)' },
  { id: 'ar.abdurrahmaansudais', name: 'Abdurrahman As-Sudais' },
  { id: 'ar.hudhaify',         name: 'Ali Al-Hudhaifi' },
  { id: 'ar.husary',           name: 'Mahmoud Al-Husary' },
  { id: 'ar.minshawi',         name: 'Mohamed Al-Minshawi' },
  { id: 'ar.muhammadayyoub',   name: 'Muhammad Ayyoub' },
  { id: 'ar.muhammadjibreel',  name: 'Muhammad Jibreel' },
  { id: 'ar.saoodshuraym',     name: 'Saud Al-Shuraim' },
  { id: 'ar.shaatree',         name: 'Abu Bakr Al-Shatri' }
];

async function loadSurahList() {
  const listEl = document.getElementById('surahList');
  if (!listEl) return;
  try {
    const res = await fetch('https://api.alquran.cloud/v1/surah');
    const data = await res.json();
    allSurahs = data.data;
    renderSurahs(allSurahs);
  } catch (e) {
    listEl.innerHTML = '<p class="text-center" style="padding:2rem; color:var(--text-muted);">Failed to load Surahs. Please check your internet connection.</p>';
  }
}

// ====== Global Settings (List View) ======
function initGlobalSettings() {
  const langSel = document.getElementById('globalLanguageSelect');
  const recSel = document.getElementById('globalReciterSelect');

  if (langSel && typeof translationLanguages !== 'undefined') {
    langSel.innerHTML = translationLanguages.map(l =>
      `<option value="${l.code}" ${l.code === currentLanguage ? 'selected' : ''}>${l.flag} ${l.label} — ${l.native}</option>`
    ).join('');
  }

  if (recSel) {
    recSel.innerHTML = reciters.map(r =>
      `<option value="${r.id}" ${r.id === currentReciter ? 'selected' : ''}>${r.name}</option>`
    ).join('');
  }
}

function setGlobalLanguage(code) {
  currentLanguage = code;
  localStorage.setItem('quranLanguage', code);
  if (window.showToast) {
    const lang = translationLanguages.find(l => l.code === code);
    window.showToast(`Language set: ${lang?.flag || ''} ${lang?.label || ''}`);
  }
}

function setGlobalReciter(id) {
  currentReciter = id;
  localStorage.setItem('quranReciter', id);
  if (window.showToast) {
    const r = reciters.find(x => x.id === id);
    window.showToast(`Reciter: ${r?.name || ''}`);
  }
}

function renderSurahs(surahs) {
  const listEl = document.getElementById('surahList');
  if (!listEl) return;
  if (surahs.length === 0) {
    listEl.innerHTML = '<p class="text-center" style="padding:2rem; color:var(--text-muted);">No Surahs found matching your search.</p>';
    return;
  }
  listEl.innerHTML = surahs.map(s => `
    <div class="surah-card" onclick="loadSurah(${s.number})">
      <div class="surah-number">${s.number}</div>
      <div class="surah-info">
        <div class="surah-name-en">${s.englishName}</div>
        <div class="surah-meta">${s.englishNameTranslation} • ${s.numberOfAyahs} verses • ${s.revelationType}</div>
      </div>
      <div class="surah-name-ar">${s.name}</div>
    </div>
  `).join('');
  if (window.injectIcons) window.injectIcons();
}

async function loadSurah(num) {
  const listView = document.getElementById('surahListView');
  const detailView = document.getElementById('surahDetail');
  if (!detailView) return;

  currentSurahNum = num;
  listView.style.display = 'none';
  detailView.classList.add('active');
  detailView.innerHTML = '<div class="spinner"></div>';

  try {
    // Fetch Arabic + translation in parallel — with fallback to English on translation failure
    const arRes = await fetch(`https://api.alquran.cloud/v1/surah/${num}`);
    const arData = await arRes.json();
    const surah = arData.data;

    let trans = null;
    let langInfo = translationLanguages.find(l => l.code === currentLanguage);
    let translationFailed = false;

    try {
      const trRes = await fetch(`https://api.alquran.cloud/v1/surah/${num}/${currentLanguage}`);
      const trData = await trRes.json();
      if (trData.code === 200 && trData.data && trData.data.ayahs) {
        trans = trData.data;
      } else {
        throw new Error('Invalid translation response');
      }
    } catch (transErr) {
      console.warn('Translation failed, falling back to English:', transErr);
      translationFailed = true;
      // Fallback to English
      const fallbackRes = await fetch(`https://api.alquran.cloud/v1/surah/${num}/en.sahih`);
      const fallbackData = await fallbackRes.json();
      trans = fallbackData.data;
      langInfo = translationLanguages.find(l => l.code === 'en.sahih');
      if (window.showToast) window.showToast('Translation not available — using English');
    }

    let html = `
      <button class="back-btn" onclick="backToList()">
        <i data-icon="arrowRight" data-size="16" style="transform:rotate(180deg);"></i>
        <span>Back to Surah List</span>
      </button>

      <div class="surah-header">
        <h2>${surah.name}</h2>
        <div class="english-name">${surah.englishName} — ${surah.englishNameTranslation}</div>
        <div class="surah-stats">${surah.numberOfAyahs} verses • ${surah.revelationType}</div>
      </div>

      <!-- Audio + Language Controls -->
      <div class="quran-audio-player">
        <div style="display:grid; grid-template-columns:auto 1fr; gap:1rem; align-items:center; flex-wrap:wrap;">
          <button class="audio-play-btn" id="surahPlayBtn" onclick="toggleSurahAudio(${num})">
            <i data-icon="lightning" data-size="20"></i>
          </button>
          <div>
            <div style="font-weight:700; color:var(--text); font-size:0.95rem;">Full Surah Audio</div>
            <div style="font-size:0.82rem; color:var(--text-muted);" id="reciterLabel">${reciters.find(r => r.id === currentReciter)?.name || 'Mishary Alafasy'}</div>
          </div>
        </div>

        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(180px, 1fr)); gap:0.75rem; margin-top:1rem;">
          <select id="reciterSelect" onchange="changeReciter(${num})" class="quran-select">
            <optgroup label="🎤 Choose Reciter">
              ${reciters.map(r => `<option value="${r.id}" ${r.id === currentReciter ? 'selected' : ''}>${r.name}</option>`).join('')}
            </optgroup>
          </select>

          <select id="languageSelect" onchange="changeLanguage(${num})" class="quran-select">
            <optgroup label="🌐 Translation Language">
              ${translationLanguages.map(l => `<option value="${l.code}" ${l.code === currentLanguage ? 'selected' : ''}>${l.flag} ${l.label} (${l.native})</option>`).join('')}
            </optgroup>
          </select>

          <button class="btn btn-outline btn-small" onclick="toggleTafsir(${num})" id="tafsirBtn">
            <i data-icon="book" data-size="14"></i>
            <span>${showTafsir ? 'Hide' : 'Show'} Tafsir</span>
          </button>
        </div>

        <audio id="surahAudio" preload="none" style="display:none;"></audio>
      </div>
    `;

    if (num !== 1 && num !== 9) {
      html += `<div class="bismillah-decorative">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</div>`;
    }

    // Fetch tafsir if enabled
    let tafsirData = null;
    if (showTafsir) {
      try {
        const tafsirRes = await fetch(`https://api.alquran.cloud/v1/surah/${num}/en.jalalayn`);
        const t = await tafsirRes.json();
        tafsirData = t.data;
      } catch {}
    }

    html += surah.ayahs.map((ayah, idx) => {
      const translation = trans.ayahs[idx]?.text || '';
      const tafsir = tafsirData?.ayahs[idx]?.text || '';
      const ayahNum = ayah.numberInSurah;
      const langDir = langInfo?.dir || 'ltr';
      return `
        <div class="ayah-card" id="ayah-${num}-${ayahNum}">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem; flex-wrap:wrap; gap:0.5rem;">
            <span class="ayah-number">${ayahNum}</span>
            <div style="display:flex; gap:0.4rem;">
              <button class="ayah-action-btn" onclick="playAyah(${num}, ${ayahNum})" title="Play this ayah">
                <i data-icon="lightning" data-size="14"></i>
              </button>
              <button class="ayah-action-btn" onclick="copyAyah(${num}, ${ayahNum}, \`${escapeStr(ayah.text)}\`, \`${escapeStr(translation)}\`)" title="Copy">
                <i data-icon="check" data-size="14"></i>
              </button>
              <button class="ayah-action-btn ayah-bookmark" onclick="toggleBookmark(${num}, ${ayahNum}, this)" title="Bookmark" data-key="${num}-${ayahNum}">
                <i data-icon="${isBookmarked(num, ayahNum) ? 'star' : 'star'}" data-size="14"></i>
              </button>
            </div>
          </div>
          <div class="ayah-arabic">${ayah.text}</div>
          <div class="ayah-translation" dir="${langDir}" lang="${currentLanguage.split('.')[0]}">${translation}</div>
          ${showTafsir && tafsir ? `
            <div class="ayah-tafsir">
              <div style="display:flex; align-items:center; gap:0.4rem; font-size:0.78rem; font-weight:800; color:var(--gold-dark); text-transform:uppercase; letter-spacing:0.1em; margin-bottom:0.5rem;">
                <i data-icon="book" data-size="12"></i>
                <span>Tafsir (al-Jalalayn)</span>
              </div>
              ${tafsir}
            </div>
          ` : ''}
        </div>
      `;
    }).join('');

    detailView.innerHTML = html;
    if (window.injectIcons) window.injectIcons();
    window.scrollTo(0, 0);
  } catch (e) {
    console.error(e);
    detailView.innerHTML = `
      <button class="back-btn" onclick="backToList()">
        <i data-icon="arrowRight" data-size="16" style="transform:rotate(180deg);"></i>
        <span>Back</span>
      </button>
      <p class="text-center" style="padding:2rem; color:var(--text-muted);">Failed to load Surah. Please try again.</p>
    `;
  }
}

function escapeStr(s) {
  return (s || '').replace(/`/g, "'").replace(/\\/g, '\\\\').replace(/\$/g, '\\$');
}

function backToList() {
  if (currentSurahAudio) {
    currentSurahAudio.pause();
    currentSurahAudio = null;
  }
  if (currentAyahAudio) {
    currentAyahAudio.pause();
    currentAyahAudio = null;
  }
  document.getElementById('surahListView').style.display = 'block';
  document.getElementById('surahDetail').classList.remove('active');
  window.scrollTo(0, 0);
}

// ====== Surah Audio ======
function toggleSurahAudio(num) {
  const audio = document.getElementById('surahAudio');
  const btn = document.getElementById('surahPlayBtn');
  if (!audio) return;

  if (currentSurahAudio && !currentSurahAudio.paused) {
    currentSurahAudio.pause();
    btn.innerHTML = `<svg width="20" height="20" class="icon" viewBox="0 0 24 24" fill="white"><polygon points="5 3 19 12 5 21 5 3"/></svg>`;
    return;
  }

  const audioUrl = `https://cdn.islamic.network/quran/audio-surah/128/${currentReciter}/${num}.mp3`;
  audio.src = audioUrl;
  audio.volume = 0.85;
  audio.play().catch(e => {
    if (window.showToast) window.showToast('Unable to play. Try another reciter.');
    console.error(e);
  });
  currentSurahAudio = audio;
  btn.innerHTML = `<svg width="20" height="20" class="icon" viewBox="0 0 24 24" fill="white"><rect x="6" y="5" width="4" height="14" rx="1"/><rect x="14" y="5" width="4" height="14" rx="1"/></svg>`;

  audio.onended = () => {
    btn.innerHTML = `<svg width="20" height="20" class="icon" viewBox="0 0 24 24" fill="white"><polygon points="5 3 19 12 5 21 5 3"/></svg>`;
  };

  audio.onerror = () => {
    if (window.showToast) window.showToast('Audio failed to load. Try another reciter.');
    btn.innerHTML = `<svg width="20" height="20" class="icon" viewBox="0 0 24 24" fill="white"><polygon points="5 3 19 12 5 21 5 3"/></svg>`;
  };
}

// ====== Per-Ayah Audio ======
function playAyah(surahNum, ayahNum) {
  if (currentAyahAudio) {
    currentAyahAudio.pause();
    currentAyahAudio = null;
  }

  // Convert to global ayah number for the CDN
  // Use surah:ayah format - the CDN supports surah/ayah path
  const ayahId = `${surahNum}:${ayahNum}`;
  // Try fetch first to get the audio URL
  fetchAndPlayAyah(surahNum, ayahNum);
}

async function fetchAndPlayAyah(surahNum, ayahNum) {
  try {
    const res = await fetch(`https://api.alquran.cloud/v1/ayah/${surahNum}:${ayahNum}/${currentReciter}`);
    const data = await res.json();
    if (data.data?.audio) {
      currentAyahAudio = new Audio(data.data.audio);
      currentAyahAudio.volume = 0.85;
      currentAyahAudio.play().catch(() => {
        if (window.showToast) window.showToast('Audio playback failed.');
      });
      if (window.showToast) window.showToast(`Playing ${surahNum}:${ayahNum}`);
    }
  } catch (e) {
    if (window.showToast) window.showToast('Failed to load ayah audio.');
  }
}

// ====== Reciter & Language ======
function changeReciter(surahNum) {
  const select = document.getElementById('reciterSelect');
  currentReciter = select.value;
  localStorage.setItem('quranReciter', currentReciter);
  const labelEl = document.getElementById('reciterLabel');
  if (labelEl) labelEl.textContent = reciters.find(r => r.id === currentReciter)?.name || '';
  if (currentSurahAudio && !currentSurahAudio.paused) {
    currentSurahAudio.pause();
    toggleSurahAudio(surahNum);
  }
}

function changeLanguage(surahNum) {
  const select = document.getElementById('languageSelect');
  currentLanguage = select.value;
  localStorage.setItem('quranLanguage', currentLanguage);
  if (window.showToast) {
    const lang = translationLanguages.find(l => l.code === currentLanguage);
    window.showToast(`Translation: ${lang?.label || ''} ${lang?.flag || ''}`);
  }
  loadSurah(surahNum);
}

// ====== Tafsir Toggle ======
function toggleTafsir(surahNum) {
  showTafsir = !showTafsir;
  loadSurah(surahNum);
}

// ====== Bookmark System ======
function getBookmarks() {
  return JSON.parse(localStorage.getItem('quranBookmarks') || '[]');
}

function isBookmarked(s, a) {
  return getBookmarks().includes(`${s}-${a}`);
}

function toggleBookmark(s, a, btn) {
  const key = `${s}-${a}`;
  let bookmarks = getBookmarks();
  if (bookmarks.includes(key)) {
    bookmarks = bookmarks.filter(b => b !== key);
    if (window.showToast) window.showToast('Bookmark removed');
    btn.classList.remove('bookmarked');
  } else {
    bookmarks.push(key);
    if (window.showToast) window.showToast('Bookmarked!');
    btn.classList.add('bookmarked');
  }
  localStorage.setItem('quranBookmarks', JSON.stringify(bookmarks));
}

// ====== Copy Ayah ======
function copyAyah(s, a, arabic, translation) {
  const text = `${arabic}\n\n"${translation}"\n\n— Quran ${s}:${a}`;
  navigator.clipboard.writeText(text).then(() => {
    if (window.showToast) window.showToast('Ayah copied to clipboard');
  }).catch(() => {
    if (window.showToast) window.showToast('Copy failed');
  });
}

// ====== Search ======
let searchTimeout = null;
async function searchQuran(query) {
  if (!query || query.length < 3) {
    renderSurahs(allSurahs);
    return;
  }

  // First search through surah names (instant)
  const filtered = allSurahs.filter(s =>
    s.englishName.toLowerCase().includes(query.toLowerCase()) ||
    s.englishNameTranslation.toLowerCase().includes(query.toLowerCase()) ||
    s.name.includes(query) ||
    s.number.toString() === query
  );

  if (filtered.length > 0 && (filtered.length < allSurahs.length || query.length < 5)) {
    renderSurahs(filtered);
    return;
  }

  // For longer queries, do a content search
  const listEl = document.getElementById('surahList');
  listEl.innerHTML = '<div class="spinner"></div>';

  try {
    const res = await fetch(`https://api.alquran.cloud/v1/search/${encodeURIComponent(query)}/all/en`);
    const data = await res.json();
    const matches = data.data?.matches || [];

    if (matches.length === 0) {
      listEl.innerHTML = '<p class="text-center" style="padding:2rem; color:var(--text-muted);">No matches found.</p>';
      return;
    }

    listEl.innerHTML = `
      <div style="grid-column:1/-1; padding:1rem; background:var(--emerald-50); border-radius:var(--radius-sm); margin-bottom:1rem; color:var(--primary); font-weight:700;">
        Found ${matches.length} matches for "${query}"
      </div>
    ` + matches.slice(0, 50).map(m => `
      <div class="surah-card" onclick="loadSurah(${m.surah.number})" style="grid-column:1/-1;">
        <div class="surah-number">${m.surah.number}:${m.numberInSurah}</div>
        <div class="surah-info">
          <div class="surah-name-en">${m.surah.englishName}</div>
          <div style="font-size:0.9rem; color:var(--text); margin-top:0.4rem; font-style:italic;">"${m.text}"</div>
        </div>
      </div>
    `).join('');
  } catch (e) {
    listEl.innerHTML = '<p class="text-center" style="padding:2rem; color:var(--text-muted);">Search failed.</p>';
  }
}

function setupSearch() {
  const search = document.getElementById('surahSearch');
  if (!search) return;
  search.addEventListener('input', (e) => {
    const q = e.target.value;
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => searchQuran(q), 400);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  loadSurahList();
  setupSearch();
  initGlobalSettings();
});

window.setGlobalLanguage = setGlobalLanguage;
window.setGlobalReciter = setGlobalReciter;
