const { verifyUser } = require("../auth/auth.middleware");
const BlogController = require("./blog.controller");

const blogRouter = require("express").Router();

blogRouter.get("/all-blog", BlogController.getAllBlog);
blogRouter.get("/user-blog/:id", BlogController.getUserBlog);
blogRouter.get("/get-blog/:id", BlogController.getBlogById);
blogRouter.post("/create-blog", verifyUser, BlogController.createBlog);
blogRouter.put("/update-blog/:id", BlogController.uploadBlog);
blogRouter.delete("/delete-blog/:id", BlogController.deleteBlog);

module.exports = blogRouter;
