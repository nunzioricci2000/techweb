import multer from "@koa/multer";

const parseMultipart = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 16 * 1024 * 1024,
  },
});

export default parseMultipart;
