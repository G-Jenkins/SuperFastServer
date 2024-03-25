const QuestionModel = require('../models/Questions.js');

const getQuestions = async (req, res) => {
  try {
    const questions = await QuestionModel.getQuestions();
    res.json(questions)
  } catch (err) {
    console.error('Error fetching questions: ', err)
    res.status(500).send('Internal Server Error')
  }
}
const postQuestion = async (req, res) => {
  const { body, name, email, product_id } = req.body;
  try {
    const question = await QuestionModel.addQuestion(body, name, email, product_id);
    res.status(201).json(question);
  } catch (err) {
    console.error('Error adding question, ', err);
    res.status(500).send('Internal server error');
  }
};

const updateQuestionHelpfulness = async (req, res) => {
  try {
    const question_id = req.params.question_id;
    const updatedQuestion = await QuestionModel.updateQuestionHelpfulness(question_id);
    res.json(updatedQuestion)
  } catch (err) {
    console.error('Error updating quesiton helpfulness: ', err);
    res.status(500).send('Internal Server Error')
  }
}

const updateQuestionReport = async ( req, res ) => {
  try {
    const question_id = req.params.question_id;
    const updatedQuestion = await QuestionModel.updateQuestionReport(question_id);
    res.json(updatedQuestion);
  } catch (err) {
    console.error('Error reporting question: ', err);
    res.status(500).send('Internal Server Error');
  }
};


module.exports = { getQuestions, postQuestion, updateQuestionHelpfulness, updateQuestionReport  }