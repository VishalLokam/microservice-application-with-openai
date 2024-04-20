FROM node:21

WORKDIR /home/node/app

COPY package*.json .

RUN npm ci

COPY . .

EXPOSE 7070

CMD ["node","index.js"]