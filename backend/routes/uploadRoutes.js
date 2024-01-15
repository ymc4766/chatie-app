import path from "path";
import express from "express";
import multer from "multer";

const router = express.Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/");
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

function fileFilter(req, file, cb) {
  const filetypes = /jpe?g|png|webp/;
  const mimetypes = /image\/jpe?g|image\/png|image\/webp/;

  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = mimetypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error("Images only!"), false);
  }
}

export const fileSizeFormatter = (bytes, decimal) => {
  if (bytes === 0) {
    return "0 Bytes";
  }
  const dm = decimal || 2;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "YB", "ZB"];
  const index = Math.floor(Math.log(bytes) / Math.log(1000));
  return (
    parseFloat((bytes / Math.pow(1000, index)).toFixed(dm)) + " " + sizes[index]
  );
};

export const upload = multer({ storage, fileFilter });
const uploadSingleImage = upload.single("image");

router.post("/", (req, res) => {
  uploadSingleImage(req, res, async function (err) {
    if (err) {
      return res.status(400).send({ message: err.message });
    }

    try {
      // Upload to Cloudinary
      const uploadedFile = await cloudinary.uploader.upload(req.file.path, {
        folder: "NWS-app",
        resource_type: "image",
      });
      console.log("Uploaded File:", uploadedFile);
      // Remove the locally stored file after successful upload to Cloudinary
      await fs.unlink(req.file.path);

      res.status(200).send({
        message: "Image uploaded successfully",
        image: uploadedFile.secure_url,
      });
    } catch (uploadError) {
      console.error("Error uploading to Cloudinary:", uploadError);
      res.status(500).send({
        error: "Internal Server Error",
        details: uploadError.message,
      });
    }
  });
});

export default router;
