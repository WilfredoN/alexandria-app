CREATE TABLE IF NOT EXISTS users
(
    uid       VARCHAR(255) NOT NULL UNIQUE,
    id         INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    full_name  VARCHAR(255) NOT NULL,
    login      VARCHAR(255) NOT NULL UNIQUE,
    password   VARCHAR(255) NOT NULL,
    user_group VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS teachers
(
    uid      VARCHAR(255) NOT NULL UNIQUE,
    id         SERIAL PRIMARY KEY,
    full_name  VARCHAR(255) NOT NULL,
    avatar_path VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS subjects
(
    id         SERIAL PRIMARY KEY,
    name       VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS groups
(
    id         SERIAL PRIMARY KEY,
    number     VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS teacher_subjects
(
    id         SERIAL PRIMARY KEY,
    teacher_id INTEGER REFERENCES teachers(id),
    subject_id INTEGER REFERENCES subjects(id)
);

CREATE TABLE IF NOT EXISTS teacher_groups
(
    id         SERIAL PRIMARY KEY,
    teacher_id INTEGER REFERENCES teachers(id),
    group_id   INTEGER REFERENCES groups(id)
);

CREATE TABLE IF NOT EXISTS teacher_users
(
    id         SERIAL PRIMARY KEY,
    teacher_id INTEGER REFERENCES teachers(id),
    user_id   INTEGER REFERENCES users(id)
);
