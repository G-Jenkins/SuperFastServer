require('dotenv').config();
const fs = require('fs');
const { Client } = require('pg');
const copyFrom = require('pg-copy-streams').from;
// inputs
const inputFileAnswersPhotos = './csvImports/answers_photos.csv';
const inputFileAnswers = './csvImports/answers.csv';
const inputFileProducts = './csvImports/product.csv';
const inputFileQuestions = './csvImports/questions.csv';

// tables
const tableAnswersPhotos = 'answers_photos'
const tableAnswers = 'answers'
const tableProducts = 'products';
const tableQuestions = 'questions'

const client = new Client({
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  database: process.env.PGDATABASE
});



async function loadCsvIntoTable(inputFile, tableName) {
  console.time(`Loading ${tableName}`);

  // Truncate Table
  await client.query(`TRUNCATE ${tableName} CASCADE`);

  let copyQuery = `COPY ${tableName} FROM STDIN CSV HEADER`;
  if (tableName === 'questions') {
      copyQuery = `COPY ${tableName}(question_id, product_id, question_body, question_date, asker_name, asker_email, reported, helpful) FROM STDIN CSV HEADER`;
  } else if (tableName === 'answers') {
      copyQuery = `COPY ${tableName}(answer_id, question_id, body, date_written, answerer_name, answerer_email, reported, helpfulness) FROM STDIN CSV HEADER`;
  } else if (tableName === 'products') {
      copyQuery = `COPY ${tableName}(product_id, name, slogan, description, category, default_price) FROM STDIN CSV HEADER`;
  }

  const stream = client.query(copyFrom(copyQuery));
  const fileStream = fs.createReadStream(inputFile);

  await new Promise((resolve, reject) => {
      fileStream.on('error', reject);
      stream.on('error', reject);
      stream.on('finish', resolve);
      fileStream.pipe(stream);
  });

  if (tableName === 'questions') { // changed tableNames for my tables that have the UNIX timestamps
    console.time('Date conversion'); // Start timing
    console.log('Converting unix_timestamp to date...');
    await client.query(`
        UPDATE questions
        SET question_date = to_timestamp(question_date / 1000.0) AT TIME ZONE 'UTC'
        WHERE question_date IS NULL  -- This ensures that we only update rows where question_date is NULL
    `);
    console.timeEnd('Date conversion'); // End timing and log the time taken
  } else if (tableName === 'answers') {
    console.time('Date conversion');
    console.log('Converting unix_timestamp to date...');
    await client.query(`
      UPDATE answers
      SET date_written = to_timestamp(date_written / 1000.0) AT TIME ZONE 'UTC'
      WHERE date_written is NULL
      date_written is NULL
      `);
  }
  console.timeEnd(`Loading ${tableName}`);
}

async function loadAllCsvs() {
  try {
      await client.connect();
      console.log('Connected to PostgreSQL database');

      await loadCsvIntoTable(inputFileProducts, tableProducts);
      await loadCsvIntoTable(inputFileQuestions, tableQuestions);
      await loadCsvIntoTable(inputFileAnswers, tableAnswers);
      await loadCsvIntoTable(inputFileAnswersPhotos, tableAnswersPhotos);

      console.log('All CSV files have been successfully imported.');

  } catch (error) {
      console.error('Error during CSV load:', error);
  } finally {
      client.end();
      console.log('PostgreSQL client connection closed');
  }
}

loadAllCsvs();