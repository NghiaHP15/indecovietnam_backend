import { Router } from "express";
import * as blogController from "../controllers/blog.controller";

const router = Router();

router.get("/", blogController.getAllBlogs);
router.get("/:id", blogController.getBlogById);
router.get("/slug/:slug", blogController.getBlogBySlug);
router.post("/", blogController.createBlog);
router.put("/:id", blogController.updateBlog);
router.delete("/:id", blogController.deleteBlog);

export default router;