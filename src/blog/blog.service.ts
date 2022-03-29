import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Blog } from 'src/blog/entities/blog.entity';
import { Repository } from 'typeorm';
import { CreateBlogDto } from './dto/create-blog.dto';
import { ImageEntity } from './entities/image.entity';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(Blog)
    private readonly blogRepository: Repository<Blog>,
    @InjectRepository(ImageEntity)
    private readonly imageRepository: Repository<ImageEntity>,
  ) {}

  createBlogPost(createBlogDto: CreateBlogDto): Promise<Blog> {
    const blog = this.blogRepository.create();

    blog.title = createBlogDto.title;
    blog.status = createBlogDto.status;
    blog.description = createBlogDto.description;
    blog.type = createBlogDto.type

    return this.blogRepository.save(blog);
  }

  async getBlogPost(id: number): Promise<Blog> {
    const post = await this.blogRepository.findOne(id, {
      relations: ['photos']
    })

    post.views++
    await this.blogRepository.save(post)
    
    post.photos.forEach((el)=>{
      el.url = `/blog/image/${el.id}`
    })
    
    return post
  }

  async addBlogImage(file: Express.Multer.File, postId: number): Promise<any> {
    const blogPost = await this.blogRepository.findOne(postId)

    if(!blogPost) {
      throw new NotFoundException('post not found')
    }

    const imageData = this.imageRepository.create()

    ///*
    imageData.url = file.path
    imageData.content_length = file.size
    //*/
    imageData.mime_type = file.mimetype
    imageData.blog = blogPost

    return imageData.save()
  }

  getImage(id: number): Promise<ImageEntity> {
    return this.imageRepository.findOne(id)
  }
}
