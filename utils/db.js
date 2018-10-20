const mongoose = require('mongoose');
const dbURI = process.env.MONGODB || `mongodb://localhost/${process.env.npm_package_name}`

module.exports = {
  connect() {
    let connection = mongoose.connect(dbURI, { useNewUrlParser: true });
    mongoose.connection.on('error', function(error) {
      console.error(error.message);
    });
    mongoose.connection.on('connected', function() {
      console.log(`Mongoose connected URI: ${dbURI}`);
    });
    mongoose.connection.on('disconnected', function() {
      console.log(`Mongoose disconnected URI: ${dbURI}`);
    });
    process.on('SIGINT', function() {
      mongoose.connection.close(function() {
        process.exit(0);
      });
    });
  }
};
