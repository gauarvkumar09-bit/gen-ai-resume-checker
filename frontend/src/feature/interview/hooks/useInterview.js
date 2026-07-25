import {generateInterviewReport,getinterviewreportbyid} from  '../services/interview.api'
import { useContext } from "react";

import {InterviewContext} from '../../../../src/feature/interview/interview.context'

export const useInterview =()=>{

    const context = useContext(InterviewContext)


    if(!context) {
        throw new Error('useInterview must be used within a InterviewProvider')
    }
    const {loading,setloading,report,setreport,reports,setreports} = context


    const generateReport = async ({jobdescription, selfdescription, resume}) => {
    setloading(true)
    let responce = null
    try{
        responce = await generateInterviewReport({jobdescription, selfdescription, resume})
        
        console.log("RAW RESPONSE:", responce)              // 👈 ye add karo
        console.log("responce.interviewReport:", responce.interviewReport)  // 👈 ye bhi
        
        setreport(responce.interviewReport)
    }catch(err){
        console.log("ERROR:", err)
    }finally{
        setloading(false)
    }
    return responce?.interviewReport
}

    const getReportById = async(interviewId)=>{
        setloading(true)
        let responce = null
        try{
        //  responce = await getinterviewreportbyid(interviewId)
            responce = await getinterviewreportbyid(interviewId)
            setreport(responce.interviewReport)
        }catch(err){
            console.log(err)
        }finally{
            setloading(false)
        }
        return responce.interviewReport
    }

// const getReports = async ()=>{
//     setloading(true)
//     let responce = null
//     try{
//         const responce = await getAllInterviewReports()
//         setreports(responce.interviewReport)
//     }catch(err){
//         console.log(err)
//     }finally{
//         setloading(false)
//     }
//     return responce.interviewReport
// }

return {loading,report,reports,generateReport,getReportById}

}