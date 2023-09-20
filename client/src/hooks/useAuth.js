import axios from 'axios'
import { useState } from 'react'
const url = 'http://localhost:4000'
function useAuth() {
  const [operations, setOperations] = useState({
    isLoading: false,
    isError: false,
    isCompleted: false,
  })
  const loginUser = async (data) => {
    try {
      const userData = await axios.post(`${url}/v1/auth/login`, data)
      handleOperations('isCompleted',true)
      return userData.data
    } catch (error) {
      handleOperations('isError',true)
      return error.response.data
    }
  }
  const registerUser = async (data) => {
    try {
      const userData = await axios.post(`${url}/v1/auth/register`, data)
      setOperations((operation) => ({ ...operation, isCompleted: true }))
      return userData.data
    } catch (error) {
      setOperations((operation) => ({ ...operation, isError: true }))
      return error.response.data
    }
  }
  const adminLogin = async () => {
    console.log('admin')
  }

  const handleOperations=(operationName,isOperation)=>{
    const newOperations={ ...operations, [operationName]: isOperation }
    setOperations(newOperations)
  }
  const getOperations=()=>{
    return operations;
  }

  return {
    loginUser,
    registerUser,
    adminLogin,
    handleOperations,
    getOperations
  }
}

export default useAuth
