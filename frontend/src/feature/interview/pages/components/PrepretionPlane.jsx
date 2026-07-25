import React, { useState } from 'react'
import { useInterview } from '../../hooks/useInterview'

const PrepretionPlane = () => {
    const { report, loading } = useInterview()
    const [open, setopen] = useState(null)

    const tougle = (index) => {
        setopen(open === index ? null : index)
    }

    if (loading) return <div>Loading...</div>
    if (!report) return <div>No data available</div>

    return (
        <div>
            <div>preprationplane</div>

            {report.preprationplane?.map((items, index) => (   // ✅ report.preprationplane
                <div key={index} onClick={() => tougle(index)}>
                    <h1 className='bg-blue-300'>Day {items.day}</h1>

                    {open === index && (
                        <div>
                            <h1 className='bg-blue-500'>{items.focus}</h1>
                            <h1 className='bg-blue-700'>{items.tasks}</h1>
                        </div>
                    )}
                </div>
            ))}
        </div>
    )
}

export default PrepretionPlane