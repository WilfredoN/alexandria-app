CREATE TABLE users
(
    uid        VARCHAR(255)        NOT NULL UNIQUE,
    id         INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    full_name  VARCHAR(255)        NOT NULL,
    login      VARCHAR(255) UNIQUE NOT NULL,
    password   VARCHAR(255)        NOT NULL,
    role       VARCHAR(20)         NOT NULL, -- роль пользователя (преподаватель или студент)
    prefix_group VARCHAR(2),
    code_group   VARCHAR(3),                          -- ID группы, к которой относится студент
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
