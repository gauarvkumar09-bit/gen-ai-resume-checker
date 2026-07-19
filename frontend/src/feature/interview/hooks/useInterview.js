import {generateInterviewReport,getinterviewreportbyid} from  '../services/interview.api'
import { useContext } from "react";

import {InterviewContext} from '../../../../src/feature/interview/interview.context'

export const useInterview =()=>{

    const context = useContext(InterviewContext)


    if(!context) {
        throw new Error('useInterview must be used within a InterviewProvider')
    }
    const {loading,setloading,report,setreport,reports,setreports} = context


    const generateReport = async ({jobdescription,selfdescription,resume}) =>{
     setloading(true)
     let responce = null
     try{
        responce = await generateInterviewReport({jobdescription,selfdescription,resume})
        setreport(responce.interviewReport)
     }catch(err){
         console.log(err)
     }finally{
        setloading(false)
     }

     return responce.interviewReport
    }

    const getReportById = async(interviewId)=>{
        setloading(true)
        let responce = null
        try{
         responce = await getInterviewReportById(interviewId)
            setreport(responce.interviewReport)
        }catch(err){
            console.log(err)
        }finally{
            setloading(false)
        }
        return responce.interviewReport
    }

const getReports = async ()=>{
    setloading(true)
    let responce = null
    try{
        const responce = await getAllInterviewReports()
        setreposts(responce.interviewReport)
    }catch(err){
        console.log(err)
    }finally{
        setloading(false)
    }
    return responce.interviewReport
}

return {loading,report,reports,generateReport,getReportById,getReports}

}