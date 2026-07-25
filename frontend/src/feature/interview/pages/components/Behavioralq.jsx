import React, { useState } from 'react'
import { useInterview } from '../../hooks/useInterview'
const Behavioralq = () => {
  const { report, loading } = useInterview()
    
        const [open, setopen] = useState(null)
         const toggleQuestion = (index) => {
    setopen(open === index ? null : index);
  };
    
   if (loading) return <div>Loading...</div>
    if (!report) return <div>No data available</div>

  return (
    <div>

        {report?.behavioralquestions?.map((item,index)=>(
            
            <div key={index} className='bg-amber-500 w-[80%]'
            onClick={()=>toggleQuestion(index)}
            >
              {/* <div className='w-screen h-10 bg-amber-600'>{index+1}</div>   */}
                <h3 className='bg-amber-800 mb-1'>{index + 1}. {item.question}</h3>
                { open === index && (
                    <div>
          <p><strong>Intention:</strong> {item.intention}</p>
          <p><strong>Answer:</strong> {item.answer}</p>
          </div>
              )  }
            </div>
            
        ))}
    </div>
    
  )
}

export default Behavioralq