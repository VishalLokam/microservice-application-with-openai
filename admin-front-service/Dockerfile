FROM node:21-alpine as builder
# FROM node:21-alpine

WORKDIR /home/react/app

COPY package*.json .

RUN npm ci

EXPOSE  3000

COPY . .

RUN npm run build



# Stage 2
FROM nginx:1.25

WORKDIR /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

RUN rm -rf ./*

COPY --from=builder /home/react/app/build .

EXPOSE 80

CMD  ["nginx", "-g", "daemon off;"]