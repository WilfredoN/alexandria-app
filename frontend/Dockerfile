FROM node:alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Этап запуска
FROM nginx:alpine
COPY .nginx/nginx.conf /etc/nginx/nginx.conf
WORKDIR /usr/share/nginx/html
COPY --from=build /app/dist/alexandria-app/ .
EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]
