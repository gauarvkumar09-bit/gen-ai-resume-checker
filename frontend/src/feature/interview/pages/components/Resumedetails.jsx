// import React from 'react'

import React, { useEffect } from 'react'
import Technicalquestion from './Technicalquestion'
import Skillgaps from './Skillgaps'
import PrepretionPlane from './PrepretionPlane'
import { useInterview } from '../../../interview/hooks/useInterview'
import { useParams } from 'react-router'
import Behavioralq from './Behavioralq'
const Resumedetails = () => {
    const { id } = useParams()                          // ✅ URL se id nikala
  const { getReportById, report, loading } = useInterview()

  useEffect(() => {
    if (id) {
      getReportById(id)                                // ✅ page load/refresh pe fetch
    }
  }, [id])

  if (loading) return <div>Loading...</div>
  if (!report) return <div>No data available</div> 
  return (
    <div className='flex flex-row'>
       <div className='w-screen h-full'>
        <h1 className='bg-red-800'>Technical Questions</h1>
        <Technicalquestion />
        <h1 className='bg-red-600'>Behavioral Questions</h1>
        <Behavioralq />
      <PrepretionPlane />
      
   </div>
        
        <div >
       <Skillgaps />
           
        </div>
    </div>
  )
}

export default Resumedetails