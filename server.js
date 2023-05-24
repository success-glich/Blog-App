const { MongoConnection } = require("./src/config/database");
const app = require("./src/config/express");

const { PORT } = require("./src/config/vars");

(async () => {
  try {
    const connection = new MongoConnection();
    await connection.connectTodDB();
    console.log("🙌👏🙌👍");
    app.listen(PORT, () => {
      console.log("Server Listening at PORT", PORT);
    });
  } catch (error) {
    console.log(error);
    console.log("There was some error while connecting to the database");
  }
})();
