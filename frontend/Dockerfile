FROM node:latest AS node
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install
RUN npm run build --prod
COPY . .
FROM nginx:alpine
COPY --from=node /app/dist/alexandria-app /usr/share/alexandria-app/html
EXPOSE 80

