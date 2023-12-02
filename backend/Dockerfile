# Stage 1: Build the application using Gradle container
FROM gradle:latest AS builder

# Set the working directory
WORKDIR /app

# Copy all project files excluding application.properties
COPY . .
# Build the Gradle project
RUN gradle clean build

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
COPY --from=builder /app/build/libs/* /app/
# Define environment variables for the database
ENV DB_HOST=db
ENV DB_PORT=5432
ENV DB_NAME=alexandria
ENV DB_USERNAME=alexandria_login
ENV DB_PASSWORD=rotpasdbalexandria
CMD ["/bin/sh", "-c", "java -jar alexandria-0.0.3.jar"]
