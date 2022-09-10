const express = require('express')
const router = express.Router()
const protected = require('../../middlewares/auth/authMiddleware')
const {
    createQuestion,
    fetchAllQuestions,
    createSurvey,
    fetchAllSurvey,
    fetchSurvey
} = require('../../controllers/user/questionController')

router.post('/create', protected, createQuestion)
router.get('/all', protected,fetchAllQuestions)
router.post('/create-survey',protected,createSurvey)
router.get('/all-survey',protected,fetchAllSurvey)
router.post('/single-survey',protected,fetchSurvey)

module.exports = router