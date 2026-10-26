// Каркас: «Wizard Steps» (ddoemonn, 21st.dev): рейка шагов, переходы по направлению, клавиатура, prefers-reduced-motion.
// Содержимое и логика подбора написаны под данные EMS.
import { useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
declare const EMS: any;

const EASE = [0.23, 1, 0.32, 1] as const;
const RAIL = { type: "spring", stiffness: 520, damping: 40, mass: 0.5 } as const;

type Q = { id: string; title: string; options: { v: string; t: string; s?: string }[] };

const QUESTIONS: Q[] = [
  { id: "who", title: "Для кого приём?", options: [
    { v: "adult", t: "Для себя", s: "Взрослый приём" },
    { v: "kid", t: "Для ребёнка", s: "Педиатры и детские врачи" },
  ]},
  { id: "need", title: "Что нужно сейчас?", options: [] },
  { id: "where", title: "Где удобнее?", options: [
    { v: "", t: "Неважно", s: "Покажем обе клиники" },
    { v: "udelnaya", t: "Удельная", s: "пр. Энгельса, 61 к. 2" },
    { v: "pobedy", t: "Парк Победы", s: "ул. Победы, 17" },
  ]},
];

type Need = { t: string; s: string; spec: string; g: string; clinic?: string };
const NEEDS: Record<string, Need[]> = {
  adult: [
    { t: "Консультация врача", s: "Терапевт, узкие специалисты", spec: "Терапия", g: "Терапия и семейная медицина" },
    { t: "Голова, спина, суставы", s: "Невролог", spec: "Неврология", g: "Неврология" },
    { t: "Анализы и УЗИ", s: "Лаборатория и диагностика", spec: "Анализы", g: "Диагностика" },
    { t: "Травма", s: "Травмпункт круглосуточно на Победы", spec: "Травматология и ортопедия", g: "Травматология и ортопедия", clinic: "pobedy" },
    { t: "Справка", s: "Бассейн, вуз, санаторий", spec: "Справки", g: "" },
  ],
  kid: [
    { t: "Педиатр", s: "Осмотр и наблюдение", spec: "Педиатрия", g: "Педиатрия" },
    { t: "Детский специалист", s: "Невролог, ЛОР, аллерголог", spec: "Не знаю, нужна подсказка", g: "Педиатрия" },
    { t: "Прививки", s: "Допуск врача и вакцинация", spec: "Вакцинация", g: "" },
    { t: "Справка в сад или школу", s: "Медосмотр", spec: "Справки", g: "" },
  ],
};

export default function Wizard() {
  const reduced = useReducedMotion();
  const [at, setAt] = useState(0);
  const [dir, setDir] = useState<1 | -1>(1);
  const [ans, setAns] = useState<Record<string, any>>({});
  const viewport = useRef<HTMLDivElement>(null);
  const total = 4; // три вопроса и результат

  const go = (to: number) => { setDir(to > at ? 1 : -1); setAt(to); requestAnimationFrame(() => viewport.current?.focus({ preventScroll: true })); };
  const reset = () => { setAns({}); setDir(-1); setAt(0); };

  const variants = {
    enter: (d: number) => (reduced ? { opacity: 0 } : { opacity: 0, x: d * 22 }),
    center: reduced ? { opacity: 1 } : { opacity: 1, x: 0 },
    exit: (d: number) => (reduced ? { opacity: 0, transition: { duration: 0 } } : { opacity: 0, x: d * -22, transition: { duration: 0.14 } }),
  };

  const need: Need | undefined = ans.need;
  const clinic = ans.where ?? need?.clinic ?? "";
  const doctor = at === 3 && need ? pickDoctor(ans.who, need, clinic) : null;

  const Opt = ({ t, s, onClick }: { t: string; s?: string; onClick: () => void }) => (
    <button type="button" onClick={onClick}
      className="group flex min-h-14 w-full items-center justify-between gap-3 rounded-lg border-[1.5px] border-line bg-bg px-4 py-3 text-left font-medium transition-[transform,border-color,background-color] duration-200 ease-out hover:border-ink hover:bg-soft active:scale-[0.98]">
      <span>{t}{s && <small className="block text-sm font-normal text-muted">{s}</small>}</span>
      <span aria-hidden className="opacity-50 transition-[transform,opacity] duration-200 group-hover:translate-x-1 group-hover:opacity-100" dangerouslySetInnerHTML={{ __html: EMS.icon("arrow", 18) }} />
    </button>
  );

  return (
    <div className="rounded-2xl border border-line bg-bg p-5 sm:p-7">
      <p aria-live="polite" className="sr-only">Шаг {at + 1} из {total}</p>
      <ol aria-label="Шаги подбора" className="mb-5 flex list-none items-center gap-1 p-0">
        {Array.from({ length: total }).map((_, i) => {
          const done = i < at, here = i === at;
          return (
            <li key={i} className="flex flex-1 items-center gap-1 last:flex-none">
              <motion.span aria-hidden initial={false} animate={{ scale: here ? 1 : 0.92 }} transition={reduced ? { duration: 0 } : RAIL}
                className={`grid size-8 place-items-center rounded-lg border text-xs font-semibold tabular-nums ${done ? "border-ink bg-ink text-bg" : here ? "border-action bg-bg text-ink" : "border-line text-muted"}`}>
                {done ? "✓" : i + 1}
              </motion.span>
              {i < total - 1 && (
                <span aria-hidden className="relative h-[3px] flex-1 overflow-hidden rounded bg-line">
                  <motion.span className="absolute inset-0 origin-left bg-ink" initial={false} animate={{ scaleX: i < at ? 1 : 0 }} transition={reduced ? { duration: 0 } : RAIL} />
                </span>
              )}
            </li>
          );
        })}
      </ol>

      <div ref={viewport} tabIndex={-1} role="group" aria-label={`Шаг ${at + 1} из ${total}`} className="relative min-h-[340px] overflow-hidden outline-none">
        <AnimatePresence initial={false} custom={dir} mode="popLayout">
          <motion.div key={at} custom={dir} variants={variants} initial="enter" animate="center" exit="exit"
            transition={reduced ? { duration: 0 } : { duration: 0.28, ease: EASE }}>
            {at < 3 ? (
              <>
                <h2 className="mb-4 text-xl">{QUESTIONS[at].title}</h2>
                <div className="grid gap-2.5">
                  {(at === 1 ? NEEDS[ans.who ?? "adult"].map((n) => ({ v: n.t, t: n.t, s: n.s })) : QUESTIONS[at].options).map((o) => (
                    <Opt key={o.v + o.t} t={o.t} s={o.s} onClick={() => {
                      if (at === 0) setAns({ who: o.v });
                      if (at === 1) setAns((a) => ({ ...a, need: NEEDS[a.who].find((n) => n.t === o.t) }));
                      if (at === 2) setAns((a) => ({ ...a, where: o.v }));
                      go(at + 1);
                    }} />
                  ))}
                </div>
                {at > 0 && <button type="button" onClick={() => go(at - 1)} className="mt-3 min-h-11 text-muted underline underline-offset-4">Назад</button>}
              </>
            ) : need && (
              <>
                <p className="text-sm text-muted">Вам подойдёт</p>
                <h2 className="mt-1 text-xl">{need.t}</h2>
                {doctor ? (
                  <div className="mt-4 flex items-center gap-4 rounded-xl bg-soft p-4">
                    <img src={doctor.thumb} alt="" className="size-20 rounded-lg object-cover" onError={(e) => ((e.target as HTMLImageElement).style.visibility = "hidden")} />
                    <div>
                      <b className="font-semibold leading-snug">{doctor.n}</b>
                      <p className="line-clamp-2 text-sm text-muted">{doctor.r}</p>
                      <p className="mt-1 text-sm">{doctor.c.map((id: string) => EMS.clinic(id).name.replace("EMS на ", "")).join(", ")}</p>
                    </div>
                  </div>
                ) : <p className="mt-3 text-muted">Администратор подберёт врача и время при записи.</p>}
                <div className="mt-5 flex flex-wrap gap-2.5">
                  <button type="button" data-book={need.spec} data-clinic={clinic} data-doctor={doctor?.n ?? ""}
                    className="group inline-flex min-h-12 items-center gap-2 rounded-lg bg-action px-6 font-semibold text-white transition-[transform,filter,box-shadow] duration-200 hover:-translate-y-0.5 hover:brightness-95 hover:shadow-[0_10px_22px_-10px_rgba(216,38,28,0.75)] active:scale-[0.97]">Записаться</button>
                  <a href="#doctors" className="inline-flex min-h-12 items-center rounded-lg border-[1.5px] border-ink px-6 font-semibold transition-[background-color,color,transform] duration-200 hover:bg-ink hover:text-bg active:scale-[0.97]">Все врачи</a>
                </div>
                <button type="button" onClick={reset} className="mt-3 min-h-11 text-muted underline underline-offset-4">Начать заново</button>
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function pickDoctor(who: string, need: Need, clinic: string) {
  if (!need.g) return null;
  const ok = (d: any) => d.g === need.g && (who === "kid" ? d.k !== "adult" : d.k !== "child") && (!clinic || d.c.includes(clinic));
  return EMS.doctors.find(ok) ?? null;
}
