import express, { Express } from 'express';
import {registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface} from 'class-validator';
//import cors from "cors";
import morgan from "morgan";
const {connectDB} = require('./src/config/db')
const {errorHandler}= require('./src/app/middleware/error.middleware')
import cookieParser from 'cookie-parser';
const app: Express = express();
const port: Number = 5000


app.use(morgan("dev"));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
connectDB()


export function Match(property: string, validationOptions?: ValidationOptions) {
    return (object: any, propertyName: string) => {
        console.log('target : ', object.constructor)
        console.log('Property Name : ', propertyName)
        console.log('options : ', validationOptions)
        console.log('constraints : ', [property])
        registerDecorator({
            target: object.constructor,
            propertyName,
            options: validationOptions,
            constraints: [property],
            validator: MatchConstraint,
        });
    };
}

@ValidatorConstraint({name: 'Match'})
export class MatchConstraint implements ValidatorConstraintInterface {

    validate(value: any, args: ValidationArguments) {
        const [relatedPropertyName] = args.constraints;
        const relatedValue = (args.object as any)[relatedPropertyName];
        return value === relatedValue;
    }

}



app.use('/user', require('./src/app/routes/user.routes'))
app.use('/blog', require('./src/app/routes/blog.routes'))
app.use(errorHandler)
app.listen(port, () => {
    console.log('app is listening at port ' + port)
})


  