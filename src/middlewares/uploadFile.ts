// upload with multer
import multer from "multer";

const storage = multer.memoryStorage(); // Use memory storage
const upload = multer({ storage });

export default upload;
