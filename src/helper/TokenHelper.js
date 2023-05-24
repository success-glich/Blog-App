const { JWT_SECRET } = require("../config/vars");
const jwt = require("jsonwebtoken");

const TokenHelper = {
  generateToken: async (payload, option = { expiresIn: "7d" }) => {
    try {
      const token = jwt.sign(payload, JWT_SECRET, { ...option });
      return token;
    } catch (err) {
      return err.message;
    }
  },
  verifyToken: async (token) => {
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      return { loggedInUser: decoded };
    } catch (error) {
      return error.message;
    }
  },
};
module.exports = TokenHelper;
