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
  try {
    const question = await QuestionModel.postQuestion(req, res);
    res.status(201).json(question);
  } catch (err) {
    console.error('Error posting questions: ', err);
    res.status(500).send('Internal Server Error');
  }
};

const updateQuestionHelpfulness = async (req, res) => {
  try {
    const updatedQuestion = await QuesitonModel.updateQuestionHelpfulness(req, res);
    if (updatedQuestion) {
      res.json(updatedQuestion);
    } else {
      res.status(404).send('Question not found');
    }
  } catch (err) {
    console.error('Error updating question helpfulness: ', err);
    res.status(500).send('Internal Server Error');
  }
}

const updateQuestionReport = async ( req, res ) => {
  try {
    const updatedQuestion = await QuestionModel.updateQuestionReport(req, res);
    if (updatedcQuestion) {
      res.json(updatedQuestion)
    } else {
      res.status(404).send('Question Not Found');
    }
  } catch (err) {
    console.error('Error updating question helpfulness:', err);
    res.status(500).send('Internal Server Error');
  }
};


module.exports = { getQuestions }