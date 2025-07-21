import type { FileResponse } from "../common/types/fileResponseType.type";

export const getBase64ImageUrl = (
  file?: FileResponse | null,
  fallback: string = "/src/assets/images/default_profile.webp"
): string => {
  if (!file || !file.base64String) {
    return fallback;
  }

  return `data:${file.mimeType};base64,${file.base64String}`;
};
