import mongoose from "mongoose";
const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Post title is required"],
        minLength: [5, "Post title must be at least 5 characters long"]
    },
    description: {
        type: String,
        required: [true, "Post description is required"],
        minLength: [20, "Post description must be at least 20 characters long"]
    },
    image: {
        type: String,
        required: [true, "Post image is required"]
    },
    categoryId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Category',
        required: [true, "Post category is required"]
    }
}, { timestamps: true });

const Post = mongoose.model("Post", postSchema);
export default Post;
