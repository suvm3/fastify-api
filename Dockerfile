FROM node:13-alpine

WORKDIR /src

COPY . .

RUN npm i

CMD [ "node", "server.js" ]