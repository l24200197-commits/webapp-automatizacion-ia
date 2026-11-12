const byId = (id) => document.getElementById(id);

export function showFieldErrors(errors) {
  ["tema", "nivel", "integracion", "pregunta"].forEach((field) => {
    const input = byId(field);
    const target = byId(`${field}-error`);
    const message = errors[field] || "";
    target.textContent = message;
    input.classList.toggle("is-invalid", Boolean(message));
    input.setAttribute("aria-invalid", String(Boolean(message)));
    if (message) input.setAttribute("aria-describedby", `${field}-error`);
    else input.removeAttribute("aria-describedby");
  });
}

export function setLoading(isLoading) {
  const button = byId("submit-btn");
  button.disabled = isLoading;
  byId("loading-area").classList.toggle("d-none", !isLoading);
  button.querySelector(".button-label").textContent = isLoading ? "Consultando..." : "Consultar al asistente";
  button.querySelector(".button-arrow").textContent = isLoading ? "" : "↗";
}

export function showError(message) {
  const area = byId("error-area");
  area.textContent = message;
  area.classList.remove("d-none");
}

export function hideError() {
  const area = byId("error-area");
  area.textContent = "";
  area.classList.add("d-none");
}

export function showResponse(result) {
  byId("result-topic").textContent = `Tema: ${result.tema}`;
  byId("result-level").textContent = `Nivel: ${result.nivel}`;
  byId("result-integration").textContent = `Integración: ${result.integracion === "nativo" ? "OpenAI nativo" : "HTTP Request / Responses API"}`;
  // Texto seguro: la salida del proveedor nunca se interpreta como HTML.
  byId("answer-text").textContent = result.respuesta;
  byId("response-card").classList.remove("d-none");
  byId("retry-btn").classList.add("d-none");
}

export function showRetry() {
  byId("retry-btn").classList.remove("d-none");
}

export function clearInterface() {
  hideError();
  byId("response-card").classList.add("d-none");
  byId("retry-btn").classList.add("d-none");
  showFieldErrors({});
}
