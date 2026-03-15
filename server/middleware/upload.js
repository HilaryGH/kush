const multer = require('multer');
const path = require('path');
const { uploadFile } = require('../utils/cloudinary');

// Use memory storage to get file buffers for Cloudinary
const storage = multer.memoryStorage();

// File filter
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|pdf|doc|docx|mp4|mov|avi|webm|mkv/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only images, PDFs, documents, and videos are allowed.'));
  }
};

// Configure multer with memory storage
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 100 * 1024 * 1024 // 100MB
  },
  fileFilter: fileFilter
});

/**
 * Middleware to upload files to Cloudinary after multer processing
 * @param {string} folder - Cloudinary folder path (optional)
 */
const uploadToCloudinary = (folder = 'uploads') => {
  return async (req, res, next) => {
    try {
      // Process single file
      if (req.file) {
        const result = await uploadFile(req.file, folder);
        req.file.cloudinaryUrl = result.url;
        req.file.publicId = result.publicId;
      }

      // Process multiple files
      if (req.files) {
        for (const field in req.files) {
          if (Array.isArray(req.files[field])) {
            for (const file of req.files[field]) {
              const result = await uploadFile(file, folder);
              file.cloudinaryUrl = result.url;
              file.publicId = result.publicId;
            }
          } else {
            const result = await uploadFile(req.files[field], folder);
            req.files[field].cloudinaryUrl = result.url;
            req.files[field].publicId = result.publicId;
          }
        }
      }

      next();
    } catch (error) {
      console.error('Cloudinary upload error:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to upload file(s) to Cloudinary',
        error: error.message
      });
    }
  };
};

// Export for backward compatibility
module.exports = upload;
module.exports.upload = upload;
module.exports.uploadToCloudinary = uploadToCloudinary;
