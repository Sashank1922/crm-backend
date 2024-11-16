const Order = require('../models/order');

exports.addOrder = async (req, res) => {
  try {
    const { customerId, orderAmount } = req.body;

    const order = await Order.findOne({ customerId });
    if (!order) {
      const newOrder = new Order({ customerId, orders: [{ orderAmount }] });
      await newOrder.save();
    } else {
      order.orders.push({ orderAmount });
      await order.save();
    }
    res.status(201).json({ message: 'Order added successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
