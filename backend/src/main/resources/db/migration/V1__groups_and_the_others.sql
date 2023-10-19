CREATE TABLE IF NOT EXISTS users
(
    uid          VARCHAR(255)        NOT NULL UNIQUE,
    id           INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    full_name    VARCHAR(255)        NOT NULL,
    login        VARCHAR(255) UNIQUE NOT NULL,
    password     VARCHAR(255)        NOT NULL,
    role         VARCHAR(20)         NOT NULL,
    prefix_group VARCHAR(4),
    code_group   VARCHAR(3),
    created_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS groups
(
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    group_name VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS schedule
(
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    group_id    INTEGER REFERENCES groups (id) ON DELETE CASCADE,
    day_of_week VARCHAR(50)  NOT NULL,
    start_time  TIME         NOT NULL,
    end_time    TIME         NOT NULL,
    subject     VARCHAR(255) NOT NULL,
    teacher     VARCHAR(255) NOT NULL
);