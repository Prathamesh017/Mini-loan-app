import axios from 'axios'
import { useState } from 'react'
const url = 'http://localhost:4000'
function useLoan() {
  const [loans, setLoans] = useState([])
  const createLoan = async (data) => {
    try {
      const bearerToken = JSON.parse(localStorage.getItem('token'))
      await axios.post(`${url}/v1/loan`, data, {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
      })

      
      const updatedLoans = await getAllLoans()
      setLoans(updatedLoans)
      return
    } catch (error) {
      console.log(error)
    }
  }
  const getAllLoans = async () => {
    try {
      const bearerToken = JSON.parse(localStorage.getItem('token'))
      const userData = await axios.get(`${url}/v1/loan`, {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
      })
      setLoans(userData.data.data)
      return userData.data.data
    } catch (error) {
      console.log(error)
    }
  }

  return {
    loans,
    createLoan,
    getAllLoans,
  }
}

export default useLoan
