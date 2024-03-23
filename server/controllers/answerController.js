const AnswerModel = require('../models/Answer.js');

const getAnswers = async (req, res) => {
  try {
    const answers = await AnswerModel.getAnswers();
    res.json(answers);
  } catch (err) {
    console.error('Error fetching answers: ', err);
    res.status(500).send('Internal Server Error')
  }
}

module.exports = { getAnswers };