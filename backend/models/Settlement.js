const mongoose = require("mongoose");

const settlementSchema = new mongoose.Schema({

       groupId: {  type: mongoose.Schema.Types.ObjectId, ref: "Group",  default: null,},
       from: { type: String,  required: true,},
       to: { type: String, required: true,},
       amount: { type: Number,required: true, min: 0,},
       recordedBy: { type: String, required: true,},

}, { timestamps: true });

const settlementModel = mongoose.model("Settlement", settlementSchema);
module.exports = settlementModel;
