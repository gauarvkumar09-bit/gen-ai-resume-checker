const express = require('express')
const authcontroller = require('../controllers/auth.controller')
const authmiddleware = require('../middlewares/auth.middleware')

const router = express.Router()


router.post('/register',authcontroller.register)

router.post('/login',authcontroller.login)

router.post('/login',authcontroller.logout)

router.post('/getme',authmiddleware,authcontroller.getme)

module.exports = router