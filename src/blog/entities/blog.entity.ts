import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BlogStatus, DefaultStatus } from '../../types';
import { ImageEntity } from './image.entity';

@Entity()
export class Blog extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({
    type: 'enum',
    enum: DefaultStatus,
  })
  status: DefaultStatus;

  @OneToMany(() => ImageEntity, (image) => image.blog)
  @JoinTable()
  photos: ImageEntity[];

  @Column({
    type: 'enum',
    enum: BlogStatus,
  })
  type: BlogStatus;

  @Column({
    default: 0
  })
  views: number;

  @Column({type: 'timestamp'})
  @CreateDateColumn()
  created_at: Date
}
