import { Module } from '@nestjs/common';
import { FilesController } from './files.controller';
import { MulterModule } from '@nestjs/platform-express';
import { MulterConfig } from 'src/config/multer.config';

@Module({
  imports: [
    MulterModule.registerAsync({
      useClass: MulterConfig,
    }),
  ],
  controllers: [FilesController],
})
export class FilesModule {}
