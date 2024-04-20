FROM node:21-alpine

WORKDIR /home/node/app

COPY package*.json .

RUN npm ci

COPY . .

EXPOSE 8080

CMD ["node","index.js"]