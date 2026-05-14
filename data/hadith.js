// ====== Hadith Collection ======
// Authentic hadiths from Bukhari, Muslim, Tirmidhi, Abu Dawud

const hadithCollection = {
  iman: [
    {
      narrator: "Abu Hurairah",
      arabic: "الْإِيمَانُ بِضْعٌ وَسَبْعُونَ شُعْبَةً",
      english: "Faith has over seventy branches, the highest of which is the declaration that there is no god but Allah, and the lowest is the removal of something harmful from the road.",
      source: "Sahih Muslim 35",
      grade: "Sahih"
    },
    {
      narrator: "Anas ibn Malik",
      arabic: "لاَ يُؤْمِنُ أَحَدُكُمْ حَتَّى يُحِبَّ لأَخِيهِ مَا يُحِبُّ لِنَفْسِهِ",
      english: "None of you truly believes until he loves for his brother what he loves for himself.",
      source: "Sahih Bukhari 13",
      grade: "Sahih"
    }
  ],
  character: [
    {
      narrator: "Abu Hurairah",
      arabic: "إِنَّ مِنْ أَكْمَلِ الْمُؤْمِنِينَ إِيمَانًا أَحْسَنُهُمْ خُلُقًا",
      english: "The most perfect of believers in faith are those with the best character.",
      source: "Jami at-Tirmidhi 1162",
      grade: "Sahih"
    },
    {
      narrator: "Abdullah ibn Amr",
      arabic: "إِنَّ خِيَارَكُمْ أَحَاسِنُكُمْ أَخْلاَقًا",
      english: "The best among you are those who have the best manners and character.",
      source: "Sahih Bukhari 3559",
      grade: "Sahih"
    },
    {
      narrator: "Abu Hurairah",
      arabic: "لَيْسَ الشَّدِيدُ بِالصُّرَعَةِ، إِنَّمَا الشَّدِيدُ الَّذِي يَمْلِكُ نَفْسَهُ عِنْدَ الْغَضَبِ",
      english: "The strong is not the one who overcomes people by his strength, but the one who controls himself while in anger.",
      source: "Sahih Bukhari 6114",
      grade: "Sahih"
    }
  ],
  prayer: [
    {
      narrator: "Jabir ibn Abdullah",
      arabic: "بَيْنَ الرَّجُلِ وَبَيْنَ الشِّرْكِ وَالْكُفْرِ تَرْكُ الصَّلاَةِ",
      english: "Between a man and disbelief is the abandonment of prayer.",
      source: "Sahih Muslim 82",
      grade: "Sahih"
    },
    {
      narrator: "Abu Hurairah",
      arabic: "أَوَّلُ مَا يُحَاسَبُ بِهِ الْعَبْدُ يَوْمَ الْقِيَامَةِ صَلاَتُهُ",
      english: "The first thing for which a person will be brought to account on the Day of Resurrection is his prayer.",
      source: "Jami at-Tirmidhi 413",
      grade: "Sahih"
    }
  ],
  knowledge: [
    {
      narrator: "Anas ibn Malik",
      arabic: "طَلَبُ الْعِلْمِ فَرِيضَةٌ عَلَى كُلِّ مُسْلِمٍ",
      english: "Seeking knowledge is an obligation upon every Muslim.",
      source: "Ibn Majah 224",
      grade: "Sahih"
    },
    {
      narrator: "Abu Hurairah",
      arabic: "مَنْ سَلَكَ طَرِيقًا يَلْتَمِسُ فِيهِ عِلْمًا سَهَّلَ اللَّهُ لَهُ بِهِ طَرِيقًا إِلَى الْجَنَّةِ",
      english: "Whoever travels a path in search of knowledge, Allah will make easy for him a path to Paradise.",
      source: "Sahih Muslim 2699",
      grade: "Sahih"
    }
  ],
  charity: [
    {
      narrator: "Abu Hurairah",
      arabic: "تَبَسُّمُكَ فِي وَجْهِ أَخِيكَ لَكَ صَدَقَةٌ",
      english: "Smiling in the face of your brother is a charity.",
      source: "Jami at-Tirmidhi 1956",
      grade: "Hasan"
    },
    {
      narrator: "Abu Hurairah",
      arabic: "مَا نَقَصَتْ صَدَقَةٌ مِنْ مَالٍ",
      english: "Charity does not decrease wealth.",
      source: "Sahih Muslim 2588",
      grade: "Sahih"
    }
  ],
  family: [
    {
      narrator: "Abu Hurairah",
      arabic: "خَيْرُكُمْ خَيْرُكُمْ لأَهْلِهِ وَأَنَا خَيْرُكُمْ لأَهْلِي",
      english: "The best of you are those who are best to their wives, and I am the best of you to my wives.",
      source: "Jami at-Tirmidhi 3895",
      grade: "Sahih"
    },
    {
      narrator: "Abu Hurairah",
      arabic: "رَغِمَ أَنْفُ ثُمَّ رَغِمَ أَنْفُ ثُمَّ رَغِمَ أَنْفُ مَنْ أَدْرَكَ أَبَوَيْهِ عِنْدَ الْكِبَرِ أَحَدَهُمَا أَوْ كِلَيْهِمَا ثُمَّ لَمْ يَدْخُلِ الْجَنَّةَ",
      english: "May he be humbled, may he be humbled, may he be humbled — the one whose parents reach old age, one or both of them, and he does not enter Paradise (by serving them).",
      source: "Sahih Muslim 2551",
      grade: "Sahih"
    }
  ]
};

const hadithCategories = [
  { key: 'iman', label: 'Faith (Iman)', icon: 'shield' },
  { key: 'character', label: 'Character & Manners', icon: 'heart' },
  { key: 'prayer', label: 'Prayer (Salah)', icon: 'mosque' },
  { key: 'knowledge', label: 'Knowledge', icon: 'book' },
  { key: 'charity', label: 'Charity', icon: 'hands' },
  { key: 'family', label: 'Family', icon: 'hands' }
];
