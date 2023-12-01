# Stage 1: Build the application using Gradle container
FROM gradle:latest AS builder

# Set the working directory
WORKDIR /app

# Copy project files for building
COPY . .

# Build the Gradle project
RUN gradle build

# Stage 2: Run the application
FROM openjdk:17-alpine

# Set the working directory
WORKDIR /app

# Install required packages and download Flyway
RUN apk update && \
    apk add --no-cache curl && \
    apk add --no-cache bash && \
    curl -fsSLo flyway.tar.gz https://repo1.maven.org/maven2/org/flywaydb/flyway-commandline/9.22.1/flyway-commandline-9.22.1.tar.gz && \
    tar -xzf flyway.tar.gz -C /usr/local && \
    rm flyway.tar.gz

# Copy the built JAR from the Gradle container
COPY --from=builder /app/build/libs/ /app/
RUN mv /app/*.jar /app/app.jar
COPY --from=builder /app/build/resources/main/application-docker.properties /app/application.properties

# Copy Flyway migration files
COPY src/main/resources/db/migration/* /flyway/db/migration/

# Define environment variables for the database
ENV DB_HOST=db
ENV DB_PORT=5432
ENV DB_NAME=alexandria
ENV DB_USERNAME=alexandria_login
ENV DB_PASSWORD=rotpasdbalexandria

# Run migrations and start the application
CMD ["/bin/sh", "-c", "/usr/local/flyway-9.22.1/flyway migrate -url=jdbc:postgresql://${DB_HOST}:${DB_PORT}/${DB_NAME} -user=${DB_USERNAME} -password=${DB_PASSWORD} && java -jar app.jar"]
