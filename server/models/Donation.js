import { Schema, model } from "mongoose";

const donationSchema = new Schema({
  donorName: {
    type: String,
    required: true,
  },
  donationCategory: {
    type: String,
    required: true,
  },
  donationQuantity: {
    type: Number,
    required: true,
  },
  donationDate: {
    type: Date,
    required: true,
  },
});

const Donation = model("Donation", donationSchema);

export default Donation;
