const multer = require('multer');
const multerS3 = require('multer-s3');
const { S3 } = require('@aws-sdk/client-s3');

// Use environment variables for sensitive data
const s3 = new S3({
  region: process.env.AWS_REGION || 'ap-south-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY ,
  },
});

// Configure multerS3 storage
const storage = multerS3({
  s3: s3,
  bucket: process.env.AWS_BUCKET_NAME 
  metadata: function (req, file, cb) {
    cb(null, { fieldName: file.fieldname });
  },
  contentType: multerS3.AUTO_CONTENT_TYPE, // Automatically sets the correct Content-Type
  acl: 'public-read', // Ensures the file is accessible publicly
  key: function (req, file, cb) {
    const fileName = `${Date.now()}_${file.originalname.replace(/\s+/g, '_')}`; // Ensures no spaces in the file name
    cb(null, fileName);
  },
});

// Configure multer instance
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // Limit file size to 5 MB
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only .jpeg, .png, and .gif formats are allowed!'));
    }
  },
});

module.exports = upload;
