FROM node:21-alpine as builder

WORKDIR /app/

COPY package*.json .

RUN npm install

COPY . .

RUN npm test

RUN npm run build-css

# Remove development/build files
RUN rm -rf node_modules/ package.json package-lock.json styles.sass



FROM nginx:1-alpine

COPY --from=builder /app/ /usr/share/nginx/html/
