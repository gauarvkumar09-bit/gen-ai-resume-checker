const { GoogleGenAI }= require('@google/genai');
const { z } = require('zod');
// const { zodToJsonSchema } = require('zod-to-json-schema');

const ai = new GoogleGenAI({
    apiKey:process.env.GOOGLE_GENAI_API
});



const interviewReportSchema = z.object({
    matchScore: z.number(),
    // .describe("A score between 0 and 100 indicating how well the candidate's profile matches the job describe"),
    technicalQuestions: z.array(z.object({
        question: z.string(),
        // .describe("The technical question can be asked in the interview"),
        intention: z.string(),
        // .describe("The intention of interviewer behind asking this question"),
        answer: z.string(),
        // .describe("How to answer this question, what points to cover, what approach to take etc.")
    })),
    // .describe("Technical questions that can be asked in the interview along with their intention and how to answer them"),
    behavioralQuestions: z.array(z.object({
        question: z.string(),
        // .describe("The technical question can be asked in the interview"),
        intention: z.string(),
        // .describe("The intention of interviewer behind asking this question"),
        answer: z.string().describe("How to answer this question, what points to cover, what approach to take etc.")
    })),
    // .describe("Behavioral questions that can be asked in the interview along with their intention and how to answer them"),
    skillGaps: z.array(z.object({
        skill: z.string(),
        // .describe("The skill which the candidate is lacking"),
        severity: z.enum([ "low", "medium", "high" ]).describe("The severity of this skill gap, i.e. how important is this skill for the job and how much it can impact the candidate's chances")
    })) ,
    // .describe("List of skill gaps in the candidate's profile along with their severity"),
    preparationPlan: z.array(z.object({
        day: z.number(),
        // .describe("The day number in the preparation plan, starting from 1"),
        focus: z.string(),
        // .describe("The main focus of this day in the preparation plan, e.g. data structures, system design, mock interviews etc."),
        tasks: z.array(z.string()),
        // .describe("List of tasks to be done on this day to follow the preparation plan, e.g. read a specific book or article, solve a set of problems, watch a video etc.")
    })),
    // .describe("A day-wise preparation plan for the candidate to follow in order to prepare for the interview effectively"),
    title: z.string(),
    // .describe("The title of the job for which the interview report is generated "),
})

const geminiSchema = {
    type: "OBJECT",
    properties: {
        matchScore: {
            type: "NUMBER",
            description: "Score between 0-100 indicating candidate-job match"
        },
        title: {
            type: "STRING",
            description: "Job title for which this report is generated"
        },
        technicalQuestions: {
            type: "ARRAY",
            description: "Technical questions for the interview",
            items: {
                type: "OBJECT",
                properties: {
                    question: { type: "STRING" },
                    intention: { type: "STRING" },
                    answer: { type: "STRING" }
                },
                required: ["question", "intention", "answer"]
            }
        },
        behavioralQuestions: {
            type: "ARRAY",
            description: "Behavioral questions for the interview",
            items: {
                type: "OBJECT",
                properties: {
                    question: { type: "STRING" },
                    intention: { type: "STRING" },
                    answer: { type: "STRING" }
                },
                required: ["question", "intention", "answer"]
            }
        },
        skillGaps: {
            type: "ARRAY",
            description: "Skill gaps in candidate profile",
            items: {
                type: "OBJECT",
                properties: {
                    skill: { type: "STRING" },
                    severity: {
                        type: "STRING",
                        enum: ["low", "medium", "high"]
                    }
                },
                required: ["skill", "severity"]
            }
        },
        preparationPlan: {
            type: "ARRAY",
            description: "Day-wise preparation plan",
            items: {
                type: "OBJECT",
                properties: {
                    day: { type: "NUMBER" },
                    focus: { type: "STRING" },
                    tasks: {
                        type: "ARRAY",
                        items: { type: "STRING" }
                    }
                },
                required: ["day", "focus", "tasks"]
            }
        }
    },
    required: ["matchScore", "title", "technicalQuestions", "behavioralQuestions", "skillGaps", "preparationPlan"]
};


async function generateInterviewReport({ resume, selfdescription, jobdescription }) {


    const prompt = `Generate an interview report for a candidate with the following details: in json
                        Resume: ${resume}
                        Self Description: ${selfdescription}
                        Job Description: ${jobdescription}

`

    const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    config: {
        responseMimeType: "application/json",
        responseSchema: geminiSchema,
    },
});
   const parsed = JSON.parse(response.text);
    const report = interviewReportSchema.parse(parsed); // Zod se validate
    return report;


}



module.exports=generateInterviewReport