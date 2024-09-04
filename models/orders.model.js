
const mongoose = require('mongoose');

const orderSchema =mongoose.Schema(
    {
        id:{
            type:Number,
            required: [true,"orderid is required value"]
        },
        userid:{
            type:Number,
            required: [true,"userid is required value"]
        },
        no_items:{
            type:Number,
            required: [true,"items is required value"],
            default:1
        },
    },
    {
        timestamps:true,
    }
);




const Order = mongoose.model("Order",orderSchema);
module.exports = Order


