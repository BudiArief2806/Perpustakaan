// Import decorator Swagger untuk mendokumentasikan query parameter.
import { ApiPropertyOptional } from '@nestjs/swagger';
// Import Transform agar query string bisa diubah ke tipe data yang sesuai.
import { Transform } from 'class-transformer';
// Import validator untuk memvalidasi query pencarian buku.
import { IsBoolean, IsOptional, IsString } from 'class-validator';

// Export DTO query agar bisa dipakai pada endpoint GET /books.
export class QueryBookDto {
  // Filter opsional untuk mencari buku berdasarkan judul.
  @ApiPropertyOptional({
    example: 'Laskar Pelangi',
    description: 'Filter berdasarkan judul buku',
  })
  @IsOptional()
  @IsString()
  title?: string;

  // Filter opsional untuk mengambil buku berdasarkan kategori.
  @ApiPropertyOptional({
    example: 'Novel',
    description: 'Filter berdasarkan kategori buku',
  })
  @IsOptional()
  @IsString()
  category?: string;

  // Filter opsional untuk mencari buku berdasarkan nama author.
  @ApiPropertyOptional({
    example: 'Andrea Hirata',
    description: 'Filter berdasarkan nama penulis',
  })
  @IsOptional()
  @IsString()
  author?: string;

  // Filter opsional untuk status pinjam, dengan transform string ke boolean.
  @ApiPropertyOptional({
    example: false,
    description: 'Filter status peminjaman buku',
  })
  @IsOptional()
  @Transform(({ value }: { value: unknown }) => {
    // Query string "true" diubah menjadi boolean true.
    if (value === 'true' || value === true) {
      return true;
    }

    // Query string "false" diubah menjadi boolean false.
    if (value === 'false' || value === false) {
      return false;
    }

    // Nilai selain itu dibiarkan agar nanti divalidasi oleh class-validator.
    return value as string | boolean | undefined;
  })
  @IsBoolean()
  isBorrowed?: boolean;
}
