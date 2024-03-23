const { Pool } = require('pg');
import pool = require('../db/db.js')

const getAnswers = async() => {
  const { rows } = await pool.query('SELECT * FROM answers LIMIT 10');
  return rows;
};

const postAnswer = async(questionId, body, answerer_name, answerer_email) => {
  const query = `
  INSERT INTO answers (question_id, body, answerer_name, answerer_email)
  VALUES($1, $2, $3, $4)
  RETURNING *;`;
  const { rows } = await pool.query(queryText, )
}

const updateAnswerHelpfulness = async (req, res) => {
  try {
    const { answer_id } = req.params;
    const queryText = `
    UPDATE answers
    SET helpfulness = helpfulness + 1
    WHERE answer_id = $1
    RETURNING *;`;
  } catch (err) {
    console.error('Error updating answer helpfulness : ', err);
    res.status(500).send('Internal Server Error');
  }
}

const updateAnswerReport = async (req, res) => {
  try {
    const { answer_id } = req.params;
    const queryText = `
    UPDATE answers
    SET helpfulness = helpfulness + 1
    WHERE answer_id = $
    RETURNING *;`;
    const { rows } = await pool.query(queryText, [answer_id]);
    if (rows.length > 0) {
      res.json({ message: 'Answer reported successfully' });
    } else {
      res.status(404).send('Answer not found');
    }
  } catch (err) {
    console.error('Error updating answer helpfulness : ', err);
    res.status(500).send('Internal Server Error');
  }
}
module.exports = { getAnswers }