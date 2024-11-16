const CampaignLog = require('../models/campaignLog');

// Delivery Receipt API
exports.deliveryReceipt = async (req, res) => {
  try {
    const { segmentName,msg, customermsgstatus } = req.body;

    // Map customer status to match the schema
    const deliveryStatus = customermsgstatus.map(status => ({
      customerId: status.customerId, // Customer's ID
      customerName: status.customerName, // Customer's name
      customerMessage: status.customerMessage, // Personalized message
      status: status.status // SENT or FAILED
    }));

    const audienceSize = customermsgstatus.length;
    const numberSent = customermsgstatus.filter(status => status.status === 'SENT').length;
    const numberFailed = audienceSize - numberSent;

    const newCampaign = new CampaignLog({
      campaignName: segmentName,
      segmentName,
      message: msg,
      deliveryStatus,
      audienceSize,
      numberSent,
      numberFailed
    });
    await newCampaign.save();
    res.status(201).json({ message: 'Delivery status updated' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
  