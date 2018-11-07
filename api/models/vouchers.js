const mongoose = require('mongoose');

const voucherSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    price: { type: Number, required: true },
    code: { type:String, required: true}
});

module.exports = mongoose.model('Voucher', voucherSchema);