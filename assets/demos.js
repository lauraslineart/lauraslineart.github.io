/* Interactive demos for the "Marketing operations & data" case.
   Lightweight, fictional-data versions of internal tools (editorial calendar + channel dashboards).
   Loaded on demand; exposes window.Demos.open(id, lang). No libraries: charts are hand-drawn SVG/HTML. */
(function () {
  "use strict";
  let lang = "en";
  const L = (en, pt) => (lang === "pt" ? pt : en);
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const loc = () => (lang === "pt" ? "pt-BR" : "en-US");
  const num = (n, d = 0) => Number(n).toLocaleString(loc(), { minimumFractionDigits: d, maximumFractionDigits: d });
  const pct = (x, d = 1) => num(x * 100, d) + "%";
  const kfmt = (n) => (n >= 1000 ? num(n / 1000, n >= 10000 ? 0 : 1) + (lang === "pt" ? " mil" : "K") : num(n));
  const sum = (a) => a.reduce((x, y) => x + y, 0);
  const median = (a) => { const s = [...a].sort((x, y) => x - y); const m = s.length >> 1; return s.length ? (s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2) : 0; };

  /* seeded random so the fake data is stable between openings */
  function rng(seed) { let a = seed >>> 0; return () => { a |= 0; a = (a + 0x6d2b79f5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
  const pick = (r, a) => a[Math.floor(r() * a.length)];
  const between = (r, lo, hi) => Math.round(lo + r() * (hi - lo));

  /* palette from the portfolio identity: wine, red, rose, plum, sand */
  const C = { wine: "#6e1023", red: "#c8102e", coral: "#ec3346", rose: "#e58c98", plum: "#8a3b5a", sand: "#cdb7b1", ink: "#1b1113", soft: "#6a575b", line: "#e3d7d4", bg: "#f7f2f0", card: "#ffffff" };
  const SERIES = [C.wine, C.coral, C.plum, C.rose, C.sand, "#3d1d26"];

  /* ---------- tiny UI kit ---------- */
  const kpis = (items) => `<div class="d-kpis">${items.map((k) => `<div class="d-kpi${k.hi ? " hi" : ""}"><span>${esc(k.label)}</span><strong>${esc(k.value)}</strong>${k.note ? `<small>${esc(k.note)}</small>` : ""}${k.delta != null ? delta(k.delta, k.pp) : ""}</div>`).join("")}</div>`;
  const delta = (d, pp) => { const up = d >= 0; const v = pp ? (up ? "+" : "−") + num(Math.abs(d) * 100, 1) + " p.p." : (up ? "+" : "−") + num(Math.abs(d) * 100, 0) + "%"; return `<em class="d-delta ${up ? "up" : "down"}">${up ? "▲" : "▼"} ${v} <i>${L("vs prev.", "vs ant.")}</i></em>`; };
  const seg = (name, opts, cur) => `<div class="d-seg" role="tablist">${opts.map(([v, l]) => `<button type="button" role="tab" aria-selected="${v === cur}" data-${name}="${esc(v)}">${esc(l)}</button>`).join("")}</div>`;
  const panel = (title, body, extra = "") => `<section class="d-panel${extra}"><h4>${esc(title)}</h4>${body}</section>`;
  const legend = (items) => `<div class="d-legend">${items.map(([n, c]) => `<span><i style="background:${c}"></i>${esc(n)}</span>`).join("")}</div>`;

  /* vertical bars (optionally stacked) */
  function vbars(labels, series, opts = {}) {
    const W = opts.w || 640, H = opts.h || 220, P = { l: 40, r: 8, t: 10, b: 26 };
    const tot = labels.map((_, i) => sum(series.map((s) => s.data[i])));
    const max = Math.max(1, ...(opts.stacked ? tot : series.flatMap((s) => s.data))) * 1.08;
    const bw = (W - P.l - P.r) / labels.length;
    const y = (v) => H - P.b - (v / max) * (H - P.t - P.b);
    let g = "";
    for (let t = 0; t <= 4; t++) { const v = (max / 4) * t; g += `<line x1="${P.l}" x2="${W - P.r}" y1="${y(v)}" y2="${y(v)}" class="grid"/><text x="${P.l - 6}" y="${y(v) + 4}" class="ax" text-anchor="end">${kfmt(Math.round(v))}</text>`; }
    labels.forEach((lab, i) => {
      const x0 = P.l + i * bw + bw * 0.16, w = bw * 0.68;
      if (opts.stacked) {
        let acc = 0;
        series.forEach((s) => { const v = s.data[i]; if (!v) return; const y1 = y(acc + v), y0 = y(acc); g += `<rect x="${x0}" y="${y1}" width="${w}" height="${Math.max(0, y0 - y1)}" fill="${s.color}" opacity="${opts.hiLast && i !== labels.length - 1 ? 0.55 : 1}" data-tip="${esc(lab + " · " + s.name + ": " + (opts.fmt || num)(v))}"/>`; acc += v; });
      } else {
        const n = series.length, sw = w / n;
        series.forEach((s, k) => { const v = s.data[i]; g += `<rect x="${x0 + k * sw}" y="${y(v)}" width="${sw - 1}" height="${Math.max(0, H - P.b - y(v))}" fill="${s.colors ? s.colors[i] : s.color}" opacity="${opts.hiLast && i !== labels.length - 1 ? 0.55 : 1}" data-tip="${esc(lab + " · " + (s.tips ? s.tips[i] : s.name) + ": " + (opts.fmt || num)(v))}"/>`; });
      }
      if (!opts.skip || i % opts.skip === 0) g += `<text x="${P.l + i * bw + bw / 2}" y="${H - 8}" class="ax" text-anchor="middle">${esc(lab)}</text>`;
    });
    return `<svg viewBox="0 0 ${W} ${H}" class="d-svg" role="img">${g}</svg>`;
  }
  /* line with dots */
  function line(labels, data, opts = {}) {
    const W = 640, H = opts.h || 180, P = { l: 40, r: 10, t: 12, b: 26 };
    const max = (opts.max || Math.max(...data)) * 1.1, min = 0;
    const x = (i) => P.l + (i * (W - P.l - P.r)) / Math.max(1, labels.length - 1);
    const y = (v) => H - P.b - ((v - min) / (max - min)) * (H - P.t - P.b);
    let g = "";
    for (let t = 0; t <= 3; t++) { const v = (max / 3) * t; g += `<line x1="${P.l}" x2="${W - P.r}" y1="${y(v)}" y2="${y(v)}" class="grid"/><text x="${P.l - 6}" y="${y(v) + 4}" class="ax" text-anchor="end">${(opts.fmt || num)(v)}</text>`; }
    g += `<path d="${data.map((v, i) => (i ? "L" : "M") + x(i) + " " + y(v)).join(" ")} L${x(data.length - 1)} ${H - P.b} L${x(0)} ${H - P.b}Z" fill="${C.rose}" opacity=".18"/>`;
    g += `<polyline points="${data.map((v, i) => x(i) + "," + y(v)).join(" ")}" fill="none" stroke="${C.red}" stroke-width="2.4"/>`;
    data.forEach((v, i) => { g += `<circle cx="${x(i)}" cy="${y(v)}" r="4.5" fill="${C.card}" stroke="${C.red}" stroke-width="2" data-tip="${esc(labels[i] + ": " + (opts.fmt || num)(v))}"/>`; if (!opts.skip || i % opts.skip === 0) g += `<text x="${x(i)}" y="${H - 8}" class="ax" text-anchor="middle">${esc(labels[i])}</text>`; });
    return `<svg viewBox="0 0 ${W} ${H}" class="d-svg" role="img">${g}</svg>`;
  }
  /* horizontal bars in HTML (stacked when several parts) */
  function hbars(rows, opts = {}) {
    const max = Math.max(1, ...rows.map((r) => sum(r.parts.map((p) => p.v))));
    return `<div class="d-hbars">${rows.map((r) => { const t = sum(r.parts.map((p) => p.v)); return `<div class="d-hrow"><span class="lab">${esc(r.label)}</span><span class="bar">${r.parts.map((p) => `<i style="width:${(p.v / max) * 100}%;background:${p.color}" data-tip="${esc(r.label + (p.name ? " · " + p.name : "") + ": " + (opts.fmt || num)(p.v))}"></i>`).join("")}</span><b>${(opts.fmt || num)(opts.totalFmt ? opts.totalFmt(r) : t)}</b></div>`; }).join("")}</div>`;
  }
  /* heatmap of an index around 1.0 */
  function heat(rows, cols, val, nval) {
    const color = (v) => { const t = Math.max(0, Math.min(1, (v - 0.6) / 0.9)); const a = [240, 228, 225], b = [110, 16, 35]; return `rgb(${a.map((x, i) => Math.round(x + (b[i] - x) * t)).join(",")})`; };
    return `<div class="d-heat" style="grid-template-columns:110px repeat(${cols.length},1fr)"><span></span>${cols.map((c) => `<span class="h">${esc(c)}</span>`).join("")}${rows.map((r, i) => `<span class="h r">${esc(r)}</span>${cols.map((c, j) => { const v = val[i][j]; const n = nval ? nval[i][j] : 9; return n < 2 ? `<span class="c empty" data-tip="${esc(r + " · " + c + ": " + L("too few posts", "poucos posts"))}">–</span>` : `<span class="c" style="background:${color(v)};color:${v > 1.15 ? "#fff" : C.ink}" data-tip="${esc(r + " · " + c + ": " + L("index ", "índice ") + num(v, 2) + " · n=" + n)}">${num(v, 2)}</span>`; }).join("")}`).join("")}</div>`;
  }
  /* sortable table */
  function table(id, cols, rows, sortKey, dir) {
    const sorted = [...rows].sort((a, b) => { const x = a[sortKey], y = b[sortKey]; return (typeof x === "number" ? x - y : String(x).localeCompare(String(y))) * dir; });
    return `<div class="d-table-wrap"><table class="d-table" data-table="${id}"><thead><tr>${cols.map((c) => `<th${c.num ? ' class="n"' : ""}><button type="button" data-sort="${c.key}">${esc(c.label)}${c.key === sortKey ? (dir > 0 ? " ↑" : " ↓") : ""}</button></th>`).join("")}</tr></thead><tbody>${sorted.map((r) => `<tr>${cols.map((c) => `<td${c.num ? ' class="n"' : ""}>${c.render ? c.render(r) : esc(c.fmt ? c.fmt(r[c.key]) : r[c.key])}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`;
  }

  /* ---------- fictional calendar data ---------- */
  const CH = () => [
    { id: "email", name: L("Email", "E-mail"), color: C.wine },
    { id: "li", name: L("LinkedIn (brand)", "LinkedIn (marca)"), color: C.red },
    { id: "liv", name: L("LinkedIn (spokesperson)", "LinkedIn (porta-voz)"), color: C.plum },
    { id: "ig", name: "Instagram", color: C.coral },
    { id: "wa", name: "WhatsApp", color: "#9a7b2f" }
  ];
  const PRODUCTS = () => [L("Annual summit", "Evento anual"), L("Market study", "Estudo de mercado"), L("Monthly webinar", "Webinar mensal"), L("Online course", "Curso online"), L("Newsletter", "Newsletter"), L("Institutional", "Institucional")];
  const STATUS = () => [L("Planned", "Planejado"), L("Confirmed", "Confirmado"), L("In progress", "Em andamento"), L("To verify", "Pendente de verificação"), L("Done", "Concluído")];
  const TITLES = () => ({
    0: [L("Save the date", "Save the date"), L("Speakers announced", "Speakers confirmados"), L("Early-bird ends Friday", "Lote 1 encerra sexta"), L("Agenda is live", "Programação no ar"), L("Behind the scenes", "Bastidores da produção")],
    1: [L("3 numbers from the new study", "3 números do novo estudo"), L("Study launch: what changed", "Lançamento: o que mudou"), L("Free sample download", "Baixe a versão amostra"), L("Chart of the week", "Gráfico da semana")],
    2: [L("Registrations open", "Inscrições abertas"), L("Tomorrow, live at 11am", "Amanhã, ao vivo às 11h"), L("Replay available", "Replay disponível"), L("Guest announced", "Convidado confirmado")],
    3: [L("Last seats", "Últimas vagas"), L("New class in December", "Nova turma em dezembro"), L("Student story", "Depoimento de aluno")],
    4: [L("Weekly roundup", "Resumo da semana"), L("Articles of the month", "Artigos do mês")],
    5: [L("Meet the team", "Conheça o time"), L("Year in review", "Retrospectiva do ano"), L("Holiday message", "Mensagem de fim de ano")]
  });
  function calendarData() {
    const r = rng(2026), ch = CH(), prods = PRODUCTS(), st = STATUS(), titles = TITLES();
    const today = new Date(2026, 10, 12); /* demo "today": Thu 12 Nov */
    const items = [];
    const types = [L("Content", "Conteúdo"), L("Sales", "Comercial"), L("Operational", "Operacional"), L("Relationship", "Relacional")];
    const segs = [L("Whole engaged base", "Base engajada inteira"), L("Investors & funds", "Investidores e fundos"), L("Integrators", "Integradores"), L("Utilities", "Utilities"), L("C&I consumers", "Consumidores C&I"), L("Manufacturers", "Fabricantes")];
    for (let d = new Date(2026, 9, 1); d <= new Date(2026, 11, 31); d.setDate(d.getDate() + 1)) {
      const wd = d.getDay(); if (wd === 0 || wd === 6) continue;
      const n = Math.floor(r() * 3.2);
      for (let k = 0; k < n; k++) {
        const x = r(); const c = x < 0.38 ? ch[0] : x < 0.62 ? ch[1] : x < 0.72 ? ch[2] : x < 0.93 ? ch[3] : ch[4];
        const pi = Math.floor(r() * prods.length);
        const past = d < today;
        const status = past ? (r() < 0.9 ? st[4] : st[3]) : pick(r, [st[0], st[0], st[1], st[2]]);
        items.push({ id: items.length, date: new Date(d), ch: c.id, prod: prods[pi], title: pick(r, titles[pi]), type: c.id === "email" ? pick(r, types) : c.id === "wa" ? L("Broadcast list", "Lista de transmissão") : r() < 0.4 ? "Reel" : L("Post", "Post"), seg: c.id === "email" ? pick(r, segs) : "", status });
      }
    }
    const fronts = [L("Lead base", "Base e leads"), L("Forms & website", "Formulários e site"), L("Calendar & email", "Calendário e e-mail"), L("Social & content", "Redes e conteúdo"), L("Routines & tools", "Rotinas e ferramentas")];
    const owners = [L("Copy", "Copy"), L("Design", "Design"), L("Platforms", "Plataformas"), L("Management", "Gestão")];
    const acts = [L("Clean hard bounces from the base", "Limpar hard bounces da base"), L("Map contacts by business segment", "Classificar contatos por segmento"), L("Rebuild sign-up forms", "Refazer formulários de inscrição"), L("Add UTM rules to every link", "Padronizar UTMs em todos os links"), L("Weekly email cap per segment", "Teto semanal de e-mails por segmento"), L("Monthly content review", "Revisão mensal de conteúdo"), L("Reels test: 2 per week", "Teste de Reels: 2 por semana"), L("Best-time grid per weekday", "Grade de horários por dia"), L("Dashboard for the team", "Dashboard para o time"), L("Template library", "Biblioteca de templates"), L("Persona review with sales", "Revisar personas com o comercial"), L("Landing page audit", "Auditoria das landing pages"), L("WhatsApp list hygiene", "Higiene das listas de WhatsApp"), L("Quarterly results report", "Relatório trimestral de resultados")];
    const pst = [L("To do", "A fazer"), L("In progress", "Em andamento"), L("On hold", "Em espera"), L("Done", "Concluído")];
    const plan = acts.map((a, i) => { const due = new Date(2026, 9 + (i % 3), 5 + ((i * 7) % 22)); const s = i < 5 ? pst[3] : pick(r, pst.slice(0, 3)); return { id: "A" + String(i + 1).padStart(2, "0"), front: fronts[i % fronts.length], act: a, owner: owners[i % owners.length], due, status: s, done: s === pst[3] }; });
    return { items, plan, today, pst };
  }

  /* ---------- demo: editorial calendar ---------- */
  function calendar(root) {
    const data = calendarData(), ch = CH(), st = STATUS();
    const S = { tab: "cal", month: 10, chans: new Set(ch.map((c) => c.id)), prod: "", sel: null, planStatus: "", showDone: true };
    const months = [[9, L("Oct", "Out")], [10, L("Nov", "Nov")], [11, L("Dec", "Dez")]];
    const chOf = (id) => ch.find((c) => c.id === id);
    const visible = () => data.items.filter((it) => S.chans.has(it.ch) && (!S.prod || it.prod === S.prod));
    const dd = (d) => String(d.getDate()).padStart(2, "0") + "/" + String(d.getMonth() + 1).padStart(2, "0");
    const wdn = (d) => [L("Sun", "Dom"), L("Mon", "Seg"), L("Tue", "Ter"), L("Wed", "Qua"), L("Thu", "Qui"), L("Fri", "Sex"), L("Sat", "Sáb")][d.getDay()];
    function viewCal() {
      const items = visible().filter((it) => it.date.getMonth() === S.month);
      const first = new Date(2026, S.month, 1); const start = new Date(first); start.setDate(first.getDate() - ((first.getDay() + 6) % 7));
      let weeks = "";
      for (let w = new Date(start); w.getMonth() <= S.month && !(w.getMonth() > S.month) && w < new Date(2026, S.month + 1, 1); w.setDate(w.getDate() + 7)) {
        let cells = "";
        const isNow = data.today >= w && data.today < new Date(w.getFullYear(), w.getMonth(), w.getDate() + 7);
        const wkItems = [];
        for (let k = 0; k < 5; k++) {
          const day = new Date(w); day.setDate(w.getDate() + k);
          const out = day.getMonth() !== S.month;
          const its = items.filter((it) => it.date.toDateString() === day.toDateString()); wkItems.push(...its);
          cells += `<div class="cal-day${out ? " out" : ""}${day.toDateString() === data.today.toDateString() ? " today" : ""}"><span class="dl">${wdn(day)} ${dd(day)}</span>${out ? "" : its.map((it) => `<button type="button" class="d-chip${it.status === st[4] ? " done" : ""}${S.sel === it.id ? " sel" : ""}" style="--c:${chOf(it.ch).color}" data-item="${it.id}"><small>${esc(chOf(it.ch).name)} · ${esc(it.type)}</small>${esc(it.title)}</button>`).join("")}</div>`;
        }
        weeks += `<div class="cal-week${isNow ? " now" : ""}"><div class="cal-wk"><b>${dd(w)}</b><small>${wkItems.filter((i) => i.ch === "email").length} ${L("emails", "e-mails")}</small></div>${cells}</div>`;
      }
      const sel = data.items.find((i) => i.id === S.sel);
      const detail = sel ? `<aside class="cal-detail"><p class="eyebrow" style="color:${chOf(sel.ch).color}">${esc(chOf(sel.ch).name)} · ${wdn(sel.date)} ${dd(sel.date)}</p><h5>${esc(sel.title)}</h5><dl><dt>${L("Product", "Produto")}</dt><dd>${esc(sel.prod)}</dd><dt>${L("Type", "Tipo")}</dt><dd>${esc(sel.type)}</dd>${sel.seg ? `<dt>${L("Segment", "Segmento")}</dt><dd>${esc(sel.seg)}</dd>` : ""}</dl><label>${L("Publication status", "Status da publicação")}<select data-status="${sel.id}">${st.map((s) => `<option${s === sel.status ? " selected" : ""}>${esc(s)}</option>`).join("")}</select></label><button type="button" class="d-btn" data-item="">${L("Close", "Fechar")}</button></aside>` : `<aside class="cal-detail empty"><p>${L("Click a piece in the calendar to see its details and change its status.", "Clique em uma peça do calendário para ver os detalhes e mudar o status.")}</p></aside>`;
      return `<div class="cal-layout"><div class="cal-grid"><div class="cal-head"><span>${L("Week", "Semana")}</span>${[1, 2, 3, 4, 5].map((k) => `<span>${wdn(new Date(2026, 10, 1 + k))}</span>`).join("")}</div>${weeks}</div>${detail}</div>`;
    }
    function viewDash() {
      const its = visible();
      const inM = its.filter((i) => i.date.getMonth() === S.month);
      const cnt = (f) => inM.filter(f).length;
      const tiles = kpis([
        { label: L("Pieces this month", "Peças no mês"), value: num(inM.length), hi: true },
        { label: L("Emails", "E-mails"), value: num(cnt((i) => i.ch === "email")) },
        { label: "LinkedIn", value: num(cnt((i) => i.ch === "li" || i.ch === "liv")) },
        { label: "Instagram", value: num(cnt((i) => i.ch === "ig")) },
        { label: "WhatsApp", value: num(cnt((i) => i.ch === "wa")) },
        { label: L("Done or confirmed", "Concluídos ou confirmados"), value: num(cnt((i) => i.status === st[4] || i.status === st[1])) }
      ]);
      const cad = hbars(months.map(([m, l]) => ({ label: l, parts: ch.map((c) => ({ v: its.filter((i) => i.date.getMonth() === m && i.ch === c.id).length, color: c.color, name: c.name })) })));
      const byProd = hbars(PRODUCTS().map((p) => ({ label: p, parts: ch.map((c) => ({ v: inM.filter((i) => i.prod === p && i.ch === c.id).length, color: c.color, name: c.name })) })).filter((r) => sum(r.parts.map((x) => x.v))).sort((a, b) => sum(b.parts.map((x) => x.v)) - sum(a.parts.map((x) => x.v))));
      const bySt = hbars(st.map((s) => ({ label: s, parts: [{ v: inM.filter((i) => i.status === s).length, color: C.wine }] })));
      return `${tiles}<div class="d-grid2">${panel(L("Cadence by channel", "Cadência por canal"), legend(ch.map((c) => [c.name, c.color])) + cad)}${panel(L("Status this month", "Status no mês"), bySt)}${panel(L("Pieces by product and channel", "Peças por produto e canal"), byProd, " wide")}</div>`;
    }
    function viewPlan() {
      const rows = data.plan.filter((p) => (S.showDone || !p.done) && (!S.planStatus || p.status === S.planStatus));
      const done = data.plan.filter((p) => p.done).length;
      const late = data.plan.filter((p) => !p.done && p.due < data.today).length;
      const fronts = [...new Set(data.plan.map((p) => p.front))];
      const prog = fronts.map((f) => { const a = data.plan.filter((p) => p.front === f); const d = a.filter((p) => p.done).length; return `<div class="d-prog"><span>${esc(f)}</span><span class="bar"><i style="width:${(d / a.length) * 100}%"></i></span><b>${d}/${a.length}</b></div>`; }).join("");
      return `${kpis([{ label: L("Completed", "Concluído"), value: pct(done / data.plan.length, 0), hi: true }, { label: L("Actions done", "Ações concluídas"), value: `${done} ${L("of", "de")} ${data.plan.length}` }, { label: L("In progress", "Em andamento"), value: num(data.plan.filter((p) => p.status === data.pst[1]).length) }, { label: L("Overdue", "Atrasadas"), value: num(late) }])}
        <div class="d-grid2">${panel(L("Progress by front", "Andamento por frente"), prog)}
        ${panel(L("Filters", "Filtros"), `<div class="d-filters"><label>${L("Status", "Status")}<select data-planstatus><option value="">${L("All", "Todos")}</option>${data.pst.map((s) => `<option${s === S.planStatus ? " selected" : ""}>${esc(s)}</option>`).join("")}</select></label><label class="chk"><input type="checkbox" data-showdone${S.showDone ? " checked" : ""}> ${L("Show completed", "Mostrar concluídas")}</label></div><p class="d-note">${L("Tick a box to complete an action: progress and counters update instantly.", "Marque a caixa para concluir uma ação: o andamento e os contadores atualizam na hora.")}</p>`)}</div>
        <div class="d-table-wrap"><table class="d-table plan"><thead><tr><th>✓</th><th>ID</th><th>${L("Action", "Ação")}</th><th>${L("Front", "Frente")}</th><th>${L("Owner", "Responsável")}</th><th>${L("Due", "Prazo")}</th><th>Status</th></tr></thead><tbody>${rows.map((p) => `<tr class="${p.done ? "is-done" : ""}"><td><input type="checkbox" data-plan="${p.id}"${p.done ? " checked" : ""} aria-label="${esc(p.act)}"></td><td>${p.id}</td><td>${esc(p.act)}</td><td>${esc(p.front)}</td><td>${esc(p.owner)}</td><td class="${!p.done && p.due < data.today ? "late" : ""}">${dd(p.due)}</td><td><span class="pill">${esc(p.status)}</span></td></tr>`).join("")}</tbody></table></div>`;
    }
    function render() {
      const filters = `<div class="d-toolbar">${seg("ctab", [["cal", L("Calendar", "Calendário")], ["dash", "Dashboard"], ["plan", L("Action plan", "Plano de ação")]], S.tab)}
        ${S.tab !== "plan" ? `<div class="d-chans">${ch.map((c) => `<button type="button" class="tog" aria-pressed="${S.chans.has(c.id)}" data-chan="${c.id}"><i style="background:${c.color}"></i>${esc(c.name)}</button>`).join("")}</div>
        <div class="d-row">${seg("month", months.map(([m, l]) => [String(m), l]), String(S.month))}<label class="d-sel">${L("Product", "Produto")}<select data-prod><option value="">${L("All", "Todos")}</option>${PRODUCTS().map((p) => `<option${p === S.prod ? " selected" : ""}>${esc(p)}</option>`).join("")}</select></label><span class="d-count">${visible().filter((i) => i.date.getMonth() === S.month).length} ${L("pieces", "peças")}</span></div>` : ""}</div>`;
      root.innerHTML = filters + (S.tab === "cal" ? viewCal() : S.tab === "dash" ? viewDash() : viewPlan());
    }
    root.onclick = (e) => {
      const t = e.target.closest("[data-ctab],[data-month],[data-chan],[data-item]"); if (!t) return;
      if (t.dataset.ctab) S.tab = t.dataset.ctab;
      else if (t.dataset.month) { S.month = +t.dataset.month; S.sel = null; }
      else if (t.dataset.chan) { S.chans.has(t.dataset.chan) ? S.chans.delete(t.dataset.chan) : S.chans.add(t.dataset.chan); }
      else if (t.hasAttribute("data-item")) S.sel = t.dataset.item === "" ? null : +t.dataset.item;
      render();
    };
    root.onchange = (e) => {
      const t = e.target;
      if (t.dataset.status) { data.items[+t.dataset.status].status = t.value; }
      else if (t.hasAttribute("data-prod")) S.prod = t.value;
      else if (t.dataset.plan) { const p = data.plan.find((x) => x.id === t.dataset.plan); p.done = t.checked; p.status = t.checked ? data.pst[3] : data.pst[1]; }
      else if (t.hasAttribute("data-planstatus")) S.planStatus = t.value;
      else if (t.hasAttribute("data-showdone")) S.showDone = t.checked;
      render();
    };
    render();
  }

  /* ---------- fictional channel data helpers ---------- */
  const WEEKS = (n) => Array.from({ length: n }, (_, i) => { const d = new Date(2026, 9, 26 - 7 * (n - 1 - i)); return String(d.getDate()).padStart(2, "0") + "/" + String(d.getMonth() + 1).padStart(2, "0"); });
  const MONTHS = () => (lang === "pt" ? ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out"] : ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"]);
  const DAYS = () => (lang === "pt" ? ["Seg", "Ter", "Qua", "Qui", "Sex"] : ["Mon", "Tue", "Wed", "Thu", "Fri"]);
  const THEMES = () => [L("Events", "Eventos"), L("Market data", "Dados de mercado"), L("Batteries & storage", "Baterias e armazenamento"), L("Regulation", "Regulação"), L("Courses", "Cursos"), L("Behind the scenes", "Bastidores")];
  function sortable(root, state, render) {
    root.addEventListener("click", (e) => { const b = e.target.closest("[data-sort]"); if (!b) return; const k = b.dataset.sort; state.dir = state.sort === k ? -state.dir : -1; state.sort = k; render(); });
  }

  /* ---------- demo: Instagram ---------- */
  function instagram(root) {
    const r = rng(77), wk = WEEKS(10), th = THEMES();
    const posts = Array.from({ length: 64 }, (_, i) => { const reel = r() < 0.4; const v = Math.round((reel ? 900 : 420) * (0.5 + r() * 1.6)); const it = Math.round(v * (reel ? 0.03 + r() * 0.04 : 0.012 + r() * 0.02)); return { id: i, theme: pick(r, th), fmt: reel ? "Reel" : "Post", week: i % 10, day: Math.floor(r() * 5), hour: between(r, 8, 20), views: v, inter: it, rate: it / v }; });
    const S = { view: "week", sort: "views", dir: -1 };
    const vw = (f, k) => wk.map((_, w) => sum(posts.filter((p) => p.week === w && p.fmt === f).map((p) => p[k])));
    function render() {
      const cur = posts.filter((p) => p.week === 9), prev = posts.filter((p) => p.week === 8);
      const tv = (a) => sum(a.map((p) => p.views)), ti = (a) => sum(a.map((p) => p.inter));
      const head = kpis([
        { label: L("Posts this year", "Publicações no ano"), value: num(posts.length * 2 + 21) },
        { label: L("Total views", "Visualizações somadas"), value: kfmt(sum(posts.map((p) => p.views)) * 2) },
        { label: L("Interactions", "Interações"), value: kfmt(sum(posts.map((p) => p.inter)) * 2) },
        { label: L("Median views per post", "Mediana de views por post"), value: num(median(posts.map((p) => p.views))) },
        { label: L("Median Reel interaction rate", "Taxa de interação mediana dos Reels"), value: pct(median(posts.filter((p) => p.fmt === "Reel").map((p) => p.rate))), hi: true },
        { label: L("Followers", "Seguidores"), value: L("9.8K", "9,8 mil") }
      ]);
      let body = "";
      if (S.view === "week") {
        body = `<h5 class="d-h">${L("Week closed vs the week before", "Semana encerrada contra a anterior")}</h5>` + kpis([
          { label: L("Posts", "Publicações"), value: num(cur.length), delta: cur.length / Math.max(1, prev.length) - 1 },
          { label: L("Views", "Visualizações"), value: num(tv(cur)), delta: tv(cur) / tv(prev) - 1 },
          { label: L("Interactions", "Interações"), value: num(ti(cur)), delta: ti(cur) / ti(prev) - 1 },
          { label: L("Interaction rate", "Taxa de interação"), value: pct(ti(cur) / tv(cur)), delta: ti(cur) / tv(cur) - ti(prev) / tv(prev), pp: true }
        ]) + `<div class="d-grid2">${panel(L("Views per week", "Visualizações por semana"), legend([["Posts", C.wine], ["Reels", C.coral]]) + vbars(wk, [{ name: "Posts", color: C.wine, data: vw("Post", "views") }, { name: "Reels", color: C.coral, data: vw("Reel", "views") }], { stacked: true, hiLast: true }))}${panel(L("Interaction rate per week", "Taxa de interação por semana"), line(wk, wk.map((_, w) => { const a = posts.filter((p) => p.week === w); return ti(a) / Math.max(1, tv(a)); }), { fmt: (v) => pct(v, 1) }))}</div>` +
          panel(L("This week's posts", "Publicações da semana"), table("ig-week", [{ key: "fmt", label: L("Format", "Formato"), render: (p) => `<span class="pill ${p.fmt === "Reel" ? "d-reel" : ""}">${p.fmt}</span>` }, { key: "theme", label: L("Theme", "Tema") }, { key: "views", label: L("Views", "Visualizações"), num: true, fmt: num }, { key: "inter", label: L("Interactions", "Interações"), num: true, fmt: num }, { key: "rate", label: L("Rate", "Taxa"), num: true, fmt: (v) => pct(v) }], cur, S.sort, S.dir));
      } else {
        const idx = DAYS().map((_, d) => ["8–10h", "11–13h", "14–16h", "17h+"].map((_, j) => { const a = posts.filter((p) => p.day === d && (j === 0 ? p.hour <= 10 : j === 1 ? p.hour <= 13 : j === 2 ? p.hour <= 16 : p.hour >= 17)); return a.length ? median(a.map((p) => p.views)) / median(posts.map((p) => p.views)) : 0; }));
        const n = DAYS().map((_, d) => ["", "", "", ""].map((_, j) => posts.filter((p) => p.day === d && (j === 0 ? p.hour <= 10 : j === 1 ? p.hour <= 13 : j === 2 ? p.hour <= 16 : p.hour >= 17)).length));
        const mo = MONTHS();
        body = `<div class="d-grid2">${panel(L("Posts per month", "Publicações por mês"), legend([["Posts", C.wine], ["Reels", C.coral]]) + vbars(mo, [{ name: "Posts", color: C.wine, data: mo.map(() => between(r, 6, 13)) }, { name: "Reels", color: C.coral, data: mo.map((_, i) => between(r, 2, 4 + i)) }], { stacked: true }))}${panel(L("When posts perform best", "Quando os posts rendem mais"), `<p class="d-note">${L("Median views of the slot ÷ overall median. Above 1.0 = better than usual.", "Mediana de views da faixa ÷ mediana geral. Acima de 1,0 = melhor que o normal.")}</p>` + heat(DAYS(), ["8–10h", "11–13h", "14–16h", "17h+"], idx, n))}</div>` +
          panel(L("Top posts of the year", "Publicações com mais visualizações"), table("ig-top", [{ key: "fmt", label: L("Format", "Formato"), render: (p) => `<span class="pill ${p.fmt === "Reel" ? "d-reel" : ""}">${p.fmt}</span>` }, { key: "theme", label: L("Theme", "Tema") }, { key: "views", label: L("Views", "Visualizações"), num: true, fmt: num }, { key: "inter", label: L("Interactions", "Interações"), num: true, fmt: num }, { key: "rate", label: L("Rate", "Taxa"), num: true, fmt: (v) => pct(v) }], [...posts].sort((a, b) => b.views - a.views).slice(0, 10), S.sort, S.dir));
      }
      root.innerHTML = head + `<div class="d-toolbar">${seg("igv", [["week", L("Weekly overview", "Overview semanal")], ["year", L("The year", "O ano")]], S.view)}</div>` + body;
    }
    root.addEventListener("click", (e) => { const b = e.target.closest("[data-igv]"); if (b) { S.view = b.dataset.igv; render(); } });
    sortable(root, S, render); render();
  }

  /* ---------- demo: LinkedIn ---------- */
  function linkedin(root) {
    const r = rng(31), th = THEMES();
    const fmts = [L("Document", "Documento"), L("Image", "Imagem"), L("Video", "Vídeo"), L("Article", "Artigo"), L("Reshare", "Compartilhamento")];
    const posts = Array.from({ length: 70 }, (_, i) => { const f = pick(r, fmts); const imp = Math.round((f === fmts[0] ? 1500 : f === fmts[2] ? 1200 : 800) * (0.5 + r() * 1.4)); return { id: i, fmt: f, theme: pick(r, th), day: Math.floor(r() * 5), slot: Math.floor(r() * 5), imp, react: Math.round(imp * (0.012 + r() * 0.02)), com: Math.round(imp * r() * 0.002), shares: Math.round(imp * r() * 0.003), clicks: Math.round(imp * (0.005 + r() * 0.015)) }; });
    posts.forEach((p) => { p.eng = (p.react + p.com + p.shares) / p.imp; });
    const S = { metric: "share", sort: "imp", dir: -1 };
    const slots = ["08–10h", "10–12h", "12–14h", "14–16h", "16–19h"];
    function render() {
      const med = median(posts.map((p) => p.imp));
      const head = kpis([
        { label: L("Impressions", "Impressões"), value: kfmt(sum(posts.map((p) => p.imp))), note: L("median ", "mediana ") + num(med) + L(" per post", " por post") },
        { label: L("Posts", "Publicações"), value: num(posts.length), note: L("3.4 per week · Mon–Fri", "3,4 por semana · seg a sex") },
        { label: L("Reactions", "Reações"), value: num(sum(posts.map((p) => p.react))) },
        { label: L("Comments", "Comentários"), value: num(sum(posts.map((p) => p.com))) },
        { label: L("Social engagement", "Engajamento social"), value: pct(median(posts.map((p) => p.eng))), hi: true },
        { label: L("New followers", "Novos seguidores"), value: "+412" }
      ]);
      const idx = DAYS().map((_, d) => slots.map((_, s) => { const a = posts.filter((p) => p.day === d && p.slot === s); return a.length ? median(a.map((p) => p.imp)) / med : 0; }));
      const n = DAYS().map((_, d) => slots.map((_, s) => posts.filter((p) => p.day === d && p.slot === s).length));
      const best = DAYS().map((dname, d) => { let bi = 0; idx[d].forEach((v, s) => { if (n[d][s] >= 2 && v > idx[d][bi]) bi = s; }); return `<div class="d-best"><span>${dname}</span><strong>${slots[bi]}</strong><small>${L("index ", "índice ")}${num(idx[d][bi], 2)} · n=${n[d][bi]}</small></div>`; }).join("");
      const mrows = fmts.map((f) => { const a = posts.filter((p) => p.fmt === f); const v = S.metric === "share" ? a.length / posts.length : S.metric === "reach" ? median(a.map((p) => p.imp)) / med : median(a.map((p) => p.eng)); return { label: f, parts: [{ v, color: C.wine }] }; });
      const mfmt = S.metric === "reach" ? (v) => num(v, 2) + "x" : (v) => pct(v);
      const mo = MONTHS();
      root.innerHTML = head + `<div class="d-grid2">${panel(L("Best time per weekday", "Melhor horário por dia"), `<div class="d-bests">${best}</div>`)}${panel(L("Relative reach by day and time", "Alcance relativo por dia e horário"), heat(DAYS(), slots, idx, n))}${panel(L("Formats", "Formatos"), seg("lim", [["share", L("Share of posts", "Participação")], ["reach", L("Relative reach", "Alcance relativo")], ["eng", L("Social engagement", "Engajamento social")]], S.metric) + hbars(mrows, { fmt: mfmt }))}${panel(L("Median impressions per post, month by month", "Impressões medianas por post, mês a mês"), line(mo, mo.map((_, i) => Math.round(med * (0.7 + i * 0.05 + r() * 0.25)))))}</div>` +
        panel(L("Top posts by impressions", "Posts com mais impressões"), table("li-top", [{ key: "fmt", label: L("Format", "Formato") }, { key: "theme", label: L("Theme", "Tema") }, { key: "imp", label: L("Impressions", "Impressões"), num: true, fmt: num }, { key: "react", label: L("Reactions", "Reações"), num: true, fmt: num }, { key: "com", label: L("Comments", "Coment."), num: true, fmt: num }, { key: "clicks", label: L("Clicks", "Cliques"), num: true, fmt: num }, { key: "eng", label: L("Eng.", "Engaj."), num: true, fmt: (v) => pct(v) }], [...posts].sort((a, b) => b.imp - a.imp).slice(0, 10), S.sort, S.dir));
    }
    root.addEventListener("click", (e) => { const b = e.target.closest("[data-lim]"); if (b) { S.metric = b.dataset.lim; render(); } });
    sortable(root, S, render); render();
  }

  /* ---------- demo: YouTube lives ---------- */
  function youtube(root) {
    const r = rng(12);
    const themes = [[L("Market & solar", "Mercado e solar"), C.wine], [L("Batteries series", "Série baterias"), C.coral], [L("Regulation & finance", "Regulação e financiamento"), C.plum], [L("Event talks", "Talks do evento"), C.sand]];
    const lives = Array.from({ length: 12 }, (_, i) => { const t = themes[i % 4 === 3 ? 3 : Math.floor(r() * 3)]; const views = between(r, 280, 2100); const d = new Date(2026, Math.floor(i * 0.85), 4 + ((i * 9) % 22)); const evening = i === 5; return { n: i + 1, date: String(d.getDate()).padStart(2, "0") + "/" + String(d.getMonth() + 1).padStart(2, "0"), time: evening ? "19h" : "11h", theme: t[0], color: t[1], views, peak: Math.round(views * (0.06 + r() * 0.07)), avgdur: between(r, 6, 22), subs: between(r, 2, 40), mins: between(r, 55, 95), title: `${L("Live", "Live")} #${i + 1} · ${t[0]}` }; });
    const S = { metric: "peak", sort: "n", dir: 1 };
    const mets = [["peak", L("Peak live", "Pico ao vivo")], ["views", L("Views", "Visualizações")], ["avgdur", L("Avg. watch (min)", "Duração média (min)")], ["subs", L("Subscribers", "Inscritos")]];
    function render() {
      const head = kpis([
        { label: L("Lives this year", "Lives no ano"), value: num(lives.length) },
        { label: L("Views", "Visualizações"), value: kfmt(sum(lives.map((l) => l.views))) },
        { label: L("Watch hours", "Horas assistidas"), value: num(Math.round(sum(lives.map((l) => l.views * l.avgdur)) / 60)) },
        { label: L("Subscribers gained", "Inscritos gerados"), value: "+" + num(sum(lives.map((l) => l.subs))) },
        { label: L("Average live peak", "Pico médio ao vivo"), value: num(Math.round(sum(lives.map((l) => l.peak)) / lives.length)), hi: true },
        { label: L("Avg. watch time", "Duração média assistida"), value: num(median(lives.map((l) => l.avgdur))) + " min" }
      ]);
      const bars = vbars(lives.map((l) => l.date), [{ name: mets.find((m) => m[0] === S.metric)[1], data: lives.map((l) => l[S.metric]), colors: lives.map((l) => l.color), tips: lives.map((l) => l.title + " · " + l.time) }], { w: 1100, h: 260 });
      const th = hbars(themes.map(([t, c]) => { const a = lives.filter((l) => l.theme === t); return { label: t + " (n=" + a.length + ")", parts: [{ v: a.length ? Math.round(sum(a.map((l) => l[S.metric])) / a.length) : 0, color: c }] }; }));
      root.innerHTML = head + `<div class="d-toolbar">${seg("ytm", mets, S.metric)}</div><div class="d-grid2">${panel(L("Performance per live", "Desempenho por live"), legend(themes) + bars, " wide")}${panel(L("Average by theme", "Média por tema"), th)}${panel(L("Where viewers come from", "Como o público chega"), hbars([[L("Direct / unknown", "Direta / desconhecida"), 34], [L("External (site, WhatsApp, email)", "Externa (site, WhatsApp, e-mail)"), 29], [L("YouTube browse", "Navegação no YouTube"), 18], [L("YouTube search", "Pesquisa no YouTube"), 11], [L("Other", "Outros"), 8]].map(([l, v]) => ({ label: l, parts: [{ v: v / 100, color: C.wine }] })), { fmt: (v) => pct(v, 0) }))}</div>` +
        panel(L("All lives (click a column to sort)", "Todas as lives (clique na coluna para ordenar)"), table("yt", [{ key: "n", label: "#", num: true, fmt: num }, { key: "date", label: L("Date", "Data") }, { key: "time", label: L("Start", "Início") }, { key: "theme", label: L("Theme", "Tema"), render: (l) => `<span class="dot" style="background:${l.color}"></span>${esc(l.theme)}` }, { key: "views", label: L("Views", "Views"), num: true, fmt: num }, { key: "peak", label: L("Peak", "Pico"), num: true, fmt: num }, { key: "avgdur", label: L("Avg. min", "Dur. média"), num: true, fmt: num }, { key: "subs", label: L("Subs", "Inscritos"), num: true, fmt: num }], lives, S.sort, S.dir));
    }
    root.addEventListener("click", (e) => { const b = e.target.closest("[data-ytm]"); if (b) { S.metric = b.dataset.ytm; render(); } });
    sortable(root, S, render); render();
  }

  /* ---------- demo: articles ---------- */
  function articles(root) {
    const r = rng(5);
    const pillars = [[L("Batteries", "Baterias"), C.coral], [L("Solar market", "Mercado solar"), C.wine], [L("Events", "Eventos"), C.sand], [L("Auctions", "Leilões"), C.plum], [L("Opinion", "Opinião"), "#3d1d26"]];
    const arts = Array.from({ length: 18 }, (_, i) => { const p = pick(r, pillars); const q = between(r, 60, 640); return { n: i + 1, title: `${L("Article", "Artigo")} ${String(i + 1).padStart(2, "0")} · ${p[0]}`, pillar: p[0], color: p[1], raw: Math.round(q * (1.6 + r() * 2)), qual: q, time: between(r, 35, 190), end: 0.35 + r() * 0.4, click: 0.04 + r() * 0.18 }; });
    const S = { metric: "qual", sort: "qual", dir: -1 };
    const wk = WEEKS(12);
    const mets = [["qual", L("Qualified reads", "Leituras qualificadas")], ["time", L("Median time (s)", "Tempo mediano (s)")], ["end", L("Read to the end", "Leram até o fim")], ["click", L("Product click", "Clique em produto")]];
    function render() {
      const raw = sum(arts.map((a) => a.raw)), q = sum(arts.map((a) => a.qual));
      const head = kpis([
        { label: L("Articles published", "Artigos publicados"), value: num(arts.length) },
        { label: L("Raw page views", "Visualizações brutas"), value: kfmt(raw), note: L("analytics, unfiltered", "analytics, sem filtro") },
        { label: L("Qualified reads", "Leituras qualificadas"), value: kfmt(q), note: pct(q / raw, 0) + L(" of raw", " do bruto") },
        { label: L("Median reading time", "Tempo mediano de leitura"), value: Math.floor(median(arts.map((a) => a.time)) / 60) + ":" + String(Math.round(median(arts.map((a) => a.time)) % 60)).padStart(2, "0") + " min" },
        { label: L("Click a product", "Clicam em produto"), value: pct(median(arts.map((a) => a.click)), 0), hi: true },
        { label: L("Readers per 1,000 emails", "Leitores por mil e-mails"), value: num(4.6, 1) }
      ]);
      const mf = S.metric === "qual" ? num : S.metric === "time" ? (v) => num(v) + " s" : (v) => pct(v, 0);
      const per = hbars([...arts].sort((a, b) => b[S.metric] - a[S.metric]).map((a) => ({ label: a.title, parts: [{ v: a[S.metric], color: a.color }] })), { fmt: mf });
      root.innerHTML = head + `<div class="d-grid2">${panel(L("Real reading vs automated traffic", "Leitura real e tráfego automatizado"), legend([[L("Qualified", "Qualificado"), C.wine], [L("Automated", "Automatizado"), C.sand]]) + vbars(wk, [{ name: L("Qualified", "Qualificado"), color: C.wine, data: wk.map(() => between(r, 120, 420)) }, { name: L("Automated", "Automatizado"), color: C.sand, data: wk.map(() => between(r, 150, 900)) }], { stacked: true, w: 1100, h: 250 }), " wide")}${panel(L("Where readers come from", "De onde vêm os leitores"), hbars([[L("Email", "E-mail"), 46], [L("Direct", "Direto"), 21], [L("Search", "Busca"), 15], [L("Internal navigation", "Navegação interna"), 9], ["LinkedIn", 5], ["Instagram", 4]].map(([l, v]) => ({ label: l, parts: [{ v: v / 100, color: C.wine }] })), { fmt: (v) => pct(v, 0) }))}${panel(L("Performance per article", "Desempenho por artigo"), seg("arm", mets, S.metric) + legend(pillars) + per)}</div>` +
        panel(L("All articles (click a column to sort)", "Todos os artigos (clique na coluna para ordenar)"), table("art", [{ key: "title", label: L("Article", "Artigo"), render: (a) => `<span class="dot" style="background:${a.color}"></span>${esc(a.title)}` }, { key: "raw", label: L("Raw", "Bruto"), num: true, fmt: num }, { key: "qual", label: L("Qualified", "Qualif."), num: true, fmt: num }, { key: "time", label: L("Median s", "Tempo (s)"), num: true, fmt: num }, { key: "end", label: L("To the end", "Até o fim"), num: true, fmt: (v) => pct(v, 0) }, { key: "click", label: L("Product click", "Clique produto"), num: true, fmt: (v) => pct(v, 0) }], arts, S.sort, S.dir));
    }
    root.addEventListener("click", (e) => { const b = e.target.closest("[data-arm]"); if (b) { S.metric = b.dataset.arm; render(); } });
    sortable(root, S, render); render();
  }

  /* ---------- modal shell ---------- */
  const DEMOS = { calendar, instagram, linkedin, youtube, articles };
  let shell, tip, lastFocus;
  function ensureShell() {
    if (shell) return;
    shell = document.createElement("div");
    shell.className = "demo"; shell.hidden = true;
    shell.setAttribute("role", "dialog"); shell.setAttribute("aria-modal", "true");
    shell.innerHTML = `<div class="demo-backdrop" data-dclose></div><div class="demo-box"><header class="demo-bar"><div><strong class="demo-title"></strong><span class="demo-flag"></span></div><button type="button" class="demo-close" data-dclose aria-label="Close">✕</button></header><div class="demo-body"></div></div>`;
    document.body.appendChild(shell);
    tip = document.createElement("div"); tip.className = "demo-tip"; tip.hidden = true; document.body.appendChild(tip);
    shell.addEventListener("click", (e) => { if (e.target.closest("[data-dclose]")) close(); });
    shell.addEventListener("mouseover", (e) => { const t = e.target.closest("[data-tip]"); if (!t) { tip.hidden = true; return; } tip.textContent = t.dataset.tip; tip.hidden = false; });
    shell.addEventListener("mousemove", (e) => { if (!tip.hidden) { tip.style.left = Math.min(innerWidth - tip.offsetWidth - 8, e.clientX + 14) + "px"; tip.style.top = e.clientY + 16 + "px"; } });
    shell.addEventListener("mouseleave", () => { tip.hidden = true; });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape" && shell && !shell.hidden) close(); });
  }
  function open(id, l, title) {
    lang = l === "pt" ? "pt" : "en";
    ensureShell(); lastFocus = document.activeElement;
    shell.querySelector(".demo-title").textContent = title || id;
    shell.querySelector(".demo-flag").textContent = L("Fictional data · simplified demo of an internal tool", "Dados fictícios · versão demonstrativa e resumida de uma ferramenta interna");
    shell.setAttribute("aria-label", title || id);
    const body = shell.querySelector(".demo-body");
    const fresh = body.cloneNode(false); body.replaceWith(fresh); /* drop old listeners */
    DEMOS[id](fresh);
    shell.hidden = false; document.body.style.overflow = "hidden";
    shell.querySelector(".demo-close").focus();
  }
  function close() { shell.hidden = true; tip.hidden = true; document.body.style.overflow = ""; if (lastFocus) lastFocus.focus(); }
  window.Demos = { open, close };
})();
