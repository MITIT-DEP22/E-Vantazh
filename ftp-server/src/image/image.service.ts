import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateImageDto } from './dto/create-image.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Image } from './entities/image.entity';
import { Repository } from 'typeorm';
import * as fs from 'fs-extra';
import { UpdateImageDto } from './dto/update-image.dto';

@Injectable()
export class ImageService {
  constructor(
    @InjectRepository(Image) private imageRepository: Repository<Image>,
  ) {}

  create(createImageDto: CreateImageDto) {
    return this.imageRepository.save(createImageDto);
  }

  findAll() {
    return this.imageRepository.find({});
  }

  async findOne(id: string) {
    return this.imageRepository
      .findOneOrFail({
        where: {
          id: id,
        },
      })
      .catch(() => {
        throw new BadRequestException(`Картинка з id ${id} не існує.`);
      });
  }

  async update(id: string, updateImageDto: UpdateImageDto) {
    const image = await this.findOne(id);

    await fs.unlink(image.path);

    return this.imageRepository.update(id, updateImageDto);
  }

  async remove(id: string) {
    const image = await this.findOne(id);

    await fs.unlink(image.path);

    return this.imageRepository.delete(id);
  }
}
