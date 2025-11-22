# FROM node:20.9.0-alpine

# WORKDIR /usr/meanserver

# COPY package.json /usr/meanserver

# RUN npm install

# COPY ./ ./

# EXPOSE 5000

# CMD ["npm","start"]


# FROM node:18-slim
# WORKDIR /app

# # Install dependencies and build the project.
# COPY package*.json ./
# RUN npm install
# COPY . .

# RUN npm install -g pm2

# EXPOSE 5200
# RUN npm run build

# # Run the web service on container startup.
# CMD ["pm2-runtime", "dist/server.js"]

FROM node:20.9.0-alpine

WORKDIR /usr/meanserver

COPY package.json package-lock.json ./
RUN npm install
# Instala pm2 globalmente
RUN npm install -g pm2

COPY . .

RUN npm run build


# Expone el puerto
EXPOSE 5200

# Inicia la aplicación usando pm2
CMD ["pm2-runtime", "dist/app.js"]
