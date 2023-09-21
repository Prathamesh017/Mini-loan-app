import React from 'react'
import useAdmin from '../../hooks/useAdmin'

function LoanApprovalComponent({ loans, setFetchData }) {
  const { approveLoan } = useAdmin()

  async function handleApproval(userId, loanId, loan_status) {
    let data = { userId, loanId, loan_status }
    await approveLoan(data)
    setFetchData((val) => !val)
  }
  return (
    <div className="w-full   mt-10 mx-auto p-4">
      <div className="grid  md:grid-cols-3 gap-4">
        {loans && loans.length === 0 ? (
          <p className="text-xl text-blue-700">
            No Loans Taken Till Now TO Approve
          </p>
        ) : (
          loans.map((loan, index) => {
            return (
              <div
                className="bg-white p-4 shadow-md text-blue-900  rounded-lg"
                key={index}
              >
                <div className="w-full">
                  <h1>Loan No :{loan.loanId}</h1>
                </div>
                <div className="mt-5">
                  <h2>Loan Details</h2>
                  <p>Employment Status of User :{loan.employment}</p>
                  <p>Loan Status of User :{loan.loan_status}</p>
                  <p>Salary of User:{loan.salary}</p>
                  <p>Loan Amount:{loan.amount}</p>
                </div>
                <div className="w-full mt-5 flex justify-between ">
                  <button
                    type="submit"
                    className="bg-[#4285F4] w-full border text-white hover:text-black p-1 md:p-2"
                    disabled={loan.loan_status === 'Pending' ? false : true}
                    onClick={() =>
                      handleApproval(loan.userId, loan.loanId, 'Approved')
                    }
                  >
                    Approve
                  </button>
                  <button
                    type="submit"
                    className="bg-[#dc2626] w-full border text-white hover:text-black p-1 md:p-2"
                    disabled={loan.loan_status === 'Pending' ? false : true}
                    onClick={() =>
                      handleApproval(loan.userId, loan.loanId, 'Rejected')
                    }
                  >
                    Reject
                  </button>
                </div>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}

export default LoanApprovalComponent
