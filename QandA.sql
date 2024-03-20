DROP TABLE IF EXISTS photos, answers, questions, products CASCADE;


CREATE TABLE products (
 product_id BIGSERIAL PRIMARY KEY,
 campus VARCHAR(255) NOT NULL,
 name VARCHAR(255) NOT NULL,
 description TEXT NOT NULL,
 category VARCHAR(255) NOT NULL,
 default_price VARCHAR NOT NULL,
 created_at TIMESTAMP DEFAULT current_timestamp,
 updated_at TIMESTAMP DEFAULT current_timestamp
);


CREATE TABLE questions (
 question_id BIGSERIAL PRIMARY KEY,
 product_id BIGINT NOT NULL,
 question_body VARCHAR(255) NOT NULL,
 question_date TIMESTAMP DEFAULT current_timestamp,
 asker_name TEXT NOT NULL,
 question_helpfulness INTEGER NOT NULL,
 reported BOOLEAN NOT NULL,
 FOREIGN KEY (product_id) REFERENCES products(product_id)
);


CREATE TABLE answers (
 answer_id SERIAL PRIMARY KEY,
 question_id INTEGER NOT NULL,
 body TEXT NOT NULL,
 date TIMESTAMP DEFAULT current_timestamp,
 answerer_name VARCHAR(255) NOT NULL,
 helpfulness INTEGER NOT NULL,
 FOREIGN KEY (question_id) REFERENCES questions(question_id)
);


CREATE TABLE photos (
 photo_id BIGSERIAL PRIMARY KEY,
 url TEXT NOT NULL,
 answer_id INTEGER NOT NULL,
 FOREIGN KEY (answer_id) REFERENCES answers(answer_id)
);
