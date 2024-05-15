import { z } from "zod";

const AllowedTypes = ["image/apng", "image/jpeg", "image/png", "image/webp"];
// 6Mb Max Limit
const MAX_SIZE = 6;

const ImageSchema = z
  .instanceof(File)
  .refine((arg) => AllowedTypes.includes(arg.type), {
    message: `Allowed Types are ${AllowedTypes.join(", ")} `,
  })
  .refine((arg) => arg.size <= MAX_SIZE, {
    message: `Max Size of A Image is ${MAX_SIZE}`,
  });

export const ImageFormSchema = z.object({
  image: ImageSchema,
  name: z.string().min(2).max(100),
  description: z.string().min(2).max(1000),
  tags: z.string().array().max(6).min(1),
});
