import slugify from "slugify";

export const generateSku = (name: string, id: string): string => {
    const prefix = id.slice(0, 3).toUpperCase(); 
    const namePart = name.slice(0, 3).toUpperCase(); 
    const timestamp = Date.now().toString().slice(-5);
    
    return `${prefix}-${namePart}-${timestamp}`;

}
export const generateSlug = (title: string): string => {
  return slugify(title, { lower: true, strict: true, locale: 'vi' });
}

export const generateUUID = (): string => {
  return crypto.randomUUID();
}

export const generateTxnRef = (prefix: string = "PAY", userId?: string) => {
  const now = new Date();

  // yyyyMMddHHmmss
  const timestamp =
    now.getFullYear().toString() +
    String(now.getMonth() + 1).padStart(2, "0") +
    String(now.getDate()).padStart(2, "0") +
    String(now.getHours()).padStart(2, "0") +
    String(now.getMinutes()).padStart(2, "0") +
    String(now.getSeconds()).padStart(2, "0");

  // rút gọn UUID để ngắn gọn
  const newID = userId?.replace(/-/g, "").substring(0, 6).toUpperCase();

  return `${prefix.toUpperCase()}-${timestamp}${userId ? `-${newID}` : ""}`;
}

export const generateNormalized = (str: string) => {
  return str
    .normalize("NFD") // tách dấu
    .replace(/[\u0300-\u036f]/g, "") // xóa dấu
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D");
}