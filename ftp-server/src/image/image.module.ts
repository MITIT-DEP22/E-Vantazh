import { Module } from '@nestjs/common';
import { ImageService } from './image.service';
import { ImageController } from './image.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Image } from './entities/image.entity';

@Module({
  controllers: [ImageController],
  providers: [ImageService],
  imports: [TypeOrmModule.forFeature([Image])],
})
export class ImageModule {}
