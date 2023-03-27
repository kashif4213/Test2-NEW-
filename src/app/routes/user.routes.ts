import express from 'express'
import AuthController from "../controllers/auth.controller"
import { LoginDTO, signupDTO } from '../dtos/auth.dto'
import isAuthenticated from '../middleware/auth.middleware'
import dtoValidationMiddleware from '../middleware/dto.middleware'
let userRouter = express.Router()
const { myAsyncHandler } = require('../utils/asyncHandler')


userRouter.route('/register').post(myAsyncHandler(dtoValidationMiddleware(signupDTO)), myAsyncHandler(AuthController.registerUser))
userRouter.route('/login').post( myAsyncHandler(dtoValidationMiddleware(LoginDTO)) ,myAsyncHandler(AuthController.login))
userRouter.route('/resetPassword').post(myAsyncHandler(dtoValidationMiddleware(signupDTO)) ,myAsyncHandler(AuthController.resetPassword))
userRouter.route('/logout').post( myAsyncHandler(isAuthenticated), myAsyncHandler(AuthController.logOutUser))

module.exports = userRouter;
