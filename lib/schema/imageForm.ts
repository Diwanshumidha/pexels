import { z } from "zod";

const AllowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
const MAX_SIZE = 5 * 1024 * 1024; // 5MB

const ImageSchema = z
  .custom<File>(
    (arg) => {
      return arg instanceof File;
    },
    { message: "Image is Required" }
  )
  .refine((arg) => AllowedTypes.includes(arg.type), {
    message: `Allowed Types are ${AllowedTypes.join(", ")} `,
  })
  .refine((arg) => arg.size <= MAX_SIZE, {
    message: `Max Size of a file is ${MAX_SIZE / (1024 * 1024)} MB`,
  });

export const ImageFormSchema = z.object({
  image: ImageSchema,
  name: z.string().min(2).max(100),
  description: z.string().min(2).max(300),
  tags: z
    .string()
    .array()
    .max(6)
    .min(1, { message: "Please Put At least 1 Tags" }),
});

export type ImageFormSchemaType = z.infer<typeof ImageFormSchema>;
