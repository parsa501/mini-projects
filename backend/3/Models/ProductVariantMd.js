import mongoose from "mongoose";
const productVariantSchema = new mongoose.Schema(
  {
    quantity: {
      type: Number,
      min: 0,
      required: [true, "Quantity is required"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
    },
    discount: {
      type: Number,
      default: 0,
      min: [0, "Discount must be positive"],
      max: [100, "Discount must be less than or equal to 100"],
    },
    priceAfterDiscount: {
      type: Number,
      required: [true, "Price after discount is required"],
    },
    ProductId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
    variantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Variant",
    },
  },
  { timestamps: true }
);

productVariantSchema.pre("save", function (next) {
  this.priceAfterDiscount = this.price - (this.price * this.discount) / 100;
  next();
});

const ProductVariant = mongoose.model("ProductVariant", productVariantSchema);
export default ProductVariant;
