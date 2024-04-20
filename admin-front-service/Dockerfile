FROM node:21-alpine as builder

WORKDIR /home/react/app

COPY package*.json .

RUN npm ci

COPY . .

RUN npm run build


# Stage 2
FROM nginx:1.25

WORKDIR /usr/share/nginx/html

RUN rm -rf ./*

COPY --from=builder /home/react/app/build .

ENTRYPOINT ["nginx", "-g", "daemon off;"]