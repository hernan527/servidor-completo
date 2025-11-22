FROM node:20.9.0-alpine

WORKDIR /usr/meanserver

# Activa pnpm (mejor que instalar con npm)
RUN corepack enable && corepack prepare pnpm@latest --activate

# Instala dependencias
COPY package.json pnpm-lock.yaml ./
RUN pnpm install

# Instala pm2 globalmente (usando pnpm)
RUN pnpm install -g pm2

# Copia el código fuente
COPY . .

# Construye la app
RUN pnpm run build

# Puerto
EXPOSE 5200

# Inicia con pm2-runtime (requiere --no-daemon implícitamente)
CMD ["pm2-runtime", "dist/app.js"]