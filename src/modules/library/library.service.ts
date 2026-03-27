// Import exception dan decorator Injectable dari NestJS.
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
// Import DTO untuk kebutuhan create, update, borrow, dan filter buku.
import { BorrowBookDto } from './dto/borrow-book.dto';
import { CreateBookDto } from './dto/create-book.dto';
import { QueryBookDto } from './dto/query-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
// Import repository sebagai penghubung ke mock database array.
import { LibraryRepository } from './library.repository';
// Import entity Book sebagai tipe data hasil proses service.
import { Book } from './entities/book.entity';

// Export service ini agar bisa dipakai controller melalui dependency injection.
@Injectable()
export class LibraryService {
  constructor(private readonly libraryRepository: LibraryRepository) {}

  // Meneruskan request pengambilan semua buku ke repository.
  findAll(filters?: QueryBookDto): Book[] {
    return this.libraryRepository.findAll(filters);
  }

  // Mengecek apakah buku dengan id tertentu benar-benar ada.
  findOne(id: number): Book {
    const book = this.libraryRepository.findById(id);

    if (!book) {
      throw new NotFoundException(`Buku dengan id ${id} tidak ditemukan`);
    }

    return book;
  }

  // Membuat data buku baru melalui repository.
  create(payload: CreateBookDto): Book {
    return this.libraryRepository.create(payload);
  }

  // Memastikan buku ada terlebih dahulu sebelum melakukan update.
  update(id: number, payload: UpdateBookDto): Book {
    this.findOne(id);

    return this.libraryRepository.update(id, payload);
  }

  // Memproses peminjaman buku dan mengubah statusnya menjadi dipinjam.
  borrow(id: number, payload: BorrowBookDto): Book {
    const book = this.findOne(id);

    // Buku tidak boleh dipinjam dua kali saat statusnya masih aktif.
    if (book.isBorrowed) {
      throw new BadRequestException('Buku sedang dipinjam');
    }

    // Menyimpan informasi peminjaman ke objek buku.
    book.isBorrowed = true;
    book.borrowerName = payload.borrowerName;
    book.borrowedAt = new Date().toISOString();

    return this.libraryRepository.save(book);
  }

  // Memproses pengembalian buku dan mengosongkan data peminjam.
  returnBook(id: number): Book {
    const book = this.findOne(id);

    // Buku yang belum pernah dipinjam tidak bisa dikembalikan.
    if (!book.isBorrowed) {
      throw new BadRequestException('Buku ini belum dipinjam');
    }

    // Mengembalikan status buku menjadi tersedia.
    book.isBorrowed = false;
    book.borrowerName = null;
    book.borrowedAt = null;

    return this.libraryRepository.save(book);
  }

  // Menghapus buku jika statusnya tidak sedang dipinjam.
  remove(id: number): Book {
    const book = this.findOne(id);

    if (book.isBorrowed) {
      throw new BadRequestException(
        'Buku sedang dipinjam dan tidak bisa dihapus',
      );
    }

    return this.libraryRepository.remove(id);
  }
}
