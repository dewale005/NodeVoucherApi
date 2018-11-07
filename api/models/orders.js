const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    voucher: { type: mongoose.Schema.Types.ObjectId, ref: 'Voucher'},
    quantity:{ type: Number, default: 1 }
});

module.exports = mongoose.model('Order', orderSchema); 