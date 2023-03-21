import express, { Express } from 'express';
// import cors from "cors";
import morgan from "morgan";
const {connectDB} = require('./src/config/db')
const {errorHandler}= require('./src/app/middleware/errorMiddleware')
import cookieParser from 'cookie-parser';
const app: Express = express();
const port: Number = 5000

app.use(morgan("dev"));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
connectDB()

app.use('/user', require('./src/app/routes/userRoutes'))
//app.use('/blog', require('./src/app/routes/blogRoutes'))
app.use(errorHandler)
app.listen(port, () => {
    console.log('app is listening at port ' + port)
})


  