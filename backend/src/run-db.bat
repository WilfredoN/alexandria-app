docker run -d --name alexandria ^
  -e POSTGRES_USER=root ^
  -e POSTGRES_PASSWORD=root1234 ^
  -p 5432:5432 ^
  postgres:latest