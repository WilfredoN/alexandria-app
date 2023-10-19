# Этап сборки
FROM gradle:8.0-alpine as gradleimage
WORKDIR /home/gradle/source
COPY build.gradle settings.gradle ./
RUN gradle dependencies
COPY . .
RUN gradle build

# Этап запуска
FROM openjdk:17-alpine
COPY --from=gradleimage /home/gradle/source/build/libs/*.jar /app/app.jar
WORKDIR /app
ENTRYPOINT ["java", "-jar", "app.jar"]
