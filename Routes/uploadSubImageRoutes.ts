import { Router, Request, Response } from "express";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";
import dotenv from "dotenv";

dotenv.config();

const router = Router();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const upload = multer({ storage: multer.memoryStorage() });

// ✅ MULTIPLE IMAGE UPLOAD
router.post("/", upload.array("images", 5), async (req: Request, res: Response) => {
  try {
    const files = req.files as Express.Multer.File[];

    if (!files || files.length === 0) {
      return res.status(400).json({ message: "No files uploaded" });
    }

    const uploadToCloudinary = (buffer: Buffer) => {
      return new Promise<string>((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "your-project-name" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result!.secure_url);
          }
        );
        streamifier.createReadStream(buffer).pipe(stream);
      });
    };

    // ✅ Upload all images in parallel
    const imageUrls = await Promise.all(
      files.map(file => uploadToCloudinary(file.buffer))
    );

    // ✅ Send all URLs
    res.json({ imageUrls });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Cloudinary upload failed" });
  }
});

export default router;