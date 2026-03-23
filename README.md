# Servidor — API de Cotización de Prepagas (Argentina)

Servidor backend en **Node.js + TypeScript** que expone una API REST para cotizar planes de medicina prepaga argentina, gestionar clínicas, autenticar usuarios y automatizar publicaciones en redes sociales.

---

## Tabla de contenidos

- [Descripción general](#descripción-general)
- [Stack tecnológico](#stack-tecnológico)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Prepagas soportadas](#prepagas-soportadas)
- [Endpoints principales](#endpoints-principales)
- [Variables de entorno](#variables-de-entorno)
- [Instalación y ejecución](#instalación-y-ejecución)
- [Scripts disponibles](#scripts-disponibles)
- [Arquitectura interna](#arquitectura-interna)
- [Procesamiento masivo de cotizaciones (CSV)](#procesamiento-masivo-de-cotizaciones-csv)

---

## Descripción general

Este servidor actúa como el núcleo de cálculo y datos de un **cotizador de planes de salud**. Recibe los parámetros de un grupo familiar (edades, tipo de ingreso, región, obra social, etc.) y devuelve los precios de los planes de cada prepaga aplicando la lógica de cálculo específica de cada empresa.

Además, gestiona:

- Base de datos de **clínicas** organizadas por región y asociadas a planes.
- Sistema de **autenticación** con JWT.
- **Subida de archivos** a Cloudinary.
- **Automatización de Instagram** via Puppeteer.
- **Procesamiento batch** de cotizaciones desde archivos CSV.
- Integración con **Supabase** para datos de planes.

---

## Stack tecnológico

| Capa | Tecnología |
|---|---|
| Runtime | Node.js |
| Framework | Express 5 |
| Lenguaje | TypeScript 5 |
| Base de datos principal | MongoDB + Mongoose 8 |
| Base de datos secundaria | Supabase (PostgreSQL) |
| Autenticación | JSON Web Tokens (jsonwebtoken) + bcryptjs |
| Almacenamiento de archivos | Cloudinary + Multer |
| Automatización web | Puppeteer |
| HTTP client | Axios |
| CSV | csv-parser + csv-writer |
| Dev server | Nodemon |

---

## Estructura del proyecto

```
servidor/
├── src/
│   ├── app.ts                  # Entry point: configuración Express, CORS, DB
│   ├── assets/
│   │   ├── data/               # JSONs y CSVs de precios, clínicas, planes
│   │   └── images/card-header/ # Logos de prepagas (webp/png)
│   ├── config/
│   │   └── mongo.ts            # Conexión a MongoDB
│   ├── controllers/            # Capa de controladores (reciben req/res)
│   │   ├── auth.ts
│   │   ├── cotizacion.ts
│   │   ├── cotizaciones.ts
│   │   ├── clinicas.ts
│   │   ├── empresas.ts
│   │   ├── precios.ts
│   │   ├── upload.ts / uploads.ts
│   │   └── ...
│   ├── funciones/              # Lógica de cálculo por prepaga
│   │   ├── index.js            # Barrel: exporta todas las funciones
│   │   ├── avalian.js
│   │   ├── medife.js
│   │   ├── galeno.js
│   │   ├── omint.js
│   │   ├── doctored.js
│   │   ├── premedic.js
│   │   ├── swissmedical.js
│   │   ├── sancorsalud.js
│   │   ├── bayresplan.js
│   │   ├── asmepriv.js
│   │   ├── luispasteur.js
│   │   ├── ras.js
│   │   ├── cristal.js
│   │   ├── hominis.js
│   │   ├── saludcentral.js
│   │   ├── ids.js              # Helpers de IDs
│   │   └── functions.js        # Utilidades compartidas (grupo familiar, etc.)
│   ├── interfaces/             # Tipos TypeScript
│   ├── middleware/
│   │   ├── session.ts          # Validación JWT
│   │   ├── multer.ts           # Config de subida de archivos
│   │   ├── file.ts
│   │   └── log.ts
│   ├── models/                 # Schemas Mongoose
│   │   ├── clinicas.ts
│   │   ├── planes.ts
│   │   ├── precios.ts
│   │   ├── users.ts
│   │   └── ...
│   ├── routes/                 # Definición de rutas (auto-cargadas)
│   │   ├── index.ts            # Loader dinámico de rutas
│   │   ├── auth.ts
│   │   ├── cotizaciones.ts
│   │   ├── clinicas.ts
│   │   ├── empresas.ts
│   │   ├── upload.ts / uploads.ts
│   │   ├── quote.ts
│   │   └── convert.ts
│   ├── services/               # Lógica de negocio
│   │   ├── cotizacion.ts       # Motor principal de cálculo de precios
│   │   ├── generarCotizaciones.ts  # Procesamiento batch CSV
│   │   ├── planes.ts           # Planes + clínicas (MongoDB + Supabase)
│   │   ├── chat.ts             # Datos para IA (clínicas y planes filtrados)
│   │   ├── clinicas.ts
│   │   ├── instagram.ts        # Publicación automática en Instagram
│   │   ├── converter.ts
│   │   └── ...
│   ├── utils/
│   │   ├── jwt.handle.ts       # Sign / verify JWT
│   │   ├── bcrypt.handle.ts    # Hash / compare passwords
│   │   ├── error.handle.ts     # Respuestas de error estandarizadas
│   │   └── cloudinary.ts       # Config Cloudinary
│   └── uploads/                # Archivos subidos temporalmente
├── package.json
└── tsconfig.json
```

---

## Prepagas soportadas

El motor de cotización calcula precios para las siguientes empresas de medicina prepaga:

| Prepaga | Archivo de lógica |
|---|---|
| Avalian | `funciones/avalian.js` |
| Medife | `funciones/medife.js` |
| Galeno | `funciones/galeno.js` |
| OSDE | (vía precios en DB) |
| Omint | `funciones/omint.js` |
| Doctored | `funciones/doctored.js` |
| Premedic | `funciones/premedic.js` |
| Swiss Medical | `funciones/swissmedical.js` |
| Sancor Salud | `funciones/sancorsalud.js` |
| BayresPlan | `funciones/bayresplan.js` |
| ASME Priv | `funciones/asmepriv.js` |
| Luis Pasteur | `funciones/luispasteur.js` |
| RAS | `funciones/ras.js` |
| Cristal | `funciones/cristal.js` |
| Hominis | `funciones/hominis.js` |
| Salud Central | `funciones/saludcentral.js` |

---

## Endpoints principales

Las rutas se cargan dinámicamente desde `src/routes/` — cada archivo genera un prefijo con su nombre.

### Autenticación — `/auth`

| Método | Ruta | Descripción |
|---|---|---|
| POST | `/auth/register` | Registro de usuario |
| POST | `/auth/login` | Login, devuelve JWT |

### Cotización — `/cotizaciones`

| Método | Ruta | Descripción |
|---|---|---|
| POST | `/cotizaciones` | Calcula precios para un grupo familiar en todas (o una) prepaga |

**Body de ejemplo:**
```json
{
  "group": "1",
  "edad_1": 35,
  "edad_2": 0,
  "numkids": 0,
  "plan_type": "ambulatorio",
  "tipo": "D",
  "region": "GBA",
  "empresa_prepaga": "todas",
  "aporteOS": ["D", 1, 150000],
  "sueldo": 150000,
  "aporte": 0.03
}
```

### Clínicas — `/clinicas`

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/clinicas` | Lista todas las clínicas |
| GET | `/clinicas/:id` | Clínica por ID |

### Empresas — `/empresas`

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/empresas` | Lista empresas/prepagas |

### Archivos — `/upload` y `/uploads`

| Método | Ruta | Descripción |
|---|---|---|
| POST | `/upload` | Sube un archivo a Cloudinary |

### Instagram — `/instagram`

| Método | Ruta | Descripción |
|---|---|---|
| POST | `/instagram` | Publica una imagen en Instagram via Puppeteer |

---

## Variables de entorno

Crear un archivo `.env` en la raíz con las siguientes variables:

```env
# Puerto del servidor
PORT=3001

# MongoDB
MONGODB_URI=mongodb+srv://<usuario>:<password>@<cluster>.mongodb.net/<db>

# Supabase
SUPABASE_URL=https://<proyecto>.supabase.co
SUPABASE_KEY=<anon-key>

# JWT
JWT_SECRET=<secreto>

# Cloudinary
CLOUDINARY_CLOUD_NAME=<cloud_name>
CLOUDINARY_API_KEY=<api_key>
CLOUDINARY_API_SECRET=<api_secret>
```

---

## Instalación y ejecución

### Requisitos previos

- Node.js >= 18
- pnpm (recomendado) o npm
- MongoDB Atlas (o instancia local)
- Cuenta de Supabase

### Pasos

```bash
# 1. Clonar el repositorio
git clone <repo-url>
cd servidor

# 2. Instalar dependencias
pnpm install

# 3. Configurar variables de entorno
cp .env.example .env
# Editar .env con tus valores

# 4. Ejecutar en modo desarrollo
pnpm dev

# 5. Build para producción
pnpm build

# 6. Iniciar en producción
pnpm start
```

---

## Scripts disponibles

| Script | Comando | Descripción |
|---|---|---|
| `dev` | `nodemon ./src/app.ts` | Servidor con hot-reload |
| `build` | `tsc` | Compila TypeScript a `dist/` |
| `start` | `node ./dist/app.js` | Inicia el servidor compilado |

---

## Arquitectura interna

### Carga dinámica de rutas

`src/routes/index.ts` lee automáticamente todos los archivos del directorio y los monta bajo `/<nombre-archivo>`. Para agregar una nueva ruta basta con crear `src/routes/nueva-ruta.ts` que exporte un `router`.

### Motor de cotización (`services/cotizacion.ts`)

1. Recibe el formulario con datos del grupo familiar.
2. Calcula el **grupo familiar** usando `functions.grupoFamiliar()`.
3. Consulta los precios base desde MongoDB (`PreciosModel`).
4. Para cada prepaga, invoca su función de cálculo específica pasando coeficientes, grupo, bonificaciones y tipo de ingreso (P = en Planilla / D = Desregulado).
5. Devuelve un array con todos los planes cotizados, precio final, descuentos y aporte de obra social.

### Datos para IA (`services/chat.ts`)

Expone `getProductsIA()` y `getPlanesIA()` que devuelven versiones simplificadas de clínicas y planes para ser consumidas por un LLM como contexto de un chatbot.

### Procesamiento batch (`services/generarCotizaciones.ts`)

Lee un CSV de entrada, cotiza cada registro usando el motor de cotización, y escribe los resultados en un CSV de salida. Implementa checkpoint: registros ya procesados se saltan en reinicios.

### Automatización Instagram (`services/instagram.ts`)

Usa Puppeteer en modo headless para iniciar sesión en Instagram (via cookies guardadas) y publicar imágenes con caption. Las imágenes se descargan previamente desde Supabase Storage.

---

## CORS — Orígenes permitidos

El servidor acepta peticiones de los siguientes frontends:

- `http://localhost:4200` / `4300` / `4400` / `4500` (desarrollo)
- `https://soloclinic.vercel.app`
- `https://front-prepagas.vercel.app`
- `https://sakai-ng-front.vercel.app`
- `https://n8n.tuchat.com.ar` (automatizaciones)
- `https://typeapi.tuchat.com.ar`

---

## Procesamiento masivo de cotizaciones (CSV)

Para correr una cotización batch:

1. Colocar el CSV de entrada en `src/assets/data/datacotizacion/`.
2. Ajustar las rutas en `services/generarCotizaciones.ts`.
3. Llamar al endpoint correspondiente o invocar `procesarCotiSimple()` directamente.
4. Los resultados se escriben en `src/assets/data/RESPUESTAS-COTIZACION/`.
5. El log de seguimiento queda en `logs/seguimiento.log`.

---

*Desarrollado para el mercado argentino de medicina prepaga.*
