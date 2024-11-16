// controllers/audienceController.js
const communicationsLog = require('../models/communicationsLog');
const Customer = require('../models/customer');

// Example conditions
exports.createAudienceSegment = async (req, res) => {
  try {
    const { name, totalSpending, visits,  lastVisit} = req.body; // Assume conditions is an array of filters (AND/OR logic)
    
    let query = {};

    if (totalSpending) {
      query.totalSpending = { $gt: totalSpending };
    }
    if (visits) {
      query.numberOfVisits = { $lte: visits };
    }
    if (lastVisit) {
      query.lastVisit = { $gt: lastVisit };
    }

    const audience = await Customer.find(query);
    const segmentname = name;

    const segment = await communicationsLog.findOne({ segmentname });
    if (segment) return res.status(400).json({ message: 'segment already exists' });

    const newSegment = new communicationsLog({ segmentname,audience });
    await newSegment.save();
    res.status(200).json({ msg : "segment created", audienceSize: audience.length });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


exports.getSegments = async (req, res) => {
  try {
    const logs = await communicationsLog.find({});
    res.status(200).json(logs);
  } catch (error) {
    console.error('Error fetching communications logs:', error);
    res.status(500).json({ error: 'An error occurred while fetching communications logs' });
  }
};
