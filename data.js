/* ==========================================================
   ALL YOUR TEXT LIVES HERE.
   Edit words between the quotes, save, push to GitHub. Done.
   Images: drop files into /images using the exact names in
   images/README.txt. Missing images show a styled placeholder.
   Case-study gallery: add  shots:['caption 1','caption 2', ...]  to a project
   and name the files <id>-1.jpg, <id>-2.jpg ... in that order.
   ========================================================== */

const SITE = {
  name: 'Sanjay Karthik',
  fullName: 'Sanjay Karthik Thyagarajan',
  email: 'sanjaykarthikt@gmail.com',
  phone: '+91 70925 68081',
  linkedin: 'https://www.linkedin.com/in/sanjay-karthik-thyagarajan-a28331244',
  resume: 'sanjay-karthik-resume.pdf',
  openToWork: true,          // set to false to hide the green "Open to..." badge
  workLayout: 'grid',        // 'grid' or 'list'
};

const PROJECTS = [
  { id:'paul', title:'Paul Hulewicz', type:'Client', badge:'Client · Switzerland', year:'2026', tint:'#E7E3DC',
    tagline:'Artist portfolio website', client:'Paul Hulewicz, artist', role:'Web design, build & handover', tools:'Wix Studio',
    live:'https://www.paul-hulewicz-art.com/',
    brief:'Build a gallery-style portfolio site that lets an artist’s work lead on every screen size.',
    points:['Built an 11-page gallery-style portfolio in Wix Studio, with a quiet white layout and an elegant serif so the artwork always leads.','Structured the work from Portfolio to category (Paintings, Mixed Media, Photography), to series, to individual pieces with title, medium and size.','Designed and built the animated home hero, where his name sits over a moving row of artworks, and tuned it and the scroll animations across desktop, tablet and mobile.','Worked with Paul over Google Meet, applied his feedback on time, then ran a training session so he can maintain and update the site himself.'],
    stats:[{v:'11',l:'Pages designed and built'},{v:'3',l:'Breakpoints tuned'},{v:'Handover',l:'Client training delivered'}],
    testimonial:{
      quote:'This message is to thank you for your excellent job building my new website on WIX platform. Everything was done according to agreed scope of work and additional instructions. The communication was very smooth… You solved some challenging issues as designing the animated hero page. The timing was also perfect and no delays encountered. Moreover, I am grateful to you because I learnt a lot mainly during a very useful training session… To conclude I can highly recommend your expertise and skills to whoever may consider building a new website.',
      short:'I can highly recommend your expertise and skills to whoever may consider building a new website.',
      name:'Paul Hulewicz', role:'Artist, Switzerland' },
    shotRatio:'16/9',
    shots:['Home: title over a moving row of artworks','Home: quote section','About page','Featured series grid','Portfolio landing page','Category: Mixed Media','Series overview','Series page with an opening quote','Artwork detail: title, medium and size','Contact form for enquiries and commissions','Animated hero on tablet and mobile','Quote and About sections reflowed for tablet and mobile'] },

  { id:'lunchtime', title:'Lunchtime Food', type:'Client', badge:'Client · Zurich', year:'2026', tint:'#F1D9B5',
    tagline:'Food delivery and catering website redesign', client:'lunchtimefood.ch, via Brain Quest', role:'UI/UX design & build', tools:'Wix Studio, HTML/CSS/JS, Canvas',
    live:'https://www.lunchtimefood.ch/',
    brief:'Redesign lunchtimefood.ch, a Zurich food business with two sides, so people can order an everyday lunch or book premium catering from one site, and understand delivery pricing and policies at a glance.',
    points:['Designed a split landing page that sends visitors to the right brand: Lunchtime for everyday comfort-food delivery (red and cream), and Agata’s Kitchen for premium catering and B2B (black and gold).','Structured a three-zone delivery-pricing experience and the supporting policy pages.','Built the Lunchtime ordering flow: menu with WhatsApp ordering, a 46-product catalogue with category chips and filters, pickup locations and a three-step “how to order” explainer.','Built a dependency-free HTML5 Canvas animation with reduced-motion support.','Owned responsive layouts across desktop, tablet and mobile, the visual systems for both brands, CMS structure, reusable UI and client handover.'],
    stats:[{v:'92',l:'Accessibility score, PageSpeed Insights'},{v:'96',l:'Best Practices score, PageSpeed Insights'},{v:'2',l:'Brands, one site'},{v:'46',l:'Products in the online catalogue'}],
    shotRatio:'16/9',
    shots:['Lunchtime home hero','Delivery, pickup, time slots and freshness at a glance','Ordering explained in three steps','Menu page with WhatsApp ordering','Catalogue with category chips and filters','Pickup locations across Zürich','Delivery across Switzerland, and the footer','Agata’s Kitchen catering and B2B services','Agata’s Kitchen story','Brand values','Split landing on tablet and mobile','Menu on tablet and mobile','Agata’s Kitchen on mobile'] },

  { id:'estheta', title:'Estheta', type:'Client', badge:'Client project', year:'2026', tint:'#2A2724',
    tagline:'iPad lifestyle and discipline app', client:'Private client', role:'Product & UI design', tools:'Figma, Google Stitch, HTML prototypes',
    live:'',
    brief:'Turn a client’s 52-week self-study system, built around adventure, leadership and wellness, into an iPad-first product he can live in every day.',
    points:['Defined the information architecture: four pillars (Home, Adventure, Leadership and Wellness), with Files, Profile and a member CRM behind them.','Designed a five-step onboarding that builds a personal dossier: profile and intention, a body-composition baseline with a live result, season targets and daily rhythm, then integrations.','Created a dark brand system with a single orange accent, used consistently across stats cards, calendars, the weekly planner, notes and tools like the body-fat calculator.','Connected every screen into clickable prototype flows in Figma so the client could test the whole journey.','Iterated through client review cycles until the home screen was approved.'],
    stats:[{v:'52',l:'Week system turned into a product'},{v:'8+',l:'Sections designed and prototyped'},{v:'5',l:'Step onboarding flow'},{v:'iPad',l:'First form factor'}],
    shotRatio:'4/3',
    shots:['Prototype flows mapped in Figma','Splash screen','Sign-up: email or Apple','Account creation','Returning member sign-in','Onboarding step 2: profile and performance intention','Step 3: body-composition baseline with a live result','Step 4: season targets and daily rhythm','Step 5: integrations and executive summary','Home: stats, annual plan and resources','Adventure: weekly intention, gratitude and training','Leadership: weekly focus and daily schedule','Annual calendar','Weekly planner by time block','Wellness: breathing (BOLT) challenge','Files and weekly notes','Profile with health metrics','Body-fat calculator','Member relations CRM'] },

  { id:'marblique', title:'Marblique', type:'Client', badge:'Client · Italy', year:'2026', tint:'#2A2724',
    tagline:'Italian luxury marble brand website', client:'Marblique, via Brain Quest', role:'UI design & Wix Studio build', tools:'Wix Studio, Wix CMS',
    live:'https://brainquestdesigners.wixstudio.com/marblique',
    brief:'Design and build a multi-page website that presents an Italian luxury marble brand with the weight and polish of the material itself.',
    points:['Designed a dark visual system with gold accents and a classical serif, so every page feels like a showroom rather than a catalogue.','Built full-bleed parallax heroes, a scrolling materials marquee, a featured-projects carousel and scroll-reveal motion.','Set up CMS collections so every project gets its own page from one template: hero, key facts (area, duration, budget, team), story and gallery.','Built CMS-driven News and Projects pages with dynamic filtering by category.','Reflowed every section for tablet and mobile, with a collapsed menu and re-stacked layouts that keep the type large and readable.'],
    stats:[{v:'8',l:'Project pages generated from one CMS template'},{v:'6',l:'News articles on a CMS-driven blog'},{v:'4',l:'Core pages: Home, Company, News, Projects'}],
    shotRatio:'16/9',
    shots:['About section with split imagery','Services: supply, sourcing, production, design','Featured projects carousel','Company values','Projects grid with category labels','Project detail hero','Project key facts and story','News articles from the CMS','Responsive hero on tablet and mobile','Inner sections reflowed for tablet and mobile'] },

  { id:'luma', title:'Luma Mind', type:'Personal', badge:'Personal project', year:'2025', tint:'#D7D3EA',
    tagline:'Mental health support app for depression', client:'Self-initiated', role:'UX & UI design', tools:'Figma',
    live:'https://www.figma.com/design/soX32irvIT4rC4Xezzjdjg/Luma-Mind-a-Mental-Health-Support-App-for-Depression-%7C-29.01.2025?node-id=0-1', liveLabel:'View Figma file ↗',
    brief:'Many mental health apps feel clinical and built around streaks, so people end up feeling judged instead of helped. Luma Mind is “a gentle light for heavy days”: a calm companion for checking in, coping, connecting and finding professional help.',
    points:['Defined the primary user: young adults (18–30) with mild to moderate depression, low energy and reluctance to reach out.','Set six design principles to guide every screen: low cognitive load, gentle and non-judgmental, micro-interventions, safety first, accessibility and inclusivity, and calm aesthetics.','Designed 25+ high-fidelity screens with a WCAG 2.1 AA focus, organised into Home, Track, Coping, Community and Learn plus profile and settings.','Mood logging with a five-point check-in, optional notes, recent entries and a weekly mood trend.','Step-by-step breathing and grounding exercises, and a community feed with gentle reactions like “I hear you” instead of like counts.','Safety built in from the start: a “Before we begin” disclaimer and a Professional Support area with crisis hotlines and therapist guidance.','Accessibility settings for text size, high contrast, reduced animation and text-to-speech.'],
    stats:[{v:'25+',l:'High-fidelity screens'},{v:'6',l:'Design principles'},{v:'AA',l:'WCAG 2.1 focus'}],
    shotRatio:'16/9',
    shots:['Problem, solution and primary user','Six design principles','Information architecture: five tabs plus profile and settings','What sets it apart and how it could grow','Home, mood check-in and weekly mood trend','3-minute breathing reset, all four steps','Coping library and community feed','Learn & Grow topics and an article','Profile, accessibility and notification settings','Safety disclaimer and professional support','Splash, welcome and sign-in','Personalisation, daily goals and medication reminders'] },

  { id:'designnexus', title:'DesignNexus', type:'Hackathon', badge:'Hackathon project', year:'2023', tint:'#F3CDBF',
    tagline:'Gamified UX learning app', client:'Hackathon', role:'UX research & UI design', tools:'Figma',
    live:'https://www.figma.com/design/kAZIfQT2rDc8PqhnBlGyz6/SKY-DIVE_UM-Hackathon2K23?node-id=0-1', liveLabel:'View Figma file ↗',
    brief:'Design a gamified learning app where aspiring UI/UX designers learn by level, share their work publicly and get noticed by recruiters.',
    points:['Ran a UX research sprint: pain points for learners and employers, an empathy map, two personas and an information architecture.','Sketched the key screens on paper before moving to high-fidelity designs in Figma.','Designed 15+ high-fidelity Android screens for 4 user roles: beginner, intermediate and advanced learners, plus recruiters.','Covered onboarding, level-based learning paths with quizzes, a design feed, peer chat channels, a leaderboard, profiles and a recruitment hub.','Linked every flow into a clickable Figma prototype.'],
    stats:[{v:'15+',l:'High-fidelity screens'},{v:'4',l:'User roles'},{v:'2',l:'Research personas'}],
    shotRatio:'16/9',
    shots:['Personas for a learner and a recruiter','Empathy map for the learner persona','Information architecture and paper sketches','Clickable prototype flow in Figma','Splash, sign-in and role selection','Level selection and the beginner learning path','Design feed, peer chat and leaderboard','Profiles with works and skills tabs','Recruiter home, recruitment hub and recent recruits'] },
];

const JOBS = [
  { company:'Brain Quest Consultancy and Training', role:'UI/UX Design Intern', dates:'Apr 2026 – Now', place:'Remote', tools:'Wix Studio, Figma, HTML/CSS/JavaScript',
    points:['Design and build production websites for international clients, owning responsive layouts, visual systems, CMS structure, reusable UI and client handover.','Redesigned lunchtimefood.ch, scoring 92 Accessibility and 96 Best Practices on PageSpeed Insights.','Delivered content and legal corrections for a Zurich Airport private-jet charter site under a no-redesign constraint, including four brand-matched HTML legal pages and SVG icon variants.','Use AI tools to research platform limits and explore directions, then verify and manually fix responsive and translation issues before delivery.'] },
  { company:'MIT Square / INDO-GLOBAL', role:'INDO-GLOBAL Winter Intern', dates:'Oct – Dec 2023', place:'Remote', tools:'Research and Development, Patent Documentation, Basic UI Design',
    points:['Worked in a team of two on research and development and patent documentation for a Real-Time AI-Based Voice Enhanced Chat Application for Differently Abled People.','Researched and documented the novel features of a web app designed to support communication for differently abled users, through continuous R&D and brainstorming.','Created a basic UI design for the web app to illustrate the concept.'] },
  { company:'PK Innovatives', role:'UI/UX Design Intern', dates:'Mar – Apr 2023', place:'Remote', tools:'Figma, Mobile UI',
    points:['Designed a mobile-first news app with multi-theme and multilingual support, delivering wireframes, a component library, a style guide and an interactive prototype in a four-week sprint.'] },
];

const SKILLS = [
  { title:'UI Design', items:['Visual Design','Interaction Design','Responsive Design','Mobile-First Design','Typography','Color','Grids','Visual Hierarchy'] },
  { title:'UX Methods', items:['User Research','Usability Testing','Think-Aloud Studies','Heuristic Evaluation','Personas','User Flows','Information Architecture','Wireframing','Prototyping'] },
  { title:'Design Systems', items:['Component Libraries','Style Guides','Design Tokens','Accessibility (WCAG 2.1 AA)','Design QA','Developer Handoff'] },
  { title:'Tools', items:['Figma (Advanced)','FigJam','Framer','Wix Studio','Adobe XD','Claude','Google Stitch'] },
  { title:'Front-End', items:['HTML','CSS','JavaScript','SVG','HTML5 Canvas API'] },
  { title:'Collaboration', items:['Client Communication','Stakeholder Presentations','Agile/Scrum','Cross-Functional Teamwork'] },
];

const STATS = [
  { v:'3', l:'Design internships' },
  { v:'3', l:'Client countries: CH, IT, US' },
  { v:'9.078', l:'CGPA, B.Tech CSE' },
];

const EARLIER = [
  { org:'MIT Square / INDO-GLOBAL', year:'2023', title:'AI voice-chat app (patent project)', text:'Research and development and patent documentation for a voice-enhanced chat web app for differently abled people, with a basic UI design.' },
  { org:'PK Innovatives', year:'2023', title:'Mobile-first news app', text:'Multi-theme, multilingual news app: wireframes, component library, style guide and interactive prototype in a four-week sprint.' },
];

const CERTS = [
  { t:'Google UX Design Professional Certificate', s:'Coursera · Apr 2023' },
  { t:'Meta Front-End Developer Professional Certificate', s:'Coursera · Sep 2023' },
];

const AWARDS = [
  '2nd Place, TECTRIX 2023 UI Design',
  '2nd Place, DATRONIX UI/UX FlutterFlow',
  'Top 2% nationally, HCL GUVI Career Carnival (~896 candidates)',
  'Core Design Lead, Texus ’25: identity and branding for SRM’s tech fest (1,000+ attendees)',
  'Graphic Designer, Content Domain Head & Treasurer, SKETCH Club (2023 – 2025)',
];
