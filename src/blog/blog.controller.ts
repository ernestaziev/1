import { Body, Controller, Get, Param, ParseIntPipe, Post, Res, UploadedFile, UseInterceptors, ValidationPipe } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiExcludeEndpoint, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { createReadStream } from 'fs';
import { Blog } from 'src/blog/entities/blog.entity';
import { BlogService } from './blog.service';
import { AddImageToPostDto } from './dto/add-image.dto';
import { CreateBlogDto } from './dto/create-blog.dto';

@ApiTags('blog')
@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Post()
  @ApiOperation({
    summary: 'Create blog post'
  })
  @ApiBody({ type: CreateBlogDto })
  createBlogPost(@Body(new ValidationPipe()) dto: CreateBlogDto): Promise<Blog> {
    return this.blogService.createBlogPost(dto);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get blog post',
    description: `To get specific image, you can enter its url in a new browser tab.
      The response of this endpoint specifies the URLs of the post's images.`
  })
  getBlogPost(@Param('id', ParseIntPipe) id: number): Promise<Blog> {
    return this.blogService.getBlogPost(id);
  }

  @Post(':postId/image')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: AddImageToPostDto,
  })
  @ApiOperation({
    summary: 'Add a image for a specific post'
  })
  addImageToBlogPost(@UploadedFile() file: Express.Multer.File, @Param('postId', ParseIntPipe) postId: number): any {
    return this.blogService.addBlogImage(file, postId);
  }

  @Get('/image/:id')
  @ApiExcludeEndpoint()
  async getBlogPostImages(@Param('id', ParseIntPipe) id: number, @Res() res: Response): Promise<void> {
    const image = await this.blogService.getImage(id);
    const file = createReadStream(image.url);
    file.pipe(res);
  }
}
