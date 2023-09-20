import mongoose from 'mongoose'
const loanSchema = new mongoose.Schema(
  {
    loanId: {
      type: String,
      required: true,
      unique: true,
    },
    userId: {
      type: String,
      ref: 'user',
      required: true,
    },
    employment: {
      type: String,
      required: true,
    },
    salary: {
      type: Number,
      required: true,
    },
    terms: {
      type: Number,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    loan_status: {
      type: String,
      required: true,
      default: 'Pending',
    },
    payment_status: {
      type: String,
      required: true,
      default: 'Pending',
    },
    payment_terms_paid:{
      type:Number,
      required:true,
      default:0,
    },
    payment_amount_paid:{
      type:Number,
      required:true,
      default:0
    }
  },
  {
    timestamps: true,
  },
)
const loanModel = mongoose.model('loan', loanSchema)
export default loanModel
