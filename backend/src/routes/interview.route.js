const express = require('express')
const authmiddleware = require('../middlewares/auth.middleware')
const interviewLimiter = require('../middlewares/rateLimit.middleware')
const upload = require('../middlewares/file.middleware')
const generatereport = require('../controllers/interview.controller')


const router =express.Router()

router.post('/',interviewLimiter.interviewLimiter,authmiddleware,upload.single('resume'),generatereport.generateinterviewreport)
router.get('/:id',authmiddleware,generatereport.getinterviewreportbyid)


module.exports = router