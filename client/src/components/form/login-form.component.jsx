import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import useAuth from '../../hooks/useAuth.js'
import { useState } from 'react'
import Loading from '../loading-spinner.jsx'
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
  
  const { loginUser, adminLogin, registerUser,handleOperations,getOperations} = useAuth()
  const operations=getOperations();
  const [userData, setUserData] = useState({})

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

 

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
          onChange={()=>setUserData(null)}
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
          onChange={()=>setUserData(null)}
        ></input>
        {errors.password && (
          <p className="text-red-700">{errors.password.message}</p>
        )}
      </div>
      <p
        className={`${
          userData?.status === 'success' ? 'text-green-700' : 'text-red-700'
        }`}
      >
        {userData && userData.message}
      </p>
      <div className="w-full  grid grid-cols-2 gap-x-2 ">
        <div className="mt-5">
          <button
            type="submit"
            className="bg-[#4285F4] w-full border hover:text-white  text-black p-1 md:p-2"
            onClick={handleSubmit(async (data) => {
              handleOperations("isLoading",true)
              const userData = await loginUser(data)
              setUserData(userData)
              handleOperations("isLoading",false)
            })}
          >
            Login
          </button>
        </div>
        <div className="mt-5 w-full">
          <button
            type="submit"
            className="bg-[#ffd700] w-full hover:text-white  text-black p-1 md:p-2"
            onClick={handleSubmit(async (data) => {
              handleOperations("isLoading",true)
              const userData = await registerUser(data)
              setUserData(userData)
              handleOperations("isLoading",false)
            })}
          >
            Register
          </button>
        </div>
      </div>
      <div className="mt-5">
        <button
          type="submit"
          className="bg-[#64B5F6] w-full border hover:text-white text-black p-1 md:p-2"
          onClick={handleSubmit(async (data) => {
            adminLogin(data)
          })}
        >
          Admin Login
        </button>
        <div className="text-center mt-4">
          {operations.isLoading && <Loading></Loading>}
        </div>
      </div>
    </div>
  )
}

export default Form
