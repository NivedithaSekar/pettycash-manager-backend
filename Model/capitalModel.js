const mongoose = require('mongoose');

const capitalBalanceSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },
    date: { type: Date, default: Date.now },
    capitalBalance: { type: Number, default: 0 }
})

module.exports = mongoose.model('CapitalBalance', capitalBalanceSchema);