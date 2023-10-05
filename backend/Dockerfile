FROM openjdk:17-jdk-alpine3.13
VOLUME /tmp
EXPOSE 8080
ARG JAR_FILE=target/*.jar
ADD ${JAR_FILE} alexandria-app-backend.jar
ENTRYPOINT ["java","-jar","/alexandria-app-backend.jar"]