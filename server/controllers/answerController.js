const AnswerModel = require('../models/Answer.js');

const getAnswers = async (req, res) => {
  try {
    const question_id = req.params.question_id;
    const answers = await AnswerModel.getAnswers(question_id)
    res.json(answers)
  } catch (err) {
    console.error('Error fetching question: ', err)
    res.status(500).send('Internal Server Error')
  }
}
const postAnswer = async (req, res) => {
  // Extract questionId from route parameter and other fields from the body
  const { question_id } = req.params; // Make sure this matches your route parameter name
  const { body, name, email } = req.body;

  try {
    const answer = await AnswerModel.postAnswer(question_id, body, name, email);
    res.status(201).json(answer);
  } catch (err) {
    console.error('Error posting answer: ', err);
    res.status(500).send('Internal Server Error');
  }
};

const updateAnswerHelpfulness = async (req, res) => {
  try {
    const answer_id = req.params.answer_id; // Use answer_id, not question_id
    const updatedAnswer = await AnswerModel.updateAnswerHelpfulness(answer_id);
    if (updatedAnswer.length > 0) {
      res.json(updatedAnswer[0]);
    } else {
      res.status(404).send('Answer not found');
    }
  } catch (err) {
    console.error('Error updating answer helpfulness: ', err);
    res.status(500).send('Internal Server Error');
  }
};

const updateAnswerReport = async (req, res) => {
  try {
    const answer_id = req.params.answer_id;
    const updatedAnswer = await AnswerModel.updateAnswerReport(answer_id);
    if (updatedAnswer.length > 0) {
      res.json(updatedAnswer[0]);
    } else {
      res.status(404).send('Answer not found');
    }
  } catch (err) {
    console.error('Error updating answer helpfulness: ', err);
    res.status(500).send('Internal Server Error');
  }
}



module.exports = { getAnswers, postAnswer, updateAnswerHelpfulness, updateAnswerReport };