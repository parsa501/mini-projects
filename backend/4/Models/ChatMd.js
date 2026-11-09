import mongoose from "mongoose";
const chatSchema = new mongoose.Schema({
  memberIds: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    default: [],
  },
  type: {
    type: String,
    enum: ["private", "group", "channel"],
    required: [true, "Chat type is required"],
  },
  adminIds: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    default: [],
  },
  name: {
    type: String,
    required: [true, "Chat name is required"],
  },
  description: {
    type: String,
    default: "",
  },
  pic: {
    type: String,
    default: "",
  },
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null
  },
  lastMessage:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Message",
  }
},{ timestamps: true });
const Chat = mongoose.model("Chat", chatSchema);
export default Chat;
