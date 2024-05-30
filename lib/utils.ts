import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function safeJSONParse<T>(str: string | null, defaultValue: T): T {
  if (str) {
    try {
      return JSON.parse(str);
    } catch (error) {
      console.error("Failed to parse JSON:", error);
    }
  }
  return defaultValue;
}

export async function FileToUri(image: File, getBase64 = false) {
  const fileBuffer = await image.arrayBuffer();
  let mime = image.type;
  let encoding = "base64";
  let base64Data = Buffer.from(fileBuffer).toString("base64");

  if (getBase64) {
    return base64Data;
  }
  let fileUri = "data:" + mime + ";" + encoding + "," + base64Data;
  return fileUri;
}
