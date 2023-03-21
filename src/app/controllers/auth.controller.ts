import { Request, RequestHandler, Response } from 'express';
import { LoginDTO, signupDTO } from '../dtos/auth.dto';
import AuthService from '../services/auth.service'


//const authService = new AuthService();

export default class AuthController {

    // Register a new User
    static async registerUser(req: Request, res: Response): Promise<Response> {
        const authData: signupDTO = req.body
        const userCreated = await AuthService.signup(authData)


        return res.status(201).json({
            success: true,
            message: 'User created successfully',
            user: userCreated,
        });
    }

    // Login for the User
    static async login(req: Request, res: Response) : Promise<Response>{
        const credentials: LoginDTO = req.body
        const loginUser: any = await AuthService.login(credentials)
        
        return res.cookie("token",loginUser.accessToken.toString() ,{ expires : new Date (Date.now()+ 600000) }).status(200).json({
            success: true,
            message: 'User signed in successfully',
            data: loginUser,
        });
    }
    
    //Reset Password for the User
    static async resetPassword(req: Request, res: Response): Promise<Response> {
        let { password } = req.body
        req.body.registeredUser.password = password
        await req.body.registeredUser.save()
        return res.status(200).json({ message: 'Password Changed Successfully', user: req.body.registeredUser })
    }
    
    
    // Logout the current User
    static async logOutUser(req: Request, res: Response): Promise<Response> {
        res.clearCookie("token")
        return res.status(200).json({ message: 'User Logged Out Successfully.' })
    }

}

