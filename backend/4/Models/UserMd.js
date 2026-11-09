import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
    },
    password: {
      type: String,
    },
    phoneNumber: {
      type: String,
      unique: [true, "Phone number must be unique"],
      required: [true, "Phone number is required"],
      match: [/^(\+98|0)?9\d{9}$/, "Invalid phone number"],
    },
    profilePic:{
      type: [String],
    },
    bio: {
      type: String,
      default: "",
    },
    fullName: {
      type: String,
      required: [true, "Full name is required"],
    },
    contactIds:{
      type:[
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User"
        }
      ],
      default: []
    }
  },
  { timestamps: true }
);
const User=mongoose.model('User',userSchema)
export default User;