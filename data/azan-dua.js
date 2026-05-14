// ====== Azan & Post-Azan Duas ======

const azanText = [
  { arabic: "اللَّهُ أَكْبَرُ", trans: "Allahu Akbar", count: 4, meaning: "Allah is the Greatest" },
  { arabic: "أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا اللَّهُ", trans: "Ash-hadu an la ilaha illa Allah", count: 2, meaning: "I bear witness that there is no god but Allah" },
  { arabic: "أَشْهَدُ أَنَّ مُحَمَّدًا رَسُولُ اللَّهِ", trans: "Ash-hadu anna Muhammadar rasulullah", count: 2, meaning: "I bear witness that Muhammad is the Messenger of Allah" },
  { arabic: "حَيَّ عَلَى الصَّلَاةِ", trans: "Hayya 'alas-Salah", count: 2, meaning: "Come to prayer" },
  { arabic: "حَيَّ عَلَى الْفَلَاحِ", trans: "Hayya 'alal-Falah", count: 2, meaning: "Come to success" },
  { arabic: "اللَّهُ أَكْبَرُ", trans: "Allahu Akbar", count: 2, meaning: "Allah is the Greatest" },
  { arabic: "لَا إِلَهَ إِلَّا اللَّهُ", trans: "La ilaha illa Allah", count: 1, meaning: "There is no god but Allah" }
];

const postAzanDua = {
  title: "Dua After Hearing the Adhan",
  arabic: "اللَّهُمَّ رَبَّ هَذِهِ الدَّعْوَةِ التَّامَّةِ، وَالصَّلَاةِ الْقَائِمَةِ، آتِ مُحَمَّدًا الْوَسِيلَةَ وَالْفَضِيلَةَ، وَابْعَثْهُ مَقَامًا مَحْمُودًا الَّذِي وَعَدْتَهُ، إِنَّكَ لَا تُخْلِفُ الْمِيعَادَ",
  transliteration: "Allahumma Rabba hadhihi-d-da'wati-t-tammah, was-salati-l-qa'imah, ati Muhammadan al-wasilata wal-fadilah, wab'athhu maqaman mahmudan-illadhi wa'adtahu, innaka la tukhliful-mi'ad",
  translation: "O Allah, Lord of this perfect call and established prayer, grant Muhammad the intercession and favor, and raise him to the praised station which You have promised him. Indeed, You do not break Your promise.",
  reference: "Sahih al-Bukhari 614",
  reward: "Whoever recites this after hearing the adhan, will have my intercession on the Day of Judgement. — Prophet Muhammad ﷺ"
};

const beforeAzanDua = {
  title: "Dua When Hearing the Adhan",
  arabic: "وَأَنَا أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ وَأَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ، رَضِيتُ بِاللَّهِ رَبًّا، وَبِمُحَمَّدٍ رَسُولًا، وَبِالْإِسْلَامِ دِينًا",
  transliteration: "Wa ana ash-hadu an la ilaha illa Allah, wahdahu la sharika lahu, wa anna Muhammadan 'abduhu wa rasuluh, raditu billahi rabban, wa bi Muhammadin rasulan, wa bil-islami dinan",
  translation: "And I bear witness that none has the right to be worshipped except Allah alone, without partner, and that Muhammad is His servant and Messenger. I am pleased with Allah as my Lord, with Muhammad as my Messenger, and with Islam as my religion.",
  reference: "Sahih Muslim 386"
};

// Azan audio URLs (public, free)
const azanAudioUrls = [
  "https://www.islamcan.com/audio/adhan/azan2.mp3",
  "https://www.islamcan.com/audio/adhan/azan1.mp3"
];

// Fajr azan is different (includes "As-salatu khayrun min an-nawm")
const fajrAzanUrl = "https://www.islamcan.com/audio/adhan/azan13.mp3";
