import { Request, Response } from "express"
import { createblogDTO, updateblogDTO } from "../dtos/blog.dto"
import BlogService from "../services/blog.service"
import Blog from '../models/blogModel'


export default class BlogController{
    static async getBlogs(req : Request , res : Response) : Promise<Response>{
        let blogs = await Blog.find().skip(req.body.pageNumber * 5 ).limit(5).sort({title : 1})
        return res.json({
            success: true,
            message: 'Blogs Fetched Successfully',
            data : blogs,
        })
    }

    static async createBlog(req: Request , res : Response) : Promise<Response>{
        let blogData : createblogDTO = req.body
        let blog = BlogService.createBlog(blogData)
        return res.json({
            success: true,
            message: 'Blog Created Successfully',
            data : blog,
        })
    }

    static async updateBlog(req : Request , res : Response) : Promise <Response>{
        let blogData : updateblogDTO = req.body
        let blog = BlogService.updateBlog(blogData,req.params.id)

        return res.json({
            success: true,
            message: 'Blogs Updated Successfully',
            data : blog,
        })
    }

    static async deleteBlog(req : Request , res : Response) : Promise<Response>{
        let blogData : updateblogDTO = req.body
        let blog = BlogService.updateBlog(blogData,req.params.id)

        return res.json({
            success: true,
            message: 'Blogs Deleted Successfully',
            data : blog,
        })
        return res.json({
            
        })
    }

}

// const getModels: RequestHandler = myAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
//     let blogs = await Blog.find().skip(req.body.pageNumber * 5 ).limit(5).sort({title : 1})
//     return res.status(200).json(blogs)
// })


// const createModel: RequestHandler = myAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
//     let tempBlog = await Blog.create(req.body.blog)
//     return res.status(201).json(tempBlog)
// })


// const updateModel: RequestHandler = myAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
//     await req.body.blog.save()
//     return res.status(200).json(req.body.blog)
// })

// const deleteModel: RequestHandler = myAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
//     await req.body.blog.remove()
//     return res.status(200).json(req.params.id)
// })


