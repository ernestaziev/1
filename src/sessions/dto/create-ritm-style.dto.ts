import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsString } from 'class-validator';
import { DefaultStatus } from 'src/types';

export class CreateRitmStyleDto {
  @IsNumber()
  @ApiProperty()
  readonly price: number

  @IsString()
  @ApiProperty()
  readonly title: string;

  @IsEnum(DefaultStatus)
  @ApiProperty({
    type: 'enum',
    enum: DefaultStatus
  })
  readonly status: DefaultStatus;

  @IsNumber()
  @ApiProperty()
  readonly sessionId: number
}