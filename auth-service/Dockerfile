FROM node:21-alpine

WORKDIR /home/node/app

COPY package*.json .

RUN npm ci

COPY . .

EXPOSE 7070

CMD ["node","index.js"]