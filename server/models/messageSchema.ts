import Mongoose, { Schema, model} from "mongoose";

export interface LangageMessageType extends Document {
  role: string;
  content: string;
  timestamp: number;
  conversationID: number;
  reply: string | null;
  _id: Mongoose.Schema.Types.ObjectId
}

export const lanGageMessageSchema: Schema = new Schema<LangageMessageType>({
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
  },
  _id: {
    type: Mongoose.Schema.Types.ObjectId
  }
}, {
  versionKey: false // You should be aware of the outcome after set to false
});

export const Message = model<LangageMessageType>("LanGageMessage", lanGageMessageSchema);
