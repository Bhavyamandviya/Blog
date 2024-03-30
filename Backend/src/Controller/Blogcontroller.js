const Blog = require("../Models/Blog");
const User = require("../Models/User");

exports.createBlog = async (req, res) => {
  try {
    const { title, description, category, tags } = req.body;
    const userId = req.user.id;
    if (!title || !description || !category || !tags) {
      return res.status(400).json({
        success: false,
        message: "All Fields are Mandatory",
      });
    }

    const userDetails = await User.findById({ _id: userId });
    console.log("userdetails", userDetails);
    const newBlog = await Blog.create({
      category,
      tags,
      description,
      title,
      createdBy: userId,
    });
    return res.status(200).json({
      success: true,
      data: newBlog,
      message: "Blog created Successfully",
    });
  } catch (error) {
    console.log("Error while blog creation", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong please try again later",
    });
  }
};

exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    return res.status(200).json({
      success: true,
      data: blogs,
    });
  } catch (error) {
    console.log("Error while fetching the blogs", error);
    res.status(500).json({
      success: false,
      msg: "Something went wrong please try again later",
    });
  }
};

exports.getBlogbyId = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({
        success: false,
        msg: "blog not found",
      });
    }
    return res.status(200).json({
      success: true,
      data: blog,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: "Something went wrong please try again later",
    });
  }
};

exports.updateBlog = async (req, res) => {
  try {
    const { blogId, title, description, category, tags } = req.body;
    console.log(blogId);

    const updatedBlog = await Blog.findByIdAndUpdate(
      blogId,
      { title, description, category, tags }, // Group all fields to update in one object
      { new: true } // Return the updated document
    );

    if (!updatedBlog) {
      return res.status(404).json({
        success: false,
        msg: "Blog not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: updatedBlog,
    });
  } catch (error) {
    console.log("Error while updating the blog", error);
    res.status(500).json({
      success: false,
      msg: "Something went wrong please try again later",
    });
  }
};

exports.deleteBlog = async (req, res) => {
  try {
    const { blogId } = req.body;
    const blog = await Blog.findByIdAndDelete(blogId);
    if (!blog) {
      return res.status(404).json({
        success: false,
        msg: "blog not found",
      });
    }
    return res.status(200).json({
      success: true,
      msg: "Blog Deleted Successfully",
    });
  } catch (error) {
    console.log("Delete Error for blog", error);
    res.status(500).json({
      success: false,
      msg: "Something went wrong please try again later",
    });
  }
};
