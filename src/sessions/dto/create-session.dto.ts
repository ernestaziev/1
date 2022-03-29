import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsEnum, IsString, Matches, MinDate } from 'class-validator';
import { DefaultStatus } from 'src/types';

export class CreateSessionDto {
  @IsString()
  @ApiProperty({})
  readonly first_name: string;

  @IsString()
  @ApiProperty({})
  readonly last_name: string;

  @Matches(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im)
  @ApiProperty({
    default: '+31636363634',
    examples: [
      '(123) 456-7890', '(123)456-7890', '123-456-7890', '123.456.7890', '1234567890', '+31636363634', '075-63546725'
    ]
  })
  readonly phone: string;

  @Type(() => Date)
  @IsDate()
  @MinDate(new Date(), {
    message: 'you cannot select a past date'
  })
  @ApiProperty({
    example: '2022-04-04',
    default: '2022-04-04'
  })
  readonly start_date: Date;

  @IsEnum(DefaultStatus)
  @ApiProperty({
    enum: DefaultStatus
  })
  readonly status: DefaultStatus
}