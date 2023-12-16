import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  BadRequestException,
  UploadedFile,
} from '@nestjs/common';
import { FileService } from './file.service';
import { fileInterceptor } from '../multer.config';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Файли')
@Controller('v1/files')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post()
  @UseInterceptors(fileInterceptor.interceptor)
  create(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('Дозволені файли лише типу зображення.');
    }

    return this.fileService.create({
      fileName: file.filename,
      mimeType: file.mimetype,
      path: file.path,
    });
  }

  @Get()
  findAll() {
    return this.fileService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fileService.findOne(id);
  }

  @Patch(':id')
  @UseInterceptors(fileInterceptor.interceptor)
  update(@Param('id') id: string, @UploadedFile() file: Express.Multer.File) {
    return this.fileService.update(id, {
      fileName: file.filename,
      mimeType: file.mimetype,
      path: file.path,
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fileService.remove(id);
  }
}
