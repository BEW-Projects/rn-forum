const mongoose = require('mongoose');
const dbURI = process.env.MONGODB || `mongodb://localhost/${process.env.npm_package_name}`;

module.exports = {
  connect() {
    let connection = mongoose.connect(dbURI, { useNewUrlParser: true });
    mongoose.connection.on('error', function(error) {
      console.error(error.message);
    });
    mongoose.connection.on('connected', function() {
      console.log('\x1b[33m%s\x1b[0m', `Mongoose connected URI: ${dbURI}\n`);
    });
    mongoose.connection.on('disconnected', function() {
      console.log('\x1b[31m%s\x1b[0m', `\nMongoose disconnected URI: ${dbURI}`);
    });
    process.on('SIGINT', function() {
      mongoose.connection.close(function() {
        process.exit(0);
      });
    });
  },
  isValidObjectId(t) {
    return mongoose.Types.ObjectId.isValid(t);
  },
  queryToAndDbQuery(q) {
    return {$and: Object.keys(q).map(k=>{return{[k]:q[k]}})};
  }
};
