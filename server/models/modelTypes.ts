import Mongoose from "mongoose";

export type gptReplyType = {
  role: string;
  content: string;
  conversationID: number;
  reply: string | null;
  _id: Mongoose.Schema.Types.ObjectId;
  timestamp: number;
  __v?: number
}
