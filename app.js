/* Shared behaviour for The Complete HTML Guide */
(function () {
  "use strict";

  const PAGES = [
    { file: "index.html", num: "", title: "Home", sections: [] },
    { file: "01-fundamentals.html", num: "01", title: "Mental Model & Fundamentals", sections: [
      ["what-html-is", "What HTML actually is"],
      ["element-anatomy", "Anatomy of an element"],
      ["void-elements", "Void elements & the <div /> gotcha"],
      ["content-models", "Content models"],
      ["illegal-nesting", "Illegal nesting"],
      ["character-references", "Character references"],
      ["case-quotes-whitespace", "Case, quotes, whitespace"]
    ]},
    { file: "02-structure.html", num: "02", title: "Document Structure & Metadata", sections: [
      ["minimal-doc", "Minimal modern document"],
      ["non-negotiables", "Non-negotiables"],
      ["head-elements", "Elements allowed in <head>"],
      ["essential-metadata", "Essential metadata"],
      ["base-warning", "The <base> warning"]
    ]},
    { file: "03-text.html", num: "03", title: "Text Content", sections: [
      ["headings", "Headings"],
      ["paragraphs-breaks", "Paragraphs, br, hr"],
      ["emphasis", "Emphasis / importance"],
      ["quotes-code", "blockquote, q, pre, code, kbd, samp, var"],
      ["definition-lists", "Definition lists"],
      ["time", "The <time> element"],
      ["sup-sub-abbr", "sup, sub, abbr"],
      ["ruby", "Ruby"],
      ["bidi", "Bidirectional text"]
    ]},
    { file: "04-links.html", num: "04", title: "Links & Navigation", sections: [
      ["anchor-element", "The <a> element"],
      ["path-rules", "Path rules"],
      ["link-best-practices", "Link best practices"],
      ["fragment-skip", "Fragments and skip links"],
      ["image-maps", "Image maps"]
    ]},
    { file: "05-images.html", num: "05", title: "Images & Responsive Images", sections: [
      ["image-basics", "Basics"],
      ["alt-rules", "alt text rules"],
      ["srcset-w", "srcset + sizes (w descriptors)"],
      ["srcset-x", "srcset (x descriptors)"],
      ["picture", "picture / art direction"],
      ["figure", "figure / figcaption"],
      ["loading-strategy", "Loading strategy"]
    ]},
    { file: "06-media.html", num: "06", title: "Media", sections: [
      ["video", "video"],
      ["audio", "audio"],
      ["iframe", "iframe"],
      ["canvas-svg", "canvas and inline SVG"]
    ]},
    { file: "07-lists-tables.html", num: "07", title: "Lists & Tables", sections: [
      ["lists", "ul, ol, menu"],
      ["table-anatomy", "Full table example"],
      ["complex-tables", "Complex tables (id + headers)"]
    ]},
    { file: "08-forms.html", num: "08", title: "Forms", sections: [
      ["form-structure", "Structure: fieldset, legend, label, name"],
      ["form-attributes", "form attributes"],
      ["input-types", "Input types"],
      ["number-caveat", "type=number caveat"],
      ["validation-attributes", "Validation attributes"],
      ["labels-hints-errors", "Labels, hints, errors"],
      ["checkboxes-radios", "Checkboxes and radios"],
      ["select-datalist", "select, optgroup, datalist, textarea"],
      ["buttons-overrides", "Buttons and form overrides"],
      ["autocomplete-tokens", "Autocomplete tokens"],
      ["hidden-csrf", "Hidden fields and CSRF"],
      ["output-meter-progress", "output, meter, progress"],
      ["search-landmark", "The <search> landmark"]
    ]},
    { file: "09-semantics.html", num: "09", title: "Semantic Page Layout", sections: [
      ["page-skeleton", "Full page skeleton"],
      ["semantics-table", "Element semantics"],
      ["rules-of-thumb", "Rules of thumb"]
    ]},
    { file: "10-interactive.html", num: "10", title: "Interactive & Disclosure Elements", sections: [
      ["details-summary", "details / summary"],
      ["dialog", "dialog"],
      ["popover", "Popover API"],
      ["template-slot", "template and slot"]
    ]},
    { file: "11-global-attributes.html", num: "11", title: "Global Attributes", sections: [
      ["global-table", "Full table"],
      ["data-attributes", "data-* attributes"],
      ["hidden-inert", "hidden vs inert vs display:none"]
    ]},
    { file: "12-accessibility.html", num: "12", title: "Accessibility & ARIA", sections: [
      ["first-rule-aria", "First rule of ARIA"],
      ["landmarks-structure", "Landmarks and structure"],
      ["accessible-names", "Accessible names priority"],
      ["aria-states", "ARIA states & properties"],
      ["live-regions", "Live regions"],
      ["focus-management", "Focus management"],
      ["semantic-checklist", "Semantic checklist"]
    ]},
    { file: "13-seo.html", num: "13", title: "SEO, Social & Structured Data", sections: [
      ["on-page-essentials", "On-page essentials"],
      ["crawling-control", "Crawling control"],
      ["open-graph", "Open Graph & Twitter Cards"],
      ["json-ld", "JSON-LD structured data"],
      ["semantic-seo", "Semantic HTML is SEO"]
    ]},
    { file: "14-performance.html", num: "14", title: "Performance-Oriented HTML", sections: [
      ["resource-hints", "Resource hints"],
      ["preload-rules", "Preload rules"],
      ["script-loading", "Script loading"],
      ["cwv-levers", "Core Web Vitals levers"],
      ["noscript", "noscript & progressive enhancement"]
    ]},
    { file: "15-advanced.html", num: "15", title: "Advanced Topics", sections: [
      ["custom-elements", "Custom Elements"],
      ["shadow-dom", "Shadow DOM"],
      ["declarative-shadow", "Declarative Shadow DOM"],
      ["microdata-jsonld", "Microdata vs JSON-LD"],
      ["pwa-manifest", "PWA manifest"],
      ["security", "Security: SRI, referrer, CSP"]
    ]},
    { file: "16-validation.html", num: "16", title: "Validation, Tooling & Final Checklist", sections: [
      ["validation-tools", "Validation tools"],
      ["best-practices", "15 senior-level best practices"],
      ["shipping-checklist", "Before you ship"]
    ]},
    { file: "appendix.html", num: "A", title: "Appendix — Quick Gotchas", sections: [
      ["gotchas-table", "Symptom → cause"]
    ]}
  ];

  /* ---------- theme ---------- */
  const root = document.documentElement;
  function applyTheme(t) {
    root.setAttribute("data-theme", t);
    const btn = document.getElementById("theme-toggle");
    if (btn) btn.setAttribute("aria-label", t === "dark" ? "Switch to light mode" : "Switch to dark mode");
  }
  function initTheme() {
    const stored = localStorage.getItem("html-guide-theme");
    if (stored === "light" || stored === "dark") return applyTheme(stored);
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    applyTheme(prefersDark ? "dark" : "light");
  }
  initTheme();
  const themeBtn = document.getElementById("theme-toggle");
  if (themeBtn) {
    themeBtn.addEventListener("click", () => {
      const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      applyTheme(next);
      localStorage.setItem("html-guide-theme", next);
    });
  }

  /* ---------- current page ---------- */
  const current = (location.pathname.split("/").pop() || "index.html").split("#")[0];

  /* ---------- build sidebar ---------- */
  function buildSidebar() {
    const toc = document.getElementById("toc");
    if (!toc) return;
    const frag = document.createDocumentFragment();
    PAGES.forEach(p => {
      const li = document.createElement("li");
      const a = document.createElement("a");
      a.href = p.file;
      if (p.num) {
        const n = document.createElement("span");
        n.className = "num";
        n.textContent = p.num;
        a.appendChild(n);
      }
      a.appendChild(document.createTextNode(p.title));
      li.appendChild(a);
      if (p.file === current) {
        li.classList.add("is-current");
        if (p.sections.length) {
          const sub = document.createElement("ul");
          p.sections.forEach(([id, label]) => {
            const sli = document.createElement("li");
            const sa = document.createElement("a");
            sa.href = "#" + id;
            sa.textContent = label;
            sa.dataset.section = id;
            sli.appendChild(sa);
            sub.appendChild(sli);
          });
          li.appendChild(sub);
        }
      }
      frag.appendChild(li);
    });
    toc.appendChild(frag);
  }
  buildSidebar();

  /* ---------- mobile drawer ---------- */
  const tocToggle = document.getElementById("toc-toggle");
  const overlay = document.getElementById("overlay");
  const sidebar = document.getElementById("sidebar");
  function setDrawer(open) {
    document.body.classList.toggle("nav-open", open);
    if (tocToggle) tocToggle.setAttribute("aria-expanded", String(open));
    if (overlay) overlay.hidden = !open;
  }
  if (tocToggle) {
    tocToggle.addEventListener("click", () => setDrawer(!document.body.classList.contains("nav-open")));
  }
  if (overlay) overlay.addEventListener("click", () => setDrawer(false));
  document.addEventListener("keydown", e => { if (e.key === "Escape") setDrawer(false); });

  /* ---------- anchor links on h2/h3 ---------- */
  document.querySelectorAll("#main h2[id], #main h3[id]").forEach(heading => {
    const a = document.createElement("a");
    a.className = "anchor-link";
    a.href = "#" + heading.id;
    a.setAttribute("aria-label", "Link to this section");
    a.textContent = "#";
    heading.appendChild(a);
  });

  /* ---------- copy buttons ---------- */
  document.querySelectorAll("#main pre").forEach(pre => {
    if (pre.closest(".code-wrap")) return;
    const wrap = document.createElement("div");
    wrap.className = "code-wrap";
    pre.parentNode.insertBefore(wrap, pre);
    wrap.appendChild(pre);
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "copy-btn";
    btn.textContent = "Copy";
    btn.addEventListener("click", async () => {
      const text = pre.querySelector("code") ? pre.querySelector("code").innerText : pre.innerText;
      try {
        await navigator.clipboard.writeText(text);
      } catch {
        const ta = document.createElement("textarea");
        ta.value = text;
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        try { document.execCommand("copy"); } catch {}
        document.body.removeChild(ta);
      }
      btn.textContent = "Copied!";
      btn.classList.add("is-copied");
      setTimeout(() => { btn.textContent = "Copy"; btn.classList.remove("is-copied"); }, 1500);
    });
    wrap.appendChild(btn);
  });

  /* ---------- progress bar ---------- */
  const progress = document.getElementById("progress");
  function updateProgress() {
    if (!progress) return;
    const h = document.documentElement;
    const max = h.scrollHeight - h.clientHeight;
    const pct = max > 0 ? (h.scrollTop / max) * 100 : 0;
    progress.style.width = pct.toFixed(2) + "%";
  }
  window.addEventListener("scroll", updateProgress, { passive: true });
  window.addEventListener("resize", updateProgress);
  updateProgress();

  /* ---------- back to top ---------- */
  const btt = document.getElementById("back-to-top");
  function updateBtt() {
    if (!btt) return;
    btt.classList.toggle("show", window.scrollY > 400);
  }
  window.addEventListener("scroll", updateBtt, { passive: true });
  if (btt) btt.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  updateBtt();

  /* ---------- active section highlighting ---------- */
  const sections = Array.from(document.querySelectorAll("#main h2[id]"));
  const subLinks = Array.from(document.querySelectorAll("#toc ul a[data-section]"));
  if (sections.length && subLinks.length && "IntersectionObserver" in window) {
    const map = new Map();
    subLinks.forEach(a => map.set(a.dataset.section, a));
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        const a = map.get(entry.target.id);
        if (!a) return;
        if (entry.isIntersecting) {
          subLinks.forEach(l => l.classList.remove("is-active"));
          a.classList.add("is-active");
        }
      });
    }, { rootMargin: "-30% 0px -60% 0px", threshold: 0 });
    sections.forEach(s => io.observe(s));
  }
})();