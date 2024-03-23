DROP TABLE IF EXISTS photos, answers, questions, product, products CASCADE;

CREATE TABLE product (
 product_id BIGSERIAL PRIMARY KEY,
 name VARCHAR(255) NOT NULL,
 slogan VARCHAR(255) NOT NULL,
 description TEXT NOT NULL,
 category VARCHAR(255) NOT NULL,
 default_price VARCHAR NOT NULL,
);

CREATE TABLE questions (
  id SERIAL PRIMARY KEY,
  product_id INTEGER NOT NULL,
  body TEXT NOT NULL,
  date_written BIGINT,
  asker_name VARCHAR(255) NOT NULL,
  asker_email VARCHAR(255),
  reported BOOLEAN NOT NULL,
  helpful INTEGER NOT NULL,
  FOREIGN KEY (product_id) REFERENCES products(product_id)
);


CREATE TABLE answers (
 id INTEGER PRIMARY KEY,
 question_id INTEGER NOT NULL,
 body TEXT NOT NULL,
 date VARCHAR DEFAULT,
 answerer_name VARCHAR(255) NOT NULL,
 answerer_email VARCHAR(255) NOT NULL,
 helpfulness INTEGER NOT NULL,
 FOREIGN KEY (question_id) REFERENCES questions(question_id)
);




CREATE TABLE photos (
 photo_id BIGSERIAL PRIMARY KEY,
 url TEXT NOT NULL,
 answer_id INTEGER NOT NULL,
 FOREIGN KEY (answer_id) REFERENCES answers(answer_id)
);


/*

server index.js

app.get('/', (req, res) =)

*/


