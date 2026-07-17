import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { GoogleGenAI } from "@google/genai";

// Schema for chat messages to enable continuous dialogue
const messageSchema = z.object({
  role: z.enum(["user", "model"]),
  text: z.string(),
});

export const generateCurriculumPlan = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      levelId: z.number().min(0).max(2),
      subject: z.string().min(1),
      topic: z.string().min(1),
      goalType: z.enum(["lesson_plan", "activity", "chat"]),
      history: z.array(messageSchema).optional(),
    }),
  )
  .handler(async ({ data }) => {
    try {
      // Get any non-empty, non-placeholder keys
      const rawKeys = {
        GEMINI_API_KEY: process.env.GEMINI_API_KEY,
        GEMINI_API: process.env.GEMINI_API,
        GEMINI_API_KEYS: process.env.GEMINI_API_KEYS,
      };

      const keys = Object.entries(rawKeys)
        .map(([name, val]) => ({ name, value: val?.trim() || "" }))
        .filter(({ value }) => {
          if (!value) return false;
          const lower = value.toLowerCase();
          if (
            lower.includes("placeholder") ||
            lower.includes("your_api") ||
            lower === "gemini_api_key" ||
            lower === "gemini_api" ||
            lower === "gemini_api_keys" ||
            lower.includes("free tier") ||
            lower.includes("ai studio")
          ) {
            return false;
          }
          return true;
        });

      // Prioritize the key starting with "AIzaSy" (the standard format for Gemini/Google Cloud keys)
      const bestKeyObj = keys.find((k) => k.value.startsWith("AIzaSy")) || keys[0];
      const apiKey = bestKeyObj?.value || "";

      const debugInfo = {
        allEnvKeys: Object.keys(process.env).filter(
          (k) => k.includes("GEMINI") || k.includes("API"),
        ),
        availableVariables: Object.keys(rawKeys).filter(
          (k) => !!rawKeys[k as keyof typeof rawKeys],
        ),
        filteredKeys: keys.map((k) => ({
          name: k.name,
          length: k.value.length,
          startsWithAIza: k.value.startsWith("AIzaSy"),
          masked:
            k.value.length > 8
              ? `${k.value.substring(0, 6)}...${k.value.substring(k.value.length - 4)}`
              : `${k.value.substring(0, 2)}...`,
        })),
        selectedKeyName: bestKeyObj?.name || "none",
        selectedKeyLength: apiKey.length,
        selectedKeyMasked:
          apiKey.length > 8
            ? `${apiKey.substring(0, 6)}...${apiKey.substring(apiKey.length - 4)}`
            : "none",
      };

      console.log("Gemini API Key Resolution:", debugInfo);

      if (!apiKey) {
        return {
          error: `La clave de API de Gemini no está configurada o no es válida. Detalles de depuración: ${JSON.stringify(debugInfo)}. Por favor, asegúrate de haberla añadido en la pestaña de Configuración (icono de engranaje) con el nombre de 'GEMINI_API_KEY' o 'GEMINI_API_KEYS' y que sea una clave válida que empiece con 'AIzaSy'.`,
        };
      }

      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });

      const levelDetails = [
        {
          rango: "1° – 2° básico",
          titulo: "Inicial lúdico",
          enfoque:
            "Actividades sin pantalla (unplugged), lógica, patrones, asistentes de voz y juego corporal.",
          herramientas: [
            "MIT Day of AI — módulo fundacional (5-7 años)",
            "Google Teachable Machine (para clasificar imágenes/sonidos guiados por el docente)",
            "Scratch Jr / Scratch (exploración visual interactiva)",
            "Actividades desenchufadas (unplugged) de MIT RAISE",
            "Conceptos de 'Definición o Pensamiento Computacional' (Def. o T)",
          ],
          guidelines:
            "Tus propuestas deben priorizar actividades lúdicas, kinestésicas y desenchufadas. Minimiza el uso directo de pantallas por parte de los niños, enfocándote en juegos analógicos que enseñen cómo piensan los computadores (por ejemplo, clasificar objetos reales, seguir algoritmos de pasos físicos o imitar un asistente de voz). Si recomiendas Scratch o Teachable Machine, que sea como demostración guiada o juego exploratorio muy sencillo.",
        },
        {
          rango: "3° – 5° básico",
          titulo: "Intermedio aplicado",
          enfoque:
            "Uso guiado de IA generativa, búsqueda de información, formulación de preguntas y verificación básica.",
          herramientas: [
            "Khanmigo (tutor IA personalizado de Khan Academy)",
            "Curipod (creación de clases interactivas con participación grupal)",
            "Day of AI — módulos intermedios",
            "Guía PotencIA del MINEDUC Chile",
          ],
          guidelines:
            "Tus propuestas deben guiar el uso activo y supervisado de la IA. Enfócate en el 'prompting para aprender' (cómo hacer buenas preguntas a un tutor IA) y en la verificación de fuentes (no creer todo lo que dice la máquina). Las actividades deben integrar estas herramientas en asignaturas tradicionales, incentivando la curiosidad y la co-creación.",
        },
        {
          rango: "6° – 8° básico",
          titulo: "Avanzado crítico",
          enfoque:
            "Prompting avanzado, co-creación ética, detección de sesgos y alucinaciones, debates éticos y proyectos comunitarios.",
          herramientas: [
            "MagicSchool.ai (para diseño y personalización de recursos)",
            "Stanford CRAFT (actividades multidisciplinarias de alfabetización crítica en IA)",
            "Day of AI — módulo de ética, artes y toma de decisiones con IA",
            "Canva Educación (creación de infografías, presentaciones y contenido asistido)",
          ],
          guidelines:
            "Tus propuestas deben desafiar críticamente a los alumnos. Fomenta el análisis de sesgos en datos, la detección de alucinaciones (errores factuales de la IA) y la reflexión sobre la privacidad y el futuro del trabajo. Las actividades deben incluir debates, proyectos de diseño con IA, y redacción de prompts avanzados estructurados (rol, contexto, tarea, formato).",
        },
      ];

      const currentLevel = levelDetails[data.levelId];

      // Build the system instructions for the selected level professor
      const systemInstruction = `Eres un "Súper Profesor de Currículo", un docente experto de Huechuraba, especializado en la enseñanza y uso de Inteligencia Artificial en el nivel escolar de **${currentLevel.rango} (${currentLevel.titulo})**.

Tu enfoque pedagógico se basa estrictamente en la progresión curricular recomendada en esta web, la cual incorpora los pilares de MIT RAISE, Stanford HAI (CRAFT), Harvard HGSE y el Marco de Competencias de la UNESCO (2024).

Tu nivel es: **${currentLevel.rango}**.
Tu enfoque curricular: **${currentLevel.enfoque}**.
Tus herramientas verificadas obligatorias a integrar: ${currentLevel.herramientas.map((t) => `"${t}"`).join(", ")}.
Directrices pedagógicas de tu nivel: ${currentLevel.guidelines}

Cuando el usuario te pida planificar una clase o diseñar una actividad para la asignatura de **${data.subject}** sobre el tema **"${data.topic}"**, debes generar una respuesta estructurada, amigable, pedagógica y directamente aplicable en el aula chilena. 

Estructura de respuestas sugerida para PLANIFICACIÓN DE CLASE ("lesson_plan"):
- **Título de la Clase**: Atractivo y pertinente.
- **Asignatura y Nivel**: ${data.subject} · ${currentLevel.rango}.
- **Objetivo de Aprendizaje (OA)**: Relacionado con la asignatura e integrando competencias de IA (lógica, pensamiento computacional, prompting, ética o verificación, según corresponda).
- **Herramientas a Utilizar**: Indicar cuáles de tus herramientas específicas (${currentLevel.herramientas.join(", ")}) se usarán y cómo.
- **Inicio (15 min)**: Motivación, pregunta desafiante, activación de conocimientos previos.
- **Desarrollo (60 min)**: Paso a paso detallado de la actividad práctica. Recuerda tus directrices (${currentLevel.guidelines}).
- **Cierre (15 min)**: Metacognición, reflexión colectiva sobre la IA y el tema de la asignatura, ticket de salida.
- **Evaluación**: Tipo de evaluación sugerida (formativa, rúbrica rápida o autoevaluación).

Estructura de respuestas sugerida para DISEÑO DE ACTIVIDAD ("activity"):
- **Nombre de la Actividad**.
- **Asignatura y Duración sugerida**.
- **Desafío Central**: Qué problema o misterio deben resolver los estudiantes.
- **Instrucciones para el Docente**: Qué preparar antes.
- **Paso a Paso para los Alumnos**: Instrucciones claras de juego o trabajo.
- **Pregunta de Reflexión**: Una pregunta potente para debatir al finalizar sobre la IA utilizada o simulada.

Estructura de respuestas para CHAT / CONSULTAS ("chat"):
- Responde de manera profesional pero sumamente cercana y motivadora, como un par docente que apoya y aconseja.
- Proporciona tips concretos, ejemplos de aula y soluciones prácticas para el aula chilena.
- Propón siempre un ejemplo de cómo conectar el tema con la realidad local de los colegios en Huechuraba si es oportuno.

**IMPORTANTE**: Usa un formato Markdown limpio, estructurado, con negritas y listas. Tu tono debe ser inspirador, práctico y profundamente alineado con el nivel escolar seleccionado. Evita jergas corporativas vacías; sé un verdadero profesor mentor.`;

      const modelName = "gemini-3.5-flash"; // Selected based on guidelines for standard text tasks

      interface GeminiContent {
        role: "user" | "model";
        parts: { text: string }[];
      }

      // Format chat history for Gemini API SDK
      const contents: GeminiContent[] = [];
      if (data.history && data.history.length > 0) {
        for (const msg of data.history) {
          contents.push({
            role: msg.role as "user" | "model",
            parts: [{ text: msg.text }],
          });
        }
      }

      // Add the current prompt
      let currentPrompt = "";
      if (data.goalType === "lesson_plan") {
        currentPrompt = `Por favor, genera una planificación detallada de clase para la asignatura de "${data.subject}" sobre el tema "${data.topic}". Asegúrate de integrar adecuadamente las herramientas del nivel ${currentLevel.rango}.`;
      } else if (data.goalType === "activity") {
        currentPrompt = `Por favor, diseña una actividad práctica de aula para la asignatura de "${data.subject}" sobre el tema "${data.topic}", alineada con los recursos de mi nivel ${currentLevel.rango}.`;
      } else {
        currentPrompt = `Tengo una consulta sobre cómo enseñar el tema "${data.topic}" en la asignatura de "${data.subject}" usando las herramientas de mi nivel ${currentLevel.rango}. ¿Me puedes guiar o dar sugerencias?`;
      }

      contents.push({
        role: "user",
        parts: [{ text: currentPrompt }],
      });

      const response = await ai.models.generateContent({
        model: modelName,
        contents,
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });

      return {
        text: response.text || "No se pudo generar una respuesta. Por favor intenta nuevamente.",
      };
    } catch (err) {
      console.error("Error calling Gemini API:", err);
      const errorMessage = err instanceof Error ? err.message : String(err);

      // Extract debugInfo to return it
      const rawKeys = {
        GEMINI_API_KEY: process.env.GEMINI_API_KEY,
        GEMINI_API: process.env.GEMINI_API,
        GEMINI_API_KEYS: process.env.GEMINI_API_KEYS,
      };
      const keys = Object.entries(rawKeys)
        .map(([name, val]) => ({ name, value: val?.trim() || "" }))
        .filter(({ value }) => {
          if (!value) return false;
          const lower = value.toLowerCase();
          return !(
            lower.includes("placeholder") ||
            lower.includes("your_api") ||
            lower === "gemini_api_key" ||
            lower === "gemini_api" ||
            lower === "gemini_api_keys" ||
            lower.includes("free tier") ||
            lower.includes("ai studio")
          );
        });
      const bestKeyObj = keys.find((k) => k.value.startsWith("AIzaSy")) || keys[0];
      const apiKey = bestKeyObj?.value || "";

      const keyDebug = {
        selectedKeyName: bestKeyObj?.name || "none",
        selectedKeyLength: apiKey.length,
        selectedKeyMasked:
          apiKey.length > 8
            ? `${apiKey.substring(0, 6)}...${apiKey.substring(apiKey.length - 4)}`
            : "none",
        allEnvKeys: Object.keys(process.env).filter(
          (k) => k.includes("GEMINI") || k.includes("API"),
        ),
      };

      return {
        error: `Error al generar planificación curricular: ${errorMessage}. (Diagnóstico del servidor: Clave utilizada=${keyDebug.selectedKeyName}, Longitud=${keyDebug.selectedKeyLength}, Clave=${keyDebug.selectedKeyMasked}, VariablesEntorno=${JSON.stringify(keyDebug.allEnvKeys)})`,
      };
    }
  });
