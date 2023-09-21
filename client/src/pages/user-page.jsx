import React, { useEffect } from 'react'
import LoanForm from '../components/form/loan-form.component'
import { useState } from 'react'
import LoanComponent from '../components/loan/loan-request.component'
import useLoan from '../hooks/useLoan'
import { useNavigate } from 'react-router-dom'

function UserPage() {
  const [showLoan, showSetLoan] = useState(false)
  const [fetchData, setFetchData] = useState(false)
  const navigate = useNavigate()
  const { loans, getAllLoans } = useLoan()
  async function getLoans() {
    await getAllLoans()
  }
  useEffect(() => {
    getLoans()
  }, [fetchData])
  
  return (
    <div className="user-page-container w-full h-screen default-background">
      <div className="header-container w-full p-4 flex justify-between">
        <h1 className="text-2xl text-[#4285F4]">Cash Wave</h1>
        <div>
          <button
            onClick={() => {
              showSetLoan(true)
            }}
            className="bg-[#4285F4]  border text-white rounded-md hover:text-black p-1 md:p-2"
          >
            Request A Loan
          </button>
          <button
            onClick={() => {
              localStorage.clear()
              navigate('/')
            }}
            className="bg-[#ffd700]  border text-white rounded-md hover:text-black p-1 md:p-2"
          >
            Logout
          </button>
        </div>
      </div>
      {showLoan && (
        <LoanForm setLoan={showSetLoan} setFetchData={setFetchData}></LoanForm>
      )}
      <LoanComponent loans={loans} setFetchData={setFetchData}></LoanComponent>
    </div>
  )
}

export default UserPage
