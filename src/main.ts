// Import factory NestJS untuk membuat instance aplikasi.
import { NestFactory } from '@nestjs/core';
// Import root module yang menjadi pintu masuk seluruh aplikasi.
import { AppModule } from './app.module';
// Import helper setup untuk konfigurasi global aplikasi.
import { setupApp } from './setup-app';

async function bootstrap() {
  // Membuat instance aplikasi Nest dari AppModule sebagai root module.
  const app = await NestFactory.create(AppModule);

  // Menjalankan konfigurasi global seperti ValidationPipe dan Swagger.
  setupApp(app);

  // Menjalankan server pada port environment atau default 3000.
  await app.listen(process.env.PORT ?? 3000);
}

// Menjalankan fungsi bootstrap saat aplikasi pertama kali start.
void bootstrap();
