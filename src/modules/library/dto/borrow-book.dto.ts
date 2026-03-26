import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class BorrowBookDto {
  @ApiProperty({
    example: 'Siti',
  })
  @IsString()
  @IsNotEmpty()
  borrowerName: string;
}
