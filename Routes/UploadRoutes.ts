// import { Router, Request, Response } from "express";
// import multer from "multer";
// import { v2 as cloudinary } from "cloudinary";
// import streamifier from "streamifier";
// import dotenv from "dotenv";

// dotenv.config();

// const router = Router();

// interface MulterRequest extends Request {
//   file?: any;
// }

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME as string,
//   api_key: process.env.CLOUDINARY_API_KEY as string,
//   api_secret: process.env.CLOUDINARY_API_SECRET as string,
// });

// const storage = multer.memoryStorage();
// const upload = multer({ storage });

// router.post(
//   "/",
//   upload.single("image"),
//   async (req: MulterRequest, res: Response) => {
//     try {
//       if (!req.file) {
//         return res.status(400).json({ message: "No file uploaded" });
//       }

//       const streamUpload = (fileBuffer: Buffer) => {
//         return new Promise<any>((resolve, reject) => {
//           const stream = cloudinary.uploader.upload_stream(
//             (error, result) => {
//               if (result) resolve(result);
//               else reject(error);
//             }
//           );

//           streamifier.createReadStream(fileBuffer).pipe(stream);
//         });
//       };

//       const result = await streamUpload(req.file.buffer);

//       res.json({ imageUrl: result.secure_url });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: "Server Error" });
//     }
//   }
// );

// export default router;


// routes/uploadRoutes.ts
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

router.post("/", upload.single("image"), async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const uploadToCloudinary = (buffer: Buffer) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "your-project-name" }, // optional: organizes your images
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        streamifier.createReadStream(buffer).pipe(stream);
      });
    };

    const result: any = await uploadToCloudinary(req.file.buffer);

    res.json({ imageUrl: result.secure_url });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Cloudinary upload failed" });
  }
});

export default router;