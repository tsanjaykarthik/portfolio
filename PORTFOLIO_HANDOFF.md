# Sanjay Karthik – Portfolio: Handoff for a New Chat

**To Claude in the new chat:** You're continuing an in-progress job. Read this whole file before doing anything. Sanjay doesn't code and trusts you to finish the portfolio carefully. Keep the existing design: don't redesign it, just extend it the same way.

---

## 1. Getting the current site

Sanjay will upload **`sanjay-portfolio.zip`** along with this file. Unzip it to `/home/claude/site`:

```bash
mkdir -p /home/claude/site && cd /home/claude/site && unzip -o /mnt/user-data/uploads/sanjay-portfolio.zip
```

**If the zip can't be uploaded:** Sanjay may already have pushed the site to a public GitHub repo. Ask for the repo link and clone it (github.com is allowed from bash):

```bash
git clone https://github.com/<user>/<repo>.git /home/claude/site
```

Install the screenshot tester once with `pip install playwright --break-system-packages && playwright install chromium`, if it isn't already available.

---

## 2. Who it's for

- **Sanjay Karthik Thyagarajan**: UI/UX designer, Chennai, India. Email sanjaykarthikt@gmail.com, LinkedIn linkedin.com/in/sanjay-karthik-thyagarajan-a28331244.
- B.Tech CSE, SRM Ramapuram, CGPA 9.078. UI/UX Design Intern at Brain Quest Consultancy and Training since Apr 2026.
- The site will be hosted from **GitHub → Vercel**. It's plain static files with no build step.

---

## 3. How the site is built

Plain HTML, CSS and JS with hash routing: `#/`, `#/work`, `#/about`, `#/case/<id>`.

```
index.html     page shell: header (pill nav → hamburger ≤820px), contact section, footer
styles.css     all styles (tokens on :root)
app.js         rendering + router + mobile menu + copy-email; image fallback logic
data.js        ALL CONTENT (projects, jobs, skills, stats, certs, awards)
favicon.svg
sanjay-karthik-resume.pdf
README.md      non-coder deploy steps (GitHub upload → Vercel)
images/        portrait.jpg, portrait-about.jpg, <id>-cover.jpg, <id>-1.jpg … <id>-N.jpg
images/README.txt
```

### Design tokens (don't change)

- **Colours:**
  - background `#F3F1EC`, ink `#151413`
  - muted text `#57534D`, body text `#3A3733`
  - lines `#E4E0D8` / `#DDD8CF`
  - accent `#D9481F` (dark sections use `#FF7A4F`)
- **Fonts:**
  - Hanken Grotesk for UI and headings
  - Instrument Serif italic for `<em>` accents
  - JetBrains Mono for small labels
- **Shapes:** rounded white cards (24–28px radius) and pill buttons.

### How a project works in `data.js`

```js
{ id:'paul', title:'…', type:'Client'|'Personal'|'Hackathon', badge:'Client · Switzerland', year:'2026',
  tint:'#E7E3DC',            // placeholder colour if an image is missing
  tagline:'…', client:'…', role:'…', tools:'…',
  live:'https://…',          // '' hides the "Visit live site ↗" button
  brief:'…', points:['…'], stats:[{v:'11',l:'Pages designed and built'}],
  testimonial:{ quote:'…', short:'…', name:'…', role:'…' },  // optional; `short` shows on the home page
  shotRatio:'16/9' | '4/3',  // aspect of the gallery images
  shots:['caption 1','caption 2', …] }  // file <id>-1.jpg ↔ caption 1, etc.
```

- **Images:** `app.js` tries `images/<name>.jpg`, then `.jpeg`, `.webp`, `.png`. If none exists, the styled tint placeholder stays.
- **Home page:** shows the first 4 projects, plus the first testimonial that has a `short` quote.
- **Order of projects (keep it):** paul, lunchtime, estheta, marblique, luma, designnexus.

---

## 4. Status

| id | Status | Gallery | Notes |
|---|---|---|---|
| paul | ✅ Done | 12 × 16/9 | Live link. **Testimonial is verbatim from Paul's email**: trimmed with "…" only, never reworded. His address, phone and email are kept off the site. |
| lunchtime | ✅ Done | 13 × 16/9 | Live link. Covers the two-brand split landing (Lunchtime red/cream, Agata's Kitchen black/gold). Stats: 92 / 96 PageSpeed, 2 brands, 46 products. |
| estheta | ✅ Done | 19 × 4/3 iPad frames | Private client, so the client's name and company are **blurred** on Home and Profile. The CRM email and phone are blurred, and the Figma screenshot is cropped so his name and the file link don't show. No live link. |
| marblique | ✅ Done | 10 × 16/9 | Live link is the Wix staging URL. |
| luma | ✅ Done | 12 × 16/9 | Personal project, 2025. 4 case-study slides (from his Gamma deck, “Made with Gamma” badges painted out) + 8 phone-mockup images. Figma file link in `live` with `liveLabel:'View Figma file ↗'`. Screens contain typos he may fix (Quick Clam, joirney, approch, experencing, “Small, Small” text sizes) and a helpline labelled with a US name next to an Indian number. |
| designnexus | ✅ Done | 9 × 16/9 | Figma file link in `live`. **NOT a hackathon winner**: never say “winner” or “won”. Hackathon project, Dec 2023. UX research sprint, 15+ high-fidelity screens for 4 user roles: onboarding, leaderboard, recruitment hub, peer chat. Built in Figma. |

### Rules Sanjay and Claude agreed

1. **Never present fake content as real.** Agata's Kitchen had AI-generated "customer reviews"; that screen and caption were removed. Don't use any site's on-page reviews as Sanjay's testimonials.
2. **Protect client privacy.** Blur real names, emails and phones of private clients' people. Never show Paul's contact details. Crop browser tabs, notifications and Figma file names out of screenshots.
3. **Keep claims truthful.** Text should come from the résumé or from what's visible in the screenshots. Don't invent numbers.
4. **Write simply.** Captions are short and in sentence case. Use ’ for apostrophes in data strings.
5. **Respond in plain English.** Sanjay isn't a coder, so keep updates short and friendly.

---

## 5. Image-processing recipes (Python + Pillow)

Save gallery images as JPEG, quality 80–84, progressive, max width 1600 (device mockups 1842).

### Cropping browser screenshots (1920×1200)

- **Desktop page:** crop `(0, 101, 1900, 1200)`. If a white Wix "created by" banner is present, crop from y=164 instead. The scrollbar starts at x=1900.
- **Gallery images:** centre-crop to 16:9.
- **Chrome DevTools device mode:** measure the viewport by probing pixels, because the devtools background is `(37,38,40)`. Typical boxes:
  - tablet `(159, 164|185, 1119, 1174|1182)`
  - mobile `(374, 164|185, 906, 1174|1182)`
- **Check every image** for popups (WhatsApp, notifications) and crop them out.

### Mockup styles used so far

- **Cover (1600×1200):** a browser window centred on a soft backdrop.
  - Screenshot width 1240, plus a 34px top bar with three traffic-light dots and a small URL pill.
  - 14px rounded corners and a blurred drop shadow.
- **Tablet + phone pair (1842×1036):**
  - Tablet screen height 820 (bezel 22, radius 40).
  - Phone screen height 700 (bezel 14, radius 46), placed 70px to the right and 30px lower.
- **Three phones (1842×1036):** height 780 each, with 80px gaps.
- **iPad frame (1600×1200), used for Estheta:** screen width 1320, bezel 24, radius 48, bezel fill `(10,10,10)`.
- **Backdrops:** a base colour plus a large blurred ellipse glow (Gaussian blur about 240).
  - Marblique: dark `(20,18,16)` with gold glow `(120,92,52)`
  - Paul: stone `(214,208,198)` with light glow `(238,234,227)`
  - Lunchtime: cream `(231,214,188)` with glow `(250,241,224)`
  - Estheta: `(18,16,15)` with orange glow `(120,48,14)`

### Helper code

```python
from PIL import Image, ImageDraw, ImageFilter
def backdrop(W,H,base,glow,box=None):
    bg=Image.new('RGB',(W,H),base); g=Image.new('L',(W,H),0)
    ImageDraw.Draw(g).ellipse(box or (W*.18,H*.15,W*.82,H*.85),fill=255)
    g=g.filter(ImageFilter.GaussianBlur(240))
    return Image.composite(Image.new('RGB',(W,H),glow),bg,g)
def shadow(bg,box,a=110,col=(0,0,0),r=30):
    W,H=bg.size; s=Image.new('L',(W,H),0)
    ImageDraw.Draw(s).rounded_rectangle((box[0],box[1]+30,box[2],box[3]+30),r,fill=a)
    s=s.filter(ImageFilter.GaussianBlur(40)); return Image.composite(Image.new('RGB',(W,H),col),bg,s)
def device(screen,h,bez,rad,fill=(22,20,19,255),outline=(95,85,75,255)):
    s=screen.resize((round(screen.width*h/screen.height),h),Image.LANCZOS)
    fw,fh=s.width+2*bez,h+2*bez; f=Image.new('RGBA',(fw,fh),(0,0,0,0)); d=ImageDraw.Draw(f)
    d.rounded_rectangle((0,0,fw-1,fh-1),rad,fill=fill,outline=outline,width=2)
    m=Image.new('L',s.size,0); ImageDraw.Draw(m).rounded_rectangle((0,0,s.width-1,s.height-1),rad-bez,fill=255)
    f.paste(s,(bez,bez),m); return f
def redact(im,boxes):   # blur private text
    for b in boxes:
        for r in (14,10): im.paste(im.crop(b).filter(ImageFilter.GaussianBlur(r)),b[:2])
    return im
def save(im,path,w=1600,q=82):
    if im.width>w: im=im.resize((w,round(im.height*w/im.width)),Image.LANCZOS)
    im.save(path,'JPEG',quality=q,optimize=True,progressive=True)
```

### Suggestions for the two remaining projects

- **Luma Mind** (a mental-health app):
  - Probably mobile screens. Use 2–3 phone frames per image at 1842×1036 with `shotRatio:'16/9'`.
  - A calm backdrop, such as soft lavender `(215,211,234)` with a lighter glow; the card tint is `#D7D3EA`.
  - Lead with the mood logging and breathing screens.
- **DesignNexus** (UX learning platform, 4 roles):
  - Pick frames based on the format of the exported screens.
  - A warm peach backdrop to match tint `#F3CDBF`.
  - Put any research or user-flow image first as the process shot.
- **For both:**
  - Make a cover (`<id>-cover.jpg`, 1600×1200).
  - Add `shotRatio` and `shots` captions.
  - Refresh `points` from what's visible in the screens.
  - Use `live:''` unless a prototype link is provided. A public Figma prototype link can go in `live`.

---

## 6. Finishing checklist

1. Process the Luma Mind and DesignNexus screens, then update `data.js`.
2. **Optional:** Sanjay may send a PageSpeed Insights screenshot for Lunchtime. Add it as an extra Lunchtime gallery image with the caption "PageSpeed Insights results".
3. **Share image:** make `images/og.jpg` (1200×630) from the Paul cover. After the domain is known, change the og:image tag in `index.html` to an absolute URL, `https://<vercel-domain>/images/og.jpg`.
4. **Remind Sanjay:** confirm with his lead or the client that Estheta screens can be public. Marblique shows "created by Brain Quest", which is fine to show.
5. **QA:** at widths 375, 768 and 1280, on every route, check for no horizontal overflow (`scrollWidth ≤ viewport`), no JS errors, and that every `<img>` loads (scroll through the page first, because images are lazy-loaded). Also check that the mobile menu opens and closes.
6. **Package:** zip the contents of the site folder (not the folder itself) as `sanjay-portfolio.zip` in `/mnt/user-data/outputs/`, present it, and copy this updated handoff into the zip.
7. **Deploy:** walk Sanjay through it in plain words, using README.md. On GitHub, add a new repo and upload all the files inside the folder. On Vercel, sign in with GitHub, choose Add New → Project, pick the repo and click Deploy with default settings.

### QA script

```python
from playwright.sync_api import sync_playwright
url='file:///home/claude/site/index.html'; errs=[]
with sync_playwright() as p:
    b=p.chromium.launch()
    for w in (1280,768,375):
        pg=b.new_page(viewport={'width':w,'height':900}); pg.on('pageerror',lambda e: errs.append(str(e)))
        for r in ['','#/work','#/about']+[f'#/case/{i}' for i in ['paul','lunchtime','estheta','marblique','luma','designnexus']]:
            pg.goto(url+r); pg.wait_for_timeout(400)
            for y in range(0,20000,600): pg.evaluate(f'scrollTo(0,{y})'); pg.wait_for_timeout(40)
            bad=pg.evaluate("[...document.querySelectorAll('img')].filter(i=>i.complete&&!i.naturalWidth).length")
            sw=pg.evaluate('document.documentElement.scrollWidth')
            if sw>w or bad: print('ISSUE',w,r,'overflow' if sw>w else '', bad,'broken imgs')
    b.close()
print('errors',errs)
```

(A missing image shows a placeholder by design. Only Luma Mind and DesignNexus should have any until their screens arrive.)

---

## 7. What Sanjay should send in the new chat

- This file and `sanjay-portfolio.zip`
- **Luma Mind** screen exports: Figma PNGs at 2x, plus any wireframes, flows or style guide
- **DesignNexus** screen exports, plus any research or flow images
- Optional: the Lunchtime PageSpeed screenshot, and a public Figma prototype link for either project


---

## 8. Changes made in chat 2 (Oct 2026)

- Luma Mind and DesignNexus finished (see status table). Both link to their Figma files; Sanjay must set each file’s sharing to “Anyone with the link can view”.
- DesignNexus was **not** a winner. Badge is “Hackathon project”; the third stat is “2 · Research personas”. **His résumé PDF still says “Hackathon winner”**: swap in a corrected PDF when he sends one.
- `data.js`: optional `liveLabel` per project changes the button text (default “Visit live site ↗”).
- Motion (`app.js` “Motion” section + end of `styles.css`): home headline words rise in on load, sections and cards fade up as they scroll in, images fade in when loaded, a thin orange reading-progress bar on case studies, header gets a shadow once scrolled. All of it is switched off for people with “reduce motion” turned on.
- Gallery images open in a full-screen viewer (click/tap or Enter): arrows, swipe, Esc, focus trapped.
- Header: dimmed backdrop + scroll lock when the mobile menu is open, staggered menu links, 44px menu button, menu scrolls in landscape, tighter links at 821–980px, name shows down to 331px.
- `images/og.jpg` (1200×630) made from the Paul cover. Still relative: change to `https://<vercel-domain>/images/og.jpg` once the domain is known.
- QA passed at 1440, 1280, 1024, 820, 768, 414, 375, 320 on every route: no overflow, no JS errors, every image loads, every reveal ends visible.
