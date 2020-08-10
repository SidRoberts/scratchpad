FROM node:14-alpine as builder

WORKDIR /app/

COPY . .

RUN npm -g install sass

RUN sass styles.sass > styles.css

RUN rm styles.sass



FROM nginx:1-alpine

COPY --from=builder /app/ /usr/share/nginx/html/
