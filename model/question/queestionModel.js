const mongoose = require('mongoose')
//CREATE QUESTION SCHEMA
const questionSchema = new mongoose.Schema(
    {
        question: {
            required: [true, "question is required"],
            type: String,
        },
        options : {
            type: Array,
            default: [],
        }
    },
    {
        toJSON: {
            virtuals: true,
        },
        toObject: {
            virtuals: true,
        },
        timestamps: true,
    }
);
//Compile schema into model
const Question = mongoose.model("Question", questionSchema);

module.exports = Question;
