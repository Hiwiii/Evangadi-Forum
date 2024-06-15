const mongoose = require('mongoose'); // Import Mongoose

// Define the schema for questions
const questionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        maxlength: 200 
    },
    description: {
    type: String,
    required: true 
    },
    username: {
        type: String,
        required: true 
    },
    createdAt: {
        type: Date,
        default: Date.now 
    }
});

// Create the Question model from the schema
const Question = mongoose.model('Question', questionSchema);

// Export the model so it can be used in other parts of the application
module.exports = Question;
