import { diskStorage } from 'multer';
import { BadRequestException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

export const imageInterceptor = {
  interceptor: FileInterceptor('image', {
    dest: './uploads/images',
    fileFilter: (
      req: Express.Request,
      file: Express.Multer.File,
      callback: (error: Error | null, acceptFile: boolean) => void,
    ) => {
      const allowedExtensions = /\.(jpg|jpeg|png|gif)$/;
      if (!file.originalname.match(allowedExtensions)) {
        return callback(
          new BadRequestException('Дозволені файли лише типу зображення.'),
          false,
        );
      }
      callback(null, true);
    },
    storage: diskStorage({
      destination: './uploads/images',
      filename: (
        req: Express.Request,
        file: Express.Multer.File,
        callback: (error: Error | null, filename: string) => void,
      ) => {
        const originalName = Buffer.from(file.originalname, 'binary').toString(
          'utf-8',
        );

        const name = originalName.split('.')[0];
        const fileExtension = originalName.split('.')[1];
        const newFileName =
          name.split(' ').join('_') + '_' + Date.now() + '.' + fileExtension;

        callback(null, newFileName);
      },
    }),
  }),
};

export const fileInterceptor = {
  interceptor: FileInterceptor('file', {
    dest: './uploads/files',
    storage: diskStorage({
      destination: './uploads/files',
      filename: (req, file, callback) => {
        const originalName = Buffer.from(file.originalname, 'binary').toString(
          'utf-8',
        );

        const name = originalName.split('.')[0];
        const fileExtension = originalName.split('.')[1];
        const newFileName =
          name.split(' ').join('_') + '_' + Date.now() + '.' + fileExtension;

        callback(null, newFileName);
      },
    }),
  }),
};
