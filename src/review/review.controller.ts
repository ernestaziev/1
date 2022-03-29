import { Body, Controller, Get, Param, ParseIntPipe, Post, ValidationPipe } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateReviewDto } from './dto/create-review.dto';
import { Review } from './entities/review.entity';
import { ReviewService } from './review.service';

@ApiTags('review')
@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post()
  @ApiOperation({ summary: 'Create review' })
  @ApiBody({ type: CreateReviewDto })
  create(@Body(new ValidationPipe()) dto: CreateReviewDto): Promise<Review> {
    return this.reviewService.create(dto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get one review' })
  getOne(@Param('id', ParseIntPipe) id: number): Promise<Review> {
    return this.reviewService.getOne(id);
  }

  
  @Get()
  @ApiOperation({ summary: 'Get all reviews' })
  getAll(): Promise<Review[]> {
    return this.reviewService.getAll();
  }
}
