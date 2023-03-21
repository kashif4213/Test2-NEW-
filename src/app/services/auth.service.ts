import bcrypt from 'bcrypt';
import { LoginDTO, signupDTO } from '../dtos/auth.dto'
import User  from '../models/userModel'
import {  sign } from 'jsonwebtoken';

export default class AuthService {
    
  public static async signup(authData: signupDTO ) {
      const user = await User.create({
          firstName: authData.firstName,
          lastName : authData.lastName,
          email: authData.email ,
          password: await bcrypt.hash(authData.password, 10)
      })
      if(user) return user
    }


    public static async login(loginDto: LoginDTO) {
      const {email, password} = loginDto;
      const user :any = await User.find({email})
      if (!user[0] || await bcrypt.compare(password, user[0].password) ) {
        throw new Error('Invalid credentials')
      }
      await user[0].save();
      return {accessToken: this.createToken(user[0]._id, "mySecretKey"), user: user[0]}
    }
  


    
// Create a unique token if login or register
public static createToken(_id : String ,sk : String): string{
  let token = sign({_id},'mySceretKey')
  return token
} 


}