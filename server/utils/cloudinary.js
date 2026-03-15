const cloudinary = require('cloudinary').v2;
const { Readable } = require('stream');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Upload a file buffer to Cloudinary
 * @param {Buffer} fileBuffer - The file buffer to upload
 * @param {string} originalName - Original filename
 * @param {string} folder - Folder path in Cloudinary (optional)
 * @param {string} resourceType - 'image', 'video', or 'raw' (default: 'auto')
 * @returns {Promise<Object>} Cloudinary upload result
 */
const uploadToCloudinary = async (fileBuffer, originalName, folder = 'uploads', resourceType = 'auto') => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: folder,
        resource_type: resourceType,
        use_filename: true,
        unique_filename: true,
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );

    // Convert buffer to stream
    const stream = Readable.from(fileBuffer);
    stream.pipe(uploadStream);
  });
};

/**
 * Upload a file from multer to Cloudinary
 * @param {Object} file - Multer file object
 * @param {string} folder - Folder path in Cloudinary (optional)
 * @returns {Promise<Object>} Cloudinary upload result with secure_url
 */
const uploadFile = async (file, folder = 'uploads') => {
  try {
    // Determine resource type based on mimetype
    let resourceType = 'auto';
    if (file.mimetype.startsWith('image/')) {
      resourceType = 'image';
    } else if (file.mimetype.startsWith('video/')) {
      resourceType = 'video';
    } else {
      resourceType = 'raw';
    }

    const result = await uploadToCloudinary(file.buffer, file.originalname, folder, resourceType);
    
    return {
      url: result.secure_url,
      publicId: result.public_id,
      resourceType: result.resource_type,
    };
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    throw new Error(`Failed to upload file to Cloudinary: ${error.message}`);
  }
};

/**
 * Delete a file from Cloudinary
 * @param {string} publicId - Cloudinary public ID
 * @param {string} resourceType - 'image', 'video', or 'raw'
 * @returns {Promise<Object>} Deletion result
 */
const deleteFromCloudinary = async (publicId, resourceType = 'image') => {
  try {
    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: resourceType,
    });
    return result;
  } catch (error) {
    console.error('Cloudinary delete error:', error);
    throw new Error(`Failed to delete file from Cloudinary: ${error.message}`);
  }
};

module.exports = {
  uploadFile,
  uploadToCloudinary,
  deleteFromCloudinary,
  cloudinary,
};
