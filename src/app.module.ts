import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WinstonModule } from 'nest-winston';
import { TasksModule } from './tasks/tasks.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configValidationSchema } from './config.schema';
import { User } from 'src/users/user.entity';
import { Task } from 'src/tasks/task.entity';
import { UsersModule } from './users/users.module';
import { LoggerConfig } from 'src/config/logger.config';
import { TypeOrmConfig } from 'src/config/type-orm.config';
import { FilesModule } from './files/files.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.stage.${process.env.STAGE}`],
      validationSchema: configValidationSchema,
    }),
    WinstonModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useClass: LoggerConfig,
      // useFactory: async (configService: ConfigService) => ({
      //   transports: [
      //     new winston.transports.File({
      //       // format: winston.format.combine(winston.format.timestamp(), nestWinstonModuleUtilities.format.nestLike()),
      //       format: winston.format.combine(
      //         winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
      //         winston.format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`),
      //       ),
      //       filename: `${process.cwd()}/${configService.get('LOG_PATH')}`,
      //     }),
      //     new winston.transports.Console({
      //       format: winston.format.combine(winston.format.timestamp(), nestWinstonModuleUtilities.format.nestLike()),
      //     }),
      //   ],
      // }),
    }),
    // Nest will wait for the config module to finish its initialization because we've defined it above
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useClass: TypeOrmConfig,
      // useFactory: async (configService: ConfigService) => {
      //   const isProduction = configService.get('STAGE') === 'prod';
      //
      //   return {
      //     ssl: isProduction,
      //     extra: {
      //       ssl: isProduction ? { rejectUnauthorized: false } : null,
      //     },
      //     type: 'postgres',
      //     host: configService.get('DB_HOST'),
      //     port: configService.get('DB_PORT'),
      //     username: configService.get('DB_USERNAME'),
      //     password: configService.get('DB_PASSWORD'),
      //     database: configService.get('DB_DATABASE'),
      //     autoLoadEntities: true,
      //     // entities: [User, Task],
      //     synchronize: true,
      //   };
      // },
    }),
    AuthModule,
    UsersModule,
    TasksModule,
    FilesModule,
  ],
})
export class AppModule {}
