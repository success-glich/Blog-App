const authService = require("./");
const AuthController = {
  loginUser: async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({
        msg: "All field is required",
      });
    }
    //some business login
    try {
      const { loggedInUser, token } = await authService.attemptLogin(
        username,
        password
      );
      return res.status(200).json({
        success: true,
        user: loggedInUser,
        BearerToken: token,
        msg: "Login successfully",
      });
    } catch (error) {
      return res.status(401).json({
        success: false,
        msg: "Not Authenticated",
        error: error.message,
      });
    }
  },
  registerUser: async (req, res) => {
    const { username, email, password } = req.body;
    try {
      const registerUser = await authService.registerUser({
        username,
        email,
        password,
      });
      return res.status(201).json({
        success: true,
        msg: "User created successfully",
        user: registerUser,
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        msg: "there was some error to connect user",
        error: error.message,
      });
    }
  },
};
module.exports = AuthController;
