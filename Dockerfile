FROM node:alpine

WORKDIR /opt/homemetrics_gateway
COPY index.js .
COPY config.js .
COPY package.json .
COPY package-lock.json .

RUN npm install

CMD [ "npm", "start" ]