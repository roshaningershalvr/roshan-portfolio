import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Roshan Ingershal VR — Software Engineer in the Making" },
      {
        name: "description",
        content:
          "Portfolio of Roshan Ingershal VR — aspiring software engineer interested in AI, full-stack development and data science. B.E. CSE at J.N.N Institute of Engineering; B.S. Data Science at IIT Madras.",
      },
      {
        property: "og:title",
        content: "Roshan Ingershal VR — Software Engineer in the Making",
      },
      {
        property: "og:description",
        content:
          "Aspiring software engineer exploring AI, full-stack development and data science.",
      },
    ],
  }),
  component: Index,
});

/* ------------------------------ data ------------------------------ */

const NAV_SECTIONS = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "education", label: "Education" },
  { id: "exploring", label: "Exploring" },
  { id: "contact", label: "Contact" },
] as const;

const SKILL_GROUPS = [
  {
    title: "Languages",
    note: "The foundations I write most of my code in.",
    skills: ["Python", "SQL", "JavaScript", "HTML", "CSS"],
  },
  {
    title: "Frameworks & Tools",
    note: "What I reach for to build and ship.",
    skills: ["FastAPI", "Streamlit", "Git", "GitHub"],
  },
  {
    title: "Data & Interfaces",
    note: "Where data meets the outside world.",
    skills: ["SQLite", "REST APIs"],
  },
] as const;

const PROJECTS = [
  {
    index: "01",
    title: "AI-Powered Anomaly Detection Dashboard",
    tags: ["Python", "Streamlit", "AI"],
    overview: "Project overview coming soon",
  },
  {
    index: "02",
    title: "15-Puzzle Solver using IDA*",
    tags: ["Python", "Algorithms"],
    overview: "Project overview coming soon",
  },
  {
    index: "03",
    title: "Route Optimization System",
    tags: ["Python", "Algorithms"],
    overview: "Project overview coming soon",
  },
] as const;

const EDUCATION = [
  {
    period: "2024 — Present",
    degree: "B.E. Computer Science and Engineering",
    institution: "J.N.N Institute of Engineering",
    detail: "Second year",
  },
  {
    period: "Ongoing",
    degree: "B.S. in Data Science (Foundation)",
    institution: "IIT Madras",
    detail: "Foundation level",
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
      el.dataset.visible = "true";
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            el.dataset.visible = "true";
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
    <header className="fixed inset-x-0 top-0 z-40">
      <div className="border-b border-line bg-background/80 backdrop-blur-md">
        <nav
          aria-label="Primary"
          className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-5 py-3.5 sm:px-8"
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

          <button
            type="button"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-line-strong text-foreground md:hidden"
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
          </button>
        </nav>

        {open && (
          <div id="mobile-menu" className="border-t border-line md:hidden">
            <ul className="mx-auto flex max-w-5xl flex-col px-5 py-3 sm:px-8">
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

function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-40 pb-24 sm:pt-48 sm:pb-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 60% 45% at 18% 0%, var(--primary-soft), transparent 65%), radial-gradient(ellipse 45% 40% at 85% 15%, var(--accent-soft), transparent 60%)",
        }}
      />
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <Reveal>
          <p className="eyebrow">Portfolio — Roshan Ingershal VR</p>
        </Reveal>
        <Reveal delay={80}>
          <h1 className="mt-6 max-w-3xl font-display text-5xl leading-[1.05] font-medium tracking-tight text-foreground sm:text-7xl">
            Aspiring software engineer, building with{" "}
            <span className="text-gradient-signal italic">intent</span>.
          </h1>
        </Reveal>
        <Reveal delay={160}>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-foreground-muted">
            I'm interested in artificial intelligence, full-stack development and data
            science — and I'm putting in the reps: studying, building, and learning in
            public.
          </p>
        </Reveal>
        <Reveal delay={240}>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-colors hover:bg-primary"
            >
              See my projects
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full border border-line-strong px-6 py-3 text-sm font-medium text-foreground transition-colors hover:border-accent hover:text-accent"
            >
              Get in touch
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function SectionHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <Reveal>
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2 className="mt-3 font-display text-3xl font-medium tracking-tight text-foreground sm:text-4xl">
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
          <SectionHeading eyebrow="About" title="A quick intro" />
        </div>
        <div className="space-y-6 text-lg leading-relaxed text-foreground-muted">
          <Reveal>
            <p>
              I'm Roshan, a second-year Computer Science student at J.N.N Institute of
              Engineering, currently also pursuing the Foundation level of the B.S. in
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
        <SectionHeading eyebrow="Skills" title="Tools I work with" />

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {SKILL_GROUPS.map((group, i) => (
            <Reveal key={group.title} delay={i * 90}>
              <div className="h-full rounded-2xl border border-line bg-surface/60 p-6 transition-colors duration-300 hover:border-line-strong">
                <h3 className="font-display text-xl font-medium text-foreground">
                  {group.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground-faint">
                  {group.note}
                </p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <li
                      key={skill}
                      className="rounded-full border border-line-strong px-3 py-1 text-xs font-medium tracking-wide text-foreground-muted transition-colors hover:border-primary hover:text-primary"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section id="projects" aria-labelledby="projects-title" className="hairline-top py-20 sm:py-28">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <SectionHeading eyebrow="Projects" title="Featured work" />

        <div className="mt-12 flex flex-col">
          {PROJECTS.map((project, i) => (
            <Reveal key={project.title} delay={i * 80}>
              <article className="group hairline-top grid gap-6 py-10 transition-colors duration-300 sm:grid-cols-[auto_1fr] sm:gap-10">
                <span
                  aria-hidden="true"
                  className="font-display text-sm text-foreground-faint transition-colors duration-300 group-hover:text-primary"
                >
                  {project.index}
                </span>
                <div className="min-w-0">
                  <h3 className="font-display text-2xl font-medium tracking-tight text-foreground transition-colors duration-300 group-hover:text-primary sm:text-3xl">
                    {project.title}
                  </h3>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <li
                        key={tag}
                        className="rounded-full border border-line px-2.5 py-0.5 text-xs text-foreground-faint"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4 max-w-2xl italic text-foreground-muted">
                    {project.overview}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
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
          <SectionHeading eyebrow="Education" title="Where I study" />
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
        <SectionHeading eyebrow="Right now" title="Currently exploring" />

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {EXPLORING.map((item, i) => (
            <Reveal key={item.area} delay={i * 90}>
              <div className="h-full rounded-2xl border border-line bg-surface/60 p-6 transition-colors duration-300 hover:border-line-strong">
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
          className="relative overflow-hidden rounded-3xl border border-line bg-surface/60 px-6 py-16 text-center sm:px-16 sm:py-20"
          style={{
            background:
              "radial-gradient(ellipse 70% 90% at 50% 120%, var(--primary-soft), transparent 70%), var(--surface)",
          }}
        >
          <Reveal>
            <h2 className="mx-auto max-w-2xl font-display text-3xl font-medium tracking-tight text-foreground sm:text-5xl">
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
              <a
                href="mailto:hello@example.com"
                className="inline-flex items-center rounded-full bg-foreground px-7 py-3.5 text-sm font-medium text-background transition-colors hover:bg-primary"
              >
                Email me
              </a>
              <div className="flex items-center gap-3">
                {["GitHub", "LinkedIn"].map((label) => (
                  <a
                    key={label}
                    href="#contact"
                    aria-label={`${label} (link coming soon)`}
                    className="inline-flex items-center rounded-full border border-line-strong px-5 py-3 text-sm text-foreground-muted transition-colors hover:border-accent hover:text-accent"
                  >
                    {label}
                  </a>
                ))}
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
        <Education />
        <Exploring />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
