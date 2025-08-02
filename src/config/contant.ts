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