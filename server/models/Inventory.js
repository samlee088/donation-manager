import { Schema, model } from 'mongoose';

const inventorySchema = new Schema (
    {
        inventoryCategory: {
            type: String,
            required: true,
        },
        inventoryValue: {
            type: Number,
            required: true,
        }
    }
)

const Inventory = model('Inventory', inventorySchema)

export default Inventory;