import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class QueryBookDto {
  @ApiPropertyOptional({
    example: 'Novel',
    description: 'Filter berdasarkan kategori buku',
  })
  @IsOptional()
  @IsString()
  category?: string;

  @ApiPropertyOptional({
    example: 'Andrea Hirata',
    description: 'Filter berdasarkan nama penulis',
  })
  @IsOptional()
  @IsString()
  author?: string;

  @ApiPropertyOptional({
    example: false,
    description: 'Filter status peminjaman buku',
  })
  @IsOptional()
  @Transform(({ value }: { value: unknown }) => {
    if (value === 'true' || value === true) {
      return true;
    }

    if (value === 'false' || value === false) {
      return false;
    }

    return value as string | boolean | undefined;
  })
  @IsBoolean()
  isBorrowed?: boolean;
}
