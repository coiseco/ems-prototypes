/* EMS prototypes — shared data and behaviour.
   Все тексты, цены и имена врачей взяты с https://www.emsclinic.ru/ (на 25.10.2026). */
(function () {
  'use strict';

  var SITE = 'https://www.emsclinic.ru';

  var EMS = (window.EMS = {
    site: SITE,
    phone: '8 (812) 777-77-03',
    phoneHref: 'tel:+78127777703',
    email: 'zabota@emsclinic.ru',
    logo: SITE + '/img/ems_logo_30.svg',
    clinics: [
      {
        id: 'udelnaya',
        name: 'EMS на Удельной',
        address: 'пр. Энгельса, д. 61, корп. 2',
        district: 'Выборгский район',
        hours: 'ежедневно с 8:00 до 22:00',
        trauma: 'Травмпункт работает с 8:00 до 22:00',
        url: SITE + '/clinics/engelsa-61-k2',
        map: 'https://yandex.ru/maps/?text=' + encodeURIComponent('Санкт-Петербург, проспект Энгельса, 61 корп. 2')
      },
      {
        id: 'pobedy',
        name: 'EMS на Парке Победы',
        address: 'ул. Победы, д. 17',
        district: 'Московский район',
        hours: 'ежедневно с 8:00 до 22:00',
        trauma: 'Травмпункт и рентген работают круглосуточно',
        metro: 'м. Парк Победы, 3 мин.',
        url: SITE + '/clinics/ulica-pobedy-17',
        map: 'https://yandex.ru/maps/?text=' + encodeURIComponent('Санкт-Петербург, улица Победы, 17')
      }
    ],
    stats: [
      { v: '175 000', n: 175000, t: 'приёмов в год', pre: '>' },
      { v: '30', n: 30, t: 'лет работы на рынке медицинских услуг' },
      { v: '53', n: 53, t: 'медицинские специальности' },
      { v: '2', n: 2, t: 'клиники — в Московском и Выборгском районах Санкт-Петербурга' }
    ],
    promos: [],  /* заполняется из ems-data.js (EMS_PROMOS) */
    services: [
      { k: 'infusion', t: 'Инфузионная терапия', s: 'Капельница здоровья и красоты', spec: 'Инфузионная терапия', url: '/services/konsultacii-dlya-vzroslyh/infuzionnaya-terapiya' },
      { k: 'prevent', t: 'Превентивная медицина и долголетие', s: 'От планирования беременности до активного долголетия', spec: 'Превентивная медицина' },
      { k: 'home', t: 'Вызовы на дом', s: 'Врач приедет к вам', spec: 'Вызов врача на дом' },
      { k: 'adult', t: 'Услуги для взрослых', s: '40 направлений — от терапии до эндокринологии', spec: 'Семейный доктор - врач общей практики' },
      { k: 'child', t: 'Услуги для детей', s: 'Педиатры и детские специалисты', spec: 'Педиатрия' },
      { k: 'trauma', t: 'Травмпункт 24 часа', s: 'Травмпункт и рентген на Победы, 17 — круглосуточно', spec: 'Травматология и ортопедия', urgent: true },
      { k: 'video', t: 'Онлайн-консультации', s: 'Врач на связи без поездки в клинику', spec: 'Онлайн-консультация' },
      { k: 'lab', t: 'Анализы и исследования', s: 'Лаборатория, УЗИ, рентген, функциональная диагностика', spec: 'Анализы' },
      { k: 'check', t: 'Чекапы и скрининги', s: 'Для взрослых и для детей', spec: 'Чекапы и скрининги' },
      { k: 'tooth', t: 'Стоматология', s: 'Для детей и взрослых', spec: 'Стоматология' },
      { k: 'docs', t: 'Справки и документы', s: 'Справки в бассейн, лагерь, вуз, санаторий', spec: 'Справки' },
      { k: 'program', t: 'Программы для взрослых', s: 'Комплексное наблюдение', spec: 'Программы для взрослых' },
      { k: 'heart', t: 'Ведение беременности', s: 'Программа «Ждем тебя, малыш»', spec: 'Программы ведения беременности' },
      { k: 'syringe', t: 'Вакцинация', s: 'Допуск врача и прививка в одной клинике', spec: 'Вакцинация' },
      { k: 'star', t: 'Программы для детей', s: 'Наблюдение ребёнка по возрастам', spec: 'Программы для детей' }
    ],
    specialties: {
      adult: ['Акушерство и гинекология', 'Аллергология', 'Гастроэнтерология', 'Гематология', 'Дерматология', 'Диетология', 'Кардиология', 'Липидология', 'Маммология', 'Мануальная терапия', 'Неврология', 'Нутрициология', 'Онкология', 'Остеопатия', 'Отоневрология', 'Оториноларингология', 'Офтальмология', 'Проктология', 'Психотерапия', 'Пульмонология', 'Ревматология', 'Семейный доктор - врач общей практики', 'Стоматология', 'Терапия', 'Травматология и ортопедия', 'Трихология', 'УЗИ', 'Урология', 'Физиотерапия', 'ЛФК', 'Флебология и сосудистая хирургия', 'Хирургия', 'Эндокринология', 'Эндоскопия'],
      child: ['Педиатрия', 'Аллергология детская', 'Гастроэнтерология детская', 'Гинекология детская', 'Дерматология детская', 'Детская кардиология', 'Неврология детская', 'Нефрология детская', 'Ортопедия детская', 'Остеопатия детская', 'Оториноларингология детская', 'Офтальмология детская', 'Пульмонология детская', 'Стоматология детская', 'Травматология детская', 'Урология детская', 'Эндокринология детская', 'Хирургия детская']
    },
    doctors: [],  /* заполняется из ems-data.js (EMS_DOCS) */
    reviews: [
      { a: 'Гузель', d: 'Климов Павел Владимирович', u: 'klimov-pavel-vladimirovich', t: 'Павел Владимирович внимательно выслушал меня, провёл осмотр, разобрался в ситуации и назначил лечение.', t2: 'Но назначенное лечение дало результат! Я словно снова почувствовала себя живой: боль в груди прошла, нервное напряжение уменьшилось, и я стала гораздо спокойнее себя чувствовать.' },
      { a: 'Елена', d: 'Питик Наталья Владимировна', u: 'pitik-natalya-vladimirovna', t: 'После первого же занятия ЛФК стало существенно легче, рука обрела подвижность.', t2: 'Наталья Владимировна разрабатывает для каждого пациента свою программу, внимательно отслеживает прогресс, вносит коррективы.' },
      { a: 'Оля З', d: 'Дорогая Лариса Игоревна', u: 'dorogaya-larisa-igorevna', t: 'Лариса Игоревна изучила всю мою историю, проверила необходимые анализы, выписала щадящее лечение, много времени посвятив объяснению самих результатов и способов в дальнейшем избежать осложнений.' },
      { a: 'Алексей К.', d: 'Саркисян Сергей Робертович', u: 'sarkisyan-sergey-robertovich', t: 'За всю жизнь прошел ФГДС довольно много раз. Этот был самым лёгким и быстрым. И без травмированного горла. Большое спасибо!' },
      { a: 'Наталья Алексеева', d: 'Боряк Вероника Евгеньевна', u: 'boryak-veronika-evgenevna', t: 'В течении 3х недель я жила в страхе от внезапных и сильных головокружений, не понимала что со мной происходит.', t2: 'Большое спасибо за помощь.' },
      { a: 'Алиса Ф.', d: 'Бекетова Елена Викторовна', u: 'beketova-elena-viktorovna', t: 'Бережное общение с ребёнком, уважительный разговор с родителями и готовность подробно отвечать на вопросы.', t2: 'После консультации остаётся, пожалуй, самое ценное ощущение для родителя — спокойствие.' },
      { a: 'Ксения Д.', d: 'Петрова Марина Николаевна', u: 'petrova-marina-nikolaevna', t: 'Врач внимательно выслушала, провела осмотр и объяснила, как можно облегчить неприятные симптомы.' }
    ],
    news: [
      { tag: 'Новости', t: 'Как снизить риск распространения ОРВИ в коллективе', s: 'Врач-терапевт, гастроэнтеролог клиники EMS Лада Игоревна Милютина рассказала об особенностях распространения респираторных инфекций в коллективах и о том, почему особенно важно соблюдать меры профилактики в офисах открытого типа.', url: '/news' },
      { tag: 'СМИ о нас', t: 'Танец как стратегия долголетия', s: 'Основатель и генеральный директор EMS Family Clinic Татьяна Евгеньевна Романюк рассказала «АиФ - Санкт-Петербург», какое место танцы занимают в её жизни.', url: '/publications' },
      { tag: 'Газета «На здоровье!»', t: 'Не надо болеть ветрянкой, надо привиться от нее', s: '«Вырастет – сам решит» – это точно не про прививки. Защищать ребенка от инфекционных заболеваний нужно как можно раньше.', url: '/newspapers' }
    ],
    ways: [
      { t: 'Онлайн на сайте', s: 'Оставьте предварительную заявку — врач-координатор свяжется с вами. Точное время приёма зависит от расписания врача.' },
      { t: 'По телефону', s: 'Круглосуточный колл-центр: +7 (812) 777-77-03.' },
      { t: 'Обратный звонок', s: 'Оставьте номер на сайте — перезвоним.' },
      { t: 'Личный кабинет', s: 'Самый удобный способ, если вы уже авторизованы в личном кабинете.' },
      { t: 'В клинике', s: 'На ресепшен у администратора или прямо на приёме у врача.' }
    ]
  });

  /* ---------- real data (ems-data.js) ---------- */
  EMS.promoUntil = window.EMS_PROMO_UNTIL || '';
  EMS.promos = (window.EMS_PROMOS || []).slice();
  EMS.doctors = (window.EMS_DOCS || []).map(function (d) {
    return {
      n: d.n, r: d.r, g: d.g, k: d.k, c: d.c, u: d.u,
      cat: d.k === 'child' ? 'child' : d.k === 'both' ? 'adult child' : 'adult',
      url: SITE + '/doctors/' + d.u,
      thumb: SITE + '/content/doctors/thumbs/' + d.p,
      photo: SITE + '/content/doctors/' + d.p
    };
  });
  EMS.groups = (function () {
    var m = {};
    EMS.doctors.forEach(function (d) { m[d.g] = (m[d.g] || 0) + 1; });
    return Object.keys(m).sort(function (a, b) { return m[b] - m[a]; }).map(function (g) { return { g: g, n: m[g] }; });
  })();
  EMS.doctor = function (slug) { return EMS.doctors.filter(function (d) { return d.u === slug; })[0]; };
  EMS.clinic = function (id) { return EMS.clinics.filter(function (c) { return c.id === id; })[0]; };
  EMS.moscowTime = function () {
    try {
      var p = new Intl.DateTimeFormat('ru-RU', { timeZone: 'Europe/Moscow', hour: '2-digit', minute: '2-digit', hour12: false }).format(new Date()).split(':');
      return { h: +p[0] % 24, m: +p[1] };
    } catch (e) { var n = new Date(); return { h: n.getHours(), m: n.getMinutes() }; }
  };
  /* Часы работы взяты с сайта: клиники 8:00–22:00 ежедневно; травмпункт на Победы круглосуточно */
  EMS.status = function (id) {
    var t = EMS.moscowTime(), open = t.h >= 8 && t.h < 22;
    return { open: open, trauma: id === 'pobedy' ? true : open, label: open ? 'Открыто до 22:00' : 'Откроется в 8:00' };
  };

  /* ---------- icons ---------- */
  var ICONS = {
    infusion: '<path d="M12 3c3 4 5 6.5 5 9a5 5 0 0 1-10 0c0-2.5 2-5 5-9z"/><path d="M10 13a2 2 0 0 0 2 2"/>',
    prevent: '<path d="M12 3l7 3v5c0 5-3 8-7 10-4-2-7-5-7-10V6l7-3z"/><path d="M12 9v6M9 12h6"/>',
    home: '<path d="M4 11l8-7 8 7v9H4z"/><path d="M10 20v-6h4v6"/>',
    adult: '<circle cx="12" cy="7" r="3"/><path d="M6 20c0-3.5 2.5-6 6-6s6 2.5 6 6"/>',
    child: '<circle cx="12" cy="8" r="2.5"/><path d="M8 20v-4a4 4 0 0 1 8 0v4"/>',
    trauma: '<rect x="4" y="4" width="16" height="16" rx="3"/><path d="M12 8v8M8 12h8"/>',
    video: '<rect x="3" y="6" width="13" height="12" rx="2"/><path d="M16 10l5-3v10l-5-3"/>',
    lab: '<path d="M9 3h6M10 3v6l-5 9a2 2 0 0 0 2 3h10a2 2 0 0 0 2-3l-5-9V3"/><path d="M8 15h8"/>',
    check: '<rect x="5" y="4" width="14" height="17" rx="2"/><path d="M9 4V3h6v1M9 13l2 2 4-4"/>',
    tooth: '<path d="M8 4c-2.200 0-4 2-4 5 0 4 2 5 2.500 8 .3 2 1.500 3 2.500 3 1.500 0 1-4 3-4s1.500 4 3 4c1 0 2.200-1 2.500-3 .5-3 2.500-4 2.500-8 0-3-1.800-5-4-5-2 0-2.500 1-4 1S10 4 8 4z"/>',
    docs: '<path d="M7 3h8l4 4v14H7z"/><path d="M15 3v4h4M10 12h6M10 16h6"/>',
    program: '<rect x="4" y="5" width="16" height="15" rx="2"/><path d="M4 10h16M8 3v4M16 3v4"/>',
    heart: '<path d="M12 20s-7-4.500-7-10a4 4 0 0 1 7-2.500A4 4 0 0 1 19 10c0 5.500-7 10-7 10z"/>',
    syringe: '<path d="M14 4l6 6M16 6L7 15l-1 4 4-1 9-9M4 20l3-3M12 8l4 4"/>',
    star: '<path d="M12 3l2.600 5.500 6 .8-4.400 4.200 1.100 6L12 16.600 6.700 19.500l1.100-6L3.400 9.300l6-.8z"/>',
    pin: '<path d="M12 21s7-6 7-11a7 7 0 0 0-14 0c0 5 7 11 7 11z"/><circle cx="12" cy="10" r="2.500"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    phone: '<path d="M5 4h4l2 5-2.500 1.500a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A15 15 0 0 1 3 6a2 2 0 0 1 2-2z"/>',
    search: '<circle cx="11" cy="11" r="6.500"/><path d="M16 16l5 5"/>',
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    left: '<path d="M15 5l-7 7 7 7"/>',
    right: '<path d="M9 5l7 7-7 7"/>',
    close: '<path d="M6 6l12 12M18 6L6 18"/>',
    menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 3.500-7 8-7s8 3 8 7"/>',
    eye: '<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
    check2: '<path d="M5 12.500l4.500 4.500L19 7.500"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.900 4.900l1.400 1.400M17.700 17.700l1.400 1.400M2 12h2M20 12h2M4.900 19.100l1.400-1.400M17.700 6.300l1.400-1.400"/>',
    moon: '<path d="M20 14.500A8.500 8.500 0 0 1 9.500 4 8.500 8.500 0 1 0 20 14.500z"/>'
  };
  EMS.icon = function (k, size) {
    size = size || 24;
    return '<svg class="ico" width="' + size + '" height="' + size + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (ICONS[k] || '') + '</svg>';
  };
  EMS.initials = function (name) {
    var p = name.split(' ');
    return (p[0][0] || '') + (p[1] ? p[1][0] : '');
  };
  EMS.esc = function (s) {
    return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; });
  };

  /* ---------- injected styles (use page tokens) ---------- */
  var css = '' +
    '[hidden]{display:none!important}button{white-space:normal}section[id]{scroll-margin-top:96px}html{scroll-behavior:smooth}@media (prefers-reduced-motion:reduce){html{scroll-behavior:auto}*{animation-duration:.01ms!important;transition-duration:.01ms!important}}' +
    'html.a11y-big{font-size:118%}' +
    '.js [data-reveal]{opacity:0;transform:translateY(14px);transition:opacity .7s ease,transform .7s ease}.js [data-reveal].in{opacity:1;transform:none}' +
    '.ems-dlg{border:0;padding:0;overflow:auto;border-radius:var(--dlg-r,24px);background:var(--bg,#fff);color:var(--ink,#111);width:min(520px,calc(100vw - 24px));max-height:calc(100vh - 24px);box-shadow:0 30px 80px rgba(10,30,25,.35);font-family:var(--font,inherit)}' +
    '.ems-dlg::backdrop{background:rgba(10,25,20,.55);backdrop-filter:blur(3px)}' +
    '.ems-dlg[open]{animation:emsIn .28s cubic-bezier(.2,.8,.2,1)}@keyframes emsIn{from{opacity:0;transform:translateY(16px) scale(.98)}}' +
    '.ems-dlg .d-in{padding:28px 28px 24px}.ems-dlg h2{margin:0 0 4px;font-size:1.5rem;line-height:1.2;font-family:var(--font-display,inherit);font-weight:var(--display-weight,700)}' +
    '.ems-dlg .d-sub{margin:0 0 18px;color:var(--muted,#667)}' +
    '.ems-dlg .d-x{position:absolute;top:12px;right:12px;width:40px;height:40px;border:0;border-radius:50%;background:transparent;color:inherit;cursor:pointer;display:grid;place-items:center}.ems-dlg .d-x:hover{background:var(--soft,#eef3f0)}' +
    '.ems-dlg label{display:block;font-size:.875rem;font-weight:600;margin:14px 0 6px}' +
    '.ems-dlg input[type=text],.ems-dlg input[type=tel],.ems-dlg select{width:100%;font:inherit;font-size:1rem;padding:12px 14px;border:1.5px solid var(--line,#cfd8d3);border-radius:calc(var(--radius,16px) * .6);background:var(--bg,#fff);color:inherit;min-height:48px}' +
    '.ems-dlg input:focus,.ems-dlg select:focus{outline:3px solid var(--focus,#9fd4b5);border-color:var(--brand,#1e7b52)}' +
    '.ems-dlg .err{color:var(--err,#b3261e);font-size:.8125rem;min-height:1.1em;margin-top:4px}' +
    '.ems-dlg .chk{display:flex;gap:10px;align-items:flex-start;font-weight:400;font-size:.8125rem;color:var(--muted,#667);margin-top:16px}.ems-dlg .chk input{margin-top:3px;width:18px;height:18px;accent-color:var(--brand,#1e7b52)}' +
    '.ems-dlg .seg{display:flex;gap:8px;flex-wrap:wrap}.ems-dlg .seg label{margin:0;font-weight:500}.ems-dlg .seg input{position:absolute;opacity:0}.ems-dlg .seg span{display:inline-block;padding:10px 14px;border:1.5px solid var(--line,#cfd8d3);border-radius:999px;cursor:pointer;font-size:.9375rem}.ems-dlg .seg input:checked+span{background:var(--brand,#1e7b52);border-color:var(--brand,#1e7b52);color:var(--on-brand,#fff)}.ems-dlg .seg input:focus-visible+span{outline:3px solid var(--focus,#9fd4b5)}' +
    '.ems-dlg .go{width:100%;margin-top:20px;border:0;border-radius:999px;background:var(--action,#e5322d);color:var(--action-ink,#fff);font:inherit;font-weight:700;font-size:1rem;min-height:52px;cursor:pointer;transition:filter .2s,transform .2s}.ems-dlg .go:hover{filter:brightness(1.08)}.ems-dlg .go:active{transform:scale(.99)}' +
    '.ems-dlg .ok{text-align:center;padding:12px 0}.ems-dlg .ok .tick{width:64px;height:64px;border-radius:50%;background:var(--brand,#1e7b52);color:var(--on-brand,#fff);display:grid;place-items:center;margin:0 auto 14px}.ems-dlg .ok .tick svg{stroke-dasharray:30;stroke-dashoffset:30;animation:emsTick .5s .15s ease forwards}@keyframes emsTick{to{stroke-dashoffset:0}}' +
    '.ems-dlg .demo{font-size:.75rem;color:var(--muted,#667);margin-top:14px}' +
    '.ems-dlg .res{list-style:none;margin:12px 0 0;padding:0;max-height:min(50vh,360px);overflow:auto}.ems-dlg .res button{all:unset;box-sizing:border-box;display:flex;justify-content:space-between;gap:12px;width:100%;padding:12px 10px;border-radius:10px;cursor:pointer}.ems-dlg .res button:hover,.ems-dlg .res button:focus-visible{background:var(--soft,#eef3f0)}.ems-dlg .res small{color:var(--muted,#667)}' +
    '.ems-dlg .hint{color:var(--muted,#667);padding:14px 10px}' +
    '.mbar{display:none}@media (max-width:900px){body{padding-bottom:76px}.mbar{display:flex;gap:8px;position:fixed;left:0;right:0;bottom:0;z-index:60;padding:10px 12px calc(10px + env(safe-area-inset-bottom));background:var(--bg,#fff);border-top:2px solid var(--ink,#111)}.mbar a,.mbar button{flex:1;min-height:52px;border-radius:999px;display:flex;align-items:center;justify-content:center;gap:8px;font:700 1rem var(--font,sans-serif);text-decoration:none;cursor:pointer}.mbar a{border:2px solid var(--ink,#111);color:var(--ink,#111);background:none;flex:0 0 auto;padding:0 18px}.mbar button{border:0;background:var(--action,#e5322d);color:var(--action-ink,#fff)}}' +
    '.ems-cb{display:grid;gap:16px;max-width:480px}.ems-cb .f{display:grid;gap:6px}.ems-cb label{display:block;font-size:.9375rem;font-weight:500}.ems-cb input[type=text],.ems-cb input[type=tel]{width:100%;font:inherit;padding:12px 20px;min-height:52px;border:1.5px solid var(--cb-line,currentColor);border-radius:16px;background:var(--cb-bg,transparent);color:inherit}.ems-cb input::placeholder{color:inherit;opacity:.6}.ems-cb input:focus-visible{outline:3px solid var(--focus,#9fd4b5);outline-offset:2px}.ems-cb .chk{display:flex;gap:12px;align-items:center;font-weight:400;font-size:.9375rem;line-height:1.35;cursor:pointer}.ems-cb .chk input{margin:0;width:22px;height:22px;flex:none;accent-color:var(--brand,#1e7b52)}.ems-cb .err{font-size:.875rem;color:var(--err,#b3261e)}.ems-cb .err:empty{display:none}.ems-cb .go{min-height:52px;border:0;border-radius:999px;background:var(--action,#e5322d);color:var(--action-ink,#fff);font:inherit;font-weight:600;cursor:pointer;padding:0 28px;justify-self:start}.ems-cb .go:hover{filter:brightness(1.08)}.ems-cb-ok{display:grid;gap:6px}.ems-cb-ok b{font-size:1.25rem}' +
    '.themebtn{display:inline-flex;align-items:center;justify-content:center;min-width:44px;min-height:44px;padding:0 10px;border:0;border-radius:999px;background:none;color:inherit;cursor:pointer;font:inherit}.themebtn:hover{background:var(--hover,rgba(128,128,128,.18))}.themebtn svg{width:22px;height:22px}[data-theme=dark] .themebtn .moon{display:none}[data-theme=light] .themebtn .sun{display:none}' +
    '.ems-toast{position:fixed;left:50%;bottom:24px;transform:translate(-50%,20px);background:var(--ink,#111);color:var(--bg,#fff);padding:12px 18px;border-radius:999px;opacity:0;transition:.3s;z-index:9999;pointer-events:none;font:500 .9375rem var(--font,sans-serif)}.ems-toast.on{opacity:1;transform:translate(-50%,0)}';
  var st = document.createElement('style');
  st.textContent = css;
  document.head.appendChild(st);
  document.documentElement.classList.add('js');

  /* ---------- dialogs ---------- */
  function mk(id, html) {
    var d = document.createElement('dialog');
    d.className = 'ems-dlg';
    d.id = id;
    d.innerHTML = '<button class="d-x" type="button" aria-label="Закрыть" data-close>' + EMS.icon('close', 20) + '</button><div class="d-in">' + html + '</div>';
    document.body.appendChild(d);
    d.addEventListener('click', function (e) {
      if (e.target === d || e.target.closest('[data-close]')) d.close();
    });
    return d;
  }

  function specOptions(sel) {
    var o = '<option value="">Выберите направление</option><option value="Не знаю, нужна подсказка">Не знаю — подскажите, к кому идти</option>';
    o += '<optgroup label="Взрослым">' + EMS.specialties.adult.map(function (s) { return '<option>' + s + '</option>'; }).join('') + '</optgroup>';
    o += '<optgroup label="Детям">' + EMS.specialties.child.map(function (s) { return '<option>' + s + '</option>'; }).join('') + '</optgroup>';
    o += '<optgroup label="Другое">' + ['Инфузионная терапия', 'Превентивная медицина', 'Чекапы и скрининги', 'Вакцинация', 'Вызов врача на дом', 'Онлайн-консультация', 'Анализы', 'Справки', 'Программы для взрослых', 'Программы для детей', 'Программы ведения беременности'].map(function (s) { return '<option>' + s + '</option>'; }).join('') + '</optgroup>';
    return o;
  }

  var booking, callback, search;
  function build() {
    booking = mk('dlg-book',
      '<div data-view="form"><h2>Запись на приём</h2><p class="d-sub">Оставьте контакты — администратор перезвонит и подберёт время.</p><p class="d-sub" data-doc-line hidden style="font-weight:600;color:var(--ink)"></p>' +
      '<form novalidate>' +
      '<label for="b-spec">Направление</label><select id="b-spec" name="spec">' + specOptions() + '</select><div class="err" data-e="spec"></div>' +
      '<label id="b-cl">Клиника</label><div class="seg" role="radiogroup" aria-labelledby="b-cl">' +
      EMS.clinics.map(function (c, i) { return '<label><input type="radio" name="clinic" value="' + c.id + '"' + (i === 0 ? ' checked' : '') + '><span>' + c.name.replace('EMS ', '') + '</span></label>'; }).join('') +
      '<label><input type="radio" name="clinic" value="any"><span>Любая</span></label></div>' +
      '<label for="b-name">Имя</label><input id="b-name" name="name" type="text" autocomplete="name" placeholder="Как к вам обращаться"><div class="err" data-e="name"></div>' +
      '<label for="b-phone">Телефон</label><input id="b-phone" name="phone" type="tel" autocomplete="tel" inputmode="tel" placeholder="+7 (___) ___-__-__"><div class="err" data-e="phone"></div>' +
      '<label class="chk"><input type="checkbox" name="agree"><span>Согласен(на) на обработку персональных данных в соответствии с политикой EMS</span></label><div class="err" data-e="agree"></div>' +
      '<button class="go" type="submit">Записаться</button></form></div>' +
      '<div class="ok" data-view="ok" hidden><div class="tick"><svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.500l4.500 4.500L19 7.500"/></svg></div><h2>Заявка принята</h2><p class="d-sub" data-ok-text></p><p class="demo">Это прототип: данные никуда не отправляются. Для записи звоните ' + EMS.phone + '.</p></div>');

    callback = mk('dlg-call',
      '<div data-view="form"><h2>Обратный звонок</h2><p class="d-sub">Перезвоним в рабочее время — с 8:00 до 22:00.</p><form novalidate>' +
      '<label for="c-name">Имя</label><input id="c-name" name="name" type="text" autocomplete="name"><div class="err" data-e="name"></div>' +
      '<label for="c-phone">Телефон</label><input id="c-phone" name="phone" type="tel" autocomplete="tel" inputmode="tel" placeholder="+7 (___) ___-__-__"><div class="err" data-e="phone"></div>' +
      '<label class="chk"><input type="checkbox" name="agree"><span>Согласен(на) на обработку персональных данных</span></label><div class="err" data-e="agree"></div>' +
      '<button class="go" type="submit">Жду звонка</button></form></div>' +
      '<div class="ok" data-view="ok" hidden><div class="tick"><svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.500l4.500 4.500L19 7.500"/></svg></div><h2>Заявка принята</h2><p class="d-sub">Мы свяжемся с вами в ближайшее время.</p><p class="demo">Это прототип: данные никуда не отправляются.</p></div>');

    search = mk('dlg-search',
      '<h2>Поиск по клинике</h2><p class="d-sub">Направление, услуга или врач.</p>' +
      '<label for="s-in" class="sr" style="position:absolute;left:-9999px">Запрос</label><input id="s-in" type="text" placeholder="Например: невролог, ФГДС, Климов" autocomplete="off"><ul class="res" id="s-res"></ul>');

    [booking, callback].forEach(function (d) {
      var f = d.querySelector('form');
      var ph = f.querySelector('[name=phone]');
      ph.addEventListener('input', function () { ph.value = fmtPhone(ph.value); });
      f.addEventListener('submit', function (e) { e.preventDefault(); submit(d, f); });
    });
    var si = search.querySelector('#s-in');
    si.addEventListener('input', function () { renderSearch(si.value); });
    search.addEventListener('close', function () { si.value = ''; });
  }

  function fmtPhone(v) {
    var d = v.replace(/\D/g, '');
    if (!d) return '';
    if (d[0] === '8') d = '7' + d.slice(1);
    if (d[0] !== '7') d = '7' + d;
    d = d.slice(0, 11);
    var o = '+7';
    if (d.length > 1) o += ' (' + d.slice(1, 4);
    if (d.length >= 4) o += ')';
    if (d.length > 4) o += ' ' + d.slice(4, 7);
    if (d.length > 7) o += '-' + d.slice(7, 9);
    if (d.length > 9) o += '-' + d.slice(9, 11);
    return o;
  }

  function submit(d, f) {
    var ok = true;
    function bad(k, m) { var e = f.querySelector('[data-e=' + k + ']'); if (e) e.textContent = m; ok = false; }
    f.querySelectorAll('.err').forEach(function (e) { e.textContent = ''; });
    var fd = new FormData(f);
    if (f.spec && !fd.get('spec')) bad('spec', 'Выберите направление или «Не знаю».');
    if ((fd.get('name') || '').trim().length < 2) bad('name', 'Введите имя.');
    if ((fd.get('phone') || '').replace(/\D/g, '').length !== 11) bad('phone', 'Введите телефон полностью — 11 цифр.');
    if (!fd.get('agree')) bad('agree', 'Нужно согласие на обработку данных.');
    if (!ok) { var first = f.querySelector('.err:not(:empty)'); if (first) { var inp = first.previousElementSibling; inp && inp.focus && inp.focus(); } return; }
    d.querySelector('[data-view=form]').hidden = true;
    var okv = d.querySelector('[data-view=ok]');
    okv.hidden = false;
    var t = okv.querySelector('[data-ok-text]');
    if (t) {
      var cl = EMS.clinics.filter(function (c) { return c.id === fd.get('clinic'); })[0];
      t.textContent = (fd.get('name').trim()) + ', мы перезвоним по номеру ' + fd.get('phone') + ' и подберём время: ' + (d._doctor ? d._doctor : (fd.get('spec') === 'Не знаю, нужна подсказка' ? 'подскажем, к какому врачу идти' : fd.get('spec'))) + (cl ? ', ' + cl.name : '') + '.';
    }
    f.reset();
  }

  function renderSearch(q) {
    var out = search.querySelector('#s-res');
    q = q.trim().toLowerCase();
    if (q.length < 2) { out.innerHTML = '<li class="hint">Начните вводить — например «неврол» или «педиатр».</li>'; return; }
    var items = [];
    EMS.specialties.adult.concat(EMS.specialties.child).forEach(function (s) { if (s.toLowerCase().indexOf(q) > -1) items.push({ k: 's', t: s, m: 'Направление', spec: s }); });
    EMS.services.forEach(function (s) { if ((s.t + ' ' + s.s).toLowerCase().indexOf(q) > -1) items.push({ k: 's', t: s.t, m: 'Услуга', spec: s.spec }); });
    EMS.doctors.forEach(function (s) { if ((s.n + ' ' + s.r).toLowerCase().indexOf(q) > -1) items.push({ k: 'd', t: s.n, m: s.r.length > 52 ? s.r.slice(0, 52) + '…' : s.r, spec: s.g, doctor: s.n, clinic: s.c.length === 1 ? s.c[0] : '' }); });
    var seen = {};
    items = items.filter(function (i) { var k = i.t + i.m; if (seen[k]) return false; seen[k] = 1; return true; }).slice(0, 12);
    out.innerHTML = items.length ? items.map(function (i, n) { return '<li><button type="button" data-i="' + n + '"><span>' + EMS.esc(i.t) + '</span><small>' + EMS.esc(i.m) + '</small></button></li>'; }).join('') :
      '<li class="hint">Ничего не нашли. Позвоните ' + EMS.phone + ' — подскажем, к кому записаться.</li>';
    out.onclick = function (e) {
      var b = e.target.closest('button[data-i]'); if (!b) return;
      var it = items[+b.getAttribute('data-i')];
      search.close();
      EMS.openBooking({ spec: it.spec, doctor: it.doctor, clinic: it.clinic });
    };
  }

  EMS.openBooking = function (o) {
    o = o || {};
    var f = booking.querySelector('form');
    booking.querySelector('[data-view=form]').hidden = false;
    booking.querySelector('[data-view=ok]').hidden = true;
    f.querySelectorAll('.err').forEach(function (e) { e.textContent = ''; });
    var sel = f.spec;
    if (o.spec) {
      var found = false;
      [].forEach.call(sel.options, function (op) { if (op.value === o.spec || op.text === o.spec) { sel.value = op.value; found = true; } });
      if (!found) {
        var op = document.createElement('option'); op.textContent = o.spec; sel.appendChild(op); sel.value = o.spec;
      }
    }
    if (o.clinic) { var r = f.querySelector('input[name=clinic][value=' + o.clinic + ']'); if (r) r.checked = true; }
    var dl = booking.querySelector('[data-doc-line]');
    dl.hidden = !o.doctor; dl.textContent = o.doctor ? 'Врач: ' + o.doctor : '';
    booking._doctor = o.doctor || '';
    if (!booking.open) booking.showModal();
    setTimeout(function () { (o.spec ? f.name : f.spec).focus(); }, 60);
  };

  EMS.toast = function (m) {
    var t = document.querySelector('.ems-toast');
    if (!t) { t = document.createElement('div'); t.className = 'ems-toast'; t.setAttribute('role', 'status'); document.body.appendChild(t); }
    t.textContent = m; t.classList.add('on');
    clearTimeout(t._t); t._t = setTimeout(function () { t.classList.remove('on'); }, 2600);
  };

  /* ---------- inline callback form (accordions, cards) ---------- */
  EMS.mountCallback = function (host, btnText) {
    var id = 'cb' + Math.random().toString(36).slice(2, 7);
    host.innerHTML = '<form class="ems-cb" novalidate>' +
      '<div class="f"><label for="' + id + 'n">Имя</label><input id="' + id + 'n" name="name" type="text" autocomplete="name" placeholder="Как к вам обращаться"><div class="err" data-e="name"></div></div>' +
      '<div class="f"><label for="' + id + 'p">Телефон</label><input id="' + id + 'p" name="phone" type="tel" autocomplete="tel" inputmode="tel" placeholder="+7 (___) ___-__-__"><div class="err" data-e="phone"></div></div>' +
      '<div class="f"><label class="chk"><input type="checkbox" name="agree"><span>Согласен(на) на обработку персональных данных</span></label><div class="err" data-e="agree"></div></div>' +
      '<button class="go" type="submit">' + (btnText || 'Жду звонка') + '</button></form>' +
      '<div class="ems-cb-ok" hidden role="status"><b>Заявка принята</b><span data-t></span><span style="opacity:.75;font-size:.875rem">Это прототип: данные никуда не отправляются.</span></div>';
    var f = host.querySelector('form'), ph = f.phone, ok = host.querySelector('.ems-cb-ok');
    ph.addEventListener('input', function () { ph.value = fmtPhone(ph.value); });
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      var good = true, fd = new FormData(f);
      f.querySelectorAll('.err').forEach(function (x) { x.textContent = ''; });
      function bad(k, m) { f.querySelector('[data-e=' + k + ']').textContent = m; good = false; }
      if ((fd.get('name') || '').trim().length < 2) bad('name', 'Введите имя.');
      if ((fd.get('phone') || '').replace(/\D/g, '').length !== 11) bad('phone', 'Введите телефон полностью — 11 цифр.');
      if (!fd.get('agree')) bad('agree', 'Нужно согласие на обработку данных.');
      if (!good) { var first = f.querySelector('.err:not(:empty)'); var i = first && first.parentNode.querySelector('input'); if (i && i.focus) i.focus(); return; }
      f.hidden = true; ok.hidden = false;
      ok.querySelector('[data-t]').textContent = fd.get('name').trim() + ', мы перезвоним по номеру ' + fd.get('phone') + '.';
    });
  };

  /* ---------- theme: light / dark, one switch for all prototypes ---------- */
  EMS.theme = function () { return document.documentElement.getAttribute('data-theme') || 'light'; };
  EMS.setTheme = function (t, save) {
    document.documentElement.setAttribute('data-theme', t);
    if (save) { try { localStorage.setItem('ems-theme', t); } catch (x) {} }
    [].forEach.call(document.querySelectorAll('[data-theme-toggle]'), function (b) {
      b.setAttribute('aria-label', t === 'dark' ? 'Включить светлую тему' : 'Включить тёмную тему');
      b.setAttribute('aria-pressed', t === 'dark');
    });
    document.dispatchEvent(new CustomEvent('themechange', { detail: t }));
  };

  /* ---------- behaviours ---------- */
  function init() {
    build();
    var mb = document.createElement('div'); mb.className = 'mbar';
    mb.innerHTML = '<a href="' + EMS.phoneHref + '" aria-label="Позвонить в клинику">' + EMS.icon('phone', 20) + 'Позвонить</a><button type="button" data-book>Записаться</button>';
    document.body.appendChild(mb);

    [].forEach.call(document.querySelectorAll('[data-theme-toggle]'), function (b) {
      b.classList.add('themebtn');
      b.innerHTML = EMS.icon('sun', 22).replace('class="ico"', 'class="ico sun"') + EMS.icon('moon', 22).replace('class="ico"', 'class="ico moon"');
    });
    EMS.setTheme(EMS.theme(), false);
    [].forEach.call(document.querySelectorAll('[data-mount-callback]'), function (h) { EMS.mountCallback(h, h.getAttribute('data-mount-callback')); });

    document.addEventListener('click', function (e) {
      var el;
      if (e.target.closest('[data-theme-toggle]')) {
        EMS.setTheme(EMS.theme() === 'dark' ? 'light' : 'dark', true);
      } else if ((el = e.target.closest('[data-book]'))) {
        e.preventDefault();
        EMS.openBooking({ spec: el.getAttribute('data-book') || '', clinic: el.getAttribute('data-clinic') || '', doctor: el.getAttribute('data-doctor') || '' });
        closeNav();
      } else if (e.target.closest('[data-callback]')) {
        e.preventDefault();
        callback.querySelector('[data-view=form]').hidden = false;
        callback.querySelector('[data-view=ok]').hidden = true;
        callback.showModal(); closeNav();
      } else if (e.target.closest('[data-search]')) {
        e.preventDefault(); search.showModal(); renderSearch(''); closeNav();
      } else if ((el = e.target.closest('[data-nav-toggle]'))) {
        var open = document.body.classList.toggle('nav-open');
        el.setAttribute('aria-expanded', open);
      } else if (e.target.closest('[data-a11y]')) {
        var on = document.documentElement.classList.toggle('a11y-big');
        try { localStorage.setItem('ems-a11y', on ? '1' : ''); } catch (x) {}
        EMS.toast(on ? 'Крупный шрифт включён' : 'Обычный шрифт');
      } else if (e.target.closest('.nav a[href^="#"]')) closeNav();
    });
    try { if (localStorage.getItem('ems-a11y')) document.documentElement.classList.add('a11y-big'); } catch (x) {}
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeNav();
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); search.showModal(); renderSearch(''); }
    });
    function closeNav() {
      document.body.classList.remove('nav-open');
      var t = document.querySelector('[data-nav-toggle]'); t && t.setAttribute('aria-expanded', 'false');
    }

    /* carousels */
    [].forEach.call(document.querySelectorAll('[data-carousel]'), function (c) {
      var tr = c.querySelector('[data-track]');
      function step(dir) { tr.scrollBy({ left: dir * Math.max(tr.clientWidth * 0.85, 240), behavior: 'smooth' }); }
      var p = c.querySelector('[data-prev]'), n = c.querySelector('[data-next]');
      p && p.addEventListener('click', function () { step(-1); });
      n && n.addEventListener('click', function () { step(1); });
      function upd() {
        if (p) p.disabled = tr.scrollLeft < 4;
        if (n) n.disabled = tr.scrollLeft + tr.clientWidth >= tr.scrollWidth - 4;
        var dots = c.querySelectorAll('[data-dots] button');
        if (dots.length) {
          var idx = Math.round(tr.scrollLeft / (tr.scrollWidth / dots.length));
          dots.forEach(function (d, i) { d.setAttribute('aria-current', i === idx ? 'true' : 'false'); });
        }
      }
      tr.addEventListener('scroll', upd, { passive: true });
      c.querySelectorAll('[data-dots] button').forEach(function (b, i, all) {
        b.addEventListener('click', function () { tr.scrollTo({ left: i * (tr.scrollWidth / all.length), behavior: 'smooth' }); });
      });
      upd(); window.addEventListener('resize', upd);
    });

    /* tabs */
    [].forEach.call(document.querySelectorAll('[data-tabs]'), function (g) {
      var tabs = g.querySelectorAll('[role=tab]');
      function sel(t) {
        tabs.forEach(function (x) {
          var on = x === t;
          x.setAttribute('aria-selected', on); x.tabIndex = on ? 0 : -1;
          var p = g.querySelector('[data-panel="' + x.getAttribute('data-tab') + '"]');
          if (p) p.hidden = !on;
        });
        g.dispatchEvent(new CustomEvent('tabchange', { detail: t.getAttribute('data-tab') }));
      }
      tabs.forEach(function (t, i) {
        t.addEventListener('click', function () { sel(t); });
        t.addEventListener('keydown', function (e) {
          var j = e.key === 'ArrowRight' ? i + 1 : e.key === 'ArrowLeft' ? i - 1 : -1;
          if (j > -1) { var nt = tabs[(j + tabs.length) % tabs.length]; nt.focus(); sel(nt); e.preventDefault(); }
        });
      });
    });

    /* filters: chips + text */
    [].forEach.call(document.querySelectorAll('[data-filter-group]'), function (g) {
      var scope = document.querySelector(g.getAttribute('data-filter-group'));
      if (!scope) return;
      var cur = 'all', q = '';
      var input = g.querySelector('input[type=search]');
      var empty = scope.querySelector('[data-empty]');
      function apply() {
        var shown = 0;
        scope.querySelectorAll('[data-cat]').forEach(function (it) {
          var okc = cur === 'all' || it.getAttribute('data-cat').split(' ').indexOf(cur) > -1;
          var okq = !q || it.textContent.toLowerCase().indexOf(q) > -1;
          it.hidden = !(okc && okq); if (!it.hidden) shown++;
        });
        if (empty) empty.hidden = shown > 0;
      }
      g.querySelectorAll('[data-filter]').forEach(function (b) {
        b.addEventListener('click', function () {
          cur = b.getAttribute('data-filter');
          g.querySelectorAll('[data-filter]').forEach(function (x) { x.setAttribute('aria-pressed', x === b); });
          apply();
        });
      });
      input && input.addEventListener('input', function () { q = input.value.trim().toLowerCase(); apply(); });
    });

    /* reveal */
    var rv = document.querySelectorAll('[data-reveal]');
    if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
      var io = new IntersectionObserver(function (es) {
        es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
      }, { threshold: 0.12 });
      rv.forEach(function (el) { io.observe(el); });
    } else rv.forEach(function (el) { el.classList.add('in'); });

    /* count-up */
    var cu = document.querySelectorAll('[data-count]');
    if (cu.length && 'IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
      var io2 = new IntersectionObserver(function (es) {
        es.forEach(function (e) {
          if (!e.isIntersecting) return;
          io2.unobserve(e.target);
          var el = e.target, to = +el.getAttribute('data-count'), t0 = performance.now(), dur = 1400;
          (function tick(t) {
            var p = Math.min(1, (t - t0) / dur), v = Math.round(to * (1 - Math.pow(1 - p, 3)));
            el.textContent = v.toLocaleString('ru-RU').replace(/ /g, ' ');
            if (p < 1) requestAnimationFrame(tick);
          })(t0);
        });
      }, { threshold: 0.4 });
      cu.forEach(function (el) { io2.observe(el); });
    }

    /* header shadow on scroll */
    var hd = document.querySelector('[data-header]');
    if (hd) {
      var onS = function () { hd.classList.toggle('stuck', window.scrollY > 8); };
      onS(); window.addEventListener('scroll', onS, { passive: true });
    }

    /* accordion: one open at a time */
    [].forEach.call(document.querySelectorAll('[data-accordion]'), function (a) {
      a.addEventListener('toggle', function (e) {
        if (e.target.open) a.querySelectorAll('details[open]').forEach(function (d) { if (d !== e.target) d.open = false; });
      }, true);
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
