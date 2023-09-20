import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import useLoan from '../../hooks/useLoan'
function PaymentForm({ setPaymentForm, loan }) {
  const schema = yup.object().shape({
    terms: yup.number().required('Terms are is Required'),
  })
  function handleRepaymentsTerms(terms) {
    let repayment = []
    for (let i = 1; i <= terms; i++) {
      repayment.push(i)
    }
    return repayment
  }
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const [termSelected, setTermSelected] = useState(1)
  const termsArray = handleRepaymentsTerms(loan.terms-loan.payment_terms_paid)
  const { updatePayment } = useLoan()
  

  return (
    <>
      <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
        <div className="loan-form-background p-6 rounded-lg w-3/4 md:w-1/4">
          <h2 className="text-2xl mb-4">Payment</h2>
          <div className="bg-white form  mt-2 md:mt-5 p-1 md:p-2">
            <div className="mb-3">
              <label>Payment Amount Terms</label>
              <br></br>
              <select
                {...register('terms')}
                onChange={(e) => {
                  setTermSelected(e.target.value)
                  setValue('terms', e.target.value, {
                    shouldValidate: true,
                  })
                }}
                className="border border-black-700 w-full p-2"
              >
                {termsArray.map((value, index) => {
                  return (
                    <option
                      className="text-slate-700"
                      value={value}
                      key={index}
                    >
                      {value}
                    </option>
                  )
                })}
              </select>
              {errors.terms && (
                <p className="text-red-700">{errors.terms.message}</p>
              )}
            </div>
            <div className="mb-3">
              <label>Amount Paid</label>
              <br></br>
              <p>{Math.round((loan.amount / loan.terms) * termSelected)}</p>
            </div>
          </div>

          <div className="w-full  grid grid-cols-2 gap-x-2 ">
            <div className="mt-5">
              <button
                type="submit"
                className="bg-[#ffd700]  w-full border text-white hover:text-black p-1 md:p-2"
                onClick={handleSubmit(async (data) => {
                  
                  let userData = {
                    payment_terms: loan.payment_terms_paid+data.terms,
                    payment_amount:Math.round((loan.amount / loan.terms) * termSelected),
                    loanId: loan.loanId,
                    userId: loan.userId,
                  }
                  await updatePayment(userData)
                })}
              >
                Submit
              </button>
            </div>
            <div className="mt-5 w-full">
              <button
                className="bg-[#4285F4] w-full border text-white hover:text-black p-1 md:p-2"
                onClick={() => {
                  setPaymentForm(false)
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default PaymentForm
