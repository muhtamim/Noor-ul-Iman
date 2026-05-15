# 💰 Noor-ul-Iman — Monetization & Sustainability Plan

A multi-channel revenue strategy to sustain this free Islamic web app while keeping the core experience free for the Ummah.

## 🤖 NEW: AI Premium Tiers (Highest Revenue Potential)

The AI Islamic Assistant has tiered access:

| Tier | Price | Daily AI Questions | Target Audience |
|------|-------|-------------------|-----------------|
| 🌱 Free | ৳0 | 10/day | Everyone |
| ✨ Plus | ৳149/mo ($1.49) | 100/day | Casual users |
| 🌟 Pro | ৳299/mo ($2.99) | Unlimited | Power users |
| 👑 Lifetime | ৳1,999 once ($19.99) | Unlimited forever | Supporters |

### How the System Works
1. User reaches daily limit → upgrade modal appears
2. Visits `/pages/upgrade.html` → picks plan
3. Pays via bKash/Nagad/Rocket/PayPal
4. Sends payment proof via email/WhatsApp
5. Owner generates unlock code via `/code-generator.html` (local-only)
6. Owner adds hashed code to `js/ai-limits.js`, deploys
7. Owner emails plain code to customer
8. Customer enters code → unlocked forever (on that device)

### Why This Architecture Wins
- **NO backend needed** — everything runs in browser
- **Codes are SHA-256 hashed** in code (originals never visible)
- **One code = one device** (tracked in localStorage)
- **Each user pays own API costs** (Gemini free tier)
- **Owner costs: $0** — scales infinitely

### Revenue Math (AI Tier Only)
| Active users | 1% conversion to Pro | Monthly Revenue |
|---|---|---|
| 1,000 | 10 × ৳299 | ৳2,990 (~$30) |
| 10,000 | 100 × ৳299 | ৳29,900 (~$300) |
| 100,000 | 1,000 × ৳299 | ৳299,000 (~$3,000) |
| 1,000,000 | 10,000 × ৳299 | ৳2,990,000 (~$30,000) |

Plus Lifetime sales spike during Ramadan/Eid.

## 🎯 Strategy: Halal & Diverse Revenue Streams

We've intentionally built **5 separate income channels** so we're never dependent on a single source:

```
1. Donations           (~30% of target revenue)
2. Premium tier        (~30%)
3. Affiliate marketing (~20%)
4. Ethical ads         (~15%)
5. B2B / sponsorship   (~5%)
```

---

## 1️⃣ Donations (Sadaqah Jariyah Model)

**Already integrated** → `/pages/support.html`

### International
- ☕ **Buy Me a Coffee** — one-time tips, $1+
- 💙 **PayPal** — any amount, international
- 💜 **GitHub Sponsors** — recurring monthly support

### Bangladesh local
- 🇧🇩 **bKash** — send money to your number
- 🇧🇩 **Nagad** — same
- 🇧🇩 **Rocket (DBBL)** — same

### Setup Steps (for project owner)
1. Open accounts for each platform
2. Edit `data/monetization.js` and replace placeholder phone numbers + links
3. Replace `01XXXXXXXXX` in `pages/support.html` with your actual numbers

### Realistic Expectation
- 1,000 users → ~$30-80/month from organic donations
- 10,000 users → ~$200-600/month
- 100,000 users → ~$2,000-6,000/month

---

## 2️⃣ Premium Membership Tier

Already designed in `data/monetization.js` and `pages/support.html`.

### Tiers
| Tier | Price | Perks |
|------|-------|-------|
| 🌱 Supporter | $5/mo | Ad-free, badge, early access |
| ✨ Patron | $15/mo | + Premium reciters, offline Quran, cloud sync |
| 🌟 Benefactor | $50/mo | + Family accounts (5), priority support, custom theme |

### Implementation Roadmap
1. **Phase 1 (current)**: Visual UI with "Coming Soon" — collect interest
2. **Phase 2**: Integrate Stripe/LemonSqueezy for subscriptions
3. **Phase 3**: Build premium features:
   - Offline Quran downloader
   - Cloud sync (Firebase free tier initially)
   - Premium audio downloads
   - Custom themes/fonts

### Revenue Math
- 100 patrons × $15/mo = **$1,500/month** ($18k/year)
- 500 patrons × $15/mo = **$7,500/month** ($90k/year)
- Conversion rate of 0.5% from active users is realistic

---

## 3️⃣ Affiliate Marketing

Currently displayed on `/pages/support.html` with placeholder Amazon links.

### Products that convert well for Muslim audience
1. **Quran Mushaf** (premium hardcover) — 8-15% commission
2. **Prayer mats** with built-in compass — 5-10%
3. **Digital tasbih counters** — 5-10%
4. **Islamic books** (Riyad-us-Saliheen, Stories of Prophets, etc.)
5. **Islamic art / calligraphy** (Etsy affiliates) — 4-8%
6. **Modest clothing** (Hijabs, abayas, kufis)
7. **Ramadan products** (datesfood, decoration)
8. **Hajj/Umrah travel** (LuxuryHajj, Cliffs Travel) — high ticket
9. **Halal food subscriptions** (HelloFresh halal, etc.)
10. **Islamic gifts** (eid hampers, books for kids)

### Affiliate Programs to Join
- Amazon Associates (3-10% on Islamic products)
- Daraz Affiliate Bangladesh (10-20% on Islamic books)
- DigitalQuran.com partner program
- Halal-buy.com
- Quran.com partner program
- Muslim Pro affiliate

### Setup
1. Apply to Amazon Associates → wait approval
2. Update `data/monetization.js` → replace `https://amzn.to/YOUR_AFFILIATE_LINK`
3. Add `?tag=YOUR_AMAZON_TAG` to all product links
4. Disclose affiliate relationship (already shown on support page)

### Realistic Earnings
- 10k users + 6 products → ~$50-200/month
- 100k users → ~$500-2,500/month

---

## 4️⃣ Ethical Ad Network

### Important: NO ads on Quran reading pages!
- Keep Quran, prayer times, qibla, duas **100% ad-free** — these are spiritual content
- Only show ads on supplementary pages: Hadith, Learn, Live page, Names, Tasbih

### Recommended Ad Networks
1. **Google AdSense** — easiest, highest fill rate
   - Sign up at adsense.google.com
   - Add `ca-pub-XXXXXXXX` to `data/monetization.js`
   - Set `ADSENSE_ENABLED = true`
2. **EthicalAds** (ethicalads.io) — privacy-focused, no tracking
3. **Carbon Ads** — design-focused
4. **MuslimAd Network** — niche Islamic audience

### Avoid
- Ads for haram products (alcohol, gambling, dating)
- Pop-ups, interstitials interrupting reading
- Auto-play video ads
- Ads near Quranic verses (out of respect)

### Implementation (when ready)
Add to `data/monetization.js`:
```js
const ADSENSE_CLIENT_ID = 'ca-pub-1234567890';
const ADSENSE_ENABLED = true;
```

Add to `<head>` of allowed pages:
```html
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXX" crossorigin="anonymous"></script>
```

### Revenue Math
- 1,000 daily users with AdSense: ~$30-90/month
- 10,000 daily users: ~$300-900/month
- 100,000 daily users: ~$3,000-9,000/month
- RPM (revenue per 1000 views): $2-8 for Islamic niche

---

## 5️⃣ B2B / Sponsorship

### Sponsors to target
- **Islamic schools/madrasas** — banner sponsorship
- **Hajj/Umrah travel agencies** — featured listing
- **Islamic banks** (Al Rajhi, Islami Bank BD) — corporate sponsorship
- **Halal food brands** — newsletter sponsorship
- **Educational platforms** (Bayyinah, Madinah Arabic Academy) — partnership
- **Eid/Ramadan campaign sponsors** — seasonal

### Pitch Document
- Reach: X monthly active users (when grown)
- Demographics: Worldwide Muslims, 18-45, mobile-first
- Engagement: Average X minutes/session
- Cost: $200-2000/month for featured placement

---

## 📱 Mobile App (Play Store) Monetization

Convert this web app to Android via PWA wrapper (Capacitor/TWA):

### Play Store revenue streams
1. **In-app purchase** for Premium tier ($4.99/mo or $39.99/year)
2. **AdMob banner ads** on non-spiritual pages
3. **AdMob rewarded ads** for unlocking premium audio downloads
4. **Sponsored "Featured" content** (Islamic books, courses)
5. **Tap-to-Donate** prominent button

### Estimated Play Store earnings (year 1-2)
- 1,000 installs → ~$10-30/mo
- 10,000 installs → ~$80-300/mo
- 100,000 installs → ~$500-3000/mo
- 1M installs → ~$3000-15000/mo

---

## 🎯 Recommended First 6 Months Plan

### Month 1-2: Soft launch + organic growth
- ✅ Launch with free experience
- ✅ Support page with donation links (already done)
- ✅ SEO optimized for "Islamic app", "Quran online Bangla", etc.
- Track: Daily active users, retention

### Month 3-4: Monetization Phase 1
- Apply for AdSense (need 6 months of consistent traffic typically)
- Sign up for Amazon Associates + add affiliate products
- Start social media marketing (TikTok, Instagram Reels for Muslim audience)
- Track: Donation conversion, affiliate clicks

### Month 5-6: Premium tier launch
- Build offline Quran downloader
- Integrate Stripe for subscriptions
- Soft launch Premium tier ($5/mo)
- Track: Conversion rate, MRR

### After 6 months: Scale
- Localized versions (Bangla, Urdu, Indonesian) — 3x audience
- Android app via PWA wrapper
- iOS app
- B2B sponsorship outreach

---

## ⚖️ Halal Considerations

### Always Halal ✅
- Donations (Sadaqah)
- Subscriptions for premium features (clear value exchange)
- Affiliate marketing for halal products
- Sponsorship from Islamic businesses

### Be careful ⚠️
- Ads — block all haram product categories
- Crypto donations — only Bitcoin/Ethereum (Sharia scholars debate)
- Interest/Riba — never offer credit features

### Definitely Haram ❌
- Selling user data
- Tracking pixels for non-essential analytics
- Subscription that auto-renews without consent
- Misleading "premium upgrade" prompts

---

## 📊 KPI Dashboard to Track

Use these metrics to measure success:
| Metric | Target Month 6 | Target Year 1 |
|--------|----------------|---------------|
| Daily Active Users (DAU) | 1,000 | 10,000 |
| Monthly recurring donors | 20 | 200 |
| Premium subscribers | 50 | 500 |
| Affiliate clicks/month | 200 | 2,000 |
| Total Monthly Revenue | $300 | $3,000 |

---

## 🤲 Closing Du'a

> "And whatever you spend in good — it will be fully repaid to you, and you will not be wronged." — Quran 2:272

May Allah accept this work as Sadaqah Jariyah. Ameen.
