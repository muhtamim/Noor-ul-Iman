// ====== Daily Rotating Content ======

const dailyVerses = [
  {
    arabic: "إِنَّ مَعَ الْعُسْرِ يُسْرًا",
    translation: "Indeed, with hardship comes ease.",
    reference: "Quran 94:6"
  },
  {
    arabic: "وَمَن يَتَّقِ اللَّهَ يَجْعَل لَّهُ مَخْرَجًا",
    translation: "And whoever fears Allah, He will make for him a way out.",
    reference: "Quran 65:2"
  },
  {
    arabic: "وَإِذَا سَأَلَكَ عِبَادِي عَنِّي فَإِنِّي قَرِيبٌ",
    translation: "And when My servants ask you concerning Me — indeed I am near.",
    reference: "Quran 2:186"
  },
  {
    arabic: "اللَّهُ نُورُ السَّمَاوَاتِ وَالْأَرْضِ",
    translation: "Allah is the Light of the heavens and the earth.",
    reference: "Quran 24:35"
  },
  {
    arabic: "وَبَشِّرِ الصَّابِرِينَ",
    translation: "And give good tidings to the patient.",
    reference: "Quran 2:155"
  },
  {
    arabic: "فَاذْكُرُونِي أَذْكُرْكُمْ",
    translation: "So remember Me; I will remember you.",
    reference: "Quran 2:152"
  },
  {
    arabic: "وَهُوَ مَعَكُمْ أَيْنَ مَا كُنتُمْ",
    translation: "And He is with you wherever you are.",
    reference: "Quran 57:4"
  }
];

const dailyHadith = [
  {
    text: "The best among you are those who have the best manners and character.",
    source: "Sahih Bukhari 3559"
  },
  {
    text: "Smiling in the face of your brother is a charity.",
    source: "Jami at-Tirmidhi 1956"
  },
  {
    text: "Whoever believes in Allah and the Last Day, let him speak good or remain silent.",
    source: "Sahih Bukhari 6018"
  },
  {
    text: "None of you truly believes until he loves for his brother what he loves for himself.",
    source: "Sahih Bukhari 13"
  },
  {
    text: "The strong is not the one who overcomes people by his strength, but the one who controls himself while in anger.",
    source: "Sahih Bukhari 6114"
  },
  {
    text: "Kindness is a mark of faith, and whoever has not kindness has not faith.",
    source: "Sahih Muslim 2592"
  },
  {
    text: "Make things easy and do not make them difficult.",
    source: "Sahih Bukhari 69"
  }
];

const dailyQuotes = [
  { text: "Whoever is patient will be granted boundless reward.", author: "Quran 39:10" },
  { text: "Verily, in the remembrance of Allah do hearts find rest.", author: "Quran 13:28" },
  { text: "Allah does not burden a soul beyond that it can bear.", author: "Quran 2:286" },
  { text: "Trust in Allah, but tie your camel first.", author: "Prophet Muhammad ﷺ" },
  { text: "The world is a prison for the believer and a paradise for the disbeliever.", author: "Prophet Muhammad ﷺ" }
];

// Mood-based dua suggestions
const moodDuas = {
  anxious: {
    title: "Dua for Anxiety & Worry",
    arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ",
    translation: "O Allah, I seek refuge in You from anxiety and sorrow.",
    reference: "Sahih Bukhari"
  },
  grateful: {
    title: "Dua of Gratitude",
    arabic: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ",
    translation: "All praise belongs to Allah, Lord of the worlds.",
    reference: "Quran 1:2"
  },
  hopeful: {
    title: "Dua for Hope",
    arabic: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً",
    translation: "Our Lord, give us good in this world and good in the Hereafter.",
    reference: "Quran 2:201"
  },
  guidance: {
    title: "Dua for Guidance",
    arabic: "اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ",
    translation: "Guide us on the straight path.",
    reference: "Quran 1:6"
  },
  forgiveness: {
    title: "Dua for Forgiveness",
    arabic: "رَبَّنَا ظَلَمْنَا أَنفُسَنَا وَإِن لَّمْ تَغْفِرْ لَنَا وَتَرْحَمْنَا لَنَكُونَنَّ مِنَ الْخَاسِرِينَ",
    translation: "Our Lord, we have wronged ourselves. If You do not forgive us and have mercy upon us, we will be among the losers.",
    reference: "Quran 7:23"
  },
  protection: {
    title: "Dua for Protection",
    arabic: "حَسْبُنَا اللَّهُ وَنِعْمَ الْوَكِيلُ",
    translation: "Sufficient for us is Allah, and He is the best Disposer of affairs.",
    reference: "Quran 3:173"
  },
  difficulty: {
    title: "Dua in Difficulty",
    arabic: "لَا إِلَهَ إِلَّا أَنتَ سُبْحَانَكَ إِنِّي كُنتُ مِنَ الظَّالِمِينَ",
    translation: "There is no deity except You; exalted are You. Indeed, I have been of the wrongdoers.",
    reference: "Quran 21:87"
  },
  happy: {
    title: "Dua of Joy",
    arabic: "اللَّهُمَّ مَا أَصْبَحَ بِي مِنْ نِعْمَةٍ فَمِنْكَ وَحْدَكَ",
    translation: "O Allah, whatever blessing has come to me, it is from You alone.",
    reference: "Abu Dawud"
  }
};

// Get today's content (rotates daily based on date)
function getDailyContent() {
  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
  return {
    verse: dailyVerses[dayOfYear % dailyVerses.length],
    hadith: dailyHadith[dayOfYear % dailyHadith.length],
    quote: dailyQuotes[dayOfYear % dailyQuotes.length]
  };
}
