import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import Wizard from "./Wizard";
declare const EMS: any;

const ic = (k: string, s = 20) => ({ __html: EMS.icon(k, s) });
const btn = "inline-flex min-h-12 items-center justify-center gap-2 rounded-lg px-5 font-semibold whitespace-nowrap";

function Reveal({ children, className = "", i = 0 }: { children: React.ReactNode; className?: string; i?: number }) {
  const reduced = useReducedMotion();
  return (
    <motion.div className={className} initial={reduced ? false : { opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.5, delay: Math.min(i, 5) * 0.06, ease: [0.23, 1, 0.32, 1] }}>
      {children}
    </motion.div>
  );
}

function useClock() {
  const [, tick] = useState(0);
  useEffect(() => { const t = setInterval(() => tick((n) => n + 1), 60000); return () => clearInterval(t); }, []);
}

export default function App() {
  useClock();
  const cb = useRef<HTMLDivElement>(null);
  useEffect(() => { if (cb.current && !cb.current.firstChild) EMS.mountCallback(cb.current, "Жду звонка"); }, []);
  const [theme, setTheme] = useState(EMS.theme());
  const toggle = () => { const n = theme === "dark" ? "light" : "dark"; EMS.setTheme(n, true); setTheme(n); };

  const D = EMS.doctors as any[];
  const nA = D.filter((d) => d.k !== "child").length, nK = D.filter((d) => d.k !== "adult").length;
  const [group, setGroup] = useState("");
  const [limit, setLimit] = useState(8);
  const [allPromos, setAllPromos] = useState(false);
  const list = useMemo(() => D.filter((d) => !group || d.g === group), [group]);
  const promos = allPromos ? EMS.promos : EMS.promos.slice(0, 6);

  const tiles = [
    { c: "bg-action text-white md:col-span-1", t: "Взрослым", d: `${nA} врачей: терапия, неврология, кардиология, гинекология и другие направления.`, spec: "Терапия", cta: "Записаться" },
    { c: "bg-brand text-[var(--on-brand)]", t: "Детям", d: `${nK} врачей: педиатры и детские специалисты.`, spec: "Педиатрия", cta: "Записаться" },
    { c: "bg-ink text-bg", t: "Анализы и УЗИ", d: "Лаборатория, УЗИ, рентген, функциональная диагностика.", spec: "Анализы", cta: "Записаться" },
    { c: "bg-soft", t: "Травма", d: "Травмпункт и рентген на Парке Победы работают круглосуточно.", spec: "Травматология и ортопедия", clinic: "pobedy", cta: "Записаться" },
    { c: "bg-soft", t: "Вызов врача на дом", d: "Терапевт или педиатр приедет к вам.", spec: "Вызов врача на дом", cta: "Вызвать" },
    { c: "bg-soft", t: "Онлайн-консультация", d: "Врач на связи без поездки в клинику.", spec: "Онлайн-консультация", cta: "Записаться" },
  ];

  return (
    <>
      <a href="#main" className="absolute -left-[9999px] top-2 z-[100] bg-ink px-4 py-3 text-bg focus:left-2">К основному содержимому</a>
      <header className="sticky top-0 z-50 border-b border-line bg-bg">
        <div className="mx-auto flex min-h-[72px] max-w-[1160px] items-center gap-4 px-4">
          <a href="#" className="mr-auto" aria-label="EMS Family Clinic, на главную"><img src={EMS.logo} alt="EMS Family Clinic" height={40} className="h-10 w-auto" /></a>
          <nav aria-label="Основная" className="hidden gap-6 text-[15px] text-muted lg:flex">
            {[["#services", "Подбор"], ["#promo", "Акции"], ["#doctors", "Врачи"], ["#clinics", "Клиники"], ["#reviews", "Отзывы"]].map(([h, t]) => <a key={h} href={h} className="py-3 hover:text-ink">{t}</a>)}
          </nav>
          <button type="button" data-search aria-label="Поиск по клинике" className="grid size-11 place-items-center rounded-full hover:bg-soft" dangerouslySetInnerHTML={ic("search", 22)} />
          <button type="button" onClick={toggle} aria-label="Сменить тему" className="themebtn grid size-11 place-items-center rounded-full hover:bg-soft"
            dangerouslySetInnerHTML={{ __html: EMS.icon("sun", 22).replace('class="ico"', 'class="ico sun"') + EMS.icon("moon", 22).replace('class="ico"', 'class="ico moon"') }} />
          <a href={EMS.phoneHref} className="hidden whitespace-nowrap font-semibold sm:block">{EMS.phone}</a>
          <button type="button" data-book className={`${btn} hidden bg-action text-white hover:brightness-90 md:inline-flex`}>Записаться онлайн</button>
        </div>
      </header>

      <main id="main">
        <div id="services" className="mx-auto grid max-w-[1160px] items-start gap-10 px-4 py-12 lg:grid-cols-[1.05fr_1fr] lg:gap-14 lg:py-[72px]">
          <Reveal>
            <h1 className="text-[clamp(1.875rem,4.2vw,3.25rem)]">Что беспокоит? Подберём врача</h1>
            <p className="my-5 max-w-[44ch] text-[1.1875rem] text-muted">Три вопроса, и вы увидите врача из нашей клиники и кнопку записи. Не знаете, что выбрать, позвоните, подскажем.</p>
            <div className="flex flex-wrap gap-2.5" aria-label="Статус клиник">
              {EMS.clinics.map((c: any) => { const s = EMS.status(c.id); const n = c.name.replace("EMS на ", ""); return (
                <span key={c.id} className="inline-flex min-h-11 items-center gap-2.5 rounded-full border border-line px-4 text-[15px]">
                  <span className={`size-2 rounded-full ${s.open ? "bg-brand" : "bg-[#B08A2E]"}`} />{n[0].toUpperCase() + n.slice(1)}: {s.label}
                </span>); })}
            </div>
            <p className="mt-5 text-[15px] text-muted">Нужна помощь сейчас? Позвоните <a className="font-semibold text-ink underline" href={EMS.phoneHref}>{EMS.phone}</a> или <a href="#" data-callback className="font-semibold text-ink underline">закажите обратный звонок</a>.</p>
          </Reveal>
          <Reveal i={1}><Wizard /></Reveal>
        </div>

        <div className="mx-auto grid max-w-[1160px] gap-3.5 px-4 pb-20 md:grid-cols-3">
          {tiles.map((t, i) => (
            <Reveal key={t.t} i={i}>
              <button type="button" data-book={t.spec} data-clinic={t.clinic ?? ""} className={`${t.c} flex min-h-[200px] w-full flex-col justify-between gap-6 rounded-2xl p-6 text-left hover:brightness-105`}>
                <span><h3 className="text-[1.375rem]">{t.t}</h3><span className="mt-2 block opacity-90">{t.d}</span></span>
                <span className="inline-flex items-center gap-2 font-semibold">{t.cta}<span dangerouslySetInnerHTML={ic("arrow", 18)} /></span>
              </button>
            </Reveal>))}
        </div>

        <section id="promo" className="border-t border-line py-16 md:py-[72px]">
          <div className="mx-auto max-w-[1160px] px-4">
            <h2 className="text-[clamp(1.5rem,3vw,1.875rem)]">Акции</h2>
            <p className="mb-8 mt-1.5 text-muted">Действуют до {EMS.promoUntil}. Условия и исключения уточняйте у администратора.</p>
            <div className="grid border-l border-t border-line md:grid-cols-2 lg:grid-cols-3">
              {promos.map((p: any) => (
                <button key={p.t} type="button" data-book={p.spec ?? ""} data-clinic={p.cl?.length === 1 ? p.cl[0] : ""}
                  className="flex flex-col justify-between gap-4 border-b border-r border-line p-5 text-left hover:bg-soft">
                  <span><b className="font-semibold">{p.t}</b><small className="mt-1 block text-muted">{(p.cl ?? []).map((id: string) => EMS.clinic(id)?.name.replace("EMS на ", "")).join(", ")}</small></span>
                  <span className="flex flex-wrap items-baseline gap-2.5">
                    {p.now ? <><strong className="font-display text-[1.375rem]">{p.now} ₽</strong>{p.was && <s className="text-muted">{p.was} ₽</s>}</> : <span className="font-semibold text-brand">{p.off}</span>}
                  </span>
                </button>))}
            </div>
            {EMS.promos.length > 6 && <button type="button" onClick={() => setAllPromos(!allPromos)} className={`${btn} mt-6 border-[1.5px] border-ink`}>{allPromos ? "Свернуть" : `Показать все акции (${EMS.promos.length})`}</button>}
          </div>
        </section>

        <section id="doctors" className="border-t border-line py-16 md:py-[72px]">
          <div className="mx-auto max-w-[1160px] px-4">
            <h2 className="text-[clamp(1.5rem,3vw,1.875rem)]">{group || `${D.length} врачей в двух клиниках`}</h2>
            <p className="mb-8 mt-1.5 text-muted">Фото и данные врачей с сайта клиники. Выберите направление.</p>
            <div className="mb-7 flex flex-wrap gap-2" role="group" aria-label="Направление врача">
              {[{ g: "", n: D.length }, ...EMS.groups.slice(0, 9)].map((g: any) => (
                <button key={g.g} type="button" aria-pressed={group === g.g} onClick={() => { setGroup(g.g); setLimit(8); }}
                  className={`min-h-11 rounded-full border px-4 text-[15px] font-medium ${group === g.g ? "border-ink bg-ink text-bg" : "border-line hover:border-ink"}`}>{g.g || "Все"} ({g.n})</button>))}
            </div>
            <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
              {list.slice(0, limit).map((d, i) => (
                <Reveal key={d.u} i={i % 4} className="flex flex-col gap-3">
                  <div className="grid aspect-square place-items-center overflow-hidden rounded-xl bg-soft font-display text-2xl text-muted">
                    <img src={d.thumb} alt="" loading="lazy" className="size-full object-cover" onError={(e) => { (e.target as HTMLImageElement).replaceWith(document.createTextNode(EMS.initials(d.n))); }} />
                  </div>
                  <div><b className="block font-semibold leading-snug">{d.n}</b><small className="line-clamp-3 text-sm leading-snug text-muted">{d.r}</small></div>
                  <button type="button" data-book="" data-doctor={d.n} data-clinic={d.c.length === 1 ? d.c[0] : ""} className={`${btn} mt-auto min-h-11 border-[1.5px] border-ink`}>Записаться</button>
                </Reveal>))}
            </div>
            {list.length > limit && <button type="button" onClick={() => setLimit(limit + 8)} className={`${btn} mt-6 border-[1.5px] border-ink`}>Показать ещё ({list.length - limit})</button>}
          </div>
        </section>

        <section id="clinics" className="border-t border-line py-16 md:py-[72px]">
          <div className="mx-auto max-w-[1160px] px-4">
            <h2 className="text-[clamp(1.5rem,3vw,1.875rem)]">Две клиники</h2>
            <p className="mb-8 mt-1.5 text-muted">Обе работают ежедневно с 8:00 до 22:00.</p>
            <div className="grid gap-6 md:grid-cols-2">
              {EMS.clinics.map((c: any) => { const s = EMS.status(c.id); const pic = c.id === "udelnaya" ? "../udelny-park-panoramio.jpg" : "../saint-petersburg-moskovsky-victory-park.jpg"; return (
                <Reveal key={c.id} className="flex flex-col">
                  <div className="aspect-[16/10] overflow-hidden rounded-2xl bg-soft"><img src={pic} alt={`Район клиники: ${c.name}`} loading="lazy" className="size-full object-cover" /></div>
                  <h3 className="mb-2 mt-5 text-[1.375rem]">{c.name}</h3>
                  <dl className="mb-5 grid grid-cols-[96px_1fr] gap-x-4 gap-y-2 sm:grid-cols-[110px_1fr]">
                    <dt className="text-muted">Адрес</dt><dd>{c.address} ({c.district})</dd>
                    {c.metro && <><dt className="text-muted">Метро</dt><dd>{c.metro}</dd></>}
                    <dt className="text-muted">Травмпункт</dt><dd>{c.trauma.replace(/^Травмпункт( и рентген)? работа(ет|ют) /, "").replace(/^./, (m: string) => m.toUpperCase())}</dd>
                    <dt className="text-muted">Сейчас</dt><dd>{s.label}</dd>
                  </dl>
                  <div className="mt-auto flex flex-wrap gap-2.5">
                    <button type="button" data-book="" data-clinic={c.id} className={`${btn} bg-action text-white hover:brightness-90`}>Записаться сюда</button>
                    <a href={c.map} className={`${btn} border-[1.5px] border-ink`}>Как проехать</a>
                  </div>
                </Reveal>); })}
            </div>
            <div className="mt-12 grid grid-cols-2 gap-5 border-t border-line pt-7 md:grid-cols-4">
              {EMS.stats.map((s: any) => <div key={s.t}><b className="block font-display text-2xl">{s.pre ?? ""}{s.v}</b><span className="text-[15px] text-muted">{s.t}</span></div>)}
            </div>
            <p className="mt-7 text-[13px] text-muted">Фотографии: <a className="underline" href="https://commons.wikimedia.org/wiki/File:Saint_Petersburg._Moskovsky_Victory_Park.jpg">«Saint Petersburg. Moskovsky Victory Park»</a>, Bestalex, CC BY-SA 4.0; <a className="underline" href="https://commons.wikimedia.org/wiki/File:Udelny_Park_-_panoramio.jpg">«Udelny Park»</a>, Wikimedia Commons. Фото врачей: emsclinic.ru.</p>
          </div>
        </section>

        <section id="reviews" className="border-t border-line py-16 md:py-[72px]">
          <div className="mx-auto max-w-[1160px] px-4">
            <h2 className="text-[clamp(1.5rem,3vw,1.875rem)]">Отзывы пациентов</h2>
            <p className="mb-8 mt-1.5 text-muted">Отзывы с сайта клиники, тексты сокращены только по длине.</p>
            <div className="grid gap-8 md:grid-cols-3">
              {EMS.reviews.slice(0, 3).map((r: any, i: number) => (
                <Reveal key={r.u} i={i}><figure className="m-0 border-t-2 border-ink pt-4"><p className="mb-3.5 line-clamp-6">{r.t}</p><figcaption className="text-muted"><small>{r.a}, врач {r.d}</small></figcaption></figure></Reveal>))}
            </div>
          </div>
        </section>

        <section className="bg-soft py-16 md:py-[72px]" id="call">
          <div className="mx-auto grid max-w-[1160px] gap-10 px-4 md:grid-cols-2">
            <div><h2 className="text-[clamp(1.5rem,3vw,1.875rem)]">Перезвоним вам</h2><p className="mt-3.5 max-w-[44ch] text-muted">Оставьте номер, и администратор перезвонит в рабочее время, с 8:00 до 22:00. Форма в прототипе ничего не отправляет.</p></div>
            <div ref={cb} />
          </div>
        </section>
      </main>

      <footer className="border-t border-line py-10 text-[15px] text-muted">
        <div className="mx-auto flex max-w-[1160px] flex-wrap justify-between gap-5 px-4">
          <span>ООО «Единые Медицинские Системы». Лицензии, реквизиты и политика данных на emsclinic.ru. Прототип дизайна, не сайт клиники.</span>
          <span><a className="text-ink" href={EMS.phoneHref}>{EMS.phone}</a> &nbsp; <a className="text-ink" href={`mailto:${EMS.email}`}>{EMS.email}</a></span>
        </div>
      </footer>
    </>
  );
}
