import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Blog } from './blog.entity';

@Entity()
export class ImageEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;

  @Column()
  mime_type: string;

  @Column()
  content_length: number;
  
  @Column({type: 'timestamp'})
  @CreateDateColumn()
  created_at: Date

  @ManyToOne(() => Blog, (blog) => blog.photos, { onDelete: 'CASCADE' })
  blog: Blog;
}
