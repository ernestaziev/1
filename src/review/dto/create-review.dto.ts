import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateReviewDto {
  @IsString()
  @ApiProperty({})
  first_name: string;

  @IsString()
  @ApiProperty({})
  last_name: string;

  @IsString()
  @ApiProperty({})
  message: string;
}