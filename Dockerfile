FROM node:20.9.0-slim

# Instalar dependencias de sistema necesarias para Chromium
RUN apt-get update && apt-get install -y \
    chromium \
    ca-certificates \
    fonts-liberation \
    libappindicator3-1 \
    libasound2 \
    libatk-bridge2.0-0 \
    libcurl3-gnutls \
    libgdk-pixbuf2.0-0 \
    libglib2.0-0 \
    libgtk-3-0 \
    libnspr4 \
    libnss3 \
    libxss1 \
    libxtst6 \
    xdg-utils \
    # Dependencia clave para la memoria compartida
    libgbm-dev \
    --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*
    
WORKDIR /usr/meanserver


# Install pnpm globally
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy package.json and pnpm-lock.yaml (DO NOT COPY OTHER FILES YET)
COPY package.json pnpm-lock.yaml ./

# Install project dependencies
RUN pnpm install --frozen-lockfile

ENV PNPM_HOME=/usr/local/pnpm-global
ENV PATH=$PNPM_HOME:$PATH
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