import { Schema, model } from "mongoose";

const distributionSchema = new Schema({
  distributionCategory: {
    type: String,
    required: true,
  },
  distributionQuantity: {
    type: Number,
    required: true,
  },
  distributionDate: {
    type: Date,
    required: true,
  },
});

const Distribution = model("Distribution", distributionSchema);

export default Distribution;
