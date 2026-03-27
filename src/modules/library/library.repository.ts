// Import Injectable agar repository bisa dipakai sebagai provider NestJS.
import { Injectable } from '@nestjs/common';
// Import DTO dan entity yang dipakai untuk operasi data buku.
import { CreateBookDto } from './dto/create-book.dto';
import { QueryBookDto } from './dto/query-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';

// Export repository ini agar service bisa mengakses data mock perpustakaan.
@Injectable()
export class LibraryRepository {
  // Array ini berperan sebagai mock database sementara di memory.
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
    {
      id: 3,
      title: 'Bumi Manusia',
      author: 'Pramoedya Ananta Toer',
      category: 'Novel',
      publishedYear: 1980,
      isBorrowed: false,
      borrowerName: null,
      borrowedAt: null,
    },
    {
      id: 4,
      title: 'Negeri 5 Menara',
      author: 'Ahmad Fuadi',
      category: 'Novel',
      publishedYear: 2009,
      isBorrowed: false,
      borrowerName: null,
      borrowedAt: null,
    },
    {
      id: 5,
      title: 'Filosofi Teras',
      author: 'Henry Manampiring',
      category: 'Self Improvement',
      publishedYear: 2018,
      isBorrowed: false,
      borrowerName: null,
      borrowedAt: null,
    },
    {
      id: 6,
      title: 'Ayat-Ayat Cinta',
      author: 'Habiburrahman El Shirazy',
      category: 'Novel Religi',
      publishedYear: 2004,
      isBorrowed: false,
      borrowerName: null,
      borrowedAt: null,
    },
    {
      id: 7,
      title: 'Rich Dad Poor Dad',
      author: 'Robert T. Kiyosaki',
      category: 'Finance',
      publishedYear: 1997,
      isBorrowed: true,
      borrowerName: 'Dina',
      borrowedAt: '2026-03-25T07:15:00.000Z',
    },
    {
      id: 8,
      title: 'Sejarah Dunia yang Disembunyikan',
      author: 'Jonathan Black',
      category: 'Sejarah',
      publishedYear: 2007,
      isBorrowed: false,
      borrowerName: null,
      borrowedAt: null,
    },
    {
      id: 9,
      title: 'Laut Bercerita',
      author: 'Leila S. Chudori',
      category: 'Novel',
      publishedYear: 2017,
      isBorrowed: false,
      borrowerName: null,
      borrowedAt: null,
    },
    {
      id: 10,
      title: 'Atomic Design',
      author: 'Brad Frost',
      category: 'Teknologi',
      publishedYear: 2016,
      isBorrowed: false,
      borrowerName: null,
      borrowedAt: null,
    },
  ];

  // Mengambil semua buku lalu menerapkan filter bila query dikirim.
  findAll(filters?: QueryBookDto): Book[] {
    if (!filters) {
      return this.books;
    }

    // Setiap buku dicek apakah sesuai dengan kategori, author, dan status pinjam.
    return this.books.filter((book) => {
      const matchesTitle = filters.title
        ? book.title.toLowerCase().includes(filters.title.toLowerCase())
        : true;
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

      return (
        matchesTitle &&
        matchesCategory &&
        matchesAuthor &&
        matchesBorrowedStatus
      );
    });
  }

  // Mencari satu buku berdasarkan id.
  findById(id: number): Book | undefined {
    return this.books.find((book) => book.id === id);
  }

  // Menambahkan buku baru ke array dengan id berikutnya.
  create(payload: CreateBookDto): Book {
    const nextId =
      this.books.length > 0
        ? Math.max(...this.books.map((book) => book.id)) + 1
        : 1;

    // Data baru langsung dibentuk sesuai entity Book.
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

  // Menggabungkan data lama dengan payload update.
  update(id: number, payload: UpdateBookDto): Book {
    const book = this.findById(id) as Book;

    Object.assign(book, payload);

    return book;
  }

  // Menyimpan perubahan status buku yang sudah dimodifikasi di service.
  save(book: Book): Book {
    const index = this.books.findIndex((item) => item.id === book.id);

    this.books[index] = book;

    return book;
  }

  // Menghapus buku dari array berdasarkan posisi index-nya.
  remove(id: number): Book {
    const index = this.books.findIndex((book) => book.id === id);
    const [deletedBook] = this.books.splice(index, 1);

    return deletedBook;
  }
}
