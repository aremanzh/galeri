export default function truncateTitle(title, len) {
    var truncate = title.slice(0, Math.min(title.length, len)) + (title.length > len ? "..." : "");
    return truncate;
}