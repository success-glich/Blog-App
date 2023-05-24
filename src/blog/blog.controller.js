const User = require("../users/user");
const blogService = require("./");
const mongoose = require("mongoose");
const BlogController = {
  getAllBlog: async (req, res) => {
    //some business logic
    try {
      const { blogs } = await blogService.getAllBlogs();

      return res.status(200).json({
        success: true,
        blogCount: blogs.length,
        msg: "fetch blog successfully",
        blogs,
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        msg: "there was some error to fetch blogs",
        error: error.message,
      });
    }
  },
  createBlog: async (req, res) => {
    const { title, description, image } = req.body;
    const { _id } = req.user;
    if (!title || !description || !image) {
      return res.status(400).json({
        success: false,
        msg: "all field is required",
      });
    }
    try {
      const { newBlog } = await blogService.insertBlog({
        title,
        description,
        image,
        id: _id,
      });

      return res.status(201).json({
        success: true,
        msg: "Blog Created",
        newBlog,
      });
    } catch (error) {
      console.log(error);
      return res.status(400).json({
        success: false,
        msg: "there was some error to create a blog",
        error: error.message,
      });
    }
  },
  getBlogById: async (req, res) => {
    const { id } = req.params;
    try {
      const { blog } = await blogService.getBlogById(id);

      return res.status(200).json({
        success: true,
        msg: "fetch blog by id",
        blog,
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        msg: "there was some error to fetch a blog",
        error: error.message,
      });
    }
  },
  uploadBlog: async (req, res) => {
    const { id } = req.params;
    const { title, description, image } = req.body;
    try {
      const { updatedBlog } = await blogService.updateBlog(id, {
        title,
        description,
        image,
      });
      return res.status(200).json({
        success: true,
        updatedBlog,
        msg: "blog updated successfully",
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        msg: "Error While updating blog",
        error: error.message,
      });
    }
  },
  deleteBlog: async (req, res) => {
    const { id } = req.params;
    try {
      const { deleteBlog } = await blogService.deleteBlog(id);
      return res.status(200).json({
        success: true,
        msg: "Blog deleted successfully",
        deleteBlog,
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        msg: "Error While deleting blog",
      });
    }
  },
  getUserBlog: async (req, res) => {
    const { id } = req.params;

    try {
      const { userBlogs } = await blogService.getUserBlog(id);
      return res.status(200).json({
        success: true,
        blogLength: userBlogs.length,
        userBlog: userBlogs,
        msg: "User's Blog fetched successfully",
      });
    } catch (err) {
      return res.status(400).json({
        success: false,
        msg: "Error while fetching user's blog",
        error: err.message,
      });
    }
  },
};

module.exports = BlogController;
