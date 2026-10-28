/* Laura Magrin portfolio — renders the page from CONTENT (assets/content.js). */
(function () {
  const C = window.CONTENT;
  const LOGO = window.LOGO_SOLID || "";
  const PREVIEW = !!window.PREVIEW;
  const BASE = window.BASE || "";
  const R = (s) => (/^(https?:|data:|blob:|\/|#)/.test(s) ? s : BASE + s);
  const REDUCED = matchMedia("(prefers-reduced-motion: reduce)").matches;
  let lang = document.documentElement.lang === "pt" ? "pt" : "en";
  let filter = "all";

  const t = (v) => (v == null ? "" : typeof v === "string" ? v : v[lang] ?? v.en ?? "");
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const U = (k) => t(C.ui[k]);
  const P = (slug) => C.projects.find((p) => p.slug === slug);
  const arrow = '<svg viewBox="0 0 40 16" fill="none" aria-hidden="true"><path d="M0 8h37M30 1l7 7-7 7" stroke="currentColor" stroke-width="1.6"/></svg>';
  const speaker = '<svg viewBox="0 0 20 16" aria-hidden="true"><path d="M1 5h4l5-4v14l-5-4H1z" fill="currentColor"/><path d="M13 4.5a5 5 0 0 1 0 7M15.5 2a8.5 8.5 0 0 1 0 12" stroke="currentColor" stroke-width="1.6" fill="none"/></svg>';
  const playIco = '<svg viewBox="0 0 12 14" aria-hidden="true"><path d="M0 0l12 7-12 7z" fill="#fff"/></svg>';

  const ph = (label = U("imgSoon"), cls = "") => `<div class="ph ${cls}"><span class="label">${esc(label)}</span></div>`;
  window.__ph = (el) => { el.outerHTML = ph(); };
  const img = (src, alt, eager) => `<img src="${esc(R(src))}" alt="${esc(alt)}" ${eager ? "" : 'loading="lazy"'} decoding="async" onerror="window.__ph(this)">`;
  const vid = (v, label) => `<video src="${esc(R(v.src))}" poster="${esc(R(v.poster))}" muted loop playsinline preload="metadata" ${REDUCED ? "" : "autoplay"} aria-label="${esc(label)}"></video>`;
  /* Case-page player: autoplays muted, native controls, plus a clear "sound on" button */
  const player = (v, label) => `<div class="player${v.wide ? " wide" : ""}"><video src="${esc(R(v.src))}" poster="${esc(R(v.poster))}" muted loop playsinline controls preload="metadata" ${REDUCED ? "" : "autoplay"} aria-label="${esc(label)}"></video>
      <button class="sound" type="button" data-sound>${speaker}<span>${U("soundOn")}</span></button></div>`;
  const media = (m, alt, eager) => (!m ? ph() : typeof m === "string" ? img(m, alt, eager) : vid(m, alt));
  const ytThumb = (id) => `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
  const ytUrl = (id) => `https://www.youtube.com/watch?v=${id}`;
  const ytEmbed = (id, opts) => `https://www.youtube-nocookie.com/embed/${id}?${opts}&rel=0&playsinline=1&modestbranding=1`;
  /* Inline YouTube player for case pages: starts muted when on screen (JS API), sound via the player's own controls */
  const ytInline = (v) => PREVIEW
    ? ytCard(v)
    : `<figure class="ytp"><div class="yt"><iframe data-autoyt src="${ytEmbed(v.yt, "enablejsapi=1&mute=1&autoplay=1")}" title="${esc(t(v.title))}" loading="lazy" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe></div><figcaption>${esc(t(v.title))}</figcaption></figure>`;
  const ytCard = (v) => `<button class="yt" type="button" data-yt="${esc(v.yt)}" data-title="${esc(t(v.title))}" aria-label="${esc(U("watch") + ": " + t(v.title))}">
      <img src="${ytThumb(v.yt)}" alt="" loading="lazy" onerror="this.remove()"><span class="play">${playIco}</span><span class="t">${esc(t(v.title))}</span></button>`;
  const typo = (p) => `<div class="ph type"><small>${esc(t(C.categories[p.cat]))}</small><span>${esc(t(p.kicker))}</span></div>`;
  const cover = (p) => p.cover || (p.images && p.images[0]) || (p.loops && p.loops[0]) || null;

  /* ---------- header ---------- */
  function header() {
    const label = lang === "en" ? "<b>EN</b><i>/ PT</i>" : "<b>PT</b><i>/ EN</i>";
    const sw = PREVIEW
      ? `<button class="lang" id="lang-toggle" type="button" aria-label="Português / English">${label}</button>`
      : `<a class="lang" href="${lang === "en" ? "pt/" : "../"}" hreflang="${lang === "en" ? "pt" : "en"}">${label}</a>`;
    return `<header class="top"><div class="wrap">
      <a class="lockup" href="#" data-go="top" aria-label="Laura Magrin">${LOGO}<span>Laura Magrin</span></a>
      <nav class="nav" aria-label="Main">
        <button class="sec" data-go="work">${U("navWork")}</button>
        <button class="sec" data-go="events">${U("navEvents")}</button>
        <button class="sec" data-go="about">${U("navAbout")}</button>
        <button data-go="contact">${U("navContact")}</button>${sw}
      </nav></div></header>`;
  }

  /* ---------- home ---------- */
  function hero() {
    const reel = C.reel.slice(0, 3).map((r) => `<figure><a href="#work-${r.slug}">${vid(r.video, t(r.label))}<figcaption>${esc(t(r.label))}</figcaption></a></figure>`).join("");
    const bg = C.heroVideo ? `<div class="hero-bg" aria-hidden="true"><video src="${esc(R(C.heroVideo.src))}" poster="${esc(R(C.heroVideo.poster))}" muted loop playsinline preload="auto" ${REDUCED ? "" : "autoplay"}></video></div>` : "";
    return `<section class="band hero" id="top">${bg}<div class="wrap">
      <div>
        <p class="label">${U("eyebrow")}</p>
        <h1 class="name">Laura <span>Magrin</span></h1>
        <p class="role">${U("role")}</p>
        <p class="thesis">${U("thesis")}</p>
        <div class="actions">
          <button class="btn solid" data-go="work">${U("ctaWork")}</button>
          <a class="btn" href="${esc(R(t(C.cv)))}" target="_blank" rel="noopener">${U("ctaCv")}</a>
          <button class="btn" data-go="contact">${U("ctaContact")}</button>
        </div>
        <p class="based label">${U("based")}</p>
      </div>
      <div class="reel">${reel}</div></div></section>`;
  }

  function marquee() {
    const words = [...C.marquee, ...C.marquee].map((w) => `<span>${esc(t(w))}</span>`).join("");
    return `<div class="band wine marquee" aria-hidden="true"><div class="track">${words}</div></div>`;
  }

  function numbers() {
    return `<section class="band light" aria-labelledby="n-h"><div class="wrap">
      <div class="head"><h2 id="n-h">${U("numbersTitle")}</h2><p></p></div>
      <div class="numbers">${C.numbers.map((n) => `<div class="num"><strong>${esc(n.value)}</strong><p>${esc(t(n.label))}</p></div>`).join("")}</div>
      </div></section>`;
  }

  const card = (p, i, big, small) => {
      const c = cover(p);
      const isVid = c && typeof c !== "string";
      return `<a class="card${big ? " big" : ""}${small ? " small" : ""}" href="#work-${p.slug}">
        <div class="frame${p.coverFit === "contain" ? " contain" : ""}"${p.coverFit === "contain" && typeof c === "string" ? ` style="--cbg:url('${esc(R(c))}')"` : p.coverPos ? ` style="--pos:${esc(p.coverPos)}"` : ""}>${c ? media(c, t(p.title), i < 2) : typo(p)}${isVid ? `<span class="badge">Video</span>` : ""}</div>
        <div class="meta label"><span>${esc(t(C.categories[p.cat]))}</span><span>${esc(p.year)}</span></div>
        <h3>${esc(t(p.title))}</h3>${small ? "" : `<p>${esc(t(p.summary))}</p>`}</a>`;
  };
  function moreHTML() {
    const list = C.more.map(P).filter((p) => filter === "all" || p.cat === filter);
    return list.length ? `<h3 class="more-h label">${U("moreWork")}</h3><div class="grid more">${list.map((p, i) => card(p, 9, false, true)).join("")}</div>` : "";
  }
  function cardsHTML() {
    const list = C.featured.map(P).filter((p) => filter === "all" || p.cat === filter);
    return list.map((p, i) => {
      const big = filter === "all" && i < 2;
      const c = cover(p);
      const isVid = c && typeof c !== "string";
      return `<a class="card${big ? " big" : ""}" href="#work-${p.slug}">
        <div class="frame${p.coverFit === "contain" ? " contain" : ""}"${p.coverFit === "contain" && typeof c === "string" ? ` style="--cbg:url('${esc(R(c))}')"` : p.coverPos ? ` style="--pos:${esc(p.coverPos)}"` : ""}>${c ? media(c, t(p.title), i < 2) : typo(p)}${isVid ? `<span class="badge">Video</span>` : ""}</div>
        <div class="meta label"><span>${esc(t(C.categories[p.cat]))}</span><span>${esc(p.year)}</span></div>
        <h3>${esc(t(p.title))}</h3><p>${esc(t(p.summary))}</p></a>`;
    }).join("");
  }

  function work() {
    const cats = [["all", U("all")], ...Object.entries(C.categories).map(([k, v]) => [k, t(v)])];
    return `<section class="band" id="work" aria-labelledby="w-h"><div class="wrap">
      <div class="head"><h2 id="w-h">${U("workTitle")}</h2><p>${U("workIntro")}</p></div>
      <div class="filters" role="group" aria-label="Filter">${cats.map(([k, v]) => `<button class="chip" data-filter="${k}" aria-pressed="${filter === k}">${esc(v)}</button>`).join("")}</div>
      <div class="grid" id="grid">${cardsHTML()}</div><div id="more">${moreHTML()}</div></div></section>`;
  }

  function screening() {
    const f = C.featuredVideo;
    const inner = PREVIEW
      ? `<img src="${esc(R(f.poster))}" alt="">`
      : `<iframe src="${ytEmbed(f.yt, `autoplay=1&mute=1&loop=1&playlist=${f.yt}&controls=0`)}" title="${esc(U("reelFeatured"))}" allow="autoplay; encrypted-media; picture-in-picture" tabindex="-1"></iframe>`;
    return `<section class="band" id="reel" aria-labelledby="r-h"><div class="wrap">
      <div class="head"><h2 id="r-h">${U("reelTitle")}</h2><p>${U("reelIntro")}</p></div>
      <div class="feature">${inner}<div class="cap"><strong>${U("reelFeatured")}</strong>
        <button class="btn solid" type="button" data-yt="${f.yt}" data-title="${esc(U("reelFeatured"))}">${playIco.replace("viewBox", 'width="11" viewBox')} ${U("watchRecap")}</button></div></div>
      <div class="strip">${C.streams.map(ytCard).join("")}</div></div></section>`;
  }

  function events() {
    return `<section class="band light" id="events" aria-labelledby="e-h"><div class="wrap">
      <div class="head"><h2 id="e-h">${U("eventsTitle")}</h2><p>${U("eventsIntro")}</p></div>
      <div class="years">${C.events.map((y) => `<div class="year"><strong>${y.year}</strong><ul>${y.items.map((e) =>
        `<li><a href="#work-${e.slug}"><b>${esc(t(e.name))}</b><span>${esc(t(e.note))}</span><i aria-hidden="true">→</i></a></li>`).join("")}</ul></div>`).join("")}</div>
      </div></section>`;
  }

  function strengths() {
    return `<section class="band decor" aria-labelledby="s-h"><div class="wrap">
      <div class="head"><h2 id="s-h">${U("strengthsTitle")}</h2><p></p></div>
      <div class="strengths">${C.strengths.map((s) => `<div class="strength"><h3>${esc(t(s.title))}</h3><p>${esc(t(s.text))}</p></div>`).join("")}</div>
      </div></section>`;
  }

  function voices() {
    return `<section class="band light" id="voices" aria-labelledby="v-h"><div class="wrap">
      <div class="head"><h2 id="v-h">${U("recsTitle")}</h2><p>${U("recsIntro")}${lang === "en" ? " " + U("translated") : ""}</p></div>
      <div class="quotes">${C.recommendations.map((r) => `<figure class="quote big"><blockquote>“${esc(t(r.text))}”</blockquote><figcaption><b>${esc(r.name)}</b> · ${esc(t(r.role))}</figcaption></figure>`).join("")}</div>
      <div class="press"><div class="press-head"><h3 class="label">${U("pressTitle")}</h3><p>${U("pressIntro")}</p></div>
        <ol class="press-list">${C.press.map((x) => `<li><a href="${esc(x.url)}" target="_blank" rel="noopener"><span class="press-outlet">${esc(x.outlet)}</span><span class="press-title">${esc(x.title)}</span><span class="press-meta">${x.kind === "event" ? U("kindEvent") : U("kindStudy")} · ${esc(x.date.slice(0, 4))}</span></a></li>`).join("")}</ol>
        <p class="press-also"><span class="label">${U("pressAlso")}</span> ${C.pressAlso.map(esc).join(" · ")}</p></div>
      </div></section>`;
  }

  function about() {
    return `<section class="band light" id="about" aria-labelledby="a-h"><div class="wrap">
      <div class="head"><h2 id="a-h">${U("aboutTitle")}</h2><p></p></div>
      <div class="about">
        <div class="lede"><figure class="me"><div class="me-ph"><img src="${esc(R("assets/img/me/laura.jpg"))}" alt="Laura Magrin" loading="lazy"></div><figcaption>${U("meCaption")}</figcaption></figure>${t(C.about).map((p) => `<p>${esc(p)}</p>`).join("")}</div>
        <div><h3 class="label" style="margin:0 0 14px;color:var(--accent)">${U("pathTitle")}</h3>
          <ol class="timeline">${C.experience.map((e) => `<li><span class="when">${esc(t(e.dates))}</span><div><h3>${esc(t(e.title))} <span>· ${esc(e.company)}</span></h3><p>${esc(t(e.text))}</p></div></li>`).join("")}</ol></div>
      </div>
      <div class="sub">
        <div><h3 class="label">${U("eduTitle")}</h3><ul class="edu">${C.education.map((e) => `<li><span>${esc(t(e.title))}</span><span>${esc(t(e.where))}${e.when ? " · " + esc(e.when) : ""}</span></li>`).join("")}</ul></div>
        <div><h3 class="label">${U("toolsTitle")}</h3><div class="tools">${C.tools.map((x) => `<span>${esc(x)}</span>`).join("")}</div><p class="langs">${esc(t(C.languages))}</p></div>
      </div></div></section>`;
  }

  function contact() {
    const a = arrow.replace("viewBox", 'width="20" viewBox');
    return `<section class="band wine" id="contact" aria-labelledby="c-h"><div class="wrap">
      <div class="head"><h2 id="c-h">${U("contactTitle")}</h2><p>${U("contactIntro")}</p></div>
      <div class="contact">
        <div><a class="big-mail" href="mailto:${esc(C.email)}">${esc(C.email)}</a>
          <div class="rows">
            <div class="row"><button class="btn" type="button" id="copy-mail">${U("copy")}</button></div>
            <div class="row"><a class="btn" href="${esc(C.linkedin)}" target="_blank" rel="noopener">LinkedIn ${a}</a><a class="btn" href="${esc(R(t(C.cv)))}" target="_blank" rel="noopener">${U("ctaCv")}</a></div>
          </div></div>
        <form class="mail" id="mail-form" novalidate>
          <div class="two">
            <div class="field"><label class="label" for="f-name">${U("fName")}</label><input id="f-name" name="name" autocomplete="name" required></div>
            <div class="field"><label class="label" for="f-email">${U("fEmail")}</label><input id="f-email" name="email" type="email" autocomplete="email"></div>
          </div>
          <div class="field"><label class="label" for="f-subject">${U("fSubject")}</label><input id="f-subject" name="subject"></div>
          <div class="field"><label class="label" for="f-message">${U("fMessage")}</label><textarea id="f-message" name="message" required></textarea></div>
          <div class="row"><button class="btn solid" type="submit">${U("fSend")} ${a}</button></div>
          <p class="note">${U("fNote")} <strong>${esc(C.email)}</strong>.</p>
        </form></div></div></section>`;
  }

  const footer = () => `<footer class="band"><div class="wrap"><span>© 2026 Laura Magrin</span><span>${U("footer")}</span></div></footer>`;

  /* ---------- auto-advancing photo carousel (long galleries) ---------- */
  const carousel = (imgs, title, cls = "", lead = "") => `<div class="carousel${cls ? " " + cls : ""}" data-carousel${/doc/.test(cls) ? " data-noauto" : ""}>
      <div class="c-track" tabindex="0" aria-label="${esc(title)} — ${U("galleryHint")}">${lead ? `<figure class="c-slide c-vid">${lead}</figure>` : ""}${imgs.map((s, k) => `<figure class="c-slide"><button class="zoom" type="button" data-lb aria-label="${esc(title)} ${k + 1}">${img(s, `${title} — ${k + 1}`, k < 3)}</button></figure>`).join("")}</div>
      <div class="c-ui"><button class="c-btn" type="button" data-cstep="-1" aria-label="${U("prev")}">←</button><span class="c-count label">1 / ${imgs.length}</span><button class="c-btn" type="button" data-cstep="1" aria-label="${U("nextImg")}">→</button><span class="c-hint label">${U("galleryHint")}</span></div></div>`;
  let carTimers = [];
  function initCarousels() {
    carTimers.forEach(clearInterval); carTimers = [];
    document.querySelectorAll("[data-carousel]").forEach((c) => {
      const tr = c.querySelector(".c-track"), cnt = c.querySelector(".c-count");
      const slides = () => [...tr.children];
      const idx = () => { const x = tr.scrollLeft; let best = 0, d = 1e9; slides().forEach((s, i) => { const dd = Math.abs(s.offsetLeft - tr.firstElementChild.offsetLeft - x); if (dd < d) { d = dd; best = i; } }); return best; };
      const go = (i) => { const s = slides(); const n = (i + s.length) % s.length; tr.scrollTo({ left: s[n].offsetLeft - s[0].offsetLeft, behavior: REDUCED ? "auto" : "smooth" }); };
      const atEnd = () => tr.scrollLeft + tr.clientWidth >= tr.scrollWidth - 4;
      c.step = (dir) => { if (dir > 0 && atEnd()) go(0); else go(idx() + dir); };
      tr.addEventListener("scroll", () => { cnt.textContent = `${idx() + 1} / ${slides().length}`; }, { passive: true });
      let hold = 0;
      const pause = () => { hold = Date.now() + 7000; };
      ["pointerenter", "pointerdown", "focusin", "touchstart", "wheel"].forEach((ev) => c.addEventListener(ev, pause, { passive: true }));
      if (!REDUCED && !c.hasAttribute("data-noauto")) carTimers.push(setInterval(() => {
        const r = c.getBoundingClientRect();
        if (Date.now() < hold || document.hidden || r.bottom < 0 || r.top > innerHeight || !document.getElementById("lb").hidden) return;
        c.step(1);
      }, 3200));
    });
  }

  /* ---------- team credits ---------- */
  const person = (x) => `<span>${x.me ? U("teamMe") : esc(x.name)}${x.years ? ` <i>${esc(x.years)}</i>` : ""}${x.note ? ` <i>${esc(t(x.note))}</i>` : ""}</span>`;
  function teamHTML(p) {
    if (!p.team) return "";
    const rows = [["teamCore", p.team.core], ["teamMgmt", p.team.mgmt], ["teamCopy", p.team.copy], ["teamDesign", p.team.design], ["teamUi", p.team.ui], ["teamFront", p.team.front], ["teamBack", p.team.back], ["teamDev", p.team.dev]].filter((r) => r[1] && r[1].length);
    return `<div class="team"><h2 class="label">${U("teamTitle")}</h2><dl>${rows.map(([k, v]) => `<div><dt>${U(k)}</dt><dd>${v.map(person).join(" · ")}</dd></div>`).join("")}</dl><p>${U("teamNote")}</p></div>`;
  }

  /* ---------- case view ---------- */
  function caseView(p) {
    const order = [...C.featured, ...C.more];
    const nxt = P(order[(order.indexOf(p.slug) + 1) % order.length]);
    const facts = [[U("year"), esc(p.year)], [U("client"), esc(t(p.client))], [U("myRole"), esc(t(p.role))], [U("place"), esc(t(p.place))]].filter((f) => f[1]);
    if (p.link) facts.push([U("visit"), `<a href="${esc(p.link)}" target="_blank" rel="noopener">${esc(p.link.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, ""))}</a>`]);
    const imgs = p.images || [];
    const loops = p.loops || [];
    const inWall = loops.length === 1 && !loops[0].wide && imgs.length > 2;
    const gallery = (loops.length || imgs.length)
      ? `<section class="band light"><div class="wrap">
          ${loops.length && !inWall ? `<div class="loops">${loops.map((v) => player(v, t(p.title))).join("")}</div>` : ""}
          ${imgs.length >= 3 ? carousel(imgs, t(p.title), "", inWall ? player(loops[0], t(p.title)) : "") : imgs.length ? `<div class="wall">${inWall ? `<figure>${player(loops[0], t(p.title))}</figure>` : ""}${imgs.map((s, k) => `<figure><button class="zoom" type="button" data-lb aria-label="${esc(t(p.title))} ${k + 1}">${img(s, `${t(p.title)} — ${k + 1}`, k < 3)}</button></figure>`).join("")}</div>` : ""}
        </div></section>`
      : `<section class="band light"><div class="wrap"><div class="wall">${[0, 1, 2].map(() => `<figure>${ph(U("imgSoon"), "static")}</figure>`).join("")}</div></div></section>`;
    const sets = (p.sets || []).map((g, n) => `<section class="band ${n % 2 ? "light" : ""} set-band"><div class="wrap"><div class="head"><h2>${esc(t(g.title))}</h2><p>${esc(t(g.note || ""))}</p></div>
        ${g.images.length >= 3 ? carousel(g.images, t(g.title)) : `<div class="wall">${g.images.map((s, k) => `<figure><button class="zoom" type="button" data-lb aria-label="${esc(t(g.title))} ${k + 1}">${img(s, `${t(g.title)} — ${k + 1}`)}</button></figure>`).join("")}</div>`}</div></section>`).join("");
    /* documents (decks, reports, books): page-by-page reader + the full PDF */
    const docs = (p.docs || []).map((d, n) => `<section class="band ${n % 2 ? "" : "light"} doc-band" data-lbscope><div class="wrap"><div class="head"><h2>${esc(t(d.title))}</h2><p>${esc(t(d.note || ""))}</p></div>
        ${carousel(d.pages, t(d.title), "doc" + (d.portrait ? " portrait" : ""))}
        <div class="doc-actions"><button class="btn solid" type="button" data-docread>${U("docRead")}</button><a class="btn" href="${esc(R(d.pdf))}" target="_blank" rel="noopener">${U("docPdf")}${d.size ? ` · ${esc(d.size)}` : ""}</a></div></div></section>`).join("");
    /* related project calls */
    const related = p.related
      ? `<section class="band related-band"><div class="wrap"><div class="head"><h2>${esc(t(p.related.title))}</h2><p>${esc(t(p.related.note || ""))}</p></div><div class="grid related">${p.related.slugs.map(P).map((q, i) => card(q, i, false, false)).join("")}</div></div></section>`
      : "";
    const stats = p.stats && p.stats.length
      ? `<section class="band light stats-band"><div class="wrap"><h2 class="label" style="margin:0 0 18px;color:var(--accent)">${U("atAGlance")}</h2><div class="stats">${p.stats.map((x) => `<div><strong>${esc(x.value)}</strong><span>${esc(t(x.label))}</span></div>`).join("")}</div></div></section>`
      : "";
    const quotes = p.quotes && p.quotes.length
      ? `<section class="band"><div class="wrap"><div class="head"><h2>${U("saidTitle")}</h2><p>${lang === "en" ? U("translated") : ""}</p></div><div class="quotes">${p.quotes.map((q) => `<figure class="quote"><blockquote>“${esc(t(q.text))}”</blockquote><figcaption><b>${esc(q.name)}</b> · ${esc(q.org)}</figcaption></figure>`).join("")}</div></div></section>`
      : "";
    const zoomImg = (src, alt) => `<figure><button class="zoom" type="button" data-lb aria-label="${esc(alt)}">${img(src, alt)}</button></figure>`;
    const compare = p.compare
      ? `<section class="band"><div class="wrap"><div class="head"><h2>${U("compareTitle")}</h2><p>${U("compareIntro")}</p></div>
          <div class="compare">${["before", "after"].map((k) => `<div class="cmp-col cmp-${k}"><h3 class="label">${esc(t(p.compare[k].label))}</h3><div class="cmp-grid">${p.compare[k].images.map((src, n) => zoomImg(src, `${t(p.compare[k].label)} ${n + 1}`)).join("")}</div></div>`).join("")}</div></div></section>`
      : "";
    const videos = p.videos && p.videos.length
      ? `<section class="band deep"><div class="wrap"><div class="head"><h2>${U("watch")}</h2><p></p></div><div class="vids${p.videos.length===1?" solo":p.videos.length===2?" duo":""}">${p.videos.map(ytInline).join("")}</div></div></section>`
      : "";
    return `<section class="band decor case-top"><div class="wrap">
        <button class="back label" data-go="work">← ${U("back")}</button>
        <p class="case-kicker label">${esc(t(C.categories[p.cat]))} · ${esc(t(p.kicker))}</p>
        <h1>${esc(t(p.title))}</h1>
        <div class="case-grid">
          <dl class="facts">${facts.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join("")}</dl>
          <div class="story">${t(p.body).map((x) => `<p>${esc(x)}</p>`).join("")}
            <h2 class="label" style="margin:26px 0 0;color:var(--soft)">${U("deliverables")}</h2>
            <div class="tags">${t(p.deliverables).map((d) => `<span>${esc(d)}</span>`).join("")}</div>${teamHTML(p)}${p.feature ? `<figure class="feature-fig"><button class="zoom" type="button" data-lb aria-label="${esc(t(p.feature.caption))}">${img(p.feature.src, t(p.feature.caption))}</button><figcaption>${esc(t(p.feature.caption))}</figcaption></figure>` : ""}</div>
        </div></div></section>
      ${stats}${compare}${videos}${gallery}${related}${docs}${sets}${quotes}
      <section class="band wine cta"><div class="wrap"><h2>${U("caseCta")}</h2><button class="btn solid" data-go="contact">${U("caseCtaBtn")}</button></div></section>
      <section class="band"><div class="wrap" style="padding-block:40px 64px"><a class="next" href="#work-${nxt.slug}"><span><span class="label soft">${U("next")}</span><strong>${esc(t(nxt.title))}</strong></span>${arrow}</a></div></section>`;
  }

  /* ---------- video autoplay only while visible ---------- */
  let io;
  const ytCmd = (f, func) => { try { f.contentWindow.postMessage(JSON.stringify({ event: "command", func, args: [] }), "*"); } catch (_) {} };
  function watchVideos() {
    if (io) io.disconnect();
    if (REDUCED || !("IntersectionObserver" in window)) return;
    io = new IntersectionObserver((es) => es.forEach((e) => {
      const el = e.target;
      if (el.tagName === "IFRAME") { ytCmd(el, e.isIntersecting ? "playVideo" : "pauseVideo"); return; }
      if (e.isIntersecting) { if (!el.dataset.userPaused) { const p = el.play(); if (p && p.catch) p.catch(() => {}); } } else el.pause();
    }), { rootMargin: "80px" });
    document.querySelectorAll("video, iframe[data-autoyt]").forEach((v) => io.observe(v));
    document.querySelectorAll("iframe[data-autoyt]").forEach((f) => f.addEventListener("load", () => { if (f.getBoundingClientRect().top < innerHeight) ytCmd(f, "playVideo"); }, { once: true }));
  }

  let lastFocus = null;
  /* ---------- image lightbox ---------- */
  let lbList = [], lbIdx = 0;
  const lightboxHTML = () => `<div class="lightbox" id="lb" role="dialog" aria-modal="true" aria-label="Gallery" hidden>
      <div class="modal-backdrop" data-lbclose></div>
      <figure class="lb-fig"><img id="lb-img" alt=""><figcaption id="lb-cap"></figcaption></figure>
      <button class="lb-btn lb-prev" type="button" data-lbstep="-1" aria-label="${U("prev")}">←</button>
      <button class="lb-btn lb-next" type="button" data-lbstep="1" aria-label="${U("nextImg")}">→</button>
      <button class="modal-close lb-close" type="button" data-lbclose aria-label="${U("close")}">✕</button></div>`;
  function lbShow(i) {
    lbIdx = (i + lbList.length) % lbList.length;
    const im = lbList[lbIdx];
    const el = document.getElementById("lb-img");
    el.src = im.src; el.alt = im.alt;
    document.getElementById("lb-cap").textContent = `${lbIdx + 1} / ${lbList.length}`;
  }
  function lbOpen(btn) {
    lastFocus = document.activeElement;
    const scope = btn.closest("[data-lbscope]");
    const all = scope ? [...scope.querySelectorAll(".zoom")] : [...document.querySelectorAll(".zoom:not([data-lbscope] .zoom)")];
    const i = Math.max(0, all.indexOf(btn));
    lbList = all.map((b) => b.querySelector("img")).filter(Boolean).map((x) => ({ src: x.currentSrc || x.src, alt: x.alt }));
    if (!lbList.length) return;
    document.getElementById("lb").hidden = false; document.body.style.overflow = "hidden";
    lbShow(i); document.querySelector(".lb-close").focus();
  }
  function lbClose() {
    const lb = document.getElementById("lb");
    if (lb.hidden) return;
    lb.hidden = true; document.body.style.overflow = "";
    if (lastFocus) lastFocus.focus();
  }

  /* ---------- video pop-up ---------- */
  function openModal(id, title) {
    lastFocus = document.activeElement;
    const m = document.getElementById("modal");
    m.querySelector(".modal-title").textContent = title || "";
    m.querySelector(".modal-frame").innerHTML = PREVIEW
      ? `<div class="modal-note"><p>${U("previewNote")}</p><a class="btn solid" href="${ytUrl(id)}" target="_blank" rel="noopener">${U("watchYt")}</a></div>`
      : `<iframe src="${ytEmbed(id, "autoplay=1")}" title="${esc(title || "YouTube")}" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe>`;
    m.hidden = false;
    document.body.style.overflow = "hidden";
    document.querySelectorAll("main video").forEach((v) => v.pause());
    m.querySelector(".modal-close").focus();
  }
  function closeModal() {
    const m = document.getElementById("modal");
    if (m.hidden) return;
    m.querySelector(".modal-frame").innerHTML = "";
    m.hidden = true;
    document.body.style.overflow = "";
    watchVideos();
    if (lastFocus) lastFocus.focus();
  }
  const modalHTML = () => `<div class="modal" id="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title" hidden>
      <div class="modal-backdrop" data-close></div>
      <div class="modal-box"><div class="modal-bar"><strong class="modal-title" id="modal-title"></strong>
        <button class="modal-close" type="button" data-close aria-label="${U("close")}">✕</button></div>
        <div class="modal-frame"></div></div></div>`;

  /* ---------- render + routing ---------- */
  const root = document.getElementById("app");
  function render() {
    document.documentElement.lang = lang;
    root.innerHTML = header() +
      `<main class="home" id="home">${hero()}${marquee()}${screening()}${numbers()}${work()}${events()}${strengths()}${voices()}${about()}${contact()}</main>` +
      `<main class="case" id="case" hidden></main>` + footer() + modalHTML() + lightboxHTML() + `<div class="grain" aria-hidden="true"></div>`;
    route(false);
  }

  function route(scroll = true) {
    const h = decodeURIComponent(location.hash.slice(1));
    const home = document.getElementById("home"), cs = document.getElementById("case");
    const p = h.startsWith("work-") && P(h.slice(5));
    if (p) {
      cs.innerHTML = caseView(p); cs.hidden = false; home.hidden = true;
      home.querySelectorAll("video").forEach((v) => v.pause());
      document.title = `${t(p.title)} · Laura Magrin`;
      if (scroll) window.scrollTo(0, 0);
      initCarousels();
    } else {
      carTimers.forEach(clearInterval); carTimers = [];
      cs.innerHTML = ""; cs.hidden = true; home.hidden = false;
      document.title = "Laura Magrin";
    }
    watchVideos();
  }

  function goSection(id) {
    if (!document.getElementById("home").hidden) { document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" }); return; }
    history.pushState(null, "", location.pathname + location.search);
    route(false);
    requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView({ block: "start" }));
  }

  document.addEventListener("click", (e) => {
    const go = e.target.closest("[data-go]");
    if (go) { e.preventDefault(); goSection(go.dataset.go); return; }
    const f = e.target.closest("[data-filter]");
    if (f) {
      filter = f.dataset.filter;
      document.querySelectorAll("[data-filter]").forEach((b) => b.setAttribute("aria-pressed", b.dataset.filter === filter));
      document.getElementById("grid").innerHTML = cardsHTML(); document.getElementById("more").innerHTML = moreHTML(); watchVideos(); return;
    }
    if (e.target.closest("[data-close]")) { closeModal(); return; }
    if (e.target.closest("[data-lbclose]")) { lbClose(); return; }
    const cs = e.target.closest("[data-cstep]");
    if (cs) { const c = cs.closest("[data-carousel]"); if (c && c.step) c.step(Number(cs.dataset.cstep)); return; }
    const dr = e.target.closest("[data-docread]");
    if (dr) { const z = dr.closest("[data-lbscope]").querySelector(".zoom"); if (z) lbOpen(z); return; }
    const st = e.target.closest("[data-lbstep]");
    if (st) { lbShow(lbIdx + Number(st.dataset.lbstep)); return; }
    const z = e.target.closest("[data-lb]");
    if (z) { lbOpen(z); return; }
    const y = e.target.closest("[data-yt]");
    if (y) { openModal(y.dataset.yt, y.dataset.title); return; }
    const snd = e.target.closest("[data-sound]");
    if (snd) {
      const v = snd.parentElement.querySelector("video");
      const on = v.muted;
      document.querySelectorAll(".player video").forEach((o) => { if (o !== v) { o.muted = true; } });
      document.querySelectorAll("[data-sound]").forEach((b) => { b.classList.remove("on"); b.querySelector("span").textContent = U("soundOn"); });
      v.muted = !on;
      if (on) { v.currentTime = 0; delete v.dataset.userPaused; v.play().catch(() => {}); snd.classList.add("on"); snd.querySelector("span").textContent = U("soundOff"); }
      return;
    }
    if (e.target.closest("#lang-toggle")) {
      lang = lang === "en" ? "pt" : "en";
      try { localStorage.setItem("lm-lang", lang); } catch (_) {}
      render(); return;
    }
    if (e.target.closest("#copy-mail")) {
      const b = e.target.closest("#copy-mail");
      const done = () => { b.textContent = U("copied"); setTimeout(() => (b.textContent = U("copy")), 1600); };
      const sel = () => { const r = document.createRange(); r.selectNodeContents(document.querySelector(".big-mail")); const s = getSelection(); s.removeAllRanges(); s.addRange(r); };
      try { navigator.clipboard.writeText(C.email).then(done, sel); } catch (_) { sel(); }
    }
  });

  document.addEventListener("submit", (e) => {
    if (e.target.id !== "mail-form") return;
    e.preventDefault();
    const fd = new FormData(e.target);
    const name = String(fd.get("name") || "").trim(), msg = String(fd.get("message") || "").trim(), from = String(fd.get("email") || "").trim();
    if (!name) return e.target.querySelector("#f-name").focus();
    if (!msg) return e.target.querySelector("#f-message").focus();
    const subject = String(fd.get("subject") || "").trim() || (lang === "pt" ? `Contato pelo portfólio — ${name}` : `Portfolio contact — ${name}`);
    location.href = `mailto:${C.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`${msg}\n\n— ${name}${from ? " · " + from : ""}`)}`;
  });

  window.addEventListener("hashchange", () => { closeModal(); lbClose(); route(true); });
  document.addEventListener("keydown", (e) => {
    const lbOpenNow = !document.getElementById("lb").hidden;
    if (e.key === "Escape") { closeModal(); lbClose(); }
    if (lbOpenNow && e.key === "ArrowRight") lbShow(lbIdx + 1);
    if (lbOpenNow && e.key === "ArrowLeft") lbShow(lbIdx - 1);
  });
  /* native controls: remember a manual pause so scrolling doesn't restart it; unmuting via controls also shows on the button */
  document.addEventListener("pause", (e) => { if (e.target.tagName === "VIDEO" && document.getElementById("modal").hidden && e.target.closest(".player") && document.visibilityState === "visible" && e.target.getBoundingClientRect().bottom > 0 && e.target.getBoundingClientRect().top < innerHeight) e.target.dataset.userPaused = "1"; }, true);
  document.addEventListener("play", (e) => { if (e.target.tagName === "VIDEO") delete e.target.dataset.userPaused; }, true);
  document.addEventListener("volumechange", (e) => { const v = e.target; if (v.tagName !== "VIDEO") return; const b = v.parentElement.querySelector("[data-sound]"); if (b) { b.classList.toggle("on", !v.muted); b.querySelector("span").textContent = v.muted ? U("soundOn") : U("soundOff"); } }, true);
  if (PREVIEW) { try { const s = localStorage.getItem("lm-lang"); if (s === "pt" || s === "en") lang = s; } catch (_) {} }
  render();
})();
