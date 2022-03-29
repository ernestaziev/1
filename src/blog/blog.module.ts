import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogController } from './blog.controller';
import { BlogService } from './blog.service';
import { Blog } from './entities/blog.entity';
import { ImageEntity } from './entities/image.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Blog, ImageEntity]),
    MulterModule.register({
      dest: './uploads',
    }),
  ],
  controllers: [BlogController],
  providers: [BlogService]
})
export class BlogModule {}
