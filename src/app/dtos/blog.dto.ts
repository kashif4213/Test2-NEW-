import {  IsString, MinLength, MaxLength, Matches, IsNotEmpty, IsOptional } from "class-validator"

export class createblogDTO{
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    title : string

    @IsString()
    @MinLength(4)
    @MaxLength(20)
    description : string

    @IsNotEmpty()
    nLikes : number

    @IsNotEmpty()
    numComments : number
 
    @IsNotEmpty()
    Author  : string


    constructor(title : string,
        description : string,
        nLikes : number,
        numComments : number,
        Author : string  ){

            this.title = title
            this.description= description
            this.nLikes = nLikes
            this.numComments = numComments
            this.Author = Author
        }
}



export class updateblogDTO{
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    @IsOptional()
    title : string

    @IsString()
    @MinLength(4)
    @MaxLength(20)
    @IsOptional()
    description : string

    @IsNotEmpty()
    @IsOptional()
    nLikes : number

    @IsNotEmpty()
    @IsOptional()
    numComments : number
 
    @IsNotEmpty()
    @IsOptional()
    Author  : string


    constructor(title : string,
        description : string,
        nLikes : number,
        numComments : number,
        Author : string  ){

            this.title = title
            this.description= description
            this.nLikes = nLikes
            this.numComments = numComments
            this.Author = Author
        }
}
