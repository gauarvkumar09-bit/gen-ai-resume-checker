const mongoose = require('mongoose')


const technicalquestionsSchema = new mongoose.Schema({
    question:{
        type:String,
        required:[true,'techinal question is required']
    },
     intention:{
        type:String,
        required:[true,'intention is required']
    },
     answer:{
        type:String,
        required:[true,'answer is required']
    },
},{
    _id:false
})

const behavioralquestionsSchema = new mongoose.Schema({
    question:{
        type:String,
        required:[true,'techinal question is required']
    },
     intention:{
        type:String,
        required:[true,'intention is required']
    },
     answer:{
        type:String,
        required:[true,'answer is required']
    },
},{
    _id:false
})

const skillgapsSchema = new mongoose.Schema({
    skill:{
        type:String,
        required:[true,'skill must be required']
    },
    severity:{
        type:String,
        enum:['low','medium','high'],
        required:[true,'severity must be reqired']
    }
},{
    _id:false
})

const preprationplaneSchema = new mongoose.Schema({
    day:{
        type:Number,
        required:[true,'day is required']
    },
    focus:{
        type:String,
        required:[true,'focus is rwqyired']
    },
    tasks:[{
        type:String,
        required:[true,'task is required']
    }]
})

const interviewreportSchema = new mongoose.Schema({
    jobdescription:{
        type:String,
        required:[true,'jobdescription must be given']
    },
    resume:{
        type:String,

    },
    selfdescription:{
        type:String,

    },
    matchScore:{
        type:Number,
        min:0,
        max:100
    },
    technicalquestions:[technicalquestionsSchema],
    behavioralquestions:[behavioralquestionsSchema],
    skillgaps:[skillgapsSchema],
    preprationplane:[preprationplaneSchema],
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    }

},{
    timestamps:true
}

)

const interviewreportmodel = mongoose.model('interviewreport',interviewreportSchema)

module.exports= interviewreportmodel;