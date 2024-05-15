import multer from 'multer';
import predictService from './predict.services';
import { Router, Request, Response } from 'express';
import {
  BadRequestException,
  PayloadTooLargeException,
} from '../../common/exceptions';

const upload = multer({
  storage: multer.memoryStorage(),
});

const router = Router();

router.post(
  '/',
  upload.single('image'),
  async (req: Request, res: Response) => {
    if (req.file!.size > 1000000) {
      throw new PayloadTooLargeException();
    }

    try {
      const data = await predictService.predict(req.file!.buffer);
      return res.status(201).json({
        status: 'success',
        message: 'Model is predicted successfully',
        data: data,
      });
    } catch (error) {
      console.log(error);
      throw new BadRequestException(
        'Terjadi kesalahan dalam melakukan prediksi',
      );
    }
  },
);

router.get('/histories', async (req: Request, res: Response) => {});

export default router;
