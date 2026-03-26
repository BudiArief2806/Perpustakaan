import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { QueryBookDto } from './dto/query-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';

@Injectable()
export class LibraryRepository {
  private readonly books: Book[] = [
    {
      id: 1,
      title: 'Laskar Pelangi',
      author: 'Andrea Hirata',
      category: 'Novel',
      publishedYear: 2005,
      isBorrowed: false,
      borrowerName: null,
      borrowedAt: null,
    },
    {
      id: 2,
      title: 'Atomic Habits',
      author: 'James Clear',
      category: 'Self Improvement',
      publishedYear: 2018,
      isBorrowed: true,
      borrowerName: 'Rina',
      borrowedAt: '2026-03-24T08:30:00.000Z',
    },
  ];

  findAll(filters?: QueryBookDto): Book[] {
    if (!filters) {
      return this.books;
    }

    return this.books.filter((book) => {
      const matchesCategory = filters.category
        ? book.category.toLowerCase().includes(filters.category.toLowerCase())
        : true;
      const matchesAuthor = filters.author
        ? book.author.toLowerCase().includes(filters.author.toLowerCase())
        : true;
      const matchesBorrowedStatus =
        typeof filters.isBorrowed === 'boolean'
          ? book.isBorrowed === filters.isBorrowed
          : true;

      return matchesCategory && matchesAuthor && matchesBorrowedStatus;
    });
  }

  findById(id: number): Book | undefined {
    return this.books.find((book) => book.id === id);
  }

  create(payload: CreateBookDto): Book {
    const nextId =
      this.books.length > 0
        ? Math.max(...this.books.map((book) => book.id)) + 1
        : 1;

    const newBook: Book = {
      id: nextId,
      ...payload,
      isBorrowed: false,
      borrowerName: null,
      borrowedAt: null,
    };

    this.books.push(newBook);

    return newBook;
  }

  update(id: number, payload: UpdateBookDto): Book {
    const book = this.findById(id) as Book;

    Object.assign(book, payload);

    return book;
  }

  save(book: Book): Book {
    const index = this.books.findIndex((item) => item.id === book.id);

    this.books[index] = book;

    return book;
  }

  remove(id: number): Book {
    const index = this.books.findIndex((book) => book.id === id);
    const [deletedBook] = this.books.splice(index, 1);

    return deletedBook;
  }
}
