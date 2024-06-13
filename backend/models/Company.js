const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const companySchema = new Schema({
  name: { type: String, required: true },
  contactInfo: {
    address: String,
    phone: String,
    email: String,
  },
  subscription: { type: Schema.Types.ObjectId, ref: "Subscription" },
  users: [{ type: Schema.Types.ObjectId, ref: "User" }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Company", companySchema);
