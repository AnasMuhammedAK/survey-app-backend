const mongoose = require('mongoose')
//CREATE QUESTION SCHEMA
const surveySchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        survey : {
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
const Survey = mongoose.model("Survey", surveySchema);

module.exports = Survey;
