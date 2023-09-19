import React from 'react'
import LoanForm from '../components/form/loan-form.component'
import { useState } from 'react'
import LoanComponent from '../components/payment.component'

function UserPage() {
  const [showLoan, setLoan] = useState(false)
 


  return (
    <div className="user-page-container w-full h-screen default-background">
      <div className="header-container w-full p-4 flex justify-between">
        <h1 className="text-2xl text-[#4285F4]">Cash Wave</h1>
        <button
          onClick={() => {
            setLoan(true)
          }}
          className="bg-[#4285F4]  border text-white rounded-md hover:text-black p-1 md:p-2"
        >
          Request A Loan
        </button>
      </div>
      {showLoan && <LoanForm setLoan={setLoan}></LoanForm>}
      <LoanComponent></LoanComponent>
    </div>
  )
}

export default UserPage
