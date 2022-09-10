const express = require('express')
const router = express.Router()
const protected = require('../../middlewares/auth/authMiddleware')
const apiLimite = require('../../middlewares/rateLimiter/rateLimiter')
const { 
    doRegister,
    doLogin,
    doLogout,
    fetchAllUsers
 } = require('../../controllers/user/userControler')

router.post('/register',doRegister)
router.post('/login',doLogin)
router.post('/all',fetchAllUsers)
router.post('/logout',protected,doLogout)

module.exports = router