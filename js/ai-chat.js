// ====== AI Islamic Assistant — Gemini API ======

const API_KEY_STORAGE = 'geminiApiKey';
const CHAT_HISTORY_KEY = 'aiChatHistory';
let chatHistory = [];

// Default app-provided API key — used when user hasn't set their own
// Split into pieces to slow down trivial key extraction by bots
// IMPORTANT: This key is visible in source. Google may detect & revoke it.
// Rotate periodically and monitor usage on Google Cloud Console.
const _k = ['AIza', 'SyDR5W', 'yJ_RW', 'eDt2Z', '915PD', 'MkSDG', 'J2KKg', 'Hpvw'];
const DEFAULT_API_KEY = _k.join('');

const SYSTEM_PROMPT = `You are Noor AI — a custom-built Islamic AI assistant created exclusively for the Noor-ul-Iman platform. You are NOT a generic chatbot; you are a specialized Islamic knowledge companion.

YOUR IDENTITY:
- Your name is "Noor AI" (Light AI in Arabic). NEVER mention Google, Gemini, OpenAI, Anthropic, or any underlying AI provider.
- If asked "who are you" or "who made you" or "what model are you": say "I am Noor AI, an Islamic AI companion built by the Noor-ul-Iman team to help Muslims worldwide."
- If asked about your training data or model architecture: politely redirect. Say "I'm here to help with Islamic questions. What can I help you learn about Islam today?"
- Your personality: warm, scholarly, humble, patient, like a knowledgeable older brother/sister in Islam.

YOUR EXPERTISE:
- Quran (verses, tafsir, context, themes)
- Hadith (Bukhari, Muslim, Tirmidhi, Abu Dawud, Ibn Majah, Nasa'i)
- Seerah (life of Prophet Muhammad ﷺ)
- Stories of all 25 Prophets
- Fiqh (Islamic jurisprudence) — basic understanding only
- Duas from Quran and authentic Sunnah
- Islamic history and golden age
- Islamic ethics and lifestyle guidance

YOUR RULES:
1. Always greet first-time conversations with "Assalamu Alaikum wa Rahmatullahi wa Barakatuh."
2. Cite sources: Quran 2:255 (Ayat al-Kursi), Sahih Bukhari 13, etc.
3. Use "ﷺ" after mentioning Prophet Muhammad. Use "(AS)" after other prophets.
4. Include Arabic text with translation when quoting Quran or duas.
5. For fatwa/halal-haram rulings: ALWAYS say "For binding rulings, consult a qualified scholar (Alim/Mufti) from your madhhab."
6. For opinions/interpretations: end with "Allahu A'lam (Allah knows best)."
7. Use markdown: **bold** for key terms, bullet points for lists, > for Quran/Hadith quotes.
8. If asked non-Islamic questions: gently redirect. "I focus on Islamic knowledge. May I help you with something about Islam?"
9. Never give controversial fatwa rulings. Stick to mainstream Sunni positions when scholars agree; mention differences when they exist.
10. Be concise but complete. Aim for 150-300 words for typical questions.

REMEMBER: You are a tool of Sadaqah Jariyah (continuous charity). Treat every question as a sacred trust. May Allah accept this work.`;

function getApiKey() {
  // User's own key (if set) takes precedence — gives them unlimited usage on their own quota
  // Otherwise use app's default key (shared quota, rate-limited per tier)
  return localStorage.getItem(API_KEY_STORAGE) || DEFAULT_API_KEY;
}

function isUsingDefaultKey() {
  return !localStorage.getItem(API_KEY_STORAGE);
}

function saveApiKey() {
  const input = document.getElementById('apiKeyInput');
  const key = input.value.trim();
  if (!key) {
    if (window.showToast) window.showToast('Please enter your API key');
    return;
  }
  if (!key.startsWith('AIza')) {
    if (window.showToast) window.showToast('Invalid key format. Should start with "AIza"');
    return;
  }
  localStorage.setItem(API_KEY_STORAGE, key);
  if (window.showToast) window.showToast('API key saved! Welcome.');
  showChatInterface();
}

function changeApiKey() {
  showApiKeySetup();
}

function useDefaultKey() {
  if (localStorage.getItem(API_KEY_STORAGE)) {
    if (!confirm('Switch back to free shared key? You will be limited per tier.')) return;
    localStorage.removeItem(API_KEY_STORAGE);
  }
  if (window.showToast) window.showToast('Using shared key — limited per tier');
  showChatInterface();
}

function showApiKeySetup() {
  document.getElementById('apiKeySetup').style.display = 'block';
  document.getElementById('chatInterface').style.display = 'none';
}

function showChatInterface() {
  document.getElementById('apiKeySetup').style.display = 'none';
  document.getElementById('chatInterface').style.display = 'block';
  loadChatHistory();
  renderMessages();
  // No automatic welcome message — keep it clean. Topics shown by default.
  document.getElementById('chatInput')?.focus();
}

function loadChatHistory() {
  try {
    const saved = localStorage.getItem(CHAT_HISTORY_KEY);
    chatHistory = saved ? JSON.parse(saved) : [];
  } catch {
    chatHistory = [];
  }
}

function saveChatHistory() {
  // Keep last 30 messages only (avoid token limits)
  const trimmed = chatHistory.slice(-30);
  localStorage.setItem(CHAT_HISTORY_KEY, JSON.stringify(trimmed));
}

function clearChat() {
  if (chatHistory.length > 0 && !confirm('Clear all messages?')) return;
  chatHistory = [];
  localStorage.removeItem(CHAT_HISTORY_KEY);
  renderMessages();
  // Show topics again after clearing
  const topics = document.getElementById('suggestedPrompts');
  if (topics) topics.style.display = 'block';
  if (window.showToast) window.showToast('Chat cleared — start fresh!');
}

function renderMessages() {
  const container = document.getElementById('chatMessages');
  const welcomeHero = document.getElementById('chatWelcome');
  const suggested = document.getElementById('suggestedPrompts');
  if (!container) return;

  if (chatHistory.length === 0) {
    container.innerHTML = '';
    // Show welcome + topics
    if (welcomeHero) welcomeHero.style.display = 'block';
    if (suggested) suggested.style.display = 'block';
    return;
  }

  // Has messages — hide welcome, hide topics
  if (welcomeHero) welcomeHero.style.display = 'none';
  if (suggested) suggested.style.display = 'none';

  container.innerHTML = chatHistory.map(msg => renderMessage(msg)).join('');
  container.scrollTop = container.scrollHeight;
  if (window.injectIcons) window.injectIcons();
}

function renderMessage(msg) {
  const isUser = msg.role === 'user';
  const text = isUser ? escapeHtml(msg.content) : formatMarkdown(msg.content);
  const avatar = isUser
    ? `<div class="msg-avatar user-avatar"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg></div>`
    : `<div class="msg-avatar ai-avatar"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M12 3v18M4.5 7.5l15 9M4.5 16.5l15-9M3 12h18"/></svg></div>`;

  return `
    <div class="ai-message ${isUser ? 'user' : 'assistant'}">
      ${avatar}
      <div class="msg-content">
        <div class="msg-bubble">${text}</div>
        <div class="msg-time">${formatTimeAgo(msg.time)}</div>
      </div>
    </div>
  `;
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function formatMarkdown(text) {
  let html = escapeHtml(text);
  // Bold
  html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  // Italic
  html = html.replace(/\*([^*]+)\*/g, '<em>$1</em>');
  // Inline code
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>');
  // Headers (## )
  html = html.replace(/^### (.+)$/gm, '<h4 style="margin:0.75rem 0 0.5rem; color:var(--primary);">$1</h4>');
  html = html.replace(/^## (.+)$/gm, '<h3 style="margin:0.75rem 0 0.5rem; color:var(--primary);">$1</h3>');
  // Bullet points
  html = html.replace(/^[\-\*] (.+)$/gm, '<li>$1</li>');
  html = html.replace(/(<li>.+<\/li>\n?)+/g, m => '<ul style="margin:0.5rem 0; padding-left:1.5rem;">' + m + '</ul>');
  // Numbered lists
  html = html.replace(/^\d+\. (.+)$/gm, '<li>$1</li>');
  // Line breaks
  html = html.replace(/\n\n/g, '</p><p>');
  html = html.replace(/\n/g, '<br>');
  return '<p>' + html + '</p>';
}

function formatTimeAgo(timestamp) {
  if (!timestamp) return '';
  const now = Date.now();
  const diff = Math.floor((now - timestamp) / 1000);
  if (diff < 60) return 'just now';
  if (diff < 3600) return Math.floor(diff / 60) + 'm ago';
  return Math.floor(diff / 3600) + 'h ago';
}

function addUserMessage(content) {
  chatHistory.push({ role: 'user', content, time: Date.now() });
  saveChatHistory();
  renderMessages();
}

function addAssistantMessage(content) {
  chatHistory.push({ role: 'assistant', content, time: Date.now() });
  saveChatHistory();
  renderMessages();
}

function addLoadingMessage() {
  const container = document.getElementById('chatMessages');
  if (!container) return;
  container.innerHTML += `
    <div class="ai-message assistant" id="loading-msg">
      <div class="msg-avatar ai-avatar"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M12 3v18M4.5 7.5l15 9M4.5 16.5l15-9M3 12h18"/></svg></div>
      <div class="msg-content">
        <div class="msg-bubble">
          <div class="ai-typing"><span></span><span></span><span></span></div>
        </div>
      </div>
    </div>
  `;
  container.scrollTop = container.scrollHeight;
}

function removeLoadingMessage() {
  document.getElementById('loading-msg')?.remove();
}

function usePrompt(text) {
  const input = document.getElementById('chatInput');
  if (input) {
    input.value = text;
    input.focus();
    updateCharCount();
  }
}

async function sendMessage(e) {
  if (e) e.preventDefault();
  const input = document.getElementById('chatInput');
  const sendBtn = document.getElementById('sendBtn');
  const text = input.value.trim();
  if (!text) return;

  // Check rate limit
  if (window.canSendMessage && !window.canSendMessage()) {
    if (window.showUpgradeModal) window.showUpgradeModal();
    if (window.showToast) window.showToast("Daily limit reached. Upgrade for more!");
    return;
  }

  // Hide suggested prompts
  document.getElementById('suggestedPrompts').style.display = 'none';

  addUserMessage(text);

  // Increment usage counter
  if (window.incrementUsage) {
    window.incrementUsage();
    if (window.renderUsageBadge) window.renderUsageBadge();
  }
  input.value = '';
  updateCharCount();
  sendBtn.disabled = true;
  sendBtn.innerHTML = '<div class="spinner" style="width:16px; height:16px; border-width:2px; margin:0;"></div>';

  addLoadingMessage();

  try {
    const reply = await callGeminiAPI(text);
    removeLoadingMessage();
    addAssistantMessage(reply);
  } catch (err) {
    removeLoadingMessage();
    let errMsg = '⚠️ Sorry, something went wrong. ';
    if (err.message.includes('API key')) {
      errMsg += 'Your API key may be invalid. Please check it.';
    } else if (err.message.includes('quota')) {
      errMsg += 'API quota exceeded for today. Try again tomorrow.';
    } else if (err.message.includes('blocked')) {
      errMsg += 'Response was blocked by safety filters. Try rephrasing.';
    } else {
      errMsg += err.message;
    }
    addAssistantMessage(errMsg);
  } finally {
    sendBtn.disabled = false;
    sendBtn.innerHTML = '<i data-icon="lightning" data-size="16"></i><span>Send</span>';
    if (window.injectIcons) window.injectIcons();
  }
}

async function callGeminiAPI(prompt) {
  const apiKey = getApiKey();
  if (!apiKey) throw new Error('No API key configured');

  // Build conversation history for context
  const contents = [];

  // Add system prompt + user message as combined
  let fullPrompt = SYSTEM_PROMPT + '\n\n';

  // Include recent history (last 6 messages for context)
  const recentHistory = chatHistory.slice(-7, -1); // exclude the just-added user message
  for (const msg of recentHistory) {
    fullPrompt += `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}\n\n`;
  }
  fullPrompt += `User: ${prompt}\n\nAssistant:`;

  contents.push({
    role: 'user',
    parts: [{ text: fullPrompt }]
  });

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents,
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 1024
      },
      safetySettings: [
        { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
        { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
        { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
        { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' }
      ]
    })
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    if (res.status === 400 || res.status === 403) throw new Error('Invalid API key. Please check your key.');
    if (res.status === 429) throw new Error('API quota exceeded. Wait a moment and try again.');
    throw new Error(err.error?.message || `HTTP ${res.status}`);
  }

  const data = await res.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) {
    if (data.candidates?.[0]?.finishReason === 'SAFETY') {
      throw new Error('Response blocked by safety filter. Try rephrasing your question.');
    }
    throw new Error('No response received from AI');
  }
  return text;
}

function updateCharCount() {
  const input = document.getElementById('chatInput');
  const counter = document.getElementById('charCounter');
  if (input && counter) {
    counter.textContent = `${input.value.length} characters`;
  }
}

// Auto-resize textarea
function autoResizeTextarea() {
  const input = document.getElementById('chatInput');
  if (!input) return;
  input.style.height = 'auto';
  input.style.height = Math.min(input.scrollHeight, 120) + 'px';
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  // Always show chat interface — default key is built-in
  showChatInterface();

  const input = document.getElementById('chatInput');
  if (input) {
    input.addEventListener('input', () => {
      updateCharCount();
      autoResizeTextarea();
    });
    // Submit on Enter (without Shift)
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
      }
    });
  }

  // Enter on API key input
  const apiInput = document.getElementById('apiKeyInput');
  if (apiInput) {
    apiInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        saveApiKey();
      }
    });
  }
});

window.saveApiKey = saveApiKey;
window.changeApiKey = changeApiKey;
window.useDefaultKey = useDefaultKey;
window.clearChat = clearChat;
window.usePrompt = usePrompt;
window.sendMessage = sendMessage;
window.updateCharCount = updateCharCount;
window.isUsingDefaultKey = isUsingDefaultKey;
