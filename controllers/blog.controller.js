import Blog from "../models/blog.js";
import User from "../models/user.js";

export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    if (!blogs) {
      return res.status(404).json({
        message: "No Blogs Found",
      });
    }
    return res.status(200).json({ blogs });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const addBlog = async (req, res) => {
  try {
    const { title, description, image, user } = req.body;

    if (!title || !description || !image || !user) {
      return res.status(404).json({
        message: "All fields are required",
      });
    }

    let existingUser = await User.findById(user);
    if (!existingUser) {
      res.status(400).json({
        message: "Unable to find user",
      });
    }

    const blog = new Blog({
      title,
      description,
      image,
      user: existingUser.id,
    });
    await blog.save();

    existingUser.blogs.push(blog);
    await existingUser.save();

    res.status(200).json({ blog });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const updateBlog = async (req, res) => {
  try {
    const { title, description } = req.body;
    const blogId = req.params.id;
    const blog = await Blog.findByIdAndUpdate(blogId, {
      title,
      description,
    });
    blog.save();
    res.status(200).json({ message: "Blog updated", blog });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const getBlog = async (req, res) => {
  try {
    const blogId = req.params.id;
    const blog = await Blog.findById(blogId);

    if (!blog) {
      return res.status(404).json({
        message: "Blog not found",
      });
    }

    res.status(200).json({ blog });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const deleteBlog = async (req, res) => {
  try {
    const blogId = req.params.id;
    const blog = await Blog.findByIdAndDelete(blogId).populate("user");

    const user = await User.findById(blog.user);
    user.blogs.pull(blogId);
    await user.save();

    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const getByUserId = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const blogIds = user.blogs;
    const blogs = await Promise.all(
      blogIds.map(async (id) => await Blog.findById(id))
    );

    res.status(200).json({ user, blogs });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
