const rateLimit = require('express-rate-limit');

const interviewLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // window ka size: 1 hour (milliseconds me)
    max: 5,                    // is window me max 5 requests allowed per key
    keyGenerator: (req) => req.user.id,  // kis basis pe limit lagani hai (yaha user ID)
    message: { message: "Too many requests" },
    standardHeaders: true,     // response me RateLimit-* headers bhejo (client ko batane ke liye kitni requests bachi hain)
    legacyHeaders: false,      
});

module.exports = {interviewLimiter};