// Import PartialType untuk membuat semua properti CreateBookDto menjadi opsional.
import { PartialType } from '@nestjs/swagger';
// Import DTO create sebagai dasar field yang akan diwariskan.
import { CreateBookDto } from './create-book.dto';

// DTO update mewarisi CreateBookDto, tetapi semua field menjadi opsional.
export class UpdateBookDto extends PartialType(CreateBookDto) {}
