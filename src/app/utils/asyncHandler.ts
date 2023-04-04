import { Request, Response, NextFunction } from "express"

function myAsyncHandler(asyncFunction: any) {
	return (req: Request, res: Response, next: NextFunction) => {
		Promise.resolve(asyncFunction(req, res, next)).catch(next)
	}
}
module.exports = { myAsyncHandler }