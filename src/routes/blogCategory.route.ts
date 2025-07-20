import { Router } from "express";
import * as blogCategoryController from "../controllers/blogCategory.controller";

const router = Router();

router.get("/", blogCategoryController.getAllBlogCategories);
router.get("/:id", blogCategoryController.getBlogCategoryById);
router.post("/", blogCategoryController.createBlogCategory);
router.put("/:id", blogCategoryController.updateBlogCategory);
router.delete("/:id", blogCategoryController.deleteBlogCategory);

export default router;