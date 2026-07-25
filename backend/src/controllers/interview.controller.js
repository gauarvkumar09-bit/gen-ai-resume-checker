
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
        user: req.user._id,
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
        interviewReport: interviewreport,   //  poora saved doc bhejo, taaki _id bhi mile
        _id: interviewreport._id             // h asli MongoDB _id
    })
}

async function getinterviewreportbyid(req, res) {
    // console.log("Backend exactly received:", req.params.id, " | Type:", typeof req.params.id);
    try {
        const { id } = req.params
        //   console.log("req.user:", req.user)
    const cleanId = id.replace(/[{}]/g, '');

        const interviewreport = await interviewmodel.findById(cleanId)
            //    console.log("interviewreport.user:", interviewreport?.user)  

    

        if (!interviewreport) {
            return res.status(404).json({ message: "Interview report not found" })
        }

      
        // sirf apna hi report dekh sake, dusre ka nahi
      if (interviewreport.user.toString() !== req.user._id.toString()) {   
            return res.status(403).json({ message: "Not authorized to view this report" })
        }

        res.status(200).json({
            message: "Interview report fetched successfully",
            interviewReport: interviewreport
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Something went wrong", error: err.message })
    }
}


module.exports = { generateinterviewreport ,getinterviewreportbyid}