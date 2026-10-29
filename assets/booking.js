/* Meeting booking flow for the "Let's talk" section.
   Loaded on demand; exposes window.Booking.mount(el, lang, endpoint, email).
   Backend: Google Apps Script web app (GET ?action=slots, POST JSON briefing + slot). */
(function () {
  const L = {
    en: {
      s1: "Briefing", s2: "Date & time", s3: "Confirm",
      name: "Your name", email: "Your email", company: "Company or brand (optional)",
      type: "Project type", budget: "Estimated budget (optional)", timeline: "When do you need it?",
      msg: "Tell me about the project", msgPh: "Goals, audience, deliverables, references…",
      types: ["Brand identity", "Event communication", "Campaign", "Landing page or website", "Illustration", "Motion design", "Something else"],
      budgets: ["Not sure yet", "Up to US$ 200", "US$ 200 – 450", "US$ 450 – 950", "US$ 950 – 1,850", "US$ 1,850 – 4,650", "US$ 4,650 – 9,350", "Over US$ 9,350"],
      timelines: ["As soon as possible", "Within a month", "In 1 to 3 months", "Flexible"],
      choose: "Choose", next: "Next: pick a time", back: "Back", book: "Book the call",
      privacy: "Your details are used only to prepare and reply about this meeting.",
      loading: "Loading my availability…",
      tzNote: (tz) => `Times shown in your time zone (${tz}). 30-minute call on Google Meet.`,
      noSlots: "No free times in the next few weeks. Please send me an email instead.",
      err: "Couldn't load the calendar right now.",
      offline: "Online booking isn't available in this preview. Please send me an email instead.",
      pickDay: "Pick a day", pickTime: "Pick a time",
      review: "Check the details and confirm.",
      when: "When", who: "Who", about: "Project",
      sending: "Booking…",
      done: "Booked!",
      doneTxt: (m) => `A calendar invite with the Google Meet link is on its way to ${m}. See you there.`,
      taken: "That time was just taken. Please pick another one.",
      fail: "Something went wrong and the call wasn't booked. Please try again or send me an email.",
      req: "Please fill in this field.", bad: "Please enter a valid email.",
      mailMe: "Send an email instead"
    },
    pt: {
      s1: "Briefing", s2: "Data e horário", s3: "Confirmação",
      name: "Seu nome", email: "Seu e-mail", company: "Empresa ou marca (opcional)",
      type: "Tipo de projeto", budget: "Orçamento estimado (opcional)", timeline: "Para quando você precisa?",
      msg: "Conte sobre o projeto", msgPh: "Objetivos, público, entregas, referências…",
      types: ["Identidade visual", "Comunicação de evento", "Campanha", "Landing page ou site", "Ilustração", "Motion design", "Outro"],
      budgets: ["Ainda não sei", "Até R$ 1.000", "R$ 1.000 a 2.500", "R$ 2.500 a 5.000", "R$ 5.000 a 10.000", "R$ 10.000 a 25.000", "R$ 25.000 a 50.000", "Acima de R$ 50.000"],
      timelines: ["O quanto antes", "Em até um mês", "De 1 a 3 meses", "Flexível"],
      choose: "Escolha", next: "Próximo: escolher horário", back: "Voltar", book: "Agendar reunião",
      privacy: "Seus dados são usados apenas para preparar e responder sobre esta reunião.",
      loading: "Carregando minha agenda…",
      tzNote: (tz) => `Horários no seu fuso (${tz}). Reunião de 30 minutos pelo Google Meet.`,
      noSlots: "Sem horários livres nas próximas semanas. Me mande um e-mail, por favor.",
      err: "Não consegui carregar a agenda agora.",
      offline: "O agendamento on-line não funciona nesta prévia. Me mande um e-mail, por favor.",
      pickDay: "Escolha o dia", pickTime: "Escolha o horário",
      review: "Confira os dados e confirme.",
      when: "Quando", who: "Quem", about: "Projeto",
      sending: "Agendando…",
      done: "Reunião marcada!",
      doneTxt: (m) => `O convite com o link do Google Meet foi enviado para ${m}. Até lá!`,
      taken: "Esse horário acabou de ser ocupado. Escolha outro, por favor.",
      fail: "Algo deu errado e a reunião não foi marcada. Tente de novo ou me mande um e-mail.",
      req: "Preencha este campo.", bad: "Digite um e-mail válido.",
      mailMe: "Mandar um e-mail"
    }
  };
  const esc = (s) => String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const arrow = '<svg width="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';

  function mount(el, lang, endpoint, ownerMail) {
    const T = L[lang] || L.en;
    const loc = lang === "pt" ? "pt-BR" : "en-GB";
    const tz = (Intl.DateTimeFormat().resolvedOptions().timeZone) || "UTC";
    const S = { step: 1, data: { name: "", email: "", company: "", type: "", budget: "", timeline: "", message: "", website: "" }, slots: null, day: null, slot: null, msg: "" };

    const steps = () => `<ol class="bk-steps">${[T.s1, T.s2, T.s3].map((s, i) => `<li${i + 1 === S.step ? ' aria-current="step"' : ""}${i + 1 < S.step ? ' class="done"' : ""}><span>${i + 1}</span>${esc(s)}</li>`).join("")}</ol>`;
    const sel = (id, label, opts, val) => `<div class="field"><label class="label" for="bk-${id}">${esc(label)}</label><select id="bk-${id}" name="${id}"><option value="">${esc(T.choose)}…</option>${opts.map((o) => `<option${o === val ? " selected" : ""}>${esc(o)}</option>`).join("")}</select></div>`;

    function step1() {
      const d = S.data;
      return `${steps()}<form class="mail bk-form" novalidate data-bk="brief">
        <div class="two">
          <div class="field"><label class="label" for="bk-name">${esc(T.name)}</label><input id="bk-name" name="name" autocomplete="name" required value="${esc(d.name)}"></div>
          <div class="field"><label class="label" for="bk-email">${esc(T.email)}</label><input id="bk-email" name="email" type="email" autocomplete="email" required value="${esc(d.email)}"></div>
        </div>
        <div class="two">
          <div class="field"><label class="label" for="bk-company">${esc(T.company)}</label><input id="bk-company" name="company" autocomplete="organization" value="${esc(d.company)}"></div>
          ${sel("type", T.type, T.types, d.type)}
        </div>
        <div class="two">${sel("budget", T.budget, T.budgets, d.budget)}${sel("timeline", T.timeline, T.timelines, d.timeline)}</div>
        <div class="field"><label class="label" for="bk-message">${esc(T.msg)}</label><textarea id="bk-message" name="message" required placeholder="${esc(T.msgPh)}">${esc(d.message)}</textarea></div>
        <div class="bk-hp" aria-hidden="true"><label>Website<input name="website" tabindex="-1" autocomplete="off"></label></div>
        <p class="bk-err" role="alert"></p>
        <div class="row"><button class="btn solid" type="submit">${esc(T.next)} ${arrow}</button></div>
        <p class="note">${esc(T.privacy)}</p>
      </form>`;
    }

    const dayKey = (iso) => new Date(iso).toLocaleDateString("en-CA", { timeZone: tz });
    function step2() {
      let body;
      if (!endpoint) body = `<p class="bk-msg">${esc(T.offline)}</p>${mailBtn()}`;
      else if (S.slots === null) body = `<p class="bk-msg bk-load">${esc(T.loading)}</p>`;
      else if (S.slots === "err") body = `<p class="bk-msg">${esc(T.err)}</p>${mailBtn()}`;
      else if (!S.slots.length) body = `<p class="bk-msg">${esc(T.noSlots)}</p>${mailBtn()}`;
      else {
        const days = [...new Set(S.slots.map(dayKey))];
        if (!S.day || !days.includes(S.day)) S.day = days[0];
        const times = S.slots.filter((s) => dayKey(s) === S.day);
        body = `<p class="label bk-lbl">${esc(T.pickDay)}</p>
          <div class="bk-days" role="group" aria-label="${esc(T.pickDay)}">${days.map((k) => {
            const dt = new Date(S.slots.find((s) => dayKey(s) === k));
            return `<button type="button" class="bk-day" data-bkday="${k}" aria-pressed="${k === S.day}"><small>${esc(dt.toLocaleDateString(loc, { weekday: "short", timeZone: tz }))}</small><strong>${esc(dt.toLocaleDateString(loc, { day: "numeric", timeZone: tz }))}</strong><small>${esc(dt.toLocaleDateString(loc, { month: "short", timeZone: tz }))}</small></button>`;
          }).join("")}</div>
          <p class="label bk-lbl">${esc(T.pickTime)}</p>
          <div class="bk-times" role="group" aria-label="${esc(T.pickTime)}">${times.map((s) => `<button type="button" class="bk-time" data-bkslot="${s}" aria-pressed="${s === S.slot}">${esc(new Date(s).toLocaleTimeString(loc, { hour: "2-digit", minute: "2-digit", timeZone: tz }))}</button>`).join("")}</div>
          <p class="note">${esc(T.tzNote(tz.replace(/_/g, " ")))}</p>`;
      }
      return `${steps()}<div class="bk-pane">${S.msg ? `<p class="bk-err" role="alert">${esc(S.msg)}</p>` : ""}${body}
        <div class="row bk-nav"><button class="btn" type="button" data-bkgo="1">${esc(T.back)}</button></div></div>`;
    }

    const whenTxt = (iso) => new Date(iso).toLocaleString(loc, { weekday: "long", day: "numeric", month: "long", hour: "2-digit", minute: "2-digit", timeZone: tz });
    function step3() {
      const d = S.data;
      const proj = [d.type, d.budget, d.timeline].filter(Boolean).join(" · ");
      return `${steps()}<div class="bk-pane"><p>${esc(T.review)}</p>
        <dl class="bk-sum">
          <div><dt class="label">${esc(T.when)}</dt><dd>${esc(whenTxt(S.slot))}<br><small>${esc(T.tzNote(tz.replace(/_/g, " ")))}</small></dd></div>
          <div><dt class="label">${esc(T.who)}</dt><dd>${esc(d.name)}${d.company ? " · " + esc(d.company) : ""}<br><small>${esc(d.email)}</small></dd></div>
          <div><dt class="label">${esc(T.about)}</dt><dd>${proj ? esc(proj) + "<br>" : ""}<small class="bk-quote">${esc(d.message)}</small></dd></div>
        </dl>
        ${S.msg ? `<p class="bk-err" role="alert">${esc(S.msg)}</p>` : ""}
        <div class="row bk-nav"><button class="btn" type="button" data-bkgo="2">${esc(T.back)}</button><button class="btn solid" type="button" data-bkbook>${esc(T.book)} ${arrow}</button></div></div>`;
    }
    function step4() {
      return `<div class="bk-pane bk-done" role="status"><span class="bk-check" aria-hidden="true">✓</span><h3>${esc(T.done)}</h3>
        <p><strong>${esc(whenTxt(S.slot))}</strong></p><p>${esc(T.doneTxt(S.data.email))}</p></div>`;
    }
    const mailBtn = () => `<div class="row"><a class="btn" href="mailto:${esc(ownerMail)}">${esc(T.mailMe)}</a></div>`;

    function draw(focus) {
      el.innerHTML = [step1, step2, step3, step4][S.step - 1]();
      if (focus) { const h = el.querySelector(".bk-steps, .bk-done"); if (h) { h.setAttribute("tabindex", "-1"); h.focus({ preventScroll: true }); } el.scrollIntoView({ behavior: "smooth", block: "nearest" }); }
    }

    function loadSlots() {
      S.slots = null; draw();
      if (!endpoint) return draw();
      fetch(endpoint + (endpoint.includes("?") ? "&" : "?") + "action=slots", { cache: "no-store" })
        .then((r) => r.json())
        .then((j) => { S.slots = j && j.ok && Array.isArray(j.slots) ? j.slots : "err"; if (S.slot && !(S.slots || []).includes(S.slot)) S.slot = null; draw(); })
        .catch(() => { S.slots = "err"; draw(); });
    }

    el.addEventListener("submit", (e) => {
      if (!e.target.matches("[data-bk=brief]")) return;
      e.preventDefault();
      const f = e.target, fd = new FormData(f), err = f.querySelector(".bk-err");
      Object.keys(S.data).forEach((k) => (S.data[k] = String(fd.get(k) || "").trim()));
      const need = [["name", T.req], ["email", T.req], ["message", T.req]];
      for (const [k, m] of need) if (!S.data[k]) { err.textContent = m; f.querySelector(`[name=${k}]`).focus(); return; }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(S.data.email)) { err.textContent = T.bad; f.querySelector("[name=email]").focus(); return; }
      S.step = 2; S.msg = ""; draw(true); loadSlots();
    });

    el.addEventListener("input", (e) => { const er = e.target.form && e.target.form.querySelector(".bk-err"); if (er) er.textContent = ""; });

    el.addEventListener("click", (e) => {
      const g = e.target.closest("[data-bkgo]");
      if (g) { S.step = Number(g.dataset.bkgo); S.msg = ""; draw(true); return; }
      const dy = e.target.closest("[data-bkday]");
      if (dy) { S.day = dy.dataset.bkday; draw(); return; }
      const sl = e.target.closest("[data-bkslot]");
      if (sl) { S.slot = sl.dataset.bkslot; S.step = 3; S.msg = ""; draw(true); return; }
      const bk = e.target.closest("[data-bkbook]");
      if (bk && !bk.disabled) {
        bk.disabled = true; bk.textContent = T.sending;
        const payload = Object.assign({}, S.data, { slot: S.slot, guestTz: tz, lang });
        fetch(endpoint, { method: "POST", body: JSON.stringify(payload) })   // text/plain: no CORS preflight
          .then((r) => r.json())
          .then((j) => {
            if (j && j.ok) { S.step = 4; draw(true); return; }
            if (j && j.error === "taken") { S.msg = T.taken; S.step = 2; S.slot = null; draw(true); loadSlots(); return; }
            S.msg = T.fail; draw();
          })
          .catch(() => { S.msg = T.fail; draw(); });
      }
    });

    draw();
  }

  window.Booking = { mount };
})();
