/* EduConnect — React components shared by the five HTML pages.
   Uses locally bundled React, ReactDOM and htm; no build step required. */
(() => {
  "use strict";
  const { useState, useEffect } = React;
  const html = htm.bind(React.createElement);
  const ROOT = document.body.dataset.root || ".";
  const PAGE = document.body.dataset.page || "home";
  const resources = window.EDU_RESOURCES;
  const topics = window.EDU_TOPICS;
  const STORAGE_KEY = "educonnect-reading-list-v1";
  const pageUrl = (page, query = "") => `${ROOT}/html/${page}.html${query}`;
  const detailUrl = (id) => pageUrl("resource", `?id=${encodeURIComponent(id)}`);
  const topicFor = (id) => topics.find((t) => t[0] === id);
  const symbols = {
    html: "HTML",
    css: "CSS",
    javascript: "JS",
    python: "Py",
    cs50: "{ }",
    sql: "SQL",
    sqlite: "SQL",
    "open-security": "◇",
    "cs50-security": "◇",
    networking: "⌘",
    dns: "DNS",
    git: "git",
    github: ">_",
  };
  const outcomeByTopic = {
    web: [
      "Understand the core concepts behind web development.",
      "Follow examples and practise in your own editor.",
      "Apply what you learn to a small web project.",
    ],
    programming: [
      "Explore programming concepts and problem-solving.",
      "Follow worked examples at your own pace.",
      "Practise writing and understanding code.",
    ],
    data: [
      "Understand how relational data is organised.",
      "Explore tables, queries and database concepts.",
      "Practise applying database ideas to examples.",
    ],
    security: [
      "Recognise common digital security challenges.",
      "Explore ways to protect accounts and devices.",
      "Apply safer habits to your digital life.",
    ],
    networks: [
      "Explore how connected devices communicate.",
      "Understand key networking terms and concepts.",
      "Connect networking ideas to everyday internet use.",
    ],
    tools: [
      "Understand the purpose of development tools.",
      "Explore version control and collaboration workflows.",
      "Practise using tools in a personal project.",
    ],
  };
  function Icon({ name, size = 21, ...props }) {
    const paths = {
      search: "M21 21l-5.2-5.2M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0",
      bookmark: "M6 3h12v18l-6-4-6 4z",
      arrow: "M4 12h16m-6-6 6 6-6 6",
      back: "M20 12H4m6-6-6 6 6 6",
      external: "M14 3h7v7m0-7L10 14M10 3H3v18h18v-7",
      trash: "M3 6h18M9 6V3h6v3M5 6l1 15h12l1-15M10 10v7m4-7v7",
      menu: "M3 6h18M3 12h18M3 18h18",
      close: "M5 5l14 14M19 5 5 19",
      check: "M5 12l4 4L19 6",
      book: "M3 4h7l2 2 2-2h7v15h-7l-2 2-2-2H3zM12 6v15",
      clock: "M12 8v5l3 2M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0",
      info: "M12 11v6M12 7h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0",
      shield: "M12 2l8 3v6c0 5-4 8-8 11-4-3-8-6-8-11V5z",
      user: "M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0M4 21v-2a8 8 0 0 1 16 0v2",
      database:
        "M20 5c0 2-4 3-8 3S4 7 4 5s4-3 8-3 8 1 8 3zm0 0v14c0 2-4 3-8 3s-8-1-8-3V5m0 7c0 2 4 3 8 3s8-1 8-3",
      code: "M8 5l-6 7 6 7M16 5l6 7-6 7M14 3l-4 18",
      network: "M12 8v5M5 16v-3h14v3M9 2h6v6H9zM2 16h6v6H2zM16 16h6v6h-6z",
      tools: "M14 3l-3 3 4 4 3-3c2 5-1 8-6 6l-7 8-3-3 8-7C8 6 10 3 14 3",
      leaf: "M20 3C9 2 3 7 5 15c6 5 15 0 15-12zM3 22l12-13",
    };
    if (name === "cap")
      return html`<svg width=${size} height=${size} viewBox="0 0 32 32" fill="none" aria-hidden="true" ...${props}><path d="M1 11 16 4l15 7-15 7z" fill="currentColor"/><path d="M7 16v8q9 7 18 0v-8l-9 5z" fill="currentColor" opacity=".8"/><path d="M29 13v11" stroke="currentColor" strokeWidth="2"/></svg>`;
    return html`<svg width=${size} height=${size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" ...${props}><path d=${paths[name] || paths.book}/></svg>`;
  }
  function Logo() {
    return html`<a className="brand" href=${pageUrl("home")} aria-label="EduConnect home"><${Icon} name="cap" size=${42}/><span>EduConnect<small>Learn · Discover · Grow</small></span></a>`;
  }
  function Header({ count }) {
    const [open, setOpen] = useState(false);
    const active = PAGE === "resource" ? "catalogue" : PAGE;
    return html`<header className="site-header"><div className="container header-content"><${Logo}/><button className="icon-button menu-button" type="button" onClick=${() => setOpen(!open)} aria-controls="main-nav" aria-expanded=${open} aria-label=${open ? "Close menu" : "Open menu"}><${Icon} name=${open ? "close" : "menu"}/></button><nav id="main-nav" className=${open ? "main-nav is-open" : "main-nav"} aria-label="Main navigation">${[
      ["home", "Home"],
      ["catalogue", "Resources"],
      ["saved", "My Reading List"],
      ["about", "About"],
    ].map(
      ([p, label]) =>
        html`<a key=${p} href=${pageUrl(p)} aria-current=${active === p ? "page" : undefined}>${label}${p === "saved" && count > 0 ? html`<span className="count-badge">${count}</span>` : null}</a>`,
    )}</nav><div className="header-actions"><a className="icon-button" href=${pageUrl("catalogue", "#resource-search")} aria-label="Search resources"><${Icon} name="search"/></a><a className="icon-button account-icon" href=${pageUrl("about", "#project")} aria-label="About this learning platform"><${Icon} name="info"/></a></div></div></header>`;
  }
  function Footer() {
    return html`<footer className="site-footer"><div className="container footer-content"><span><strong>EduConnect</strong><span className="footer-divider">|</span>Supporting SDG 4 – Quality Education</span><div><a href=${pageUrl("about", "#accessibility")}>Accessibility</a><a href=${pageUrl("about", "#privacy")}>Privacy</a><a href=${pageUrl("about", "#project")}>Our project</a></div></div></footer>`;
  }
  function Thumb({ resource, large = false }) {
    return html`<div className=${`resource-thumb ${large ? "large" : ""}`} data-topic=${resource.topic} aria-hidden="true">${symbols[resource.id] || "</>"}</div>`;
  }
  function Tags({ resource, subject = false }) {
    return html`<div className="tags"><span>${resource.level}</span><span>${resource.format}</span>${subject ? html`<span>${topicFor(resource.topic)[1]}</span>` : null}</div>`;
  }
  function SaveButton({ resource, saved, onSave, compact = false }) {
    return html`<button type="button" className=${compact ? `icon-button bookmark-button ${saved ? "is-saved" : ""}` : `button ${saved ? "saved-button" : "outline-button"}`} aria-pressed=${saved} aria-label=${`${saved ? "Remove from" : "Save to"} reading list: ${resource.title}`} onClick=${() => onSave(resource.id)}><${Icon} name=${saved ? "check" : "bookmark"} size=${compact ? 18 : 19}/>${compact ? null : saved ? "Saved to Reading List" : "Save Resource"}</button>`;
  }
  function Card({ resource, saved, onSave, reading = false }) {
    return html`<article className=${`resource-card ${reading ? "reading-card" : ""}`}><a className="card-image-link" href=${detailUrl(resource.id)} aria-label=${`View ${resource.title}`}><${Thumb} resource=${resource}/></a><div className="card-information"><p className="card-provider">${resource.provider}</p><h3><a href=${detailUrl(resource.id)}>${resource.title}</a></h3><p className="card-description">${resource.description}</p><div className="card-tags-row"><${Tags} resource=${resource}/>${!reading ? html`<${SaveButton} resource=${resource} saved=${saved} onSave=${onSave} compact=${true}/>` : null}</div></div><div className="card-actions"><a className="button primary-button" href=${detailUrl(resource.id)}>View Resource <${Icon} name="arrow" size=${16}/></a>${reading ? html`<button className="button remove-button" type="button" onClick=${() => onSave(resource.id)} aria-label=${`Remove ${resource.title}`}><${Icon} name="trash" size=${16}/>Remove</button>` : null}</div></article>`;
  }
  function ResourceGrid({ list, saved, onSave, reading = false }) {
    return html`<div className=${reading ? "resource-grid reading-grid" : "resource-grid"}>${list.map((resource) => html`<${Card} key=${resource.id} resource=${resource} saved=${saved.includes(resource.id)} onSave=${onSave} reading=${reading}/>`)}</div>`;
  }
  function SearchForm({ initial = "", onSearch, hero = false }) {
    const [value, setValue] = useState(initial);
    useEffect(() => setValue(initial), [initial]);
    return html`<form className=${hero ? "search-form hero-search" : "search-form"} role="search" action=${pageUrl("catalogue")} onSubmit=${
      onSearch
        ? (e) => {
            e.preventDefault();
            onSearch(value.trim());
          }
        : undefined
    }><div className="search-input"><${Icon} name="search" size=${20}/><label className="sr-only" htmlFor=${hero ? "home-search" : "resource-search"}>Search learning resources</label><input id=${hero ? "home-search" : "resource-search"} name="q" type="search" value=${value} onChange=${(e) => setValue(e.target.value)} placeholder=${hero ? "Search for resources, subjects or keywords…" : "Search resources, e.g. “Python”, “web development”…"}/></div><button className="button primary-button" type="submit">Search</button></form>`;
  }
  function SectionTitle({ title, link = "View all resources", href = pageUrl("catalogue") }) {
    return html`<div className="section-title"><h2>${title}</h2><a href=${href}>${link} <${Icon} name="arrow" size=${15}/></a></div>`;
  }
  function SDGBadge() {
    return html`<div className="sdg-badge" aria-label="SDG 4: Quality Education"><strong>4</strong><span>QUALITY<br/>EDUCATION</span><${Icon} name="book" size=${35}/></div>`;
  }
  function Home({ saved, onSave }) {
    const icons = ["code", "code", "database", "shield", "network", "tools"];
    return html`<main id="main" className="container home-main"><section className="hero"><img className="hero-photo" src=${`${ROOT}/assets/learning-hero.webp`} alt=""/><div className="hero-overlay"></div><div className="hero-copy"><p className="eyebrow">YOUR NEXT CHAPTER STARTS HERE</p><h1>Resources for a<br/><span>Brighter Future</span></h1><p>Discover free resources in computing and digital skills.<br className="desktop-break"/> Find your starting point and learn at your own pace,<br className="desktop-break"/> supporting Quality Education (SDG 4).</p><${SearchForm} hero=${true}/><div className="hero-bottom"><${SDGBadge}/><p>A brighter future<br/>through education</p></div></div><p className="hero-handwriting">Learn.<br/>Apply.<br/>Grow.<i></i></p></section><section className="popular-section"><h2>Popular Subjects</h2><div className="subject-pills">${[
      ["Py", "Python", "?q=python"],
      ["SQL", "SQL", "?subject=data"],
      ["JS", "JavaScript", "?q=javascript"],
      ["</>", "HTML & CSS", "?subject=web"],
      ["◇", "Cybersecurity", "?subject=security"],
      ["⌘", "Networking", "?subject=networks"],
    ].map(
      ([symbol, label, query]) =>
        html`<a key=${label} href=${pageUrl("catalogue", query)}><b className=${`pill-symbol ${symbol === "JS" ? "js-symbol" : ""}`}>${symbol}</b>${label}</a>`,
    )}</div></section><section className="home-section"><${SectionTitle} title="Browse by Subject" link="View all subjects"/><div className="subjects-grid">${topics.map((topic, index) => html`<a className="subject-card" key=${topic[0]} href=${pageUrl("catalogue", `?subject=${topic[0]}`)}><span className="subject-icon"><${Icon} name=${icons[index]} size=${30}/></span><div><h3>${topic[1]}</h3><p>${topic[3]}</p></div><span className="subject-arrow">›</span></a>`)}</div></section><section className="home-section"><${SectionTitle} title="Featured Resources"/><${ResourceGrid} list=${resources.filter((r) => r.featured)} saved=${saved} onSave=${onSave}/></section><a className="education-banner" href=${pageUrl("about", "#sdg4")}><${Icon} name="leaf" size=${42}/><div><strong>Education opens possibilities</strong><p>A more accessible starting point for independent learning.</p></div><${SDGBadge}/><span>Supporting the United Nations<br/>Sustainable Development Goal 4.</span></a></main>`;
  }
  function Catalogue({ saved, onSave }) {
    const params = new URLSearchParams(location.search);
    const [query, setQuery] = useState(params.get("q") || "");
    const [subject, setSubject] = useState(
      topics.some((t) => t[0] === params.get("subject")) ? params.get("subject") : "",
    );
    const levels = [...new Set(resources.map((r) => r.level))];
    const formats = [...new Set(resources.map((r) => r.format))];
    const [level, setLevel] = useState(
      levels.includes(params.get("level")) ? params.get("level") : "",
    );
    const [format, setFormat] = useState(
      formats.includes(params.get("format")) ? params.get("format") : "",
    );
    const [sort, setSort] = useState(params.get("sort") === "za" ? "za" : "az");
    const [page, setPage] = useState(Math.max(1, parseInt(params.get("page"), 10) || 1));
    const filtered = resources
      .filter(
        (r) =>
          (!query ||
            `${r.title} ${r.description} ${r.provider} ${r.tags} ${topicFor(r.topic)[1]}`
              .toLowerCase()
              .includes(query.toLowerCase())) &&
          (!subject || r.topic === subject) &&
          (!level || r.level === level) &&
          (!format || r.format === format),
      )
      .sort((a, b) =>
        sort === "az" ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title),
      );
    const pageCount = Math.max(1, Math.ceil(filtered.length / 9));
    const current = Math.min(page, pageCount);
    useEffect(() => {
      const p = new URLSearchParams();
      for (const [key, value] of Object.entries({
        q: query,
        subject,
        level,
        format,
        sort: sort === "az" ? "" : sort,
        page: current > 1 ? current : "",
      }))
        if (value) p.set(key, value);
      history.replaceState(
        null,
        "",
        `${location.pathname}${p.size ? "?" + p : ""}${location.hash}`,
      );
    }, [query, subject, level, format, sort, current]);
    const update = (setter) => (e) => {
      setter(e.target.value);
      setPage(1);
    };
    const reset = () => {
      setQuery("");
      setSubject("");
      setLevel("");
      setFormat("");
      setSort("az");
      setPage(1);
    };
    return html`<main id="main" className="container page-main"><div className="page-heading"><p className="eyebrow">DISCOVER YOUR NEXT SKILL</p><h1>Resources Catalogue</h1><p>Browse, search and filter free learning resources to build your skills.</p></div><section className="catalogue-controls" aria-label="Search and filter resources"><${SearchForm} initial=${query} onSearch=${(
      q,
    ) => {
      setQuery(q);
      setPage(1);
    }}/><div className="filter-row"><label>Subject<select value=${subject} onChange=${update(setSubject)}><option value="">All Subjects</option>${topics.map((t) => html`<option key=${t[0]} value=${t[0]}>${t[1]}</option>`)}</select></label><label>Level<select value=${level} onChange=${update(setLevel)}><option value="">All Levels</option>${levels.map((l) => html`<option key=${l}>${l}</option>`)}</select></label><label>Format<select value=${format} onChange=${update(setFormat)}><option value="">All Formats</option>${formats.map((f) => html`<option key=${f}>${f}</option>`)}</select></label><label>Sort by<select value=${sort} onChange=${update(setSort)}><option value="az">A – Z</option><option value="za">Z – A</option></select></label></div></section><div className="results-summary"><p role="status">${filtered.length === 0 ? "No resources found" : `Showing ${(current - 1) * 9 + 1}–${Math.min(current * 9, filtered.length)} of ${filtered.length} resources`}</p>${query || subject || level || format || sort !== "az" ? html`<button className="text-button" type="button" onClick=${reset}>Clear filters</button>` : html`<span>Free to access · Learn at your own pace</span>`}</div>${filtered.length ? html`<${ResourceGrid} list=${filtered.slice((current - 1) * 9, current * 9)} saved=${saved} onSave=${onSave}/>` : html`<div className="empty-state"><${Icon} name="search" size=${42}/><h2>Let’s try another search</h2><p>Try a different keyword or clear the filters to see all resources.</p><button className="button primary-button" type="button" onClick=${reset}>Show all resources</button></div>`}<nav className="pagination" aria-label="Resource pages"><button disabled=${current === 1} type="button" onClick=${() => setPage(current - 1)}>← Previous</button>${Array.from({ length: pageCount }, (_, i) => html`<button key=${i} type="button" aria-label=${`Page ${i + 1}`} aria-current=${current === i + 1 ? "page" : undefined} onClick=${() => setPage(i + 1)}>${i + 1}</button>`)}<button disabled=${current === pageCount} type="button" onClick=${() => setPage(current + 1)}>Next →</button></nav><p className="catalogue-note">Materials are hosted by their original providers. Some providers require an account for exercises or charge for optional certificates.</p></main>`;
  }
  function Details({ saved, onSave }) {
    const id = new URLSearchParams(location.search).get("id") || "html";
    const resource = resources.find((r) => r.id === id);
    const [tab, setTab] = useState("Overview");
    useEffect(() => {
      if (resource) document.title = `${resource.title} | EduConnect`;
    }, [resource]);
    if (!resource)
      return html`<main id="main" className="container page-main"><div className="empty-state"><h1>Resource not found</h1><p>This resource is not in our catalogue.</p><a className="button primary-button" href=${pageUrl("catalogue")}>Back to catalogue</a></div></main>`;
    const tabs = ["Overview", "Learning focus", "Prerequisites", "Tags"];
    const related = resources
      .filter((r) => r.id !== resource.id)
      .sort((a, b) => Number(b.topic === resource.topic) - Number(a.topic === resource.topic))
      .slice(0, 3);
    return html`<main id="main" className="container page-main details-main"><a className="back-link" href=${pageUrl("catalogue")}><${Icon} name="back" size=${16}/>Back to catalogue</a><section className="detail-heading"><${Thumb} resource=${resource} large=${true}/><div><a className="provider-link" href=${resource.url} target="_blank" rel="noopener noreferrer">${resource.provider}</a><h1>${resource.title}</h1><p>${resource.description}</p><${Tags} resource=${resource} subject=${true}/></div><div className="detail-top-save"><${SaveButton} resource=${resource} saved=${saved.includes(id)} onSave=${onSave}/></div></section><div className="detail-layout"><aside className="resource-facts" aria-label="Resource information">${[
      ["user", "Provider", resource.provider],
      ["clock", "Pace", "Self-paced"],
      ["book", "Format", resource.format],
      ["shield", "Access", "Free learning materials"],
    ].map(
      ([icon, label, value]) =>
        html`<div className="fact" key=${label}><${Icon} name=${icon}/><div><strong>${label}</strong><span>${value}</span></div></div>`,
    )}<div className="fact"><${Icon} name="external"/><div><strong>External link</strong><a href=${resource.url} target="_blank" rel="noopener noreferrer">Visit provider ↗</a></div></div></aside><section className="detail-panel"><div className="detail-tabs" role="tablist" aria-label="Material information">${tabs.map(
      (name, i) =>
        html`<button key=${name} id=${`tab-${i}`} role="tab" type="button" tabIndex=${tab === name ? 0 : -1} aria-selected=${tab === name} aria-controls="detail-tab-panel" onClick=${() => setTab(name)} onKeyDown=${(
          e,
        ) => {
          let next;
          if (e.key === "ArrowRight") next = (i + 1) % tabs.length;
          if (e.key === "ArrowLeft") next = (i + tabs.length - 1) % tabs.length;
          if (e.key === "Home") next = 0;
          if (e.key === "End") next = tabs.length - 1;
          if (next !== undefined) {
            e.preventDefault();
            setTab(tabs[next]);
            document.getElementById(`tab-${next}`).focus();
          }
        }}>${name}</button>`,
    )}</div><div className="detail-tab-content" id="detail-tab-panel" role="tabpanel" tabIndex="0" aria-labelledby=${`tab-${tabs.indexOf(tab)}`}>${tab === "Overview" ? html`<p>${resource.description} Explore the original material and follow the provider’s examples at your own pace.</p><h2>Start learning with this resource</h2><ul className="check-list">${outcomeByTopic[resource.topic].map((text) => html`<li key=${text}><${Icon} name="check" size=${17}/>${text}</li>`)}</ul><div className="access-note"><strong>Before you start</strong><p>${resource.access}</p></div>` : tab === "Learning focus" ? html`<h2>Suggested learning focus</h2><p>Use these prompts to guide your independent learning.</p><ul className="check-list">${outcomeByTopic[resource.topic].map((text) => html`<li key=${text}><${Icon} name="check" size=${17}/>${text}</li>`)}</ul>` : tab === "Prerequisites" ? html`<h2>Getting ready</h2><p>${resource.level === "Beginner" ? "A starting point for beginners. A browser and time to practise are useful. Check the provider’s page for specific requirements." : "Some familiarity with the subject is useful. Check the provider’s introduction for its recommended background."}</p><p>${resource.access}</p>` : html`<h2>Explore related keywords</h2><div className="keyword-tags">${[...new Set(resource.tags.split(" "))].map((tag) => html`<a key=${tag} href=${pageUrl("catalogue", `?q=${encodeURIComponent(tag)}`)}>${tag}</a>`)}</div>`}</div><div className="detail-actions"><a className="button primary-button" href=${resource.url} target="_blank" rel="noopener noreferrer">Visit Resource <${Icon} name="external" size=${18}/></a><${SaveButton} resource=${resource} saved=${saved.includes(id)} onSave=${onSave}/></div><p className="external-note">Opens the provider’s website. Downloads are available only where the provider offers them.</p></section></div><section className="home-section related-section"><${SectionTitle} title="Related Resources" link="View all"/><${ResourceGrid} list=${related} saved=${saved} onSave=${onSave}/></section></main>`;
  }
  function ReadingList({ saved, onSave, onClear, onUndo, undo }) {
    const list = saved.map((id) => resources.find((r) => r.id === id)).filter(Boolean);
    return html`<main id="main" className="container page-main reading-main"><aside className="reading-illustration"><img src=${`${ROOT}/assets/learning-books.webp`} alt="Books and a graduation cap"/><p>Keep learning.<br/>Keep growing.</p><span></span></aside><section className="reading-content"><div className="reading-heading"><div><p className="eyebrow">YOUR PERSONAL LEARNING SHELF</p><h1>My Reading List</h1><p>Your saved resources, all in one place.</p></div><div className="reading-tools"><span>${list.length} saved ${list.length === 1 ? "resource" : "resources"}</span>${list.length ? html`<button className="button outline-button" onClick=${onClear} type="button"><${Icon} name="trash" size=${17}/>Clear all</button>` : null}</div></div>${undo ? html`<div className="undo-message">Reading list cleared.<button className="text-button" type="button" onClick=${onUndo}>Undo</button></div>` : null}${list.length ? html`<${ResourceGrid} list=${list} saved=${saved} onSave=${onSave} reading=${true}/>` : html`<div className="empty-state"><${Icon} name="bookmark" size=${44}/><h2>Your next chapter is waiting</h2><p>Save a resource from the catalogue and find it here whenever you want to learn.</p><a className="button primary-button" href=${pageUrl("catalogue")}>Explore Resources <${Icon} name="arrow" size=${17}/></a></div>`}<p className="reading-storage-note"><${Icon} name="info" size=${16}/>Your reading list is stored in this browser on this device.</p></section></main>`;
  }
  function About() {
    return html`<main id="main" className="container page-main about-main"><section className="about-hero"><div><p className="eyebrow">A SMALL STEP. A BRIGHTER FUTURE.</p><h1>Learning should<br/>open doors.</h1><p>We connect curious minds with free Computing resources, making the next step easier to find.</p><a className="button primary-button" href=${pageUrl("catalogue")}>Find your next resource <${Icon} name="arrow" size=${18}/></a></div><img src=${`${ROOT}/assets/learning-books.webp`} alt="A stack of books with a graduation cap"/></section><section id="sdg4" className="about-section"><h2>Quality education. More possibilities.</h2><p>EduConnect supports the ambition of SDG 4: Quality Education by making freely accessible learning materials easier to discover. It brings resources from educational providers into one clear, searchable catalogue.</p><div className="values-grid"><article><${SDGBadge}/><h3>Supporting SDG 4</h3><p>A more accessible starting point for independent learning.</p></article><article><${Icon} name="search" size=${38}/><h3>Less searching, more learning</h3><p>Browse by subject and filter by level or format to find a useful starting point.</p></article><article><${Icon} name="bookmark" size=${38}/><h3>Your own learning journey</h3><p>Keep useful materials in your reading list and return when you are ready.</p></article></div></section><div className="about-prose"><section id="project"><h2>About the project</h2><p>EduConnect is a student group project for CPU4106-20C. This version uses React for the interface, HTML page entry points, separate desktop and mobile CSS, and JavaScript for search, filters and reading-list interactions.</p><p>The five pages are Home, Resources Catalogue, Resource Details, My Reading List and About. This prototype has no login, user accounts or administrator dashboard.</p></section><section id="selection"><h2>Where the materials come from</h2><p>The catalogue reuses the supplied project’s resource list, including MDN Web Docs, Harvard CS50, The Open University and other providers. Each details page identifies its provider and explains access conditions. Provider pages can change; check their current requirements.</p><p>Materials stay on their original websites. EduConnect does not relicense or host these materials. Optional certificates, feedback or exercises may require payment or an account. Downloads depend on what the provider offers.</p></section><section id="accessibility"><h2>Accessibility</h2><p>The interface includes labelled controls, keyboard navigation, visible focus indicators, responsive layouts and status messages for reading-list changes. Resource information is presented as text as well as visual symbols.</p><p>These design choices still need testing with real users; they are not a claim of independently verified accessibility compliance.</p></section><section id="privacy"><h2>Privacy and your reading list</h2><p>Your reading list is saved in local browser storage on this device. No account or server database is used. Clearing browser data removes your saved list. If browser storage is blocked, changes last only while the current page remains open.</p><p>Following an external resource link takes you to the provider’s website, where its own privacy policy applies.</p></section></div><a className="education-banner" href=${pageUrl("catalogue")}><${Icon} name="leaf" size=${40}/><div><strong>Your next step starts here</strong><p>Explore something new. Learn at your own pace.</p></div><span className="banner-cta">Explore resources →</span></a></main>`;
  }
  function App() {
    const [storageAvailable, setStorageAvailable] = useState(true);
    const [saved, setSaved] = useState(() => {
      try {
        const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
        return Array.isArray(data)
          ? [...new Set(data.filter((id) => resources.some((r) => r.id === id)))]
          : [];
      } catch {
        return [];
      }
    });
    const [message, setMessage] = useState("");
    const [undo, setUndo] = useState(null);
    useEffect(() => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));
        setStorageAvailable(true);
      } catch {
        setStorageAvailable(false);
      }
    }, [saved]);
    useEffect(() => {
      const listener = (e) => {
        if (e.key === STORAGE_KEY) {
          try {
            const data = JSON.parse(e.newValue || "[]");
            setSaved(
              Array.isArray(data)
                ? [...new Set(data.filter((id) => resources.some((r) => r.id === id)))]
                : [],
            );
          } catch {}
        }
      };
      window.addEventListener("storage", listener);
      return () => window.removeEventListener("storage", listener);
    }, []);
    useEffect(() => {
      if (!message) return;
      const timer = setTimeout(() => setMessage(""), 3500);
      return () => clearTimeout(timer);
    }, [message]);
    const toggle = (id) => {
      const exists = saved.includes(id);
      setSaved((previous) => (exists ? previous.filter((x) => x !== id) : [...previous, id]));
      setUndo(null);
      setMessage(
        exists
          ? "Resource removed from your reading list."
          : "Resource saved to your reading list.",
      );
    };
    const props = { saved, onSave: toggle };
    return html`<a className="skip-link" href="#main">Skip to main content</a><${Header} count=${saved.length}/>${!storageAvailable ? html`<div className="storage-warning" role="status">Browser storage is unavailable. Your reading list will last only while this page is open.</div>` : null}${
      PAGE === "catalogue"
        ? html`<${Catalogue} ...${props}/>`
        : PAGE === "resource"
          ? html`<${Details} ...${props}/>`
          : PAGE === "saved"
            ? html`<${ReadingList} ...${props} undo=${undo} onClear=${() => {
                setUndo(saved);
                setSaved([]);
                setMessage("Reading list cleared. You can undo this action.");
              }} onUndo=${() => {
                setSaved(undo || []);
                setUndo(null);
                setMessage("Reading list restored.");
              }}/>`
            : PAGE === "about"
              ? html`<${About}/>`
              : html`<${Home} ...${props}/>`
    }<${Footer}/><div className=${message ? "toast visible" : "toast"} role="status" aria-live="polite">${message}</div>`;
  }
  ReactDOM.createRoot(document.getElementById("app")).render(html`<${App}/>`);
})();
