const express = require('express');
const router = express.Router();
const questionsController = require('../controllers/questionsController.js');
const answerController = require('../controllers/answerController.js');
const productsControllers = require('../controllers/productsControllers.js')
// controller methods

// Products
router.get('/products', productsControllers.getProducts)
router.get('/products', (req, res) => {
  console.log('GET request to /api/products');
})
// Q's
router.get('/qa/questions', questionsController.getQuestions);
router.post('/qa/questions', questionsController.postQuestion);
router.put('/qa/questions/:question_id/helpful', questionsController.updateQuestionHelpfulness);
router.put('/qa/questions/:question_id/report', questionsController.updateQuestionReport);

// A's
router.get('/qa/questions/:question_id/answers', answerController.getAnswers)
router.post('/qa/questions/:question_id/answers', answerController.postAnswer);
router.put('/qa/answers/:answer_id/helpful', answerController.updateAnswerHelpfulness)
router.put('/qa/answers/:answer_id/report', answerController.updateAnswerReport)

module.exports = router;