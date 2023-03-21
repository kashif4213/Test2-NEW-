import { IsEmail, Length, IsString, MinLength, MaxLength, Matches, IsNotEmpty } from "class-validator"

export class signupDTO{
    @IsEmail()
    email: string

    @IsString()
    @MinLength(4)
    @MaxLength(20)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: "password too weak"
    })
    password: string

    @Length(1, 100)
    firstName?: string = ""

    @Length(1, 100)
    lastName?: string = ""
    constructor(
        email: string,
        password: string,
        firstName?: string,
        lastName?: string

      ) {
        this.email = email
        this.password = password
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
