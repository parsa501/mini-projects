import mongoose from "mongoose";
const variantSchema = new mongoose.Schema({
  type: {
    type: String,
    required: [true, "Type is required"],
    enum:['color','size']
  },
 value:{
    type: String,
    required: [true, "Value is required"],
  }
},{timestamps:true});

const Variant = mongoose.model("Variant", variantSchema);

export default Variant;