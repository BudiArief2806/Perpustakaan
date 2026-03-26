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
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiQuery,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { BorrowBookDto } from './dto/borrow-book.dto';
import { CreateBookDto } from './dto/create-book.dto';
import { QueryBookDto } from './dto/query-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';
import { LibraryService } from './library.service';

@ApiTags('Library')
@Controller('books')
export class LibraryController {
  constructor(private readonly libraryService: LibraryService) {}

  @Get()
  @ApiOperation({ summary: 'Ambil semua data buku' })
  @ApiOkResponse({ type: Book, isArray: true })
  @ApiQuery({ name: 'category', required: false, type: String })
  @ApiQuery({ name: 'author', required: false, type: String })
  @ApiQuery({ name: 'isBorrowed', required: false, type: Boolean })
  findAll(@Query() query: QueryBookDto): Book[] {
    return this.libraryService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Ambil detail buku berdasarkan id' })
  @ApiOkResponse({ type: Book })
  @ApiNotFoundResponse({ description: 'Buku tidak ditemukan' })
  findOne(@Param('id', ParseIntPipe) id: number): Book {
    return this.libraryService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Tambah buku baru' })
  @ApiCreatedResponse({ type: Book })
  create(@Body() payload: CreateBookDto): Book {
    return this.libraryService.create(payload);
  }

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

  @Post(':id/return')
  @ApiOperation({ summary: 'Kembalikan buku' })
  @ApiOkResponse({ type: Book })
  @ApiNotFoundResponse({ description: 'Buku tidak ditemukan' })
  @ApiBadRequestResponse({ description: 'Buku belum dipinjam' })
  returnBook(@Param('id', ParseIntPipe) id: number): Book {
    return this.libraryService.returnBook(id);
  }

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
