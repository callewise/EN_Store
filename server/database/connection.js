const mongoose = require('mongoose');
const { DB_URI } = require('../config');

// Establish database connection using Mongoose
async function connectToDatabase() {
  try {
    await mongoose.connect(DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    });

    console.log('Connected to the database');
  } catch (error) {
    console.error('Failed to connect to the database:', error);
    process.exit(1);
  }
}

module.exports = connectToDatabase;
