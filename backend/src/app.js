const express = require('express');
const cookieparser = require('cookie-parser')
const cors = require('cors')
const helmet = require('helmet');
require('dotenv').config();
const authrouter = require('./routes/auth.route')
const interviewroute = require('./routes/interview.route')

const app = express()
app.use(cors({
    origin: 'http://localhost:5173', // आपके फ्रंटएंड (Vite) का URL
    credentials: true,               // क्रेडेंशियल्स और कुकीज़ अलाउ करने के लिए
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));




app.use(cookieparser())
app.use(express.json())



app.use(helmet()); // Yeh  HTTP headers ko secure karta hai aur hackers se chhupata hai



app.use('/api/user',authrouter)
app.use('/api/interview',interviewroute)

module.exports = app