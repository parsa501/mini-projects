import mongoose from "mongoose";
const informationSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      required: [true, "Key is required"],
      trim: true,
    },
    value: {
      type: String,
      required: [true, "Value is required"],
      trim: true,
    },
  },
  { _id: false }
);
const productSchema = new mongoose.Schema(
  {
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Category is required"],
    },
    brandId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Brand",
      required: [true, "Brand is required"],
    },
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    images: {
      type: [String],
      default: [],
    },
    information: {
      type: [informationSchema],
      default: [],
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    rateCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    userBoughtCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    productVariantIds: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Variant",
        },
      ],
      default: [],
    },
    defaultProductVariantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Variant",
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
export default Product;
