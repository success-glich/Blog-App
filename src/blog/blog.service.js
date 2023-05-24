const mongoose = require("mongoose");

class BlogService {
  Blog;
  constructor(Blog) {
    this.Blog = Blog;
  }

  async getAllBlogs() {
    try {
      const blogs = await this.Blog.find({}).populate("user");

      return { blogs };
    } catch (error) {
      throw new Error(error);
    }
  }
  async insertBlog({ title, description, image, id }) {
    try {
      const newBlog = await new this.Blog({
        title,
        description,
        image,
        user: id,
      }).save();

      return { newBlog };
    } catch (error) {
      throw new Error(error);
    }
  }
  async getBlogById(id) {
    try {
      const blog = await this.Blog.findById(id);
      return { blog };
    } catch (error) {
      throw new Error(error);
    }
  }
  async updateBlog(id, payload) {
    try {
      const updatedBlog = await this.Blog.findByIdAndUpdate(
        id,
        { ...payload },
        { new: true }
      );
      return { updatedBlog };
    } catch (error) {
      throw error;
    }
  }
  async deleteBlog(id) {
    try {
      const deletedBlog = await this.Blog.findByIdAndDelete(id);

      return { deletedBlog };
    } catch (error) {
      throw error;
    }
  }
  async getUserBlog(id) {
    try {
      const blogs = await this.Blog.find().populate("user");
      const userBlogs = blogs.filter((blog) => blog?.user._id === id);
      return { userBlogs };
    } catch (error) {
      throw new Error(error);
    }
  }
}

module.exports = BlogService;
