FROM node:lts-alpine3.9

RUN mkdir express-instagram
ARG SERVER_PORT
EXPOSE ${SERVER_PORT}

COPY package.json package-lock.json ./
RUN npm install

COPY index.js .
COPY express ./express/

CMD [ "npm","start" ]