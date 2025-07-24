export const getFileTypeFromUrl = (url: string): string => {
    try {
      const cleanPath = url.split('?')[0];
      const extension = cleanPath.split('.').pop()?.toLowerCase() || '';
      return extension;
    } catch {
      return '';
    }
  };
  