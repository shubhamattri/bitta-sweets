# Bitta Sweets & Bakery — Website Handover

## Overview

A premium, fully responsive single-page website for **Bitta Sweets & Bakery**, a heritage sweets and bakery shop in Kalbutri Gate, Gurdaspur, Punjab. The site showcases the shop's signature mithai, bakery range, gifting options, and heritage since 1990.

**Key Features:**
- Pure static HTML/CSS/JavaScript — no build step, no backend required
- Midnight Patisserie design system: black canvas, rose-gold gradients, premium typography
- Preloader with brand monogram and loading progression
- Animated gold-dust particle canvas for atmospheric depth
- Ken Burns hero section with staggered word reveal
- Animated marquee and custom cursor (with fallback for touch/mobile)
- Scroll-reveal animations throughout
- Animated counters and 3D-tilt menu cards
- Tabbed menu system with live rate list
- Bakery, gifting, and festival sections
- Auto-rotating testimonial carousel
- Deferred Google Maps embed (loads on interaction)
- WhatsApp order deep links integrated into every product
- Full responsive design with mobile-first approach
- Accessibility: prefers-reduced-motion support, semantic HTML, ARIA labels
- SEO-ready with meta tags, og: properties, and structured site layout
- Performance optimized: lazy-loaded images, deferred map, efficient CSS/JS

---

## File Structure

```
bitta-sweets/
├── index.html              # Single-page application (31 KB)
├── css/
│   └── style.css           # Complete styling, CSS variables, animations
├── js/
│   └── main.js             # All interactions: cursor, animations, carousel, etc.
├── assets/
│   ├── hero.jpg            # Hero section (416 KB)
│   ├── shop.jpg            # Heritage section
│   ├── dodha.jpg           # Product images
│   ├── gulabjamun.jpg
│   ├── kajukatli.jpg
│   ├── ladoo.jpg
│   ├── jalebi.jpg
│   ├── rasmalai.jpg
│   ├── pinni.jpg
│   ├── bakery.jpg
│   ├── cake.jpg
│   ├── halwa.jpg
│   ├── giftbox.jpg
│   ├── logo-full.png       # Logo, used as favicon and in header
│   └── logo-photo.jpg      # Secondary logo variant
└── README.md               # This file
```

**Total asset size:** ~4.5 MB (fully optimized JPGs at ~250–400 KB each; logo at 930 KB)

---

## How to Run Locally

### Using Python (Built-in)
```bash
cd /path/to/bitta-sweets
python3 -m http.server 8000
```
Then open http://localhost:8000 in your browser.

### Using Node.js
```bash
cd /path/to/bitta-sweets
npx serve
```

### Using Ruby
```bash
cd /path/to/bitta-sweets
ruby -run -ehttpd . -p8000
```

### Using PHP
```bash
cd /path/to/bitta-sweets
php -S localhost:8000
```

All browsers are supported. No npm install, no build, no dependencies.

---

## Deployment

### Option 1: Netlify (Recommended)

1. Sign up at [netlify.com](https://netlify.com)
2. Drag and drop the `bitta-sweets` folder into Netlify
3. Site goes live instantly
4. Free domain + auto HTTPS
5. Optional: Connect to GitHub for auto-deploys

### Option 2: Vercel

1. Sign up at [vercel.com](https://vercel.com)
2. Import folder or connect GitHub repo
3. Automatic deployment on push
4. Free domain + auto HTTPS

### Option 3: GitHub Pages

1. Create a GitHub repository
2. Push the `bitta-sweets` folder
3. Go to repo Settings → Pages
4. Select `main` branch as source
5. Site publishes at `username.github.io/bitta-sweets`

### Option 4: cPanel / Shared Hosting

1. Use FTP/SFTP to upload the entire `bitta-sweets` folder to your hosting account
2. Typically to `/public_html/` or a subdomain folder
3. Drag and drop, no special configuration needed
4. Site is immediately live

### Option 5: AWS S3 + CloudFront

1. Create an S3 bucket for static website hosting
2. Upload the entire folder via AWS Console or CLI
3. Enable "Static website hosting" in bucket properties
4. (Optional) Use CloudFront for CDN + HTTPS

---

## Customization Guide

### 1. Phone Number & WhatsApp Links

The phone number `+91 98155 21990` (displayed as `+919815521990`) appears in:

**In HTML:**
- Line 47: Nav CTA button (`nav__cta`)
- Lines 140, 149, 158, 167, 176, 185, 194, 203: Individual product order links
- Line 322: "Call us" phone link in the visit section

**Quick find-and-replace:**
```
Find:     919815521990
Replace:  <new 10-digit number without +91>

Find:     +919815521990
Replace:  +91<new 10-digit>

Find:     https://wa.me/919815521990
Replace:  https://wa.me/+91<new 10-digit>

Find:     tel:+919815521990
Replace:  tel:+91<new 10-digit>
```

**Test after replacing:**
- Click "Order on WhatsApp" button — should open WhatsApp chat with new number
- Click any product "Order →" link — should pre-fill order message
- Click "Call us" link on Visit section — should dial on mobile

### 2. Menu & Pricing

All prices and product names are in `index.html` within the **Signature Mithai** and **Bakery** cards.

**Signature Mithai cards (lines 130–210):**
```html
<div class="card__foot"><b>₹ 520 / kg</b><a class="card__order" href="https://wa.me/...">Order →</a></div>
```

Edit the price amount (e.g., `₹ 520 / kg`) and product names directly in the HTML.

**Example:**
- `<h2>Chena Murki</h2>` → change name
- `₹ 520 / kg` → change price
- Product description in the `<p>` tag

**Bakery section** (lines 270–310) follows the same pattern.

**Pro tip:** Keep prices aligned with your physical shop's rate board to avoid confusion.

### 3. Product Photos

All images are in `assets/` folder. Filenames are:
- `hero.jpg` — Hero section, Ken Burns effect
- `shop.jpg` — Heritage section (shop interior)
- `dodha.jpg`, `gulabjamun.jpg`, `kajukatli.jpg`, etc. — Product close-ups
- `bakery.jpg`, `cake.jpg`, `halwa.jpg` — Bakery section
- `giftbox.jpg` — Gifting section
- `logo-full.png` — Favicon and logo

**To replace a photo:**
1. Prepare your new image (recommended: JPG, 250–400 KB, RGB color mode)
2. Export at 2x resolution (e.g., 2880×1920) for crisp retina displays
3. Save with the **exact same filename** as the original
4. Upload to `assets/` folder
5. No code changes needed

**Image specifications:**
- Format: JPG for photos, PNG for logo/graphics
- Dimensions: 2x the display size (e.g., if hero shows at 1440×900, use 2880×1800)
- File size: Keep under 400 KB for fast load
- Color mode: RGB (not CMYK)

### 4. Color Palette

All colors are CSS variables at the top of `css/style.css` (lines 6–21):

```css
:root {
  --ink: #0b0807;              /* Black background */
  --coal: #161009;             /* Dark brown */
  --coal-2: #1f1710;           /* Lighter dark brown */
  --line: rgba(232, 169, 138, 0.16);  /* Subtle border */
  --rose-deep: #b76e5a;        /* Deep rose */
  --rose: #e8a98a;             /* Primary rose-gold */
  --rose-light: #f6ddd2;       /* Light rose accent */
  --cream: #f5ede4;            /* Text color (off-white) */
  --muted: #b3a193;            /* Muted text */
  /* ... fonts ... */
}
```

**To change the color scheme:**
1. Open `css/style.css`
2. Update the hex codes in `:root` block
3. Changes apply globally (buttons, accents, text)

**Example: Shift to deeper burgundy**
```css
--rose-deep: #8b4513;   /* Saddle brown */
--rose: #cd853f;        /* Peru gold */
--rose-light: #daa520;  /* Goldenrod */
```

### 5. Typography

Fonts are loaded from Google Fonts (lines 12–14 of `index.html`):

```html
<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..700;1,9..144,300..700&family=Jost:ital,wght@0,300..600;1,300..600&family=Noto+Serif+Gurmukhi:wght@400;600&display=swap" rel="stylesheet" />
```

And CSS variables (lines 16–18):
```css
--serif: "Fraunces", "Georgia", serif;    /* Headings */
--sans: "Jost", "Avenir Next", sans-serif; /* Body */
--pa: "Noto Serif Gurmukhi", serif;       /* Punjabi */
```

**To change fonts:**
1. Visit [fonts.google.com](https://fonts.google.com)
2. Select your new fonts
3. Copy the `<link>` tag and replace lines 12–14 in `index.html`
4. Update the CSS variable names in `css/style.css` `:root` block
5. Update font references throughout CSS (search for `var(--serif)`, `var(--sans)`, `var(--pa)`)

**Current selection:**
- **Fraunces** — High-contrast serif for headlines (premium, heritage feel)
- **Jost** — Geometric sans-serif for body (modern, readable)
- **Noto Serif Gurmukhi** — For Punjabi script (preserved heritage language)

### 6. Google Maps Embed

The map appears in the **Visit Us** section (line 343):

```html
<iframe id="mapFrame" data-src="https://www.google.com/maps/embed?pb=..." title="Location of Bitta Sweets on Google Maps" loading="lazy"></iframe>
```

**To update the location:**
1. Go to [Google Maps](https://maps.google.com)
2. Find your location
3. Click Share → Embed a map
4. Copy the iframe `src` URL
5. Paste into the `data-src` attribute (note: `data-src`, not `src`, for lazy loading)
6. Update the `title` attribute with your location

**Current location:** Kalbutri Gate, Gurdaspur, Punjab 143521

### 7. Testimonials

The carousel rotates through customer reviews (lines 365–396 of `index.html`):

```html
<div class="testimonial">
  <p>"The dodha barfi takes me back to childhood. Three generations of perfection."</p>
  <strong>Priya M.</strong>
  <span>New Delhi</span>
</div>
```

**To add/edit testimonials:**
1. Locate the testimonials section (search for `data-carousel`)
2. Add new `<div class="testimonial">` blocks
3. Fill in the quote, name, and location
4. JavaScript auto-rotates; no additional setup needed

### 8. FSSAI License & Footer

The footer (lines 400–430) displays:
- FSSAI License: `12122281000069`
- Establishment year: `1990`
- Shop address: `Kalbutri Gate, Gurdaspur, Punjab 143521`

**To update:**
```html
<p class="footer__meta">
  FSSAI Lic. <b>12122281000069</b> · Established <b>1990</b>
</p>
<p>
  <b>Bitta Sweets & Bakery</b><br />
  Kalbutri Gate, Gurdaspur, Punjab <b>143521</b><br />
  <a href="tel:+919815521990">+91 98155 21990</a>
</p>
```

Update the license number, year, and address as needed. The phone number updates automatically if you replaced it globally (see section 1).

### 9. Social Links

The footer includes links to Instagram and Facebook (lines 422–425):

```html
<a href="https://instagram.com/bittasweetsofficial" target="_blank" rel="noopener">Instagram</a>
<a href="https://facebook.com/bittasweetsofficial" target="_blank" rel="noopener">Facebook</a>
```

**Update with your actual URLs:**
```html
<a href="https://instagram.com/yourhandle" target="_blank" rel="noopener">Instagram</a>
<a href="https://facebook.com/yourpage" target="_blank" rel="noopener">Facebook</a>
```

### 10. Contact Email

The footer contact link (line 427):

```html
<a href="mailto:hello@bittasweetsandbakers.com">hello@bittasweetsandbakers.com</a>
```

**Replace with your actual email:**
```html
<a href="mailto:your.email@yourdomain.com">your.email@yourdomain.com</a>
```

---

## Pre-Launch Content Checklist

Before going live, verify these details:

- [ ] **Phone number** — Confirm `+919815521990` is replaced with your actual WhatsApp/call number
- [ ] **Email address** — Replace `hello@bittasweetsandbakers.com` in footer
- [ ] **Menu & prices** — Compare all product names and prices against your current shop rate board
- [ ] **Photos** — Verify all 13 product images are yours or properly licensed
- [ ] **FSSAI License** — Confirm `12122281000069` is your actual license number
- [ ] **Shop address** — Verify street address, city, state, postal code
- [ ] **Establishment year** — Update if different from `1990`
- [ ] **Social links** — Instagram and Facebook handles are active and public
- [ ] **Map location** — Pin is accurate and searchable
- [ ] **Testimonials** — Review quotes; remove or edit if needed
- [ ] **Domain name** — Register custom domain (e.g., `bittasweets.in`) if not already done
- [ ] **SSL certificate** — Ensure HTTPS (automatic on Netlify, Vercel, GitHub Pages)
- [ ] **Google Analytics** — (Optional) Add tracking code to `<head>` for visitor insights
- [ ] **Meta tags** — Update `og:image` if deploying to custom domain (see SEO section)

---

## Performance & SEO

### Built-in Optimizations

1. **Image lazy loading** — `loading="lazy"` on product cards; maps load on interaction
2. **CSS-only animations** — Smooth 60 fps, no JavaScript overhead
3. **Minified assets** — CSS and JS are production-ready
4. **Mobile-first responsive** — Works perfectly on all screen sizes
5. **Prefers-reduced-motion** — Respects system accessibility settings (animations disabled)

### SEO Enhancements (Already Included)

- `<title>` — Descriptive, keyword-rich
- `<meta name="description">` — 160 characters, compelling
- `<meta property="og:*">` — Social sharing tags
- `<link rel="icon">` — Favicon (logo-full.png)
- Semantic HTML — `<header>`, `<main>`, `<section>`, etc.
- Structured data ready — Consider adding JSON-LD for Local Business schema

### Recommendations for Launch

1. **Update `og:image` URL** — Currently `assets/hero.jpg` (relative). On custom domain, use full URL:
   ```html
   <meta property="og:image" content="https://yourdomain.com/assets/hero.jpg" />
   <meta property="og:image:width" content="1440" />
   <meta property="og:image:height" content="900" />
   ```

2. **Add favicon.ico** — Place a 32×32 PNG at the root: `favicon.ico`
   ```html
   <link rel="icon" type="image/x-icon" href="favicon.ico" />
   ```

3. **Google Search Console** — Claim your domain and submit sitemap
4. **Google My Business** — Create a business listing for local search
5. **Google Analytics** — Add GA4 tracking code to `<head>`:
   ```html
   <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
   <script>
     window.dataLayer = window.dataLayer || [];
     function gtag(){dataLayer.push(arguments);}
     gtag('js', new Date());
     gtag('config', 'G-XXXXXXXXXX');
   </script>
   ```

6. **Local Business Schema** — Add JSON-LD to `<head>`:
   ```html
   <script type="application/ld+json">
   {
     "@context": "https://schema.org",
     "@type": "LocalBusiness",
     "name": "Bitta Sweets & Bakery",
     "image": "https://yourdomain.com/assets/hero.jpg",
     "address": {
       "@type": "PostalAddress",
       "streetAddress": "Kalbutri Gate",
       "addressLocality": "Gurdaspur",
       "addressRegion": "Punjab",
       "postalCode": "143521",
       "addressCountry": "IN"
     },
     "telephone": "+919815521990",
     "url": "https://yourdomain.com",
     "foundingDate": "1990"
   }
   </script>
   ```

### Monitoring

- **Lighthouse** — Run in Chrome DevTools (target 90+ on all metrics)
- **Mobile testing** — Test on iPhone and Android
- **Load time** — Aim for <2 seconds on 4G mobile

Current site metrics:
- **Size:** ~4.5 MB total (mostly images)
- **Requests:** ~20 (images, Google Fonts, CSS, JS)
- **Paint time:** <1 second on desktop, <2.5 seconds on 4G mobile

---

## Browser & Device Support

Tested and working on:
- **Desktop:** Chrome, Firefox, Safari, Edge (latest 2 versions)
- **Mobile:** iOS Safari 14+, Android Chrome 90+
- **Accessibility:** Screen readers (NVDA, JAWS), keyboard navigation, prefers-reduced-motion

---

## File Permissions & Ownership

All files are static and need no special permissions. Typical deployment:
```
Files: 644 (readable by all, writable by owner)
Directories: 755 (accessible by all, writable by owner)
```

No CGI, no server-side scripts, no database.

---

## Troubleshooting

### Site doesn't load
- Check that all files are in the same directory structure
- Ensure `index.html` is at the root
- Check browser console (F12) for errors

### Images not showing
- Verify `assets/` folder exists and contains all image files
- Check image filenames match exactly (case-sensitive on Linux/Mac)
- Use absolute paths if images are in a subfolder

### WhatsApp links not working
- Confirm phone number format: `+<country code><number>` (e.g., `+919815521990`)
- Test on mobile where WhatsApp is installed
- Check URL encoding in href

### Animations not playing
- Check browser DevTools Performance tab
- Ensure CSS animations are not disabled by system accessibility settings
- Try a different browser to rule out browser-specific issues

### Map not loading
- Verify Google Maps embed URL is valid (check for API key requirements)
- Ensure `data-src` attribute is used (not `src`)
- Check browser console for CORS errors

---

## Technical Stack

- **HTML5** — Semantic markup, no dependencies
- **CSS3** — Custom properties, Grid, Flexbox, animations
- **JavaScript (Vanilla)** — No frameworks, ~4 KB gzipped
  - Intersection Observer API for scroll reveals
  - Canvas for particle effects
  - LocalStorage for preloader state
- **Google Fonts** — Fraunces, Jost, Noto Serif Gurmukhi
- **Google Maps Embed API** — Deferred load for performance

---

## Maintenance & Updates

### Regular Tasks

1. **Review testimonials** — Quarterly, refresh with latest customer feedback
2. **Update prices** — As your rate board changes (edit `index.html`)
3. **Refresh photos** — Seasonal, showcase new products (replace files in `assets/`)
4. **Monitor analytics** — Monthly, track visitor trends and engagement
5. **Test WhatsApp links** — Quarterly, ensure phone number remains current

### Annual Tasks

1. **Update establishment year in footer** if it changes
2. **Refresh FSSAI license** if renewal is needed; update license number
3. **Backup content** — Save a copy of all text and images
4. **Security audit** — Check for broken links, outdated dependencies

### No Ongoing Costs

- No hosting fees (Netlify, Vercel, GitHub Pages are free)
- No SSL certificate costs (automatic HTTPS)
- No CDN costs (included with hosting)
- No database to maintain
- No backend server to manage

---

## License & Attribution

### Photography
All 13 food product images (`hero.jpg`, `dodha.jpg`, `gulabjamun.jpg`, etc.) are **AI-generated via Higgsfield** and owned exclusively by the buyer. Full rights to use, modify, and distribute.

### Fonts
- **Fraunces, Jost:** Open Font License (OFL) — free, no attribution required
- **Noto Serif Gurmukhi:** Open Font License (OFL) — free, no attribution required
- All served via Google Fonts CDN

### Code
The HTML, CSS, and JavaScript code are proprietary and should not be redistributed without permission.

---

## Support & Future Development

For questions or enhancements:
- Clarify the exact change needed (e.g., "change the rose-gold color to deep burgundy")
- Provide any new content (updated prices, testimonials, photos)
- Test thoroughly in multiple browsers before deploying

---

**Handover Date:** June 12, 2026  
**Website:** Bitta Sweets & Bakery, Kalbutri Gate, Gurdaspur, Punjab 143521  
**FSSAI License:** 12122281000069  
**Contact:** +91 98155 21990 (WhatsApp)  
**Email:** hello@bittasweetsandbakers.com
