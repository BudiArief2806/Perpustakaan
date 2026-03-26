import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { BorrowBookDto } from './dto/borrow-book.dto';
import { CreateBookDto } from './dto/create-book.dto';
import { QueryBookDto } from './dto/query-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { LibraryRepository } from './library.repository';
import { Book } from './entities/book.entity';

@Injectable()
export class LibraryService {
  constructor(private readonly libraryRepository: LibraryRepository) {}

  findAll(filters?: QueryBookDto): Book[] {
    return this.libraryRepository.findAll(filters);
  }

  findOne(id: number): Book {
    const book = this.libraryRepository.findById(id);

    if (!book) {
      throw new NotFoundException(`Buku dengan id ${id} tidak ditemukan`);
    }

    return book;
  }

  create(payload: CreateBookDto): Book {
    return this.libraryRepository.create(payload);
  }

  update(id: number, payload: UpdateBookDto): Book {
    this.findOne(id);

    return this.libraryRepository.update(id, payload);
  }

  borrow(id: number, payload: BorrowBookDto): Book {
    const book = this.findOne(id);

    if (book.isBorrowed) {
      throw new BadRequestException('Buku sedang dipinjam');
    }

    book.isBorrowed = true;
    book.borrowerName = payload.borrowerName;
    book.borrowedAt = new Date().toISOString();

    return this.libraryRepository.save(book);
  }

  returnBook(id: number): Book {
    const book = this.findOne(id);

    if (!book.isBorrowed) {
      throw new BadRequestException('Buku ini belum dipinjam');
    }

    book.isBorrowed = false;
    book.borrowerName = null;
    book.borrowedAt = null;

    return this.libraryRepository.save(book);
  }

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
