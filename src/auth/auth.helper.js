const bcrypt = require("bcryptjs");
const SALT_ROUND = 10;
module.exports = {
  hash: async (plainText) => {
    return new Promise((resolve, reject) => {
      const salt = bcrypt.genSaltSync(SALT_ROUND);
      bcrypt.hash(plainText, salt, (err, hash) => {
        if (err) {
          reject(err);
        }
        resolve(hash);
      });
    });
  },
  compareHash: async (plainText, hash) => {
    return new Promise((resolve, reject) => {
      bcrypt.compare(plainText, hash, (err, data) => {
        if (err) {
          reject(err);
        }
        if (data) {
          resolve(true);
        }
      });
    });
  },
};
