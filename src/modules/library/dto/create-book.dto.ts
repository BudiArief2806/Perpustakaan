// Import decorator Swagger untuk menampilkan dokumentasi field di API.
import { ApiProperty } from '@nestjs/swagger';
// Import validator untuk memastikan data buku sesuai aturan.
import { IsInt, IsNotEmpty, IsString, Max, Min } from 'class-validator';

// Export DTO ini agar bisa dipakai controller dan service saat create buku.
export class CreateBookDto {
  // Judul buku wajib diisi dan harus bertipe string.
  @ApiProperty({
    example: 'Bumi Manusia',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  // Nama penulis wajib diisi dan digunakan saat pembuatan buku baru.
  @ApiProperty({
    example: 'Pramoedya Ananta Toer',
  })
  @IsString()
  @IsNotEmpty()
  author: string;

  // Kategori buku membantu proses pengelompokan dan filtering.
  @ApiProperty({
    example: 'Sejarah',
  })
  @IsString()
  @IsNotEmpty()
  category: string;

  // Tahun terbit dibatasi agar input tetap masuk akal.
  @ApiProperty({
    example: 1980,
  })
  @IsInt()
  @Min(1900)
  @Max(2100)
  publishedYear: number;
}
