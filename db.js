const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://puneeth:Puneeth%40123@cluster0.mgjwp.mongodb.net/CAM?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch((error) => console.error('MongoDB connection error:', error));

module.exports = mongoose;