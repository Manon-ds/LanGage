import { ObjectId } from "mongoose";

export type gptReplyType = {
  role: string;
  content: string;
  conversationID: number;
  reply: string | null;
  _id: ObjectId;
  timestamp: number;
  __v: number
}
