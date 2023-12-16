import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { ImageService } from './image.service';
import { imageInterceptor } from '../multer.config';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Зображення')
@Controller('v1/images')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Post()
  @UseInterceptors(imageInterceptor.interceptor)
  async create(@UploadedFile() image: Express.Multer.File) {
    if (!image) {
      throw new BadRequestException('Дозволені файли лише типу зображення.');
    }

    return this.imageService.create({
      fileName: image.filename,
      mimeType: image.mimetype,
      path: image.path,
    });
  }

  @Get()
  findAll() {
    return this.imageService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.imageService.findOne(id);
  }

  @Patch(':id')
  @UseInterceptors(imageInterceptor.interceptor)
  update(@Param('id') id: string, @UploadedFile() image: Express.Multer.File) {
    return this.imageService.update(id, {
      fileName: image.filename,
      mimeType: image.mimetype,
      path: image.path,
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.imageService.remove(id);
  }
}
