import { Request, Response } from "express";
import cloudinary from "../config/cloudinary.config";
import fs from "fs";

export const getImage = async (req: Request, res: Response) => {
    const sort = req.query.sort;
    try {
        const { limit = 30 } = req.query;
        const result = await cloudinary.search
            .expression("folder:indecovietnam")
            .sort_by("created_at", sort === "asc" ? "asc" : "desc")
            .max_results(Number(limit))
            .execute();
        res.status(200).json({
            success: true,
            message: "Successfully fetched image",
            data: result.resources.map((img: any) => ({
                url: img.secure_url,
                public_id: img.public_id,
                format: img.format,
            })),
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Get image failed",
            error,
        });
    }
};

export const uploadImage = async (
    req: Request & { file?: Express.Multer.File & { path: string } },
    res: Response
) => {
    try {
        if (!req.file) {
            res.status(400).json({
                success: false,
                message: "File is required",
            });
            return;
        }

        const results = await cloudinary.uploader.upload(req.file.path, {
            folder: "indecovietnam",
        });

        fs.unlinkSync(req.file.path);

        res.status(200).json({
            success: true,
            data: {
                url: results.secure_url,
                public_id: results.public_id,
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Upload failed",
            error,
        });
    }
};

export const deleteImage = async (req: Request, res: Response) => {
    try {
        const { publicId } = req.query;
        if(!publicId) {
            res.status(400).json({
                success: false,
                message: "Public id is required",
            });
            return;
        }
        const result = await cloudinary.uploader.destroy(publicId as string);
        res.status(200).json({
            success: true,
            data: result,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Delete failed",
            error,
        });
    }
}

export const deleteImageMulti = async (req: Request, res: Response) => {
    try {
        const publicIds = req.body;
        const result = await cloudinary.api.delete_resources(publicIds as string[]);
        res.status(200).json({
            success: true,
            data: result,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Delete failed",
            error,
        });
    }
}
