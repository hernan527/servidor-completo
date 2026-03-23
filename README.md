# Backend API — Cotizador de Medicina Prepaga

> API REST production-ready desarrollada en **Node.js + TypeScript**, desplegada en VPS propio, que alimenta un cotizador de planes de salud para el mercado argentino.

**Demo en producción:** `https://cotizador.tuchat.com.ar`

---

## Descripcion

Sistema backend que recibe los datos de un grupo familiar y calcula en tiempo real los precios de **16 prepagas argentinas** aplicando la lógica comercial de cada empresa: tipo de ingreso (planilla / desregulado), bonificaciones, aportes de obra social, descuentos por afinidad y composición familiar.

El proyecto incluye además gestión de clínicas por región, autenticación JWT, subida de archivos a CDN, automatización de redes sociales y procesamiento batch de cotizaciones desde CSV.

---

## Stack

| | Tecnología |
|---|---|
| **Runtime** | Node.js 18+ |
| **Framework** | Express 5 |
| **Lenguaje** | TypeScript 5 |
| **Base de datos** | MongoDB + Mongoose 8 |
| **Base de datos secundaria** | Supabase (PostgreSQL) |
| **Autenticación** | JWT + bcryptjs |
| **CDN / Storage** | Cloudinary |
| **Scraping / Automatización** | Puppeteer |
| **HTTP Client** | Axios |
| **Procesamiento CSV** | csv-parser + csv-writer |
| **Despliegue** | VPS Ubuntu — proceso continuo |

---

## Características principales

- **Motor de cotización multi-empresa** — calcula simultáneamente precios de 16 prepagas con sus reglas comerciales propias
- **Arquitectura modular** — cada prepaga encapsula su lógica en un módulo independiente, facilitando el mantenimiento y la incorporación de nuevas empresas
- **Carga dinámica de rutas** — el servidor detecta y registra automáticamente nuevas rutas sin modificar el entry point
- **Procesamiento batch con checkpoint** — cotiza miles de registros desde CSV, reanudando desde el último punto en caso de interrupción
- **Datos para IA** — endpoints optimizados que alimentan un chatbot con contexto de planes y clínicas
- **Automatización de Instagram** — publica contenido automáticamente via Puppeteer con gestión de sesión por cookies
- **Autenticación JWT** — registro, login y middleware de protección de rutas

---

## Prepagas integradas

Avalian · Medife · Galeno · OSDE · Omint · Doctored · Premedic · Swiss Medical · Sancor Salud · BayresPlan · ASME Priv · Luis Pasteur · RAS · Cristal · Hominis · Salud Central

---

## Estructura del proyecto

```
src/
├── app.ts                    # Entry point — Express, CORS, conexión DB
├── config/
│   └── mongo.ts              # Conexión MongoDB
├── routes/
│   └── index.ts              # Loader dinámico de rutas
├── controllers/              # Reciben req/res y delegan a services
├── services/
│   ├── cotizacion.ts         # Motor de cálculo de precios
│   ├── generarCotizaciones.ts# Procesamiento batch desde CSV
│   ├── planes.ts             # Planes con clínicas (MongoDB + Supabase)
│   ├── chat.ts               # Datos optimizados para LLM
│   └── instagram.ts          # Publicación automática en Instagram
├── funciones/                # Lógica de cálculo por prepaga
│   ├── avalian.js
│   ├── medife.js
│   ├── galeno.js
│   └── ... (16 empresas)
├── models/                   # Schemas Mongoose
├── middleware/               # JWT, Multer, logging
└── utils/                    # JWT handle, bcrypt, error handle, Cloudinary
```

---

## API — Endpoints principales

### `POST /cotizaciones`
Calcula precios para un grupo familiar en todas las prepagas (o una específica).

```json
{
  "group": "1",
  "edad_1": 35,
  "tipo": "D",
  "region": "GBA",
  "empresa_prepaga": "todas",
  "aporteOS": ["D", 1, 150000],
  "sueldo": 150000
}
```

**Respuesta:** array con todos los planes, precio final, descuentos aplicados y aporte de obra social.

### `POST /auth/register` · `POST /auth/login`
Registro y autenticación con JWT.

### `GET /clinicas`
Listado de clínicas organizadas por región y asociadas a planes.

### `POST /instagram`
Publica una imagen con caption en Instagram de forma automatizada.

---

## Variables de entorno

```env
PORT=3001
MONGODB_URI=mongodb+srv://...
SUPABASE_URL=https://...supabase.co
SUPABASE_KEY=...
JWT_SECRET=...
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
```

---

## Instalación

```bash
git clone https://github.com/hernan527/servidor-completo.git
cd servidor-completo
pnpm install
cp .env.example .env   # completar variables
pnpm dev               # desarrollo con hot-reload
pnpm build && pnpm start  # producción
```

---

## Frontends que consume esta API

| Frontend | URL |
|---|---|
| Cotizador principal | `https://soloclinic.vercel.app` |
| Panel de precios | `https://front-prepagas.vercel.app` |
| Admin | `https://sakai-ng-front.vercel.app` |
| Automatizaciones n8n | `https://n8n.tuchat.com.ar` |
