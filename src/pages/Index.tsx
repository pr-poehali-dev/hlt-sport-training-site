import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

// ── useInView hook ───────────────────────────────────────────
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

// ── Data ─────────────────────────────────────────────────────
const NAV_LINKS = [
  { label: "Главная", href: "#hero" },
  { label: "Программы", href: "#programs" },
  { label: "Тренеры", href: "#trainers" },
  { label: "Расписание", href: "#schedule" },
  { label: "Результаты", href: "#results" },
  { label: "Блог", href: "#blog" },
  { label: "О нас", href: "#about" },
  { label: "Контакты", href: "#contacts" },
];

const PROGRAMS = [
  { icon: "Zap", name: "HLT БАЗОВЫЙ", desc: "Основы высокоинтенсивного тренинга. Силовые паттерны, кардио и функциональная работа.", sessions: "3 занятия / нед", level: "Начинающий", price: "4 900 ₽" },
  { icon: "Flame", name: "HLT PRO", desc: "Продвинутый уровень. Периодизация нагрузок, работа с весом и скоростные тренировки.", sessions: "4 занятия / нед", level: "Продвинутый", price: "7 900 ₽", featured: true },
  { icon: "Trophy", name: "HLT ELITE", desc: "Индивидуальная программа под ваши цели. Личный тренер, нутрициология, контроль прогресса.", sessions: "5+ занятий / нед", level: "Элита", price: "14 900 ₽" },
  { icon: "Users", name: "ГРУППОВЫЕ", desc: "Тренировки в малых группах до 8 человек. Командный дух и профессиональное сопровождение.", sessions: "По расписанию", level: "Любой", price: "3 400 ₽" },
];

const TRAINERS = [
  { name: "Алексей Громов", role: "Силовой тренинг / CrossFit", exp: "12 лет опыта", certs: "NSCA, FMS Level 2", img: "https://cdn.poehali.dev/projects/715a3a09-5f8e-4784-8b1a-7ce9264f6f9e/files/3ab74497-d52b-4dca-96f6-2358e9aa58d8.jpg" },
  { name: "Марина Соколова", role: "Функциональный фитнес / HIIT", exp: "8 лет опыта", certs: "ACE, TRX Master", img: "https://cdn.poehali.dev/projects/715a3a09-5f8e-4784-8b1a-7ce9264f6f9e/files/3ab74497-d52b-4dca-96f6-2358e9aa58d8.jpg" },
  { name: "Дмитрий Волков", role: "Кардио / Выносливость", exp: "10 лет опыта", certs: "ISSA, Kettlebell Pro", img: "https://cdn.poehali.dev/projects/715a3a09-5f8e-4784-8b1a-7ce9264f6f9e/files/3ab74497-d52b-4dca-96f6-2358e9aa58d8.jpg" },
];

const SCHEDULE = [
  { day: "ПН", time: "07:00", name: "HLT БАЗОВЫЙ", trainer: "А. Громов", spots: 3 },
  { day: "ПН", time: "19:00", name: "HLT PRO", trainer: "М. Соколова", spots: 0 },
  { day: "ВТ", time: "08:00", name: "ГРУППОВЫЕ", trainer: "Д. Волков", spots: 5 },
  { day: "ВТ", time: "18:30", name: "HLT ELITE", trainer: "А. Громов", spots: 2 },
  { day: "СР", time: "07:00", name: "HLT PRO", trainer: "М. Соколова", spots: 4 },
  { day: "СР", time: "20:00", name: "HLT БАЗОВЫЙ", trainer: "Д. Волков", spots: 6 },
  { day: "ЧТ", time: "08:00", name: "ГРУППОВЫЕ", trainer: "А. Громов", spots: 0 },
  { day: "ЧТ", time: "19:00", name: "HLT PRO", trainer: "М. Соколова", spots: 1 },
  { day: "ПТ", time: "07:00", name: "HLT ELITE", trainer: "Д. Волков", spots: 3 },
  { day: "ПТ", time: "18:00", name: "HLT БАЗОВЫЙ", trainer: "А. Громов", spots: 7 },
  { day: "СБ", time: "10:00", name: "HLT PRO", trainer: "М. Соколова", spots: 2 },
  { day: "СБ", time: "12:00", name: "ГРУППОВЫЕ", trainer: "Д. Волков", spots: 4 },
];

const STATS = [
  { value: "2 400+", label: "Клиентов обучено" },
  { value: "98%", label: "Достигли своих целей" },
  { value: "15", label: "Тренеров в команде" },
  { value: "8", label: "Лет на рынке" },
];

const BLOG_POSTS = [
  { tag: "Питание", title: "Протокол питания до и после HLT тренировки: что реально работает", date: "05 мая 2026", read: "5 мин" },
  { tag: "Методика", title: "Почему 45 минут интенсивной работы эффективнее 2 часов в зале", date: "28 апр 2026", read: "7 мин" },
  { tag: "Результаты", title: "Кейс: минус 18 кг за 90 дней без кардио и голодовок", date: "20 апр 2026", read: "4 мин" },
];

const TICKER_ITEMS = ["ВЫСОКОИНТЕНСИВНЫЙ ТРЕНИНГ", "РЕАЛЬНЫЕ РЕЗУЛЬТАТЫ", "ПРОФЕССИОНАЛЬНАЯ КОМАНДА", "СИСТЕМНЫЙ ПОДХОД", "ВАШЕ ТЕЛО — ВАШ ПРОЕКТ", "ЗАПИШИСЬ СЕЙЧАС"];

// ── Components ───────────────────────────────────────────────
function SectionLabel({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <div className="w-8 h-0.5 bg-hlt-orange" />
      <span className="font-display text-hlt-orange text-sm tracking-[0.2em] uppercase">{text}</span>
    </div>
  );
}

function BookingModal({ session, onClose }: { session: typeof SCHEDULE[0] | null; onClose: () => void }) {
  const [form, setForm] = useState({ name: "", phone: "", email: "" });
  if (!session) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-hlt-card border border-hlt-border rounded-lg p-8 max-w-md w-full" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-start mb-6">
          <div>
            <h3 className="font-display text-2xl text-hlt-white">{session.name}</h3>
            <p className="text-hlt-gray text-sm mt-1">{session.day} · {session.time} · {session.trainer}</p>
          </div>
          <button onClick={onClose} className="text-hlt-gray hover:text-hlt-white transition-colors">
            <Icon name="X" size={20} />
          </button>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-xs text-hlt-gray uppercase tracking-wider mb-2 font-display">Имя</label>
            <input
              type="text"
              placeholder="Ваше имя"
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              className="w-full bg-background border border-hlt-border rounded px-4 py-3 text-hlt-white placeholder:text-hlt-gray/50 focus:outline-none focus:border-hlt-orange transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs text-hlt-gray uppercase tracking-wider mb-2 font-display">Телефон</label>
            <input
              type="tel"
              placeholder="+7 (000) 000-00-00"
              value={form.phone}
              onChange={e => setForm({ ...form, phone: e.target.value })}
              className="w-full bg-background border border-hlt-border rounded px-4 py-3 text-hlt-white placeholder:text-hlt-gray/50 focus:outline-none focus:border-hlt-orange transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs text-hlt-gray uppercase tracking-wider mb-2 font-display">Email</label>
            <input
              type="email"
              placeholder="your@email.com"
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
              className="w-full bg-background border border-hlt-border rounded px-4 py-3 text-hlt-white placeholder:text-hlt-gray/50 focus:outline-none focus:border-hlt-orange transition-colors"
            />
          </div>
          <button className="btn-primary w-full py-4 rounded mt-2 text-sm">
            Подтвердить запись
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Main Page ────────────────────────────────────────────────
export default function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [bookingSession, setBookingSession] = useState<typeof SCHEDULE[0] | null>(null);
  const [activeDay, setActiveDay] = useState("ПН");

  const days = [...new Set(SCHEDULE.map(s => s.day))];
  const filteredSchedule = SCHEDULE.filter(s => s.day === activeDay);

  const hero = useInView(0.1);
  const programs = useInView(0.1);
  const trainers = useInView(0.1);
  const scheduleSection = useInView(0.1);
  const results = useInView(0.1);
  const blog = useInView(0.1);
  const about = useInView(0.1);
  const contacts = useInView(0.1);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">

      {/* ── NAV ──────────────────────────────────────── */}
      <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${scrolled ? "bg-background/95 backdrop-blur border-b border-hlt-border" : "bg-transparent"}`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="#hero" onClick={e => { e.preventDefault(); scrollTo("#hero"); }} className="font-display text-2xl text-hlt-white tracking-[0.15em]">
            H<span className="text-hlt-orange">L</span>T
          </a>
          <nav className="hidden lg:flex items-center gap-7">
            {NAV_LINKS.map(link => (
              <a
                key={link.href}
                href={link.href}
                onClick={e => { e.preventDefault(); scrollTo(link.href); }}
                className="font-display text-xs tracking-[0.12em] text-hlt-gray hover:text-hlt-orange transition-colors uppercase"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <button
            className="btn-primary hidden lg:block px-6 py-2.5 rounded text-xs"
            onClick={() => scrollTo("#schedule")}
          >
            Записаться
          </button>
          <button className="lg:hidden text-hlt-white" onClick={() => setMenuOpen(!menuOpen)}>
            <Icon name={menuOpen ? "X" : "Menu"} size={24} />
          </button>
        </div>

        {menuOpen && (
          <div className="lg:hidden bg-hlt-card border-t border-hlt-border px-6 py-6 flex flex-col gap-4">
            {NAV_LINKS.map(link => (
              <a
                key={link.href}
                href={link.href}
                onClick={e => { e.preventDefault(); scrollTo(link.href); }}
                className="font-display text-sm tracking-[0.12em] text-hlt-gray hover:text-hlt-orange transition-colors uppercase py-1"
              >
                {link.label}
              </a>
            ))}
            <button className="btn-primary py-3 rounded text-sm mt-2" onClick={() => { scrollTo("#schedule"); setMenuOpen(false); }}>
              Записаться
            </button>
          </div>
        )}
      </header>

      {/* ── HERO ─────────────────────────────────────── */}
      <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://cdn.poehali.dev/projects/715a3a09-5f8e-4784-8b1a-7ce9264f6f9e/files/0102e69e-2ab8-4441-bd2d-37e0c1fa363f.jpg"
            alt="HLT Training"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </div>

        <div ref={hero.ref} className="relative z-10 max-w-7xl mx-auto px-6 pt-28 pb-20">
          <div className={`max-w-3xl ${hero.inView ? "animate-fade-in-up" : "opacity-0"}`}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-0.5 bg-hlt-orange" />
              <span className="font-display text-hlt-orange text-sm tracking-[0.25em] uppercase">High Level Training</span>
            </div>
            <h1 className="font-display text-[clamp(3.5rem,9vw,7rem)] leading-[0.9] text-hlt-white mb-8">
              ТВОЙ<br />
              ПРЕДЕЛ —<br />
              <span className="text-gradient">ВЫШЕ</span>
            </h1>
            <p className="font-body text-hlt-gray text-lg leading-relaxed max-w-xl mb-10">
              Высокоинтенсивные тренировки для тех, кто не останавливается на половине пути.
              Профессиональные тренеры, системный подход, реальные результаты.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="btn-primary px-8 py-4 rounded text-sm" onClick={() => scrollTo("#schedule")}>
                Записаться на тренировку
              </button>
              <button className="btn-outline px-8 py-4 rounded text-sm" onClick={() => scrollTo("#programs")}>
                Программы
              </button>
            </div>
          </div>

          <div className={`mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl ${hero.inView ? "animate-fade-in-up delay-400" : "opacity-0"}`}>
            {STATS.map(s => (
              <div key={s.label} className="border-l border-hlt-orange pl-4">
                <div className="font-display text-3xl text-hlt-white">{s.value}</div>
                <div className="font-body text-hlt-gray text-xs mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-hlt-gray/50">
          <Icon name="ChevronDown" size={20} />
        </div>
      </section>

      {/* ── TICKER ───────────────────────────────────── */}
      <div className="bg-hlt-orange py-3 overflow-hidden">
        <div className="flex animate-ticker whitespace-nowrap">
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <span key={i} className="font-display text-sm tracking-[0.2em] text-hlt-dark px-8">
              {item} <span className="mx-2">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── PROGRAMS ─────────────────────────────────── */}
      <section id="programs" className="py-24 px-6">
        <div ref={programs.ref} className="max-w-7xl mx-auto">
          <div className={`mb-14 ${programs.inView ? "animate-fade-in-up" : "opacity-0"}`}>
            <SectionLabel text="Наши программы" />
            <h2 className="font-display text-5xl md:text-6xl text-hlt-white">ВЫБЕРИТЕ<br />СВОЙ УРОВЕНЬ</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {PROGRAMS.map((p, i) => (
              <div
                key={p.name}
                className={`relative border rounded-lg p-6 card-hover cursor-pointer ${
                  p.featured
                    ? "border-hlt-orange bg-gradient-to-b from-hlt-orange/10 to-hlt-card"
                    : "border-hlt-border bg-hlt-card"
                } ${programs.inView ? `animate-fade-in-up delay-${(i + 1) * 100}` : "opacity-0"}`}
              >
                {p.featured && (
                  <div className="absolute -top-3 left-6">
                    <span className="bg-hlt-orange text-hlt-dark font-display text-xs px-3 py-1 rounded tracking-wider">
                      ПОПУЛЯРНЫЙ
                    </span>
                  </div>
                )}
                <div className="w-12 h-12 rounded-lg bg-hlt-orange/10 flex items-center justify-center mb-5">
                  <Icon name={p.icon as "Zap"} size={22} className="text-hlt-orange" />
                </div>
                <h3 className="font-display text-xl text-hlt-white mb-3">{p.name}</h3>
                <p className="font-body text-hlt-gray text-sm leading-relaxed mb-5">{p.desc}</p>
                <div className="space-y-2 mb-6">
                  <div className="flex items-center gap-2 text-xs text-hlt-gray">
                    <Icon name="Calendar" size={13} className="text-hlt-orange" />
                    <span>{p.sessions}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-hlt-gray">
                    <Icon name="BarChart2" size={13} className="text-hlt-orange" />
                    <span>{p.level}</span>
                  </div>
                </div>
                <div className="border-t border-hlt-border pt-4 flex items-center justify-between">
                  <span className="font-display text-2xl text-hlt-white">{p.price}</span>
                  <button
                    className="text-hlt-orange hover:text-hlt-white transition-colors"
                    onClick={() => scrollTo("#schedule")}
                  >
                    <Icon name="ArrowRight" size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TRAINERS ─────────────────────────────────── */}
      <section id="trainers" className="py-24 px-6 bg-hlt-card">
        <div ref={trainers.ref} className="max-w-7xl mx-auto">
          <div className={`mb-14 ${trainers.inView ? "animate-fade-in-up" : "opacity-0"}`}>
            <SectionLabel text="Тренерский состав" />
            <h2 className="font-display text-5xl md:text-6xl text-hlt-white">КОМАНДА<br />ЭКСПЕРТОВ</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {TRAINERS.map((t, i) => (
              <div
                key={t.name}
                className={`group relative overflow-hidden rounded-lg border border-hlt-border card-hover ${trainers.inView ? `animate-scale-in delay-${(i + 1) * 150}` : "opacity-0"}`}
              >
                <div className="aspect-[4/5] overflow-hidden relative">
                  <img
                    src={t.img}
                    alt={t.name}
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="text-hlt-orange font-display text-xs tracking-[0.15em] mb-2">{t.role}</div>
                  <h3 className="font-display text-2xl text-hlt-white mb-1">{t.name}</h3>
                  <div className="flex items-center gap-4 text-hlt-gray text-xs">
                    <span>{t.exp}</span>
                    <span className="text-hlt-border">|</span>
                    <span>{t.certs}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SCHEDULE ─────────────────────────────────── */}
      <section id="schedule" className="py-24 px-6">
        <div ref={scheduleSection.ref} className="max-w-7xl mx-auto">
          <div className={`mb-14 ${scheduleSection.inView ? "animate-fade-in-up" : "opacity-0"}`}>
            <SectionLabel text="Расписание" />
            <h2 className="font-display text-5xl md:text-6xl text-hlt-white">ЗАПИСЬ НА<br />ТРЕНИРОВКУ</h2>
          </div>

          <div className={`flex gap-2 mb-8 flex-wrap ${scheduleSection.inView ? "animate-fade-in delay-200" : "opacity-0"}`}>
            {days.map(day => (
              <button
                key={day}
                onClick={() => setActiveDay(day)}
                className={`font-display text-sm px-6 py-2.5 rounded transition-all ${
                  activeDay === day
                    ? "bg-hlt-orange text-hlt-dark"
                    : "border border-hlt-border text-hlt-gray hover:border-hlt-orange hover:text-hlt-orange"
                }`}
              >
                {day}
              </button>
            ))}
          </div>

          <div className={`grid md:grid-cols-2 gap-3 ${scheduleSection.inView ? "animate-fade-in delay-300" : "opacity-0"}`}>
            {filteredSchedule.map((s, i) => (
              <div
                key={i}
                className="flex items-center justify-between bg-hlt-card border border-hlt-border rounded-lg px-6 py-4 hover:border-hlt-orange/50 transition-all group"
              >
                <div className="flex items-center gap-5">
                  <div className="font-display text-2xl text-hlt-orange w-14">{s.time}</div>
                  <div>
                    <div className="font-display text-base text-hlt-white">{s.name}</div>
                    <div className="font-body text-hlt-gray text-xs mt-0.5">{s.trainer}</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className={`text-xs font-display ${s.spots === 0 ? "text-red-400" : s.spots <= 2 ? "text-yellow-400" : "text-green-400"}`}>
                    {s.spots === 0 ? "МЕСТ НЕТ" : `${s.spots} МЕСТ`}
                  </div>
                  <button
                    disabled={s.spots === 0}
                    onClick={() => s.spots > 0 && setBookingSession(s)}
                    className={`px-4 py-2 rounded text-xs font-display transition-all ${
                      s.spots === 0
                        ? "border border-hlt-border text-hlt-gray/30 cursor-not-allowed"
                        : "btn-primary"
                    }`}
                  >
                    {s.spots === 0 ? "ЗАНЯТО" : "ЗАПИСАТЬСЯ"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── RESULTS ──────────────────────────────────── */}
      <section id="results" className="py-24 px-6 bg-hlt-card relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <img
            src="https://cdn.poehali.dev/projects/715a3a09-5f8e-4784-8b1a-7ce9264f6f9e/files/c5728715-41f9-4efd-80d7-7869f53099d0.jpg"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div ref={results.ref} className="max-w-7xl mx-auto relative z-10">
          <div className={`mb-14 ${results.inView ? "animate-fade-in-up" : "opacity-0"}`}>
            <SectionLabel text="Результаты клиентов" />
            <h2 className="font-display text-5xl md:text-6xl text-hlt-white">ЦИФРЫ<br />НЕ ВРУТ</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {[
              { name: "Иван К.", result: "-24 кг", period: "4 месяца", program: "HLT PRO", quote: "Никогда не думал, что смогу сделать это. HLT изменил мой подход к телу и голове." },
              { name: "Елена М.", result: "+15 кг мышц", period: "6 месяцев", program: "HLT ELITE", quote: "Профессиональный подход тренера и чёткая система — именно то, чего мне не хватало." },
              { name: "Сергей П.", result: "-31 кг", period: "7 месяцев", program: "HLT PRO", quote: "Первая тренировка далась тяжело. Но я вернулся. И теперь не останавливаюсь." },
              { name: "Анна Р.", result: "Марафон 42 км", period: "3 месяца", program: "HLT БАЗОВЫЙ", quote: "С нуля до финиша Московского марафона. Звучит невероятно, но это факт." },
            ].map((r, i) => (
              <div
                key={r.name}
                className={`border border-hlt-border rounded-lg p-7 bg-background/60 backdrop-blur card-hover ${results.inView ? `animate-fade-in-up delay-${(i + 1) * 100}` : "opacity-0"}`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="font-display text-4xl text-gradient mb-1">{r.result}</div>
                    <div className="font-body text-hlt-gray text-sm">{r.period} · {r.program}</div>
                  </div>
                  <div className="text-hlt-orange opacity-30">
                    <Icon name="Quote" size={36} />
                  </div>
                </div>
                <p className="font-body text-hlt-gray text-sm leading-relaxed italic mb-4">"{r.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-hlt-orange/20 flex items-center justify-center">
                    <span className="font-display text-xs text-hlt-orange">{r.name[0]}</span>
                  </div>
                  <span className="font-display text-sm text-hlt-white tracking-wider">{r.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BLOG ─────────────────────────────────────── */}
      <section id="blog" className="py-24 px-6">
        <div ref={blog.ref} className="max-w-7xl mx-auto">
          <div className={`flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6 ${blog.inView ? "animate-fade-in-up" : "opacity-0"}`}>
            <div>
              <SectionLabel text="Блог" />
              <h2 className="font-display text-5xl md:text-6xl text-hlt-white">ЗНАНИЯ<br />В ДЕЙСТВИИ</h2>
            </div>
            <button className="btn-outline px-7 py-3 rounded text-sm self-start md:self-auto whitespace-nowrap">
              Все статьи
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {BLOG_POSTS.map((post, i) => (
              <article
                key={post.title}
                className={`group border border-hlt-border rounded-lg overflow-hidden bg-hlt-card card-hover cursor-pointer ${blog.inView ? `animate-fade-in-up delay-${(i + 1) * 150}` : "opacity-0"}`}
              >
                <div className="h-48 bg-gradient-to-br from-hlt-orange/20 to-hlt-border relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center opacity-10">
                    <span className="font-display text-8xl text-hlt-orange">{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <div className="absolute top-4 left-4">
                    <span className="bg-hlt-orange text-hlt-dark font-display text-xs px-3 py-1 rounded tracking-wider">{post.tag}</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-display text-lg text-hlt-white leading-tight mb-4 group-hover:text-hlt-orange transition-colors">
                    {post.title}
                  </h3>
                  <div className="flex items-center justify-between text-hlt-gray text-xs">
                    <span>{post.date}</span>
                    <span className="flex items-center gap-1.5">
                      <Icon name="Clock" size={11} />
                      {post.read}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT ────────────────────────────────────── */}
      <section id="about" className="py-24 px-6 bg-hlt-card">
        <div ref={about.ref} className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className={`${about.inView ? "animate-slide-in-left" : "opacity-0"}`}>
              <SectionLabel text="О нас" />
              <h2 className="font-display text-5xl md:text-6xl text-hlt-white mb-8">МЫ —<br />HLT</h2>
              <p className="font-body text-hlt-gray text-base leading-relaxed mb-6">
                HLT — это не просто фитнес-клуб. Это методология, выстроенная на науке и реальном опыте
                профессиональных атлетов. Мы верим, что каждый человек способен на больше, чем думает.
              </p>
              <p className="font-body text-hlt-gray text-base leading-relaxed mb-8">
                Наши тренеры — практики с сертификациями мирового уровня. Каждая программа —
                это персонализированный план, а не шаблон из интернета.
              </p>
              <div className="grid grid-cols-2 gap-6">
                {[
                  { icon: "Target", label: "Системный подход", desc: "Периодизация и прогрессия нагрузок" },
                  { icon: "Shield", label: "Безопасность", desc: "Контроль техники на каждой тренировке" },
                  { icon: "TrendingUp", label: "Прогресс", desc: "Измеримые результаты каждые 4 недели" },
                  { icon: "Heart", label: "Поддержка", desc: "Сообщество единомышленников" },
                ].map(item => (
                  <div key={item.label} className="flex gap-3">
                    <div className="w-9 h-9 rounded bg-hlt-orange/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Icon name={item.icon as "Target"} size={16} className="text-hlt-orange" />
                    </div>
                    <div>
                      <div className="font-display text-sm text-hlt-white">{item.label}</div>
                      <div className="font-body text-hlt-gray text-xs mt-0.5">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className={`${about.inView ? "animate-scale-in delay-300" : "opacity-0"}`}>
              <div className="relative">
                <img
                  src="https://cdn.poehali.dev/projects/715a3a09-5f8e-4784-8b1a-7ce9264f6f9e/files/c5728715-41f9-4efd-80d7-7869f53099d0.jpg"
                  alt="HLT Team"
                  className="w-full rounded-lg object-cover aspect-[4/3]"
                />
                <div className="absolute -bottom-5 -left-5 bg-hlt-orange text-hlt-dark p-5 rounded-lg">
                  <div className="font-display text-4xl">8</div>
                  <div className="font-body text-xs mt-1">лет<br />опыта</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTACTS ─────────────────────────────────── */}
      <section id="contacts" className="py-24 px-6">
        <div ref={contacts.ref} className="max-w-7xl mx-auto">
          <div className={`mb-14 ${contacts.inView ? "animate-fade-in-up" : "opacity-0"}`}>
            <SectionLabel text="Контакты" />
            <h2 className="font-display text-5xl md:text-6xl text-hlt-white">НАЧНИ<br />СЕГОДНЯ</h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-10">
            <div className={`${contacts.inView ? "animate-fade-in-up delay-200" : "opacity-0"}`}>
              <div className="bg-hlt-card border border-hlt-border rounded-lg p-8">
                <h3 className="font-display text-xl text-hlt-white mb-6">ОСТАВЬТЕ ЗАЯВКУ</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs text-hlt-gray uppercase tracking-wider mb-2 font-display">Имя</label>
                    <input type="text" placeholder="Ваше имя" className="w-full bg-background border border-hlt-border rounded px-4 py-3 text-hlt-white placeholder:text-hlt-gray/40 focus:outline-none focus:border-hlt-orange transition-colors" />
                  </div>
                  <div>
                    <label className="block text-xs text-hlt-gray uppercase tracking-wider mb-2 font-display">Телефон</label>
                    <input type="tel" placeholder="+7 (000) 000-00-00" className="w-full bg-background border border-hlt-border rounded px-4 py-3 text-hlt-white placeholder:text-hlt-gray/40 focus:outline-none focus:border-hlt-orange transition-colors" />
                  </div>
                  <div>
                    <label className="block text-xs text-hlt-gray uppercase tracking-wider mb-2 font-display">Программа</label>
                    <select className="w-full bg-background border border-hlt-border rounded px-4 py-3 text-hlt-white focus:outline-none focus:border-hlt-orange transition-colors appearance-none">
                      <option value="">Выберите программу</option>
                      {PROGRAMS.map(p => <option key={p.name} value={p.name}>{p.name}</option>)}
                    </select>
                  </div>
                  <button className="btn-primary w-full py-4 rounded text-sm mt-2">
                    Записаться на бесплатное занятие
                  </button>
                  <p className="text-hlt-gray/50 text-xs text-center">Мы свяжемся с вами в течение 15 минут</p>
                </div>
              </div>
            </div>

            <div className={`space-y-5 ${contacts.inView ? "animate-fade-in-up delay-400" : "opacity-0"}`}>
              {[
                { icon: "MapPin", label: "Адрес", value: "г. Москва, ул. Спортивная, 12, стр. 3" },
                { icon: "Phone", label: "Телефон", value: "+7 (495) 123-45-67" },
                { icon: "Mail", label: "Email", value: "info@hlt-training.ru" },
                { icon: "Clock", label: "Часы работы", value: "Пн–Пт: 06:00–23:00 · Сб–Вс: 08:00–22:00" },
              ].map(item => (
                <div key={item.label} className="flex gap-5 p-5 border border-hlt-border rounded-lg bg-hlt-card">
                  <div className="w-11 h-11 rounded bg-hlt-orange/10 flex items-center justify-center flex-shrink-0">
                    <Icon name={item.icon as "MapPin"} size={18} className="text-hlt-orange" />
                  </div>
                  <div>
                    <div className="font-display text-xs text-hlt-gray tracking-wider mb-1">{item.label}</div>
                    <div className="font-body text-hlt-white text-sm">{item.value}</div>
                  </div>
                </div>
              ))}

              <div className="flex gap-3 pt-2">
                {[
                  { icon: "Instagram", label: "Instagram" },
                  { icon: "Youtube", label: "YouTube" },
                  { icon: "Send", label: "Telegram" },
                ].map(s => (
                  <button
                    key={s.label}
                    className="flex-1 flex items-center justify-center gap-2 border border-hlt-border rounded-lg py-3 text-hlt-gray hover:border-hlt-orange hover:text-hlt-orange transition-all font-display text-xs tracking-wider"
                  >
                    <Icon name={s.icon as "Send"} size={14} />
                    {s.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────── */}
      <footer className="border-t border-hlt-border py-8 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="font-display text-2xl text-hlt-white tracking-[0.15em]">
            H<span className="text-hlt-orange">L</span>T
          </div>
          <div className="text-hlt-gray/40 text-xs font-body">
            © 2026 HLT — High Level Training. Все права защищены.
          </div>
          <div className="flex gap-6">
            {["Программы", "Тренеры", "Контакты"].map(link => (
              <button
                key={link}
                onClick={() => scrollTo(`#${link === "Программы" ? "programs" : link === "Тренеры" ? "trainers" : "contacts"}`)}
                className="font-display text-xs text-hlt-gray hover:text-hlt-orange transition-colors tracking-wider uppercase"
              >
                {link}
              </button>
            ))}
          </div>
        </div>
      </footer>

      {/* ── BOOKING MODAL ────────────────────────────── */}
      <BookingModal session={bookingSession} onClose={() => setBookingSession(null)} />
    </div>
  );
}
