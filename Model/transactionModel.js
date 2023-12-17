//transaction.js
const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },
  date: { type: Date, default: Date.now },
  type: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String },
  paidTo: {type: String, required: true },
  amount: { type: Number, required: true },
  history:{type:[mongoose.Schema.Types.Mixed]}
});

module.exports = mongoose.model('Transactions', transactionSchema);