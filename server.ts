import express, { Express } from 'express';
//import cors from "cors";
import { createServer } from "http";
import NodeCache from 'node-cache';
import morgan from "morgan";
const { connectDB } = require('./src/config/db')
const { errorHandler } = require('./src/app/middleware/error.middleware')
import cookieParser from 'cookie-parser';
import { SocketService } from './src/app/services/socket.service';
const app: Express = express();
const port: Number = 3000
const server = createServer(app);
const socketService = new SocketService();
export const myCache = new NodeCache({ stdTTL: 10, checkperiod: 120 });


app.use(morgan("dev"));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
connectDB()


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});


socketService.socketHandler(server);
app.use('/user', require('./src/app/routes/user.routes'))
app.use('/blog', require('./src/app/routes/blog.routes'))
app.use(errorHandler)


server.listen(port, () => {
    console.log('app is listening at port ' + port)
})


