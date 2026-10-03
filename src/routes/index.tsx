import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode, type PointerEvent as RPointerEvent } from "react";
import { Button } from "@/components/ui/button";
import { CosmicBlackHole } from "@/components/CosmicBlackHole";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "V R Roshan Ingershal - Portfolio" },
      {
        name: "description",
        content:
          "Roshan Ingershal VR — AI/ML Engineer & Data Scientist building intelligent systems, data-driven products and practical AI solutions.",
      },
      {
        property: "og:title",
        content: "V R Roshan Ingershal - Portfolio",
      },
      {
        property: "og:description",
        content:
          "Building intelligent systems, data-driven products and practical AI solutions.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "theme-color", content: "#07070c" },
    ],
  }),
  component: Index,
});

/* ------------------------------ data ------------------------------ */

const NAV_SECTIONS = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "lab", label: "Innovation Lab" },
  { id: "education", label: "Education" },
  { id: "exploring", label: "Exploring" },
  { id: "contact", label: "Contact" },
] as const;

const CURRENT_SKILL_GROUPS = [
  {
    title: "Languages",
    skills: ["Python", "SQL", "JavaScript", "HTML", "CSS", "Java", "C", "C++", "TypeScript", "Rust", "Go", "Kotlin", "PHP", "C#", "Swift", "R"],
  },
  {
    title: "Frameworks & Tools",
    skills: ["FastAPI", "Streamlit", "Git", "GitHub"],
  },
  {
    title: "Data & Interfaces",
    skills: ["SQLite", "REST APIs", "Apache Pig / Pig Latin"],
  },
] as const;

const PROJECTS = [
  {
    index: "01",
    title: "AI-Powered Anomaly Detection Dashboard",
  },
  {
    index: "02",
    title: "15-Puzzle Solver using IDA*",
  },
  {
    index: "03",
    title: "Route Optimization System",
  },
] as const;

const EDUCATION = [
  {
    period: "Currently studying",
    degree: "B.E. Computer Science and Engineering",
    institution: "J.N.N Institute of Engineering",
    detail: "Second year",
  },
  {
    period: "Currently studying",
    degree: "B.S. in Data Science",
    institution: "IIT Madras",
    detail: "Currently pursuing",
  },
] as const;

const EXPLORING = [
  {
    area: "Artificial Intelligence",
    note: "Learning how models reason, detect and predict — and how to put them behind real products.",
  },
  {
    area: "Full-Stack Development",
    note: "Designing and building complete applications, from API to interface.",
  },
  {
    area: "Data Science",
    note: "Working with data end to end — querying, analysing and presenting it with intent.",
  },
] as const;

/* --------------------------- reveal hook --------------------------- */

function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.dataset["visible"] = "true";
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            el.dataset["visible"] = "true";
            observer.disconnect();
          }
        }
      },
      { threshold: 0.12 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
}

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`reveal ${className}`}
      data-visible="false"
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}

/* ------------------------------- nav ------------------------------- */

function Nav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-4 z-40 flex justify-center px-4 sm:px-6">
      <div className={`w-full max-w-5xl border-t border-white/10 border-b border-black/10 bg-background/30 backdrop-blur-xl shadow-lg ring-1 ring-white/5 transition-all duration-300 ${open ? 'rounded-3xl' : 'rounded-full'}`}>
        <nav
          aria-label="Primary"
          className="flex items-center justify-between gap-4 px-5 py-3 sm:px-8"
        >
          <a
            href="#top"
            className="font-display text-lg font-medium tracking-tight text-foreground transition-colors hover:text-primary"
            onClick={() => setOpen(false)}
          >
            Roshan&nbsp;Ingershal&nbsp;VR
          </a>

          <ul className="hidden items-center gap-7 md:flex">
            {NAV_SECTIONS.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className="text-sm text-foreground-muted transition-colors hover:text-foreground"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>

          <a
            href="#contact"
            className="hidden shrink-0 rounded-full border border-line-strong px-4 py-1.5 text-sm text-foreground transition-colors hover:border-primary hover:text-primary md:inline-flex"
          >
            Get in touch
          </a>

          <Button
            type="button"
            variant="ghost"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
            className="grid h-11 w-11 shrink-0 place-items-center rounded-lg border border-line-strong bg-background/50 p-0 text-foreground hover:bg-surface md:hidden"
          >
            <span aria-hidden="true" className="relative block h-3 w-4.5">
              <span
                className={`absolute left-0 block h-px w-full bg-current transition-all duration-200 ${
                  open ? "top-1.5 rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute left-0 block h-px w-full bg-current transition-all duration-200 ${
                  open ? "top-1.5 -rotate-45" : "top-3"
                }`}
              />
            </span>
          </Button>
        </nav>

        {open && (
          <div id="mobile-menu" className="border-t border-white/5 md:hidden">
            <ul className="flex flex-col px-5 py-3 sm:px-8">
              {NAV_SECTIONS.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    onClick={() => setOpen(false)}
                    className="block border-b border-line py-3 text-base text-foreground-muted transition-colors hover:text-foreground"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#contact"
                  onClick={() => setOpen(false)}
                  className="mt-3 mb-2 inline-flex rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-background"
                >
                  Get in touch
                </a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}

/* ---------------------------- sections ---------------------------- */

/* --------------------------- interactions --------------------------- */

function prefersReduced() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function finePointer() {
  return typeof window !== "undefined" && window.matchMedia("(pointer: fine)").matches;
}

function Magnetic({ children, className = "", href, "data-text": dataText }: { children: ReactNode; className?: string; href: string; "data-text"?: string }) {
  const ref = useRef<HTMLAnchorElement | null>(null);
  const onMove = (e: RPointerEvent) => {
    const el = ref.current;
    if (!el || prefersReduced() || !finePointer()) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left - r.width / 2) * 0.25;
    const y = (e.clientY - r.top - r.height / 2) * 0.35;
    el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  };
  const reset = () => {
    if (ref.current) ref.current.style.transform = "";
  };
  return (
    <a ref={ref} href={href} data-text={dataText} onPointerMove={onMove} onPointerLeave={reset} onBlur={reset} className={`magnetic ${className}`}>
      {children}
    </a>
  );
}

function TiltCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLElement | null>(null);
  const onMove = (e: RPointerEvent) => {
    const el = ref.current;
    if (!el || !finePointer()) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    el.style.setProperty("--mx", `${px * 100}%`);
    el.style.setProperty("--my", `${py * 100}%`);
    if (prefersReduced()) return;
    el.style.setProperty("--rx", ((px - 0.5) * 5).toFixed(2));
    el.style.setProperty("--ry", ((0.5 - py) * 5).toFixed(2));
  };
  const reset = () => {
    ref.current?.style.setProperty("--rx", "0");
    ref.current?.style.setProperty("--ry", "0");
  };
  return (
    <article
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={reset}
      className={`tilt-card glass glass-edge-glow group overflow-hidden rounded-3xl ${className}`}
    >
      <div aria-hidden="true" className="shine pointer-events-none absolute inset-0" />
      <div className="relative">{children}</div>
    </article>
  );
}

/* Starfield: a single canvas, slow orbital drift around the hero focus. */
function Starfield() {
  const ref = useRef<HTMLCanvasElement | null>(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const reduced = prefersReduced();
    let w = 0, h = 0, raf = 0, visible = true;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    type Star = { r: number; a: number; s: number; size: number; o: number; tint: number };
    let stars: Star[] = [];
    const resize = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round(Math.min(220, (w * h) / 6000));
      const maxR = Math.hypot(w, h) * 0.6;
      stars = Array.from({ length: count }, () => ({
        r: 40 + Math.random() * maxR,
        a: Math.random() * Math.PI * 2,
        s: (0.00004 + Math.random() * 0.00012) * (Math.random() < 0.5 ? 1 : 1),
        size: Math.random() * 1.3 + 0.2,
        o: Math.random() * 0.7 + 0.15,
        tint: Math.random(),
      }));
    };
    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      const cx = w * (w > 900 ? 0.68 : 0.5);
      const cy = h * (w > 900 ? 0.48 : 0.3);
      for (const st of stars) {
        const ang = st.a + (reduced ? 0 : t * st.s);
        const x = cx + Math.cos(ang) * st.r;
        const y = cy + Math.sin(ang) * st.r * 0.55;
        const tw = reduced ? 1 : 0.75 + 0.25 * Math.sin(t * 0.001 + st.a * 10);
        ctx.globalAlpha = st.o * tw;
        ctx.fillStyle = st.tint > 0.85 ? "#c9b8ff" : st.tint > 0.7 ? "#bfe6ff" : "#eef2ff";
        ctx.fillRect(x, y, st.size, st.size);
      }
      ctx.globalAlpha = 1;
    };
    const loop = (t: number) => {
      if (visible) draw(t);
      raf = requestAnimationFrame(loop);
    };
    resize();
    const io = new IntersectionObserver(([e]) => (visible = !!e?.isIntersecting));
    io.observe(canvas);
    window.addEventListener("resize", resize);
    if (reduced) draw(0);
    else raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", resize);
    };
  }, []);
  return <canvas ref={ref} aria-hidden="true" className="absolute inset-0 h-full w-full" />;
}

function Hero() {
  const ref = useRef<HTMLElement | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReduced() || !finePointer()) return;
    let raf = 0;
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const x = e.clientX / window.innerWidth - 0.5;
        const y = e.clientY / window.innerHeight - 0.5;
        el.style.setProperty("--px", x.toFixed(3));
        el.style.setProperty("--py", y.toFixed(3));
      });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <section id="top" ref={ref} className="relative isolate overflow-hidden pt-24 pb-16 sm:pt-28 sm:pb-20">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <Starfield />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 50% 40% at 70% 45%, var(--primary-soft), transparent 70%), radial-gradient(ellipse 40% 30% at 15% 10%, var(--accent-soft), transparent 70%), linear-gradient(to bottom, transparent 70%, var(--background))",
          }}
        />
      </div>

      <div className="mx-auto max-w-6xl px-5 sm:px-8">


        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <Reveal>
            <p className="eyebrow inline-flex items-center justify-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[var(--shadow-glow)]" />
              Portfolio
            </p>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="mt-5 font-display text-[clamp(2.7rem,6vw,5.5rem)] leading-[1.08] font-medium text-foreground">
              Roshan Ingershal VR<span className="text-primary">.</span>
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-3 text-sm font-semibold uppercase text-accent sm:text-base">AI/ML Engineer &amp; Data Scientist</p>
          </Reveal>
          <Reveal delay={240}>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-foreground-muted sm:text-xl">
              Building intelligent systems, data-driven products, and practical AI solutions.
            </p>
          </Reveal>
          <Reveal delay={280}>
            <div className="mt-7 flex flex-wrap justify-center gap-2 text-left">
              <span className="glass inline-flex max-w-full items-center rounded-md px-3 py-2 text-xs text-foreground-muted sm:text-sm">IIT Madras · BS Data Science</span>
              <span className="glass inline-flex max-w-full items-center rounded-md px-3 py-2 text-xs text-foreground-muted sm:text-sm">B.E. Computer Science Engineering · J.N.N. Institute of Engineering</span>
            </div>
          </Reveal>
          <Reveal delay={320}>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <span className="relative inline-flex rounded-full p-px">
                <span aria-hidden="true" className="ring-glow absolute inset-0 rounded-full opacity-80 blur-[1px]" />
                <Magnetic
                  href="#projects"
                  data-text="See my projects"
                  className="btn-glitch relative inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-colors hover:bg-accent"
                >
                  See my projects
                </Magnetic>
              </span>
              <Magnetic
                href="#contact"
                className="glass inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-foreground transition-colors hover:text-accent"
              >
                Get in touch
              </Magnetic>
            </div>
          </Reveal>
        </div>

        <div className="pointer-events-none relative mx-auto mt-12 w-full max-w-[920px] sm:mt-16 lg:mt-24">
          <CosmicBlackHole />
        </div>
      </div>
    </section>
  );
}

function SectionHeading({ eyebrow, title, id }: { eyebrow: string; title: string; id: string }) {
  return (
    <Reveal>
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2 id={id} className="mt-3 font-display text-3xl font-medium tracking-tight text-foreground sm:text-4xl">
          {title}
        </h2>
      </div>
    </Reveal>
  );
}

function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="hairline-top py-20 sm:py-28">
      <div className="mx-auto grid max-w-5xl gap-10 px-5 sm:px-8 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
        <div>
          <SectionHeading id="about-title" eyebrow="About" title="A quick intro" />
        </div>
        <div className="space-y-6 text-lg leading-relaxed text-foreground-muted">
          <Reveal>
            <p>
              I'm Roshan, a second-year Computer Science student at J.N.N Institute of
              Engineering, currently also pursuing the B.S. in
              Data Science from IIT Madras.
            </p>
          </Reveal>
          <Reveal>
            <p>
              My interests sit at the intersection of artificial intelligence, full-stack
              development and data science. I enjoy taking an idea from a blank file to
              something that runs — writing the backend, shaping the interface, and
              understanding the data underneath.
            </p>
          </Reveal>
          <Reveal>
            <p>
              This page is an honest snapshot of where I am right now: what I'm learning,
              what I've built so far, and what I'm working towards next.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-title" className="hairline-top py-20 sm:py-28">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <SectionHeading id="skills-title" eyebrow="Capabilities / 01" title="Languages & Technologies" />
        <div className="mt-10 border-t border-line-strong pt-6">
          <h3 className="mb-6 flex items-center gap-3 text-sm font-semibold uppercase text-accent"><span className="h-1.5 w-1.5 rounded-full bg-accent" />Current skills</h3>
          <div className="grid gap-8 md:grid-cols-3">
            {CURRENT_SKILL_GROUPS.map((group, i) => (
              <Reveal key={group.title} delay={i * 90}>
                <div className="border-l border-line-strong pl-5">
                  <h4 className="text-xs uppercase text-foreground-faint">{group.title}</h4>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {group.skills.map((skill, si) => <li key={skill} style={{ ["--i" as string]: si }} className="chip rounded-md border border-line-strong bg-surface px-3 py-2 text-sm text-foreground transition-colors hover:border-primary">{skill}</li>)}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
        </div>
    </section>
  );
}

function Projects() {
  return (
    <section id="projects" aria-labelledby="projects-title" className="hairline-top py-20 sm:py-28">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <SectionHeading id="projects-title" eyebrow="Projects" title="Featured work" />

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {PROJECTS.map((project, i) => (
            <Reveal key={project.title} delay={i * 90} className="h-full">
              <TiltCard className="h-full p-7">
                <span
                  aria-hidden="true"
                  className="font-display text-sm text-foreground-faint transition-colors duration-300 group-hover:text-accent"
                >
                  {project.index}
                </span>
                <h3 className="mt-6 font-display text-2xl leading-tight font-medium tracking-tight text-foreground">
                  {project.title}
                </h3>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function InnovationLab() {
  return (
    <section id="lab" aria-labelledby="lab-title" className="hairline-top py-20 sm:py-28">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <SectionHeading id="lab-title" eyebrow="Concepts / 02" title="Innovation Lab / Ideas" />
        <p className="mt-5 max-w-2xl text-foreground-muted">Early-stage thinking and proposals, distinct from completed projects.</p>
        <div className="mt-10 grid gap-5 md:grid-cols-1">
          <Reveal>
            <article className="glass h-full rounded-3xl p-8 sm:p-12 relative overflow-hidden group border border-white/5 hover:border-primary/30 transition-colors">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-soft to-transparent opacity-10 transition-opacity duration-500 group-hover:opacity-30 pointer-events-none" />
              <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start md:items-center justify-between">
                <div className="max-w-3xl">
                  <p className="eyebrow flex items-center gap-2 mb-4">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[var(--shadow-glow)]" />
                    Concept / workforce intelligence
                  </p>
                  <h3 className="font-display text-3xl sm:text-5xl font-medium text-foreground tracking-tight mb-6">AI Workforce Operating System (WOS)</h3>
                  <p className="leading-relaxed text-foreground-muted text-lg sm:text-xl">An independent startup concept aiming to build intelligence infrastructure for the human skill economy. Featuring AI-powered skill mapping, gap detection, and predictive demand analytics.</p>
                </div>
                <div className="shrink-0 flex items-center justify-center">
                  <Link
                    to="/wos"
                    className="btn-glitch relative inline-flex items-center gap-2 rounded-full bg-foreground px-8 py-4 text-sm font-medium text-background transition-colors hover:bg-accent hover:scale-105"
                    data-text="View Presentation"
                  >
                    View Presentation
                  </Link>
                </div>
              </div>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Education() {
  return (
    <section id="education" aria-labelledby="education-title" className="hairline-top py-20 sm:py-28">
      <div className="mx-auto grid max-w-5xl gap-10 px-5 sm:px-8 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
        <div>
          <SectionHeading id="education-title" eyebrow="Education" title="Where I study" />
        </div>
        <ol className="relative space-y-12 border-l border-line pl-8">
          {EDUCATION.map((item, i) => (
            <li key={item.degree} className="relative">
              <span
                aria-hidden="true"
                className="absolute -left-[38px] top-1.5 grid h-3 w-3 place-items-center rounded-full border border-primary bg-background"
              >
                <span className="h-1 w-1 rounded-full bg-primary" />
              </span>
              <Reveal delay={i * 90}>
                <p className="eyebrow">{item.period}</p>
                <h3 className="mt-2 font-display text-xl font-medium text-foreground sm:text-2xl">
                  {item.degree}
                </h3>
                <p className="mt-1 text-foreground-muted">{item.institution}</p>
                <p className="mt-1 text-sm text-foreground-faint">{item.detail}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Exploring() {
  return (
    <section id="exploring" aria-labelledby="exploring-title" className="hairline-top py-20 sm:py-28">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <SectionHeading id="exploring-title" eyebrow="Right now" title="Currently exploring" />

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {EXPLORING.map((item, i) => (
            <Reveal key={item.area} delay={i * 90}>
              <div className="h-full glass glass-edge-glow rounded-2xl p-6 transition-colors duration-300 hover:border-line-strong">
                <h3 className="font-display text-xl font-medium text-foreground">
                  {item.area}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-foreground-muted">
                  {item.note}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="hairline-top py-24 sm:py-36">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <div
          className="glass glass-edge-glow relative overflow-hidden rounded-3xl px-6 py-16 text-center sm:px-16 sm:py-20"
          style={{
            background:
              "radial-gradient(ellipse 70% 90% at 50% 120%, var(--primary-soft), transparent 70%), var(--glass)",
          }}
        >
          <Reveal>
            <h2 id="contact-title" className="mx-auto max-w-2xl font-display text-3xl font-medium tracking-tight text-foreground sm:text-5xl">
              Let's build something worth talking about.
            </h2>
          </Reveal>
          <Reveal delay={90}>
            <p className="mx-auto mt-5 max-w-xl text-lg text-foreground-muted">
              I'm always up for a conversation about AI, full-stack development, data
              science — or an idea you think I should hear about.
            </p>
          </Reveal>
          <Reveal delay={180}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <a href="mailto:roshaningershalvr@gmail.com" className="inline-flex items-center rounded-full bg-foreground px-7 py-3.5 text-sm font-medium text-background transition-colors hover:bg-primary">
                Email
              </a>
              <div className="flex items-center gap-3">
                <a href="https://github.com/roshaningershalvr" target="_blank" rel="noopener noreferrer" className="glass inline-flex items-center rounded-full px-5 py-3 text-sm text-foreground-muted transition-colors hover:text-accent hover:border-primary/50">
                  GitHub
                </a>
                <a href="https://www.linkedin.com/in/roshan-ingershal-vr-undefined-7a830a418" target="_blank" rel="noopener noreferrer" className="glass inline-flex items-center rounded-full px-5 py-3 text-sm text-foreground-muted transition-colors hover:text-accent hover:border-accent/50">
                  LinkedIn
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="hairline-top py-10">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-5 text-sm text-foreground-faint sm:flex-row sm:px-8">
        <p>© {new Date().getFullYear()} Roshan Ingershal VR</p>
        <p>Designed & built with curiosity.</p>
      </div>
    </footer>
  );
}

/* ------------------------------ page ------------------------------ */

function Index() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-md focus:bg-foreground focus:px-4 focus:py-2 focus:text-sm focus:text-background"
      >
        Skip to content
      </a>
      <div aria-hidden="true" className="grain-overlay" />
      <Nav />
      <main id="main">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <InnovationLab />
        <Education />
        <Exploring />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
