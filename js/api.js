import { WEBHOOK_URL, REQUEST_TIMEOUT_MS } from "./config.js";

export async function askAssistant(payload) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  try {
    let response;
    try {
      response = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal: controller.signal
      });
    } catch (error) {
      if (error.name === "AbortError") throw new Error("La consulta excedió el tiempo de espera de 60 segundos. Puedes reintentar.");
      throw new Error("No fue posible conectar con n8n. Revisa tu conexión y, si el error persiste, verifica CORS en el Webhook.");
    }

    let body;
    try {
      body = await response.json();
    } catch {
      throw new Error(`n8n respondió con HTTP ${response.status}, pero el contenido no es JSON válido. Revisa la salida de Respond to Webhook.`);
    }

    if (!response.ok) {
      const serverMessage = typeof body?.mensaje === "string" ? body.mensaje : "";
      const defaults = {
        400: "Solicitud inválida. Revisa los datos enviados.",
        401: "El servicio no autorizó la solicitud.",
        403: "El servicio rechazó el acceso.",
        429: "Se alcanzó el límite de solicitudes. Espera un momento y reintenta.",
        500: "Ocurrió un error interno en el flujo de n8n.",
        502: "El proveedor de IA no pudo completar la consulta."
      };
      throw new Error(serverMessage || defaults[response.status] || `La solicitud falló (HTTP ${response.status}).`);
    }

    if (body?.ok !== true || typeof body.respuesta !== "string" ||
        typeof body.tema !== "string" || typeof body.nivel !== "string" ||
        typeof body.integracion !== "string") {
      throw new Error("La respuesta JSON no coincide con el contrato esperado. Comparte un ejemplo real sin credenciales para revisarlo.");
    }
    return body;
  } finally {
    clearTimeout(timeoutId);
  }
}
