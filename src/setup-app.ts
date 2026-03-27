// Import tipe aplikasi dan ValidationPipe dari NestJS.
import { INestApplication, ValidationPipe } from '@nestjs/common';
// Import builder Swagger untuk membuat dokumentasi API.
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

// Export fungsi setup agar bisa dipanggil dari main.ts saat aplikasi bootstrap.
export function setupApp(app: INestApplication): void {
  // Mengaktifkan validasi global agar request otomatis dicek berdasarkan DTO.
  app.useGlobalPipes(
    new ValidationPipe({
      // Hanya properti yang ada di DTO yang akan diproses.
      whitelist: true,
      // Request akan ditolak bila ada properti tambahan di luar DTO.
      forbidNonWhitelisted: true,
      // Query param dan body akan ditransform ke tipe data DTO bila memungkinkan.
      transform: true,
    }),
  );

  // Menyusun metadata dokumentasi Swagger untuk endpoint API.
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Library API')
    .setDescription('API sederhana perpustakaan dengan mock database array')
    .setVersion('1.0.0')
    .build();

  // Membuat dokumen Swagger dari seluruh controller dan decorator yang ada.
  const document = SwaggerModule.createDocument(app, swaggerConfig);

  // Menampilkan halaman dokumentasi API pada route /api.
  SwaggerModule.setup('api', app, document);
}
