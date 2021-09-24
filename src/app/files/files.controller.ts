import { Controller, Get, Inject, NotFoundException, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { createReadStream } from 'fs';
import { join } from 'path';
import { checkIfFileOrDirectoryExists, createFile, getFile } from 'src/common/helpers/storage.helper';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { imageFileFilter } from 'src/app/files/dto/image.dto';
import { FileS3Service } from 'src/app/files/file.s3.service';

@Controller('files')
export class FilesController {
  constructor(@Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger, private fileS3Service: FileS3Service) {}

  @Get('download')
  getFile(@Res() res) {
    const file = createReadStream(join(process.cwd(), 'yarn.lock'));
    // return new StreamableFile(file);
    res.setHeader('Content-disposition', 'attachment; filename=yarn123.lock');
    file.pipe(res);
  }

  @Get('get-file-with-helper')
  async getFileWithHelper(@Res() res) {
    const filePath = 'yarn.lock';
    if (!checkIfFileOrDirectoryExists(filePath)) {
      throw new NotFoundException('File is not exists');
    }

    const fileData = (await getFile(filePath)).toString();

    res.status(200).json({
      fileData,
    });
  }

  @Get('write-file')
  async writeFile(@Res() res) {
    await createFile('storage/app', 'file1.txt', 'abc123');

    res.status(200).json({
      status: 'done',
    });
  }

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file_csv', {
      fileFilter: imageFileFilter,
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log('upload file');
    this.logger.info('log via logger');
    return { file };
  }

  @Post('upload-s3')
  @UseInterceptors(FileInterceptor('file_s3'))
  async uploadFileS3(@UploadedFile() file: Express.Multer.File) {
    return await this.fileS3Service.uploadFile(file.buffer, file.originalname);
  }
}
