import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Markdown from "react-markdown";
import {
  Sparkles,
  BookOpen,
  Gamepad2,
  Brain,
  Copy,
  Check,
  RefreshCw,
  Send,
  User,
  Lightbulb,
  Printer,
  ChevronRight,
  ArrowRight,
} from "lucide-react";
import { generateCurriculumPlan } from "@/lib/api/super-profesor.functions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

interface Message {
  role: "user" | "model";
  text: string;
}

const subjects = [
  "Lenguaje y Comunicación",
  "Matemáticas",
  "Ciencias Naturales",
  "Historia, Geografía y Ciencias Sociales",
  "Tecnología",
  "Artes Visuales / Música",
  "Orientación / Ética",
];

const subjectTopicSuggestions: Record<number, Record<string, string[]>> = {
  0: {
    // 1° – 2° básico (Lúdico)
    "Lenguaje y Comunicación": [
      "Conciencia fonológica con rimas y aplausos",
      "Comprensión oral mediante narración de cuentos",
      "Asistentes de voz y reconocimiento de palabras simples",
      "Asociación de imágenes y grafemas interactivos",
    ],
    Matemáticas: [
      "Patrones repetitivos con bloques de colores",
      "Secuencias lógicas numéricas simples (1 al 20)",
      "Clasificación de figuras geométricas básicas",
      "Algoritmos sencillos: instrucciones para cruzar la calle",
    ],
    "Ciencias Naturales": [
      "Los seres vivos y sus necesidades básicas",
      "Clasificación de hojas y frutos según su forma",
      "Los cinco sentidos y cómo perciben el entorno",
      "Estaciones del año y cambios en el clima",
    ],
    "Historia, Geografía y Ciencias Sociales": [
      "Mi familia y mi comunidad escolar",
      "Planos simples de la sala de clases y el hogar",
      "Normas de convivencia en la escuela y el barrio",
      "Hitos de Huechuraba explicados con dibujos",
    ],
    Tecnología: [
      "Objetos tecnológicos versus elementos naturales",
      "Instrucciones lógicas para guiar a un compañero robot",
      "Uso responsable del tiempo frente a pantallas",
      "Introducción a Scratch Jr con bloques de movimiento",
    ],
    "Artes Visuales / Música": [
      "Colores primarios y mezclas en pintura libre",
      "Patrones de ritmos y sonidos corporales rápidos/lentos",
      "Clasificación de sonidos cotidianos usando Teachable Machine",
      "Creación de títeres con materiales reciclados",
    ],
    "Orientación / Ética": [
      "Identificación y expresión de emociones básicas",
      "Compartir juegos y respetar turnos en el aula",
      "Privacidad: por qué no dar datos personales a robots",
      "Colaboración grupal para resolver un acertijo",
    ],
    Otro: [
      "Asociar símbolos y sonidos con juegos kinestésicos",
      "Seguir secuencias de pasos lógicos en una coreografía",
      "Exploración de texturas en la naturaleza",
      "Resolución creativa de pequeños desafíos cotidianos",
    ],
  },
  1: {
    // 3° – 5° básico (Aplicado)
    "Lenguaje y Comunicación": [
      "Comprensión lectora de fábulas tradicionales chilenas",
      "Estructura del mito y la leyenda local",
      "Uso de IA (Khanmigo) para corregir ortografía y redacción",
      "Formulación de buenas preguntas (prompting) para resumir textos",
    ],
    Matemáticas: [
      "Fracciones y reparto equitativo de chocolates",
      "Tablas de multiplicar mediante juegos de patrones",
      "Operaciones matemáticas asistidas por tutores de IA",
      "Resolución de problemas con esquemas visuales interactivos",
    ],
    "Ciencias Naturales": [
      "El ciclo del agua y los efectos del cambio climático",
      "Ecosistemas de Chile y adaptaciones de animales",
      "El sistema solar: planetas y sus órbitas",
      "Nutrición y hábitos de vida saludable guiados por Curipod",
    ],
    "Historia, Geografía y Ciencias Sociales": [
      "Historia de Huechuraba y sus hitos comunales",
      "Pueblos originarios de Chile y su legado cultural",
      "Uso de mapas y coordenadas geográficas básicas",
      "Derechos del niño y participación estudiantil activa",
    ],
    Tecnología: [
      "Diseño de una presentación interactiva en Canva",
      "Programación de un laberinto sencillo en Scratch",
      "Búsqueda segura de información en internet y verificación",
      "Creación de infografías digitales sobre inventos históricos",
    ],
    "Artes Visuales / Música": [
      "Paisajes de Chile a través del collage y acuarela",
      "Creación de melodías sencillas con instrumentos virtuales",
      "Co-creación de collages digitales inspirados en el patrimonio",
      "Artesanía tradicional chilena con greda o modelado",
    ],
    "Orientación / Ética": [
      "Resolución pacífica de conflictos escolares",
      "Identificar el acoso escolar (bullying) y ciberacoso",
      "Uso ético y responsable de asistentes de inteligencia artificial",
      "Autocuidado y desconexión digital saludable",
    ],
    Otro: [
      "Indagación guiada sobre temas de interés estudiantil",
      "Pensamiento de diseño básico para resolver problemas escolares",
      "Técnicas de estudio interactivo y mapas conceptuales",
      "Proyectos de reciclaje y cuidado del medio ambiente",
    ],
  },
  2: {
    // 6° – 8° básico (Crítico)
    "Lenguaje y Comunicación": [
      "Noticias falsas (fake news) y sesgo de confirmación",
      "Debates argumentados sobre el impacto de la IA en la sociedad",
      "Análisis crítico de textos literarios clásicos",
      "Co-creación de narrativas interactivas de ficción usando IA",
    ],
    Matemáticas: [
      "Sistemas de ecuaciones y optimización de recursos locales",
      "Estadística: análisis crítico de gráficos manipulados",
      "Uso de planillas de cálculo e IA para presupuestos familiares",
      "Álgebra y su aplicación en la programación de algoritmos",
    ],
    "Ciencias Naturales": [
      "Biodiversidad chilena y preservación en áreas protegidas",
      "La célula: estructura básica de los seres vivos",
      "Fuerza, movimiento y leyes físicas en la vida cotidiana",
      "Análisis de huella de carbono y simulación de impacto ecológico",
    ],
    "Historia, Geografía y Ciencias Sociales": [
      "Historia de Chile durante el siglo XX",
      "Democracia, derechos ciudadanos y civismo en la era digital",
      "Geografía humana y sustentabilidad en Huechuraba",
      "La revolución industrial comparada con la revolución de la IA",
    ],
    Tecnología: [
      "Programación avanzada y condicionales en bloques/Python",
      "Ciberseguridad: protección de datos personales y phishing",
      "Diseño 3D y prototipado de soluciones comunitarias",
      "Análisis de algoritmos de recomendación en redes sociales",
    ],
    "Artes Visuales / Música": [
      "Expresionismo, abstracción y diseño asistido por IA",
      "Edición multimedia de audio y video para campañas sociales",
      "Ética en la autoría de arte generado por inteligencia artificial",
      "Composición de bandas sonoras con sintetizadores digitales",
    ],
    "Orientación / Ética": [
      "Sesgo algorítmico y discriminación en sistemas de IA",
      "Proyecto de vida, vocación y el futuro laboral automatizado",
      "Derechos de propiedad intelectual y plagio digital en trabajos",
      "Ciudadanía digital crítica y activismo escolar positivo",
    ],
    Otro: [
      "Investigación escolar con metodologías activas y críticas",
      "Diseño de prototipos tecnológicos para resolver problemas locales",
      "Análisis crítico del consumo de información en plataformas",
      "Debates éticos sobre ciencia, tecnología y derechos humanos",
    ],
  },
};

const loadingTexts = [
  "Consultando bases curriculares nacionales...",
  "Alineando con el Marco de Competencias en IA de la UNESCO 2024...",
  "Integrando recursos pedagógicos del MIT Day of AI...",
  "Adaptando la metodología activa y crítica de Stanford HAI...",
  "Estructurando la planificación con enfoque en espiral...",
  "Diseñando preguntas de metacognición humana...",
];

export function SuperProfesor() {
  const [levelId, setLevelId] = useState<number>(0);
  const [subject, setSubject] = useState<string>(subjects[0]);
  const [customSubject, setCustomSubject] = useState<string>("");
  const [topic, setTopic] = useState<string>("");
  const [goalType, setGoalType] = useState<"lesson_plan" | "activity" | "chat">("lesson_plan");
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingStep, setLoadingStep] = useState<number>(0);
  const [result, setResult] = useState<string>("");
  const [chatHistory, setChatHistory] = useState<Message[]>([]);
  const [followUpText, setFollowUpText] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);

  const responseEndRef = useRef<HTMLDivElement>(null);

  const activeSubject = subject === "Otro" ? customSubject : subject;

  const professors = [
    {
      id: 0,
      name: "Prof. Lalo Lúdico",
      rango: "1° – 2° básico",
      tagline: "Experto en juego y lógica desenchufada",
      desc: "Especialista en enseñar lógica e IA sin pantallas. Integra juegos físicos, Scratch Jr y Teachable Machine mediante dinámicas activas y sensoriales.",
      color:
        "from-amber-500/10 to-orange-500/10 border-amber-500/30 text-amber-600 dark:text-amber-400",
      badgeColor: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
      icon: Gamepad2,
      placeholder: "Ej: Reconocer patrones o entender cómo una máquina aprende a clasificar...",
    },
    {
      id: 1,
      name: "Prof. Ana Aplicada",
      rango: "3° – 5° básico",
      tagline: "Especialista en tutoría y herramientas activas",
      desc: "Enfocada en guiar a los alumnos en el uso de IA como copiloto de aprendizaje (Khanmigo, Curipod), promoviendo la indagación y la formulación de preguntas.",
      color:
        "from-teal-500/10 to-emerald-500/10 border-teal-500/30 text-teal-600 dark:text-teal-400",
      badgeColor: "bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-300",
      icon: BookOpen,
      placeholder: "Ej: Fracciones aplicadas o comprensión de textos narrativos...",
    },
    {
      id: 2,
      name: "Prof. Clara Crítica",
      rango: "6° – 8° básico",
      tagline: "Mentora en ética y pensamiento profundo",
      desc: "Promueve que los estudiantes analicen sesgos, verifiquen alucinaciones, debatan sobre el uso de datos y utilicen prompts complejos para crear proyectos.",
      color:
        "from-violet-500/10 to-purple-500/10 border-violet-500/30 text-violet-600 dark:text-violet-400",
      badgeColor: "bg-violet-100 text-violet-800 dark:bg-violet-900/30 dark:text-violet-300",
      icon: Brain,
      placeholder: "Ej: Detectar noticias falsas en redes sociales o diseñar un cómic con Canva...",
    },
  ];

  const handleLevelChange = (id: number) => {
    setLevelId(id);
    setTopic("");
  };

  const cycleLoadingText = (intervalRef: { current: number | null }) => {
    let step = 0;
    setLoadingStep(0);
    intervalRef.current = window.setInterval(() => {
      step = (step + 1) % loadingTexts.length;
      setLoadingStep(step);
    }, 3000);
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) {
      toast.error("Por favor, ingresa un tema o unidad didáctica.");
      return;
    }
    if (subject === "Otro" && !customSubject.trim()) {
      toast.error("Por favor, especifica la asignatura.");
      return;
    }

    setLoading(true);
    setResult("");
    setChatHistory([]);

    const intervalRef: { current: number | null } = { current: null };
    cycleLoadingText(intervalRef);

    try {
      const response = await generateCurriculumPlan({
        data: {
          levelId,
          subject: activeSubject,
          topic,
          goalType,
        },
      });

      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
      }

      if ("error" in response && response.error) {
        throw new Error(response.error);
      }

      setResult(response.text || "");

      // Seed initial history
      const initialUserPrompt =
        goalType === "lesson_plan"
          ? "Generar planificación"
          : goalType === "activity"
            ? "Diseñar actividad práctica"
            : "Hacer una consulta";

      setChatHistory([
        {
          role: "user",
          text: `${initialUserPrompt} sobre: "${topic}" en la asignatura de ${activeSubject}`,
        },
        { role: "model", text: response.text || "" },
      ]);

      toast.success("¡Planificación curricular generada exitosamente!");
    } catch (error) {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
      }
      console.error(error);
      const errorMessage =
        error instanceof Error ? error.message : "Ocurrió un error al contactar al Súper Profesor.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleFollowUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!followUpText.trim() || loading) return;

    const userMessage = followUpText;
    setFollowUpText("");
    setLoading(true);

    const updatedHistory: Message[] = [...chatHistory, { role: "user", text: userMessage }];
    setChatHistory(updatedHistory);

    const intervalRef: { current: number | null } = { current: null };
    cycleLoadingText(intervalRef);

    try {
      const response = await generateCurriculumPlan({
        data: {
          levelId,
          subject: activeSubject,
          topic,
          goalType: "chat", // Treat modifications as chat inquiries
          history: updatedHistory.slice(0, -1), // Send history prior to current prompt
        },
      });

      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
      }

      if ("error" in response && response.error) {
        throw new Error(response.error);
      }

      setResult(response.text || "");
      setChatHistory([...updatedHistory, { role: "model", text: response.text || "" }]);

      setTimeout(() => {
        responseEndRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 200);

      toast.success("¡Planificación adaptada con éxito!");
    } catch (error) {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
      }
      console.error(error);
      const errorMessage =
        error instanceof Error ? error.message : "No se pudo actualizar el plan.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const applyPresetQuery = (text: string) => {
    setFollowUpText(text);
  };

  const handleCopy = () => {
    if (!result) return;
    navigator.clipboard.writeText(result);
    setCopied(true);
    toast.success("Copiado al portapapeles");
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    const formattedHtml = `
      <html>
        <head>
          <title>Planificación - Súper Profesor IA</title>
          <style>
            body {
              font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
              line-height: 1.6;
              color: #333;
              padding: 40px;
              max-width: 800px;
              margin: 0 auto;
            }
            h1 { font-family: Georgia, serif; font-size: 28px; color: #111; border-bottom: 2px solid #333; padding-bottom: 10px; }
            h2 { font-family: Georgia, serif; font-size: 20px; color: #444; margin-top: 30px; border-bottom: 1px solid #ddd; padding-bottom: 5px; }
            h3 { font-size: 16px; color: #555; }
            ul, ol { padding-left: 20px; }
            li { margin-bottom: 8px; }
            strong { color: #111; }
            .header-meta { font-family: monospace; font-size: 12px; text-transform: uppercase; color: #666; margin-bottom: 30px; }
            @media print {
              body { padding: 0; }
              button { display: none; }
            }
          </style>
        </head>
        <body>
          <div class="header-meta">
            Súper Profesor de Currículo IA · Huechuraba<br>
            Nivel: ${professors[levelId].rango} · Asignatura: ${activeSubject}<br>
            Tema: ${topic}
          </div>
          <button onclick="window.print()" style="padding: 10px 15px; background: #000; color: #fff; border: none; border-radius: 4px; cursor: pointer; font-size: 14px; margin-bottom: 20px;">Imprimir Documento</button>
          <div>
            ${document.getElementById("plan-content-rendered")?.innerHTML || ""}
          </div>
        </body>
      </html>
    `;
    printWindow.document.write(formattedHtml);
    printWindow.document.close();
  };

  const currentProf = professors[levelId];

  return (
    <div id="super-profesor" className="mx-auto max-w-[1400px]">
      <div className="mb-12 text-center lg:text-left">
        <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-accent">
          05.1 — Herramienta de Aula
        </span>
        <h2 className="mt-4 font-serif text-4xl font-light leading-none tracking-[-0.03em] md:text-5xl lg:text-6xl">
          Súper Profesor <span className="italic text-accent">de Currículo</span>
        </h2>
        <p className="mt-4 max-w-2xl text-base text-muted-foreground">
          Selecciona el nivel de tus alumnos y tu asignatura. Nuestro Súper Profesor IA, entrenado
          bajo los marcos de MIT, Stanford, Harvard y UNESCO, estructurará propuestas curriculares
          integrando las herramientas recomendadas.
        </p>
      </div>

      <div className="grid gap-10 lg:grid-cols-12">
        {/* Left column: Setup Form */}
        <div className="lg:col-span-5 space-y-8">
          <div className="rounded-lg border border-border bg-card/40 p-6 backdrop-blur-sm shadow-sm space-y-6">
            {/* 1. Profile / Level Selector */}
            <div>
              <Label className="font-mono text-xs uppercase tracking-wider text-muted-foreground mb-3 block">
                1. Selecciona el nivel escolar
              </Label>
              <div className="grid gap-3 sm:grid-cols-3">
                {professors.map((p) => {
                  const Icon = p.icon;
                  const isActive = levelId === p.id;
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => handleLevelChange(p.id)}
                      className={`relative flex flex-col items-center justify-center p-4 rounded-lg border text-center transition-all cursor-pointer ${
                        isActive
                          ? `bg-background border-accent shadow-sm ring-1 ring-accent/30`
                          : "bg-background/50 border-border hover:bg-background hover:border-border-hover"
                      }`}
                    >
                      <Icon
                        className={`h-6 w-6 mb-2 ${isActive ? "text-accent" : "text-muted-foreground"}`}
                      />
                      <span className="font-mono text-[11px] font-bold block leading-none">
                        {p.rango}
                      </span>
                      <span className="text-[9px] text-muted-foreground mt-1 leading-tight">
                        {p.id === 0 ? "Lúdico" : p.id === 1 ? "Aplicado" : "Crítico"}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Professor Card Display */}
            <AnimatePresence mode="wait">
              <motion.div
                key={levelId}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.2 }}
                className={`p-4 rounded-lg border bg-gradient-to-br ${currentProf.color} space-y-2`}
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-serif text-lg font-medium text-foreground">
                    {currentProf.name}
                  </h4>
                  <span
                    className={`px-2 py-0.5 rounded text-[9px] font-mono uppercase ${currentProf.badgeColor}`}
                  >
                    {currentProf.rango}
                  </span>
                </div>
                <p className="font-mono text-[10px] uppercase tracking-wider opacity-80">
                  {currentProf.tagline}
                </p>
                <p className="text-xs text-muted-foreground leading-relaxed pt-1 border-t border-border/50">
                  {currentProf.desc}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* 2. Asignatura */}
            <div className="space-y-2">
              <Label className="font-mono text-xs uppercase tracking-wider text-muted-foreground block">
                2. Asignatura curricular
              </Label>
              <Select value={subject} onValueChange={setSubject}>
                <SelectTrigger className="w-full bg-background border-border">
                  <SelectValue placeholder="Selecciona una asignatura" />
                </SelectTrigger>
                <SelectContent>
                  {subjects.map((sub) => (
                    <SelectItem key={sub} value={sub}>
                      {sub}
                    </SelectItem>
                  ))}
                  <SelectItem value="Otro">Otra (Especificar...)</SelectItem>
                </SelectContent>
              </Select>

              {subject === "Otro" && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="pt-2"
                >
                  <Input
                    placeholder="Escribe el nombre de la asignatura..."
                    value={customSubject}
                    onChange={(e) => setCustomSubject(e.target.value)}
                    className="bg-background border-border"
                  />
                </motion.div>
              )}
            </div>

            {/* 3. Tema de la clase */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                  3. Tema o Contenido
                </Label>
                <span className="text-[10px] text-muted-foreground font-mono">
                  ¿Qué vas a enseñar?
                </span>
              </div>
              <Input
                placeholder={currentProf.placeholder}
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="bg-background border-border placeholder:text-muted-foreground/50 text-sm"
              />

              {/* Suggestions Chips */}
              <div className="pt-2">
                <span className="font-mono text-[9px] text-muted-foreground block mb-1.5 uppercase">
                  Sugerencias de temas populares para esta asignatura:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {(
                    subjectTopicSuggestions[levelId]?.[subject] ||
                    subjectTopicSuggestions[levelId]?.["Otro"] ||
                    []
                  ).map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setTopic(s)}
                      className="px-2 py-1 rounded bg-muted/60 hover:bg-muted text-[10px] text-muted-foreground hover:text-foreground transition-colors text-left"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* 4. Objetivo o Formato */}
            <div className="space-y-2">
              <Label className="font-mono text-xs uppercase tracking-wider text-muted-foreground block">
                4. ¿Qué necesitas generar?
              </Label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: "lesson_plan", label: "Plan de Clase", desc: "Clase de 90 min" },
                  { id: "activity", label: "Actividad", desc: "Propuesta práctica" },
                  { id: "chat", label: "Consulta IA", desc: "Consejos / Dudas" },
                ].map((g) => (
                  <button
                    key={g.id}
                    type="button"
                    onClick={() => setGoalType(g.id as "lesson_plan" | "activity" | "chat")}
                    className={`p-3 rounded border text-left flex flex-col justify-between transition-colors ${
                      goalType === g.id
                        ? "bg-background border-accent shadow-sm ring-1 ring-accent/20"
                        : "bg-background/40 border-border hover:bg-background/80"
                    }`}
                  >
                    <span className="text-[11px] font-bold block">{g.label}</span>
                    <span className="text-[8px] text-muted-foreground mt-0.5">{g.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <Button
              onClick={handleGenerate}
              disabled={loading}
              className="w-full h-11 bg-foreground hover:bg-foreground/90 text-background font-mono text-[11px] uppercase tracking-[0.2em] rounded transition-all cursor-pointer"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  <span>Procesando...</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 justify-center">
                  <Sparkles className="h-4 w-4 text-accent animate-pulse" />
                  <span>Generar Propuesta Curricular</span>
                </div>
              )}
            </Button>
          </div>
        </div>

        {/* Right column: Main interactive outputs / results */}
        <div className="lg:col-span-7 flex flex-col h-full min-h-[500px]">
          <div className="flex-1 rounded-lg border border-border bg-card/20 backdrop-blur-sm p-6 shadow-sm flex flex-col justify-between min-h-[480px]">
            {/* Case 1: Empty state */}
            {!loading && !result && (
              <div className="flex flex-col items-center justify-center text-center py-20 h-full my-auto">
                <div className="h-16 w-16 rounded-full bg-muted/40 flex items-center justify-center text-muted-foreground mb-6">
                  <Sparkles className="h-8 w-8 text-accent/60" />
                </div>
                <h3 className="font-serif text-2xl font-light text-foreground">
                  Tu aula te espera
                </h3>
                <p className="mt-3 max-w-sm text-sm text-muted-foreground">
                  Configura los detalles de tu clase a la izquierda y el Súper Profesor creará un
                  plan de clase alineado a los estándares pedagógicos mundiales.
                </p>
                <div className="mt-8 border-t border-border/80 pt-6 max-w-md w-full">
                  <p className="font-mono text-[9px] uppercase tracking-widest text-accent mb-3">
                    Estándares integrados
                  </p>
                  <div className="grid grid-cols-2 gap-4 text-left font-mono text-[10px] text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <span className="text-accent">•</span> MIT Day of AI K-12
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-accent">•</span> Stanford CRAFT Project
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-accent">•</span> Harvard Critical AI Guidelines
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-accent">•</span> UNESCO Student AI Framework
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Case 2: Loading State */}
            {loading && !result && (
              <div className="flex flex-col items-center justify-center text-center py-24 h-full my-auto space-y-6">
                <div className="relative">
                  <div className="h-14 w-14 rounded-full border-2 border-accent/20 border-t-accent animate-spin" />
                  <Sparkles className="h-6 w-6 text-accent absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" />
                </div>
                <div className="space-y-2">
                  <h4 className="font-mono text-xs uppercase tracking-widest text-accent animate-pulse">
                    {currentProf.name} está redactando...
                  </h4>
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={loadingStep}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      transition={{ duration: 0.3 }}
                      className="text-sm text-muted-foreground max-w-sm mx-auto"
                    >
                      {loadingTexts[loadingStep]}
                    </motion.p>
                  </AnimatePresence>
                </div>
              </div>
            )}

            {/* Case 3: Result Display */}
            {result && (
              <div className="flex flex-col h-full space-y-6">
                {/* Result Actions Header */}
                <div className="flex items-center justify-between pb-4 border-b border-border/60">
                  <div className="flex items-center gap-3">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase ${currentProf.badgeColor}`}
                    >
                      {currentProf.rango}
                    </span>
                    <span className="font-mono text-xs text-muted-foreground uppercase tracking-wider">
                      {activeSubject}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleCopy}
                      className="h-8 font-mono text-[10px] uppercase px-3"
                    >
                      {copied ? (
                        <>
                          <Check className="h-3 w-3 text-green-500 mr-1.5" />
                          <span>Copiado</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3 w-3 text-muted-foreground mr-1.5" />
                          <span>Copiar</span>
                        </>
                      )}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handlePrint}
                      className="h-8 font-mono text-[10px] uppercase px-3"
                    >
                      <Printer className="h-3 w-3 text-muted-foreground mr-1.5" />
                      <span>Imprimir</span>
                    </Button>
                  </div>
                </div>

                {/* Lesson Plan Document Render (Classic editorial style card) */}
                <div className="flex-1 overflow-y-auto max-h-[450px] bg-background/50 border border-border/60 p-6 rounded-lg shadow-inner prose prose-slate dark:prose-invert max-w-none">
                  <div
                    id="plan-content-rendered"
                    className="text-sm leading-relaxed space-y-4 text-foreground/90 markdown-body"
                  >
                    <Markdown>{result}</Markdown>
                  </div>
                  <div ref={responseEndRef} />
                </div>

                {/* Chat Follow-Up Panel */}
                <div className="border-t border-border/60 pt-4 space-y-4">
                  <div className="flex flex-wrap gap-1.5">
                    <span className="font-mono text-[9px] text-muted-foreground uppercase flex items-center gap-1.5 w-full mb-1">
                      <Lightbulb className="h-3 w-3 text-accent" /> ¿Quieres ajustar la
                      planificación? Prueba estas ideas:
                    </span>
                    {[
                      {
                        l: "Hacerla sin pantallas",
                        p: "Adapta la actividad para que sea 100% desenchufada, sin internet ni dispositivos.",
                      },
                      {
                        l: "Agregar rúbrica",
                        p: "Agrega una rúbrica de evaluación formativa simple con 3 niveles de logro.",
                      },
                      {
                        l: "Clase de 45 minutos",
                        p: "Adapta el plan para que dure exactamente 45 minutos en vez de 90.",
                      },
                      {
                        l: "Materiales sencillos",
                        p: "Asegura que los materiales necesarios sean extremadamente fáciles de conseguir o reciclados.",
                      },
                    ].map((btn) => (
                      <button
                        key={btn.l}
                        type="button"
                        onClick={() => applyPresetQuery(btn.p)}
                        className="px-2.5 py-1 rounded-full border border-border/60 bg-muted/40 hover:bg-muted text-[10px] text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                      >
                        {btn.l}
                      </button>
                    ))}
                  </div>

                  {/* Input Chat Field */}
                  <form onSubmit={handleFollowUp} className="flex gap-2">
                    <Input
                      placeholder={`Habla con ${currentProf.name} para modificar este plan...`}
                      value={followUpText}
                      onChange={(e) => setFollowUpText(e.target.value)}
                      disabled={loading}
                      className="bg-background border-border placeholder:text-muted-foreground/40 text-sm"
                    />
                    <Button
                      type="submit"
                      disabled={loading || !followUpText.trim()}
                      className="bg-foreground hover:bg-foreground/90 text-background px-4 font-mono text-[11px] uppercase tracking-wider rounded"
                    >
                      {loading ? (
                        <RefreshCw className="h-4 w-4 animate-spin" />
                      ) : (
                        <Send className="h-4 w-4" />
                      )}
                    </Button>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
