import mongoose from "mongoose";
const addressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  street: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  postalCode: {
    type: String,
    required: true,
    match:[/^(?!(\d)\1{9})(?!0)\d{10}$/, 'Invalid postal code']
  },
  lat: {
    type: Number,
    required: true,
  },
  lng: {
    type: Number,
    required: true,
  },
  receiverPhoneNumber: {
    type: String,
    required: true,
      match: [/^(\+98|0)?9\d{9}$/, "Invalid phone number"],
  },
  receiverFullName: {
    type: String,
    required: true,
  },
  pelak: {
    type: String,
   required:[true,'Pelak is required']
  },
  description: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
});
const Address = mongoose.model("Address", addressSchema);
export default Address;
