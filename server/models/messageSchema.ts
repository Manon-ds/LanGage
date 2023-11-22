import { Schema, model } from "mongoose";

interface ILangageMessage {
  role: string;
  content: string;
  timestamp: number;
  conversationID: number;
  reply?: string | null;
}

const lanGageMessageSchema = new Schema<ILangageMessage>({
  role: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Number,
     required: true
     },
  conversationID: {
     type: Number,
     required: true
    },
  reply: {
    type: String,
    default: null
  }
});

export const Message = model<ILangageMessage>("LanGageMessage", lanGageMessageSchema);