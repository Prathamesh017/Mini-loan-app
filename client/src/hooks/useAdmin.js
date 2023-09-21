import axios from 'axios'
import { useState } from 'react'
const url = 'https://mini-loan-server.onrender.com'
function useAdmin() {
  const [adminLoans, setAdminLoans] = useState([])
  const getAllLoansAdmin = async () => {
    try {
      try {
        const bearerToken = JSON.parse(localStorage.getItem('token'))
        const userData = await axios.get(`${url}/v1/loan/admin`, {
          headers: {
            Authorization: `Bearer ${bearerToken}`,
          },
        })
        setAdminLoans(userData.data.data)
        return userData.data.data
      } catch (error) {
        console.log(error)
      }
    } catch (error) {
      
    }
  }


  const approveLoan = async (data) => {
    try {
      const bearerToken = JSON.parse(localStorage.getItem('token'))
      await axios.post(`${url}/v1/loan/admin/approval`, data, {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
      })

    
      return
    } catch (error) {
      console.log(error)
    }
  }
 

  return {
    getAllLoansAdmin,
    adminLoans,
    approveLoan
  }
}

export default useAdmin
