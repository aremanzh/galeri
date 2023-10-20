export default function extractFileName(url) {
    const parts = url.split("/images/");
    if (parts.length > 1) {
        const selectedString = parts[1].replace(/\s/g, ''); // Remove all white spaces
        return selectedString;
    }
    return null; // Return null if "/images/" is not found in the URL
  }