const mongoose = require('mongoose');

const campaignLogSchema = new mongoose.Schema({
  campaignName: { type: String, required: true },
  segmentName: { type: String, required: true },
  message: { type: String, required: true },
  sentDate: { type: Date, default: Date.now },
  deliveryStatus: [{
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
    customerName: { type: String },
    customerMessage: { type: String }, // Personal message for the customer
    status: { type: String, enum: ['SENT', 'FAILED'], default: 'SENT' }
  }],
  audienceSize: { type: Number },           
  numberSent: { type: Number, default: 0 }, 
  numberFailed: { type: Number, default: 0 }
});

module.exports = mongoose.model('CampaignLog', campaignLogSchema);
