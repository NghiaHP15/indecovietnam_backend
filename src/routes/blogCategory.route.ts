import { Router } from "express";
import * as blogCategoryController from "../controllers/blogCategory.controller";
import { authAdminMiddleware } from "../middlewares/authAdmin.middleware";

const router = Router();

router.get("/", blogCategoryController.getAllBlogCategories);
router.get("/:id", blogCategoryController.getBlogCategoryById);
router.post("/", authAdminMiddleware, blogCategoryController.createBlogCategory);
router.put("/:id", authAdminMiddleware, blogCategoryController.updateBlogCategory);
router.delete("/:id", authAdminMiddleware, blogCategoryController.deleteBlogCategory);

export default router;