import { ApiProperty } from '@nestjs/swagger';

export class AddImageToPostDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  file: any;
}
