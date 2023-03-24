import express from 'express'
import BlogController from '../controllers/blog.controller'
import isAuthenticated from '../middleware/auth.middleware'
let blogRouter = express.Router()
const { myAsyncHandler } = require('../utils/asyncHandler')



blogRouter.route('/').get(myAsyncHandler(isAuthenticated), myAsyncHandler(BlogController.getBlogs)).post(myAsyncHandler(isAuthenticated),  myAsyncHandler(BlogController.createBlog))
blogRouter.route('/:id').put(myAsyncHandler(isAuthenticated),  myAsyncHandler(BlogController.updateBlog)).delete(myAsyncHandler(isAuthenticated) ,  myAsyncHandler(BlogController.deleteBlog))


module.exports = blogRouter