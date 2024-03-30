const express = require("express");
const router = express.Router();

const { auth } = require("../Middleware/Authmiddleware");
const {
  createBlog,
  deleteBlog,
  getAllBlogs,
  getBlogbyId,
  updateBlog,
} = require("../Controller/Blogcontroller");

router.post("/createBlog", auth, createBlog);
router.get("/getblogs", getAllBlogs);
router.get("/getblogs/:id", getBlogbyId);
router.post("/updateblog", auth, updateBlog);
router.delete("/deleteblog", auth, deleteBlog);

module.exports = router;
