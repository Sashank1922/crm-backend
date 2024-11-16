const Customer = require('../models/customer');

exports.addCustomer = async (req, res) => {
  try {
    const { name, email, phone,  totalSpending,numberOfVisits,lastVisit} = req.body;
    const customer = await Customer.findOne({ email });
    if (customer) return res.status(400).json({ message: 'Customer already exists' });

    const newCustomer = new Customer({ name, email, phone, totalSpending, numberOfVisits, lastVisit });
    await newCustomer.save();
    res.status(201).json({ message: 'Customer added successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};



