import React from 'react'
import { RouterProvider } from 'react-router'
import { router } from './app.router.jsx'
import { Authprovider } from './feature/auth/services/auth.contex.jsx'
import { InterviewProvider } from './feature/interview/interview.context.jsx'

const App = () => {
  return (
    <Authprovider>
      <InterviewProvider>
        <RouterProvider router={router} />
      </InterviewProvider>
    </Authprovider>
  )
}

export default App
