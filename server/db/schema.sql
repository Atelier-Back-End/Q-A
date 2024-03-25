--DROP DATABASE IF EXISTS qna;

--CREATE DATABASE qna; --create databse qna

--\c qna; --connect to database qna


-- create questions table
CREATE TABLE questions (
    id SERIAL PRIMARY KEY,
    product_id INT NOT NULL,
    body TEXT NOT NULL,
    date_written BIGINT NOT NULL,
    asker_name VARCHAR(255) NOT NULL,
    asker_email VARCHAR(255) NOT NULL,
    reported BOOLEAN DEFAULT FALSE,
    helpful INT DEFAULT 0
);

-- create answers table
CREATE TABLE answers (
    id SERIAL PRIMARY KEY,
    question_id INT REFERENCES questions(id),
    body TEXT NOT NULL,
    date_written BIGINT NOT NULL,
    answerer_name VARCHAR(255) NOT NULL,
    answerer_email VARCHAR(255) NOT NULL,
    reported BOOLEAN DEFAULT FAlSE,
    helpful INT DEFAULT 0

);
-- create answers_photos table
CREATE TABLE answers_photos (
    id SERIAL PRIMARY KEY,
    answer_id INT REFERENCES answers(id),
    url TEXT NOT NULL
);

-- copy data from csv files into the tables
COPY questions FROM '/Users/richardli/hackreactoractual/Q-A/server/db/csv/questions.csv' DELIMITER ',' CSV HEADER;

COPY answers FROM '/Users/richardli/hackreactoractual/Q-A/server/db/csv/answers.csv' DELIMITER',' CSV HEADER;

COPY answers_photos FROM '/Users/richardli/hackreactoractual/Q-A/server/db/csv/answers_photos.csv' DELIMITER','CSV HEADER;


-- set sequence values for the primary key columns

-- for the questions table
SELECT setval('questions_id_seq', (SELECT MAX(id) FROM questions) + 1);

-- for the answers table
SELECT setval('answers_id_seq', (SELECT MAX(id) FROM answers) + 1);

-- for the answers_photo table
SELECT setval('answers_photos_id_seq',(SELECT MAX(id) FROM answers_photos) + 1);

ALTER TABLE questions ALTER COLUMN date_written TYPE TIMESTAMP USING to_timestamp(date_written/1000);

ALTER TABLE answers ALTER COLUMN date_written TYPE TIMESTAMP USING to_timestamp(date_written/1000);

-- Add indexes to optimize query performance

-- For the questions table
CREATE INDEX IF NOT EXISTS question_product_id_index ON questions (product_id);

-- For the answers table
CREATE INDEX IF NOT EXISTS answer_question_id_index ON answers (question_id);

-- For the photos table
CREATE INDEX IF NOT EXISTS photo_answer_id_index ON answers_photos (answer_id);
