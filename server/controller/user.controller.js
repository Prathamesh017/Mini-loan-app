import { userRegisterValidation } from '../validators/validators.js'
import userModel from '../models/user.schema.js'
import {
  hashPassword,
  generateToken,
  validatePassword,
} from '../utility/utility.js'

// @api - v1/auth/login POST
// @desc - login user
export const loginUser = async (req, res) => {
  try {
    const { error } = userRegisterValidation.validate(req.body)
    if (error) {
      return res.status(400).json({
        status: false,
        message: error.message,
      })
    }
    const { email, password } = req.body
    const user = await userModel.findOne({ email })
    if (!user) {
      return res.status(404).json({
        status: false,
        message: 'User Not Found',
      })
    }
    const isPasswordCorrect = await validatePassword(password, user.password)
    if (!isPasswordCorrect) {
      return res.status(401).json({
        status: false,
        message: 'Invalid Credentials',
      })
    }
    if (user) {
      let token = await generateToken(user.id)
      res.status(201).json({
        status: 'success',
        data: {
          id: user.id,
          email: user.email,
          access_token: token,
        },
        message: 'Login Successfully',
      })
    }
  } catch (err) {
    return res.status(400).json({
      status: 'failure',
      message: err.message,
    })
  }
}

// @api - v1/auth/register POST
// @desc - register user
export const registerUser = async (req, res) => {
  try {
    const { error } = userRegisterValidation.validate(req.body)
    if (error) {
      return res.status(400).json({
        status: false,
        message: error.message,
      })
    }
    const { email, password } = req.body
    const emailAlreadyExists = await userModel.findOne({ email })
    if (emailAlreadyExists) {
      return res.status(409).json({
        status: false,
        message: 'User Alreay Exists',
      })
    }
    const hashedPassword = await hashPassword(password)

    const user = new userModel({
      email,
      password: hashedPassword,
    })
    await user.save()
    if (user) {
      let token = await generateToken(user.id)

      res.status(201).json({
        status: 'success',
        data: {
          id: user._id,
          name: user.name,
          email: user.email,
          created_at: user.createdAt,
          access_token: token,
        },
        message: 'User Register Successfully',
      })
    }
  } catch (err) {
    return res.status(400).json({
      status: 'failure',
      message: err.message,
    })
  }
}

// @api - v1/auth/admin POST
// @desc - admin user
// !TODO
export const adminLogin = async (req, res) => {
  try {
    const { error } = userRegisterValidation.validate(req.body)
    if (error) {
      return res.status(400).json({
        status: false,
        message: error.message,
      })
    }
    const { email, password } = req.body

    //check for admin password
    if (password !== process.env.ADMIN_PASSWORD) {
      return res.status(401).json({
        status: false,
        message: 'Invalid Credentials',
      })
    }

     //check if already exists then return else create new
    const emailAlreadyExists = await userModel.findOne({ email })
    if (emailAlreadyExists) {
      let token = await generateToken(emailAlreadyExists.id)
      return res.status(201).json({
        status: 'success',
        data: {
          id: emailAlreadyExists.id,
          email: emailAlreadyExists.email,
          access_token: token,
        },
        message: 'Login Successfully',
      })
    }

    const hashedPassword = await hashPassword(password)
    const user = new userModel({
      email,
      password: hashedPassword,
    })
    await user.save()
    if (user) {
      let token = await generateToken(user.id)
      return res.status(201).json({
        status: 'success',
        data: {
          id: user._id,
          name: user.name,
          email: user.email,
          access_token: token,
        },
        message: 'Login Successfully Successfully',
      })
    }
  } catch (err) {
    return res.status(400).json({
      status: 'failure',
      message: err.message,
    })
  }
}
