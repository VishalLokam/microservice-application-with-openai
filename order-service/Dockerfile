FROM node:21

WORKDIR /home/node/app

COPY package*.json .

RUN npm ci

COPY . .

EXPOSE 9090

CMD ["node","index.js"]