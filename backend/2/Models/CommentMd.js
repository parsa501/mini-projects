import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
        required: [true, "Comment post is required"]
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Comment user is required"]
    },
    content: {
        type: String,
        required: [true, "Comment content is required"],
        minLength: [5, "Comment content must be at least 5 characters long"]
    },
    isPublish: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

const Comment = mongoose.model("Comment", commentSchema);
export default Comment;
