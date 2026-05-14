// ====== Quran Translation Languages — VERIFIED IDs ======
// All edition IDs verified from alquran.cloud API (live tested)
// API: https://api.alquran.cloud/v1/edition?type=translation

const translationLanguages = [
  { code: 'en.sahih',         label: 'English',        native: 'English',     flag: '🇬🇧', dir: 'ltr' },
  { code: 'bn.bengali',       label: 'Bangla',         native: 'বাংলা',       flag: '🇧🇩', dir: 'ltr' },
  { code: 'ur.ahmedali',      label: 'Urdu',           native: 'اردو',        flag: '🇵🇰', dir: 'rtl' },
  { code: 'hi.hindi',         label: 'Hindi',          native: 'हिन्दी',       flag: '🇮🇳', dir: 'ltr' },
  { code: 'id.indonesian',    label: 'Indonesian',     native: 'Bahasa',      flag: '🇮🇩', dir: 'ltr' },
  { code: 'tr.ates',          label: 'Turkish',        native: 'Türkçe',      flag: '🇹🇷', dir: 'ltr' },
  { code: 'fr.hamidullah',    label: 'French',         native: 'Français',    flag: '🇫🇷', dir: 'ltr' },
  { code: 'es.cortes',        label: 'Spanish',        native: 'Español',     flag: '🇪🇸', dir: 'ltr' },
  { code: 'de.aburida',       label: 'German',         native: 'Deutsch',     flag: '🇩🇪', dir: 'ltr' },
  { code: 'ms.basmeih',       label: 'Malay',          native: 'Melayu',      flag: '🇲🇾', dir: 'ltr' },
  { code: 'ru.kuliev',        label: 'Russian',        native: 'Русский',     flag: '🇷🇺', dir: 'ltr' },
  { code: 'zh.jian',          label: 'Chinese',        native: '中文',         flag: '🇨🇳', dir: 'ltr' },
  { code: 'fa.ayati',         label: 'Persian',        native: 'فارسی',       flag: '🇮🇷', dir: 'rtl' },
  { code: 'ta.tamil',         label: 'Tamil',          native: 'தமிழ்',        flag: '🇮🇳', dir: 'ltr' },
  { code: 'it.piccardo',      label: 'Italian',        native: 'Italiano',    flag: '🇮🇹', dir: 'ltr' },
  { code: 'nl.keyzer',        label: 'Dutch',          native: 'Nederlands',  flag: '🇳🇱', dir: 'ltr' },
  { code: 'sv.bernstrom',     label: 'Swedish',        native: 'Svenska',     flag: '🇸🇪', dir: 'ltr' },
  { code: 'sq.ahmeti',        label: 'Albanian',       native: 'Shqip',       flag: '🇦🇱', dir: 'ltr' },
  { code: 'so.abduh',         label: 'Somali',         native: 'Soomaali',    flag: '🇸🇴', dir: 'ltr' },
  { code: 'pt.elhayek',       label: 'Portuguese',     native: 'Português',   flag: '🇵🇹', dir: 'ltr' },
  { code: 'pl.bielawskiego',  label: 'Polish',         native: 'Polski',      flag: '🇵🇱', dir: 'ltr' },
  { code: 'th.thai',          label: 'Thai',           native: 'ไทย',          flag: '🇹🇭', dir: 'ltr' },
  { code: 'ja.japanese',      label: 'Japanese',       native: '日本語',        flag: '🇯🇵', dir: 'ltr' },
  { code: 'ko.korean',        label: 'Korean',         native: '한국어',        flag: '🇰🇷', dir: 'ltr' },
  { code: 'ku.asan',          label: 'Kurdish',        native: 'Kurdî',       flag: '🇮🇶', dir: 'ltr' },
  { code: 'az.mammadaliyev',  label: 'Azerbaijani',    native: 'Azərbaycan',  flag: '🇦🇿', dir: 'ltr' },
  { code: 'uz.sodik',         label: 'Uzbek',          native: 'Oʻzbek',      flag: '🇺🇿', dir: 'ltr' },
  { code: 'ml.abdulhameed',   label: 'Malayalam',      native: 'മലയാളം',     flag: '🇮🇳', dir: 'ltr' },
  { code: 'sw.barwani',       label: 'Swahili',        native: 'Kiswahili',   flag: '🇰🇪', dir: 'ltr' },
  { code: 'am.sadiq',         label: 'Amharic',        native: 'አማርኛ',        flag: '🇪🇹', dir: 'ltr' },
  { code: 'bg.theophanov',    label: 'Bulgarian',      native: 'Български',   flag: '🇧🇬', dir: 'ltr' },
  { code: 'bs.mlivo',         label: 'Bosnian',        native: 'Bosanski',    flag: '🇧🇦', dir: 'ltr' },
  { code: 'cs.hrbek',         label: 'Czech',          native: 'Čeština',     flag: '🇨🇿', dir: 'ltr' },
  { code: 'ha.gumi',          label: 'Hausa',          native: 'Hausa',       flag: '🇳🇬', dir: 'ltr' },
  { code: 'ro.grigore',       label: 'Romanian',       native: 'Română',      flag: '🇷🇴', dir: 'ltr' },
  { code: 'no.berg',          label: 'Norwegian',      native: 'Norsk',       flag: '🇳🇴', dir: 'ltr' }
];

// Tafsir editions
const tafsirEditions = [
  { code: 'en.jalalayn',      label: 'Tafsir al-Jalalayn (EN)' },
  { code: 'ar.muyassar',      label: 'Tafsir al-Muyassar (AR)' },
  { code: 'ar.jalalayn',      label: 'Tafsir al-Jalalayn (AR)' }
];
