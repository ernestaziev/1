import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString } from 'class-validator';
import { BlogStatus, DefaultStatus } from 'src/types';

export class CreateBlogDto {
  @IsString()
  @ApiProperty()
  readonly title: string;

  @IsString()
  @ApiProperty()
  readonly description: string;

  @IsEnum(DefaultStatus)
  @ApiProperty({
    type: 'enum',
    enum: DefaultStatus
  })
  readonly status: DefaultStatus;

  @IsEnum(BlogStatus)
  @ApiProperty({
    type: 'enum',
    enum: BlogStatus
  })
  readonly type: BlogStatus;
}
