import React from 'react'
import { useInterview } from '../../hooks/useInterview'
// import PieChart from './Piechart'

const Skillgaps = () => {
    const { report, loading } = useInterview()
    // console.log("REPORT:", report) 

    // ✅ Loading ya data na hone pe crash mat hone do
    if (loading) return <div>Loading...</div>
    if (!report) return <div>No data available</div>

    return (
        <div className='bg-[#ac2c2c] w-[20%]  absolute right-0'>
            <div className='bg-black h-60 w-full'>
                {/* <PieChart /> */}
            </div>

            {report.skillgaps?.map((item, index) => (
                <div key={index} className='bg-[#fb0303]  w-full flex flex-col justify-center items-center'>
                    <h1 className='bg-blue-800'>{item.skill}</h1>
                    <h1 className='bg-blue-300'>{item.severity}</h1>
                </div>
            ))}
        </div>
    )
}

export default Skillgaps