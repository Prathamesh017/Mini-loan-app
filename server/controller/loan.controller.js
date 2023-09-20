import loanModel from '../models/loan.schema.js'
import { generateLoanId } from '../utility/utility.js'
import { loanValidation } from '../validators/validators.js'

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
