const authRouter = require("../auth/auth.routes");
const blogRouter = require("../blog/blog.routes");

const routes = require("express").Router();
routes.use("/auth", authRouter);
routes.use("/blogs", blogRouter);

module.exports = routes;
