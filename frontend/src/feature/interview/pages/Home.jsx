import React from 'react'
import Sidemenu from './components/Sidemenu'
import Job from './components/Job'
// import { InterviewProvider } from '../../../feature/interview/interview.context'

const Home = () => {
  return (
    <div className="flex w-full h-screen">
      {/* Side Menu */}
      <Sidemenu />

      {/* Main Content */}
      <div className="flex-1">
          {/* <InterviewProvider> */}
             <Job />
          {/* </InterviewProvider> */}
       
      </div>
    </div>
  )
}

export default Home
