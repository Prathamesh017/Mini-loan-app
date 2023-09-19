import React from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
function PaymentForm({ setPaymentForm }) {
  const schema = yup.object().shape({
    payment: yup
      .number()
      .required('Salary is Required')
      .typeError('Salary must be a number'),
  })
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })
  function handlePayment() {}
  return (
    <>
      <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
        <div className="loan-form-background p-6 rounded-lg w-3/4 md:w-1/4">
          <h2 className="text-2xl mb-4">Payment</h2>
          <div className="bg-white form  mt-2 md:mt-5 p-1 md:p-2">
            <div className="mb-3">
              <label>Payment Amount</label>
              <br></br>
              <input
                type="number"
                placeholder="enter payment"
                className="w-full  p-1 mt-2  border border-yellow-600 "
                {...register('payment')}
              ></input>
              {errors.payment && (
                <p className="text-red-700">{errors.payment.message}</p>
              )}
            </div>
          </div>

          <div className="w-full  grid grid-cols-2 gap-x-2 ">
            <div className="mt-5">
              <button
                type="submit"
                className="bg-[#ffd700]  w-full border text-white hover:text-black p-1 md:p-2"
                onClick={handleSubmit(handlePayment)}
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
