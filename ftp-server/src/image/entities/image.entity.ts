import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Image {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column({ name: 'file_name' })
  fileName: string;

  @ApiProperty()
  @Column({ name: 'mime_type' })
  mimeType: string;

  @ApiProperty()
  @Column()
  path: string;
}
