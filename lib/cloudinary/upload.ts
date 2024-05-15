import "server-only";
import { v2 as cloudinary } from "cloudinary";

const cldConfig = cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export const uploadImage = async (fileUri: string, tags: string[]) => {
  const upload = await cloudinary.uploader.upload(fileUri, {
    upload_preset: "ml_default",
    tags,
  });
  
  return upload;
};
