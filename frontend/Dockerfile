# Dockerfile para Node.js con Nodemon en modo desarrollo adaptado para el 
# despliegue en el examen de la asignatura de Desarrollo de Aplicaciones Web
# y Despliegue de Aplicaciones Web

# Use una imagen oficial de Node.js como base
FROM node:19

# Configura la variable de entorno si no esta configurada
ARG NODE_ENV
ENV NODE_ENV=${NODE_ENV}
CMD echo "NODE_ENV: $NODE_ENV"


# Establece el directorio de trabajo
WORKDIR /frontapp

# Copia los archivos de tu proyecto en el directorio de trabajo
# COPY ./frontend .

# Instala las dependencias de npm
# RUN npm install

RUN if [ "$NODE_ENV" = "development" ]; then npm install nodemon -g; fi;

# Ejecuta el código Node.js
CMD [ "npm", "start" ]

#######################################################################
# syntax=docker/dockerfile:1.4 (no treure comentari)
# FROM --platform=$BUILDPLATFORM node:14.4.0-alpine AS development

# RUN mkdir /backend (no treure comentari)
# WORKDIR /backend

# COPY . .

# RUN yarn global add @vue/cli
# RUN yarn install
# ENV HOST=0.0.0.0
# CMD ["yarn", "run", "serve"]

# FROM development as dev-envs
# RUN <<EOF
# apk update
# apk add git
# EOF

# RUN <<EOF
# addgroup -S docker
# adduser -S --shell /bin/bash --ingroup docker vscode
# EOF
# install Docker tools (cli, buildx, compose) (no treure comentari)
# COPY --from=gloursdocker/docker / /
# CMD ["yarn", "run", "serve"]
