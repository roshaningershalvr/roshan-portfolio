import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, type ReactNode, type PointerEvent as RPointerEvent } from "react";
import { ArrowLeft, Cpu, Activity, Brain, Network, Database, Shield, Target, Server, Globe2, Briefcase, ArrowRight, BookOpen, Layers, Zap, TerminalSquare, BarChart } from "lucide-react";

export const Route = createFileRoute("/wos")({
  head: () => ({
    meta: [
      { title: "WOS — AI Workforce Operating System" },
      { name: "description", content: "Building Intelligence Infrastructure for the Human Skill Economy." },
    ],
  }),
  component: WosPage,
});

function prefersReduced() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function finePointer() {
  return typeof window !== "undefined" && window.matchMedia("(pointer: fine)").matches;
}

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
      { threshold: 0.12 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div ref={ref} className={`reveal ${className}`} data-visible="false" style={delay ? { transitionDelay: `${delay}ms` } : undefined}>
      {children}
    </div>
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
    <article ref={ref} onPointerMove={onMove} onPointerLeave={reset} className={`tilt-card glass glass-edge-glow group overflow-hidden rounded-3xl ${className}`}>
      <div aria-hidden="true" className="shine pointer-events-none absolute inset-0" />
      <div className="relative z-10">{children}</div>
    </article>
  );
}

function SectionHeading({ eyebrow, title, id, centered = false }: { eyebrow: string; title: ReactNode; id?: string, centered?: boolean }) {
  return (
    <Reveal>
      <div className={centered ? "text-center" : ""}>
        <p className={`eyebrow ${centered ? 'inline-flex items-center justify-center gap-2' : ''}`}>
          {centered && <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[var(--shadow-glow)]" />}
          {eyebrow}
        </p>
        <h2 id={id} className={`mt-3 font-display text-3xl sm:text-5xl font-medium tracking-tight text-foreground ${centered ? 'mx-auto max-w-4xl' : ''}`}>
          {title}
        </h2>
      </div>
    </Reveal>
  );
}

// -------------------------------------------------------------
// SECTIONS
// -------------------------------------------------------------

function Hero() {
  return (
    <section className="relative isolate overflow-hidden pt-36 pb-20 sm:pt-48 sm:pb-32">
      <div className="absolute top-4 left-4 sm:top-8 sm:left-8 z-50">
        <Link to="/" className="inline-flex items-center gap-2 text-sm font-medium text-foreground-muted hover:text-foreground transition-colors glass px-4 py-2 rounded-full">
          <ArrowLeft className="w-4 h-4" /> Back to Portfolio
        </Link>
      </div>

      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_50%_at_50%_20%,var(--primary-soft)_0%,transparent_100%)] opacity-30"></div>

      <div className="mx-auto max-w-7xl px-5 sm:px-8 text-center relative z-10">
        <Reveal>
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs sm:text-sm font-medium text-primary shadow-[var(--shadow-glow)] backdrop-blur-md mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            INDEPENDENT RESEARCH & INNOVATION
          </div>
        </Reveal>
        
        <Reveal delay={100}>
          <h1 className="font-display text-5xl sm:text-7xl lg:text-[6rem] font-medium leading-[1.05] tracking-tight text-foreground mb-6">
            AI Workforce <br className="hidden sm:block" />
            <span className="text-secondary text-transparent bg-clip-text bg-gradient-to-r from-foreground via-primary to-accent">Operating System</span>
          </h1>
        </Reveal>

        <Reveal delay={200}>
          <p className="mx-auto max-w-3xl text-xl sm:text-2xl text-foreground-faint font-medium mb-8 leading-snug">
            Building Intelligence Infrastructure for the Human Skill Economy.
          </p>
        </Reveal>

        <Reveal delay={300}>
          <p className="mx-auto max-w-2xl text-base sm:text-lg text-foreground-muted mb-12">
            An AI-driven workforce intelligence platform designed to map human capabilities, identify skill gaps, understand evolving industry demands, and enable intelligent workforce transformation.
          </p>
        </Reveal>

        <Reveal delay={400}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#architecture" className="btn-glitch relative inline-flex items-center justify-center gap-2 rounded-full bg-foreground px-8 py-4 text-sm font-medium text-background transition-colors w-full sm:w-auto" data-text="Explore Architecture">
              Explore Architecture <ArrowRight className="w-4 h-4"/>
            </a>
            <a href="#vision" className="glass relative inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-sm font-medium text-foreground transition-colors hover:text-primary w-full sm:w-auto">
              Read the Vision
            </a>
          </div>
        </Reveal>

        {/* Sophisticated UI Visualizer Placeholder */}
        <Reveal delay={500}>
          <div className="mt-20 mx-auto max-w-5xl rounded-2xl border border-white/5 bg-surface/50 backdrop-blur-2xl shadow-2xl overflow-hidden aspect-video relative flex items-center justify-center group">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background"></div>
            
            <div className="relative z-10 w-full h-full flex flex-col justify-between p-8">
              <div className="flex justify-between items-start opacity-50">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                </div>
                <div className="text-xs font-mono text-foreground-faint tracking-widest">WOS_INTELLIGENCE_KERNEL</div>
              </div>
              
              <div className="flex-1 flex items-center justify-center">
                {/* Node visualization */}
                <div className="relative w-64 h-64">
                  <div className="absolute inset-0 rounded-full border border-primary/20 animate-[spin_10s_linear_infinite]" />
                  <div className="absolute inset-4 rounded-full border border-accent/20 animate-[spin_15s_linear_infinite_reverse]" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Brain className="w-12 h-12 text-primary drop-shadow-[0_0_15px_rgba(var(--primary),0.5)]" />
                  </div>
                  {/* Floating nodes */}
                  <div className="absolute top-0 left-1/2 w-3 h-3 rounded-full bg-accent shadow-[0_0_10px_var(--color-accent)] -translate-x-1/2 -translate-y-1/2" />
                  <div className="absolute bottom-1/4 left-0 w-2 h-2 rounded-full bg-primary shadow-[0_0_10px_var(--color-primary)] -translate-x-1/2 -translate-y-1/2" />
                  <div className="absolute bottom-1/4 right-0 w-2 h-2 rounded-full bg-foreground shadow-[0_0_10px_var(--color-foreground)] translate-x-1/2 -translate-y-1/2" />
                </div>
              </div>
            </div>
            
            <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-background to-transparent pointer-events-none" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Problem() {
  return (
    <section className="py-24 sm:py-32 relative">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading eyebrow="The Crisis" title="The Workforce Evolution Gap" />
        
        <Reveal delay={100}>
          <p className="mt-6 max-w-3xl text-xl leading-relaxed text-foreground-muted">
            The global workforce is experiencing continuous technological and industrial transformation. However, the connection between people's existing skills, educational pathways, and actual industry requirements remains fragmented.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { t: 'Skill Mismatch', d: 'Growing disconnect between academic output and immediate industrial competency needs.' },
            { t: 'Opaque Capabilities', d: 'Organizations lack real-time visibility into the granular skill levels of their existing workforce.' },
            { t: 'Emerging Demands', d: 'Predicting required future competencies is too slow using traditional labor-market analysis.' },
            { t: 'Fragmented Reskilling', d: 'Upskilling efforts are generalized, lacking personalized, data-driven learning pathways.' },
            { t: 'Inefficient Planning', d: 'Enterprise workforce planning operates on rigid job titles rather than fluid skill compositions.' },
            { t: 'Stagnant Intelligence', d: 'Static resumes and rigid HR systems fail to capture continuous skill evolution.' }
          ].map((item, i) => (
            <Reveal key={i} delay={i * 50}>
              <div className="p-8 rounded-2xl border border-line bg-surface/30 h-full flex flex-col gap-4">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-foreground-muted font-mono text-sm border border-white/10">0{i+1}</div>
                <h3 className="text-xl font-medium text-foreground">{item.t}</h3>
                <p className="text-foreground-faint leading-relaxed">{item.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Solution() {
  return (
    <section className="py-24 sm:py-32 hairline-top relative bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMSIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjA1KSIvPjwvc3ZnPg==')]">
      <div className="absolute inset-0 bg-background/90 backdrop-blur-sm"></div>
      <div className="mx-auto max-w-7xl px-5 sm:px-8 relative z-10">
        <SectionHeading eyebrow="The Ecosystem" title="Unified Intelligence Infrastructure" />
        
        <Reveal delay={100}>
          <p className="mt-6 max-w-3xl text-xl leading-relaxed text-foreground-muted">
            WOS is a proposed ecosystem that connects people, organizations, educational institutions, and public-sector stakeholders through continuous, AI-powered skill mapping.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {[
            { icon: <Target />, t: 'A. Individuals', sub: ['Skill mapping', 'Skill-gap identification', 'Career pathways', 'Reskilling recommendations'] },
            { icon: <Briefcase />, t: 'B. Enterprises', sub: ['Workforce skill inventory', 'Organizational analytics', 'Capability assessment', 'Future planning'] },
            { icon: <Globe2 />, t: 'C. Institutions', sub: ['Regional skill analysis', 'Emerging industry intelligence', 'Skill development planning', 'Policy support'] }
          ].map((scope, i) => (
            <Reveal key={scope.t} delay={i * 100} className="h-full">
              <TiltCard className="h-full p-8 sm:p-10 border border-primary/20">
                <div className="text-accent mb-6">{scope.icon}</div>
                <h3 className="text-2xl font-medium text-foreground mb-6">{scope.t}</h3>
                <ul className="space-y-4">
                  {scope.sub.map((li, j) => (
                    <li key={j} className="flex flex-start gap-3 text-foreground-muted">
                      <ChevronRight className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <span>{li}</span>
                    </li>
                  ))}
                </ul>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ChevronRight(props: any) {
  return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m9 18 6-6-6-6"/></svg>
}

// -------------------------------------------------------------
// CORE AI INTELLIGENCE MODULES
// -------------------------------------------------------------

function Modules() {
  const modules = [
    { num: '01', t: 'Skill Intelligence Engine', d: 'Maps competencies and tracks evolutionary relationships between distinct skill domains using vector embeddings.', i: <Network /> },
    { num: '02', t: 'Skill Gap Detection Engine', d: 'Quantifies precise deltas between current personal capabilities and target industry competency requirements.', i: <Target /> },
    { num: '03', t: 'Career Intelligence Engine', d: 'Generates personalized career advancement trajectories mathematically matched to the user\'s skill phenotype.', i: <Activity /> },
    { num: '04', t: 'Adaptive Learning Engine', d: 'Synthesizes targeted micro-learning roadmaps strictly aligned to close specific identified skill gaps.', i: <BookOpen /> },
    { num: '05', t: 'Demand Forecasting', d: 'Ingests external macro-labor datasets to predict emerging high-value skill vectors proactively.', i: <BarChart /> },
    { num: '06', t: 'Enterprise Analytics', d: 'Translates raw employee capabilities into high-level organizational readiness and vulnerability metrics.', i: <Server /> },
    { num: '07', t: 'Transformation Strategy', d: 'Connects internal AI intelligence directly to institutional resource allocation for upskilling operations.', i: <Layers /> }
  ];

  return (
    <section className="py-24 sm:py-32 hairline-top relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 relative z-10">
        <SectionHeading centered eyebrow="Core Technology" title="AI Intelligence Modules" id="vision" />
        
        <div className="mt-20 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {modules.map((m, i) => (
            <Reveal key={m.num} delay={i * 50} className={i === 6 ? "sm:col-span-2 lg:col-span-2 xl:col-span-1" : ""}>
              <div className="h-full glass rounded-3xl p-8 hover:border-primary/40 transition-colors group relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 text-6xl font-display font-bold text-white/5 pointer-events-none group-hover:text-primary/10 transition-colors">{m.num}</div>
                <div className="text-foreground-faint group-hover:text-accent transition-colors mb-6">{m.i}</div>
                <h3 className="text-lg font-semibold text-foreground mb-3">{m.t}</h3>
                <p className="text-sm text-foreground-muted leading-relaxed">{m.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Architecture() {
  return (
    <section id="architecture" className="py-24 sm:py-32 hairline-top relative bg-surface/30">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading centered eyebrow="System Blueprint" title="Platform Architecture" />
        <Reveal delay={100}>
          <p className="text-center text-foreground-muted mx-auto max-w-2xl mt-6 mb-16">
            A highly scaled, federated infrastructure model utilizing deep semantic graphs and secure microservices to process vast amounts of unstructured workforce data.
          </p>
        </Reveal>

        <Reveal delay={200}>
          <div className="glass rounded-[2rem] p-4 sm:p-12 relative overflow-hidden font-mono text-sm shadow-2xl border border-line-strong">
            {/* Layers Container */}
            <div className="relative z-10 space-y-10 sm:space-y-16">
              
              {/* L7: Presentation */}
              <div className="relative">
                <h4 className="text-xs font-bold uppercase tracking-widest text-primary mb-4 shrink-0">L7 / Presentation</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {['Individual Dashboard', 'Enterprise Console', 'Institution Portal'].map(n => (
                    <div key={n} className="border border-white/10 bg-background/50 backdrop-blur pb-4 pt-4 px-4 text-center rounded-xl flex items-center justify-center gap-2"><AppWindow className="w-4 h-4"/>{n}</div>
                  ))}
                </div>
              </div>

              {/* L6 & L5 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="relative border border-dashed border-line-strong rounded-xl p-4 sm:p-6 bg-surface/30">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-foreground-muted mb-4 absolute -top-3 left-4 bg-surface px-2">L5 / App Services</h4>
                  <div className="flex flex-wrap gap-2">
                    {['Individual Intelligence', 'Enterprise Intelligence', 'Macro Analytics'].map(n => (
                      <span key={n} className="px-3 py-1.5 border border-line bg-background/40 rounded-md text-xs">{n}</span>
                    ))}
                  </div>
                </div>
                
                <div className="relative border border-dashed border-accent/30 rounded-xl p-4 sm:p-6 bg-accent/5">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-accent mb-4 absolute -top-3 left-4 bg-[#111] px-2">L4 / AI Intelligence</h4>
                  <div className="flex flex-wrap gap-2">
                    {['Gap Analysis', 'Recommendation Algorithms', 'Career Models', 'Predictive Demand'].map(n => (
                      <span key={n} className="px-3 py-1.5 border border-accent/20 bg-background/60 rounded-md text-xs">{n}</span>
                    ))}
                  </div>
                </div>
              </div>

              {/* L3: Data Intelligence */}
              <div className="relative border border-solid border-primary/20 rounded-xl p-6 bg-primary/5">
                <h4 className="text-xs font-bold uppercase tracking-widest text-primary mb-4">L3 / Data Intelligence (Knowledge Graph)</h4>
                <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-3 justify-between">
                  {['NLP Extraction', 'Entity Recog.', 'Taxonomy Mapping', 'Knowledge Graph', 'Relational Modeling'].map(n => (
                    <div key={n} className="px-4 py-3 border border-white/5 bg-background shadow-md rounded-lg flex items-center gap-2 grow justify-center text-xs sm:text-sm">
                      <Network className="w-4 h-4 text-primary"/>{n}
                    </div>
                  ))}
                </div>
              </div>

              {/* L2: Data Ingestion */}
              <div className="relative border border-dashed border-line-strong rounded-xl p-6 bg-surface/30">
                <h4 className="text-xs font-bold uppercase tracking-widest text-foreground-muted mb-4 absolute -top-3 left-4 bg-surface px-2">L2 / Data Ingestion</h4>
                <div className="flex flex-wrap gap-4 items-center justify-evenly">
                  {['API Integrations', 'ETL Pipelines', 'Data Validation', 'Normalization', 'Preprocessing'].map(n => (
                    <div key={n} className="flex flex-col items-center gap-2"><ArrowRight className="w-4 h-4 text-foreground-faint rotate-90 sm:rotate-0"/><span className="bg-background border border-line px-3 py-1 rounded text-xs text-foreground-muted">{n}</span></div>
                  ))}
                </div>
              </div>

              {/* L1: Sources */}
              <div className="relative">
                <h4 className="text-xs font-bold uppercase tracking-widest text-foreground-faint mb-4 shrink-0">L1 / Data Sources</h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
                  {['Profiles', 'Education', 'Jobs', 'Industry', 'Courses', 'Labor Mkts', 'Enterprise'].map(n => (
                    <div key={n} className="border border-line bg-surface/50 text-foreground-faint py-3 text-center rounded-lg text-xs"><Database className="w-4 h-4 mx-auto mb-1 opacity-50"/>{n}</div>
                  ))}
                </div>
              </div>

              {/* Security / Infra overlay layer conceptually */}
              <div className="absolute inset-y-0 right-0 sm:right-[-2rem] w-8 sm:w-16 border-l border-line-strong border-dashed flex flex-col justify-center items-center gap-6 opacity-30">
                <Shield className="w-5 h-5"/>
                <Server className="w-5 h-5"/>
                <div className="text-[10px] [writing-mode:vertical-rl] tracking-widest uppercase">Infrastructure & Security Governance</div>
              </div>

            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Workflow() {
  return (
    <section className="py-24 sm:py-32 hairline-top">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading eyebrow="Data Pipeline" title="How WOS Works" />
        
        <div className="mt-20 overflow-x-auto pb-8 hide-scrollbar">
          <div className="flex gap-4 sm:gap-6 min-w-max px-2">
            {[
              {s:'01', t:'Collection', d:'Ingest structured/unstructured employment & CV data.'},
              {s:'02', t:'Extraction', d:'NLP identifies named skills and proficiencies.'},
              {s:'03', t:'Mapping', d:'Skills are anchored to the global WOS taxonomy.'},
              {s:'04', t:'Assessment', d:'Competency scoring based on experience & validators.'},
              {s:'05', t:'Gap Analysis', d:'Current matrix compared to target role phenotypes.'},
              {s:'06', t:'AI Processing', d:'Vector search for optimal closing pathways.'},
              {s:'07', t:'Recommendations', d:'Hyper-personalized learning routes exposed.'},
              {s:'08', t:'Analytics', d:'Aggregated metrics fed back to macro intelligence dashboards.'}
            ].map((step, i) => (
              <Reveal key={step.s} delay={i * 50}>
                <div className="w-64 glass rounded-2xl p-6 h-full border border-white/5 relative group hover:-translate-y-2 transition-transform duration-300">
                  <div className="text-4xl font-display font-black text-white/5 mb-4">{step.s}</div>
                  <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2 group-hover:text-primary transition-colors"><Zap className="w-4 h-4"/> {step.t}</h4>
                  <p className="text-sm text-foreground-muted">{step.d}</p>
                  {i !== 7 && <ArrowRight className="absolute -right-4 sm:-right-5 top-1/2 -translate-y-1/2 text-line-strong w-6 h-6 hidden sm:block" />}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function AdditionalSections() {
  return (
    <>
      <section className="py-24 sm:py-32 hairline-top bg-surface/20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading eyebrow="Commercial" title="Business Model" />
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {t:'Enterprise SaaS', d:'Tiered subscription licensing for organizational HR and workforce management analytics.'},
              {t:'Gov / Institutional', d:'Large-scale macro-economic licensing for public sector policy and planning departments.'},
              {t:'API / Integrations', d:'B2B charging volume-based rates for backend API access to the taxonomy and gap-engines.'},
              {t:'Premium Individual', d:'Freemium consumer tier, charging for advanced AI coaching and predictive forecasting.'}
            ].map((b, i) => (
              <Reveal key={b.t} delay={i*100}>
                <div className="p-6 border-b border-l border-line hover:border-accent transition-colors"><h4 className="text-lg font-medium text-foreground mb-2">{b.t}</h4><p className="text-sm text-foreground-muted leading-relaxed">{b.d}</p></div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 sm:py-32 hairline-top">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading centered eyebrow="Implementation" title="Technology Stack" />
          <div className="mt-16 max-w-4xl mx-auto flex flex-wrap justify-center gap-4">
            {[ {c:'Frontend', t:['React','TypeScript','Tailwind CSS','TanStack','Zustand']},
               {c:'Backend', t:['Python','FastAPI','Node.js','GraphQL']},
               {c:'Intelligence', t:['LangChain','OpenAI APIs','HuggingFace','PyTorch']},
               {c:'Data', t:['PostgreSQL','Redis','Apache Kafka','Pinecone (Vectors)']},
               {c:'Infrastructure', t:['AWS','Docker','Kubernetes','Terraform']}
             ].map((group, i) => (
              <Reveal key={group.c} delay={i*100} className="contents">
                <div className="glass rounded-xl p-6 min-w-[200px] border border-white/5">
                  <h4 className="text-xs uppercase text-primary tracking-widest font-bold mb-4 flex items-center justify-center gap-2"><TerminalSquare className="w-4 h-4"/>{group.c}</h4>
                  <div className="flex flex-col gap-2 items-center">
                    {group.t.map(t => <span key={t} className="text-sm text-foreground">{t}</span>)}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 sm:py-32 hairline-top bg-gradient-to-b from-transparent to-surface">
        <div className="mx-auto max-w-4xl px-5 sm:px-8 text-center text-balance">
          <Reveal>
            <h2 className="font-display text-4xl sm:text-6xl font-medium tracking-tight text-foreground mb-8">
              The Future of Work Needs <span className="text-accent underline decoration-primary/30 underline-offset-8">Workforce Intelligence.</span>
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="text-xl text-foreground-muted mb-12">
              Our vision is to develop an intelligent infrastructure that enables individuals, organizations, and institutions to understand and adapt to the continuously evolving human skill economy.
            </p>
          </Reveal>
          <Reveal delay={200}>
            <p className="font-mono text-sm tracking-widest text-primary/80 uppercase mb-8">
              From understanding human capabilities to enabling transformation.
            </p>
            <a href="/" className="btn-glitch relative inline-flex items-center justify-center gap-2 rounded-full bg-foreground px-10 py-5 text-sm font-medium text-background transition-colors" data-text="Return to Portfolio">
              Return to Portfolio
            </a>
          </Reveal>
        </div>
      </section>
    </>
  );
}

// -------------------------------------------------------------
// MAIN PAGE EXPORT
// -------------------------------------------------------------

function AppWindow(props: any) {
  return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M10 4v4"/><path d="M2 8h20"/><path d="M6 4v4"/></svg>
}

function WosPage() {
  return (
    <main className="bg-background text-foreground min-h-screen font-body selection:bg-primary/20">
      <Hero />
      <Problem />
      <Solution />
      <Modules />
      <Architecture />
      <Workflow />
      <AdditionalSections />
    </main>
  );
}
