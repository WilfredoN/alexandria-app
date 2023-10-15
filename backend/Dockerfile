FROM gradle:8.0-alpine as gradleimage
COPY . /home/gradle/source
WORKDIR /home/gradle/source
RUN gradle build

FROM openjdk:17-alpine
COPY --from=gradleimage /home/gradle/source/build/libs/*.jar /app/app.jar
WORKDIR /app
ENTRYPOINT ["java", "-jar", "app.jar"]