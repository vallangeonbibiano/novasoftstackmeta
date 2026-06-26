# novasoftstackmeta.com

> **Minimalist Design · Privacy First · Experience Above All**

An independent R&D studio based at Research Park, University of Illinois, USA. We craft minimalist, privacy-first digital products for European and American markets.

---

## 🌐 Project Structure

```
novasoftstackmeta.com/
├── index.html              # Home page
├── services.html           # Services (6 capability areas + ad platform matrix)
├── advantages.html         # Why Us (values, team, FAQ, timeline)
├── news.html               # News & insights
├── contact.html            # Contact form + studio map
├── privacy-policy.html     # 2026 Global Compliance Privacy Policy
├── terms-of-service.html   # 2026 Global Compliance Terms of Service
│
├── css/
│   ├── main.css            # Core styles, design tokens, layout
│   ├── animations.css      # 50+ animations & effects
│   └── pages.css           # Page-specific components
│
├── js/
│   ├── main.js             # Navigation, forms, scroll, FAQ
│   └── animations.js       # Particles, orbs, code typing, easter egg
│
├── images/                 # SVG assets
│   ├── logo.svg            # Primary logo (geometric N)
│   ├── favicon.svg         # Browser favicon
│   ├── apple-touch-icon.svg # iOS home screen
│   └── og-image.svg        # Social sharing image
│
├── .htaccess               # Apache config (HTTPS, caching, security)
├── app-ads.txt             # Authorized Digital Sellers (30+ ad networks)
├── robots.txt              # SEO crawler instructions
├── sitemap.xml             # XML sitemap
├── manifest.json           # PWA manifest
└── README.md               # This file
```

## ✨ Features

### Design & UX
- **Luxury minimalist aesthetic** with deep tech color palette
- **Rich animation system**: particles, orbs, code typing, marquees, magnetic buttons, tilt effects, glitch effects
- **Fully responsive**: mobile-first, 1024px+ desktop-optimized
- **Accessibility-first**: semantic HTML, ARIA labels, keyboard navigation, reduced-motion support
- **Computer science aesthetic**: monospace fonts, terminal-style elements, tech grids

### SEO & Performance
- **100% Google Search compatible**: semantic structure, JSON-LD structured data, Open Graph, Twitter Cards
- **Canonical URLs**, hreflang tags, meta descriptions, robots directives
- **Sitemap.xml + robots.txt** for proper indexing
- **Preconnect to Google Fonts** for fast typography loading
- **Deferred scripts** for non-blocking JS
- **Lazy loading** for images and heavy content
- **Caching headers** for static assets

### Compliance & Privacy
- **Privacy-first architecture**: local-first data, opt-in sync
- **2026 Global Compliance** covering:
  - EU GDPR / UK-GDPR
  - US CCPA / CPRA / VCDPA (all 50 states)
  - Brazil LGPD
  - India DPDP Act
  - Saudi PDPL
  - Canada PIPEDA
  - Japan APPI
  - EU Digital Services Act (DSA)
  - EU AI Act
- **iOS 18 + Android 15** ready
- **40+ ad networks** supported (AdMob, MAX, Meta, Pangle, etc.)
- **IAA + IAP** with detailed anti-fraud rules
- **AI content labeling** & human-in-the-loop review

### Animations
- Hero word-rise animation
- Counter animations
- Scroll-reveal triggers
- Magnetic buttons
- 3D tilt cards
- Progress bar
- Mouse glow
- Particle systems
- Network graph animation
- Easter egg: try the Konami code (↑↑↓↓←→←→)

## 🚀 Deployment

### Static Hosting (Recommended)
The site is fully static. Deploy to any of:
- **Netlify** — drag & drop the folder
- **Vercel** — `vercel --prod`
- **Cloudflare Pages** — connect git repo
- **GitHub Pages** — push to `gh-pages` branch
- **AWS S3 + CloudFront** — for enterprise scale

### Traditional Hosting
- Upload all files to web root
- Ensure `.htaccess` is supported (Apache/LiteSpeed)
- SSL certificate required (Let's Encrypt or commercial)
- Verify `mod_rewrite`, `mod_deflate`, `mod_expires`, `mod_headers` are enabled

### DNS Configuration
```
A     @               203.0.113.10   (your server IP)
A     www             203.0.113.10
AAAA  @               2001:db8::1   (if IPv6)
TXT   @               "v=spf1 -all"
```

## 📊 Ad Network Setup

To activate the ad networks in `app-ads.txt`:
1. Sign up for each network's dashboard
2. Get your publisher/ad-unit ID
3. Replace placeholder IDs (`b12d238c...`, `12345abcde...`) with real IDs
4. Validate at https://iabtechlab.com/app-ads-txt-validator/
5. Re-publish whenever you onboard a new network

## 🛠 Development

### Local Preview
```bash
# Python 3
python -m http.server 8000

# Node.js
npx http-server -p 8000

# PHP
php -S localhost:8000
```

Then open `http://localhost:8000`.

### File Editing
- **HTML**: Edit any `.html` file in your favorite editor
- **CSS**: Modifications go in `css/` — cascade-friendly architecture
- **JS**: Animations in `js/animations.js`, behavior in `js/main.js`
- **Colors/Tokens**: Edit CSS custom properties in `:root` (top of `css/main.css`)

## 🌐 Browser Support

- Chrome / Edge 90+
- Firefox 88+
- Safari 14+
- iOS Safari 14+
- Chrome Android 90+

Graceful degradation for older browsers (no fancy animations, but full functionality).

## 📜 License

© 2026 novasoftstackmeta.com. All rights reserved.

---

**Contact**: contact@novasoftstackmeta.com  
**Support**: support@novasoftstackmeta.com  
**Studio**: Research Park, University of Illinois, Champaign, IL 61820, USA
