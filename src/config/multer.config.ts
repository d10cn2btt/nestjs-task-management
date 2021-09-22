import { Injectable } from '@nestjs/common';
import { MulterModuleOptions, MulterOptionsFactory } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import e from 'express';
import * as path from 'path';

@Injectable()
export class MulterConfig implements MulterOptionsFactory {
  createMulterOptions(): Promise<MulterModuleOptions> | MulterModuleOptions {
    return {
      storage: diskStorage({
        destination: function (req, file, callback) {
          callback(null, './storage/app');
        },
        filename(req: e.Request, file: Express.Multer.File, callback: (error: Error | null, filename: string) => void) {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          callback(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
        },
      }),
    };
  }
}
