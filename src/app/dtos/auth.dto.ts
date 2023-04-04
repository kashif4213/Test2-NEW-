import { IsEmail, Length, IsString, MinLength, MaxLength, Matches, IsNotEmpty, Validate, } from "class-validator"
import { CustomMatchPasswords } from "../decorators/match"

export class signupDTO {
  @IsEmail()
  email: string

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: "password too weak"
  })
  password: string

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @IsNotEmpty()
  @Validate(CustomMatchPasswords, ['password'])
  confirmPassword: string

  @Length(1, 100)
  firstName?: string = ""

  @Length(1, 100)
  lastName?: string = ""
  constructor(
    email: string,
    password: string,
    confirmPassowrd: string,
    firstName?: string,
    lastName?: string,

  ) {
    this.email = email
    this.password = password
    this.confirmPassword = confirmPassowrd
    this.firstName = firstName
    this.lastName = lastName
  }
}

export class LoginDTO {
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  constructor(
    email: string,
    password: string,
  ) {
    this.email = email;
    this.password = password;
  }
}
