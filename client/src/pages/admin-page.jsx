import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import useAdmin from '../hooks/useAdmin'
import LoanApprovalComponent from '../components/loan-approval-component'
function AdminPage() {
  const { adminLoans, getAllLoansAdmin } = useAdmin()
  const [fetchData, setFetchData] = useState(false)
  const navigate = useNavigate()
  async function getLoans() {
    await getAllLoansAdmin()
  }
  useEffect(() => {
    getLoans()
  }, [fetchData])
  console.log(adminLoans)
  return (
    <div className="w-full h-screen default-background p-4">
      <div className="w-full flex justify-between">
        <h1 className="text-2xl text-[#4285F4]">Admin Panel</h1>
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

      <LoanApprovalComponent
        loans={adminLoans}
        setFetchData={setFetchData}
      ></LoanApprovalComponent>
    </div>
  )
}

export default AdminPage
