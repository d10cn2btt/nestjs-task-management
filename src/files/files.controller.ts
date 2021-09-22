import { Controller, Get, Inject, NotFoundException, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { createReadStream } from 'fs';
import { join } from 'path';
import { checkIfFileOrDirectoryExists, createFile, getFile } from 'src/common/helpers/storage.helper';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Controller('files')
export class FilesController {
  constructor(@Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger) {}

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
  @UseInterceptors(FileInterceptor('file_csv'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log('upload file');
    this.logger.info('log via logger');
    return { file };
  }
}
