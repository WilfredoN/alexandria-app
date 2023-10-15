-- Таблица для предметов
CREATE TABLE subjects
(
    id   serial PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

-- Таблица для групп
CREATE TABLE groups
(
    id   serial PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

-- Таблица для пользователей (преподаватели и студенты)
CREATE TABLE users
(
    uid        VARCHAR(255)        NOT NULL UNIQUE,
    id         INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    full_name  VARCHAR(255)        NOT NULL,
    login      VARCHAR(255) UNIQUE NOT NULL,
    password   VARCHAR(255)        NOT NULL,
    role       VARCHAR(20)         NOT NULL, -- роль пользователя (преподаватель или студент)
    group_name VARCHAR(10),
    group_id   INT,                          -- ID группы, к которой относится студент
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблица для связи преподавателей с предметами
CREATE TABLE teacher_subjects
(
    teacher_id INT NOT NULL,
    subject_id INT NOT NULL,
    PRIMARY KEY (teacher_id, subject_id),
    FOREIGN KEY (teacher_id) REFERENCES users (id),
    FOREIGN KEY (subject_id) REFERENCES subjects (id)
);

-- Таблица для домашних заданий
CREATE TABLE homework
(
    id         serial PRIMARY KEY,
    title      VARCHAR(255) NOT NULL,
    type       VARCHAR(50)  NOT NULL,
    subject_id INT          NOT NULL, -- ID предмета, к которому относится задание
    teacher_id INT,                   -- ID преподавателя, разместившего задание
    deadline   DATE         NOT NULL
);

-- Таблица для расписания
CREATE TABLE schedule
(
    id          serial PRIMARY KEY,
    day_of_week VARCHAR(15) NOT NULL,
    subject_id  INT         NOT NULL, -- ID предмета, который проводится
    group_id    INT         NOT NULL
);

-- Таблица для объявлений
CREATE TABLE announcements
(
    id         serial PRIMARY KEY,
    title      VARCHAR(255) NOT NULL,
    content    TEXT         NOT NULL,
    teacher_id INT, -- ID преподавателя, разместившего объявление
    created_at TIMESTAMP DEFAULT NOW()
);

-- Связи между таблицами
ALTER TABLE users
    ADD CONSTRAINT fk_group FOREIGN KEY (group_id) REFERENCES groups (id);
ALTER TABLE homework
    ADD CONSTRAINT fk_subject_homework FOREIGN KEY (subject_id) REFERENCES subjects (id);
ALTER TABLE homework
    ADD CONSTRAINT fk_teacher_homework FOREIGN KEY (teacher_id) REFERENCES users (id);
ALTER TABLE schedule
    ADD CONSTRAINT fk_subject_schedule FOREIGN KEY (subject_id) REFERENCES subjects (id);
ALTER TABLE schedule
    ADD CONSTRAINT fk_group_schedule FOREIGN KEY (group_id) REFERENCES groups (id);
ALTER TABLE announcements
    ADD CONSTRAINT fk_teacher_announcements FOREIGN KEY (teacher_id) REFERENCES users (id);
