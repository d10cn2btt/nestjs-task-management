import { format, transports } from 'winston';
import { ConfigService } from '@nestjs/config';
import { utilities as nestWinstonModuleUtilities } from 'nest-winston/dist/winston.utilities';
import { Injectable } from '@nestjs/common';
import { WinstonModuleOptions, WinstonModuleOptionsFactory } from 'nest-winston';

@Injectable()
export class LoggerConfig implements WinstonModuleOptionsFactory {
  constructor(private configService: ConfigService) {}

  createWinstonModuleOptions(): Promise<WinstonModuleOptions> | WinstonModuleOptions {
    return {
      transports: [
        new transports.File({
          format: format.combine(
            format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
            format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`),
          ),
          filename: `${process.cwd()}/${this.configService.get('LOG_PATH')}`,
        }),
        new transports.Console({
          format: format.combine(format.timestamp(), nestWinstonModuleUtilities.format.nestLike()),
        }),
      ],
    };
  }
}
