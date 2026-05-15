// ====== AI Topic Browser + Voice Input ======

const aiTopics = {
  popular: [
    { icon: '⭐', q: 'Explain Surah Al-Fatihah verse by verse', desc: 'Understand the opening chapter' },
    { icon: '🤲', q: 'I am feeling anxious. Find me a powerful dua from Sunnah', desc: 'Get a personalized dua' },
    { icon: '🕌', q: 'How to perform Salah step by step for beginners', desc: 'Complete prayer guide' },
    { icon: '🌙', q: 'What is special about Laylat al-Qadr and how to find it?', desc: 'Night of Power explained' },
    { icon: '📖', q: 'What does the Quran say about kindness to parents?', desc: 'Quranic teachings on parents' },
    { icon: '✨', q: 'Tell me about the 5 pillars of Islam in detail', desc: 'Foundations of faith' }
  ],
  quran: [
    { icon: '📖', q: 'Explain Ayat al-Kursi (Quran 2:255) and its virtues', desc: 'The Throne Verse' },
    { icon: '🌟', q: 'Summarize Surah Yasin and explain why it is called the heart of Quran', desc: 'Heart of the Quran' },
    { icon: '🌅', q: 'Explain Surah Al-Mulk and its protection benefits', desc: 'Surah of protection' },
    { icon: '🕊️', q: 'What are the most beautiful Quran verses about Allah\'s mercy?', desc: 'Mercy of Allah' },
    { icon: '🧠', q: 'Quran verses about gaining knowledge and wisdom', desc: 'Knowledge in Quran' },
    { icon: '💎', q: 'List the shortest surahs to memorize first', desc: 'Easy memorization' }
  ],
  prayer: [
    { icon: '🕌', q: 'Complete step-by-step guide to performing Salah for beginners', desc: 'Beginner prayer guide' },
    { icon: '💧', q: 'How to perform Wudu correctly with all conditions', desc: 'Ablution guide' },
    { icon: '🌅', q: 'What is Tahajjud prayer and how to perform it?', desc: 'Night prayer' },
    { icon: '🤲', q: 'What duas to recite after Salah?', desc: 'Post-prayer duas' },
    { icon: '⏰', q: 'What to do if I miss a prayer (Qada Salah)?', desc: 'Missed prayer rulings' },
    { icon: '🧎', q: 'Difference between Sunnah, Fard, Nafl prayers explained', desc: 'Types of prayers' }
  ],
  dua: [
    { icon: '😰', q: 'I am feeling depressed and hopeless. Find me a strong dua', desc: 'Dua for depression' },
    { icon: '💼', q: 'Dua for success in job interview and exams', desc: 'Success duas' },
    { icon: '💕', q: 'Dua for a righteous spouse and happy marriage', desc: 'Marriage duas' },
    { icon: '👨‍👩‍👧', q: 'Dua for parents — for their guidance, health, and forgiveness', desc: 'Duas for parents' },
    { icon: '✈️', q: 'Duas for traveling and protection during journey', desc: 'Travel duas' },
    { icon: '😌', q: 'Morning and evening duas (azkar) from authentic sunnah', desc: 'Daily azkar' }
  ],
  hadith: [
    { icon: '😊', q: 'Top 10 hadiths about smiling and kindness', desc: 'Hadiths on kindness' },
    { icon: '🤝', q: 'Hadiths about respecting parents and rights of family', desc: 'Family hadiths' },
    { icon: '💰', q: 'Hadiths about earning halal income and avoiding interest (riba)', desc: 'Hadiths on wealth' },
    { icon: '🧡', q: 'Hadiths about being merciful to animals and creatures', desc: 'Animal rights' },
    { icon: '🎓', q: 'Hadiths about seeking knowledge and education', desc: 'Knowledge hadiths' },
    { icon: '⚖️', q: 'Hadiths about controlling anger and patience', desc: 'Anger management' }
  ],
  fiqh: [
    { icon: '🚰', q: 'What invalidates wudu? Complete list', desc: 'Wudu invalidators' },
    { icon: '🍖', q: 'What foods are halal and haram in Islam?', desc: 'Halal & haram food' },
    { icon: '💍', q: 'Islamic marriage (Nikah) requirements and process', desc: 'Marriage rules' },
    { icon: '💰', q: 'Zakat calculation rules and who is eligible to receive', desc: 'Zakat fiqh' },
    { icon: '🌗', q: 'When is Hajj obligatory and complete pilgrimage steps', desc: 'Hajj guide' },
    { icon: '📿', q: 'Difference between Sunnah Mu\'akkadah and Ghair Mu\'akkadah', desc: 'Sunnah types' }
  ],
  prophets: [
    { icon: '👤', q: 'Tell me the complete story of Prophet Muhammad ﷺ\'s childhood', desc: 'Prophet\'s early life' },
    { icon: '🌊', q: 'Story of Prophet Nuh (Noah) and the great flood', desc: 'Story of Nuh AS' },
    { icon: '👶', q: 'Story of Prophet Ibrahim sacrificing his son', desc: 'Story of Ibrahim AS' },
    { icon: '🐟', q: 'Story of Prophet Yunus (Jonah) and the whale', desc: 'Story of Yunus AS' },
    { icon: '💪', q: 'How Prophet Musa parted the sea — full story', desc: 'Musa and Pharaoh' },
    { icon: '⭐', q: 'Stories of all 25 prophets mentioned in the Quran', desc: 'All prophets' }
  ],
  ramadan: [
    { icon: '🌙', q: 'What are the rewards of fasting in Ramadan?', desc: 'Ramadan rewards' },
    { icon: '🍽️', q: 'Suhoor (Sehri) and Iftar etiquette and duas', desc: 'Fasting etiquette' },
    { icon: '🕯️', q: 'How to perform Taraweeh prayer properly', desc: 'Taraweeh guide' },
    { icon: '⏳', q: 'Things that break the fast vs things that don\'t', desc: 'Fast invalidators' },
    { icon: '🌟', q: 'How to find Laylat al-Qadr in the last 10 nights', desc: 'Find Night of Power' },
    { icon: '🎁', q: 'What is Eid al-Fitr and how to celebrate it Islamically', desc: 'Eid celebration' }
  ],
  lifestyle: [
    { icon: '💼', q: 'Islamic guidance on choosing a career and earning halal', desc: 'Career advice' },
    { icon: '💕', q: 'How Islam views love and marriage in modern times', desc: 'Love in Islam' },
    { icon: '📱', q: 'Is social media usage allowed in Islam? Rules and limits', desc: 'Social media' },
    { icon: '🎵', q: 'What does Islam say about music — different scholarly views', desc: 'Music in Islam' },
    { icon: '👗', q: 'Islamic modesty (hijab) rules for men and women', desc: 'Modesty rules' },
    { icon: '🧘', q: 'How to maintain spiritual discipline in busy modern life', desc: 'Spiritual life' }
  ]
};

let currentTopicCat = 'popular';

function renderTopics() {
  const container = document.getElementById('topicQuestions');
  if (!container) return;
  const topics = aiTopics[currentTopicCat] || aiTopics.popular;
  container.innerHTML = topics.map(t => `
    <button class="topic-question" onclick="usePrompt(\`${escapeForAttr(t.q)}\`)">
      <div class="topic-q-icon">${t.icon}</div>
      <div class="topic-q-body">
        <div class="topic-q-text">${t.q}</div>
        <div class="topic-q-desc">${t.desc}</div>
      </div>
      <div class="topic-q-arrow">→</div>
    </button>
  `).join('');
  if (window.injectIcons) window.injectIcons();
}

function escapeForAttr(s) {
  return s.replace(/`/g, "'").replace(/\\/g, '\\\\').replace(/\$/g, '\\$');
}

function filterTopics(cat) {
  currentTopicCat = cat;
  document.querySelectorAll('.topic-category').forEach(b => {
    b.classList.toggle('active', b.dataset.cat === cat);
  });
  renderTopics();
}

// ====== Voice Input (Web Speech API) ======
let recognition = null;
let isListening = false;

function initVoiceInput() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    // Voice not supported — hide button
    const btn = document.getElementById('voiceBtn');
    if (btn) btn.style.display = 'none';
    return;
  }
  recognition = new SpeechRecognition();
  recognition.continuous = false;
  recognition.interimResults = true;
  recognition.lang = 'en-US';

  recognition.onstart = () => {
    isListening = true;
    const btn = document.getElementById('voiceBtn');
    if (btn) btn.classList.add('listening');
    if (window.showToast) window.showToast('🎤 Listening... speak now');
  };

  recognition.onresult = (e) => {
    const transcript = Array.from(e.results)
      .map(r => r[0].transcript)
      .join('');
    const input = document.getElementById('chatInput');
    if (input) {
      input.value = transcript;
      if (window.updateCharCount) window.updateCharCount();
    }
  };

  recognition.onerror = (e) => {
    isListening = false;
    document.getElementById('voiceBtn')?.classList.remove('listening');
    let msg = 'Voice input error';
    if (e.error === 'not-allowed') msg = '🎤 Microphone access denied';
    else if (e.error === 'no-speech') msg = '🎤 No speech detected — try again';
    else if (e.error === 'network') msg = '🌐 Network error — check connection';
    if (window.showToast) window.showToast(msg);
  };

  recognition.onend = () => {
    isListening = false;
    document.getElementById('voiceBtn')?.classList.remove('listening');
    // Auto-send if there's text
    const input = document.getElementById('chatInput');
    if (input?.value?.trim().length > 5) {
      setTimeout(() => {
        if (window.showToast) window.showToast('✅ Got it! Press Send or wait...');
      }, 200);
    }
  };
}

function toggleVoiceInput() {
  if (!recognition) {
    if (window.showToast) window.showToast('Voice input not supported in your browser');
    return;
  }
  if (isListening) {
    recognition.stop();
  } else {
    try {
      recognition.start();
    } catch (e) {
      if (window.showToast) window.showToast('Click again to start recording');
    }
  }
}

// Init on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  // Wait a tick for other scripts
  setTimeout(() => {
    renderTopics();
    initVoiceInput();
  }, 100);
});

window.filterTopics = filterTopics;
window.toggleVoiceInput = toggleVoiceInput;
window.renderTopics = renderTopics;
