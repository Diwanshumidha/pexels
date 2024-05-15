"use server";

import { checkAuthentication } from "../auth/auth";
import { uploadImage } from "../cloudinary/upload";

export const AddImageToCloudinaryAction = async (formData: FormData) => {
  const isAuthenticated = await checkAuthentication();
  if (!isAuthenticated) {
    return {
      success: false,
      error: "User is Not Authenticated",
      code: "unauthenticated",
    };
  }

  const imageFile = formData.get("imageFile") as File;
  if (!imageFile)
    return {
      success: false,
      error: "Image File is not found",
      code: "other",
    };

  const fileBuffer = await imageFile.arrayBuffer();

  let mime = imageFile.type;
  let encoding = "base64";
  let base64Data = Buffer.from(fileBuffer).toString("base64");
  let fileUri = "data:" + mime + ";" + encoding + "," + base64Data;

  const images = await uploadImage(fileUri, ["trial"]);
  console.log(images.secure_url);
};
