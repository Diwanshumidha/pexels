"use server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { FileToUri } from "../utils";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY!);

// ...

const model = genAI.getGenerativeModel({ model: "gemini-pro" });

async function fileToGenerativePart(file: File) {
  const base64Data = await FileToUri(file, true);

  return {
    inlineData: {
      data: base64Data,
      mimeType: file.type,
    },
  };
}

export async function server_GetDescription(formData: FormData) {
  const image = formData.get("image");
  if (!image || !(image instanceof File)) {
    throw new Error("Invalid image file");
  }
  const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });

  const prompt = "Generate a 2 line description on what you see in the image";

  const imageParts = [await fileToGenerativePart(image)];

  const result = await model.generateContent([prompt, ...imageParts]);
  const response = await result.response;
  const text = response.text();
  return text.trim();
}
