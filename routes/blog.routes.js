import express from "express";
import {
  addBlog,
  deleteBlog,
  getAllBlogs,
  getBlog,
  getByUserId,
  updateBlog,
} from "../controllers/blog.controller.js";
const router = express.Router();

router.get("/", getAllBlogs);
router.post("/add", addBlog);
router.put("/update/:id", updateBlog);
router.get("/:id", getBlog);
router.delete("/delete/:id", deleteBlog);
router.get("/userBlogs/:id", getByUserId);

export default router;
