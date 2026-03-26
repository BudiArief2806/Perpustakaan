import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString, Max, Min } from 'class-validator';

export class CreateBookDto {
  @ApiProperty({
    example: 'Bumi Manusia',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    example: 'Pramoedya Ananta Toer',
  })
  @IsString()
  @IsNotEmpty()
  author: string;

  @ApiProperty({
    example: 'Sejarah',
  })
  @IsString()
  @IsNotEmpty()
  category: string;

  @ApiProperty({
    example: 1980,
  })
  @IsInt()
  @Min(1900)
  @Max(2100)
  publishedYear: number;
}
