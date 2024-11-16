const CommunicationsLog = require('../models/communicationsLog');
const Campaigns = require('../models/campaignLog')
const axios = require('axios');

exports.sendCampaign = async (req, res) => {
  try {
    const { segmentname } = req.body;

    // Fetch the audience by segment name
    const segment = await CommunicationsLog.findOne({ segmentname });
    if (!segment) {
      return res.status(404).json({ message: 'Segment not found' });
    }

    const messages = [];

    for (const customer of segment.audience) {
      // Generate a personalized message for each customer
      const personalizedMessage = `Hi ${customer.name}, here’s 10% off on your next order!`;

      // Dummy message sending simulation (e.g., log message to console)
      console.log(`Sending message to ${customer.email}: ${personalizedMessage}`);

      // Generate a random delivery status
      const deliveryStatus = Math.random() < 0.9 ? 'SENT' : 'FAILED';

       // Add message info to the array to store in the database later
       messages.push({
        customerId: customer._id,
        customerName: customer.name,
        message: personalizedMessage,
        status: deliveryStatus,
      });

       // Call the Delivery Receipt API
    }
    await axios.post('http://localhost:3000/api/delivery-receipt', {
      segmentName: segmentname,
      msg: "Hi, 10% off on your next order!",
      customermsgstatus: messages,
    });
    res.status(201).json({ message: 'Campaign sent successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCampaigns = async (req, res) => {
  try {
    const logs = await Campaigns.find({});
    res.status(200).json(logs);
  } catch (error) {
    console.error('Error fetching campaign logs:', error);
    res.status(500).json({ error: 'An error occurred while fetching campaign logs' });
  }
};


