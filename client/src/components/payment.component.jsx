import React from 'react'
import { useState } from 'react'
import PaymentForm from './form/payment-form.component'

function PaymentComponent() {
  const [showPaymentForm, setPaymentForm] = useState(false)
  return (
    <div className="w-full   mt-10 mx-auto p-4">
      <div className="grid  md:grid-cols-3">
        <div className="bg-white p-4 shadow-md text-blue-900  rounded-lg">
          <div className="w-full">
            <h1>Loan No :{1233}</h1>
          </div>
          <div className="mt-5">
            <p>
              You have taken a loan of ₹10,000, and the status of Loan No. 1233
              is currently pending
            </p>
          </div>
          <div className="w-full mt-5 flex justify-between ">
            <p>Repayment Completed 0/3 </p>
            <p>Payment Status Completed </p>
          </div>
          <div className='mt-2'>
           <p>Payment Paid:0</p>
          </div>
          <div className="mt-4">
            <button
              type="submit"
              className="bg-[#4285F4] w-full border text-white hover:text-black p-1 md:p-2"
              onClick={() => {
                setPaymentForm(true)
              }}
            >
              Pay
            </button>
          </div>
        </div>
      </div>
      {showPaymentForm && <PaymentForm setPaymentForm={setPaymentForm}></PaymentForm>}
    </div>
  )
}

export default PaymentComponent
