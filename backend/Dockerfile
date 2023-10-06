
# make build-backend with gradle
FROM gradle:jdk17-hotspot as build
COPY --chown=gradle:gradle . /app
WORKDIR /app/backend
RUN gradle build

# Запустите приложение
FROM openjdk:17-jdk-alpine3.13
VOLUME /tmp
EXPOSE 8080
COPY --from=build /app/backend/target/*.jar alexandria-app-backend.jar
ENTRYPOINT ["java","-jar","/alexandria-app-backend.jar"]
