// ====== Quran Learning Data (Shikkhanur Bebostha) ======

// Arabic Alphabet - 28 letters
const arabicAlphabet = [
  { letter: 'ا', name: 'Alif', transliteration: 'a / ā', example: 'أَب (ab) — Father' },
  { letter: 'ب', name: 'Ba', transliteration: 'b', example: 'بَيْت (bayt) — House' },
  { letter: 'ت', name: 'Ta', transliteration: 't', example: 'تَمْر (tamr) — Date (fruit)' },
  { letter: 'ث', name: 'Tha', transliteration: 'th', example: 'ثَوْب (thawb) — Garment' },
  { letter: 'ج', name: 'Jim', transliteration: 'j', example: 'جَمَل (jamal) — Camel' },
  { letter: 'ح', name: 'Ḥa', transliteration: 'ḥ', example: 'حَجّ (hajj) — Pilgrimage' },
  { letter: 'خ', name: 'Kha', transliteration: 'kh', example: 'خُبْز (khubz) — Bread' },
  { letter: 'د', name: 'Dal', transliteration: 'd', example: 'دَار (dār) — Home' },
  { letter: 'ذ', name: 'Dhal', transliteration: 'dh', example: 'ذَهَب (dhahab) — Gold' },
  { letter: 'ر', name: 'Ra', transliteration: 'r', example: 'رَبّ (rabb) — Lord' },
  { letter: 'ز', name: 'Za', transliteration: 'z', example: 'زَيْت (zayt) — Oil' },
  { letter: 'س', name: 'Sin', transliteration: 's', example: 'سَلَام (salām) — Peace' },
  { letter: 'ش', name: 'Shin', transliteration: 'sh', example: 'شَمْس (shams) — Sun' },
  { letter: 'ص', name: 'Ṣad', transliteration: 'ṣ', example: 'صَلَاة (ṣalāh) — Prayer' },
  { letter: 'ض', name: 'Ḍad', transliteration: 'ḍ', example: 'ضَيْف (ḍayf) — Guest' },
  { letter: 'ط', name: 'Ṭa', transliteration: 'ṭ', example: 'طَيْر (ṭayr) — Bird' },
  { letter: 'ظ', name: 'Ẓa', transliteration: 'ẓ', example: 'ظِلّ (ẓill) — Shade' },
  { letter: 'ع', name: 'Ain', transliteration: 'ʿ', example: 'عَيْن (ʿayn) — Eye' },
  { letter: 'غ', name: 'Ghain', transliteration: 'gh', example: 'غَيْم (ghaym) — Cloud' },
  { letter: 'ف', name: 'Fa', transliteration: 'f', example: 'فَجْر (fajr) — Dawn' },
  { letter: 'ق', name: 'Qaf', transliteration: 'q', example: 'قَلْب (qalb) — Heart' },
  { letter: 'ك', name: 'Kaf', transliteration: 'k', example: 'كِتَاب (kitāb) — Book' },
  { letter: 'ل', name: 'Lam', transliteration: 'l', example: 'لَيْل (layl) — Night' },
  { letter: 'م', name: 'Mim', transliteration: 'm', example: 'مَاء (māʾ) — Water' },
  { letter: 'ن', name: 'Nun', transliteration: 'n', example: 'نُور (nūr) — Light' },
  { letter: 'ه', name: 'Ha', transliteration: 'h', example: 'هَوَاء (hawāʾ) — Air' },
  { letter: 'و', name: 'Waw', transliteration: 'w / ū', example: 'وَرْد (ward) — Rose' },
  { letter: 'ي', name: 'Ya', transliteration: 'y / ī', example: 'يَوْم (yawm) — Day' }
];

// Harakat (Vowel Marks)
const harakatMarks = [
  { mark: 'بَ', name: 'Fatha', symbol: 'َ ', sound: 'a (short)', desc: 'Short "a" sound above the letter' },
  { mark: 'بِ', name: 'Kasra', symbol: 'ِ ', sound: 'i (short)', desc: 'Short "i" sound below the letter' },
  { mark: 'بُ', name: 'Damma', symbol: 'ُ ', sound: 'u (short)', desc: 'Short "u" sound above the letter' },
  { mark: 'بْ', name: 'Sukun', symbol: 'ْ ', sound: 'no vowel', desc: 'Letter has no vowel — stop' },
  { mark: 'بّ', name: 'Shadda', symbol: 'ّ ', sound: 'double letter', desc: 'Letter is doubled' },
  { mark: 'بً', name: 'Fathatan', symbol: 'ً ', sound: 'an', desc: 'Tanwin — ends with "n" sound' },
  { mark: 'بٍ', name: 'Kasratan', symbol: 'ٍ ', sound: 'in', desc: 'Tanwin — ends with "n" sound' },
  { mark: 'بٌ', name: 'Dammatan', symbol: 'ٌ ', sound: 'un', desc: 'Tanwin — ends with "n" sound' }
];

// Beginner short surahs to memorize (with audio support)
const beginnerSurahs = [
  { number: 1, name: 'Al-Fatihah', english: 'The Opening', verses: 7, level: 'Beginner', priority: 1,
    desc: 'The first chapter — recited in every prayer. Most important surah.' },
  { number: 112, name: 'Al-Ikhlas', english: 'The Sincerity', verses: 4, level: 'Beginner', priority: 2,
    desc: 'Declares the oneness of Allah. Equals 1/3 of the Quran in reward.' },
  { number: 113, name: 'Al-Falaq', english: 'The Daybreak', verses: 5, level: 'Beginner', priority: 3,
    desc: 'Seek protection from evil. Recite morning & evening.' },
  { number: 114, name: 'An-Nas', english: 'The Mankind', verses: 6, level: 'Beginner', priority: 4,
    desc: 'Seek protection from whispers of Shaytan.' },
  { number: 108, name: 'Al-Kawthar', english: 'The Abundance', verses: 3, level: 'Beginner', priority: 5,
    desc: 'Shortest surah — easy to memorize, great reward.' },
  { number: 103, name: 'Al-Asr', english: 'The Time', verses: 3, level: 'Beginner', priority: 6,
    desc: 'About the importance of time and faith.' },
  { number: 110, name: 'An-Nasr', english: 'The Help', verses: 3, level: 'Beginner', priority: 7,
    desc: 'About the victory and help of Allah.' },
  { number: 109, name: 'Al-Kafirun', english: 'The Disbelievers', verses: 6, level: 'Beginner', priority: 8,
    desc: 'Declaration of pure monotheism.' },
  { number: 111, name: 'Al-Masad', english: 'The Palm Fiber', verses: 5, level: 'Beginner', priority: 9,
    desc: 'Warning about Abu Lahab.' },
  { number: 107, name: 'Al-Maun', english: 'Small Kindness', verses: 7, level: 'Beginner', priority: 10,
    desc: 'About small acts of kindness and prayer.' },
  { number: 106, name: 'Quraysh', english: 'Quraysh', verses: 4, level: 'Intermediate', priority: 11,
    desc: 'About the Quraysh tribe and the Kaaba.' },
  { number: 105, name: 'Al-Fil', english: 'The Elephant', verses: 5, level: 'Intermediate', priority: 12,
    desc: 'Story of the army of the elephant.' }
];

// Tajweed Rules (Basic)
const tajweedRules = [
  {
    title: 'Madd (Elongation)',
    desc: 'Lengthening a vowel sound for 2 counts (or more in some cases).',
    rule: 'When a long vowel (ا ، و ، ي) follows a short vowel of the same kind.',
    example: 'قَالَ (qāla) — the "ā" is held for 2 counts',
    color: '#10b981'
  },
  {
    title: 'Ghunnah (Nasalization)',
    desc: 'A nasal sound made from the nose for 2 counts.',
    rule: 'Occurs with ن and م when they have a shaddah (ّ).',
    example: 'إِنَّ (inna) — nasalize the "n" sound',
    color: '#8b5cf6'
  },
  {
    title: 'Ikhfa (Hiding)',
    desc: 'Partially hiding the noon sakinah/tanwin sound.',
    rule: 'When ن with sukun or tanwin is followed by certain letters (15 letters).',
    example: 'مِنْ تَحْتِهَا (min tahtihā)',
    color: '#f59e0b'
  },
  {
    title: 'Idgham (Merging)',
    desc: 'Merging the noon sound into the next letter.',
    rule: 'When ن with sukun is followed by ي، ر، م، ل، و، ن.',
    example: 'مِنْ رَبِّهِمْ (mir-rabbihim)',
    color: '#ef4444'
  },
  {
    title: 'Iqlab (Conversion)',
    desc: 'Converting ن sound to م sound.',
    rule: 'When ن with sukun or tanwin is followed by ب.',
    example: 'مِنْ بَعْدِ (mim-baʿdi)',
    color: '#0ea5e9'
  },
  {
    title: 'Qalqalah (Echoing)',
    desc: 'A vibrating echo sound on certain letters.',
    rule: 'On the letters: ق، ط، ب، ج، د when they have sukun.',
    example: 'يَجْعَلُ (yajʿalu) — echo on the ج',
    color: '#f43f5e'
  }
];

// Common Quranic Words (most repeated in the Quran)
const quranicVocabulary = [
  { arabic: 'اللَّه', trans: 'Allah', meaning: 'The God', count: '2,699 times' },
  { arabic: 'رَبّ', trans: 'Rabb', meaning: 'Lord, Master', count: '975 times' },
  { arabic: 'قُلْ', trans: 'Qul', meaning: 'Say', count: '332 times' },
  { arabic: 'يَوْم', trans: 'Yawm', meaning: 'Day', count: '475 times' },
  { arabic: 'النَّاس', trans: 'An-Nas', meaning: 'The people, mankind', count: '241 times' },
  { arabic: 'كِتَاب', trans: 'Kitab', meaning: 'Book', count: '230 times' },
  { arabic: 'آيَة', trans: 'Ayah', meaning: 'Sign, verse', count: '382 times' },
  { arabic: 'سَمَاء', trans: 'Sama', meaning: 'Sky, heaven', count: '310 times' },
  { arabic: 'أَرْض', trans: 'Ard', meaning: 'Earth', count: '461 times' },
  { arabic: 'إِنَّ', trans: 'Inna', meaning: 'Indeed, verily', count: '1,682 times' },
  { arabic: 'مِن', trans: 'Min', meaning: 'From', count: '3,226 times' },
  { arabic: 'إِلَى', trans: 'Ila', meaning: 'To, toward', count: '742 times' },
  { arabic: 'عَلَى', trans: 'Ala', meaning: 'On, upon', count: '1,442 times' },
  { arabic: 'فِي', trans: 'Fee', meaning: 'In, into', count: '1,701 times' },
  { arabic: 'لَا', trans: 'La', meaning: 'No, not', count: '1,723 times' },
  { arabic: 'مَا', trans: 'Ma', meaning: 'What, that which', count: '2,627 times' },
  { arabic: 'الَّذِي', trans: 'Alladhi', meaning: 'Who, which', count: '1,464 times' },
  { arabic: 'كَانَ', trans: 'Kana', meaning: 'Was, were', count: '1,361 times' },
  { arabic: 'قَالَ', trans: 'Qala', meaning: 'He said', count: '529 times' },
  { arabic: 'عَبْد', trans: 'Abd', meaning: 'Servant, slave', count: '275 times' },
  { arabic: 'نُور', trans: 'Nur', meaning: 'Light', count: '49 times' },
  { arabic: 'رَحْمَة', trans: 'Rahma', meaning: 'Mercy', count: '114 times' },
  { arabic: 'إِيمَان', trans: 'Iman', meaning: 'Faith, belief', count: '45 times' },
  { arabic: 'صَلَاة', trans: 'Salah', meaning: 'Prayer', count: '83 times' }
];
