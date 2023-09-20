import React from 'react'
import { useState } from 'react'
import PaymentForm from './form/payment-form.component'

function LoanComponent({ loans }) {
  const [showPaymentForm, setPaymentForm] = useState(false)
  const [selectedLoan, setSelectedLoan] = useState(null)

  return (
    <div className="w-full   mt-10 mx-auto p-4">
      <div className="grid  md:grid-cols-3 gap-4">
        {loans && loans.length === 0 ? (
          <p className="text-xl text-blue-700">No Loan Taken</p>
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
                  <p>
                    You have taken a loan of ₹{loan.amount}, and the status of
                    Loan No.
                    {loan.loanId} is currently {loan.loan_status}
                  </p>
                </div>
                <div className="w-full mt-5 flex justify-between ">
                  <p>
                    Repayment Completed: {loan.payment_terms_paid}/{loan.terms}{' '}
                  </p>
                  <p>Payment Status:{loan.payment_status} </p>
                </div>
                <div className="mt-2">
                  <p>Payment Paid:{loan.payment_amount_paid}</p>
                </div>
                <div className="mt-4">
                  <button
                    type="submit"
                    className="bg-[#4285F4] w-full border text-white hover:text-black p-1 md:p-2"
                    //!TODO add Pending
                    disabled={
                      loan.payment_status === 'Paid' ||
                      !loan.loan_status === 'Pending'
                        ? true
                        : false
                    }
                    onClick={() => {
                      setSelectedLoan(loan)
                      setPaymentForm(true)
                    }}
                  >
                    Pay
                  </button>
                </div>
              </div>
            )
          })
        )}
        {showPaymentForm && (
          <PaymentForm
            loan={selectedLoan}
            setPaymentForm={setPaymentForm}
          ></PaymentForm>
        )}
      </div>
    </div>
  )
}

export default LoanComponent
