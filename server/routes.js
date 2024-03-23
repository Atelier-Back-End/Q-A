const express = require('express');
const router = express.Router();
const { getQuestions, postQuestion, helpfulQuestion, reportQuestion } = require('./controllers/questions.js');
const { getAnswers, postAnswer, helpfulAnswer, reportAnswer } = require('./controllers/answers.js');

//question endpoints
router.get('/questions/:productID', getQuestions);
router.post('/questions', postQuestion);
router.put('/questions/:questionID/helpful', helpfulQuestion);
router.put('/questions/:questionID/report', reportQuestion);
//answer endpoints
router.get('/answers/:questionID', getAnswers);
router.post('/answers/:questionID', postAnswer);
router.put('/answers/:answerID/helpful', helpfulAnswer);
router.put('/answers/:answerID/report', reportAnswer);

module.exports = router;