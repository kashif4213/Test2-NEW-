import { Schema, model } from 'mongoose';

interface IMessage {
  content: string;
  from: object;
  socketId: string;
  to: string;
}

const messageSchema = new Schema<IMessage>({
  content: { type: String },
  from: { type: Object },
  socketId: { type: String },
  to: { type: String },
});

const Message = model<IMessage>('Message', messageSchema);

export default Message;