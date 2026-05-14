// Collection of Daily Duas from Quran & Sunnah
const duasCollection = {
  morning: [
    {
      title: "Morning Remembrance (Adhkar)",
      arabic: "أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ",
      transliteration: "Asbahna wa asbahal-mulku lillah, walhamdu lillah, la ilaha illallah wahdahu la sharika lah",
      translation: "We have reached the morning and at this very time the whole kingdom belongs to Allah. All praise is for Allah. None has the right to be worshipped except Allah, alone, without partner.",
      reference: "Muslim 4/2088"
    },
    {
      title: "Dua When Waking Up",
      arabic: "الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ",
      transliteration: "Alhamdu lillahi-lladhi ahyana ba'da ma amatana wa ilayhin-nushur",
      translation: "All praise is for Allah who gave us life after having taken it from us and unto Him is the resurrection.",
      reference: "Bukhari 11/113"
    }
  ],
  evening: [
    {
      title: "Evening Remembrance",
      arabic: "أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ",
      transliteration: "Amsayna wa amsal-mulku lillah, walhamdu lillah, la ilaha illallah wahdahu la sharika lah",
      translation: "We have reached the evening and at this very time the whole kingdom belongs to Allah. All praise is for Allah.",
      reference: "Muslim 4/2088"
    },
    {
      title: "Dua Before Sleep",
      arabic: "بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا",
      transliteration: "Bismika Allahumma amutu wa ahya",
      translation: "In Your name O Allah, I die and I live.",
      reference: "Bukhari 11/113"
    }
  ],
  food: [
    {
      title: "Before Eating",
      arabic: "بِسْمِ اللَّهِ",
      transliteration: "Bismillah",
      translation: "In the name of Allah.",
      reference: "Abu Dawud 3/347"
    },
    {
      title: "After Eating",
      arabic: "الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنِي هَذَا، وَرَزَقَنِيهِ، مِنْ غَيْرِ حَوْلٍ مِنِّي وَلَا قُوَّةٍ",
      transliteration: "Alhamdu lillah-illadhi at'amani hadha, wa razaqaneehi, min ghairi hawlin minni wa la quwwah",
      translation: "All praise is for Allah who fed me this and provided it for me without any might nor power from myself.",
      reference: "Abu Dawud 4/325"
    }
  ],
  travel: [
    {
      title: "Travel Dua",
      arabic: "سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ وَإِنَّا إِلَى رَبِّنَا لَمُنْقَلِبُونَ",
      transliteration: "Subhana-lladhi sakhkhara lana hadha wa ma kunna lahu muqrineen, wa inna ila rabbina lamunqaliboon",
      translation: "Glory is to Him Who has provided this for us though we could never have had it by our efforts. Surely, unto our Lord we are returning.",
      reference: "Quran 43:13-14"
    }
  ],
  protection: [
    {
      title: "Protection from Evil",
      arabic: "أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ",
      transliteration: "A'udhu bi kalimatil-lahit-tammati min sharri ma khalaq",
      translation: "I take refuge in Allah's perfect words from the evil He has created.",
      reference: "Muslim 4/2080"
    },
    {
      title: "Morning/Evening Protection",
      arabic: "بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ",
      transliteration: "Bismillah-illadhi la yadurru ma'as-mihi shay'un fil-ardi wa la fis-samaa'i wa huwas-Samee'ul-Aleem",
      translation: "In the name of Allah with whose name nothing is harmed on earth nor in the heavens and He is The All-Hearing, The All-Knowing.",
      reference: "Abu Dawud 4/323"
    }
  ],
  forgiveness: [
    {
      title: "Master of Forgiveness (Sayyid-ul-Istighfar)",
      arabic: "اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ، أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ",
      transliteration: "Allahumma anta Rabbi la ilaha illa ant, khalaqtani wa ana 'abduk, wa ana 'ala 'ahdika wa wa'dika mas-tata't, a'udhu bika min sharri ma sana't",
      translation: "O Allah, You are my Lord, none has the right to be worshipped except You. You created me and I am Your servant. I abide to Your covenant and promise as best I can. I take refuge in You from the evil of what I have done.",
      reference: "Bukhari 7/150"
    }
  ],
  daily: [
    {
      title: "Dua for Beneficial Knowledge",
      arabic: "اللَّهُمَّ انْفَعْنِي بِمَا عَلَّمْتَنِي، وَعَلِّمْنِي مَا يَنْفَعُنِي، وَزِدْنِي عِلْماً",
      transliteration: "Allahumman-fa'ni bima 'allamtani, wa 'allimni ma yanfa'uni, wa zidni 'ilma",
      translation: "O Allah, benefit me with what You have taught me, teach me what will benefit me, and increase me in knowledge.",
      reference: "Ibn Majah 251"
    },
    {
      title: "Dua for Good in this World and Hereafter",
      arabic: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ",
      transliteration: "Rabbana atina fid-dunya hasanatan wa fil-akhirati hasanatan wa qina 'adhaban-nar",
      translation: "Our Lord, give us in this world that which is good and in the Hereafter that which is good, and protect us from the punishment of the Fire.",
      reference: "Quran 2:201"
    },
    {
      title: "Dua for Parents",
      arabic: "رَبِّ ارْحَمْهُمَا كَمَا رَبَّيَانِي صَغِيرًا",
      transliteration: "Rabbir-hamhuma kama rabbayani sagheera",
      translation: "My Lord, have mercy upon them as they brought me up [when I was] small.",
      reference: "Quran 17:24"
    }
  ]
};
