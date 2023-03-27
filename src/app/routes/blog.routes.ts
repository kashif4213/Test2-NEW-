import express from 'express'
import BlogController from '../controllers/blog.controller'
import { createblogDTO, updateblogDTO } from '../dtos/blog.dto'
import isAuthenticated from '../middleware/auth.middleware'
import cachedBlogs from '../middleware/cache.middleware'
import dtoValidationMiddleware from '../middleware/dto.middleware'
let blogRouter = express.Router()
const { myAsyncHandler } = require('../utils/asyncHandler')



blogRouter.route('/').get(myAsyncHandler(isAuthenticated), myAsyncHandler(cachedBlogs) ,myAsyncHandler(BlogController.getBlogs)).post(myAsyncHandler(isAuthenticated), myAsyncHandler(dtoValidationMiddleware(createblogDTO)) ,myAsyncHandler(BlogController.createBlog))
blogRouter.route('/:id').put(myAsyncHandler(isAuthenticated), myAsyncHandler(dtoValidationMiddleware(updateblogDTO)) ,myAsyncHandler(BlogController.updateBlog)).delete(myAsyncHandler(isAuthenticated) ,  myAsyncHandler(BlogController.deleteBlog))


module.exports = blogRouter