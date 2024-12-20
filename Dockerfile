FROM node:22-alpine AS builder

WORKDIR /app/

COPY package*.json .

RUN npm install

COPY . .

RUN npm test

RUN npm run build-css

# Remove development/build files
RUN rm -rf node_modules/ package.json package-lock.json styles.sass



FROM nginx:1-alpine-slim

COPY --from=builder /app/ /usr/share/nginx/html/
