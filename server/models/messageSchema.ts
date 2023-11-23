import { Schema, model} from "mongoose";

export type LangageMessageType = {
  role: string;
  content: string;
  timestamp: number;
  conversationID: number;
  reply: string | null;
}

export const lanGageMessageSchema = new Schema<LangageMessageType>({
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
    type: String ,
    default: null
  }
});

export const Message = model<LangageMessageType>("LanGageMessage", lanGageMessageSchema);
