import express from 'express'
import { createLoan, getAllLoans } from '../controller/loan.controller.js'
import verifyToken from '../middleware/middleware.js'
const loanRouter = express.Router()

loanRouter.post('/', verifyToken, createLoan).get('/', verifyToken, getAllLoans)

export default loanRouter
