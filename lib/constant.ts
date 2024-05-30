export const ERROR_CODES = {
  UNAUTHENTICATED: "unauthenticated",
  LIMIT_REACHED: "limit_reached",
  INVALID_PAYLOAD: "invalid_payload",
  UNKNOWN_ERROR: "unknown_error",
} as const;
export type ERROR_CODES_TYPE = (typeof ERROR_CODES)[keyof typeof ERROR_CODES];
