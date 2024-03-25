const { Pool } = require('pg');
const pool = require('../../db/db.js')

const getAnswers = async() => {
  const { rows } = await pool.query('SELECT * FROM answers LIMIT 10');
  return rows;
};

const postAnswer = async (questionId, body, answerer_name, answerer_email, photos) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN'); // Start transaction

    // Insert the answer and get back the answer_id
    const answerInsertQuery = `
      INSERT INTO answers (question_id, body, answerer_name, answerer_email, date_written, reported, helpfulness)
      VALUES ($1, $2, $3, $4, CURRENT_TIMESTAMP, false, 0)
      RETURNING answer_id;`; // Assuming date_written is the correct column for the timestamp
    const answerResult = await client.query(answerInsertQuery, [questionId, body, answerer_name, answerer_email]);
    const answerId = answerResult.rows[0].answer_id;

    // Insert each photo URL associated with the answer
    if (photos && photos.length > 0) {
      const photoInsertQuery = 'INSERT INTO photos (answer_id, url) VALUES ($1, $2)';
      for (const photoUrl of photos) {
        await client.query(photoInsertQuery, [answerId, photoUrl]);
      }
    }

    await client.query('COMMIT'); // Commit the transaction
    return { answerId, questionId, body, answerer_name, answerer_email, photos };
  } catch (e) {
    await client.query('ROLLBACK'); // Rollback the transaction in case of error
    throw e;
  } finally {
    client.release(); // Release the client back to the pool
  }
};


const updateAnswerHelpfulness = async (answer_id) => {
  const query = 'UPDATE answers SET helpfulness = helpfulness + 1 WHERE answer_id = $1 RETURNING *';
  const { rows } = await pool.query(query, [answer_id]);
  return rows;
}

const updateAnswerReport = async (answer_id) => {
const query = 'UPDATE answers SET reported = true WHERE answer_id = $1 RETURNING*;'
const { rows } = await pool.query(query, [answer_id]);
console.log('data3');
return rows;
}

module.exports = { getAnswers, updateAnswerHelpfulness, updateAnswerReport, postAnswer }