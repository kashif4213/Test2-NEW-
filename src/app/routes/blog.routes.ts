import express from 'express'
const { createModel, getModels, updateModel, deleteModel, BlogParamHandler } = require('../controllers/blogController')
const { addBlogMiddleware, blogMiddlewareUpdateDelete } = require('../middleware/blogMiddleware')
let userMiddleware = require('../middleware/userMiddleware')
let blogRouter = express.Router()
const { myAsyncHandler } = require('../utils/asyncHandler')



blogRouter.route('/').get(userMiddleware.verifyToken, getModels).post(userMiddleware.verifyToken, addBlogMiddleware, createModel)
blogRouter.route('/:id').put(userMiddleware.verifyToken, blogMiddlewareUpdateDelete, updateModel).delete(userMiddleware.verifyToken, blogMiddlewareUpdateDelete, deleteModel)


module.exports = blogRouter