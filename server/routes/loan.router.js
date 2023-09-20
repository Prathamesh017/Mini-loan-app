import express from 'express'
import { createLoan, getAllLoans,addPayment } from '../controller/loan.controller.js'
import verifyToken from '../middleware/middleware.js'
const loanRouter = express.Router()

loanRouter.post('/', verifyToken, createLoan).get('/', verifyToken, getAllLoans).post("/payment",verifyToken,addPayment )

export default loanRouter
