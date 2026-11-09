import mongoose from "mongoose";
const mediaSchema = new mongoose.Schema({
    file:{
        type:Object,
        required: [true, "File is required"]
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "User ID is required"]
    }
},{timestamps:true});
const Media = mongoose.model("Media", mediaSchema);
export default Media;
