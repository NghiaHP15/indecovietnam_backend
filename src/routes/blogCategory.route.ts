import { Router } from "express";
import * as blogCategoryController from "../controllers/blogCategory.controller";
import { authMiddleware } from "../middlewares/authCutomer.middleware";

const router = Router();

router.get("/", blogCategoryController.getAllBlogCategories);
router.get("/:id", blogCategoryController.getBlogCategoryById);
router.post("/", authMiddleware, blogCategoryController.createBlogCategory);
router.put("/:id", authMiddleware, blogCategoryController.updateBlogCategory);
router.delete("/:id", authMiddleware, blogCategoryController.deleteBlogCategory);

export default router;