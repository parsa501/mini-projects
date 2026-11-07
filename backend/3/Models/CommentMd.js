import mongoose from "mongoose";
const commentSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:[true,"User is required"]
    },
    productId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product",
        required:[true,"Product is required"]
    },
    content:{
        type:String,
        required:[true,"Content is required"],
        trim:true
    },
    rating:{
        type:Number,
        min:0,
        max:5,
        default:0
    },
    isPublished:{
        type:Boolean,
        default:false
    }
},{timestamps:true})
const Comment=mongoose.model("Comment",commentSchema)
export default Comment
