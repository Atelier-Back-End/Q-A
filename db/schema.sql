DROP DATABASE IF EXISTS QnA;

CREATE DATABASE QnA; --create databse QnA

\c QnA --connect to database QnA


-- create questions table
CREATE TABLE questions (
    id SERIAL PRIMARY KEY,
    product_id VARCHAR(50),
    body TEXT,
    date_written TIMESTAMP,
    asker_name VARCHAR(255),
    asker_email VARCHAR(255),
    reported boolean DEFAULT FALSE,
    helpful INT
);

-- create answers table
CREATE TABLE answers (
    id SERIAL PRIMARY KEY,
    question_id INT REFERENCES Question(id),
    body TEXT,
    date_written TIMESTAMP,
    answerer_name VARCHAR(255),
    answerer_email VARCHAR(255),
    reported boolean DEFAULT FAlSE,
    helpful INT

);
-- create answers_photos table
CREATE TABLE answers_photos (
    id SERIAL PRIMARY KEY,
    answer_id INT REFERENCES Answer(id),
    url TEXT
);

-- copy data from csv files into the tables
\copy answers_photos FROM '/Users/richardli/hackreactoractual/Q-A/db/cvs/answers_photos.csv' WITH (FORMAT CSV, HEADER);

\copy answers FROM '/Users/richardli/hackreactoractual/Q-A/db/cvs/answers.csv' WITH (FORMAT CSV, HEADER);

\copy questions FROM '/Users/richardli/hackreactoractual/Q-A/db/cvs/questions.csv' WITH (FORMAT CSV, HEADER);

-- set sequence values for the primary key columns

-- for the questions table
SELECT setval(pg_get_serial_sequence('questions', 'id'), COALESCE(max(id),0) + 1, false) FROM questions;

-- for the answers table
SELECT setval(pg_get_serial_sequence('answers', 'id'), COALESCE(max(id),0) + 1, false) FROM answers;

-- for the answers_photo table
SELECT setval(pg_get_serial_sequence('answers_photos', 'id'), COALESCE(max(id),0) + 1, false) FROM photos;

-- Add indexes to optimize query performance

-- For the questions table
CREATE INDEX question_product_id_index ON questions (product_id);
CREATE INDEX question_date_written_index ON questions (date_written DESC);

-- For the answers table
CREATE INDEX answer_question_id_index ON answers (question_id);
CREATE INDEX answer_date_written_index ON answers (date_written DESC);

-- For the photos table
CREATE INDEX photo_answer_id_index ON answers_photos (answer_id);