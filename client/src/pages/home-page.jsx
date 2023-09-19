import React from 'react'
import Form from '../components/form/login-form.component'


function HomePage() {
  return (
    <div className="w-full  flex justify-center h-screen  default-background">
      <div className="form-container w-full mt-24 md:w-1/3 ">
        <h1 className="text-center  text-xl lg:text-4xl">
          Welcome to <span className="text-[#4285F4]"> Cash Wave</span>
        </h1>
        <p className="text-center text-[#1967D2]">
          Ride the Financial Tide with CashWave
        </p>
        <Form></Form>
      </div>
     
    </div>
  )
}

export default HomePage
