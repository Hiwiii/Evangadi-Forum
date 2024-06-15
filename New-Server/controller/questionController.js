const Question = require('../models/questionModel');

// Create a new question
exports.createQuestion = async (req, res) => {
    const { title, description } = req.body;
    const username = req.user.username; 

    if (!title || !description) {
        return res.status(400).json({ msg: 'Please provide all required fields' });
    }

    try {
    console.log("Creating question for user:", username); 
    const question = new Question({
        title,
        description,
        username
    });
    await question.save();
        res.status(201).json({ msg: 'Question created successfully', question });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Something went wrong, try again later' });
    }
};

// Get all questions
exports.getQuestions = async (req, res) => {
    try {
        const questions = await Question.find().sort({ createdAt: -1 });
        res.status(200).json(questions);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Something went wrong, try again later' });
    }
};

// Get a question by ID
exports.getQuestionById = async (req, res) => {
    try {
        const question = await Question.findById(req.params.id);
        if (!question) {
            return res.status(404).json({ msg: 'Question not found' });
        }
        res.status(200).json(question);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Something went wrong, try again later' });
    }
};


// Update a question
exports.updateQuestion = async (req, res) => {
    const { title, description } = req.body;

    if (!title || !description) {
        return res.status(400).json({ msg: 'Please provide all required fields' });
    }

    try {
        const question = await Question.findById(req.params.id);

        if (!question) {
            return res.status(404).json({ msg: 'Question not found' });
        }

        if (question.username !== req.user.username) {
            return res.status(403).json({ msg: 'Unauthorized to update this question' });
        }

        question.title = title;
        question.description = description;

        await question.save();
        res.status(200).json({ msg: 'Question updated successfully', question });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Something went wrong, try again later' });
    }
};

// Delete a question
exports.deleteQuestion = async (req, res) => {
    try {
        const question = await Question.findById(req.params.id);

        if (!question) {
            return res.status(404).json({ msg: 'Question not found' });
        }

        if (question.username !== req.user.username) {
            return res.status(403).json({ msg: 'Unauthorized to delete this question' });
        }

        await Question.deleteOne({ _id: req.params.id });
        res.status(200).json({ msg: 'Question deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Something went wrong, try again later' });
    }
};
