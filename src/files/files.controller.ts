import { Controller, Get, StreamableFile } from '@nestjs/common';
import { createReadStream } from 'fs';
import { join } from 'path';

@Controller('files')
export class FilesController {
  @Get()
  getFile(): StreamableFile {
    const file = createReadStream(join(process.cwd(), 'yarn.lock'));
    return new StreamableFile(file);
  }
}
