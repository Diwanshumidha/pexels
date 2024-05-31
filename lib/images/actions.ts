"use server";
import { db } from "@/prisma/prisma";
import { checkAuthentication } from "../auth/auth";
import { uploadImage } from "../cloudinary/upload";
import { ImageFormSchema } from "../schema/imageForm";
import { FileToUri, safeJSONParse } from "../utils";
import { ERROR_CODES, ERROR_CODES_TYPE } from "../constant";
import { revalidatePath } from "next/cache";

type Return_Type =
  | { success: true }
  | { success: false; error: string; code: ERROR_CODES_TYPE };

export const AddImageToCloudinaryAction = async (
  formData: FormData
): Promise<Return_Type> => {
  try {
    const UserId = await checkAuthentication();
    if (!UserId) {
      return {
        success: false,
        error: "User is Not Authenticated",
        code: ERROR_CODES.UNAUTHENTICATED,
      };
    }

    const user = await db.user.findUnique({
      where: { id: UserId },
      include: { _count: true },
    });

    if (!user) {
      return {
        success: false,
        error: "User is Not Found",
        code: ERROR_CODES.UNAUTHENTICATED,
      };
    }

    if (user._count.images + 1 > user.imagesAllowed) {
      return {
        success: false,
        error: "User has reached the limit of images",
        code: ERROR_CODES.LIMIT_REACHED,
      };
    }

    const image = formData.get("image") as File;
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const tags = safeJSONParse(formData.get("tags") as string, []);

    const { success, data, error } = ImageFormSchema.safeParse({
      image,
      name,
      description,
      tags,
    });

    if (!success) {
      return {
        success: false,
        error: `Invalid Payload: ${error.format()}`,
        code: ERROR_CODES.INVALID_PAYLOAD,
      };
    }

    const ImageUri = await FileToUri(data.image);

    const images = await uploadImage(ImageUri, data.tags);

    await db.image.create({
      data: {
        description: data.description,
        name: data.name,
        image: images.secure_url,
        imageId: images.public_id,
        tags: images.tags,
        User: { connect: { id: UserId } },
      },
    });

    return { success: true };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: `Something Went Wrong`,
      code: ERROR_CODES.UNKNOWN_ERROR,
    };
  }
};

export const LikeImageAction = async (
  imageId: string
): Promise<Return_Type> => {
  try {
    if (!imageId) {
      return {
        success: false,
        error: `Invalid Payload`,
        code: ERROR_CODES.INVALID_PAYLOAD,
      };
    }

    const UserId = await checkAuthentication();
    if (!UserId) {
      return {
        success: false,
        error: "User is Not Authenticated",
        code: ERROR_CODES.UNAUTHENTICATED,
      };
    }

    const image = await db.user.update({
      where: { id: UserId },
      data: {
        likedImages: {
          connect: { id: imageId },
        },
      },
    });

    revalidatePath("/");
    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      error: `Something Went Wrong`,
      code: ERROR_CODES.UNKNOWN_ERROR,
    };
  }
};

export const DislikeImageAction = async (
  imageId: string
): Promise<Return_Type> => {
  try {
    if (!imageId) {
      return {
        success: false,
        error: `Invalid Payload`,
        code: ERROR_CODES.INVALID_PAYLOAD,
      };
    }

    const UserId = await checkAuthentication();
    if (!UserId) {
      return {
        success: false,
        error: "User is Not Authenticated",
        code: ERROR_CODES.UNAUTHENTICATED,
      };
    }

    const image = await db.user.update({
      where: { id: UserId },
      data: {
        likedImages: {
          disconnect: { id: imageId },
        },
      },
    });

    revalidatePath("/");
    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      error: `Something Went Wrong`,
      code: ERROR_CODES.UNKNOWN_ERROR,
    };
  }
};

export const AddImageToSavedAction = async (imageId: string) => {
  try {
    if (!imageId) {
      return {
        success: false,
        error: `Invalid Payload`,
        code: ERROR_CODES.INVALID_PAYLOAD,
      };
    }

    const UserId = await checkAuthentication();
    if (!UserId) {
      return {
        success: false,
        error: "User is Not Authenticated",
        code: ERROR_CODES.UNAUTHENTICATED,
      };
    }

    await db.user.update({
      where: { id: UserId },
      data: {
        savedImages: {
          connect: { id: imageId },
        },
      },
    });

    revalidatePath("/");
    return { success: true };
  } catch (err) {
    return {
      success: false,
      error: `Something Went Wrong`,
      code: ERROR_CODES.UNKNOWN_ERROR,
    };
  }
};

export const RemoveImageFromSavedAction = async (imageId: string) => {
  try {
    if (!imageId) {
      return {
        success: false,
        error: `Invalid Payload`,
        code: ERROR_CODES.INVALID_PAYLOAD,
      };
    }
    const UserId = await checkAuthentication();
    if (!UserId) {
      return {
        success: false,
        error: "User is Not Authenticated",
        code: ERROR_CODES.UNAUTHENTICATED,
      };
    }

    await db.user.update({
      where: { id: UserId },
      data: {
        savedImages: {
          disconnect: { id: imageId },
        },
      },
    });
    revalidatePath("/");

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: `Something Went Wrong`,
      code: ERROR_CODES.UNKNOWN_ERROR,
    };
  }
};
