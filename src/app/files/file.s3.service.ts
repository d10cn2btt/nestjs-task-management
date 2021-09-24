import { Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FileS3Service {
  private s3;

  constructor(private configService: ConfigService) {
    this.s3 = new S3({
      accessKeyId: this.configService.get('AWS_ACCESS_KEY_ID'),
      secretAccessKey: this.configService.get('AWS_SECRET_ACCESS_KEY'),
    });
  }

  public async uploadFile(fileBuffer: Buffer, fileName: string) {
    return await this.s3
      .upload({
        Bucket: this.configService.get('BUCKET_NAME'),
        Body: fileBuffer,
        Key: fileName,
      })
      .promise();
  }
}
