import { Request, Response } from 'express';
import cloudinary from '../utils/cloudinary';
import * as dotenv from 'dotenv';
import upload from '../middleware/multer';


dotenv.config();

const { PORT } = process.env;

export const fileUpload = async (req: Request, res: Response) => {
  try {
    // Middleware de carga de archivos
    upload.single('myFile')(req, res, async function (err) {
      if (err) {
        console.error(err);
        return res.status(500).send(err.message);
      }

      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: 'No file uploaded',
        });
      }

      try {
        const result = await cloudinary.uploader.upload(req.file.path); // Subir a Cloudinary

        res.status(200).json({
          success: true,
          message: 'Uploaded!',
          data: result,
        });
      } catch (cloudinaryError) {
        console.error(cloudinaryError);
        return res.status(500).json({
          success: false,
          message: 'Error uploading to Cloudinary',
        });
      }
    });
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      res.status(500).send(error.message);
    } else {
      res.status(500).send('An unknown error occurred.');
    }
  }
};
