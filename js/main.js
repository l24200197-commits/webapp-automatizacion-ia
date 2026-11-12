import { validateForm } from "./validacion.js";
import { askAssistant } from "./api.js";
import { showFieldErrors, setLoading, showError, hideError, showResponse, showRetry, clearInterface } from "./ui.js";

const form = document.getElementById("assistant-form");
const question = document.getElementById("pregunta");
const charCount = document.getElementById("char-count");
const retryButton = document.getElementById("retry-btn");
let lastPayload = null;
let busy = false;

function collectForm() {
  return {
    tema: document.getElementById("tema").value,
    nivel: document.getElementById("nivel").value,
    pregunta: question.value,
    integracion: document.getElementById("integracion").value
  };
}

function updateCount() {
  charCount.textContent = `${question.value.length} / 500`;
}

async function submitPayload(payload) {
  if (busy) return;
  busy = true;
  hideError();
  setLoading(true);
  retryButton.classList.add("d-none");
  try {
    const result = await askAssistant(payload);
    showResponse(result);
    document.getElementById("response-card").scrollIntoView({ behavior: "smooth", block: "start" });
  } catch (error) {
    showError(error.message || "Ocurrió un error inesperado.");
    showRetry();
  } finally {
    setLoading(false);
    busy = false;
  }
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (busy) return;
  const { errors, normalized } = validateForm(collectForm());
  showFieldErrors(errors);
  if (Object.keys(errors).length) {
    const firstInvalid = form.querySelector('[aria-invalid="true"]');
    firstInvalid?.focus();
    return;
  }
  question.value = normalized.pregunta;
  updateCount();
  lastPayload = normalized;
  await submitPayload(lastPayload);
});

retryButton.addEventListener("click", () => {
  if (lastPayload) submitPayload(lastPayload);
});

document.getElementById("clear-btn").addEventListener("click", () => {
  if (busy) return;
  form.reset();
  updateCount();
  clearInterface();
  lastPayload = null;
  document.getElementById("tema").focus();
});

["tema", "nivel", "integracion", "pregunta"].forEach((field) => {
  document.getElementById(field).addEventListener("input", () => {
    const error = document.getElementById(`${field}-error`);
    if (error.textContent) {
      error.textContent = "";
      document.getElementById(field).classList.remove("is-invalid");
      document.getElementById(field).setAttribute("aria-invalid", "false");
    }
    hideError();
  });
});
question.addEventListener("input", updateCount);
updateCount();
