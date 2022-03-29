import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateLocationDto {
  @IsString()
  @ApiProperty({})
  name: string;

  @IsString()
  @ApiProperty({})
  address: string;

  @IsString()
  @ApiProperty({})
  arrangment: string

  @IsNumber()
  @ApiProperty()
  sessionId: number
}