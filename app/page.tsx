"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaAward, FaCode, FaExternalLinkAlt } from "react-icons/fa";
import { content, links } from "@/lib/content";
import { certs, stackGroups } from "@/lib/stack";

function Split({ text, className = "", delay = 0, caret = false }: { text: string; className?: string; delay?: number; caret?: boolean }) {
  let n = 0;
  const last = text.split(" ").length - 1;
  return (
    <span className={className} aria-label={text}>
      {text.split(" ").map((w, wi) => (
        <span key={wi} aria-hidden className="inline-block whitespace-nowrap">
          {w.split("").map((ch) => (
            <motion.span key={n} className="inline-block"
              initial={{ opacity: 0, y: "0.7em", filter: "blur(6px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.8 }}
              transition={{ delay: delay + n++ * 0.035, duration: 0.45, ease: "easeOut" }}>
              {ch}
            </motion.span>
          ))}
          {caret && wi === last && <span className="animate-pulse text-p">_</span>}
          &nbsp;
        </span>
      ))}
    </span>
  );
}

const Title = ({ text }: { text: string }) => (
  <Split text={text} caret />
);

const Fade = ({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) => (
  <motion.div className={className} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.5, delay }}>
    {children}
  </motion.div>
);

const CODE = `public class Maria {
  String role = "Full Stack Developer";
  String[] stack = {
    "React", "Next.js", "Node.js", "Java"
  };
  String[] tools = { "Git", "Figma" };

  void create() {
    System.out.println("creative interfaces");
  }
}`;

function CodeCard() {
  const parts = CODE.split(/\b(public|class|void|String)\b/);
  return (
    <div className="flex h-full flex-col rounded-2xl border border-line bg-card shadow-2xl shadow-violet-900/30">
      <div className="flex items-center gap-2 border-b border-line px-4 py-3">
        {[0, 1, 2].map((i) => <span key={i} className="size-3 rounded-full bg-line" />)}
        <span className="ml-2 font-mono text-xs text-zinc-400">Maria.java</span>
      </div>
      <pre className="flex-1 overflow-hidden whitespace-pre-wrap p-5 font-mono text-[12px] leading-6 text-zinc-300">
        {parts.map((p, i) => (i % 2 ? <span key={i} className="text-p">{p}</span> : p))}
        <span className="animate-pulse text-p">_</span>
      </pre>
    </div>
  );
}

function AboutPhoto() {
  const [on, setOn] = useState(false);
  const face = { backfaceVisibility: "hidden" } as const;
  return (
    <div className="mx-auto w-full max-w-xs">
      <div className="h-[24rem] cursor-pointer" style={{ perspective: 1200 }}
        onMouseEnter={() => setOn(true)} onMouseLeave={() => setOn(false)} onClick={() => setOn((v) => !v)}>
        <div className="relative h-full w-full"
          style={{ transformStyle: "preserve-3d", transition: "transform .6s cubic-bezier(.4,.2,.2,1)", transform: on ? "rotateY(180deg)" : "rotateY(0deg)" }}>
          <div className="absolute inset-0 overflow-hidden rounded-2xl border border-p/40" style={face}>
            <Image src="/profile.webp" alt="Maria Pereira" fill sizes="320px" className="object-cover object-[50%_35%]" />
          </div>
          <div className="absolute inset-0" style={{ ...face, transform: "rotateY(180deg)" }}><CodeCard /></div>
        </div>
      </div>
    </div>
  );
}

const badge = { GET: "bg-blue-500/20 text-blue-400", POST: "bg-emerald-500/20 text-emerald-400" };
const Section = ({ id, tag, title, sub, children }: { id: string; tag: ["GET" | "POST", string]; title: React.ReactNode; sub?: string; children: React.ReactNode }) => (
  <section id={id} className="scroll-mt-20 py-16">
    <p className="mb-4 flex items-center gap-3 font-mono text-xs">
      <span className={`rounded px-2.5 py-1 font-bold ${badge[tag[0]]}`}>{tag[0]}</span>
      <span className="text-zinc-500">{tag[1]}</span>
    </p>
    <h2 className="font-display text-3xl font-bold sm:text-4xl">{title}</h2>
    {sub && <p className="mt-2 text-zinc-400">{sub}</p>}
    <div className="mt-8">{children}</div>
  </section>
);

const ids = ["inicio", "experiencia", "projetos", "stack", "contato"];
const abbr = ["FS", "EX", "PR", "ST", "CT"];
const slug = (s: string) => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/\s+/g, "-");
const lines = ["bg-violet-400", "bg-fuchsia-400", "bg-indigo-400"];

export default function Page() {
  const [lang, setLang] = useState<"pt" | "en">("pt");
  const [view, setView] = useState(0);
  const [f, setF] = useState({ name: "", email: "", msg: "" });
  const spot = useRef<HTMLDivElement>(null);
  const go = (i: number) => setView(i);
  const c = content[lang];
  const pt = lang === "pt";

  useEffect(() => {
    const h = ids.indexOf(window.location.hash.slice(1));
    if (h > 0) setView(h);
    const move = (e: MouseEvent) => {
      spot.current?.style.setProperty("--mx", `${e.clientX}px`);
      spot.current?.style.setProperty("--my", `${e.clientY}px`);
    };
    const key = (e: KeyboardEvent) => {
      if (["INPUT", "TEXTAREA"].includes((e.target as HTMLElement).tagName)) return;
      if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
      e.preventDefault();
      setView((v) => Math.min(ids.length - 1, Math.max(0, v + (e.key === "ArrowDown" ? 1 : -1))));
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("keydown", key);
    return () => { window.removeEventListener("mousemove", move); window.removeEventListener("keydown", key); };
  }, []);

  useEffect(() => {
    window.history.replaceState(null, "", `#${ids[view]}`);
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [view]);

  const send = (e: React.FormEvent) => {
    e.preventDefault();
    const body = encodeURIComponent(`${f.msg}\n\n${f.name} (${f.email})`);
    window.location.href = `mailto:${links.email}?subject=${encodeURIComponent("Contato pelo portfólio")}&body=${body}`;
  };
  const input = "w-full rounded-lg border border-line bg-card px-4 py-3 outline-none transition focus:border-p";
  const cv = "/curriculo-maria-pereira.pdf";

  return (
    <div className="bg-glow min-h-screen">
      <div ref={spot} className="spot" aria-hidden />

      <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-bg/80 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
          <button onClick={() => go(0)} className="font-display text-sm font-bold uppercase tracking-[0.25em]">Maria Pereira</button>
          <div className="flex items-center gap-3">
            <button onClick={() => setLang(pt ? "en" : "pt")} className="font-mono text-xs text-zinc-400 transition hover:text-p">{pt ? "EN" : "PT"}</button>
            <a href={cv} download className="rounded-full bg-white/10 px-4 py-2 text-sm font-semibold transition hover:bg-p2"><span className="hidden sm:inline">{pt ? "Baixar Currículo" : "Download Resume"}</span><span className="sm:hidden">CV</span></a>
          </div>
        </div>
      </header>

      <nav className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-5 border-t border-line bg-bg/90 pb-[env(safe-area-inset-bottom)] backdrop-blur lg:hidden">
        {abbr.map((a, i) => (
          <button key={a} onClick={() => go(i)} aria-label={c.nav[i]}
            className={`py-4 font-mono text-xs font-bold transition ${view === i ? "bg-p2/15 text-p" : "text-zinc-500"}`}>{a}</button>
        ))}
      </nav>

      <aside className="fixed bottom-0 left-0 top-14 z-10 hidden w-72 flex-col border-r border-line py-8 pl-12 pr-4 lg:flex">
        <p className="mb-4 px-3 font-mono text-xs text-zinc-500">{pt ? "// selecione uma visão" : "// select a view"}</p>
        <nav className="flex flex-col gap-1">
          {c.nav.map((n, i) => (
            <button key={n} onClick={() => go(i)}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-left font-mono text-sm uppercase transition ${
                view === i ? "bg-p2/20 font-bold text-white" : "text-zinc-400 hover:text-white"}`}>
              <span className="w-3 text-xs text-p">{view === i ? "▸" : ""}</span>
              <span className="text-xs text-zinc-500">{String(i + 1).padStart(2, "0")}</span>
              <span>{i === 0 ? c.role : n}</span>
            </button>
          ))}
        </nav>
        <p className="mt-auto px-3 font-mono text-[11px] text-zinc-600">↑↓ {pt ? "navegar" : "navigate"}</p>
      </aside>

      <div className="lg:pl-72">
        <main key={`${view}-${lang}`} className="mx-auto flex flex-col min-h-[calc(100vh-3.5rem)] max-w-4xl px-6 pb-24 pt-20 lg:px-10 lg:pb-0 lg:pt-14">

          {view === 0 && (
            <section id="inicio" className="grid min-h-[calc(100vh-14rem)] scroll-mt-20 items-center gap-12 py-12 lg:grid-cols-[1.1fr_1fr]">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.25em] text-zinc-500">{c.role}</p>
                <h1 className="mt-4 font-display text-4xl font-bold tracking-tight sm:text-5xl"><Title text="Maria Pereira" /></h1>
                <p className="mt-6 font-display text-2xl font-semibold leading-snug"><Split text={c.tagline} delay={0.4} /></p>
                <p className="mt-5 leading-7 text-zinc-400">{c.intro}</p>
                <div className="mt-8 flex flex-wrap gap-3 font-mono text-sm font-bold">
                  <button onClick={() => go(2)} className="rounded-full bg-p2 px-6 py-3 transition hover:bg-violet-500">&gt; {c.cta[0]}</button>
                  <button onClick={() => go(4)} className="rounded-full border border-line px-6 py-3 transition hover:border-p">&gt; {c.cta[1]}</button>
                </div>
              </div>
              <div>
                <p className="mb-3 font-mono text-xs text-zinc-500"><span className="text-p">$</span> curl -s api.mariapereira.dev/v1/profile</p>
                <div className="rounded-2xl border border-line bg-card/80 p-6 font-mono text-[13px] leading-7 backdrop-blur">
                  <div className="mb-4 flex items-center gap-3 text-xs">
                    <span className="rounded bg-blue-500/20 px-2 py-1 font-bold text-blue-400">GET</span>
                    <span className="font-bold text-zinc-200">/v1/profile</span>
                    <span className="ml-auto rounded-full bg-emerald-500/15 px-2.5 py-1 font-bold text-emerald-400">200 OK</span>
                  </div>
                  <p>{"{"}</p>
                  {[["name", "Maria Pereira"], ["role", c.role], ["stack", "React | Next.js | Node.js | Spring Boot"]].map(([k, v]) => (
                    <p key={k} className="pl-4"><span className="text-p">&quot;{k}&quot;</span>: <span className="text-teal-300">&quot;{v}&quot;</span>,</p>
                  ))}
                  <p className="pl-4"><span className="text-p">&quot;status&quot;</span>: <span className="text-emerald-400">200</span></p>
                  <p>{"}"}</p>
                </div>
              </div>
            </section>
          )}

          {view === 0 && (
            <Section id="sobre" tag={["GET", "/about"]} title={<Title text={c.aboutT} />}>
              <div className="grid items-start gap-10 md:grid-cols-[1fr_18rem]">
                <Fade>
                  <p className="leading-7 text-zinc-300">{c.about}</p>
                  <div className="mt-6 rounded-xl border border-line bg-card p-6">
                    <h3 className="font-display text-xl font-semibold text-p">{c.beyondT}</h3>
                    <p className="mt-2 text-zinc-300">{c.beyond}</p>
                  </div>
                </Fade>
                <AboutPhoto />
              </div>
            </Section>
          )}

          {view === 1 && (
            <Section id="experiencia" tag={["GET", "/experience"]} title={<Title text={c.expT} />}>
              <div className="space-y-8 border-l border-line pl-6">
                {c.exp.map((e, i) => (
                  <Fade key={e.org} className="relative" delay={i * 0.1}>
                    <span className="absolute -left-[31px] top-2 size-2.5 rounded-full bg-p" />
                    <h3 className="font-display text-xl font-semibold">{e.org}</h3>
                    <p className="font-mono text-xs text-zinc-500">{e.date}</p>
                    <p className="mt-1 text-p">{e.role}</p>
                    <ul className="mt-3 list-disc space-y-1 pl-5 text-zinc-300">{e.items.map((x) => <li key={x}>{x}</li>)}</ul>
                  </Fade>
                ))}
              </div>
            </Section>
          )}

          {view === 2 && (
            <Section id="projetos" tag={["GET", "/projects"]} title={<Title text={c.projT} />}>
              <div className="grid gap-8 md:grid-cols-3">
                {c.proj.map((p, i) => (
                  <Fade key={p.name} delay={i * 0.1}>
                    <div className={`h-0.5 w-10 ${lines[i % 3]}`} />
                    <p className="mt-5 font-mono text-xs text-zinc-500"><span className="text-blue-400">GET</span> /projects/{slug(p.name)}</p>
                    <h3 className="mt-2 font-display text-2xl font-bold leading-tight">{p.name}</h3>
                    <p className="mt-3 text-sm leading-6 text-zinc-400">{p.desc}</p>
                    <p className="mt-4 font-mono text-xs leading-5 text-zinc-500">{p.tech.join(" · ")}</p>
                    <div className="mt-5 space-y-2 border-t border-line pt-4 font-mono text-sm font-bold">
                      {p.gh && <a href={p.gh} target="_blank" rel="noreferrer" className="flex items-center gap-2 transition hover:text-p"><FaCode /> GitHub</a>}
                      {p.demo && <a href={p.demo} target="_blank" rel="noreferrer" className="flex items-center gap-2 transition hover:text-p"><FaExternalLinkAlt className="size-3" /> {pt ? "Ver demo" : "Live demo"}</a>}
                    </div>
                  </Fade>
                ))}
              </div>
            </Section>
          )}

          {view === 3 && (
            <Section id="stack" tag={["GET", "/skills"]} title={<Title text={pt ? "Minhas Stacks" : "My Stacks"} />}>
              <div className="grid gap-4 sm:grid-cols-2">
                {stackGroups.map((g, i) => (
                  <Fade key={g.title.pt} delay={i * 0.06} className="rounded-xl border border-line bg-card/80 p-5">
                    <h3 className="font-display font-semibold text-p">{g.title[lang]}</h3>
                    <ul className="mt-4 grid grid-cols-2 gap-x-3 gap-y-3">
                      {g.items.map(([name, Icon]) => (
                        <li key={name} className="group flex items-center gap-2.5 text-sm">
                          <Icon className="size-5 shrink-0 text-zinc-500 transition group-hover:text-p" />{name}
                        </li>
                      ))}
                    </ul>
                  </Fade>
                ))}
              </div>
              <h3 className="mt-12 text-center font-display text-sm font-semibold text-zinc-500">{pt ? "Certificados em destaque" : "Featured certificates"}</h3>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {certs.map((x) => (
                  <Fade key={x.name} className="flex items-center gap-3 rounded-xl border border-line bg-card/80 p-4">
                    <span className="grid size-10 shrink-0 place-items-center rounded-full bg-p2/20 text-p"><FaAward /></span>
                    <div>
                      <p className="text-sm font-semibold">{x.name}</p>
                      <p className="font-mono text-xs text-zinc-500">{x.org}{x.extra && ` · ${x.extra}`}</p>
                    </div>
                  </Fade>
                ))}
              </div>
              <p className="mt-8 text-sm text-zinc-400"><span className="text-zinc-200">{c.eduT}:</span> {c.edu}</p>
            </Section>
          )}

          {view === 4 && (
            <Section id="contato" tag={["POST", "/contact"]} title={<Title text={c.ctaT} />}>
              <Fade>
                <p className="text-xl text-p">{c.ctaS}</p>
                <div className="mt-4 flex flex-wrap gap-5 text-zinc-400">
                  <a className="hover:text-p" href={`mailto:${links.email}`}>{links.email}</a>
                  <a className="hover:text-p" href={links.github} target="_blank" rel="noreferrer">GitHub</a>
                  <a className="hover:text-p" href={links.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
                  <a className="hover:text-p" href={cv} download>{pt ? "Currículo (PDF)" : "Resume (PDF)"}</a>
                </div>
                <form onSubmit={send} className="mt-8 space-y-4">
                  <input required className={input} placeholder={c.form[0]} value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} />
                  <input required type="email" className={input} placeholder={c.form[1]} value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} />
                  <textarea required rows={5} className={input} placeholder={c.form[2]} value={f.msg} onChange={(e) => setF({ ...f, msg: e.target.value })} />
                  <button className="rounded-full bg-p2 px-7 py-3 font-mono text-sm font-bold transition hover:bg-violet-500">&gt; {c.form[3]}</button>
                </form>
              </Fade>
            </Section>
          )}

          <footer className="mt-auto border-t border-line py-8 text-sm text-zinc-500">© 2026 Maria Pereira · Recife, PE</footer>
        </main>
      </div>
    </div>
  );
}
