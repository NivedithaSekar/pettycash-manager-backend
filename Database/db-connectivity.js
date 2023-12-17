//Required framework/dependencies installation
const dotenv = require('dotenv');
const mongoose = require('mongoose')

//dotenv config() to use the process environment variables declared via process.env.<<var_name>>.
dotenv.config();
const CLOUD_MONGO_URL = process.env.MONGODB_URI



const DbClient = async () => {
    try {
      await mongoose.connect(CLOUD_MONGO_URL,{
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
      console.log('MongoDB connected');
    } catch (error) {
      console.error('MongoDB connection error:', error);
    }
  };

  module.exports = DbClient;