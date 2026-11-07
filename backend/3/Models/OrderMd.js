import mongoose from "mongoose";
const orderSchema=new mongoose.Schema({
    discountCodeId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "DiscountCode"
    },
    items:{
        type:Array,
        required:[true,"Items are required"]
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    status:{
        type:String,
        enum:["pending","success","failed"],
        default:"pending"
    },
    totalPrice:{
        type:Number,
        required:[true,"Total price is required"]
    },
    totalPriceAfterDiscount:{
        type:Number,
        required:[true,"Total price after discount is required"]
    },
    authority:{
        type:String,
    },
    refId:{
        type:String,
    },
    address:{
        type:Object,
        required:[true,"Address is required"]
    }
},{timestamps:true})

const Order = mongoose.model("Order", orderSchema)

export default Order