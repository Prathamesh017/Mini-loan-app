import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
function LoanForm({ setLoan }) {
  const schema = yup.object().shape({
    employment: yup.string().required('Employment Status is required'),
    term: yup.number().required('Loan Term is required'),
    amount: yup
      .number()
      .required('Amount is Required')
      .typeError('Amount must be a number')
      .min(1000),

      salary: yup
      .number()
      .required('Salary is Required')
      .typeError('Salary must be a number')
      
  })

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })
  function requestLoan() {
    console.log('login')
  }

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="loan-form-background p-6 rounded-lg w-3/4 md:w-1/4 border border-red-700">
      {/* Loan Form */}
        <h2 className="text-2xl mb-4">Loan Form</h2>
        <div className="bg-white form  mt-2 md:mt-5 p-1 md:p-2">
        {/* Employment Status */}
          <div className="mb-3">
            <label>Employement Status</label>
            <br></br>
            <div className="flex text-sm flex-col items-start text-slate-700">
              <select
                {...register('employment')}
                onChange={(e) =>
                  setValue('employment', e.target.value, {
                    shouldValidate: true,
                  })
                }
                className="border border-black-700 w-full p-2"
              >
                {['Employed', 'UnEmployed,', 'Self-Employed'].map(
                  (job, index) => {
                    return (
                      <option
                        className="text-slate-700"
                        value={job}
                        key={index}
                      >
                        {job}
                      </option>
                    )
                  },
                )}
              </select>
              {errors.employment && (
                <p className="text-red-700">{errors.employment.message}</p>
              )}
            </div>
          </div>
          {/* Salary Amount */}
          <div className="mb-3">
            <label>Monthly Salary</label>
            <br></br>
            <input
              type="number"
              placeholder="enter amount"
              className="w-full  p-1 mt-2  border border-yellow-600 "
              {...register('salary')}
            ></input>
            <div className="flex text-sm flex-col items-start text-slate-700">
              {errors.salary && (
                <p className="text-red-700">{errors.salary.message}</p>
              )}
            </div>
          </div>
          {/* Loan Term */}
          <div className="mb-3">
            <label>Loan Term (number of weeks)</label>
            <br></br>
            <div className="flex text-sm flex-col items-start text-slate-700">
              <select
                {...register('term')}
                onChange={(e) =>
                  setValue('term', e.target.value, {
                    shouldValidate: true,
                  })
                }
                className="border border-black-700 w-full p-2"
              >
                {[3, 6, 9, 12].map((job, index) => {
                  return (
                    <option className="text-slate-700" value={job} key={index}>
                      {job}
                    </option>
                  )
                })}
              </select>
              {errors.term && (
                <p className="text-red-700">{errors.term.message}</p>
              )}
            </div>
          </div>
          {/* Loan Amount */}
          <div className="mb-3">
            <label>Loan Amount</label>
            <br></br>
            <input
              type="number"
              placeholder="enter amount"
              className="w-full  p-1 mt-2  border border-yellow-600 "
              {...register('amount')}
            ></input>
            <div className="flex text-sm flex-col items-start text-slate-700">
              {errors.amount && (
                <p className="text-red-700">{errors.amount.message}</p>
              )}
            </div>
          </div>
          
          <div className="w-full  grid grid-cols-2 gap-x-2 ">
            <div className="mt-5">
              <button
                type="submit"
                className="bg-[#ffd700]  w-full border text-white hover:text-black p-1 md:p-2"
                onClick={handleSubmit(requestLoan)}
              >
                Submit
              </button>
            </div>
            <div className="mt-5 w-full">
              <button
                className="bg-[#4285F4] w-full border text-white hover:text-black p-1 md:p-2"
                onClick={() => {
                  setLoan(false)
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoanForm
