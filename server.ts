import express, { Express } from 'express';
//import cors from "cors";
import NodeCache from 'node-cache';
import morgan from "morgan";
const {connectDB} = require('./src/config/db')
const {errorHandler}= require('./src/app/middleware/error.middleware')
import cookieParser from 'cookie-parser';
const app: Express = express();
const port: Number = 5000
export const myCache = new NodeCache({ stdTTL: 10, checkperiod: 120 });

app.use(morgan("dev"));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
connectDB()




app.use('/user', require('./src/app/routes/user.routes'))
app.use('/blog', require('./src/app/routes/blog.routes'))
app.use(errorHandler)
app.listen(port, () => {
    console.log('app is listening at port ' + port)
})


  