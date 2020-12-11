FROM node:14-alpine as builder

WORKDIR /app/

COPY . .

RUN npm install

RUN npm test

RUN npm run build-css

RUN rm styles.sass



FROM nginx:1-alpine

COPY --from=builder /app/ /usr/share/nginx/html/
