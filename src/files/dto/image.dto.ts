import { NotAcceptableException } from '@nestjs/common/exceptions/not-acceptable.exception';

export const imageFileFilter = (req: any, file: any, callback: any) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    req.fileValidationError = 'only image files allowed';
    return callback(new NotAcceptableException('abc'));
  }

  callback(null, true);
};
