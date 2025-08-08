export const toSlug = (str) =>
  str
    .normalize("NFD")                    // Bỏ dấu tiếng Việt
    .replace(/[\u0300-\u036f]/g, "")     // Loại bỏ ký tự dấu
    .replace(/đ/g, "d")                  // đ -> d
    .replace(/Đ/g, "D")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')                // Thay khoảng trắng bằng dấu -
    .replace(/[^\w-]/g, '');  