import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { Repository } from 'typeorm';
import { File } from './entities/file.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as fs from 'fs-extra';

@Injectable()
export class FileService {
  constructor(
    @InjectRepository(File) private fileRepository: Repository<File>,
  ) {}

  create(createFileDto: CreateFileDto) {
    return this.fileRepository.save(createFileDto);
  }

  findAll() {
    return this.fileRepository.find({});
  }

  async findOne(id: string) {
    return this.fileRepository
      .findOneOrFail({
        where: {
          id: id,
        },
      })
      .catch(() => {
        throw new BadRequestException(`Файл з id ${id} не існує.`);
      });
  }

  async update(id: string, updateFileDto: UpdateFileDto) {
    const file = await this.findOne(id);

    await fs.unlink(file.path);

    return this.fileRepository.update(id, updateFileDto);
  }

  async remove(id: string) {
    const file = await this.findOne(id);

    await fs.unlink(file.path);

    return this.fileRepository.delete(id);
  }
}
