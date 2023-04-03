import { Server } from "http"
import Message from "../models/message.model"
import { Socket } from "socket.io"
import User from "../models/userModel"

export class SocketService {
  async socketHandler(server: Server) {
    const io = require("socket.io")(server, {
      cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
      },
    });

    io.on("connection", (socket: Socket) => {
      console.log('new connect')
  socket.on("new-user", async (name : any) => {
    // const members = await User.find();
    // console.log(name+" entered",members );
    
    io.emit("new-user");
  });

  socket.on("join-room", async (newRoom, previousRoom) => {
    socket.join(newRoom);
    socket.leave(previousRoom);
    let roomMessages = await this.getLastMessagesFromRoom(newRoom)
    console.log('joined the ',newRoom);
    socket.emit("room-messages", roomMessages);
  });

  socket.on("message-room", async (room, content, sender) => {

    const newMessage = await Message.create({
      content,
      from: sender,
      to: room,
    });
    console.log('new Notification',newMessage)
    let roomMessages = await this.getLastMessagesFromRoom(room);
    // sending message to room
    io.to(room).emit("room-messages", roomMessages);
    socket.broadcast.emit("notifications", room);
  });

});
  }
  private async getLastMessagesFromRoom(room: string) {
  let roomMessages = await Message.aggregate([
    { $match: { to: room } },
    { $group: { _id: "$date", messagesByDate: { $push: "$$ROOT" } } },
  ]);
  return roomMessages;
}
}