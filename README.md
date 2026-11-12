# Asistente TI — práctica 3.4 Web app para automatización IA

Aplicación web responsiva para enviar consultas académicas a un Webhook de n8n Cloud y mostrar respuestas de IA sin recargar la página.

## Objetivo
Practicar integración frontend con APIs, JavaScript ES Modules, Fetch, async/await, validación, accesibilidad y manejo de CORS.

## Arquitectura
GitHub Pages (frontend estático) → HTTPS POST JSON → n8n Cloud Webhook → OpenAI nativo o HTTP Request a Responses API → respuesta JSON normalizada.

## Tecnologías
- HTML5 y CSS3
- Bootstrap 5.3.3 vía CDN
- JavaScript ES Modules (sin frameworks)
- Fetch API, async/await y AbortController
- n8n Cloud y OpenAI

## Estructura
- `index.html`: UI semántica
- `css/styles.css`: diseño adaptable
- `js/config.js`: URL de producción y timeout
- `js/validacion.js`: validación y normalización
- `js/api.js`: Fetch y errores HTTP
- `js/ui.js`: estados y renderizado seguro
- `js/main.js`: coordinación de eventos
- `assets/favicon.svg`: icono
- `decisiones.md`: arquitectura y decisiones

## Campos del formulario
- `tema`: Inteligencia artificial, Redes, Programación, Bases de datos o Internet de las cosas (IoT)
- `nivel`: Básico, Intermedio o Avanzado
- `pregunta`: 5 a 500 caracteres; espacios normalizados
- `integracion`: `nativo` (nodo OpenAI) o `http` (HTTP Request / Responses API)

## Configurar la URL
Edita `js/config.js` y ajusta `WEBHOOK_URL` a la URL de producción exacta de tu Webhook n8n. No agregues API Keys ni credenciales al frontend.

## Ejecutar localmente
Desde la raíz del proyecto:

```bash
python3 -m http.server 5500
```

Abre http://localhost:5500. En DevTools revisa Console y Network. La solicitud `application/json` normalmente provoca un preflight OPTIONS antes del POST. n8n debe permitir `http://localhost:5500` y `http://127.0.0.1:5500`, además del origen Pages.

## Publicar en GitHub Pages
1. Crea el repositorio público `alonsoGF/webapp-automatizacion-ia`.
2. Revisa que no haya secretos.
3. Ejecuta `git init`, commit y push a la rama `main`.
4. En GitHub: Settings → Pages → Deploy from a branch → `main` → `/(root)`.
5. Prueba la URL HTTPS de Pages en ventana privada y ambas integraciones.

## Seguridad y privacidad
El Webhook de producción es público. CORS no autentica clientes y no impide que un usuario invoque el endpoint desde otro cliente. La API Key de OpenAI debe guardarse exclusivamente en Credentials de n8n. No publicar credenciales, tokens, archivos `.env` ni capturas que los expongan. La respuesta de IA se presenta como texto mediante `textContent` y nunca se interpreta como HTML.

## Contrato API
POST JSON con `tema`, `nivel`, `pregunta`, `integracion`. OK esperado: `{"ok":true,"respuesta":"...","tema":"...","nivel":"...","integracion":"..."}`. Error esperado: `{"ok":false,"mensaje":"..."}` con HTTP 400 o 502 según el contrato del workflow.

## Créditos
José Alonso Godinez Franco · N.C. 24200197  
Instituto Tecnológico de Pachuca  
Inteligencia Artificial aplicada a las TIC
