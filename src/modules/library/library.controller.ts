// Import decorator dan helper NestJS untuk membuat endpoint REST API.
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
// Import decorator Swagger untuk dokumentasi endpoint dan response API.
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiQuery,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
// Import DTO, entity, dan service yang dibutuhkan controller.
import { BorrowBookDto } from './dto/borrow-book.dto';
import { CreateBookDto } from './dto/create-book.dto';
import { QueryBookDto } from './dto/query-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';
import { LibraryService } from './library.service';

// Export controller ini agar route /books bisa dikenali oleh NestJS.
@ApiTags('Library')
@Controller('books')
export class LibraryController {
  constructor(private readonly libraryService: LibraryService) {}

  // Mengambil semua data buku, termasuk hasil filter dari query bila ada.
  @Get()
  @ApiOperation({ summary: 'Ambil semua data buku' })
  @ApiOkResponse({ type: Book, isArray: true })
  @ApiQuery({ name: 'title', required: false, type: String })
  @ApiQuery({ name: 'category', required: false, type: String })
  @ApiQuery({ name: 'author', required: false, type: String })
  @ApiQuery({ name: 'isBorrowed', required: false, type: Boolean })
  findAll(@Query() query: QueryBookDto): Book[] {
    return this.libraryService.findAll(query);
  }

  // Mengambil satu buku berdasarkan id yang dikirim lewat parameter URL.
  @Get(':id')
  @ApiOperation({ summary: 'Ambil detail buku berdasarkan id' })
  @ApiOkResponse({ type: Book })
  @ApiNotFoundResponse({ description: 'Buku tidak ditemukan' })
  findOne(@Param('id', ParseIntPipe) id: number): Book {
    return this.libraryService.findOne(id);
  }

  // Menambahkan buku baru berdasarkan data yang sudah lolos validasi DTO.
  @Post()
  @ApiOperation({ summary: 'Tambah buku baru' })
  @ApiCreatedResponse({ type: Book })
  create(@Body() payload: CreateBookDto): Book {
    return this.libraryService.create(payload);
  }

  // Mengubah data buku tertentu berdasarkan id dan payload update.
  @Patch(':id')
  @ApiOperation({ summary: 'Update data buku' })
  @ApiOkResponse({ type: Book })
  @ApiNotFoundResponse({ description: 'Buku tidak ditemukan' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateBookDto,
  ): Book {
    return this.libraryService.update(id, payload);
  }

  // Menandai buku sebagai sedang dipinjam oleh peminjam tertentu.
  @Post(':id/borrow')
  @ApiOperation({ summary: 'Pinjam buku' })
  @ApiOkResponse({ type: Book })
  @ApiNotFoundResponse({ description: 'Buku tidak ditemukan' })
  @ApiBadRequestResponse({ description: 'Buku sedang dipinjam' })
  borrow(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: BorrowBookDto,
  ): Book {
    return this.libraryService.borrow(id, payload);
  }

  // Mengembalikan status buku menjadi tersedia kembali.
  @Post(':id/return')
  @ApiOperation({ summary: 'Kembalikan buku' })
  @ApiOkResponse({ type: Book })
  @ApiNotFoundResponse({ description: 'Buku tidak ditemukan' })
  @ApiBadRequestResponse({ description: 'Buku belum dipinjam' })
  returnBook(@Param('id', ParseIntPipe) id: number): Book {
    return this.libraryService.returnBook(id);
  }

  // Menghapus buku dari array mock database jika buku tidak sedang dipinjam.
  @Delete(':id')
  @ApiOperation({ summary: 'Hapus buku' })
  @ApiOkResponse({ type: Book })
  @ApiNotFoundResponse({ description: 'Buku tidak ditemukan' })
  @ApiBadRequestResponse({
    description: 'Buku sedang dipinjam dan tidak bisa dihapus',
  })
  remove(@Param('id', ParseIntPipe) id: number): Book {
    return this.libraryService.remove(id);
  }
}
