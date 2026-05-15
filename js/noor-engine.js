// ====== Noor AI Engine — Custom Local Intelligence ======
// Built by Noor-ul-Iman team. No external dependencies for local responses.

const NoorEngine = {

  /**
   * Main entry: try to answer locally. Returns null if needs external AI.
   */
  respond(userMessage) {
    const text = userMessage.toLowerCase().trim();
    if (!text) return null;

    // 1. Try knowledge base
    const knowledgeMatch = this.searchKnowledge(text);
    if (knowledgeMatch) return { type: 'knowledge', text: knowledgeMatch };

    // 2. Try Quran verse / surah lookup
    const quranMatch = this.searchQuran(text);
    if (quranMatch) return { type: 'quran', text: quranMatch };

    // 3. Try dua lookup
    const duaMatch = this.searchDua(text);
    if (duaMatch) return { type: 'dua', text: duaMatch };

    // 4. Try hadith category lookup
    const hadithMatch = this.searchHadith(text);
    if (hadithMatch) return { type: 'hadith', text: hadithMatch };

    // 5. Try 99 names lookup
    const nameMatch = this.searchAsmaUlHusna(text);
    if (nameMatch) return { type: 'name', text: nameMatch };

    // No local match — needs external AI
    return null;
  },

  /**
   * Search pre-built knowledge base
   */
  searchKnowledge(text) {
    if (!(window.noorKnowledge || (typeof noorKnowledge !== 'undefined' ? noorKnowledge : null))) return null;

    for (const category of Object.values((window.noorKnowledge || (typeof noorKnowledge !== 'undefined' ? noorKnowledge : null)))) {
      for (const item of category) {
        for (const pattern of item.patterns) {
          if (this.matches(text, pattern)) {
            return item.response;
          }
        }
      }
    }
    return null;
  },

  /**
   * Pattern matching — checks if query contains key phrase
   */
  matches(text, pattern) {
    const cleanText = text.replace(/[?.,!]/g, '').toLowerCase();
    const cleanPattern = pattern.toLowerCase();
    return cleanText.includes(cleanPattern);
  },

  /**
   * Search for surah by name/number in our Quran data
   */
  searchQuran(text) {
    // Detect "surah X" or "verse X:Y" patterns
    const verseMatch = text.match(/(?:quran|surah|verse|ayat)\s*(\d+)\s*[:\.]\s*(\d+)/i);
    if (verseMatch) {
      const surahNum = parseInt(verseMatch[1]);
      const ayahNum = parseInt(verseMatch[2]);
      return this.buildVerseResponse(surahNum, ayahNum);
    }

    // Common surah name lookups
    const surahNames = {
      'fatiha': 1, 'fateha': 1, 'opening': 1,
      'baqarah': 2, 'baqara': 2, 'cow': 2,
      'imran': 3, 'family of imran': 3,
      'nisa': 4, 'women': 4,
      'maidah': 5, 'table': 5,
      'kahf': 18, 'cave': 18,
      'maryam': 19, 'mary': 19,
      'yasin': 36, 'yaseen': 36, 'ya sin': 36, 'ya seen': 36,
      'rahman': 55,
      'waqiah': 56, 'waqia': 56,
      'mulk': 67, 'sovereignty': 67, 'kingdom': 67,
      'jinn': 72,
      'muzzammil': 73,
      'ikhlas': 112, 'sincerity': 112,
      'falaq': 113, 'daybreak': 113,
      'nas': 114, 'mankind': 114
    };

    for (const [name, num] of Object.entries(surahNames)) {
      if (text.includes('surah ' + name) || text.includes('surat ' + name) || (text.includes(name) && (text.includes('surah') || text.includes('chapter')))) {
        return this.buildSurahLink(num, name);
      }
    }

    return null;
  },

  buildSurahLink(surahNum, name) {
    return `## 📖 Surah ${name.charAt(0).toUpperCase() + name.slice(1)}\n\nThis is **Surah ${surahNum}** in the Quran. You can read it in full with translation in 36+ languages, listen to recitation by 10 reciters, and view Tafsir.\n\n👉 [**Open Surah ${surahNum} →**](quran.html)\n\nWould you like me to explain its themes or specific verses? Just ask!`;
  },

  buildVerseResponse(surahNum, ayahNum) {
    return `## 📖 Quran ${surahNum}:${ayahNum}\n\nFor the exact Arabic text, translation in your preferred language, and Tafsir of verse **${surahNum}:${ayahNum}**, please visit our [Quran page](quran.html).\n\nIf you'd like me to explain the meaning or context of this verse, just ask: *"Explain Quran ${surahNum}:${ayahNum}"*`;
  },

  /**
   * Search our dua database
   */
  searchDua(text) {
    if (!(typeof duasCollection !== 'undefined' ? duasCollection : null)) return null;

    const duaTriggers = {
      'morning': ['morning', 'subah', 'fajr'],
      'evening': ['evening', 'sham', 'maghrib'],
      'food': ['eating', 'food', 'meal', 'before eat', 'after eat'],
      'travel': ['travel', 'journey', 'safar', 'trip'],
      'protection': ['protection', 'safe', 'evil', 'shaytan', 'shaitan', 'devil'],
      'forgiveness': ['forgive', 'repent', 'tauba', 'maghfirah', 'sin'],
      'daily': ['daily', 'every day', 'general']
    };

    for (const [category, keywords] of Object.entries(duaTriggers)) {
      for (const kw of keywords) {
        if (text.includes(kw) && (text.includes('dua') || text.includes('prayer') || text.includes('supplication'))) {
          const duas = (typeof duasCollection !== 'undefined' ? duasCollection : null)[category];
          if (duas && duas.length > 0) {
            const dua = duas[0]; // First dua in category
            return this.formatDua(dua, category);
          }
        }
      }
    }
    return null;
  },

  formatDua(dua, category) {
    return `## 🤲 ${dua.title}\n\n### Arabic:\n${dua.arabic}\n\n### Transliteration:\n*${dua.transliteration}*\n\n### Translation:\n"${dua.translation}"\n\n**Reference**: ${dua.reference}\n\n📿 **More duas**: Visit [Daily Duas page](duas.html) for our complete collection.`;
  },

  /**
   * Search hadith
   */
  searchHadith(text) {
    if (!(typeof hadithCollection !== 'undefined' ? hadithCollection : null)) return null;

    const hadithTriggers = {
      'iman': ['iman', 'faith', 'belief'],
      'character': ['character', 'akhlaq', 'manners', 'kindness', 'smile'],
      'prayer': ['prayer', 'salah', 'namaz'],
      'knowledge': ['knowledge', 'ilm', 'learn'],
      'charity': ['charity', 'sadaqah', 'zakat', 'help'],
      'family': ['family', 'parent', 'mother', 'father', 'wife', 'husband']
    };

    for (const [category, keywords] of Object.entries(hadithTriggers)) {
      for (const kw of keywords) {
        if (text.includes(kw) && (text.includes('hadith') || text.includes('hadis') || text.includes('saying'))) {
          const hadiths = (typeof hadithCollection !== 'undefined' ? hadithCollection : null)[category];
          if (hadiths && hadiths.length > 0) {
            const h = hadiths[0];
            return this.formatHadith(h);
          }
        }
      }
    }
    return null;
  },

  formatHadith(h) {
    return `## 📜 Hadith\n\n*Narrated by ${h.narrator}*\n\n### Arabic:\n${h.arabic}\n\n### English:\n"${h.english}"\n\n**Source**: ${h.source} • **Grade**: ${h.grade}\n\n📚 **More hadiths**: [Visit Hadith Library](hadith.html)`;
  },

  /**
   * Search 99 Names
   */
  searchAsmaUlHusna(text) {
    if (!(typeof asmaUlHusna !== 'undefined' ? asmaUlHusna : null)) return null;

    // Check if user is asking about a specific name
    for (const name of (typeof asmaUlHusna !== 'undefined' ? asmaUlHusna : null)) {
      if (text.includes(name.trans.toLowerCase()) ||
          (name.meaning && text.toLowerCase().includes(name.meaning.toLowerCase()))) {
        return this.formatName(name);
      }
    }
    return null;
  },

  formatName(name) {
    return `## ✨ ${name.trans} (${name.num}/99)\n\n### Arabic:\n${name.arabic}\n\n### Meaning:\n**${name.meaning}**\n\nThis is name #${name.num} of Allah's 99 beautiful names.\n\n📿 **See all 99 names**: [Asma-ul-Husna page](names.html)\n\n> "And to Allah belong the best names, so invoke Him by them." — Quran 7:180`;
  }
};

window.NoorEngine = NoorEngine;
