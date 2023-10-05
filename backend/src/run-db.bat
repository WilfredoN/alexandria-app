docker run -d ^
  -e POSTGRES_USER=root ^
  -e POSTGRES_PASSWORD=root1234 ^
  -p 5432:5432 ^
  postgres:14.2