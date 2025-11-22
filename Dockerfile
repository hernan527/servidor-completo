FROM node:20.9.0-alpine

WORKDIR /usr/meanserver

# Install pnpm globally
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy package.json and pnpm-lock.yaml (DO NOT COPY OTHER FILES YET)
COPY package.json pnpm-lock.yaml ./

# Install project dependencies
RUN pnpm install --frozen-lockfile


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