import { Injectable } from '@nestjs/common';
import { MailerOptions, MailerOptionsFactory } from '@nestjs-modules/mailer';
import { join } from 'path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailerConfig implements MailerOptionsFactory {
  constructor(private configService: ConfigService) {}

  createMailerOptions(): Promise<MailerOptions> | MailerOptions {
    return {
      transport: {
        host: this.configService.get('MAIL_HOST'),
        port: this.configService.get('MAIL_PORT'),
        auth: {
          user: this.configService.get('MAIL_USER'),
          pass: this.configService.get('MAIL_PASSWORD'),
        },
      },
      defaults: {
        from: '"No Reply" <noreply@example.com>',
      },
      template: {
        dir: join(__dirname, '../mail/templates'),
        adapter: new HandlebarsAdapter(), // or new PugAdapter() or new EjsAdapter()
        options: {
          strict: true,
        },
      },
    };
  }
}
