# Используйте maven с openjdk для сборки проекта
FROM maven:3.8.4-openjdk-17 as build
WORKDIR /app

# Копируйте оба pom.xml и скачайте зависимости
COPY ../pom.xml ./pom.xml
COPY ./pom.xml ./backend/pom.xml
RUN mvn -B dependency:go-offline

# Теперь копируйте исходный код и соберите проект
COPY . ./backend
RUN mvn package

# Запустите приложение
FROM openjdk:17-jdk-alpine3.13
VOLUME /tmp
EXPOSE 8080
COPY --from=build /app/backend/target/*.jar alexandria-app-backend.jar
ENTRYPOINT ["java","-jar","/alexandria-app-backend.jar"]
