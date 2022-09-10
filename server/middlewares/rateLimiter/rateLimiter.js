const rateLimit = require('express-rate-limit')

const apiLimiter = rateLimit({
	windowMs:  1000, // 10 minutes
	max: 100, // Limit each IP to 100 requests per `window` (here, per 10 minutes)
    message:'Too many request from same IP, please try again after 10 minutes',
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})
module.exports = apiLimiter