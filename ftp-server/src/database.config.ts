import { Injectable } from '@nestjs/common';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { Image } from './image/entities/image.entity';
import { File } from './file/entities/file.entity';

@Injectable()
export class DatabaseConfigService implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      database: this.configService.get('POSTGRES_DB'),
      host: this.configService.get('POSTGRES_HOST'),
      password: this.configService.get('POSTGRES_PASSWORD'),
      port: Number(this.configService.get('POSTGRES_PORT')),
      username: this.configService.get('POSTGRES_USER'),
      entities: [Image, File],
    };
  }
}
