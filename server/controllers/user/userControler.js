const User = require('../../model/User/UserModel')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const generateToken = require('../../config/token /generateToken.js')
const generateRefreshToken = require('../../config/token /generateRefreshToken.js')
const validateMongodbId = require('../../utils/validateMongodbID.js')



//========================|| User Register  ||========================
// @route POST => /api/users/register
//====================================================================
const doRegister = asyncHandler(async (req, res) => {
    const { fullName, email, password } = req.body
    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    // Check if user exists
    const userExists = await User.findOne({ email })
    if (userExists) {
        res.status(409)
        throw new Error('User already exists')
    }

    //Create new user
    try {
      const user = await User.create({
            fullName,
            email,
            password: hashedPassword
        })
        //generate access and refresh tokens
        const accessToken = generateToken(user._id)
        const refreshToken = generateRefreshToken(user._id)
        //push refresh token into user DB
        await User.findByIdAndUpdate(user._id, {
            $push: { refreshTokens: refreshToken },
        }, { new: true })
        // pass user into client
        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            profilePhoto: user.profilePhoto,
            isAdmin: user.isAdmin,
            roles: user.roles,
            wallet: user?.wallet,
            accessToken,
            refreshToken,
            isSuccess: true
        })
    } catch (error) {
        throw new Error(error.message)
    }
})
//========================|| User Login ||========================
// @route POST => /api/users/login
//====================================================================
const doLogin = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    //Check if user exists
    const user = await User.findOne({ email })
    if (!user) {
        res.status(401)
        throw new Error('Login credentials not found')
    }
    // Check if password matches
    if (user && (await bcrypt.compare(password, user.password))) {
        //generate access and refresh tokens
        const accessToken = generateToken(user._id)
        const refreshToken = generateRefreshToken(user._id)

        //push refresh token into user DB
        await User.findByIdAndUpdate(user._id, {
            $push: { refreshTokens: refreshToken },
        }, { new: true })

        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            profilePhoto: user.profilePhoto,
            isAdmin: user.isAdmin,
            wallet: user?.wallet,
            roles: user.roles,
            accessToken,
            refreshToken
        })
    } else {
        res.status(401)
        throw new Error('Invalid credentials')
    }
})
const fetchAllUsers = asyncHandler(async(req,res) => {
    try {
        const users = await User.find({})
        res.status(200).json(users)
    } catch (error) {
        throw new Error(error.message)
    }
})
//========================|| User Logout ||========================
// @route POST => /api/users/logout
//====================================================================
const doLogout = asyncHandler(async (req, res) => {
    try {
        const userId = req.user._id
        const refreshToken = req.body.refreshToken
        //pull old refresh token from DB
        await User.findByIdAndUpdate(userId, {
            $pull: { refreshTokens: refreshToken }
        }, { new: true })
        console.log('user logged out')
        res.status(200).json({ status: true })
    } catch (error) {
        throw new Error(error.message)
    }
})

module.exports = {
    doRegister,
    doLogin,
    doLogout,
    fetchAllUsers

}