import { NextFunction, Response, Request } from "express";
import { myCache } from '../../../server'

const cachedBlogs = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    let blogs: any = []
    //console.log('this is the req Object : ',req.baseUrl);
    
    if (req.baseUrl.includes('blog')) {
        blogs = myCache.get("blogs")
    }
    else {
        //console.log("this is the req.query : ", req.query,myCache.get("blogs"))
        const query = JSON.stringify(req.query)
        blogs = myCache.get(query)
    }
    if (blogs) {
        //console.log('I am here')
        return res.status(200).json({
            success: true,
            message: "Blogs have been updated successfully",
            data: blogs,
        })
    }
    else {
        next()
    }
}

export default cachedBlogs
