import mongoose from "mongoose";
const discountCodeSchema = new mongoose.Schema({
  code: {
    type: String,
    required: [true, "Discount code is required"],
    unique: [true, "Discount code must be unique"],
  },
  discountType: {
    type: String,
    enum: ["percentage", "amount"],
    required: [true, "Discount type is required"],
  },
  value: {
    type: Number,
    required: [true, "Discount value is required"],
  },
  expireTime: {
    type: Date,
    required: [true, "Expiration time is required"],
  },
  startTime: {
    type: Date,
    required: [true, "Start time is required"],
  },
  minPrice: {
    type: Number
  },
  maxPrice: {
    type: Number
  },
  userIdsUsed: {
    type: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    default: []
  },
  maxUsedCount: {
    type: Number,
    default: 1
  },
  isPublished: {
    type: Boolean,
    default: true
  },

});
const DiscountCode = mongoose.model("DiscountCode", discountCodeSchema);
export default DiscountCode;
