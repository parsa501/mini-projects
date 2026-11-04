import mongoose from "mongoose";
const sliderSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
    unique: [true, "Title must be unique"],
  },
  image: {
    type: String,
    default:''
  },
  href: {
    type: String,
    default: '',
  },
},{timestamps:true});

const Slider = mongoose.model("Slider", sliderSchema);

export default Slider;