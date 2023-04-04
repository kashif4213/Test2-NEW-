import { NextFunction, Request, Response } from "express"
import { verify } from "jsonwebtoken"
interface IGetUserAuthInfoRequest extends Request {
  user: any
}
const isAuthenticated = (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
  if (req.cookies.token) {
    const decoded = verify(req.cookies.token.toString(), "mySceretKey")
    if (decoded) {
      req.user = decoded
      console.log('decoded : ', decoded)
      next()
    }
  }
  else {
    throw new Error("401")
  }

}

export default isAuthenticated;