import { Prisma } from "@prisma/client";

export type ImageWithUser = Prisma.ImageGetPayload<{
  include: {
    User: {
      select: {
        image: true;
        name: true;
      };
    };
  };
}>;
