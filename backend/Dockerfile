# Stage 1: Build the application using Gradle container
FROM gradle:latest AS builder

# Set the working directory
WORKDIR /app

COPY . .
# Build the Gradle project
RUN gradle clean build

# Stage 2: Run the application
FROM openjdk:17-alpine

# Set the working directory
WORKDIR /app

COPY --from=builder /app/build/libs/* /app/
COPY --from=builder /app/build/resources/db/migration /app/db/migration
CMD ["/bin/sh", "-c", "java -jar alexandria-0.0.3.jar --spring.profiles.active='prod'"]
