const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [
    {
      design: { type: mongoose.Schema.Types.ObjectId, ref: 'Design', required: true },
      quantity: { type: Number, required: true },
      subtotal: { type: Number, required: true }, // Store subtotal directly
    },
  ],
  totalPrice: { type: Number, required: true },
  totalQuantity: { type: Number, required: true },
  time: { type: Date, required: true, default: Date.now },
});

module.exports = mongoose.model('Cart', cartSchema);
