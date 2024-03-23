import router = require('express').Router();
const controllers = require('./controllers')

// controller methods
// Q's
router.get('/questions', getProducts);
router.post('/questions', )
router.put('/questions/:question_id/helpful', markQuestionHelpful)
router.put('/questions/:question_id/report', markQuestionReported)

// A's
router.get('/questions/:question_id/answers', getAnswers)
router.post('/questions:/question_id/answers', postAnswer)
router.put('/answers/:answer_id/helpful', helpfulAnswer)
router.put('/answers/:answer_id/report', reportAnswer)

//
module.exports = router;