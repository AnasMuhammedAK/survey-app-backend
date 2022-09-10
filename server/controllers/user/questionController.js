const asyncHandler = require('express-async-handler')
const Question = require('../../model/question/queestionModel')
const Survey = require('../../model/survey/SurveyModel')
const User = require('../../model/User/UserModel')



//========================|| Create Question  ||========================
// @route POST => /api/questions/create
//====================================================================
const createQuestion = asyncHandler(async (req, res) => {
    const { question, options } = req.body
    try {
        const qstn = await Question.create({
            question, options
        })
        res.status(200).json(qstn)
    } catch (error) {
        throw new Error(error.message)
    }
})
//========================|| Fetch Question  ||========================
// @route GET => /api/questions/all
//====================================================================
const fetchAllQuestions = asyncHandler(async (req, res) => {
    try {
        const questions = await Question.find({})
        res.status(200).json(questions)
    } catch (error) {
        throw new Error(error.message)
    }
})
//========================|| Create Survey  ||========================
// @route POST => /api/questions/create
//====================================================================
const createSurvey = asyncHandler(async (req, res) => {
    const userId = req.user.id
    console.log(userId)
    const isExist = await Survey.findOne({ user: userId })
    //to avoid creating single user multiple survey
    if (isExist) throw new Error(`You are already Submitted one Survey`)
    try {
        const survey = await Survey.create({
            user: userId,
            survey: req.body
        })
        if (survey) {
            await User.findByIdAndUpdate(userId, {
                wallet: 50
            }, { new: true })
        }
        res.status(200).json(survey)
    } catch (error) {
        throw new Error(error.message)
    }
})
//========================|| Fetch All Survey  ||========================
// @route GET => /api/questions/all-survey
//=======================================================================
const fetchAllSurvey = asyncHandler(async (req, res) => {
    try {
        const surveys = await Survey.find({}).populate("user")
        res.status(200).json(surveys)
    } catch (error) {
        throw new Error(error.message)
    }
})
//========================|| Fetch Survey  ||========================
// @route GET => /api/questions/single-survey
//=======================================================================
const fetchSurvey = asyncHandler(async (req, res) => {
    const { id } = req.body
    try {
        const survey = await Survey.findById(id).populate("user")
        if (!survey) throw new Error(`Survey not found`)
        res.status(200).json(survey)
    } catch (error) {
        throw new Error(error.message)
    }
})

module.exports = {
    createQuestion,
    fetchAllQuestions,
    createSurvey,
    fetchAllSurvey,
    fetchSurvey
}