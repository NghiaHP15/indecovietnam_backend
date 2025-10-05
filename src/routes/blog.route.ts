import { Router } from "express";
import * as blogController from "../controllers/blog.controller";
import { authAdminMiddleware } from "../middlewares/authAdmin.middleware";

const router = Router();

router.get("/", blogController.getAllBlogs);
router.get("/:id", blogController.getBlogById);
router.get("/slug/:slug", blogController.getBlogBySlug);
router.post("/", authAdminMiddleware, blogController.createBlog);
router.put("/:id", authAdminMiddleware, blogController.updateBlog);
router.delete("/:id", authAdminMiddleware, blogController.deleteBlog);

export default router;