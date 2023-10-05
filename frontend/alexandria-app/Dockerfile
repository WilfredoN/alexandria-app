FROM alpine as build
WORKDIR /src/app
COPY package.json package-lock.json ./
RUN apk add --no-cache nodejs npm && \
    npm install
COPY . .
RUN npm run build
FROM nginx:1.17.9-alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /src/app/dist/alexandria-app /usr/share/nginx/html