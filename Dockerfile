# Usa una versión oficial de Node.js 24 como base
FROM node:24-alpine

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos package.json y package-lock.json para instalar dependencias
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto del código fuente
COPY . .

# Expone el puerto en el que correrá la aplicación (ajusta si es diferente)
EXPOSE 3001

# Comando para correr la aplicación
CMD ["npm", "run", "start:prod"]
