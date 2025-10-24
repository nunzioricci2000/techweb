import multer from "@koa/multer";

console.debug("Loading Multipart Parser Middleware");

const parseMultipart = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 16 * 1024 * 1024,
  },
});

export default parseMultipart;

console.debug("Multipart Parser Middleware loaded");
