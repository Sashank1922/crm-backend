const mongoose = require('mongoose');
const Customer = require('./customer');

const communicationsLog = new mongoose.Schema({
  segmentname: { type: String, required: true },
  audience: [Customer.schema],
});

module.exports = mongoose.model('CommunicationsLog', communicationsLog);