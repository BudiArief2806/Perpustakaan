import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class Book {
  @ApiProperty({
    example: 1,
    description: 'ID unik buku',
  })
  id: number;

  @ApiProperty({
    example: 'Laskar Pelangi',
    description: 'Judul buku',
  })
  title: string;

  @ApiProperty({
    example: 'Andrea Hirata',
    description: 'Nama penulis buku',
  })
  author: string;

  @ApiProperty({
    example: 'Novel',
    description: 'Kategori buku',
  })
  category: string;

  @ApiProperty({
    example: 2005,
    description: 'Tahun terbit buku',
  })
  publishedYear: number;

  @ApiProperty({
    example: false,
    description: 'Status peminjaman buku',
  })
  isBorrowed: boolean;

  @ApiPropertyOptional({
    example: 'Budi',
    description: 'Nama peminjam buku bila sedang dipinjam',
  })
  borrowerName?: string | null;

  @ApiPropertyOptional({
    example: '2026-03-26T09:00:00.000Z',
    description: 'Waktu buku dipinjam',
  })
  borrowedAt?: string | null;
}
