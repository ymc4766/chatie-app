// import multer from "multer";

// // Define file storage
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads");
//   },
// });

// // Specify file format that can be saved
// function fileFilter(req, file, cb) {
//   if (
//     file.mimetype === "image/png" ||
//     file.mimetype === "image/jpg" ||
//     file.mimetype === "image/jpeg"
//   ) {
//     cb(null, true);
//   } else {
//     cb(null, false);
//   }
// }

// // You can always pass an error if something goes wrong:
// //   cb(new Error("I don't have a clue!"));

// const generateFileName = (file) => {
//   const timestamp = new Date().toISOString().replace(/:/g, "-");
//   return `${file.originalname}`;
// };

// const upload = multer({
//   storage,
//   fileFilter,
//   filename: function (req, file, cb) {
//     cb(null, generateFileName(file));
//   },
// });

// export default upload;
