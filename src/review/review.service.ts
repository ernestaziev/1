import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateReviewDto } from './dto/create-review.dto';
import { Review } from './entities/review.entity';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
  ) {}

  create(dto: CreateReviewDto): Promise<Review> {
    const review = this.reviewRepository.create();
    review.first_name = dto.first_name;
    review.last_name = dto.last_name;
    review.message = dto.message;

    return this.reviewRepository.save(review);
  }

  async getOne(id: number): Promise<Review> {
    const review = await this.reviewRepository.findOne(id)

    if(!review) {
      throw new NotFoundException()
    }

    return review
  }

  getAll(): Promise<Review[]> {
    return this.reviewRepository.find()
  }
}
