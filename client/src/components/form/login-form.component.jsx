import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
function Form() {
  let emailRegex = new RegExp('[a-z0-9]+@[a-z]+.[a-z]{2,3}')
  const schema = yup.object().shape({
    email: yup
      .string()
      .required('Email is required')
      .matches(emailRegex, 'Invalid Email'),
    password: yup
      .string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters long'),
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })
  function loginUser() {
    console.log('login')
  }
  function registerUser() {
    console.log('register')
  }
  function adminLogin(){
    console.log("admin")
  }

  return (
    <div className="form mt-5 p-2">
      <div className="mb-3">
        <label>Email</label>
        <br></br>
        <input
          type="email"
          placeholder="enter email"
          className="w-full mt-2 p-1  border border-yellow-600 "
          {...register('email')}
        ></input>
        {errors.email && <p className="text-red-700">{errors.email.message}</p>}
      </div>
      <div className="mb-3">
        <label>Password</label>
        <br></br>
        <input
          type="password"
          placeholder="enter password"
          className="w-full  p-1 mt-2  border border-yellow-600 "
          {...register('password')}
        ></input>
        {errors.password && (
          <p className="text-red-700">{errors.password.message}</p>
        )}
      </div>
      <div className="w-full  grid grid-cols-2 gap-x-2 ">
        <div className="mt-5">
          <button
            type="submit"
            className="bg-[#4285F4] w-full border hover:text-white  text-black p-1 md:p-2"
            onClick={handleSubmit(loginUser)}
          >
            Login
          </button>
        </div>
        <div className="mt-5 w-full">
          <button
            type="submit"
            className="bg-[#ffd700] w-full hover:text-white  text-black p-1 md:p-2"
            onClick={handleSubmit(registerUser)}
          >
            Register
          </button>
        </div>
      </div>
      <div className="mt-5">
          <button
            type="submit"
            className="bg-[#64B5F6] w-full border hover:text-white text-black p-1 md:p-2"
            onClick={handleSubmit(adminLogin)}
          >
            Admin Login
          </button>
        </div>
    </div>
  )
}

export default Form
