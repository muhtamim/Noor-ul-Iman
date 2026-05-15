// ====== Noor AI Knowledge Base ======
// Pre-built responses for common queries — instant, free, no API needed

const noorKnowledge = {

  // ===== Identity Q&A =====
  identity: [
    {
      patterns: ['who are you', 'what are you', 'what is your name', 'introduce yourself', 'tell me about yourself', 'tumi ke', 'apnar nam ki'],
      response: `Wa Alaikumus Salam wa Rahmatullahi wa Barakatuh! 🌙\n\nI am **Noor AI** — an Islamic knowledge companion built specifically for the Noor-ul-Iman platform. I was created by the Noor-ul-Iman team to help Muslims worldwide with questions about:\n\n- **Quran** (verses, tafsir, themes)\n- **Hadith** (Bukhari, Muslim, Tirmidhi & more)\n- **Duas** from Quran and authentic Sunnah\n- **Prayer & Worship** guidance\n- **Stories of Prophets** (AS)\n- **Islamic history, ethics, and lifestyle**\n\nFor binding fiqh rulings (fatwa), please consult a qualified scholar from your madhhab.\n\nHow can I help you in your spiritual journey today?`
    },
    {
      patterns: ['who made you', 'who created you', 'who built you', 'who is your creator', 'tumi ke baniyeche'],
      response: `I was built by the **Noor-ul-Iman team** as a Sadaqah Jariyah (continuous charity) for the Ummah. My mission is to make authentic Islamic knowledge accessible to every Muslim — in their own language, at their own pace, completely free.\n\nMay Allah accept this work. Ameen 🤲`
    },
    {
      patterns: ['what model', 'what ai', 'are you chatgpt', 'are you gemini', 'are you claude', 'are you openai', 'are you google', 'what technology'],
      response: `I am **Noor AI v1.0** — a custom Islamic AI built by the Noor-ul-Iman team using a hybrid intelligence system: a local knowledge engine for instant responses + advanced AI for deeper conversations.\n\nBut more importantly — let's focus on what brings us together! What would you like to learn about Islam today? 🌙`
    }
  ],

  // ===== Greetings =====
  greetings: [
    {
      patterns: ['salam', 'assalamu alaikum', 'assalam', 'as-salam', 'asalamualaikum', 'hello', 'hi', 'hey'],
      response: `**Wa Alaikumus Salam wa Rahmatullahi wa Barakatuh** 🌙\n\nWelcome! May Allah bless your day. I'm Noor AI, here to help you with anything about Islam — Quran, Hadith, prayers, duas, or any spiritual question on your heart.\n\nWhat brings you here today?`
    },
    {
      patterns: ['thanks', 'thank you', 'jazakallah', 'shukran', 'dhonnobad'],
      response: `**JazakAllahu Khayran** (May Allah reward you with goodness) for using Noor AI! 🌟\n\nIf you found this helpful, please:\n- Share Noor AI with other Muslims (Sadaqah Jariyah)\n- Make du'a for those who built it\n\nIs there anything else I can help you with today?`
    }
  ],

  // ===== 5 Pillars of Islam =====
  pillars: [
    {
      patterns: ['5 pillars', 'five pillars', 'pillars of islam', 'arkan al islam'],
      response: `## The 5 Pillars of Islam (أركان الإسلام)\n\nThese are the foundations every Muslim must observe:\n\n### 1️⃣ **Shahada (Declaration of Faith)** 🕋\n*"La ilaha illa Allah, Muhammadur Rasulullah"*\n"There is no god but Allah, and Muhammad ﷺ is His Messenger."\n\n### 2️⃣ **Salah (Prayer)** 🕌\nPraying 5 times daily: Fajr, Dhuhr, Asr, Maghrib, Isha.\n\n### 3️⃣ **Zakat (Charity)** 💰\nGiving 2.5% of wealth annually to those in need (above Nisab threshold).\n\n### 4️⃣ **Sawm (Fasting in Ramadan)** 🌙\nFasting from dawn to sunset during the holy month of Ramadan.\n\n### 5️⃣ **Hajj (Pilgrimage)** 🕋\nVisiting Makkah at least once if physically and financially able.\n\n> "Indeed, Allah is with the patient" — Quran 2:153\n\nWhich pillar would you like to learn more about?`
    }
  ],

  // ===== 6 Articles of Faith =====
  articles_faith: [
    {
      patterns: ['articles of faith', 'iman', '6 articles', 'six articles', 'beliefs of islam', 'arkan al iman'],
      response: `## The 6 Articles of Faith (أركان الإيمان)\n\nThese are the core beliefs of every Muslim:\n\n1. **Belief in Allah** — One God, no partners, no equals\n2. **Belief in the Angels** — Jibreel, Mikail, Israfil, Azrael, etc.\n3. **Belief in the Holy Books** — Quran, Torah, Injil (Gospel), Zabur (Psalms)\n4. **Belief in the Prophets** — 25 mentioned in Quran, ending with Muhammad ﷺ\n5. **Belief in the Last Day** — Resurrection, Judgment, Paradise & Hell\n6. **Belief in Qadar (Divine Decree)** — Allah's knowledge & decree over all things\n\n> "The Messenger ﷺ has believed in what was revealed to him from his Lord, and so have the believers." — Quran 2:285`
    }
  ],

  // ===== Common Duas =====
  duas_common: [
    {
      patterns: ['dua for travel', 'travel dua', 'dua before journey', 'safar dua'],
      response: `## 🕋 Dua for Travel\n\n**Arabic:**\n> سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ وَإِنَّا إِلَى رَبِّنَا لَمُنْقَلِبُونَ\n\n**Transliteration:**\n*Subhana-lladhi sakhkhara lana hadha wa ma kunna lahu muqrineen, wa inna ila rabbina lamunqaliboon*\n\n**Translation:**\n"Glory be to Him Who has subjected this (transport) to us, and we could not have done it. And surely to our Lord we are returning."\n\n— Quran 43:13-14\n\nMay Allah grant you safe journey! 🤲`
    },
    {
      patterns: ['dua before eating', 'eating dua', 'bismillah dua'],
      response: `## 🍽️ Dua Before Eating\n\n**Arabic:** بِسْمِ اللَّهِ\n**Bismillah** — "In the name of Allah"\n\nIf you forget at the start: بِسْمِ اللَّهِ أَوَّلَهُ وَآخِرَهُ\n*"Bismillahi awwalahu wa akhirahu"* — "In Allah's name, at its start and end"\n\n## After Eating:\n**Arabic:** الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنِي هَذَا وَرَزَقَنِيهِ مِنْ غَيْرِ حَوْلٍ مِنِّي وَلَا قُوَّةٍ\n*"Alhamdu lillahi-lladhi at'amani hadha wa razaqaneehi min ghairi hawlin minni wa la quwwah"*\n"All praise to Allah who fed me this and provided it for me without any might or power from me."\n\n— Abu Dawud 4023`
    },
    {
      patterns: ['dua for anxiety', 'anxiety dua', 'worry dua', 'stress dua', 'dua for stress', 'depression dua'],
      response: `## 🤲 Dua for Anxiety, Worry & Distress\n\nThe Prophet ﷺ taught:\n\n**Arabic:**\n> اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ، وَالْعَجْزِ وَالْكَسَلِ، وَالْبُخْلِ وَالْجُبْنِ، وَضَلَعِ الدَّيْنِ وَغَلَبَةِ الرِّجَالِ\n\n**Transliteration:**\n*Allahumma inni a'udhu bika minal-hammi wal-hazan, wal-'ajzi wal-kasal, wal-bukhli wal-jubn, wa dala'ad-dayni wa ghalabatir-rijal*\n\n**Translation:**\n"O Allah, I seek refuge in You from anxiety and sorrow, weakness and laziness, miserliness and cowardice, the burden of debts and from being overpowered by men."\n\n— Sahih Bukhari 6369\n\n### Additional powerful dua:\n*"Hasbunallahu wa ni'mal wakeel"* — "Allah is sufficient for us, and He is the best disposer of affairs." (Quran 3:173)\n\nRecite these and trust in Allah — He hears every cry of the heart. 🤍`
    },
    {
      patterns: ['dua for parents', 'dua mother', 'dua father', 'parents dua'],
      response: `## 🤲 Dua for Parents\n\n**Quranic Dua:**\n> رَبِّ ارْحَمْهُمَا كَمَا رَبَّيَانِي صَغِيرًا\n*"Rabbir-hamhuma kama rabbayani sagheera"*\n"My Lord, have mercy upon them as they brought me up [when I was] small."\n\n— Quran 17:24\n\n### Extended dua:\n> رَبِّ اغْفِرْ لِي وَلِوَالِدَيَّ وَلِلْمُؤْمِنِينَ يَوْمَ يَقُومُ الْحِسَابُ\n*"Rabbighfir li wa li-walidayya wa lil-mu'mineena yawma yaqumul-hisab"*\n"Our Lord! Forgive me, my parents, and the believers on the Day when the reckoning will take place." — Quran 14:41\n\n> "Whoever prays for his parents' forgiveness after their death, will be raised in rank in Paradise." — Ibn Majah 3660`
    }
  ],

  // ===== Prayer / Salah =====
  prayer: [
    {
      patterns: ['how to pray', 'how to do salah', 'salah steps', 'how perform salah', 'namaz steps'],
      response: `## 🕌 How to Perform Salah (Prayer)\n\n### Before Praying:\n1. Perform **Wudu** (ablution)\n2. Face **Qibla** (direction of Kaaba)\n3. Make **niyyah** (intention) silently in your heart\n\n### Steps of 2-Rakat Prayer:\n\n**Rakat 1:**\n1. Raise hands to ears: "Allahu Akbar" (Takbir)\n2. Place right hand over left on chest/below navel\n3. Recite **Surah Al-Fatiha**\n4. Recite a short surah (e.g., Al-Ikhlas)\n5. **Ruku** (bow): "Subhana Rabbiyal Azeem" × 3\n6. Rise: "Sami'Allahu liman hamidah, Rabbana lakal hamd"\n7. **Sujood** (prostration): "Subhana Rabbiyal A'la" × 3\n8. Sit briefly\n9. Second sujood\n\n**Rakat 2:** Same as Rakat 1, but after final sujood:\n- Sit for **Tashahhud** + **Salawat** (durood)\n- End with **Salam** to right + left: "Assalamu alaikum wa rahmatullah"\n\n### Daily Prayers:\n- Fajr (2), Dhuhr (4), Asr (4), Maghrib (3), Isha (4) rakats\n\n📌 **Tip**: Use our [Prayer Times page](prayer.html) for accurate times in your location!`
    },
    {
      patterns: ['wudu', 'ablution', 'how to do wudu'],
      response: `## 💧 How to Perform Wudu (Ablution)\n\n### Before Starting:\n- Say **"Bismillah"** (in the name of Allah)\n- Make intention silently\n\n### Steps:\n\n1. **Wash hands** 3 times (up to wrists)\n2. **Rinse mouth** 3 times (madmadah)\n3. **Sniff water** into nose 3 times, blow out (istinshaaq + istinthaar)\n4. **Wash face** 3 times (ear to ear, hairline to chin)\n5. **Wash arms** 3 times (right first, then left, up to elbows)\n6. **Wipe head** once (mas'h) — wet hands over hair, then ears\n7. **Wash feet** 3 times (right first, then left, up to ankles)\n\n### After Wudu:\n*"Ash-hadu an la ilaha illallah, wa ash-hadu anna Muhammadan abduhu wa rasuluh"*\n\n### What Invalidates Wudu:\n- Using the bathroom\n- Passing wind\n- Deep sleep\n- Bleeding/discharge\n- Loss of consciousness\n- Touching private parts (Shafi'i view)\n\n> "Whoever performs wudu in the way I have, his past sins will be forgiven." — Sahih Bukhari`
    }
  ],

  // ===== Quran Knowledge =====
  quran_basics: [
    {
      patterns: ['what is quran', 'about quran', 'quran info', 'quran overview'],
      response: `## 📖 About the Holy Quran\n\nThe Quran is the eternal word of Allah, revealed to Prophet Muhammad ﷺ over 23 years (610-632 CE) through Angel Jibreel (Gabriel).\n\n### Key Facts:\n- **114 Surahs** (chapters)\n- **6,236 Ayahs** (verses)\n- **30 Juz** (parts) for daily reading\n- **First revealed**: in Cave Hira, Makkah (610 CE)\n- **Final revelation**: completed in Madinah\n- **Language**: Arabic (preserved unchanged for 1400+ years)\n\n### Why It's Special:\n- The ONLY religious book preserved word-for-word in its original language\n- A miracle (mu'jiza) that mankind cannot replicate\n- Source of all Islamic guidance\n- Recited in Salah by every Muslim daily\n\n### Where to Start:\n- **First Surah**: Al-Fatiha (The Opening) — recited in every prayer\n- **Short Surahs**: Al-Ikhlas (112), Al-Falaq (113), An-Nas (114)\n- **Most beloved**: Surah Yasin (heart of Quran)\n\n📚 **Read it now**: Visit our [Quran page](quran.html) — all 114 surahs in 36+ languages!`
    },
    {
      patterns: ['ayatul kursi', 'ayat al kursi', 'ayat ul kursi', 'throne verse'],
      response: `## ⭐ Ayat al-Kursi — The Throne Verse\n\n**Surah Al-Baqarah, Verse 255 (Quran 2:255)**\n\n### Arabic:\n> اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَّهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ ۗ مَن ذَا الَّذِي يَشْفَعُ عِندَهُ إِلَّا بِإِذْنِهِ ۚ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ ۖ وَلَا يُحِيطُونَ بِشَيْءٍ مِّنْ عِلْمِهِ إِلَّا بِمَا شَاءَ ۚ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ ۖ وَلَا يَئُودُهُ حِفْظُهُمَا ۚ وَهُوَ الْعَلِيُّ الْعَظِيمُ\n\n### Translation:\n"Allah! There is no god but He, the Living, the Self-Sustaining. Neither slumber nor sleep overtakes Him. To Him belongs whatever is in the heavens and the earth. Who can intercede with Him except by His permission? He knows what is before them and what is behind them, and they encompass nothing of His knowledge except what He wills. His Throne extends over the heavens and the earth, and their preservation tires Him not. And He is the Most High, the Most Great."\n\n### Virtues:\n- **Greatest verse** in the Quran (Sahih Muslim 810)\n- Reciting after every prayer → nothing prevents entering Paradise except death\n- Reciting before sleep → protection until morning (Sahih Bukhari 2311)\n\nMemorize it — one of the most powerful verses of protection. 🛡️`
    }
  ],

  // ===== Pillars Detail =====
  ramadan_info: [
    {
      patterns: ['what is ramadan', 'ramadan about', 'ramadan info', 'why ramadan'],
      response: `## 🌙 Ramadan — The Holy Month\n\nRamadan is the **9th month** of the Islamic calendar — a month of fasting, prayer, reflection, and community for Muslims worldwide.\n\n### Key Facts:\n- **Duration**: 29 or 30 days (depends on moon)\n- **Fasting**: From Fajr (dawn) to Maghrib (sunset)\n- **Quran**: Revealed during Ramadan (Quran 2:185)\n- **Laylat al-Qadr**: Night of Power — better than 1000 months\n\n### What's Forbidden During Fast:\n- Eating, drinking (even water)\n- Smoking\n- Marital relations\n- Bad behavior (gossip, anger, lies)\n\n### Special Practices:\n- **Sehri (Suhoor)**: Pre-dawn meal\n- **Iftar**: Breaking fast at sunset (start with dates!)\n- **Taraweeh**: Special night prayers\n- **Itikaf**: Last 10 days seclusion in mosque\n- **Increased charity, Quran recitation, dua**\n\n### Rewards:\n- Sins forgiven (with sincere fasting)\n- Doors of Paradise opened\n- Doors of Hellfire closed\n- Devils chained\n\n> "Whoever fasts Ramadan out of faith and seeking reward, his past sins will be forgiven." — Sahih Bukhari 38\n\n📅 **See our Ramadan calendar** for Sehri/Iftar times in your location!`
    }
  ],

  // ===== Names of Allah =====
  asma_husna: [
    {
      patterns: ['99 names', '99 names of allah', 'asma ul husna', 'beautiful names', 'names of allah'],
      response: `## ✨ Asma-ul-Husna — The 99 Beautiful Names of Allah\n\nAllah has 99 most beautiful names mentioned in the Quran. Whoever memorizes them enters Paradise.\n\n> "And to Allah belong the best names, so invoke Him by them." — Quran 7:180\n\n### Top 10 Names Every Muslim Should Know:\n\n1. **الرَّحْمَنُ** (Ar-Rahman) — The Most Gracious\n2. **الرَّحِيمُ** (Ar-Raheem) — The Most Merciful\n3. **الْمَلِكُ** (Al-Malik) — The King\n4. **الْقُدُّوسُ** (Al-Quddus) — The Most Holy\n5. **السَّلَامُ** (As-Salam) — The Source of Peace\n6. **الْعَزِيزُ** (Al-Aziz) — The Almighty\n7. **الْغَفُورُ** (Al-Ghafur) — The Forgiving\n8. **الرَّزَّاقُ** (Ar-Razzaq) — The Provider\n9. **الْحَكِيمُ** (Al-Hakim) — The All-Wise\n10. **الْوَدُودُ** (Al-Wadud) — The Most Loving\n\n📚 **See all 99 names** with meanings on our [Asma-ul-Husna page](names.html)`
    }
  ],

  // ===== Fasting Etiquette =====
  fasting: [
    {
      patterns: ['what breaks fast', 'things that break fast', 'fast invalidators', 'roza vangar karon'],
      response: `## ❌ Things That Break Your Fast\n\n### Major Invalidators:\n1. **Eating or drinking intentionally**\n2. **Smoking** (including vaping)\n3. **Marital relations** (sexual intercourse)\n4. **Intentional vomiting**\n5. **Menstrual or postnatal bleeding** (women)\n6. **Renouncing Islam** (apostasy)\n\n### Things That DON'T Break Fast (common misconceptions):\n- Forgetfully eating/drinking — fast valid, continue\n- Unintentional vomiting\n- Brushing teeth (carefully, no swallowing toothpaste)\n- Smelling food/perfume\n- Donating blood (some scholars say minor)\n- Swimming/bathing (don't swallow water)\n- Tasting food on tongue tip (without swallowing)\n- Wet dream (no choice)\n\n### Makruh (Disliked) During Fast:\n- Excessive chewing gum\n- Tasting food unnecessarily\n- Arguing or bad language\n- Backbiting / gossip\n\n> "Whoever does not abandon false speech and acting upon it, Allah has no need for him to leave his food and drink." — Sahih Bukhari 1903\n\nKeep your fast spiritually pure! 🌙`
    }
  ]
};

// ===== Greeting / Goodbye triggers =====
const noorTriggers = {
  newConversation: [
    'salam', 'assalamu alaikum', 'asalamualaikum', 'hello', 'hi', 'hey', 'start'
  ]
};

window.noorKnowledge = noorKnowledge;
