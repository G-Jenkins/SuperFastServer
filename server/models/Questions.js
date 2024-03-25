const { Pool } = require('pg');
const pool = require('../../db/db.js');

const getQuestions = async() => {
  const { rows } = await pool.query('SELECT * FROM questions LIMIT 10');
  return rows;
}

const addQuestion = async (body, name, email, product_id) => {
  const query = `
    INSERT INTO questions (question_body, asker_name, asker_email, product_id, question_date, reported, helpful)
    VALUES ($1, $2, $3, $4, CURRENT_TIMESTAMP, false, 0)
    RETURNING *;
  `;
  const values = [body, name, email, product_id];
  const { rows } = await pool.query(query, values);
  return rows[0];
};

const updateQuestionHelpfulness = async (question_id) => {
  const query = 'UPDATE questions SET helpful = helpful + 1 WHERE question_id = $1 RETURNING *;';
  const { rows } = await pool.query(query, [question_id]);
  return rows;
}


const updateQuestionReport = async (question_id) => {
  const query = 'UPDATE questions SET reported = true WHERE question_id = $1 RETURNING *;';
  const { rows } = await pool.query(query, [question_id]);
  console.log('data2')
  return rows;
}


module.exports = { getQuestions, updateQuestionReport , updateQuestionHelpfulness, addQuestion }


// const QuestionModel = require('../models/Questions.js');

// const getQuestions = async (req, res) => {
//   try {
//     const questions = await QuestionModel.getQuestions();
//     res.json(questions)
//   } catch (err) {
//     console.error('Error fetching questions: ', err)
//     res.status(500).send('Internal Server Error')
//   }
// }
// const postQuestion = async (req, res) => {
//   try {
//     const question = await QuestionModel.postQuestion(req, res);
//     res.status(201).json(question);
//   } catch (err) {
//     console.error('Error posting questions: ', err);
//     res.status(500).send('Internal Server Error');
//   }
// };

// const updateQuestionHelpfulness = async (req, res) => {
//   try {
//     const updatedQuestion = await QuestionModel.updateQuestionHelpfulness(req, res);
//     if (updatedQuestion) {
//       res.json(updatedQuestion);
//     } else {
//       res.status(404).send('Question not found');
//     }
//   } catch (err) {
//     console.error('Error updating question helpfulness: ', err);
//     res.status(500).send('Internal Server Error');
//   }
// }

// const updateQuestionReport = async ( req, res ) => {
//   try {
//     const updatedQuestion = await QuestionModel.updateQuestionReport(req, res);
//     if (updatedQuestion) {
//       res.json(updatedQuestion)
//     } else {
//       res.status(404).send('Question Not Found');
//     }
//   } catch (err) {
//     console.error('Error updating question helpfulness:', err);
//     res.status(500).send('Internal Server Error');
//   }
// };


// module.exports = { getQuestions }