import { Module } from '@nestjs/common';
import { FilesController } from 'src/app/files/files.controller';
import { MulterModule } from '@nestjs/platform-express';
import { MulterConfig } from 'src/config/multer.config';
import { FileS3Service } from 'src/app/files/file.s3.service';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    // MulterModule.registerAsync({
    //   useClass: MulterConfig,
    // }),
  ],
  providers: [FileS3Service, ConfigService],
  controllers: [FilesController],
})
export class FilesModule {}
