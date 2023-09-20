import express from 'express'
import { loginUser,registerUser,adminLogin} from '../controller/user.controller.js'
const userRouter = express.Router()

userRouter
.post('/login',loginUser)
.post('/register',registerUser)
.post('/admin',adminLogin)
export default userRouter