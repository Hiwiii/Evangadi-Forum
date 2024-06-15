const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/authMiddleware');
const { createQuestion, getQuestions, getQuestionById, updateQuestion, deleteQuestion } = require('../controller/questionController');

// Create a new question

router.post('/', authMiddleware, (req, res, next) => {
    console.log("POST request to /api/questions");
    next();
}, createQuestion);

// Get all questions
router.get('/', authMiddleware, (req, res, next) => {
    console.log("GET request to /api/questions");
    next();
}, getQuestions);

// Get a question by ID
router.get('/:id', authMiddleware, (req, res, next) => {
    console.log(`GET request to /api/questions/${req.params.id}`);
    next();
}, getQuestionById);

// Update a question
router.put('/:id', authMiddleware, (req, res, next) => {
    console.log(`PUT request to /api/questions/${req.params.id}`);
    next();
}, updateQuestion);

// Delete a question
router.delete('/:id', authMiddleware, (req, res, next) => {
    console.log(`DELETE request to /api/questions/${req.params.id}`);
    next();
}, deleteQuestion);



module.exports = router;

