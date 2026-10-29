/* Rendering + routing. You shouldn't need to edit this file — text lives in data.js. */
(function () {
  const $ = (s, r = document) => r.querySelector(s);
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[c]));

  /* Images: looks for images/<name>.jpg, then .jpeg, .webp, .png. If none exist, the placeholder stays. */
  const EXTS = ['jpg', 'jpeg', 'webp', 'png'];
  const img = (name, alt) =>
    `<img src="images/${name}.${EXTS[0]}" data-name="${name}" data-i="0" alt="${esc(alt)}" loading="lazy" decoding="async">`;
  document.addEventListener('error', e => {
    const el = e.target;
    if (el.tagName !== 'IMG' || !el.dataset.name) return;
    const i = +el.dataset.i + 1;
    if (i < EXTS.length) { el.dataset.i = i; el.src = `images/${el.dataset.name}.${EXTS[i]}`; }
    else el.remove();
  }, true);
  document.addEventListener('load', e => { if (e.target.tagName === 'IMG') e.target.classList.add('is-loaded'); }, true);

  const isDark = hex => {
    const n = parseInt(hex.replace('#', ''), 16);
    return ((n >> 16) * 299 + ((n >> 8 & 255) * 587) + ((n & 255) * 114)) / 1000 < 110;
  };
  const media = (p, name, cls = '', alt) => `
    <div class="media ${cls}">
      <div class="ph ${isDark(p.tint) ? 'ph-dark' : ''}" style="--tint:${p.tint}"><span class="ph-title">${esc(p.title)}</span></div>
      ${img(name, alt || p.title + ' — ' + p.tagline)}
    </div>`;
  const portrait = (name = 'portrait') => `
    <div class="media portrait">
      <div class="ph"><span>SK</span></div>
      ${img(name, 'Portrait of Sanjay Karthik')}
    </div>`;

  const projectCard = p => `
    <a class="project" href="#/case/${p.id}">
      <div style="position:relative">
        ${media(p, p.id + '-cover')}
        <span class="badge">${esc(p.badge)}</span>
      </div>
      <div class="project-meta">
        <div><div class="project-title">${esc(p.title)}</div><div class="muted">${esc(p.tagline)}</div></div>
        <span class="year">${esc(p.year)}</span>
      </div>
    </a>`;
  const listRow = p => `
    <a class="list-row" href="#/case/${p.id}">
      ${media(p, p.id + '-cover')}
      <div><div class="project-title" style="font-size:28px">${esc(p.title)}</div><div class="muted">${esc(p.tagline)}</div></div>
      <span class="year">${esc(p.badge)} · ${esc(p.year)} →</span>
    </a>`;
  const chips = items => `<div class="chips">${items.map(t => `<span class="chip">${esc(t)}</span>`).join('')}</div>`;
  const istTime = () => new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Kolkata' });

  /* ---------- Views ---------- */
  const home = () => `
    <section class="hero" aria-label="Introduction">
      <div class="hero-main">
        ${SITE.openToWork ? '<div class="status"><i></i>Open to full-time UI/UX roles</div>' : ''}
        <h1>UI/UX designer making products that feel <em>clear</em> and work for everyone.</h1>
        <p class="hero-lede">I’m Sanjay, a Computer Science graduate with three design internships and live client work for businesses in Switzerland, Italy and the US. I take websites and mobile/tablet apps from research and wireframes to high-fidelity prototypes, design systems and developer handoff.</p>
        <div class="actions">
          <a class="btn btn-dark" href="#/work">View my work <span aria-hidden="true">→</span></a>
          <button class="btn btn-outline" data-copy>Copy email</button>
        </div>
      </div>
      ${portrait()}
    </section>
    <div class="stats">
      ${STATS.map(s => `<div class="card stat"><b>${esc(s.v)}</b><span>${esc(s.l)}</span></div>`).join('')}
      <div class="card stat stat-dark"><b data-clock>${istTime()}</b><span>Chennai, India · IST</span></div>
    </div>

    <section class="section">
      <div class="section-head">
        <div><p class="eyebrow">01 · Selected work</p><h2 class="h2">Recent projects</h2></div>
        <a class="link-under" href="#/work">All projects →</a>
      </div>
      <div class="projects">${PROJECTS.slice(0, 4).map(projectCard).join('')}</div>
    </section>

    ${(() => { const p = PROJECTS.find(x => x.testimonial && x.testimonial.short); return p ? `
    <figure class="section quote quote-home">
      <blockquote>“${esc(p.testimonial.short)}”</blockquote>
      <figcaption><b>${esc(p.testimonial.name)}</b><span>${esc(p.testimonial.role)} · <a href="#/case/${p.id}">Read the case study →</a></span></figcaption>
    </figure>` : ''; })()}

    <section class="section split">
      <div>
        <p class="eyebrow">02 · Experience</p>
        <h2 class="h2">Where I’ve worked</h2>
        <p class="muted" style="margin-top:16px;max-width:360px">Three remote design internships, from mobile UI sprints to production websites for international clients.</p>
      </div>
      <div>
        ${JOBS.map(j => `<div class="job-row"><b>${esc(j.company)}</b><span class="dates">${esc(j.dates)}</span><span class="muted">${esc(j.role)} · ${esc(j.place)}</span></div>`).join('')}
      </div>
    </section>

    <section class="section">
      <p class="eyebrow">03 · Toolkit</p>
      <h2 class="h2" style="margin-bottom:28px">How I work</h2>
      <div class="toolkit">
        ${[SKILLS[1], SKILLS[0], SKILLS[2], SKILLS[3]].map(g => `<div class="card"><h3>${esc(g.title)}</h3>${chips(g.items.slice(0, 6))}</div>`).join('')}
      </div>
    </section>`;

  let filter = 'All';
  const work = () => {
    const list = filter === 'All' ? PROJECTS : PROJECTS.filter(p => p.type === filter);
    const types = ['All', ...new Set(PROJECTS.map(p => p.type))];
    return `
    <section>
      <p class="eyebrow" style="margin-bottom:12px">Work · ${PROJECTS.length} projects</p>
      <h1 class="page-title">Client sites, apps and <em>systems</em> I’ve designed.</h1>
      <div class="filters" role="group" aria-label="Filter projects">
        ${types.map(t => `<button class="filter" data-filter="${t}" aria-pressed="${t === filter}">${t}</button>`).join('')}
      </div>
      ${SITE.workLayout === 'list'
        ? `<div>${list.map(listRow).join('')}</div>`
        : `<div class="projects">${list.map(projectCard).join('')}</div>`}
      <div class="section">
        <p class="eyebrow">Internship work</p>
        <h2 class="h2" style="margin-bottom:24px;font-size:clamp(28px,3.5vw,40px)">Earlier projects</h2>
        <div class="earlier">
          ${EARLIER.map(e => `<div class="card"><div class="card-top"><span>${esc(e.org)}</span><span>${esc(e.year)}</span></div><h3>${esc(e.title)}</h3><p class="muted">${esc(e.text)}</p></div>`).join('')}
        </div>
      </div>
    </section>`;
  };

  const caseStudy = id => {
    const i = PROJECTS.findIndex(p => p.id === id);
    const c = PROJECTS[i], n = PROJECTS[(i + 1) % PROJECTS.length];
    const shots = c.shots || ['Process', 'Final screens'];
    const meta = [['Role', c.role], ['Client', c.client], ['Year', c.year], ['Tools', c.tools]];
    return `
    <article>
      <a class="back" href="#/work">← All work</a>
      <p class="eyebrow" style="color:var(--accent);margin-bottom:12px">${esc(c.badge)}</p>
      <h1 class="case-title">${esc(c.title)}</h1>
      <p class="case-tagline">${esc(c.tagline)}</p>
      ${c.live ? `<div class="actions" style="margin-top:24px"><a class="btn btn-dark" href="${esc(c.live)}" target="_blank" rel="noopener">${esc(c.liveLabel || 'Visit live site ↗')}</a></div>` : ''}
      <dl class="case-meta">${meta.map(([k, v]) => `<div><dt>${k}</dt><dd>${esc(v)}</dd></div>`).join('')}</dl>
      ${media(c, c.id + '-cover', 'case-hero')}

      <div class="section split">
        <p class="eyebrow">The brief</p>
        <p class="brief">${esc(c.brief)}</p>
      </div>

      <div class="case-stats" style="margin-top:64px">
        ${c.stats.map(s => `<div class="card"><b>${esc(s.v)}</b><span>${esc(s.l)}</span></div>`).join('')}
      </div>

      ${c.testimonial && c.testimonial.quote ? `
      <figure class="section quote quote-long">
        <blockquote>“${esc(c.testimonial.quote)}”</blockquote>
        <figcaption><b>${esc(c.testimonial.name)}</b><span>${esc(c.testimonial.role)}</span></figcaption>
      </figure>` : ''}

      <div class="section split">
        <p class="eyebrow">What I did</p>
        <div class="steps">${c.points.map((t, k) => `<div class="step"><span>${String(k + 1).padStart(2, '0')}</span><p>${esc(t)}</p></div>`).join('')}</div>
      </div>

      <div class="section shots${shots.length > 2 ? ' shots-many' : ''}">
        ${shots.map((cap, k) => `<figure>${media(c, `${c.id}-${k + 1}`, 'zoomable', c.title + ': ' + cap).replace('class="media ', `style="aspect-ratio:${c.shotRatio || '4/3'}" data-zoom="${k}" tabindex="0" role="button" aria-label="Enlarge image: ${esc(cap)}" class="media `)}<figcaption>${esc(cap)}</figcaption></figure>`).join('')}
      </div>

      <a class="section next" href="#/case/${n.id}">
        <span class="eyebrow" style="margin:0">Next project</span>
        <strong>${esc(n.title)} →</strong>
      </a>
    </article>`;
  };

  const about = () => `
    <section>
      <div class="about-hero">
        ${portrait('portrait-about')}
        <div class="about-copy">
          <p class="eyebrow" style="margin:0">About</p>
          <h1>Sanjay Karthik <em>Thyagarajan</em></h1>
          <p>UI/UX designer and Computer Science graduate (CGPA 9.078/10) based in Chennai. I design responsive websites and mobile/tablet apps in Figma and Wix Studio, from user research and wireframes to high-fidelity prototypes, design systems and developer handoff.</p>
          <p>I’m comfortable in HTML, CSS and JavaScript, design for accessibility (WCAG 2.1), and use AI-assisted workflows with careful manual QA. Google UX Design certified.</p>
        </div>
      </div>

      <div class="section split">
        <div><p class="eyebrow">Experience</p><h2 class="h2">Internships</h2></div>
        <div>
          ${JOBS.map(j => `
            <div class="job">
              <div class="job-head"><b>${esc(j.role)}, ${esc(j.company)}</b><span class="dates">${esc(j.dates)}</span></div>
              <div class="muted" style="font-size:14px">${esc(j.place)} · ${esc(j.tools)}</div>
              <ul>${j.points.map(b => `<li>${esc(b)}</li>`).join('')}</ul>
            </div>`).join('')}
        </div>
      </div>

      <div class="section split">
        <div><p class="eyebrow">Skills</p><h2 class="h2">Capabilities</h2></div>
        <div>${SKILLS.map(g => `<div class="skill-row"><b>${esc(g.title)}</b>${chips(g.items)}</div>`).join('')}</div>
      </div>

      <div class="section facts">
        <div class="card">
          <p class="eyebrow">Education</p>
          <h3>B.Tech, Computer Science and Engineering</h3>
          <p class="muted">SRM Institute of Science and Technology, Ramapuram, Chennai</p>
          <div class="card-top" style="margin-top:auto"><span>CGPA 9.078/10</span><span>2022 – 2026</span></div>
        </div>
        <div class="card">
          <p class="eyebrow">Certifications</p>
          ${CERTS.map(c => `<div class="cert"><b>${esc(c.t)}</b><span>${esc(c.s)}</span></div>`).join('')}
        </div>
        <div class="card card-dark">
          <p class="eyebrow eyebrow-dark">Recognition & leadership</p>
          ${AWARDS.map(a => `<div class="award">${esc(a)}</div>`).join('')}
        </div>
      </div>
    </section>`;

  /* ---------- Router ---------- */
  const view = $('#view');
  const parse = () => {
    const [page, id] = (location.hash || '').replace(/^#\/?/, '').split('/');
    if (page === 'work' || page === 'about') return { page };
    if (page === 'case' && PROJECTS.some(p => p.id === id)) return { page: 'case', id };
    return { page: 'home' };
  };
  const titles = { home: 'UI/UX Designer', work: 'Work', about: 'About' };
  const render = (scroll = true) => {
    const r = parse();
    view.innerHTML = r.page === 'work' ? work() : r.page === 'about' ? about() : r.page === 'case' ? caseStudy(r.id) : home();
    view.classList.remove('view-enter'); void view.offsetWidth; view.classList.add('view-enter');
    const active = r.page === 'case' ? 'work' : r.page;
    document.querySelectorAll('[data-nav]').forEach(a => {
      a.classList.toggle('is-active', a.dataset.nav === active);
      a.toggleAttribute('aria-current', a.dataset.nav === active);
    });
    const pt = r.page === 'case' ? PROJECTS.find(p => p.id === r.id).title : titles[r.page];
    document.title = `Sanjay Karthik · ${pt}`;
    if (scroll) window.scrollTo(0, 0);
    document.body.dataset.page = r.page;
    animate();
  };
  window.addEventListener('hashchange', () => { if (location.hash !== '#contact') render(); });

  /* ---------- Header menu ---------- */
  const nav = $('.nav'), btn = $('.menu-btn');
  const setMenu = open => {
    if (open === nav.classList.contains('is-open')) return;
    nav.classList.toggle('is-open', open);
    document.documentElement.classList.toggle('menu-open', open);
    document.documentElement.classList.toggle('nav-open', open);
    btn.setAttribute('aria-expanded', open);
    btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  };
  btn.addEventListener('click', () => setMenu(!nav.classList.contains('is-open')));
  $('#nav-links').addEventListener('click', e => { if (e.target.closest('a')) setMenu(false); });
  document.addEventListener('click', e => { if (!nav.contains(e.target)) setMenu(false); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && nav.classList.contains('is-open')) { setMenu(false); btn.focus(); } });
  matchMedia('(min-width:821px)').addEventListener('change', () => setMenu(false));

  /* ---------- Actions ---------- */
  const toast = $('.toast');
  const say = msg => { toast.textContent = msg; toast.classList.add('show'); clearTimeout(say.t); say.t = setTimeout(() => toast.classList.remove('show'), 1800); };
  document.addEventListener('click', async e => {
    const f = e.target.closest('[data-filter]');
    if (f) { filter = f.dataset.filter; render(false); return; }
    if (e.target.closest('[data-copy]')) {
      try { await navigator.clipboard.writeText(SITE.email); say('Email copied ✓'); }
      catch { location.href = 'mailto:' + SITE.email; }
      return;
    }
    if (e.target.closest('[data-contact]')) {
      e.preventDefault();
      $('#contact').scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
    }
  });


  /* ---------- Motion ---------- */
  const calm = matchMedia('(prefers-reduced-motion: reduce)');
  const REVEAL = ['.hero-main > *', '.portrait', '.stat', '.section-head', '.project', '.quote', '.job-row',
    '.section.split > *', '.toolkit .card', '.page-title', '.filters', '.list-row', '.earlier .card',
    '.back', '.case-title', '.case-tagline', '.case-meta', '.case-hero', '.brief', '.case-stats .card', '.step',
    '.shots figure', '.next', '.about-copy', '.job', '.skill-row', '.facts .card', '.contact > *'].join(',');
  const io = 'IntersectionObserver' in window ? new IntersectionObserver(entries => {
    entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }) : null;
  const splitWords = h => {
    if (!h || h.dataset.split) return; h.dataset.split = 1; let n = 0;
    const wrap = node => {
      [...node.childNodes].forEach(ch => {
        if (ch.nodeType === 3) {
          const frag = document.createDocumentFragment();
          ch.textContent.split(/(\s+)/).forEach(part => {
            if (!part) return;
            if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(part)); return; }
            const w = document.createElement('span'); w.className = 'w'; w.style.setProperty('--i', n++);
            w.textContent = part; frag.appendChild(w);
          });
          ch.replaceWith(frag);
        } else if (ch.nodeType === 1) { ch.classList.add('w'); ch.style.setProperty('--i', n++); }
      });
    };
    wrap(h);
  };
  function animate() {
    document.querySelectorAll('#main img').forEach(i => { if (i.complete && i.naturalWidth) i.classList.add('is-loaded'); });
    if (calm.matches || !io) return;
    splitWords(document.querySelector('.hero h1'));
    const els = [...document.querySelectorAll(REVEAL)];
    els.forEach(el => {
      if (el.classList.contains('in')) return;
      const sib = [...el.parentElement.children].filter(x => x.matches(REVEAL));
      el.style.setProperty('--d', Math.min(sib.indexOf(el), 6) * 70 + 'ms');
      el.classList.add('reveal'); io.observe(el);
    });
  }

  /* Header: solid when scrolled, reading progress on case studies */
  const header = $('.site-header'), bar = $('.progress');
  const onScroll = () => {
    header.classList.toggle('is-scrolled', scrollY > 8);
    if (document.body.dataset.page === 'case') {
      const max = document.documentElement.scrollHeight - innerHeight;
      bar.style.transform = `scaleX(${max > 0 ? Math.min(scrollY / max, 1) : 0})`;
    } else bar.style.transform = 'scaleX(0)';
    // anything already scrolled past (e.g. after a fast jump) is shown straight away
    if (!onScroll.t) onScroll.t = requestAnimationFrame(() => {
      onScroll.t = 0;
      document.querySelectorAll('.reveal:not(.in)').forEach(el => {
        if (el.getBoundingClientRect().top < innerHeight) { el.classList.add('in'); io && io.unobserve(el); }
      });
    });
  };
  addEventListener('scroll', onScroll, { passive: true });
  addEventListener('resize', onScroll);

  /* ---------- Lightbox for gallery images ---------- */
  const lb = document.createElement('div');
  lb.className = 'lightbox'; lb.setAttribute('role', 'dialog'); lb.setAttribute('aria-modal', 'true'); lb.setAttribute('aria-label', 'Image viewer'); lb.hidden = true;
  lb.innerHTML = `<button class="lb-btn lb-close" aria-label="Close">✕</button>
    <button class="lb-btn lb-prev" aria-label="Previous image">‹</button>
    <figure class="lb-fig"><img alt=""><figcaption><span class="lb-cap"></span><span class="lb-count"></span></figcaption></figure>
    <button class="lb-btn lb-next" aria-label="Next image">›</button>`;
  document.body.appendChild(lb);
  let lbItems = [], lbIdx = 0, lbReturn = null;
  const lbShow = i => {
    lbIdx = (i + lbItems.length) % lbItems.length;
    const it = lbItems[lbIdx], im = $('img', lb);
    im.classList.remove('is-loaded'); im.src = it.src; im.alt = it.alt;
    $('.lb-cap', lb).textContent = it.cap; $('.lb-count', lb).textContent = `${lbIdx + 1} / ${lbItems.length}`;
  };
  const lbOpen = el => {
    lbItems = [...document.querySelectorAll('[data-zoom]')].filter(m => $('img', m)).map(m => ({
      el: m, src: $('img', m).currentSrc || $('img', m).src, alt: $('img', m).alt,
      cap: m.closest('figure').querySelector('figcaption').textContent }));
    const start = lbItems.findIndex(x => x.el === el); if (start < 0) return;
    lbReturn = el; lb.hidden = false; document.documentElement.classList.add('menu-open');
    requestAnimationFrame(() => lb.classList.add('open')); lbShow(start); $('.lb-close', lb).focus();
  };
  const lbClose = () => {
    lb.classList.remove('open'); document.documentElement.classList.remove('menu-open');
    setTimeout(() => { lb.hidden = true; }, calm.matches ? 0 : 200); if (lbReturn) lbReturn.focus();
  };
  lb.addEventListener('click', e => {
    if (e.target.closest('.lb-next')) lbShow(lbIdx + 1);
    else if (e.target.closest('.lb-prev')) lbShow(lbIdx - 1);
    else if (e.target.closest('.lb-close') || e.target === lb) lbClose();
  });
  $('img', lb).addEventListener('load', e => e.target.classList.add('is-loaded'));
  let tx = null;
  lb.addEventListener('touchstart', e => { tx = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener('touchend', e => {
    if (tx === null) return; const dx = e.changedTouches[0].clientX - tx; tx = null;
    if (Math.abs(dx) > 50) lbShow(lbIdx + (dx < 0 ? 1 : -1));
  });
  document.addEventListener('keydown', e => {
    if (!lb.hidden) {
      if (e.key === 'Escape') lbClose();
      else if (e.key === 'ArrowRight') lbShow(lbIdx + 1);
      else if (e.key === 'ArrowLeft') lbShow(lbIdx - 1);
      else if (e.key === 'Tab') { const f = [...lb.querySelectorAll('button')]; const i = f.indexOf(document.activeElement);
        e.preventDefault(); f[(i + (e.shiftKey ? -1 : 1) + f.length) % f.length].focus(); }
      return;
    }
    const z = e.target.closest && e.target.closest('[data-zoom]');
    if (z && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); lbOpen(z); }
  });
  document.addEventListener('click', e => { const z = e.target.closest('[data-zoom]'); if (z) lbOpen(z); });

  /* ---------- Static bits ---------- */
  $('#mailto').href = 'mailto:' + SITE.email;
  $('#linkedin').href = SITE.linkedin;
  $('#contact-line').textContent = `Chennai, India · ${SITE.phone}`;
  $('#year').textContent = new Date().getFullYear();
  setInterval(() => { const c = $('[data-clock]'); if (c) c.textContent = istTime(); }, 15000);

  render(false);
  onScroll();
})();
