import loanModel from '../models/loan.schema.js'
import { generateLoanId } from '../utility/utility.js'
import { loanValidation, paymentValidation } from '../validators/validators.js'

// @api - v1/loan/ POST
// @desc - create user
export const createLoan = async (req, res) => {
  try {
    const { error } = loanValidation.validate(req.body)
    if (error) {
      return res.status(400).json({
        status: false,
        message: error.message,
      })
    }

    const { salary, amount, terms, employment } = req.body
    const userId = req.user.id
    const loan = new loanModel({
      loanId: await generateLoanId(userId),
      userId,
      salary,
      amount,
      terms,
      employment,
    })
    await loan.save()
    if (loan) {
      res.status(201).json({
        status: 'success',
        data: loan,

        message: 'Loan Created Successfully',
      })
    }
  } catch (err) {
    return res.status(400).json({
      status: 'failure',
      message: err.message,
    })
  }
}
// @api - v1/loan/ GET
// @desc - get all  users
export const getAllLoans = async (req, res) => {
  try {
    const userId = req.user.id
    const loans = await loanModel.find({ userId })
    if (loans) {
      res.status(201).json({
        status: 'success',
        data: loans,
        loan_taken: loans.length,
        message: 'All loan takens by User',
      })
    }
  } catch (error) {
    return res.status(400).json({
      status: 'failure',
      message: error.message,
    })
  }
}

// @api - v1/loan/payment POST
// @desc - payment  users
export const addPayment = async (req, res) => {
  try {
    const { error } = paymentValidation.validate(req.body)
    if (error) {
      return res.status(400).json({
        status: false,
        message: error.message,
      })
    }
    const { loanId, userId, payment_terms, payment_amount } = req.body

    const existingLoan = await loanModel.find({ userId, loanId })

    if (!existingLoan) {
      return res.status(404).json({
        status: 'failure',
        message: 'Loan Doesnt Exist',
      })
    }

   
    const updatedPaymentAmount =
      existingLoan[0].payment_amount_paid + payment_amount

    const payment_status =
      existingLoan[0].amount === updatedPaymentAmount ? 'Paid' : 'Pending'
    console.log(payment_status)
    const updatedLoan = await loanModel.findByIdAndUpdate(existingLoan[0]._id, {
      payment_terms_paid: payment_terms,
      payment_amount_paid: updatedPaymentAmount,
      payment_status,
    })
    if (updatedLoan) {
      return res.status(201).json({
        status: 'success',
        data: updatedLoan,
        message: 'Loan Updated by User',
      })
    }
  } catch (error) {
    return res.status(400).json({
      status: 'failure',
      message: error.message,
    })
  }
}
