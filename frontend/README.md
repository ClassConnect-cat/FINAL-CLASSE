#   FRONT

# Dockerfile para Node.js con Nodemon en modo desarrollo adaptado para el 
# despliegue en el examen de la asignatura de Desarrollo de Aplicaciones Web
# y Despliegue de Aplicaciones Web

# Use una imagen oficial de Node.js como base
FROM node:20

# Establece el directorio de trabajo
WORKDIR /frontapp

# Copia los archivos de tu proyecto en el directorio de trabajo
# COPY ./frontend .

# Instala las dependencias de npm
# RUN npm install

# Construye la aplicación Vue.js para producción
RUN npm run build

# Expone el puerto 8080 para que el servicio pueda ser accedido desde fuera del contenedor
EXPOSE 8080

# Comando por defecto para ejecutar el servidor web de Vue.js
CMD [ "npm", "run", "serve" ]

# CHAT 
# Dockerfile para Node.js con Nodemon en modo desarrollo adaptado para el 
# despliegue en el examen de la asignatura de Desarrollo de Aplicaciones Web
# y Despliegue de Aplicaciones Web

# Use una imagen oficial de Node.js como base
FROM node:20

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos de tu proyecto en el directorio de trabajo
# COPY ./backend .
# Copia el archivo package.json y package-lock.json (si existe) al directorio de trabajo
# COPY package*.json ./

# Instala las dependencias de npm
# RUN npm install

EXPOSE 3000

# Ejecuta el código Node.js
CMD [ "npm", "start" ]

# BACK

# Dockerfile para Node.js con Nodemon en modo desarrollo adaptado para el 
# despliegue en el examen de la asignatura de Desarrollo de Aplicaciones Web
# y Despliegue de Aplicaciones Web

# Use una imagen oficial de Node.js como base
FROM node:20

# Configura la variable de entorno si no esta configurada
ARG NODE_ENV
ENV NODE_ENV=${NODE_ENV}
CMD echo "NODE_ENV: $NODE_ENV"


# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos de tu proyecto en el directorio de trabajo
# COPY ./backend .
# Copia el archivo package.json y package-lock.json (si existe) al directorio de trabajo
# COPY package*.json ./

# Configura la variable de entorno si no esta configurada
ARG NODE_ENV
ENV NODE_ENV=${NODE_ENV}
CMD echo "NODE_ENV: $NODE_ENV"

# Instala las dependencias de npm
# RUN npm install

RUN if [ "$NODE_ENV" = "development" ]; then npm install nodemon -g; fi;

EXPOSE 3000

# Ejecuta el código Node.js
CMD [ "npm", "start" ]

