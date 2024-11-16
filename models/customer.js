const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  totalSpending: { type: Number, default: 0 },
  numberOfVisits: { type: Number, default: 0 },
  lastVisit: { type: Number, default: 0 }  // no of days back customer visited
});

module.exports = mongoose.model('Customer', customerSchema);

