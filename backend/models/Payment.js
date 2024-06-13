const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const paymentSchema = new Schema({
  company: { type: Schema.Types.ObjectId, ref: "Company", required: true },
  subscription: {
    type: Schema.Types.ObjectId,
    ref: "Subscription",
    required: true,
  },
  amount: { type: Number, required: true },
  paymentDate: { type: Date, default: Date.now },
  paymentStatus: {
    type: String,
    enum: ["Pending", "Completed", "Failed"],
    required: true,
  },
  paymentMethod: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Payment", paymentSchema);
