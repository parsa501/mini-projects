import mongoose from "mongoose";
const itemSchema=new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: [true, "Product ID is required"],
    },
    cartQuantity: {
        type: Number,
        required: [true, "Quantity is required"],
        min: [1, "Quantity must be at least 1"],
    },
    price: {
        type: Number,
        required: [true, "Price is required"],
        min: [0, "Price must be positive"],
    },
    productVariantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ProductVariant",
        required: [true, "Product Variant ID is required"],
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: [true, "Category ID is required"],
    },
    priceAfterDiscount: {
        type: Number,
        required: [true, "Price after discount is required"],
    },
},{_id:false})
const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User ID is required"],
  },
  totalPrice: {
    type: Number,
    min: [0, "Total price must be positive"],
    default:0
  },
   totalPriceAfterDiscount: {
    type: Number,
    min: [0, "Total price must be positive"],
    default:0
  },
  items:{
    type:[itemSchema],
    default:[]
  }
});

const Cart = mongoose.model("Cart", cartSchema);
export default Cart;
