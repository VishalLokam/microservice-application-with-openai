FROM node:21-alpine

WORKDIR /home/node/app

COPY package*.json .

RUN npm ci

COPY . .

EXPOSE 9090

CMD ["node","index.js"]