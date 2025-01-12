import multer from "multer"
import path from "path"
import { Request } from "express"

// Explicitly type the storage variable
const storage = multer.diskStorage({
  destination: (req: Request, file: Express.Multer.File, cb) => {
    // Set the folder where files will be stored
    cb(null, path.join(__dirname, "../../public/movie-images"))
  },
  filename: (req: Request, file: Express.Multer.File, cb) => {
    // Use a timestamp with the original file extension for the filename
    const ext = path.extname(file.originalname)
    cb(null, `${Date.now()}${ext}`)
  },
})

// Define a file filter to allow only specific file types
const fileFilter: multer.Options["fileFilter"] = (req, file, cb) => {
  const allowedMimeTypes = ["image/jpeg", "image/png", "image/gif"]
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true)
  } else {
    cb(new Error("Invalid file type"))
  }
}

// Configure multer
const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // Max file size 5MB
  },
  fileFilter,
})

export default upload
