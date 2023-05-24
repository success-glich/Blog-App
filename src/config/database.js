const mongoose = require("mongoose");
const { MONGODB_URL } = require("./vars");

class Connection {
  connectTodDB() {
    throw new Error("Cannot implement this method on parent class");
  }
}

class MongoConnection extends Connection {
  async connectTodDB() {
    await mongoose.connect(MONGODB_URL);
  }
}
class MySqlConnection extends Connection {
  async connectTodDB() {
    return "Connected MYsql Successfully";
  }
}

module.exports = { MongoConnection, MySqlConnection };
