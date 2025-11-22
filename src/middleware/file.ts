import multer from 'multer';

const storage = multer.diskStorage(
  
  {
  filename: function (req, file, cb) {
    const ext = file.originalname.split('.').pop();
    const fileName = Date.now();
    cb(null, `${fileName}.${ext}`);
  },
  destination: function (req, file, cb) {
    cb(null, './storage');
  },
});

const multerMiddleware = multer({ storage });

export default multerMiddleware;
