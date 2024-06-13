const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const subscriptionSchema = new Schema({
  company: { type: Schema.Types.ObjectId, ref: "Company", required: true },
  plan: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  paymentStatus: {
    type: String,
    enum: ["Pending", "Paid", "Failed"],
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Subscription", subscriptionSchema);
