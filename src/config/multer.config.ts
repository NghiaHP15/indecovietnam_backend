import multer from 'multer';
import path from 'path';
import fs from "fs";

// Tạo thư mục tmp nếu chưa tồn tại
const tmpDir = path.join(process.cwd(), "tmp");
if (!fs.existsSync(tmpDir)) {
  fs.mkdirSync(tmpDir);
}

// Lưu file vào thư mục tạm trước khi upload lên Cloudinary
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, tmpDir);
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname)); // VD: 16922342342.png
    }
});

const upload = multer({ storage });

export default upload;