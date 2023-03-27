import { myCache } from '../../../server';
import { createblogDTO, updateblogDTO } from '../dtos/blog.dto';
import Blog from '../models/blogModel';


export default class BlogService {

    static async getBlogs( pageNumber: number) {
        let blogs = await Blog.find().skip(pageNumber * 5).limit(5).sort({ title: 1 })
        if (blogs) {
          //  console.log('this is req.query : ', reqQuery)
            myCache.set("blogs", blogs)
            return blogs
        }
    }

    static async createBlog(blogData: createblogDTO) {
        let blog = await Blog.create({
            title: blogData.title,
            description: blogData.description,
            nLikes: blogData.nLikes,
            numComments: blogData.numComments,
            Author: blogData.Author
        })
        if (blog) return blog
    }

    static async updateBlog(blogData: updateblogDTO, id: string) {
        let blog: any = Blog.findById({ id })
        blog.title = blogData.title
        blog.description = blogData.description
        blog.nLikes = blogData.nLikes
        blog.numComments = blogData.numComments
        blog.Author = blogData.Author

        if (blog) {
            await blog.save()
            return blog
        }
        throw new Error("401")
    }


    static async deleteBlog(id: string) {
        let blog: any = Blog.findById({ id })
        if (blog) {
            await blog.remove()
            return blog
        }
        throw new Error("401")
    }
}