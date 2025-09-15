
import { Application } from "express";
import customerRouter from "./customer.route";
import authCustomerRouter from "./authCutomer.route";
import productCategoryRouter from "./productCategory.route";
import roomCategoryRouter from "./roomCategory.route";
import productRouter from "./product.route";
import productVariantRouter from "./productVariant.route"
import blogCategoryRouter from "./blogCategory.route";
import blogRouter from "./blog.route";
import addressRouter from "./address.route";
import employeeRouter from "./employee.route";
import roleRouter from "./role.route";
import menuRouter from "./menu.route";
import galleryRouter from "./gallery.route";
import settingRouter from "./siteSetting.route";
import orderRouter from "./order.route";
import colorRouter from "./color.route";
import feedbackRouter from "./feedback.route";
import serviceRouter from "./service.route";
import serviceCategoryRouter from "./serviceCategory.route";
import uploadRouter from "./upload.router";
import authEmployeeRouter from "./authEmployee.route"
import notificationRouter from "./notification.route"
import dashboardRouter from "./dashboard.router";
import policyRouter from "./policy.route";


const routes = (app: Application): void => {
    app.use("/api/customer", customerRouter);
    app.use("/api/customer", authCustomerRouter);
    app.use("/api/product-category", productCategoryRouter);
    app.use("/api/room-category", roomCategoryRouter);
    app.use("/api/product", productRouter);
    app.use("/api/product-variant", productVariantRouter);
    app.use("/api/blog-category", blogCategoryRouter);
    app.use("/api/blog", blogRouter);
    app.use("/api/address", addressRouter);
    app.use("/api/employee", employeeRouter);
    app.use("/api/employee", authEmployeeRouter);
    app.use("/api/role", roleRouter);
    app.use("/api/menu", menuRouter);
    app.use("/api/gallery", galleryRouter);
    app.use("/api/setting", settingRouter);
    app.use("/api/order", orderRouter);
    app.use("/api/color", colorRouter);
    app.use("/api/feedback", feedbackRouter);
    app.use("/api/service", serviceRouter);
    app.use("/api/service-category", serviceCategoryRouter);
    app.use("/api/upload", uploadRouter);
    app.use("/api/ws", notificationRouter);
    app.use("/api/dashboard", dashboardRouter);
    app.use("/api/policy", policyRouter);
}

export default routes;