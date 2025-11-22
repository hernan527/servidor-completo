import { v2 as cloudinaryV2 } from 'cloudinary';
import * as dotenv from 'dotenv';
dotenv.config();

const cloudinary = cloudinaryV2;

// 
// 
// 

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

export default cloudinary;
