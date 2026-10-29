/* ============================================================
   Laura Magrin — portfolio content (EN + PT)
   Every text has an "en" and a "pt" version.
   Media paths are relative to the site root (assets/img/..., assets/video/...).
   YouTube items use the video id only.
   ============================================================ */

const IMG = (p) => `assets/img/${p}`;
const pages = (dir, n) => Array.from({ length: n }, (_, i) => `assets/doc/${dir}/${String(i + 1).padStart(2, "0")}.jpg`);
const VID = (name) => ({ src: `assets/video/${name}.mp4`, poster: `assets/video/${name}.jpg` });
const range = (dir, n, prefix = "") =>
  Array.from({ length: n }, (_, i) => IMG(`${dir}/${prefix}${String(i + 1).padStart(2, "0")}.jpg`));

window.CONTENT = {
  email: "lauramagrin@hotmail.com",
  linkedin: "https://www.linkedin.com/in/laura-magrin/",
  cv: { en: "cv/Laura-Magrin-Resume-EN.pdf", pt: "cv/Laura-Magrin-Curriculo-PT.pdf" },

  ui: {
    navWork: { en: "Work", pt: "Projetos" },
    navEvents: { en: "Events", pt: "Eventos" },
    navAbout: { en: "About", pt: "Sobre" },
    navContact: { en: "Contact", pt: "Contato" },
    eyebrow: { en: "Freelance · Brand, events & growth", pt: "Freela · Marca, eventos e growth" },
    role: { en: "Head of Marketing & Design", pt: "Head de Marketing e Design" },
    thesis: {
      en: "I build brands, campaigns and B2B events for the energy transition, from the first sketch of an identity to the LED wall on show day.",
      pt: "Construo marcas, campanhas e eventos B2B para a transição energética, do primeiro esboço de uma identidade ao painel de LED no dia do evento."
    },
    based: { en: "Based in Brazil (GMT−3) · working remotely worldwide · EN / PT", pt: "No Brasil (GMT−3) · trabalho remoto para qualquer país · EN / PT" },
    ctaWork: { en: "See selected work", pt: "Ver projetos" },
    ctaCv: { en: "Download résumé", pt: "Baixar currículo" },
    ctaContact: { en: "Start a project", pt: "Começar um projeto" },
    moreWork: { en: "More work", pt: "Mais projetos" },
    atAGlance: { en: "At a glance", pt: "Em números" },
    saidTitle: { en: "What attendees said", pt: "O que disseram os participantes" },
    recsTitle: { en: "Kind words", pt: "Recomendações" },
    recsIntro: { en: "From people I've worked with, via LinkedIn.", pt: "De quem trabalhou comigo, via LinkedIn." },
    pressTitle: { en: "Studies and events I've launched, in the press", pt: "Estudos e eventos que lancei, na imprensa" },
    caseCta: { en: "Have a project like this in mind?", pt: "Tem um projeto assim em mente?" },
    caseCtaBtn: { en: "Let's talk", pt: "Vamos conversar" },
    prev: { en: "Previous", pt: "Anterior" },
    nextImg: { en: "Next", pt: "Próxima" },
    translated: { en: "Translated from Portuguese.", pt: "" },
    pressIntro: { en: "Coverage of the Greener events I marketed and the studies I launched. Headlines in Portuguese.", pt: "Cobertura dos eventos da Greener que divulguei e dos estudos que lancei." },
    pressAlso: { en: "Also covered by", pt: "Também em" },
    kindEvent: { en: "Event", pt: "Evento" },
    kindStudy: { en: "Study", pt: "Estudo" },
    compareTitle: { en: "The rebrand", pt: "O rebranding" },
    compareIntro: { en: "The event before I joined, and the identity I created in 2022.", pt: "O evento antes da minha entrada, e a identidade que criei em 2022." },
    meCaption: { en: "At Greener Summit 2026, São Paulo", pt: "No Greener Summit 2026, em São Paulo" },
    numbersTitle: { en: "Since 2021, at Greener", pt: "Desde 2021, na Greener" },
    workTitle: { en: "Selected work", pt: "Projetos selecionados" },
    workIntro: {
      en: "Corporate events, brand systems, editorial design, growth, data and a few illustrated projects of my own.",
      pt: "Eventos corporativos, sistemas de marca, design editorial, growth, dados e alguns projetos ilustrados autorais."
    },
    all: { en: "All", pt: "Todos" },
    reelTitle: { en: "On screen", pt: "Em tela" },
    reelIntro: {
      en: "Event recaps and Greener's live streams. Previews play muted; open any video to watch it with sound.",
      pt: "Recaps de eventos e transmissões ao vivo da Greener. As prévias rodam sem som; abra qualquer vídeo para assistir com áudio."
    },
    reelFeatured: { en: "Greener Summit 2026 · best moments", pt: "Greener Summit 2026 · melhores momentos" },
    eventsTitle: { en: "Every Greener event since 2021", pt: "Todos os eventos da Greener desde 2021" },
    eventsIntro: {
      en: "I have worked on every Greener event since I joined the company: identity, campaigns, print, screens and the day itself.",
      pt: "Atuei em todos os eventos da Greener desde que entrei na empresa: identidade, campanhas, impressos, telas e o próprio dia do evento."
    },
    strengthsTitle: { en: "How I can help", pt: "Como posso ajudar" },
    aboutTitle: { en: "About", pt: "Sobre" },
    pathTitle: { en: "Experience", pt: "Trajetória" },
    eduTitle: { en: "Education & courses", pt: "Formação e cursos" },
    toolsTitle: { en: "Tools", pt: "Ferramentas" },
    contactTitle: { en: "Let's talk", pt: "Vamos conversar" },
    contactIntro: {
      en: "Available for freelance projects worldwide: brand identities, event communication, campaigns, landing pages and illustration. Tell me about your project and it opens in your email app, ready to send.",
      pt: "Disponível para freelas no Brasil e no exterior: identidades visuais, comunicação de eventos, campanhas, landing pages e ilustração. Conte sobre o seu projeto e a mensagem abre no seu app de e-mail, pronta para enviar."
    },
    fName: { en: "Your name", pt: "Seu nome" },
    fEmail: { en: "Your email", pt: "Seu e-mail" },
    fSubject: { en: "Project type", pt: "Tipo de projeto" },
    fMessage: { en: "Message", pt: "Mensagem" },
    fSend: { en: "Write email", pt: "Escrever e-mail" },
    fNote: {
      en: "Opens your email app with the message filled in. You can also write directly to",
      pt: "Abre seu app de e-mail com a mensagem preenchida. Você também pode escrever direto para"
    },
    copy: { en: "Copy email", pt: "Copiar e-mail" },
    copied: { en: "Copied", pt: "Copiado" },
    back: { en: "All work", pt: "Todos os projetos" },
    year: { en: "Year", pt: "Ano" },
    client: { en: "Client", pt: "Cliente" },
    myRole: { en: "Role", pt: "Função" },
    place: { en: "Where", pt: "Local" },
    deliverables: { en: "What I did", pt: "O que fiz" },
    galleryHint: { en: "Swipe, use the arrows or click a photo to enlarge", pt: "Arraste, use as setas ou clique numa foto para ampliar" },
    teamTitle: { en: "Team credits", pt: "Créditos do time" },
    teamCopy: { en: "Copy", pt: "Copy" },
    teamDesign: { en: "Design", pt: "Design" },
    teamDev: { en: "Build", pt: "Desenvolvimento" },
    teamMgmt: { en: "Management", pt: "Gestão" },
    teamUi: { en: "UI/UX", pt: "UI/UX" },
    teamFront: { en: "Front-end", pt: "Front-end" },
    teamBack: { en: "Back-end", pt: "Back-end" },
    teamCore: { en: "Core team", pt: "Núcleo do evento" },
    teamMe: { en: "Me", pt: "Eu" },
    teamNote: { en: "Planning, strategy and marketing are mine. I review the copy and direct the design; until mid-2023 I designed everything myself, and since 2024 my focus is direction and management.", pt: "Planejamento, estratégia e marketing são meus. Reviso a copy e dirijo o design; até meados de 2023 eu desenhava tudo sozinha, e desde 2024 meu foco é direção e gestão." },
    watch: { en: "Watch", pt: "Assista" },
    watchYt: { en: "Watch on YouTube", pt: "Assistir no YouTube" },
    watchRecap: { en: "Watch the recap", pt: "Assistir ao recap" },
    close: { en: "Close", pt: "Fechar" },
    soundOn: { en: "Sound on", pt: "Ativar som" },
    soundOff: { en: "Mute", pt: "Silenciar" },
    previewNote: {
      en: "YouTube can't play inside this Claude preview. On the published site the video plays right here, in this window.",
      pt: "O YouTube não roda dentro desta prévia do Claude. No site publicado, o vídeo toca aqui mesmo, nesta janela."
    },
    visit: { en: "Visit", pt: "Acessar" },
    next: { en: "Next project", pt: "Próximo projeto" },
    imgSoon: { en: "Images coming soon", pt: "Imagens em breve" },
    docRead: { en: "Read full screen", pt: "Ler em tela cheia" },
    demosTitle: { en: "Tools I built for the team", pt: "Ferramentas que criei para o time" },
    demosIntro: { en: "Simplified, clickable versions of the calendar and dashboards the team uses every week. Open one to try it.", pt: "Versões resumidas e clicáveis do calendário e dos dashboards que o time usa toda semana. Abra um para testar." },
    demoOpen: { en: "Open interactive demo", pt: "Abrir demo interativa" },
    demosNote: { en: "All numbers, posts and names in these demos are fictional. The real tools run on live data from Google Sheets, RD Station, PostHog and the social platforms.", pt: "Todos os números, posts e nomes destas demos são fictícios. As ferramentas reais rodam com dados ao vivo do Google Sheets, RD Station, PostHog e das redes sociais." },
    docPdf: { en: "Open the PDF", pt: "Abrir o PDF" },
    footer: { en: "Designed and written by Laura Magrin.", pt: "Design e textos por Laura Magrin." }
  },

  /* Public numbers only. Internal Greener figures stay in the résumé. */
  numbers: [
    { value: "19+", label: { en: "in-person events led, from 50-guest meetups to 2-day summits", pt: "eventos presenciais liderados, de encontros para 50 pessoas a summits de 2 dias" } },
    { value: "6", label: { en: "editions of Greener Summit, 2022 to 2027 (2027 in production)", pt: "edições do Greener Summit, de 2022 a 2027 (2027 em produção)" } },
    { value: "200+", label: { en: "participants and 130+ companies at Greener Summit 2026", pt: "participantes e 130+ empresas no Greener Summit 2026" } },
    { value: "68K+", label: { en: "YouTube views on webinars I coordinated", pt: "visualizações no YouTube em webinars que coordenei" } },
    { value: "4×", label: { en: "Instagram growth, from 3K to 13K+ followers", pt: "crescimento do Instagram, de 3 mil para mais de 13 mil seguidores" } },
    { value: "6×", label: { en: "LinkedIn growth, from 2K to 12.5K followers", pt: "crescimento do LinkedIn, de 2 mil para 12,5 mil seguidores" } }
  ],

  marquee: [
    { en: "Branding", pt: "Branding" },
    { en: "Visual identity", pt: "Identidade visual" },
    { en: "B2B events", pt: "Eventos B2B" },
    { en: "Art direction", pt: "Direção de arte" },
    { en: "Growth marketing", pt: "Growth marketing" },
    { en: "CRM & automation", pt: "CRM e automação" },
    { en: "Landing pages", pt: "Landing pages" },
    { en: "Vibe coding", pt: "Vibe coding" },
    { en: "Data & reports", pt: "Dados e relatórios" },
    { en: "Webinars & live streams", pt: "Webinars e transmissões" },
    { en: "Team leadership", pt: "Liderança de equipe" },
    { en: "AI workflows", pt: "Fluxos com IA" },
    { en: "Motion design", pt: "Motion design" },
    { en: "Illustration", pt: "Ilustração" }
  ],

  /* Home reel: muted loops from the projects */
  reel: [
    { video: VID("summit26-v"), label: "Greener Summit 2026", slug: "greener-summit" },
    { video: VID("imersao-after"), label: { en: "Imersão Greener · BESS C&I", pt: "Imersão Greener · BESS C&I" }, slug: "imersao-greener" },
    { video: VID("meet-room"), label: "Meet & Greener 2025", slug: "meet-and-greener" },
    { video: VID("cafe-venue"), label: "Café com Investidores 2025", slug: "cafe-com-investidores" }
  ],
  featuredVideo: { yt: "p5ZJMkFfRpU", poster: IMG("summit/26-01.jpg") },
  heroVideo: VID("summit26-hero"),
  streams: [
    { yt: "zaRGiSa84HU", title: "Greener Summit 2025 · Recap" },
    { yt: "oQ2PjdCs2-M", title: { en: "Energy Storage Study 2027 · launch webinar", pt: "Estudo de Armazenamento 2027 · webinar de lançamento" } },
    { yt: "b4lv76Pr2wA", title: "Conexão BESS · BESS C&I" },
    { yt: "ZPSMLc0WsVQ", title: { en: "SED Study 2026 · launch", pt: "Estudo SED 2026 · lançamento" } },
    { yt: "IVrB39fNLKI", title: { en: "Imersão GD 2023 · how it went", pt: "Imersão GD 2023 · como foi" } },
    { yt: "23wRtVVE5Os", title: { en: "Café com Investidores 2023 · how it went", pt: "Café com Investidores 2023 · como foi" } }
  ],

  /* Events timeline (public information) */
  events: [
    { year: "2027", items: [
      { name: "Greener Summit 2027", note: { en: "9th edition · Sep 21–22 · in production, early-bird campaign live", pt: "9ª edição · 21 e 22/set · em produção, campanha de early bird no ar" }, slug: "greener-summit" }
    ]},
    { year: "2026", items: [
      { name: "Greener Summit 2026", note: { en: "8th edition · \"The New Energy Economy\" · Jul 21–22 · AMCHAM São Paulo · 200+ participants, 40+ speakers", pt: "8ª edição · \"A Nova Economia da Energia\" · 21 e 22/jul · AMCHAM São Paulo · 200+ participantes, 40+ palestrantes" }, slug: "greener-summit" },
      { name: "Imersão Greener", note: { en: "LRCAP Batteries (Sep 14–15) and BESS C&I Financial Modelling (Oct 19–20) · small, exclusive classes", pt: "LRCAP Baterias (14 e 15/set) e Modelagem Financeira BESS C&I (19 e 20/out) · turmas reduzidas e exclusivas" }, slug: "imersao-greener" },
      { name: "Conexão BESS", note: { en: "Monthly live webinar series on energy storage, from April", pt: "Série mensal de webinars ao vivo sobre armazenamento, desde abril" }, slug: "webinars" },
      { name: { en: "Study launches", pt: "Lançamentos de estudos" }, note: { en: "SED 2026 and Energy Storage 2027 launch webinars", pt: "Webinars de lançamento do SED 2026 e do Armazenamento 2027" }, slug: "greener-studies" }
    ]},
    { year: "2025", items: [
      { name: "Greener Summit 2025", note: { en: "Jun 24–25 · AMCHAM São Paulo", pt: "24 e 25/jun · AMCHAM São Paulo" }, slug: "greener-summit" },
      { name: "Meet & Greener", note: { en: "Five editions in the year · WTC Skybridge · ~50 guests each", pt: "Cinco edições no ano · WTC Skybridge · ~50 convidados cada" }, slug: "meet-and-greener" },
      { name: "Café com Investidores 2025", note: { en: "Apr 23 · 4th edition · launch of the centralized generation study", pt: "23/abr · 4ª edição · lançamento do estudo de geração centralizada" }, slug: "cafe-com-investidores" },
      { name: { en: "Energy Storage 2025 launch", pt: "Lançamento Armazenamento 2025" }, note: { en: "February · launch event for Greener's storage study", pt: "Fevereiro · evento de lançamento do estudo de armazenamento" }, slug: "armazenamento-2025" }
    ]},
    { year: "2024", items: [
      { name: "Greener Summit 2024", note: { en: "6th edition · May · AMCHAM São Paulo", pt: "6ª edição · maio · AMCHAM São Paulo" }, slug: "greener-summit" },
      { name: "Imersão GD 2024", note: { en: "Aug 26 · AMCHAM São Paulo · in person and online", pt: "26/ago · AMCHAM São Paulo · presencial e online" }, slug: "imersao-gd" },
      { name: "Café com Investidores 2024", note: { en: "3rd edition · centralized generation study", pt: "3ª edição · estudo de geração centralizada" }, slug: "cafe-com-investidores" }
    ]},
    { year: "2023", items: [
      { name: "Greener Summit 2023", note: { en: "May 16–17 · AMCHAM São Paulo", pt: "16 e 17/mai · AMCHAM São Paulo" }, slug: "greener-summit" },
      { name: "Imersão GD 2023", note: { en: "September · brand and live support on site", pt: "Setembro · marca e suporte em tempo real no local" }, slug: "imersao-gd" },
      { name: "Café com Investidores 2023", note: { en: "2nd edition · centralized generation study", pt: "2ª edição · estudo de geração centralizada" }, slug: "cafe-com-investidores" }
    ]},
    { year: "2022", items: [
      { name: "Greener Business Summit 2022", note: { en: "Jul 5–7 · AMCHAM São Paulo · rebrand of the event identity", pt: "5 a 7/jul · AMCHAM São Paulo · rebranding da identidade do evento" }, slug: "greener-summit" },
      { name: "Café com Investidores 2022", note: { en: "1st edition · launch of the centralized generation study", pt: "1ª edição · lançamento do estudo de geração centralizada" }, slug: "cafe-com-investidores" }
    ]},
    { year: "2021", items: [
      { name: { en: "Webinars & studies", pt: "Webinars e estudos" }, note: { en: "Joined Greener in May: creatives for webinars, study launches and social", pt: "Entrada na Greener em maio: criativos para webinars, lançamentos de estudos e redes" }, slug: "webinars" }
    ]}
  ],

  /* LinkedIn recommendations (excerpts) */
  recommendations: [
    { name: "Larissa Maria", role: { en: "Marketing Analyst · reported directly to Laura", pt: "Analista de Marketing · respondia diretamente à Laura" },
      text: { en: "Her human approach and way of leading create an environment that stimulates the growth of the whole team. She shares knowledge generously and runs an organized, efficient and transparent management.",
              pt: "Seu olhar humanizado e sua forma de liderar criam um ambiente que estimula o crescimento de toda a equipe. Compartilha conhecimento com generosidade e preza por uma gestão organizada, eficiente e transparente." } },
    { name: "Heloísa Burin", role: { en: "PhD in Production Engineering · worked with Laura at Greener", pt: "Doutora em Engenharia de Produção · trabalhou com Laura na Greener" },
      text: { en: "Very creative and proactive. I especially highlight her ability to track indicators, analyze results and look for strategies that improve the performance of our actions and studies.",
              pt: "Muito criativa e proativa. Destaco especialmente sua capacidade de acompanhar indicadores, analisar resultados e buscar estratégias que contribuam para a performance das ações e dos estudos." } },
    { name: "Moisés Alves", role: { en: "New Products & Regulation Specialist, Matrix Energia", pt: "Especialista de Novos Produtos e Regulação, Matrix Energia" },
      text: { en: "A present leader who makes sure every delivery has quality. She innovates without giving up excellence, and combines technique and creativity across a wide range of visual work.",
              pt: "Uma líder presente, que cuida para que cada entrega tenha qualidade. Busca inovar sem abrir mão da excelência e une técnica e criatividade em uma ampla gama de entregas visuais." } },
    { name: "Daniella Souza", role: { en: "Financial & Administrative Analyst, Greener", pt: "Analista Financeiro / Administrativo, Greener" },
      text: { en: "She turns ideas into high-quality designs efficiently, with organization and attention to detail, and creates strategies that generate engagement and connection with the audience.",
              pt: "Transforma ideias em designs de alta qualidade com eficiência, com organização e atenção aos detalhes, e cria estratégias que geram engajamento e conexão com o público." } },
    { name: "Mateus Pinheiro", role: { en: "Regulation Specialist, ABIAPE", pt: "Especialista em Regulação, ABIAPE" },
      text: { en: "Extremely dedicated, committed and, above all, creative. With active listening and strong task management, she was an excellent leader during the time we worked together.",
              pt: "Extremamente dedicada, comprometida e, acima de tudo, criativa. Com escuta ativa e boa capacidade de gestão de tarefas, foi uma excelente líder no período em que atuamos juntos." } }
  ],

  /* Press coverage of Greener events and studies Laura markets (headlines kept in Portuguese) */
  press: [
    { outlet: "pv magazine Brasil", date: "2026-09", kind: "study", title: "Sistemas fotovoltaicos ficam até 7% mais caros no 1º semestre de 2026, aponta Greener", url: "https://www.pv-magazine-brasil.com/2026/09/25/sistemas-fotovoltaicos-ficam-ate-7-mais-caros-no-1o-semestre-de-2026-aponta-greener/" },
    { outlet: "CNN Brasil", date: "2026", kind: "study", title: "Demanda por equipamentos solares cai quase pela metade no 1º semestre", url: "https://www.cnnbrasil.com.br/infra/demanda-por-equipamentos-solares-cai-quase-pela-metade-no-1o-semestre/" },
    { outlet: "Portal Solar", date: "2026-03", kind: "study", title: "Preço da energia solar tem queda de 9% para o consumidor final em 2025", url: "https://www.portalsolar.com.br/noticias/mercado/geracao-distribuida/preco-da-energia-solar-tem-queda-de-9-para-o-consumidor-final-em-2025" },
    { outlet: "pv magazine Brasil", date: "2026-03", kind: "study", title: "Greener: sistemas de até 12 kWp concentram 69% da GD no Brasil", url: "https://www.pv-magazine-brasil.com/2026/03/27/greener-sistemas-de-ate-12-kwp-concentram-69-da-gd-no-brasil/" },
    { outlet: "Portal Solar", date: "2025-10", kind: "event", title: "Aconteceu ontem a 4ª edição do Meet & Greener", url: "https://www.portalsolar.com.br/noticias/mercado/geracao-distribuida/aconteceu-ontem-a-4a-edicao-do-meet-greener" },
    { outlet: "Canal Solar", date: "2025-04", kind: "event", title: "Greener Summit 2025 discutirá tendências para a transição energética", url: "https://canalsolar.com.br/greener-summit-2025-transicao-energetica/" },
    { outlet: "Canal Solar", date: "2025-04", kind: "event", title: "Café com Investidores reúne investidores e lideranças do setor", url: "https://canalsolar.com.br/cafe-investidores-greener-investidores-liderancas/" },
    { outlet: "Folha de S.Paulo", date: "2025-04", kind: "study", title: "Setor solar tem alta de 25% em fusões e aquisições no primeiro trimestre", url: "https://www1.folha.uol.com.br/mercado/2025/04/setor-solar-tem-alta-de-25-em-fusoes-e-aquisicoes-no-primeiro-trimestre-com-foco-em-autoproducao.shtml" },
    { outlet: "Forbes Brasil", date: "2025-01", kind: "study", title: "Fusões e aquisições em energia solar crescem 76% em 2024, aponta Greener", url: "https://forbes.com.br/forbes-money/2025/01/fusoes-e-aquisicoes-em-energia-solar-crescem-76-em-2024-em-meio-a-consolidacao-aponta-greener/" },
    { outlet: "Canal Solar", date: "2024-08", kind: "event", title: "Imersão GD reunirá especialistas e integradores", url: "https://canalsolar.com.br/imersao-gd-reunira-especialistas-integradores/" }
  ],
  pressAlso: ["Valor Econômico", "Exame", "MegaWhat", "Agência Eixos", "Canal Energia", "Brasil Energia", "Cenário Energia", "Money Report", "Energy Channel", "BNamericas"],

  categories: {
    events: { en: "Events", pt: "Eventos" },
    brand: { en: "Brand & Growth", pt: "Marca e Growth" },
    editorial: { en: "Editorial & Web", pt: "Editorial e Web" },
    illustration: { en: "Illustration", pt: "Ilustração" },
    motion: { en: "Design & Motion", pt: "Design e Motion" }
  },

  projects: [
    {
      slug: "greener-summit",
      team: {
        core: [{ name: "Marco Conte", note: { en: "Project Owner, 2023–25", pt: "Project Owner, 2023–25" } }, { name: "Silvana Silvestre", note: { en: "sales & relationships", pt: "comercial e relacionamento" } }, { name: "Mateus Pinheiro", note: { en: "content, 2022–25", pt: "conteúdo, 2022–25" } }, { me: true, note: { en: "marketing & design", pt: "marketing e design" } }],
        copy: [{ name: "Mateus Pinheiro", years: "2022–25" }, { name: "Larissa Maria", years: "2025–26" }],
        design: [{ me: true, years: "2022–23" }, { name: "Renan Corazza", years: "2023–26" }, { name: "Arthur Laprano", years: "2023–25" }, { name: "Viviane Custódio", years: "2026" }]
      },
      feature: { src: IMG("system/17.jpg"),
        caption: { en: "One of the \"four pillars\" of Greener Summit: Marco Conte, the event's Project Owner from 2023 to 2025, had plaques made for himself, me, Mateus Pinheiro and Silvana Silvestre, the four of us who made most editions happen side by side.",
                   pt: "Um dos \"quatro pilares\" do Greener Summit: Marco Conte, Project Owner do evento de 2023 a 2025, fez placas para si, para mim, para Mateus Pinheiro e para Silvana Silvestre, os quatro que fizeram a maioria das edições acontecer lado a lado." } },
      cat: "events",
      title: { en: "Greener Summit", pt: "Greener Summit" },
      kicker: { en: "Six editions, one identity", pt: "Seis edições, uma identidade" },
      year: "2022 — 2027",
      client: "Greener",
      role: { en: "Head of Marketing & Design", pt: "Head de Marketing e Design" },
      place: "AMCHAM · São Paulo",
      link: "https://www.greenersummit.com.br",
      cover: IMG("summit/26-01.jpg"),
      stats: [
        { value: "6", label: { en: "editions led, 2022–2027 (2027 in production)", pt: "edições lideradas, 2022–2027 (2027 em produção)" } },
        { value: "200+", label: { en: "participants in 2026", pt: "participantes em 2026" } },
        { value: "130+", label: { en: "companies in 2026", pt: "empresas em 2026" } },
        { value: "40+", label: { en: "speakers, 12+ hours of content", pt: "palestrantes, 12+ horas de conteúdo" } },
        { value: "240K+", label: { en: "email views in the 2026 campaign, 31% open rate", pt: "visualizações de e-mail na campanha 2026, 31% de abertura" } }
      ],
      quotes: [
        { text: { en: "The decision-makers of the biggest companies in the sector are here.", pt: "Os tomadores de decisão das maiores empresas do setor estão presentes." }, name: "André Mendonça", org: "Bulbe Energia" },
        { text: { en: "Relevant topics and a very honest, open environment for debate.", pt: "Pautas relevantes e um ambiente de debate muito honesto e aberto." }, name: "Sumara Ticom", org: "ONS" },
        { text: { en: "Rich, deep and provocative content that can change our strategy.", pt: "Conteúdo rico, profundo e provocativo, que pode mudar a nossa estratégia." }, name: "Vitor Duarte", org: "Suno Asset" }
      ],
      summary: {
        en: "Brazil's leading C-level meeting of the energy sector. I redesigned its identity in 2022 and have led its marketing and art direction in every edition since.",
        pt: "O principal encontro C-level do setor de energia no Brasil. Redesenhei sua identidade em 2022 e lidero o marketing e a direção de arte em todas as edições desde então."
      },
      body: {
        en: [
          "Greener Summit gathers the decision-makers of the energy transition for two days of strategic content, networking and deal-making; the 2026 edition brought together 200+ participants from 130+ companies and 40+ speakers. I joined its construction in 2022, when it was still the Greener Business Summit. Greener's whole brand had just evolved, and the event had to reflect it: logo, colours and concept all changed, in an identity that is still its visual reference today.",
          "In 2024, the sixth edition, I worked as one of the project's heads: art direction, the event identity, print production, on-site wayfinding rules, institutional communication and the marketing strategy for promotion and stakeholder engagement, while sitting on the execution committee.",
          "In 2025 I led communication planning and positioning, and the design team's execution from backdrops and signage to motion content for the LED panels. In 2026 the eighth edition took the theme \"The New Energy Economy\", and I added the event's operational layer: the technical runsheet for the audio, video and screen crew, the photography coverage plan and brand exposure reports for sponsors. The 2026 campaign ran 80+ email sends with 240K+ views and a 31% open rate, plus real-time coverage with facial-recognition photo delivery to attendees; on Instagram, 37 Summit posts reached 26K+ views at a 5% engagement rate."
        ],
        pt: [
          "O Greener Summit reúne os tomadores de decisão da transição energética em dois dias de conteúdo estratégico, networking e geração de negócios; a edição de 2026 reuniu mais de 200 participantes de mais de 130 empresas e mais de 40 palestrantes. Entrei na construção do evento em 2022, quando ainda se chamava Greener Business Summit. A marca da Greener tinha acabado de evoluir como um todo, e o evento precisava refletir isso: logo, cores e conceito mudaram, numa identidade que segue como referência visual até hoje.",
          "Em 2024, na sexta edição, atuei como uma das heads do projeto: direção de arte, identidade do evento, produção gráfica, regras de wayfinding no local, comunicação institucional e a estratégia de marketing para divulgação e engajamento de stakeholders, participando do comitê de execução.",
          "Em 2025 liderei o planejamento de comunicação e posicionamento e a execução do time de design, dos backdrops e sinalizações ao motion exibido nos painéis de LED. Em 2026 a oitava edição teve o tema \"A Nova Economia da Energia\", e somei a camada operacional do evento: o roteiro técnico para as equipes de áudio, vídeo e telão, o plano de cobertura fotográfica e os relatórios de exposição de marca para patrocinadores. A campanha de 2026 somou mais de 80 disparos de e-mail, mais de 240 mil visualizações e 31% de taxa de abertura, além da cobertura em tempo real com entrega de fotos por reconhecimento facial; no Instagram, 37 posts do Summit somaram mais de 26 mil visualizações, com 5% de engajamento."
        ]
      },
      deliverables: {
        en: ["Event identity & 2022 rebrand", "Art direction", "Wayfinding & signage", "LED motion content", "Multichannel campaigns", "Technical runsheet", "Sponsor exposure reports"],
        pt: ["Identidade e rebranding 2022", "Direção de arte", "Wayfinding e sinalização", "Motion para painéis de LED", "Campanhas multicanal", "Roteiro técnico", "Relatórios para patrocinadores"]
      },
      videos: [
        { yt: "p5ZJMkFfRpU", title: { en: "2026 · best moments", pt: "2026 · melhores momentos" } },
        { yt: "zaRGiSa84HU", title: "2025 · Recap" },
        { yt: "TWWo_rNNwSg", title: { en: "2024 · the experience", pt: "2024 · a experiência" } },
        { yt: "s0Ip5U-_2AM", title: "2023" },
        { yt: "nw_ZGelDNkA", title: { en: "2022 · how it went", pt: "2022 · como foi" } },
        { yt: "6eTg501zlFY", title: "Summit Talks · FoxESS" }
      ],
      compare: {
        before: { label: { en: "Before · 2018–2019 identity", pt: "Antes · identidade de 2018–2019" }, images: [IMG("summit/19-01.jpg"), IMG("summit/18-01.jpg"), IMG("summit/19-02.jpg"), IMG("summit/18-02.jpg")] },
        after: { label: { en: "After · 2022 rebrand, still the base today", pt: "Depois · rebranding de 2022, base até hoje" }, images: [IMG("summit/22-01.jpg"), IMG("summit/26-01.jpg"), IMG("summit/25-01.jpg"), IMG("summit/24-01.jpg")] }
      },
      images: [...range("summit", 9, "26-"), ...range("summit", 10, "25-"), IMG("system/15.jpg"), ...range("summit", 10, "24-"), IMG("summit/23-02.jpg"), IMG("summit/23-03.jpg"), IMG("summit/23-04.jpg"), IMG("summit/23-05.jpg"), IMG("summit/23-06.jpg"), IMG("summit/23-07.jpg"), ...range("summit", 5, "22-")],
      sets: [
        { title: { en: "Identity system · 2025–2026", pt: "Sistema de identidade · 2025–2026" },
          note: { en: "How the identity lands on site in the two latest editions: welcome backdrops, badges by attendee type, totems along the venue, sponsor screens and the 2025 stage and backdrop.", pt: "Como a identidade aparece no evento nas duas últimas edições: backdrops de boas-vindas, crachás por tipo de participante, totens pelo espaço, telas de patrocinadores e o palco e o backdrop de 2025." },
          images: [IMG("system/id26-01.jpg"), IMG("system/id26-02.jpg"), IMG("system/id26-03.jpg"), IMG("system/id26-07.jpg"), IMG("system/id26-04.jpg"), IMG("system/id26-05.jpg"), IMG("system/id26-06.jpg"), IMG("system/id26-08.jpg"), IMG("system/05.jpg"), IMG("system/06.jpg")] },
        { title: { en: "2026 campaign", pt: "Campanha 2026" },
          note: { en: "\"The New Energy Economy\": key visual, speaker announcements, a hands-on workshop and the early-bird launch of the 2027 edition.", pt: "\"A Nova Economia da Energia\": key visual, anúncios de speakers, um workshop prático e o early bird da edição 2027." },
          images: [IMG("system/09.jpg"), IMG("system/12.jpg"), IMG("system/10.jpg"), IMG("system/11.jpg"), IMG("system/14.jpg"), IMG("system/13.jpg")] }
      ],
      docs: [
        { title: { en: "2026 overview", pt: "Overview 2026" },
          note: { en: "The full post-event deck for sponsors: audience, programme, reach and results, and how each sponsor's brand showed up on site.", pt: "O material pós-evento completo para patrocinadores: público, programação, alcance e resultados, e como a marca de cada patrocinador apareceu no evento." },
          pdf: "docs/Greener-Summit-2026-Overview.pdf", size: "5.5 MB", pages: pages("summit26", 42) },
        { title: { en: "2025 overview", pt: "Overview 2025" },
          note: { en: "The public overview of the 2025 edition, \"From Solar to the Future\".", pt: "O overview público da edição 2025, \"Do Solar para o Futuro\"." },
          pdf: "docs/Greener-Summit-2025-Overview.pdf", size: "2.6 MB", pages: pages("summit25", 26) }
      ]
    },
    {
      slug: "cafe-com-investidores",
      team: { copy: [{ name: "Mateus Pinheiro", years: "2022–25" }, { name: "Larissa Maria", years: "2025–26" }], design: [{ me: true, years: "2023" }, { name: "Renan Corazza", years: "2023–26" }, { name: "Arthur Laprano", years: "2023–25" }] },
      cat: "events",
      title: { en: "Café com Investidores", pt: "Café com Investidores" },
      kicker: { en: "Four editions launching Greener's centralized generation study", pt: "Quatro edições lançando o estudo de geração centralizada da Greener" },
      year: "2022 — 2025",
      client: "Greener",
      role: { en: "Marketing & Design lead", pt: "Líder de Marketing e Design" },
      place: "Praça São Lourenço · São Paulo",
      cover: VID("cafe-venue"),
      stats: [
        { value: "4", label: { en: "consecutive editions, 2022–2025", pt: "edições consecutivas, 2022–2025" } },
        { value: "GC", label: { en: "the centralized generation study, launched live", pt: "o estudo de geração centralizada, lançado ao vivo" } },
        { value: "3", label: { en: "channels: social, email and paid media", pt: "canais: redes, e-mail e mídia paga" } }
      ],
      summary: {
        en: "An invitation-only morning meeting where Greener launched its centralized generation study to investors and leaders of the solar market. I led its positioning, identity and communication in all four editions.",
        pt: "Um encontro matinal, só para convidados, em que a Greener lançava seu estudo de geração centralizada para investidores e lideranças do mercado solar. Liderei o posicionamento, a identidade e a comunicação nas quatro edições."
      },
      body: {
        en: [
          "Café com Investidores was the launch event of Greener's strategic study on centralized generation (GC), bringing investors, business owners and executives of Brazil's solar market together by invitation. It ran every year from 2022 to 2025 and I worked on all four editions; it was not held in 2026, when the study was discontinued.",
          "I led the communication strategy and coordinated the visual identity from concept to final print, ran the multichannel communication across social, email and paid media, and worked with the Content, Market Intelligence and Relationship teams on the guest journey, from the invitation to the venue on the day."
        ],
        pt: [
          "O Café com Investidores era o evento de lançamento do estudo estratégico de geração centralizada (GC) da Greener, reunindo por convite investidores, empresários e executivos do mercado solar. Aconteceu todos os anos de 2022 a 2025 e atuei nas quatro edições; não ocorreu em 2026, quando o estudo foi descontinuado.",
          "Liderei a estratégia de comunicação e coordenei a identidade visual do conceito à entrega gráfica, executei a comunicação multicanal (redes, e-mail e mídia paga) e trabalhei com os times de Conteúdo, Inteligência de Mercado e Relacionamento na jornada do convidado, do convite à ambientação no dia."
        ]
      },
      deliverables: {
        en: ["Positioning", "Visual identity", "Social, email & paid media", "Study launch communication", "Guest journey", "Event print & brand items"],
        pt: ["Posicionamento", "Identidade visual", "Redes, e-mail e mídia paga", "Comunicação de lançamento do estudo", "Jornada do convidado", "Impressos e brindes"]
      },
      videos: [{ yt: "23wRtVVE5Os", title: { en: "2023 · how it went", pt: "2023 · como foi" } }],
      loops: [VID("cafe-venue"), VID("cafe-brand")],
      images: [...range("cafe", 11), IMG("cafe/12.jpg"), IMG("cafe/13.jpg"), IMG("cafe/14.jpg"), IMG("cafe/15.jpg")]
    },
    {
      slug: "imersao-greener",
      team: { copy: [{ name: "Larissa Maria" }], design: [{ name: "Viviane Custódio" }] },
      cat: "events",
      title: { en: "Imersão Greener", pt: "Imersão Greener" },
      kicker: { en: "Greener's new education event and its main bet for 2027", pt: "O novo evento de educação da Greener e sua grande aposta para 2027" },
      year: "2026",
      client: "Greener",
      role: { en: "Head of Marketing & Design", pt: "Head de Marketing e Design" },
      place: { en: "Greener HQ · São Paulo", pt: "Sede Greener · São Paulo" },
      link: "https://greener.com.br/imersao-bess-cni",
      cover: IMG("imersao/p01.jpg"),
      stats: [
        { value: "2", label: { en: "editions in 2026: LRCAP Batteries and BESS C&I Financial Modelling", pt: "edições em 2026: LRCAP Baterias e Modelagem Financeira BESS C&I" } },
        { value: "~6", label: { en: "participants per class, an intentionally exclusive format", pt: "participantes por turma, formato propositalmente exclusivo" } },
        { value: "2", label: { en: "days of in-person immersion per edition", pt: "dias de imersão presencial por edição" } }
      ],
      summary: {
        en: "Greener's newest event and its main bet for 2027: two-day, deliberately small and exclusive immersions on battery storage. LRCAP Batteries ran in September and BESS C&I Financial Modelling in October 2026.",
        pt: "O evento mais novo da Greener e sua grande aposta para 2027: imersões presenciais de dois dias, em turmas propositalmente reduzidas e exclusivas, sobre armazenamento em baterias. LRCAP Baterias aconteceu em setembro e Modelagem Financeira BESS C&I em outubro de 2026."
      },
      body: {
        en: [
          "Imersão Greener is an exclusive in-person education format: classes are deliberately small, with seats by application, built for executives who already work with energy storage. In 2026 it ran two editions: LRCAP Batteries (September 14–15) and BESS C&I Financial Modelling (October 19–20), where participants build a real case's financial model in the room and pitch it to a panel.",
          "I built the landing pages for LRCAP Batteries and BESS C&I myself through vibe coding, and a new page that unifies both together with Larissa Maria, also via vibe coding. I created the application forms in RD Station and embedded them in the pages via HTML, and led the communication, the visual identity within Greener's brand and the print collateral for the room, such as editable table badges and the thank-you letter signed by the CEO."
        ],
        pt: [
          "A Imersão Greener é um formato de educação presencial e exclusivo: as turmas são propositalmente reduzidas, com vagas por aplicação, pensadas para executivos que já atuam com armazenamento de energia. Em 2026 teve duas edições: LRCAP Baterias (14 e 15 de setembro) e Modelagem Financeira BESS C&I (19 e 20 de outubro), em que os participantes constroem em sala o modelo financeiro de um case real e o defendem diante de uma banca.",
          "Construí eu mesma as landing pages da LRCAP Baterias e da BESS C&I via vibe coding, e uma nova página que unifica as duas em parceria com a Larissa Maria, também via vibe coding. Criei os formulários de aplicação no RD Station e os apliquei nas páginas via HTML, e liderei a comunicação, a identidade visual dentro da marca Greener e os materiais impressos da sala, como os crachás de mesa editáveis e a carta de agradecimento assinada pelo CEO."
        ]
      },
      deliverables: {
        en: ["Landing pages via vibe coding", "RD Station forms (HTML)", "Communication", "Visual identity", "Social campaign", "Table badges", "Thank-you letter", "NPS survey"],
        pt: ["Landing pages via vibe coding", "Formulários RD Station (HTML)", "Comunicação", "Identidade visual", "Campanha nas redes", "Crachás de mesa", "Carta de agradecimento", "Pesquisa NPS"]
      },
      videos: [{ yt: "PN3edXiu65M", title: { en: "Conexão BESS · special edition", pt: "Conexão BESS · edição especial" } }],
      loops: [VID("imersao-after")],
      images: [IMG("imersao/p01.jpg"), IMG("imersao/p06.jpg"), IMG("imersao/p12.jpg"), IMG("imersao/p05.jpg"), IMG("imersao/01.jpg"), IMG("imersao/02.jpg"), IMG("imersao/03.jpg"), IMG("imersao/04.jpg"), IMG("imersao/05.jpg"), IMG("imersao/06.jpg"), IMG("imersao/08.jpg"), IMG("imersao/07.jpg")]
    },
    {
      slug: "meet-and-greener",
      team: { copy: [{ name: "Larissa Maria" }, { name: "Mateus Pinheiro" }], design: [{ name: "Renan Corazza" }, { name: "Arthur Laprano" }] },
      cat: "events",
      title: { en: "Meet & Greener", pt: "Meet & Greener" },
      kicker: { en: "Five small-format meetings in one year", pt: "Cinco encontros intimistas em um ano" },
      year: "2025",
      client: "Greener",
      role: { en: "Marketing & Design lead", pt: "Líder de Marketing e Design" },
      place: "WTC Skybridge · São Paulo",
      cover: IMG("meet/01.jpg"),
      stats: [
        { value: "5", label: { en: "editions in 2025", pt: "edições em 2025" } },
        { value: "~50", label: { en: "guests per edition", pt: "convidados por edição" } }
      ],
      summary: {
        en: "Intimate meetings for about 50 guests each. The first three built a path to Greener Summit 2025; two more followed on solar asset management and C&I storage.",
        pt: "Encontros para cerca de 50 convidados. Os três primeiros formaram uma trilha rumo ao Greener Summit 2025; depois vieram mais dois, sobre gestão de ativos solares e armazenamento C&I."
      },
      body: {
        en: [
          "Meet & Greener gathered professionals and leaders of the solar market to discuss data, financing, the free energy market, asset management and storage. Each edition needed its own presence while still reading as one series.",
          "I led the Marketing and Design team on the identity and positioning of every edition, built and ran the multichannel promotion, and managed communication with the audience, working with the Content and Relationship teams to keep the journey clear and visually consistent."
        ],
        pt: [
          "O Meet & Greener reuniu profissionais e lideranças do mercado solar para debater dados, financiamento, mercado livre, gestão de ativos e armazenamento. Cada edição precisava de presença própria, mas sendo lida como uma única série.",
          "Liderei o time de Marketing e Design na identidade e no posicionamento de cada edição, criei e gerenciei a divulgação multicanal e a comunicação com o público, junto aos times de Conteúdo e Relacionamento, para manter a jornada clara e visualmente consistente."
        ]
      },
      deliverables: {
        en: ["Series identity", "Positioning", "Multichannel campaigns", "Badges & print", "Audience communication"],
        pt: ["Identidade da série", "Posicionamento", "Campanhas multicanal", "Crachás e impressos", "Comunicação com o público"]
      },
      loops: [VID("meet-room")],
      images: range("meet", 13)
    },
    {
      slug: "imersao-gd",
      team: { copy: [{ name: "Mateus Pinheiro" }], design: [{ name: "Renan Corazza" }, { name: "Arthur Laprano" }] },
      cat: "events",
      title: { en: "Imersão GD", pt: "Imersão GD" },
      kicker: { en: "A day for distributed-generation integrators", pt: "Um dia para integradores de geração distribuída" },
      year: "2023 — 2024",
      client: "Greener",
      role: { en: "Brand & marketing lead", pt: "Líder de marca e marketing" },
      place: "São Paulo",
      cover: IMG("igd/01.jpg"),
      stats: [
        { value: "5,000+", label: { en: "views of the two live broadcasts on YouTube", pt: "visualizações das duas transmissões ao vivo no YouTube" } },
        { value: "3,255", label: { en: "views of the 2023 broadcast, which launched the GD strategic study", pt: "visualizações da transmissão de 2023, que lançou o estudo estratégico de GD" } },
        { value: "1,811", label: { en: "views of the 5.5-hour hybrid broadcast in 2024", pt: "visualizações da transmissão híbrida de 5h30 em 2024" } }
      ],
      summary: {
        en: "Greener's event for distributed-generation integrators. I led its brand and gave live support on site.",
        pt: "O evento da Greener para integradores de geração distribuída. Liderei a marca e dei suporte em tempo real no local."
      },
      body: {
        en: [
          "Imersão GD brought distributed-generation professionals, mainly integrators, together to discuss sales, financing, regulation, prices and new businesses such as batteries and EVs. The 2023 edition, on September 20, launched Greener's GD strategic study for the first half of 2023 with a live broadcast. The 2024 edition took place on August 26 at AMCHAM São Paulo, in person and online.",
          "I led the event's branding, the promotion carousels and campaigns, and worked on site with real-time support for screens and content during the day."
        ],
        pt: [
          "A Imersão GD reuniu profissionais de geração distribuída, principalmente integradores, para debater vendas, financiamento, regulação, preços e novos negócios como baterias e veículos elétricos. A edição de 2023, em 20 de setembro, lançou o Estudo Estratégico de GD do 1º semestre de 2023 com transmissão ao vivo. A de 2024 aconteceu em 26 de agosto, na AMCHAM São Paulo, em formato presencial e online.",
          "Liderei o branding do evento, os carrosséis e as campanhas de divulgação, e atuei no local com suporte em tempo real para telas e conteúdo durante o dia."
        ]
      },
      deliverables: {
        en: ["Event branding", "Promotion carousels", "Campaigns", "Live on-site support"],
        pt: ["Branding do evento", "Carrosséis de divulgação", "Campanhas", "Suporte em tempo real no local"]
      },
      videos: [
        { yt: "IVrB39fNLKI", title: { en: "2023 · how it went", pt: "2023 · como foi" } }
      ],
      images: [
        ...range("igd", 5),
        ...range("igd", 8, "23-"),
        IMG("igd/06.jpg"),
        IMG("igd/07.jpg")
      ]
    },
    {
      slug: "armazenamento-2025",
      team: { copy: [{ name: "Mateus Pinheiro" }, { name: "Larissa Maria" }], design: [{ name: "Renan Corazza" }, { name: "Arthur Laprano" }] },
      cat: "events",
      title: { en: "Energy Storage 2025", pt: "Armazenamento de Energia 2025" },
      kicker: { en: "Launching Greener's storage study", pt: "Lançamento do estudo de armazenamento da Greener" },
      year: "2025",
      client: "Greener",
      role: { en: "Marketing & Design lead", pt: "Líder de Marketing e Design" },
      place: "Praça São Lourenço · São Paulo",
      cover: VID("storage-launch"),
      stats: [
        { value: "1,500", label: { en: "downloads of the study's free sample edition", pt: "downloads da versão amostra do estudo" } }
      ],
      summary: {
        en: "Launch event for Greener's first strategic study on energy storage, bringing together specialists, companies and investors.",
        pt: "Evento de lançamento do primeiro estudo estratégico da Greener sobre armazenamento de energia, reunindo especialistas, empresas e investidores."
      },
      body: {
        en: [
          "The event debated the challenges and opportunities of energy storage in Brazil's energy transition and launched Greener's Energy Storage strategic study, as part of the company's positioning on innovation in the sector.",
          "I was responsible for the art direction, multichannel promotion and marketing strategy, and the digital and print materials for the attendee experience, coordinating internal areas and external partners to keep the brand consistent."
        ],
        pt: [
          "O evento debateu desafios e oportunidades do armazenamento na transição energética brasileira e lançou o Estudo Estratégico de Armazenamento de Energia da Greener, como parte do posicionamento da empresa em inovação no setor.",
          "Fui responsável pela direção de arte, pelas campanhas de divulgação multicanal e pela estratégia de marketing, além dos materiais digitais e impressos da experiência do participante, coordenando áreas internas e parceiros externos para garantir consistência de marca."
        ]
      },
      deliverables: {
        en: ["Art direction", "Launch campaign", "Signage & screens", "Digital & print materials"],
        pt: ["Direção de arte", "Campanha de lançamento", "Sinalização e telas", "Materiais digitais e impressos"]
      },
      loops: [VID("storage-launch")],
      images: range("storage", 7)
    },
    {
      slug: "webinars",
      team: { copy: [{ name: "Mateus Pinheiro", years: "2022–25" }, { name: "Larissa Maria", years: "2025–26" }], design: [{ me: true, years: "2021–23" }, { name: "Renan Corazza", years: "2023–26" }, { name: "Arthur Laprano", years: "2023–25" }, { name: "Viviane Custódio", years: "2026" }] },
      cat: "brand",
      title: { en: "Webinars & live streams", pt: "Webinars e transmissões" },
      kicker: { en: "Live content that feeds the whole funnel", pt: "Conteúdo ao vivo que alimenta todo o funil" },
      year: "2021 — 2026",
      client: "Greener",
      role: { en: "Coordination, design & moderation", pt: "Coordenação, design e moderação" },
      place: "YouTube · LinkedIn Live",
      link: "https://www.youtube.com/@greenerbr",
      cover: IMG("covers/webinars.jpg"),
      stats: [
        { value: "12", label: { en: "live streams in 2026", pt: "transmissões ao vivo em 2026" } },
        { value: "2.7K+", label: { en: "webinar registrations in 2026 (RD Station)", pt: "inscrições em webinars em 2026 (RD Station)" } },
        { value: "240", label: { en: "peak live viewers · Greener & EPE webinar, 2,295 views", pt: "pico ao vivo · webinar Greener e EPE, 2.295 visualizações" } },
        { value: "68K+", label: { en: "YouTube views", pt: "visualizações no YouTube" } },
        { value: "340K+", label: { en: "impressions", pt: "impressões" } },
        { value: "13K+", label: { en: "watch hours", pt: "horas assistidas" } }
      ],
      summary: {
        en: "Study launches, market outlooks and the Conexão BESS series. I coordinate, art-direct and moderate Greener's live streams, which passed 68K views on YouTube.",
        pt: "Lançamentos de estudos, panoramas de mercado e a série Conexão BESS. Coordeno, dirijo o visual e modero as transmissões da Greener, que passaram de 68 mil visualizações no YouTube."
      },
      body: {
        en: [
          "Webinars are how Greener releases its studies and talks to the market every month. I plan the calendar, direct the visual package, set up the landing pages and email invitations, run the stream and moderate the questions.",
          "Since 2022 the visual package has included motion graphics made in After Effects (animated backgrounds, countdowns, lower thirds and \"it's today\" announcements), created by me and by designers on my team, Arthur Laprano and Renan Corazza, under my supervision.",
          "In 2026 the channel ran 12 live streams with 9.8K views and 2,700+ registrations through RD Station forms; the top one, the webinar with EPE, reached 2,295 views and 240 people watching live at its peak. This included Conexão BESS, a monthly series on selling, sizing and pricing battery storage, and the launch webinars for the SED 2026 and Energy Storage 2027 studies. Across the channel, the webinars I coordinated passed 68K views, 340K impressions and 13K watch hours.",
          "I also managed the campaigns for Greener's online Energy Storage course, with copy by Larissa Maria and design by Renan Corazza and Viviane Custódio."
        ],
        pt: [
          "Os webinars são a forma como a Greener lança seus estudos e conversa com o mercado todo mês. Planejo o calendário, dirijo o pacote visual, monto as landing pages e os convites por e-mail, conduzo a transmissão e modero as perguntas.",
          "Desde 2022 o pacote visual inclui motion graphics feitos no After Effects (fundos animados, contagens regressivas, lower thirds e chamadas de \"é hoje\"), criados por mim e pelos designers do meu time Arthur Laprano e Renan Corazza, sob minha supervisão.",
          "Em 2026 o canal teve 12 transmissões ao vivo, com 9,8 mil visualizações e mais de 2.700 inscrições pelos formulários do RD Station; a maior delas, o webinar com a EPE, chegou a 2.295 visualizações e 240 pessoas assistindo ao vivo no pico. Isso incluiu o Conexão BESS, série mensal sobre vender, dimensionar e precificar armazenamento, e os webinars de lançamento dos estudos SED 2026 e Armazenamento 2027. No canal, os webinars que coordenei passaram de 68 mil visualizações, 340 mil impressões e 13 mil horas assistidas.",
          "Também geri as campanhas do Curso de Armazenamento de Energia online da Greener, com copy de Larissa Maria e artes de Renan Corazza e Viviane Custódio."
        ]
      },
      deliverables: {
        en: ["Webinar calendar", "Visual package", "Motion graphics (team supervision)", "Landing pages & invites", "StreamYard production", "Moderation", "Course campaigns"],
        pt: ["Calendário de webinars", "Pacote visual", "Motion graphics (supervisão do time)", "Landing pages e convites", "Produção no StreamYard", "Moderação", "Campanhas do curso"]
      },
      videos: [
        { yt: "oQ2PjdCs2-M", title: { en: "Energy Storage Study 2027 · launch", pt: "Estudo de Armazenamento 2027 · lançamento" } },
        { yt: "ZPSMLc0WsVQ", title: { en: "SED Study 2026", pt: "Estudo SED 2026" } },
        { yt: "b4lv76Pr2wA", title: "Conexão BESS · BESS C&I" },
        { yt: "-na1ZHqoxbE", title: { en: "Conexão BESS · pricing hybrid systems", pt: "Conexão BESS · precificação de híbridos" } },
        { yt: "uw3zsvuqS08", title: { en: "BESS in LRCAP · BNDES financing", pt: "BESS no LRCAP · financiamento BNDES" } },
        { yt: "q0tMOHZZp0s", title: { en: "DG in 2025 · a year of change", pt: "GD em 2025 · um ano de mudanças" } }
      ],
      loops: [{ ...VID("webinar-motion"), wide: true }],
      images: [...range("webinar", 11), IMG("brand/02.jpg"), IMG("brand/07.jpg")]
    },
    {
      slug: "greener-website",
      team: {
        mgmt: [{ me: true }],
        design: [{ name: "Renan Corazza" }, { me: true }, { name: "Viviane Custódio" }],
        ui: [{ name: "Caio Mikael", note: { en: "implementation, 2025", pt: "implementação, 2025" } }],
        front: [{ name: "Lucas Azevedo" }, { me: true, note: { en: "via vibe coding", pt: "via vibe coding" } }],
        back: [{ name: "Samuel Nicolai" }],
        copy: [{ name: "Larissa Maria" }, { name: "Mateus Pinheiro", years: "2025" }]
      },
      cat: "editorial",
      title: { en: "greener.com.br", pt: "greener.com.br" },
      kicker: { en: "One site for an ecosystem of products", pt: "Um site para um ecossistema de produtos" },
      year: "2025 — 2026",
      client: "Greener",
      role: { en: "Head of Marketing & Design", pt: "Head de Marketing e Design" },
      place: "Web",
      link: "https://greener.com.br",
      summary: {
        en: "The company website as a single home for studies, events, courses and articles, with a landing page for every launch, several of them built with AI-assisted coding.",
        pt: "O site institucional como casa única para estudos, eventos, cursos e artigos, com uma landing page para cada lançamento, várias delas construídas com código assistido por IA."
      },
      body: {
        en: [
          "Greener works across three pillars: Market Intelligence, Events and Education. The new website, launched in July 2025, brings them together, from the latest study and open courses to the next immersion, the Summit and the Greener Insights library.",
          "I manage the website project and its visual direction, design layouts with the team and contribute to the front end through vibe coding (I don't hand-write code: I build with AI in Claude Code, alongside Greener's developers), along with the landing pages that support each product and campaign. Recent pages and prototypes, such as event landing pages and a sponsor web app with QR codes and attendee profiling planned for Greener Summit 2027, were built with vibe coding in Claude Code, which shortened the path from layout to a live page."
        ],
        pt: [
          "A Greener atua em três pilares: Inteligência de Mercado, Eventos e Educação. O novo site, lançado em julho de 2025, reúne todos eles, do estudo mais recente e cursos abertos à próxima imersão, ao Summit e à biblioteca Greener Insights.",
          "Faço a gestão do projeto do site e de sua direção visual, desenho layouts com o time e contribuo com o front-end via vibe coding (não programo à mão: construo com IA no Claude Code, ao lado dos desenvolvedores da Greener), além das landing pages que sustentam cada produto e campanha. Páginas e protótipos recentes, como landing pages de eventos e um web app para patrocinadores com QR code e perfilamento de participantes, previsto para o Greener Summit 2027, foram construídos com vibe coding no Claude Code, encurtando o caminho entre o layout e a página no ar."
        ]
      },
      deliverables: {
        en: ["Project management", "Visual direction", "Layouts", "Front-end via vibe coding", "Landing pages", "Vibe coding", "Web app prototype (2027)", "Forms & RD Station integration"],
        pt: ["Gestão do projeto", "Direção visual", "Layouts", "Front-end via vibe coding", "Landing pages", "Vibe coding", "Protótipo de web app (2027)", "Formulários e integração com RD Station"]
      },
      cover: IMG("covers/website.jpg"),
      stats: [
        { value: "140K+", label: { en: "page views since the July 2025 launch (PostHog)", pt: "visualizações de página desde o lançamento, em julho de 2025 (PostHog)" } },
        { value: "62K+", label: { en: "unique visitors since launch", pt: "visitantes únicos desde o lançamento" } },
        { value: "2.3×", label: { en: "monthly visitors, Sep 2026 vs Sep 2025", pt: "visitantes no mês, set/2026 vs set/2025" } }
      ],
      images: [IMG("web/01.jpg"), IMG("web/02.jpg"), IMG("web/03.jpg"), IMG("web/tall-02.jpg"), IMG("web/04.jpg"), IMG("web/05.jpg"), IMG("web/06.jpg"), IMG("web/07.jpg")]
    },
    {
      slug: "greener-studies",
      team: { copy: [{ name: "Mateus Pinheiro", years: "2022–25" }, { name: "Larissa Maria", years: "2025–26" }], design: [{ me: true, years: "2021–23" }, { name: "Renan Corazza", years: "2023–26" }, { name: "Arthur Laprano", years: "2023–25" }, { name: "Viviane Custódio", years: "2026" }] },
      cat: "editorial",
      title: { en: "Greener Studies & Insights", pt: "Estudos e Artigos Greener" },
      kicker: { en: "Market intelligence, designed to be read", pt: "Inteligência de mercado feita para ser lida" },
      year: "2021 — 2026",
      client: "Greener",
      role: { en: "Head of Marketing & Design", pt: "Head de Marketing e Design" },
      place: "Editorial · Web",
      link: "https://greener.com.br/greener-insights",
      cover: IMG("covers/studies.jpg"),
      summary: {
        en: "Editorial design, data visuals and launch campaigns for Greener's studies, from the DG study to the SED Study, the LRCAP Storage Outlook and the Storage Study 2027.",
        pt: "Design editorial, visual de dados e campanhas de lançamento dos estudos da Greener, do estudo de GD ao Estudo SED, ao Outlook LRCAP Armazenamento e ao Estudo de Armazenamento 2027."
      },
      body: {
        en: [
          "Greener's studies are reference reading for the distributed energy, storage and e-mobility markets: the Distributed Generation study, which became the Strategic Study of Distributed Energy Solutions (SED), now also half-yearly; the Energy Storage study, with its 2027 edition launched in 2026; and the LRCAP Storage Outlook 2026, released ahead of Brazil's first battery storage auction.",
          "My work covers the visual language of the studies, the launch campaigns (teasers, articles, landing pages, email and social) and the Greener Insights articles, where I set the editorial standard and data visuals so each piece carries proprietary data in a consistent, readable format."
        ],
        pt: [
          "Os estudos da Greener são leitura de referência para os mercados de geração distribuída, armazenamento e mobilidade elétrica: o estudo de Geração Distribuída, que evoluiu para o Estudo Estratégico de Soluções Energéticas Distribuídas (SED), agora também semestral; o Estudo de Armazenamento, com a edição 2027 lançada em 2026; e o Outlook LRCAP Armazenamento 2026, lançado antes do primeiro leilão de baterias do país.",
          "Meu trabalho abrange a linguagem visual dos estudos, as campanhas de lançamento (teasers, artigos, landing pages, e-mail e redes) e os artigos do Greener Insights, onde defini o padrão editorial e o visual de dados para que cada peça apresente dados proprietários em um formato consistente e legível."
        ]
      },
      deliverables: {
        en: ["Editorial design", "Data visualisation", "Launch campaigns", "Article standard"],
        pt: ["Design editorial", "Visualização de dados", "Campanhas de lançamento", "Padrão dos artigos"]
      },
      images: [...range("studies", 7), IMG("brand/03.jpg"), IMG("brand/01.jpg"), IMG("brand/04.jpg"), IMG("brand/08.jpg"), IMG("brand/10.jpg"), IMG("brand/11.jpg")]
    },
    {
      slug: "marketing-ops",
      cat: "brand",
      title: { en: "Marketing operations & data", pt: "Gestão e dados de marketing" },
      kicker: { en: "Calendars, reports and a lead base that makes sense", pt: "Calendários, relatórios e uma base de leads que faz sentido" },
      year: "2023 — 2026",
      client: "Greener",
      role: { en: "Head of Marketing & Design", pt: "Head de Marketing e Design" },
      place: { en: "In-house", pt: "Interno" },
      cover: IMG("ops/calendar.jpg"),
      coverPos: "0% 0%",
      summary: {
        en: "The work behind the campaigns: team management, the communication calendar, performance tracking, sponsor reports and the restructuring of the lead base.",
        pt: "O trabalho por trás das campanhas: gestão do time, calendário de comunicação, acompanhamento de resultados, relatórios para patrocinadores e a reestruturação da base de leads."
      },
      body: {
        en: [
          "I manage Greener's in-house marketing team, today a team of three, with analysts covering copy, design, platforms and print vendors, and plan the weekly routine and the communication calendar across products, events, studies and social media.",
          "On the data side, I track campaign, email and social performance, build brand exposure reports for event sponsors, and lead projects on the lead base: profiling contacts by business activity, defining new personas with the Market Intelligence team, classifying engagement and rebuilding the RD Station forms.",
          "Much of this runs on AI-assisted workflows with ChatGPT and Claude, from automating analyses to drafting reports, so a lean team can cover more channels and audiences."
        ],
        pt: [
          "Faço a gestão do time interno de marketing da Greener, hoje com três pessoas, com analistas de copy, design, plataformas e fornecedores gráficos, e planejo a rotina semanal e o calendário de comunicação entre produtos, eventos, estudos e redes sociais.",
          "Na frente de dados, acompanho os resultados de campanhas, e-mail e redes, monto relatórios de exposição de marca para patrocinadores de eventos e conduzo projetos sobre a base de leads: perfilamento dos contatos por atuação, definição de novas personas com o time de Inteligência de Mercado, classificação de engajamento e a reformulação dos formulários do RD Station.",
          "Boa parte disso roda com fluxos apoiados por IA com ChatGPT e Claude, da automação de análises ao rascunho de relatórios, para que um time enxuto cubra mais canais e públicos."
        ]
      },
      deliverables: {
        en: ["Team management", "Communication calendar", "Performance tracking", "Sponsor reports", "Lead profiling & personas", "RD Station forms"],
        pt: ["Gestão de equipe", "Calendário de comunicação", "Acompanhamento de resultados", "Relatórios para patrocinadores", "Perfilamento de leads e personas", "Formulários RD Station"]
      },
      images: [],
      demos: [
        { id: "calendar", img: IMG("ops/calendar.jpg"), kind: { en: "Planning", pt: "Planejamento" }, title: { en: "Editorial calendar", pt: "Calendário editorial" },
          note: { en: "Week-by-week grid across email, LinkedIn, Instagram and WhatsApp, a cadence dashboard and the team's action plan.", pt: "Grade semana a semana entre e-mail, LinkedIn, Instagram e WhatsApp, um dashboard de cadência e o plano de ação do time." } },
        { id: "instagram", img: IMG("ops/instagram.jpg"), kind: { en: "Dashboard", pt: "Dashboard" }, title: { en: "Instagram report", pt: "Relatório de Instagram" },
          note: { en: "Week vs previous week, views and interaction rate per week, and the days and times that perform best.", pt: "Semana contra a anterior, views e taxa de interação por semana, e os dias e horários que mais rendem." } },
        { id: "linkedin", img: IMG("ops/linkedin.jpg"), kind: { en: "Dashboard", pt: "Dashboard" }, title: { en: "LinkedIn report", pt: "Relatório de LinkedIn" },
          note: { en: "Best time per weekday, relative reach by slot, formats and the top posts.", pt: "Melhor horário por dia, alcance relativo por faixa, formatos e os melhores posts." } },
        { id: "youtube", img: IMG("ops/youtube.jpg"), kind: { en: "Dashboard", pt: "Dashboard" }, title: { en: "Live streams report", pt: "Relatório de lives" },
          note: { en: "Performance per live coloured by theme, averages by theme and a sortable list of every broadcast.", pt: "Desempenho por live colorido por tema, médias por tema e a lista ordenável de todas as transmissões." } },
        { id: "articles", img: IMG("ops/articles.jpg"), kind: { en: "Dashboard", pt: "Dashboard" }, title: { en: "Articles report", pt: "Relatório de artigos" },
          note: { en: "Real reading vs automated traffic, performance per article and where readers come from.", pt: "Leitura real contra tráfego automatizado, desempenho por artigo e de onde vêm os leitores." } }
      ],
      docs: [
        { title: { en: "Sponsor report 2026", pt: "Relatório de patrocínio 2026" },
          note: { en: "The Greener Summit post-event overview I put together for sponsors: audience, reach, results and brand exposure on site.", pt: "O overview pós-evento do Greener Summit que monto para os patrocinadores: público, alcance, resultados e exposição de marca no evento." },
          pdf: "docs/Greener-Summit-2026-Overview.pdf", size: "5.5 MB", pages: pages("summit26", 42) },
        { title: { en: "Sponsor report 2025", pt: "Relatório de patrocínio 2025" },
          note: { en: "The public overview of Greener Summit 2025.", pt: "O overview público do Greener Summit 2025." },
          pdf: "docs/Greener-Summit-2025-Overview.pdf", size: "2.6 MB", pages: pages("summit25", 26) }
      ]
    },
    {
      slug: "greener-brand",
      team: { copy: [{ name: "Mateus Pinheiro", years: "2022–25" }, { name: "Larissa Maria", years: "2025–26" }], design: [{ me: true, years: "2021–23" }, { name: "Renan Corazza", years: "2023–26" }, { name: "Arthur Laprano", years: "2023–25" }, { name: "Viviane Custódio", years: "2026" }] },
      cat: "brand",
      title: { en: "Greener — Brand & Growth", pt: "Greener — Marca e Growth" },
      kicker: { en: "From intern to head of the brand", pt: "De estagiária à liderança da marca" },
      year: "2021 — 2026",
      client: "Greener",
      role: { en: "Lead designer, art director, team lead", pt: "Designer principal, diretora de arte, líder do time" },
      place: "Vila Olímpia · São Paulo",
      cover: IMG("covers/brand.jpg"),
      stats: [
        { value: "3K → 13K", label: { en: "Instagram followers", pt: "seguidores no Instagram" } },
        { value: "2K → 12K", label: { en: "LinkedIn followers", pt: "seguidores no LinkedIn" } }
      ],
      summary: {
        en: "Five years evolving the identity of an energy intelligence company across social, email, web and print, and the automation that turns that audience into leads.",
        pt: "Cinco anos evoluindo a identidade de uma empresa de inteligência de energia em redes, e-mail, web e impressos, e a automação que transforma esse público em leads."
      },
      body: {
        en: [
          "I joined Greener in 2021 as a marketing intern focused on graphic design, and from the start I was responsible for evolving the brand's visual identity, bringing consistency to static and motion creatives across digital channels. As an analyst I led product redesigns, such as the visual identities of Greendex and Greener Hub, and the visual campaigns for launches and events; today, as Head of Marketing & Design, I am responsible for the brand's creative and strategic front, leading the team that signs most of the design since 2024.",
          "Behind the creative work there is a growth engine: advanced segmentation and automation in RD Station Marketing and RD Conversas, and automated WhatsApp and CRM journeys for each product. On social, Greener's Instagram grew from 3K to 13K followers and LinkedIn from 2K to 12K."
        ],
        pt: [
          "Entrei na Greener em 2021 como estagiária de marketing com foco em design gráfico e, desde o início, fui responsável por evoluir a identidade visual da marca, trazendo consistência aos criativos estáticos e em motion nos canais digitais. Como analista, conduzi redesigns de produtos, como as identidades visuais do Greendex e do Greener Hub, e as campanhas visuais de lançamentos e eventos; hoje, como Head de Marketing e Design, respondo pela frente criativa e estratégica da marca, liderando o time que assina a maior parte do design desde 2024.",
          "Por trás do trabalho criativo existe uma engrenagem de crescimento: segmentações e automações avançadas no RD Station Marketing e no RD Conversas, e jornadas automatizadas de WhatsApp e CRM para cada produto. Nas redes, o Instagram da Greener cresceu de 3 mil para 13 mil seguidores e o LinkedIn de 2 mil para 12 mil."
        ]
      },
      deliverables: {
        en: ["Visual identity", "Social media", "Email marketing", "RD Station & RD Conversas", "WhatsApp & CRM flows", "Paid media"],
        pt: ["Identidade visual", "Redes sociais", "E-mail marketing", "RD Station e RD Conversas", "Fluxos de WhatsApp e CRM", "Mídia paga"]
      },
      images: range("brand", 12)
    },
    {
      slug: "kpop-banners",
      cat: "illustration",
      title: { en: "K-pop fan banners", pt: "Banners de fãs de K-pop" },
      kicker: { en: "Illustrated banners for two Dreamcatcher Company shows", pt: "Banners ilustrados para dois shows da Dreamcatcher Company" },
      year: "2025 — 2026",
      client: { en: "Voluntary fan projects · approved by Dreamcatcher Company", pt: "Projetos voluntários de fã · aprovados pela Dreamcatcher Company" },
      role: { en: "Illustrator, designer & interviewer", pt: "Ilustradora, designer e entrevistadora" },
      place: "São Paulo",
      cover: IMG("kpop/crtk-03.jpg"),
      stats: [
        { value: "2", label: { en: "shows in São Paulo", pt: "shows em São Paulo" } },
        { value: "4,000", label: { en: "banners printed and handed out to the crowd", pt: "banners impressos e distribuídos ao público" } },
        { value: "3", label: { en: "languages in the band interview: PT, EN and KO", pt: "idiomas na entrevista com a banda: PT, EN e KO" } }
      ],
      summary: {
        en: "Hand-illustrated, double-sided banners raised by the crowd at UAU (2025) and ChRocktikal (2026) shows, approved by Dreamcatcher Company. In 2026 I also interviewed the band.",
        pt: "Banners frente e verso ilustrados à mão e erguidos pelo público nos shows do UAU (2025) e do ChRocktikal (2026), aprovados pela Dreamcatcher Company. Em 2026 também entrevistei a banda."
      },
      body: {
        en: [
          "Fan banners are a K-pop tradition: the crowd raises them at a planned moment of the show as a message to the artists. These two were voluntary projects for the fan community, each approved by Dreamcatcher Company before being printed and handed out: 4,000 banners in total. At the end of the shows, the artists picked up the banners and took photos with them.",
          "UAU, the Dreamcatcher subunit formed by JiU, SuA and Yoohyeon, played São Paulo on August 15, 2025, on the \"Playlist #You Are You\" tour. The front carries a Korean message around \"Good Luck\", with the fandom's lightsticks and the group's mascots; the back shows the three members and the instructions for the crowd.",
          "ChRocktikal's first world tour, \"CRTK: The Beginning\", reached São Paulo on June 21, 2026, produced by Highway Star. The front shows the band with the line \"CRTK you've awakened us\"; the back is a vintage radio with the instructions. Highway Star invited our fanbase to interview the band, and we published it with Dreamcatcher Company's authorization on YouTube, X and Instagram (@crtkupdates). I conducted the interview in Portuguese, English and Korean, with an on-site interpreter for the Portuguese–Korean exchanges; recording and editing are by Luisa Krummenauer, who manages @crtkupdates with me. The video passed 1,000 views on YouTube. Show photos by Highway Star."
        ],
        pt: [
          "Banners de fãs são uma tradição do K-pop: o público os ergue em um momento combinado do show, como uma mensagem para os artistas. Estes dois foram projetos voluntários para a comunidade de fãs, cada um aprovado pela Dreamcatcher Company antes de ser impresso e distribuído: 4 mil banners no total. No fim dos shows, os artistas pegaram os banners e tiraram fotos com eles.",
          "O UAU, subunit do Dreamcatcher formada por JiU, SuA e Yoohyeon, se apresentou em São Paulo em 15 de agosto de 2025, na turnê \"Playlist #You Are You\". A frente traz uma mensagem em coreano em torno de \"Good Luck\", com os lightsticks do fandom e os mascotes do grupo; o verso mostra as três integrantes e as instruções para o público.",
          "A primeira turnê mundial do ChRocktikal, \"CRTK: The Beginning\", chegou a São Paulo em 21 de junho de 2026, com produção da Highway Star. A frente mostra a banda com a frase \"CRTK you've awakened us\"; o verso é um rádio antigo com as instruções. A Highway Star convidou nossa fanbase para entrevistar a banda, e publicamos com autorização da Dreamcatcher Company no YouTube, no X e no Instagram (@crtkupdates). Conduzi a entrevista em português, inglês e coreano, com uma tradutora no local para as trocas entre português e coreano; a gravação e a edição são de Luisa Krummenauer, que gerencia o @crtkupdates comigo. O vídeo passou de mil visualizações no YouTube. Fotos do show: Highway Star."
        ]
      },
      deliverables: {
        en: ["Character illustration", "Mascots & lightsticks", "Double-sided banners", "Print-ready art", "Band interview"],
        pt: ["Ilustração de personagens", "Mascotes e lightsticks", "Banners frente e verso", "Arte final para impressão", "Entrevista com a banda"]
      },
      videos: [{ yt: "-jbwgi1w-os", title: { en: "My interview with CRTK", pt: "Minha entrevista com o CRTK" } }],
      images: [...range("kpop", 5, "crtk-"), ...range("kpop", 4, "show-"), ...range("kpop", 6, "uau-")]
    },
    {
      slug: "illustrations",
      cat: "illustration",
      title: { en: "Illustration", pt: "Ilustração" },
      kicker: { en: "Personal digital painting, portraits and sketches", pt: "Pintura digital autoral, retratos e sketches" },
      year: "2022 — 2024",
      client: { en: "Personal work", pt: "Trabalho autoral" },
      role: { en: "Illustrator", pt: "Ilustradora" },
      cover: IMG("illus/01.jpg"),
      coverPos: "50% 22%",
      summary: {
        en: "My personal illustration: digital portraits and characters, from finished paintings to loose sketches.",
        pt: "Minha ilustração autoral: retratos e personagens digitais, de pinturas finalizadas a sketches soltos."
      },
      body: {
        en: [
          "Alongside design and marketing, I keep a personal illustration practice: digital portraits and characters, exploring light, colour and expression.",
          "Everything is drawn in Procreate. The selection goes from finished paintings to the line sketches where each piece starts. The same hand is behind the K-pop fan banners and the Florescer guidebook below.",
          "I take commissions and I'm open to discussing illustration projects: portraits, characters, covers and editorial pieces."
        ],
        pt: [
          "Paralelamente ao design e ao marketing, mantenho uma prática autoral de ilustração: retratos e personagens digitais, explorando luz, cor e expressão.",
          "Tudo é desenhado no Procreate. A seleção vai das pinturas finalizadas aos sketches de linha onde cada peça começa. É a mesma mão por trás dos banners de fãs de K-pop e do livro-guia Florescer, logo abaixo.",
          "Aceito encomendas e estou aberta a conversar sobre projetos de ilustração: retratos, personagens, capas e peças editoriais."
        ]
      },
      deliverables: {
        en: ["Digital painting (Procreate)", "Portraits", "Character design", "Sketches", "Commissions"],
        pt: ["Pintura digital (Procreate)", "Retratos", "Design de personagens", "Sketches", "Encomendas"]
      },
      images: range("illus", 10),
      cta: { title: { en: "Commissions are open", pt: "Encomendas abertas" }, btn: { en: "Talk about a commission", pt: "Conversar sobre uma encomenda" } },
      related: {
        title: { en: "Illustration projects", pt: "Projetos de ilustração" },
        note: { en: "Where illustration became a project of its own.", pt: "Onde a ilustração virou um projeto completo." },
        slugs: ["kpop-banners", "florescer"]
      }
    },
    {
      slug: "florescer",
      cat: "illustration",
      title: { en: "Florescer", pt: "Florescer" },
      kicker: { en: "A world built from the meaning of flowers", pt: "Um mundo construído a partir do significado das flores" },
      year: "2022",
      client: { en: "Authorial · UNESP", pt: "Autoral · UNESP" },
      role: { en: "Author, creative director, concept artist", pt: "Autora, diretora criativa, concept artist" },
      place: "Bauru · São Paulo",
      link: "https://canva.link/7kbpi5y3nptv9l4",
      cover: IMG("florescer/05.jpg"),
      coverPos: "50% 18%",
      stats: [
        { value: "49", label: { en: "page playable guidebook", pt: "páginas de livro-guia jogável" } },
        { value: "150", label: { en: "page academic report", pt: "páginas de relatório acadêmico" } }
      ],
      summary: {
        en: "My graphic design thesis: concept art, character design, worldbuilding and editorial design in a playable 49-page guidebook.",
        pt: "Meu TCC em Design Gráfico: concept art, design de personagens, worldbuilding e design editorial em um livro-guia jogável de 49 páginas."
      },
      body: {
        en: [
          "Florescer creates an original universe inspired by the symbolism of flowers, translating their meanings into cultures, characters and visual elements. The study also looked at how audience participation shapes stories through tabletop RPG systems.",
          "I carried out every stage: research, narrative universe and lore, character design, concept art, illustration, visual identity, writing, layout and creative direction. The result is a 49-page guidebook adapted to D&D, fully playable, with a 150-page academic report documenting the process.",
          "The thesis was recommended for UNESP Bauru's repository and presented at an international congress at the University of Palermo, in Argentina."
        ],
        pt: [
          "Florescer cria um universo original inspirado na simbologia das flores, traduzindo seus significados em culturas, personagens e elementos visuais. O estudo também investigou como a participação do público constrói narrativas por meio de sistemas de RPG.",
          "Conduzi todas as etapas: pesquisa, universo narrativo e lore, design de personagens, concept art, ilustração, identidade visual, redação, diagramação e direção criativa. O resultado é um livro-guia de 49 páginas adaptado ao D&D, 100% jogável, acompanhado de um relatório acadêmico de 150 páginas.",
          "O TCC foi indicado ao repositório da UNESP Bauru e apresentado em um congresso internacional da Universidade de Palermo, na Argentina."
        ]
      },
      deliverables: {
        en: ["Concept art", "Character design", "Worldbuilding", "Editorial design"],
        pt: ["Concept art", "Design de personagens", "Worldbuilding", "Design editorial"]
      },
      images: ["01", "02", "04", "05", "07", "08", "09"].map((n) => IMG(`florescer/${n}.jpg`)),
      docs: [
        { title: { en: "The published book", pt: "O livro publicado" },
          note: { en: "The full 49-page playable guidebook. Flip through it here or open the PDF.", pt: "O livro-guia jogável completo, com 49 páginas. Folheie aqui ou abra o PDF." },
          pdf: "docs/Florescer-Ebook.pdf", size: "8.6 MB", portrait: true, pages: pages("florescer", 49) }
      ]
    },
    {
      slug: "early-work",
      cat: "motion",
      title: { en: "STALO & Dózy", pt: "STALO e Dózy" },
      kicker: { en: "Where it started: product design and motion for brands and music", pt: "Onde tudo começou: design de produto e motion para marcas e música" },
      year: "2020 — 2021",
      client: "STALO · Dózy",
      role: { en: "Design intern · motion designer", pt: "Estagiária de design · motion designer" },
      place: "Bauru · São Paulo",
      cover: VID("stalo-vinheta"),
      summary: {
        en: "The logo vignette, catalogs, product art and social campaigns for STALO, and release teasers, show calls and album art for Dózy Music artists.",
        pt: "A vinheta do logo, catálogos, artes de produto e campanhas de redes para a STALO, e teasers de lançamento, chamadas de shows e capas para artistas da Dózy Music."
      },
      body: {
        en: [
          "At STALO, a manufacturer of whiteboards, clipboards and office products, I animated the brand's logo vignette and the product launch videos, designed the product catalog and its page system, created product art such as whiteboard planners, and ran the social media campaigns, from launches to seasonal posts, plus pieces like the sales team's award and uniforms.",
          "At Dózy, an agency focused on music, my highlight was motion design for Dózy Music artists: release teasers, show calls and promotional campaigns that translated each artist's sound into visuals for social media. I also created album covers, merchandise and visual identities."
        ],
        pt: [
          "Na STALO, fabricante de quadros, pranchetas e produtos para escritório, animei a vinheta do logo e os vídeos de lançamento de produtos, desenhei o catálogo e seu sistema de páginas, criei artes de produto como os quadros planner e conduzi as campanhas de redes sociais, de lançamentos a datas sazonais, além de peças como o prêmio e os uniformes do time de vendas.",
          "Na Dózy, agência com foco no universo musical, meu destaque foi o motion design para artistas da Dózy Music: teasers de lançamento, chamadas de shows e campanhas promocionais que traduziam o som de cada artista em visuais para as redes. Também criei capas de álbum, produtos e identidades visuais."
        ]
      },
      deliverables: {
        en: ["Logo vignette", "Product motion", "Catalogs", "Product art", "Social media", "Album covers", "Merchandise"],
        pt: ["Vinheta de logo", "Motion de produto", "Catálogos", "Artes de produto", "Redes sociais", "Capas de álbum", "Produtos"]
      },
      sets: [
        { title: { en: "STALO · 2020–2021", pt: "STALO · 2020–2021" },
          note: { en: "Logo vignette and product launch videos, the catalog system, whiteboard planners, social campaigns and sales-team pieces.", pt: "Vinheta do logo e vídeos de lançamento de produtos, o sistema do catálogo, quadros planner, campanhas de redes e peças para o time de vendas." },
          loops: [{ ...VID("stalo-vinheta"), wide: true }, VID("stalo-prancheta"), VID("stalo-planner"), VID("stalo-elegance"), VID("stalo-personalizados"), VID("stalo-linhas")],
          images: range("stalo", 22), doc: 0 },
        { title: { en: "Dózy · 2020", pt: "Dózy · 2020" },
          note: { en: "Motion for Dózy Music artists: release teasers, show calls and album art.", pt: "Motion para artistas da Dózy Music: teasers de lançamento, chamadas de shows e capas." },
          loops: [VID("dozy-01"), VID("dozy-02"), VID("dozy-03"), VID("dozy-04"), VID("dozy-05"), VID("dozy-06")],
          images: range("dozy", 6) }
      ],
      docs: [
        { title: { en: "STALO whiteboard catalog", pt: "Catálogo de quadros STALO" },
          note: { en: "The 2021 whiteboard catalog I laid out, page by page.", pt: "O catálogo de quadros de 2021 que diagramei, página a página." },
          pdf: "docs/STALO-Catalogo-Quadros-2021.pdf", size: "6.9 MB", portrait: true, pages: pages("stalo", 22) }
      ]
    }

  ],

  /* Order shown on the home grid (first two are large) */
  featured: ["greener-summit", "imersao-greener", "kpop-banners", "meet-and-greener", "armazenamento-2025", "greener-website", "webinars", "greener-studies"],
  more: ["illustrations", "imersao-gd", "cafe-com-investidores", "florescer", "marketing-ops", "greener-brand", "early-work"],

  strengths: [
    { title: { en: "Brand & visual identity", pt: "Marca e identidade visual" },
      text: { en: "Identities that hold up across years and channels, from a social post to a two-day event with LED walls.", pt: "Identidades que se sustentam por anos e canais, do post nas redes a um evento de dois dias com painéis de LED." } },
    { title: { en: "B2B events, end to end", pt: "Eventos B2B de ponta a ponta" },
      text: { en: "Positioning, campaigns, ticket sales, print production, wayfinding and the runsheet for show day.", pt: "Posicionamento, campanhas, venda de ingressos, produção gráfica, wayfinding e o roteiro do dia do evento." } },
    { title: { en: "Growth, CRM & automation", pt: "Growth, CRM e automação" },
      text: { en: "Segmentation, email, WhatsApp and CRM journeys in RD Station and RD Conversas, tuned for conversion.", pt: "Segmentação, e-mail, jornadas de WhatsApp e CRM no RD Station e no RD Conversas, ajustadas para conversão." } },
    { title: { en: "Landing pages & vibe coding", pt: "Landing pages e vibe coding" },
      text: { en: "Pages and web app prototypes built with AI-assisted coding in Claude Code, from layout to live.", pt: "Páginas e protótipos de web apps construídos com código assistido por IA no Claude Code, do layout ao ar." } },
    { title: { en: "Data, tracking & reports", pt: "Dados, acompanhamento e relatórios" },
      text: { en: "Campaign and social tracking, sponsor exposure reports, lead base profiling and personas.", pt: "Acompanhamento de campanhas e redes, relatórios para patrocinadores, perfilamento da base e personas." } },
    { title: { en: "Planning & team management", pt: "Planejamento e gestão de equipe" },
      text: { en: "Communication calendar, weekly planning, an in-house team, vendors and partners.", pt: "Calendário de comunicação, planejamento semanal, time interno, fornecedores e parceiros." } },
    { title: { en: "Webinars & live content", pt: "Webinars e conteúdo ao vivo" },
      text: { en: "Monthly live streams on YouTube and LinkedIn, from the visual package to moderation.", pt: "Transmissões mensais no YouTube e no LinkedIn, do pacote visual à moderação." } },
    { title: { en: "AI-assisted workflows", pt: "Fluxos com IA" },
      text: { en: "ChatGPT and Claude built into the routine, so a lean team ships more across more channels.", pt: "ChatGPT e Claude incorporados à rotina, para um time enxuto entregar mais em mais canais." } }
  ],

  about: {
    en: [
      "I'm a graphic designer from UNESP who grew into marketing leadership. For six years I've worked between design and marketing, and since 2021 I've helped build the brand of Greener, Brazil's energy intelligence company, from intern to Head of Marketing & Design.",
      "My work joins strategy and craft: I plan the positioning, run the campaign, read the numbers and still care about the kerning on the backdrop. Outside the corporate world I illustrate, and that eye for detail comes with me to every project. At Greener I was internally recognized for innovation, creativity and cooperation."
    ],
    pt: [
      "Sou designer gráfica formada pela UNESP e cresci até a liderança de marketing. Há seis anos atuo entre design e marketing e, desde 2021, ajudo a construir a marca da Greener, empresa de inteligência do setor de energia, de estagiária a Head de Marketing e Design.",
      "Meu trabalho une estratégia e execução: planejo o posicionamento, conduzo a campanha, leio os números e ainda cuido do kerning do backdrop. Fora do mundo corporativo, ilustro, e esse olhar para o detalhe me acompanha em todo projeto. Na Greener, recebi reconhecimento interno em inovação, criatividade e cooperação."
    ]
  },

  experience: [
    { company: "Greener", title: { en: "Head of Marketing & Design", pt: "Head de Marketing e Design" }, dates: { en: "Dec 2023 — Present", pt: "Dez 2023 — Atual" },
      text: { en: "Leads the in-house marketing and design team: brand, positioning, B2B events, campaigns, website and landing pages, data and reports, automation and AI-assisted processes.", pt: "Lidera o time interno de marketing e design: marca, posicionamento, eventos B2B, campanhas, site e landing pages, dados e relatórios, automação e processos com IA." } },
    { company: "Greener", title: { en: "Mid-level Marketing & Design Analyst", pt: "Analista de Marketing e Design Pleno" }, dates: { en: "Mar 2023 — Dec 2023", pt: "Mar 2023 — Dez 2023" },
      text: { en: "Led redesign and identity projects for physical and digital products and conversion campaigns for events.", pt: "Liderou redesigns e identidades de produtos físicos e digitais e campanhas de conversão para eventos." } },
    { company: "Greener", title: { en: "Junior Marketing & Design Analyst", pt: "Analista de Marketing e Design Júnior" }, dates: { en: "May 2022 — Mar 2023", pt: "Mai 2022 — Mar 2023" },
      text: { en: "Main designer across channels, email campaigns in RD Station and intern training.", pt: "Principal designer em múltiplos canais, campanhas de e-mail no RD Station e capacitação de estagiários." } },
    { company: "Greener", title: { en: "Marketing & Design Intern", pt: "Estagiária de Marketing e Design" }, dates: { en: "May 2021 — May 2022", pt: "Mai 2021 — Mai 2022" },
      text: { en: "Static and motion creatives, website pages and social media.", pt: "Criativos estáticos e em motion, páginas do site e redes sociais." } },
    { company: "STALO", title: { en: "Design Intern", pt: "Estagiária de Design" }, dates: { en: "Nov 2020 — May 2021", pt: "Nov 2020 — Mai 2021" },
      text: { en: "Catalogs, promotional materials, logo vignette and product identities.", pt: "Catálogos, materiais promocionais, vinheta de logo e identidades de produtos." } },
    { company: "Dózy", title: { en: "Design Intern", pt: "Estagiária de Design" }, dates: { en: "Feb 2020 — Nov 2020", pt: "Fev 2020 — Nov 2020" },
      text: { en: "Motion design, media kits and visual identities for music clients.", pt: "Motion design, mídia kits e identidades visuais para clientes do segmento musical." } }
  ],

  education: [
    { title: { en: "BA in Graphic Design", pt: "Bacharelado em Design Gráfico" }, where: "UNESP · Bauru", when: "2017 — 2022" },
    { title: { en: "Marketing", pt: "Marketing" }, where: "EBAC", when: "" },
    { title: { en: "Digital Marketing", pt: "Marketing Digital" }, where: "RD University", when: "" },
    { title: { en: "Event Marketing", pt: "Marketing para Eventos" }, where: "RD University", when: "" },
    { title: { en: "Viver de IA", pt: "Viver de IA" }, where: { en: "AI applied to marketing", pt: "IA aplicada ao marketing" }, when: "" },
    { title: { en: "RD Summit", pt: "RD Summit" }, where: "RD Station", when: "2022 · 2023" }
  ],

  tools: ["Illustrator", "Photoshop", "InDesign", "After Effects", "Figma", "Canva", "RD Station Marketing", "RD Conversas", "Hotmart", "Elementor", "Wix", "StreamYard", "Procreate", "Clip Studio Paint", "WordPress", "ChatGPT", "Claude", "Claude Code"],

  languages: { en: "Portuguese (native) · English (fluent) · Spanish (basic)", pt: "Português (nativo) · Inglês (fluente) · Espanhol (básico)" }
};
