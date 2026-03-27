// Import decorator Swagger untuk dokumentasi body request peminjaman.
import { ApiProperty } from '@nestjs/swagger';
// Import validator untuk mengecek nama peminjam.
import { IsNotEmpty, IsString } from 'class-validator';

// Export DTO ini agar endpoint borrow dapat memakai validasi yang sama.
export class BorrowBookDto {
  // Nama peminjam wajib diisi saat proses peminjaman buku.
  @ApiProperty({
    example: 'Siti',
  })
  @IsString()
  @IsNotEmpty()
  borrowerName: string;
}
