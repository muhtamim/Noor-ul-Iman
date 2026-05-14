# 🌙 Noor-ul-Iman — Complete Islamic Web App

A modern, beautiful, and feature-rich Islamic web application for Muslims worldwide. Built with vanilla HTML, CSS, and JavaScript — no frameworks, no build step, ready to deploy.

## ✨ Features

| Feature | Description |
|---------|-------------|
| 📖 **Holy Quran** | All 114 Surahs with Arabic + English translation (via AlQuran Cloud API) |
| 🕌 **Prayer Times** | Location-based 5 daily prayer times (via Aladhan API) |
| 🧭 **Qibla Direction** | Live compass pointing to Kaaba in Makkah |
| 📿 **Digital Tasbih** | Counter with 6 dhikr options, haptic feedback, persistent state |
| 🤲 **Daily Duas** | 12+ authentic duas from Quran & Sunnah, categorized |
| ✨ **99 Names of Allah** | Complete Asma-ul-Husna with meanings and search |
| 💰 **Zakat Calculator** | 7-currency support, Nisab threshold calculation |
| 📅 **Hijri Calendar** | Today's Islamic date display |
| 🌙 **Dark Mode** | Beautiful theme toggle, persisted in localStorage |
| 📱 **Fully Responsive** | Works perfectly on mobile, tablet, desktop |

## 🚀 Quick Start

### Option 1: Open Directly
Just open `index.html` in any modern browser.

### Option 2: Local Server (recommended)
```bash
# Using Python
python3 -m http.server 8000

# Or using Node.js
npx http-server -p 8000 -o
```
Then visit `http://localhost:8000`

## 📁 Project Structure

```
Project-Alpha/
├── index.html              # Landing page
├── package.json
├── css/
│   ├── style.css           # Main styles + theme
│   └── pages.css           # Page-specific styles
├── js/
│   ├── app.js              # Global app logic (theme, clock, prayer widget)
│   ├── quran.js            # Quran browser & reader
│   ├── qibla.js            # Compass + direction calculation
│   ├── tasbih.js           # Counter logic
│   ├── duas.js             # Duas filtering & display
│   ├── names.js            # 99 names rendering
│   └── zakat.js            # Zakat calculation
├── data/
│   ├── names.js            # 99 Names of Allah data
│   └── duas.js             # Duas collection
└── pages/
    ├── quran.html
    ├── prayer.html
    ├── qibla.html
    ├── tasbih.html
    ├── duas.html
    ├── names.html
    └── zakat.html
```

## 🌐 Free APIs Used
- **Quran**: [alquran.cloud](https://alquran.cloud/api)
- **Prayer Times**: [aladhan.com](https://aladhan.com/prayer-times-api)
- **Geocoding**: [Nominatim OpenStreetMap](https://nominatim.org/)

All APIs are free, no API key required.

## 📲 Deploy to the Web (free)

### Netlify (drag & drop)
1. Visit [netlify.com/drop](https://app.netlify.com/drop)
2. Drag the entire `Project-Alpha` folder
3. Done — you get a live URL like `noor-ul-iman.netlify.app`

### Vercel
```bash
npx vercel
```

### GitHub Pages
1. Push to GitHub repo
2. Settings → Pages → Deploy from branch `main` / root

### Firebase Hosting
```bash
npm i -g firebase-tools
firebase init hosting
firebase deploy
```

## 📱 Convert to Mobile App (Play Store)

### Option 1: TWA (Trusted Web Activity) — Easiest
Use [PWABuilder](https://www.pwabuilder.com/) — upload your live URL and get a signed APK in minutes.

### Option 2: Capacitor (Recommended)
```bash
npm i -g @capacitor/cli
npm init @capacitor/app
npx cap add android
npx cap copy
npx cap open android
```
Build APK/AAB in Android Studio → upload to Play Console.

### Option 3: Cordova / WebView wrapper
Wrap with a simple Android WebView — works but less native feel.

## 💰 Monetization Strategy

### Revenue Streams
1. **Google AdMob** — Banner ads at top/bottom + Interstitial between page nav
2. **Native Sponsorships** — Hajj/Umrah agencies, Islamic charities
3. **Premium Tier** — Ad-free + offline Quran download (Google Play Billing)
4. **Affiliate** — Islamic books (Amazon/Rokomari), prayer mats, etc.

### Expected Income (Bangladesh + Global Muslim market)
| Stage | Users | Monthly Income |
|-------|-------|----------------|
| Launch (Month 1-3) | 500-2k | $10-50 |
| Growth (Month 4-12) | 10k-50k | $200-1500 |
| Scale (Year 2+) | 100k+ | $2000-10000 |

### Why this niche works
- 🌍 **1.9 billion Muslims worldwide** — massive TAM
- 📈 **Daily-use app** — high retention (5+ opens/day for prayer times)
- 💯 **Low competition** in localized markets (Bangla, Hindi, Urdu translations)
- 🎯 **High-intent users** — willing to support ad-free / premium

## 🛣️ Roadmap

### Phase 1 (Done ✅)
- [x] Quran with translation
- [x] Prayer times
- [x] Qibla compass
- [x] Tasbih
- [x] Duas
- [x] 99 Names
- [x] Zakat calculator
- [x] Dark mode

### Phase 2 (Next)
- [ ] Quran audio recitation (multiple Qaris)
- [ ] Bangla / Urdu / Hindi translations
- [ ] Bookmarks & last-read tracking
- [ ] Push notifications for prayer alerts
- [ ] Offline mode (Service Worker / PWA)
- [ ] Hadith collection (Bukhari, Muslim, etc.)

### Phase 3
- [ ] User accounts (Firebase Auth)
- [ ] Community Q&A
- [ ] Islamic events calendar
- [ ] Mosque finder (Google Maps)
- [ ] Ramadan special features (Sehri/Iftar timers)

## 🔑 Play Store Launch Checklist

- [ ] Buy Google Play Console account ($25 one-time)
- [ ] Create app icon (512x512) + feature graphic (1024x500)
- [ ] Take 4-8 screenshots (phone + tablet)
- [ ] Write app description (English + Bangla)
- [ ] Privacy Policy URL (required)
- [ ] Set up AdMob account and integrate
- [ ] Internal testing → Closed → Open → Production
- [ ] ASO: keywords like "Quran Bangla", "Namaz Time BD", "Islamic App"

## 📜 License

MIT — Free for personal and commercial use.

## 🤲 Dua

> "Our Lord, accept [this] from us. Indeed You are the All-Hearing, the All-Knowing." — Quran 2:127

Made with ❤️ for the Ummah.
