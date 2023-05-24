const User = require("../users/user");

const AuthService = require("./auth.services");

module.exports = new AuthService(User);
