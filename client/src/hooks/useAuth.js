import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
const url = 'http://localhost:4000'
function useAuth() {
  const [operations, setOperations] = useState({
    isLoading: false,
    isError: false,
    isCompleted: false,
  })
  const navigate = useNavigate()
  const loginUser = async (data) => {
    try {
      const userData = await axios.post(`${url}/v1/auth/login`, data)
      handleOperations('isCompleted', true)
      handleLocalStorage(userData.data.data.access_token)
      
      navigateTo('user')
      return userData.data
    } catch (error) {
      handleOperations('isError', true)
      return error.response.data
    }
  }
  const registerUser = async (data) => {
    try {
      const userData = await axios.post(`${url}/v1/auth/register`, data)
      handleOperations('isCompleted', true)
      handleLocalStorage(userData.data.data.access_token)
      navigateTo('user')
      return userData.data
    } catch (error) {
      handleOperations('isError', true)
      return error.response.data
    }
  }
  const adminLogin = async (data) => {
    try {
      const userData = await axios.post(`${url}/v1/auth/admin`, data)
      handleOperations('isCompleted', true)
      navigateTo('admin')
      handleLocalStorage(userData.data.data.access_token)
      return userData.data
    } catch (error) {
      handleOperations('isError', true)
      return error.response.data
    }
  }

  const navigateTo = async (endpoint) => {
    setTimeout(() => {
      navigate(`/${endpoint}`)
    }, 3000)
  }

  const handleOperations = (operationName, isOperation) => {
    const newOperations = { ...operations, [operationName]: isOperation }
    setOperations(newOperations)
  }
  const getOperations = () => {
    return operations
  }
  const handleLocalStorage = (token) => {
    localStorage.setItem('token', JSON.stringify(token))
  }

  return {
    loginUser,
    registerUser,
    adminLogin,
    handleOperations,
    getOperations,
    navigateTo,
  }
}

export default useAuth
