import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { QRCodeSVG } from "qrcode.react";
import heroImg from "@/assets/hero.jpg";
import respaldoImg from "@/assets/respaldo-internacional.jpg";
import { useTheme } from "@/hooks/use-theme";
import { SuperProfesor } from "@/components/super-profesor";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Programa IA en Educación Básica · Huechuraba" },
      {
        name: "description",
        content:
          "Programa de alfabetización en IA para educación básica en Huechuraba, basado en MIT, Stanford, Harvard, UNESCO y MINEDUC.",
      },
      { property: "og:title", content: "Programa IA en Educación Básica · Huechuraba" },
      {
        property: "og:description",
        content: "Fundamentación, competencias, pilares y recursos con respaldo internacional.",
      },
    ],
  }),
  component: Index,
});

const nav = [
  ["contexto", "Contexto"],
  ["referentes", "Referentes"],
  ["competencias", "Competencias"],
  ["pilares", "Pilares"],
  ["niveles", "Niveles"],
  ["super-profesor", "Súper Profesor"],
  ["herramientas", "Herramientas"],
  ["fases", "Implementación"],
];

const referentes = [
  {
    tag: "MIT",
    title: "MIT RAISE — Day of AI",
    body: "Currículo gratuito K-12 con enfoque en espiral alineado al marco UNESCO. Materiales en español, formación docente y modelo piloto.",
    links: [
      ["Currículo completo", "https://dayofai.org/curriculum-resources"],
      ["Modelo piloto", "https://raise.mit.edu/engage-with-us/k-12/day-of-ai-pilot/"],
      ["Informe de impacto 2025", "https://raise.mit.edu/stories/2025-day-of-ai-impact-report/"],
    ],
  },
  {
    tag: "Stanford",
    title: "Stanford HAI — Proyecto CRAFT",
    body: "Biblioteca de actividades cortas y adaptables co-diseñadas con docentes de arte, matemáticas, historia y lenguaje. Sin requisitos de programación.",
    links: [
      ["Programa K-12 Stanford HAI", "https://hai.stanford.edu/education/k-12"],
      ["Recursos CRAFT", "https://craft.stanford.edu/"],
      ["Nota de investigación", "https://hai.stanford.edu/news/bringing-ai-literacy-high-schools"],
    ],
  },
  {
    tag: "Harvard",
    title: "Harvard HGSE — IA Crítica en K-12",
    body: "Guía 'Critical AI in K-12 Classrooms' (2025): sesgos, justicia y uso responsable. Promueve que los estudiantes cuestionen los sistemas de IA.",
    links: [
      [
        "IA y educación HGSE",
        "https://www.gse.harvard.edu/ideas/themes/artificial-intelligence-education",
      ],
      [
        "Pensamiento crítico frente a IA",
        "https://www.gse.harvard.edu/ideas/edcast/25/10/teaching-students-think-critically-about-ai",
      ],
    ],
  },
  {
    tag: "UNESCO",
    title: "Marco de Competencias en IA 2024",
    body: "12 competencias en 4 dimensiones y 3 niveles (Comprender → Aplicar → Crear). Base normativa internacional del programa.",
    links: [
      [
        "Marco completo UNESCO",
        "https://www.unesco.org/en/articles/ai-competency-framework-students",
      ],
      ["Documento PDF oficial", "https://unesdoc.unesco.org/ark:/48223/pf0000391105"],
    ],
  },
  {
    tag: "Chile",
    title: "MINEDUC — Política Nacional IA",
    body: "Más de 100 acciones comprometidas a 2026, currículo desde preescolar. Guía PotencIA el Aprendizaje y Plan Nacional de Transformación Digital.",
    links: [
      ["Guía PotencIA el Aprendizaje", "https://ciudadaniadigital.mineduc.cl/ia/"],
      [
        "Política Nacional IA Chile",
        "https://www.minciencia.gob.cl/noticias/con-mas-de-100-acciones-comprometidas-para-2026-ministra-de-ciencia-presenta-nueva-politica-de-inteligencia-artificial/",
      ],
    ],
  },
  {
    tag: "Global",
    title: "Red Internacional de Educación IA",
    body: "Alianza entre instituciones de élite mundial para democratizar la alfabetización en inteligencia artificial en escuelas públicas de todo el mundo.",
    links: [],
    visual: respaldoImg,
  },
];

const competencias = [
  {
    code: "D1",
    title: "Mentalidad humano-centrada",
    items: [
      "Ética e inclusión: identificar impactos sociales y sesgos de la IA",
      "Ciudadanía en la era IA: participar responsablemente",
      "Reconocer derechos humanos implicados en sistemas de IA",
    ],
  },
  {
    code: "D2",
    title: "Ética de la IA",
    items: [
      "Uso seguro y ético: evaluar confiabilidad y detectar sesgos",
      "Privacidad y datos personales en sistemas de IA",
      "Transparencia y responsabilidad en el uso de herramientas",
    ],
  },
  {
    code: "D3",
    title: "Técnicas y aplicaciones",
    items: [
      "Fundamentos de IA: datos de entrenamiento y modelos",
      "Prompting efectivo con sistemas de IA generativa",
      "Verificación de resultados y detección de alucinaciones",
    ],
  },
  {
    code: "D4",
    title: "Diseño de sistemas IA",
    items: [
      "Creación con IA: productos y resolución de problemas",
      "Comprender cómo se diseñan y entrenan los modelos",
      "Participar como co-creador en sistemas de IA",
    ],
  },
];

const pilares = [
  [
    "Aprendizaje en espiral",
    "MIT RAISE",
    "Revisitar conceptos con complejidad creciente, desde juegos lúdicos en 1°–2° a proyectos aplicados en 6°–8° básico.",
  ],
  [
    "Co-diseño con docentes",
    "Stanford CRAFT",
    "Materiales desarrollados con y para profesores, garantizando pertinencia y sostenibilidad pedagógica.",
  ],
  [
    "Pensamiento crítico",
    "Harvard HGSE",
    "Los estudiantes cuestionan la IA: identifican sesgos, verifican información y debaten ética.",
  ],
  [
    "Marco ético humano",
    "UNESCO",
    "Toda la progresión ancla los aprendizajes técnicos en derechos, inclusión, privacidad y ciudadanía.",
  ],
  [
    "Formación docente",
    "MIT + Stanford",
    "Capacitación continua para que los profesores integren IA de forma autónoma y sostenible.",
  ],
  [
    "Acceso libre sin código",
    "MIT Day of AI",
    "Herramientas gratuitas, abiertas y sin programación. Funcionan con conectividad básica.",
  ],
  [
    "Verificación y sesgos",
    "Harvard + UNESCO",
    "Componente transversal: evaluar resultados, detectar alucinaciones, comprender sesgos históricos.",
  ],
  [
    "Impacto medible",
    "UNESCO + MIT",
    "Indicadores definidos para monitorear, ajustar y reportar resultados a la institución.",
  ],
];

const niveles = [
  {
    rango: "1° – 2° básico",
    titulo: "Inicial lúdico",
    desc: "Actividades sin pantalla (unplugged). ¿Qué es la IA? ¿Cómo aprenden las máquinas? Juegos de clasificación, patrones y asistentes de voz.",
    tools: [
      "Day of AI — módulo fundacional (5-7 años)",
      "Google Teachable Machine",
      "Scratch (exploración libre)",
      "Actividades desenchufadas MIT RAISE",
    ],
  },
  {
    rango: "3° – 5° básico",
    titulo: "Intermedio aplicado",
    desc: "Uso guiado de IA generativa. Búsqueda eficiente y verificación de fuentes. Primeros pasos en prompting vinculado al currículo.",
    tools: [
      "Khanmigo — tutor IA de Khan Academy",
      "Curipod — clases interactivas con IA",
      "Day of AI — módulos intermedios",
      "PotencIA MINEDUC",
    ],
  },
  {
    rango: "6° – 8° básico",
    titulo: "Avanzado crítico",
    desc: "Prompting avanzado, creación con IA, detección de sesgos y alucinaciones. Debate ético y proyectos aplicados a la comunidad.",
    tools: [
      "MagicSchool.ai",
      "CRAFT Stanford — actividades multidisciplinarias",
      "Day of AI — módulo ética y artes IA",
      "Canva Educación",
    ],
  },
];

const herramientas = [
  [
    "Day of AI (MIT)",
    "Currículo K-12 completo en español",
    "Todos",
    "https://dayofai.org/curriculum-resources",
  ],
  [
    "Khan Academy Khanmigo",
    "Tutor IA personalizado para estudiantes",
    "3°–8°",
    "https://khanacademy.org/khan-labs",
  ],
  [
    "Google Teachable Machine",
    "IA sin programación: imágenes y sonidos",
    "1°–5°",
    "https://teachablemachine.withgoogle.com",
  ],
  [
    "MagicSchool.ai",
    "Planificación docente y recursos con IA",
    "Docentes",
    "https://magicschool.ai",
  ],
  [
    "Scratch + IA (MIT)",
    "Programación por bloques con lógica de IA",
    "3°–8°",
    "https://scratch.mit.edu",
  ],
  ["Curipod", "Clases interactivas generadas con IA", "Docentes / 3°–8°", "https://curipod.com"],
  [
    "Canva Educación",
    "Creación de contenido visual con IA generativa",
    "5°–8°",
    "https://canva.com/education",
  ],
  [
    "PotencIA — MINEDUC",
    "Guía oficial chilena para docentes en IA generativa",
    "Docentes",
    "https://ciudadaniadigital.mineduc.cl/ia",
  ],
];

const fases = [
  [
    "Fase 1",
    "Diagnóstico y diseño",
    "Mapeo de establecimientos en Huechuraba. Diagnóstico de infraestructura y competencias docentes. Adaptación del currículo MIT Day of AI al contexto comunal.",
  ],
  [
    "Fase 2",
    "Piloto controlado",
    "Implementación en 1-2 establecimientos. Talleres por nivel (1°-8°). Formación docente paralela. Bajo costo, alta escalabilidad.",
  ],
  [
    "Fase 3",
    "Evaluación de impacto",
    "Aplicación de indicadores definidos. Encuestas a estudiantes, docentes y directivos. Ajustes al programa según resultados.",
  ],
  [
    "Fase 4",
    "Escalamiento comunal",
    "Replicación en todos los establecimientos de la comuna. Incorporación al Plan Educativo Municipal. Posible certificación piloto Day of AI (MIT).",
  ],
];

const EASE = [0.22, 1, 0.36, 1] as const;
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};

function Index() {
  const [openLevel, setOpenLevel] = useState(0);
  const { theme, toggle } = useTheme();

  return (
    <div className="relative min-h-screen overflow-x-clip bg-background text-foreground">
      {/* Ambient grid backdrop */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.18]"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--color-line) 1px, transparent 1px), linear-gradient(to bottom, var(--color-line) 1px, transparent 1px)",
          backgroundSize: "88px 88px",
          maskImage: "radial-gradient(ellipse at top, black 30%, transparent 75%)",
        }}
      />

      {/* NAV */}
      <header className="sticky top-0 z-40 border-b border-border/70 bg-background/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-4 lg:px-10">
          <a href="#top" className="flex items-center gap-3">
            <span className="relative grid h-9 w-9 place-items-center overflow-hidden rounded-sm bg-foreground text-background">
              <span className="font-serif text-lg italic">H</span>
              <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-accent" />
            </span>
            <span className="hidden font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground sm:block">
              Huechuraba · Educación · IA
            </span>
          </a>
          <nav className="hidden gap-7 font-mono text-[11px] uppercase tracking-[0.2em] md:flex">
            {nav.map(([id, label], i) => (
              <a
                key={id}
                href={`#${id}`}
                className="group flex items-center gap-1.5 text-muted-foreground transition-colors hover:text-foreground"
              >
                <span className="text-accent/80">{String(i + 1).padStart(2, "0")}</span>
                <span>{label}</span>
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <button
              onClick={toggle}
              aria-label={theme === "dark" ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background text-foreground transition-colors hover:bg-muted"
            >
              {theme === "dark" ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                >
                  <circle cx="12" cy="12" r="5" />
                  <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                >
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              )}
            </button>
            <a
              href="#fases"
              className="group relative hidden overflow-hidden rounded-full border border-foreground/80 px-5 py-2 font-mono text-[11px] uppercase tracking-[0.2em] text-foreground transition-colors hover:bg-foreground hover:text-background md:inline-flex md:items-center md:gap-2"
            >
              Implementación
              <span className="transition-transform group-hover:translate-x-0.5">→</span>
            </a>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section id="top" className="relative isolate overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(80% 60% at 75% 10%, oklch(0.76 0.165 55 / 0.16), transparent 60%)",
          }}
        />
        <div className="mx-auto max-w-[1400px] px-6 pb-20 pt-16 lg:px-10 lg:pb-32 lg:pt-24">
          <div className="grid gap-16 lg:grid-cols-12 lg:gap-10">
            <motion.div initial="hidden" animate="show" variants={fadeUp} className="lg:col-span-7">
              <p className="mb-8 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.3em] text-accent">
                <span className="h-px w-10 bg-accent" /> Educación básica · 1° a 8°
              </p>
              <h1 className="font-serif text-[clamp(3rem,8vw,7.5rem)] font-light leading-[0.92] tracking-[-0.04em]">
                Inteligencia
                <br />
                <span className="italic text-accent">Artificial</span> en la
                <br />
                escuela{" "}
                <span className="relative inline-block">
                  pública
                  <svg
                    viewBox="0 0 220 14"
                    className="absolute -bottom-2 left-0 h-3 w-full text-accent/70"
                    preserveAspectRatio="none"
                    aria-hidden
                  >
                    <path
                      d="M2 9 Q 55 1 110 7 T 218 5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                  </svg>
                </span>
                .
              </h1>
              <p className="mt-10 max-w-xl text-balance text-lg leading-relaxed text-muted-foreground">
                Un programa con respaldo de{" "}
                <span className="text-foreground">MIT, Stanford, Harvard, UNESCO</span> y{" "}
                <span className="text-foreground">MINEDUC</span>, diseñado para llevar a la práctica
                un currículo de alfabetización en IA en los establecimientos de Huechuraba.
              </p>

              {/* Credencial de autor */}
              <div className="mt-8 flex max-w-xl items-center gap-5 border-t border-border/70 pt-6">
                <div className="flex-1">
                  <p className="font-serif text-xl font-light text-foreground">Ángel Troncoso</p>
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.25em] text-accent">
                    Experto en Inteligencia Artificial
                  </p>
                </div>
                <a
                  href="https://www.linkedin.com/in/angeltroncoso"
                  target="_blank"
                  rel="noreferrer"
                  className="group/qr shrink-0"
                  aria-label="LinkedIn de Ángel Troncoso"
                >
                  <div className="rounded-sm border border-border bg-white p-2 transition-all group-hover/qr:border-accent">
                    <QRCodeSVG
                      value="https://www.linkedin.com/in/angeltroncoso"
                      size={64}
                      bgColor="#ffffff"
                      fgColor="#000000"
                      level="M"
                    />
                  </div>
                </a>
              </div>

              <div className="mt-10 flex flex-wrap items-center gap-4">
                <a
                  href="#pilares"
                  className="group inline-flex items-center gap-3 rounded-full bg-foreground px-7 py-4 font-mono text-[11px] uppercase tracking-[0.2em] text-background transition-all hover:bg-accent hover:text-accent-foreground"
                >
                  Explorar el programa
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </a>
                <a
                  href="#referentes"
                  className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground underline decoration-accent/60 decoration-1 underline-offset-[6px] transition hover:text-foreground"
                >
                  Ver fuentes verificadas
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: EASE, delay: 0.15 }}
              className="relative lg:col-span-5"
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-sm border border-border">
                <img
                  src={heroImg}
                  alt="Estudiantes y redes neuronales"
                  width={1536}
                  height={1920}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-background/80 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between p-6 font-mono text-[10px] uppercase tracking-[0.25em] text-foreground/80">
                  <span>Fig. 001 — Aprendizaje aumentado</span>
                  <span className="text-accent">↗</span>
                </div>
              </div>
              <div className="absolute -bottom-8 -left-8 hidden max-w-[220px] border border-accent/40 bg-card p-5 shadow-[var(--shadow-lift)] md:block">
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent">
                  Primer país LATAM
                </p>
                <p className="mt-2 font-serif text-base leading-snug">
                  Chile, destacado por UNESCO en IA preescolar.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Big stats — editorial style */}
          <div className="mt-24 grid gap-px overflow-hidden border border-border bg-border lg:grid-cols-3">
            {[
              { n: "92", suffix: "%", t: "estudiantes usan IA globalmente (2025)" },
              { n: "2M", suffix: "+", t: "alumnos beneficiados por Day of AI · MIT" },
              { n: "175", suffix: "", t: "países con currículo MIT Day of AI" },
            ].map((s, i) => (
              <div
                key={s.n}
                className="group relative bg-background p-10 transition-colors hover:bg-card"
              >
                <span className="absolute right-6 top-6 font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                  0{i + 1} / 03
                </span>
                <div className="flex items-baseline gap-1">
                  <span className="font-serif text-7xl font-light leading-none tracking-[-0.04em] text-foreground">
                    {s.n}
                  </span>
                  <span className="font-serif text-5xl text-accent">{s.suffix}</span>
                </div>
                <p className="mt-6 max-w-[14rem] text-sm leading-relaxed text-muted-foreground">
                  {s.t}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTEXTO */}
      <Section
        id="contexto"
        eyebrow="01 — Contexto"
        title="Fundamentación"
        kicker="¿Por qué ahora?"
      >
        <div className="grid gap-12 lg:grid-cols-12">
          <p className="font-serif text-3xl font-light leading-[1.25] tracking-[-0.02em] text-foreground lg:col-span-7">
            La IA está transformando los procesos de aprendizaje y el desarrollo de habilidades del
            siglo XXI.{" "}
            <span className="text-muted-foreground">
              UNESCO, MIT, Stanford y Harvard coinciden en la urgencia de incorporar alfabetización
              en IA desde etapas tempranas.
            </span>
          </p>
          <div className="space-y-6 border-l border-border pl-8 lg:col-span-5">
            <p className="text-base leading-relaxed text-muted-foreground">
              En Chile, la nueva Política Nacional de IA contempla actualizar las bases curriculares
              desde preescolar. Persiste, sin embargo, una brecha entre el conocimiento declarado y
              la práctica real en los establecimientos.
            </p>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
              → Este programa propone cerrar esa brecha en Huechuraba.
            </p>
          </div>
        </div>
      </Section>

      {/* REFERENTES */}
      <Section
        id="referentes"
        eyebrow="02 — Referentes"
        title="Respaldo internacional"
        kicker="Seis fuentes verificadas"
      >
        <div className="grid gap-px border border-border bg-border md:grid-cols-2">
          {referentes.map((r, i) => (
            <motion.article
              key={r.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.05, ease: EASE }}
              className={`group relative bg-background transition-colors hover:bg-card ${r.visual ? "p-0" : "p-10"}`}
            >
              {r.visual ? (
                <div className="relative h-full min-h-[320px] overflow-hidden">
                  <img
                    src={r.visual}
                    alt="Red internacional de educación en inteligencia artificial"
                    width={1024}
                    height={1024}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
                      / {String(i + 1).padStart(2, "0")} · {r.tag}
                    </span>
                    <h3 className="mt-3 font-serif text-2xl font-light leading-tight text-foreground">
                      {r.title}
                    </h3>
                    <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
                      {r.body}
                    </p>
                  </div>
                </div>
              ) : (
                <>
                  <div className="mb-6 flex items-center justify-between">
                    <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
                      / {String(i + 1).padStart(2, "0")} · {r.tag}
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                      Fuente verificada
                    </span>
                  </div>
                  <h3 className="font-serif text-3xl font-light leading-tight">{r.title}</h3>
                  <p className="mt-5 max-w-md leading-relaxed text-muted-foreground">{r.body}</p>
                  <ul className="mt-8 space-y-3 border-t border-border/70 pt-6">
                    {r.links.map(([label, href]) => (
                      <li key={href}>
                        <a
                          href={href}
                          target="_blank"
                          rel="noreferrer"
                          className="group/link flex items-center justify-between gap-4 text-sm text-foreground transition-colors hover:text-accent"
                        >
                          <span className="border-b border-border/70 group-hover/link:border-accent">
                            {label}
                          </span>
                          <span className="font-mono text-xs text-muted-foreground transition-transform group-hover/link:translate-x-1 group-hover/link:text-accent">
                            ↗
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </motion.article>
          ))}
        </div>
      </Section>

      {/* COMPETENCIAS */}
      <Section
        id="competencias"
        eyebrow="03 — UNESCO 2024"
        title="Marco de competencias"
        kicker="12 competencias · 4 dimensiones"
      >
        <div className="mb-14 flex flex-wrap items-center gap-3 font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
          <span>Comprender</span>
          <span className="h-px w-8 bg-border" />
          <span>Aplicar</span>
          <span className="h-px w-8 bg-border" />
          <span className="text-accent">Crear con IA</span>
        </div>
        <div className="grid gap-px border border-border bg-border md:grid-cols-2 lg:grid-cols-4">
          {competencias.map((c, i) => (
            <motion.div
              key={c.code}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group relative flex flex-col bg-background p-8 transition-colors hover:bg-card"
            >
              <div className="mb-6 flex items-start justify-between">
                <span className="font-serif text-7xl font-light leading-none text-accent">
                  {c.code}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                  Dim. {c.code.slice(1)}
                </span>
              </div>
              <h3 className="font-serif text-xl font-normal leading-tight">{c.title}</h3>
              <ul className="mt-6 space-y-3 text-sm text-muted-foreground">
                {c.items.map((it) => (
                  <li
                    key={it}
                    className="flex gap-3 border-t border-border/60 pt-3 first:border-t-0 first:pt-0"
                  >
                    <span className="font-mono text-[10px] text-accent">+</span>
                    <span className="leading-snug">{it}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* PILARES */}
      <Section
        id="pilares"
        eyebrow="04 — Pilares"
        title="Ocho pilares"
        kicker="Síntesis MIT · Stanford · Harvard · UNESCO"
      >
        <div className="grid gap-px border border-border bg-border md:grid-cols-2 lg:grid-cols-4">
          {pilares.map(([title, source, body], i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (i % 4) * 0.06 }}
              className="group relative flex flex-col bg-background p-8 transition-colors hover:bg-card"
            >
              <span className="absolute right-6 top-6 font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                {source}
              </span>
              <span className="font-serif text-6xl font-light leading-none tracking-[-0.04em] text-foreground/90 transition-colors group-hover:text-accent">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-8 font-serif text-lg font-normal leading-snug">{title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{body}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* NIVELES */}
      <Section
        id="niveles"
        eyebrow="05 — Progresión"
        title="Currículo por nivel"
        kicker="De lo lúdico a lo crítico"
      >
        <div className="mb-8 flex flex-wrap gap-0 border-y border-border">
          {niveles.map((n, i) => (
            <button
              key={n.rango}
              onClick={() => setOpenLevel(i)}
              className={`relative flex-1 px-6 py-5 text-left font-mono text-[11px] uppercase tracking-[0.2em] transition-colors ${
                openLevel === i ? "text-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <span className="block text-[10px] text-accent">0{i + 1}</span>
              <span className="mt-1 block">{n.rango}</span>
              {openLevel === i && (
                <motion.span
                  layoutId="lvl-indicator"
                  className="absolute inset-x-0 -bottom-px h-px bg-accent"
                />
              )}
            </button>
          ))}
        </div>
        <motion.div
          key={openLevel}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid gap-12 py-4 lg:grid-cols-12 lg:gap-16"
        >
          <div className="lg:col-span-7">
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-accent">
              {niveles[openLevel].rango}
            </p>
            <h3 className="mt-3 font-serif text-5xl font-light leading-[1.05] tracking-[-0.03em] md:text-6xl">
              {niveles[openLevel].titulo}
            </h3>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground">
              {niveles[openLevel].desc}
            </p>
          </div>
          <div className="lg:col-span-5">
            <p className="mb-5 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
              <span className="h-px w-6 bg-accent" /> Herramientas recomendadas
            </p>
            <ul className="border-t border-border">
              {niveles[openLevel].tools.map((t, i) => (
                <li
                  key={t}
                  className="group flex items-center justify-between gap-4 border-b border-border py-4 text-sm transition-colors hover:text-foreground"
                >
                  <span className="flex items-baseline gap-4 text-muted-foreground group-hover:text-foreground">
                    <span className="font-mono text-[10px] text-accent">0{i + 1}</span>
                    {t}
                  </span>
                  <span className="text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-accent">
                    →
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </Section>

      {/* SUPER PROFESOR */}
      <section
        id="super-profesor"
        className="relative border-t border-border bg-background/30 noise"
      >
        <div className="mx-auto max-w-[1400px] px-6 py-24 lg:px-10 lg:py-32">
          <SuperProfesor />
        </div>
      </section>

      {/* HERRAMIENTAS */}
      <Section
        id="herramientas"
        eyebrow="06 — Recursos"
        title="Herramientas verificadas"
        kicker="Acceso libre · sin programación"
      >
        <div className="border-t border-border">
          {herramientas.map(([name, use, level, href], i) => (
            <a
              key={name}
              href={href}
              target="_blank"
              rel="noreferrer"
              className="group grid grid-cols-12 items-center gap-4 border-b border-border py-6 transition-colors hover:bg-card"
            >
              <span className="col-span-1 font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="col-span-11 font-serif text-2xl font-light leading-tight tracking-[-0.02em] md:col-span-4">
                {name}
              </span>
              <span className="col-span-8 hidden text-sm text-muted-foreground md:col-span-5 md:block">
                {use}
              </span>
              <span className="col-span-2 hidden font-mono text-[10px] uppercase tracking-[0.2em] text-accent md:block">
                {level}
              </span>
              <span className="col-span-12 font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground transition-colors group-hover:text-accent md:hidden">
                {level} · {use}
              </span>
              <span className="col-span-12 hidden text-right font-mono text-[10px] text-muted-foreground transition-all group-hover:translate-x-1 group-hover:text-accent md:col-span-12 md:hidden">
                ↗
              </span>
              <span
                className="absolute right-10 hidden font-mono text-xs text-muted-foreground transition-all group-hover:text-accent md:inline"
                aria-hidden
              />
            </a>
          ))}
        </div>
      </Section>

      {/* FASES */}
      <Section
        id="fases"
        eyebrow="07 — Implementación"
        title="Modelo en cuatro fases"
        kicker="Diagnóstico → Piloto → Evaluación → Escala"
      >
        <div className="grid gap-px border border-border bg-border md:grid-cols-2 lg:grid-cols-4">
          {fases.map(([phase, title, body], i) => (
            <motion.div
              key={phase}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="relative flex flex-col bg-background p-10"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
                  {phase}
                </span>
                <span className="font-serif text-5xl font-light text-foreground/30">0{i + 1}</span>
              </div>
              <div className="mt-6 h-px w-full bg-border" />
              <h3 className="mt-6 font-serif text-2xl font-normal leading-tight">{title}</h3>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{body}</p>
              {i < fases.length - 1 && (
                <span className="absolute -right-3 top-1/2 hidden h-6 w-6 -translate-y-1/2 items-center justify-center bg-background text-accent lg:flex">
                  →
                </span>
              )}
            </motion.div>
          ))}
        </div>
      </Section>

      {/* CTA / COLOPHON */}
      <section className="relative border-t border-border">
        <div className="mx-auto max-w-[1400px] px-6 py-24 lg:px-10 lg:py-32">
          <div className="grid gap-16 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-accent">
                Colofón
              </p>
              <h2 className="mt-6 font-serif text-5xl font-light leading-[1.05] tracking-[-0.03em] md:text-7xl">
                Llevemos esta <span className="italic text-accent">conversación</span> al aula.
              </h2>
              <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground">
                Documento preparado para audiencia Ley N°20.730 con la Municipalidad de Huechuraba.
                Disponible para discusión, pilotaje y escalamiento comunal.
              </p>
              <a
                href="#top"
                className="mt-10 inline-flex items-center gap-3 rounded-full border border-foreground/80 px-7 py-4 font-mono text-[11px] uppercase tracking-[0.2em] text-foreground transition-all hover:bg-accent hover:text-accent-foreground"
              >
                Volver al inicio <span>↑</span>
              </a>
            </div>
            <div className="space-y-8 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground lg:col-span-4">
              <div>
                <p className="mb-2 text-accent">Destinataria</p>
                <p className="text-foreground/90">Lisette Lepe (S)</p>
                <p>Encargada Depto. de Educación</p>
              </div>
              <div>
                <p className="mb-2 text-accent">Marco legal</p>
                <p className="text-foreground/90">Ley N°20.730 — Lobby</p>
              </div>
              <div>
                <p className="mb-2 text-accent">Fuentes</p>
                <p className="leading-relaxed">
                  MIT RAISE · Stanford HAI · Harvard HGSE · UNESCO · MINEDUC Chile
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-border">
          <div className="mx-auto flex max-w-[1400px] flex-wrap items-center justify-between gap-3 px-6 py-6 font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground lg:px-10">
            <span>© 2026 · Municipalidad de Huechuraba</span>
            <span>Programa de Revisión IA · v1.0</span>
            <span className="text-accent">Junio · Santiago · Chile</span>
          </div>
        </div>
      </section>

      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/56931393819"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contactar por WhatsApp"
        className="group fixed bottom-6 right-6 z-50 flex items-center gap-3 md:bottom-8 md:right-8"
      >
        <span className="mb-1 max-w-0 overflow-hidden whitespace-nowrap rounded-full bg-card px-0 py-2 font-mono text-[11px] uppercase tracking-[0.2em] text-foreground shadow-[var(--shadow-lift)] transition-all duration-500 group-hover:max-w-[200px] group-hover:px-5">
          Escríbenos
        </span>
        <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-[0_0_0_0_rgba(37,211,102,0.7)] transition-shadow duration-300 hover:shadow-[0_0_28px_8px_rgba(37,211,102,0.35)] md:h-16 md:w-16">
          <span className="absolute inset-0 inline-flex h-full w-full animate-ping rounded-full bg-[#25D366] opacity-40" />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="relative z-10 h-7 w-7 text-white md:h-8 md:w-8"
            aria-hidden="true"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.339A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
        </span>
      </a>
    </div>
  );
}

function Section({
  id,
  eyebrow,
  title,
  kicker,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  kicker?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="relative border-t border-border">
      <div className="mx-auto max-w-[1400px] px-6 py-24 lg:px-10 lg:py-32">
        <div className="mb-16 grid gap-6 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-accent">
              {eyebrow}
            </p>
            {kicker && (
              <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                {kicker}
              </p>
            )}
          </div>
          <h2 className="font-serif text-5xl font-light leading-[1.02] tracking-[-0.03em] lg:col-span-8 md:text-6xl lg:text-7xl">
            {title}
          </h2>
        </div>
        {children}
      </div>
    </section>
  );
}
