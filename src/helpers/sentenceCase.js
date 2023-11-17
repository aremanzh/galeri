export default function sentenceCase(str, len = 50) {
    if (!str) {
        return ""
    }

    var truncate = str.slice(0, Math.min(str.length, len)) + (str.length > len ? "..." : "");
    
    var style = truncate.toLowerCase().replace(/\b\w/g, s => s.toUpperCase());

    return style;
    
  }

  

  