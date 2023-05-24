const authHelper = require("./auth.helper");
const TokenHelper = require("../helper/TokenHelper");
class AuthService {
  User;
  constructor(User) {
    this.User = User;
  }
  async attemptLogin(username, password) {
    try {
      console.log(username, password);

      const user = await this.User.findOne({ username });
      if (!user) {
        throw new Error("Authentication failed");
      }

      const isValidPassword = await authHelper.compareHash(
        password,
        user.password
      );
      console.log(isValidPassword);
      const loggedInUser = JSON.parse(JSON.stringify(user));
      delete loggedInUser.password;
      const token = await TokenHelper.generateToken(loggedInUser);
      return {
        loggedInUser,
        token,
      };
    } catch (error) {
      throw new Error(error.msg);
    }
  }
  async registerUser({ username, email, password }) {
    try {
      const user = await this.User.findOne({ username });
      if (user) {
        throw new Error("User already exits");
      }

      // const salt = bcrypt.genSaltSync(SALT_ROUND);
      // const hashedPassword = bcrypt.hashSync(password, salt);
      const hashedPassword = await authHelper.hash(password);
      const newUser = await new this.User({
        username,
        email,
        password: hashedPassword,
      }).save();
      const registerUser = JSON.parse(JSON.stringify(newUser));
      delete registerUser.password;
      return registerUser;
    } catch (error) {
      throw new Error(error);
    }
  }
}

module.exports = AuthService;
