import { Schema, model } from 'mongoose';

const capitalBalanceSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'Users', required: true },
    createdAt: { type: Date, default: Date.now },
    transaction: {type: Schema.Types.ObjectId, ref: 'Transactions', required: true },
    capitalBalance: { type: Number, default: 0 }
})

export default model('CapitalBalance', capitalBalanceSchema);