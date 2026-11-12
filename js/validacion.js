const TEMAS = ["Inteligencia artificial", "Redes", "Programación", "Bases de datos", "Internet de las cosas (IoT)"];
const NIVELES = ["Básico", "Intermedio", "Avanzado"];
const INTEGRACIONES = ["nativo", "http"];

export function normalizeQuestion(value) {
  return value.trim().replace(/\\s+/g, " ");
}

export function validateForm(data) {
  const errors = {};
  if (!TEMAS.includes(data.tema)) errors.tema = "Selecciona un tema válido.";
  if (!NIVELES.includes(data.nivel)) errors.nivel = "Selecciona un nivel válido.";
  if (!INTEGRACIONES.includes(data.integracion)) errors.integracion = "Selecciona una integración válida.";
  const pregunta = normalizeQuestion(data.pregunta);
  if (pregunta.length < 5) errors.pregunta = "Escribe al menos 5 caracteres.";
  else if (pregunta.length > 500) errors.pregunta = "La pregunta no debe superar 500 caracteres.";
  return { errors, normalized: { ...data, pregunta } };
}
