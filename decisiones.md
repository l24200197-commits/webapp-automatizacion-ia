# Decisiones de arquitectura — práctica 3.4

- **Frontend estático:** HTML5, CSS3, Bootstrap 5 y JavaScript ES Modules, publicado en GitHub Pages.
- **Backend de automatización:** n8n Cloud mediante un único Webhook POST de producción.
- **Integraciones IA:** ruta OpenAI nativa o HTTP Request hacia Responses API, elegida por el campo `integracion`.
- **Contrato:** JSON con `tema`, `nivel`, `pregunta` e `integracion`; respuesta OK con `ok`, `respuesta`, `tema`, `nivel`, `integracion`.
- **Seguridad:** la API Key reside únicamente en Credentials de n8n. La respuesta se inserta como texto usando `textContent`; nunca se interpreta como HTML.
- **Validación:** controles de interfaz para usabilidad y validación de n8n para la lógica del servicio.
- **CORS:** se requiere permitir el origen de GitHub Pages y los orígenes locales autorizados. CORS no es autenticación; el Webhook de producción es público.
- **Timeout:** `AbortController` con 60 segundos y reintento manual conservando los datos.
- **Accesibilidad:** etiquetas de campos, mensajes de error, estado de carga anunciado y foco al primer campo inválido.
