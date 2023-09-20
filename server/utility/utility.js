import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import loanModel from '../models/loan.schema.js'
// @description - to hash and secure password
export const hashPassword = async (password) => {
  try {
    let saltRounds = 10
    let hash = await bcrypt.genSalt(saltRounds)
    let hashedPassword = await bcrypt.hash(password, hash)
    return hashedPassword
  } catch (e) {
    console.log(e)
  }
}
// @description - to decrypt and match password
export const validatePassword = async (password, userPassword) => {
  try {
    let isPasswordCorrect = await bcrypt.compare(password, userPassword)

    return isPasswordCorrect ? true : false
  } catch (error) {
    console.log(error)
  }
}
// @description - to generate token for authorization
export const generateToken = async (id) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '2h',
  })

  return token
}
export const generateLoanId = async (userId) => {
  try {
    const orders = (await loanModel.find({ userId })).length + 1
    const paddedCounter = String(orders).padStart(4, '0')
    return `Loan-${paddedCounter}`
  } catch (error) {
    throw new Error(error)
  }
}
