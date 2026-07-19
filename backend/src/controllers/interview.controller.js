
const pdfParse = require('pdf-parse');
const generatereport = require('../services/ai.services')
const interviewmodel = require('../model/interviewreport.model')


async function generateinterviewreport(req, res) {
    const resumecontent = await (new pdfParse.PDFParse(Uint8Array.from(req.file.buffer))).getText()
    const { selfdescription, jobdescription } = req.body

    const interviewreportbyai = await generatereport({
        resume: resumecontent.text,
        selfdescription,
        jobdescription
    })

    const interviewreport = await interviewmodel.create({
        user: req.user.id,
        resume: resumecontent.text,
        selfdescription,
        jobdescription,
        matchScore: interviewreportbyai.matchScore,
        technicalquestions: interviewreportbyai.technicalQuestions,
        behavioralquestions: interviewreportbyai.behavioralQuestions,
        skillgaps: interviewreportbyai.skillGaps,
        preprationplane: interviewreportbyai.preparationPlan,
    })

    res.status(201).json({
        message: "interview report generated successfully",
        interviewReport: interviewreport,   // 👈 poora saved doc bhejo, taaki _id bhi mile
        _id: interviewreport._id             // 👈 Date.now() ki jagah asli MongoDB _id
    })
}

module.exports = { generateinterviewreport }