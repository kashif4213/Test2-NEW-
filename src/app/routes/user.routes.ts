import express from 'express'
import AuthController from "../controllers/auth.controller"
import { signupDTO } from '../dtos/auth.dto'
import isAuthenticated from '../middleware/auth.middleware'
import dtoValidationMiddleware from '../middleware/dto.middleware'
const router = express.Router()
const User = require('../models/userModel')
const { myAsyncHandler } = require('../utils/asyncHandler')


router.route('/register').post(myAsyncHandler(dtoValidationMiddleware(signupDTO)), myAsyncHandler(AuthController.registerUser))
router.route('/login').post( myAsyncHandler(AuthController.login))
router.route('/resetPassword').post( myAsyncHandler(AuthController.resetPassword))
router.route('/logout').post( myAsyncHandler(isAuthenticated), myAsyncHandler(AuthController.logOutUser))

module.exports = router;
