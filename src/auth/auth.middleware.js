const TokenHelper = require("../helper/TokenHelper");
const User = require("../users/user");
const AuthMiddleware = {
  verifyUser: async (req, res, next) => {
    const bearerToken = req.headers.authorization;
    if (!bearerToken) {
      return res.status(401).json({
        success: false,
        msg: "Bearer token not provided",
      });
    }
    const [bearer, token] = bearerToken.split(" ");
    if (bearer !== "Bearer") {
      return res.status(401).json({
        success: false,
        msg: "Bearer token not provided",
      });
    }
    try {
      const {
        loggedInUser: { _id: id },
      } = await TokenHelper.verifyToken(token);

      const user = await User.findOne({ _id: id }, "-password");
      req.user = user;
      next();
    } catch (err) {
      console.log(err);
      return res.status(401).json({
        success: false,
        msg: err.msg,
      });
    }
  },
  checkAdmin: async (req, res, next) => {
    const { user } = req;
    if (user.role !== "ADMIN") {
      return res.status(403).json({
        msg: "NOT PERMITTED TO ADD RESOURCES",
      });
    }
  },
  // indicates that the server understands the request but refuses to authorize it.
};

module.exports = AuthMiddleware;
