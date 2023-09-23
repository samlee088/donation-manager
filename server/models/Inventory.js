import { Schema, model } from "mongoose";

/* Model to handle method of keeping current inventory on hand for each category */
const inventorySchema = new Schema({
  inventoryCategory: {
    type: String,
    required: true,
  },
  inventoryValue: {
    type: Number,
    required: true,
  },
});

const Inventory = model("Inventory", inventorySchema);

export default Inventory;
