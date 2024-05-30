import { ERROR_CODES_TYPE } from "@/lib/constant";
import { useLimitModal } from "@/lib/modal/LimitModal";
import { signIn } from "next-auth/react";
import { toast } from "sonner";

export const useActionError = () => {
  const { openModal } = useLimitModal();
  const handleErrorResponse = (code: ERROR_CODES_TYPE) => {
    switch (code) {
      case "unauthenticated":
        signIn();
        break;
      case "limit_reached":
        openModal();
        break;
      case "invalid_payload":
        toast.error("There Was an Issue", {
          description: "Please Try Again",
        });
        break;
      case "unknown_error":
        toast.error("There Was an Issue", {
          description: "Please Try Again",
        });
        console.error("An Error Occurred");
        break;

      default:
        console.error("An Error Occurred");
        toast.error("There Was an Issue", {
          description: "Please Try Again",
        });
    }
  };

  return { handleErrorResponse };
};
