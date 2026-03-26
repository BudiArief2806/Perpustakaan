# Library API

Project ini adalah aplikasi NestJS sederhana untuk sistem perpustakaan dengan:

- `Controller`, `Service`, dan `Repository`
- mock database menggunakan array biasa
- DTO + validasi request
- dokumentasi Swagger di `/api`
- middleware logging request

## Menjalankan project

```bash
npm install
npm run start:dev
```

App default berjalan di `http://localhost:3000`.
Swagger tersedia di `http://localhost:3000/api`.

## Struktur fitur

- `src/modules/library/library.controller.ts`
- `src/modules/library/library.service.ts`
- `src/modules/library/library.repository.ts`
- `src/modules/library/dto`
- `src/modules/library/entities`

## Endpoint utama

- `GET /books` ambil semua buku
- `GET /books/:id` ambil detail buku
- `POST /books` tambah buku
- `PATCH /books/:id` update buku
- `POST /books/:id/borrow` pinjam buku
- `POST /books/:id/return` kembalikan buku
- `DELETE /books/:id` hapus buku

## Query filter

Endpoint `GET /books` mendukung query berikut:

- `category`
- `author`
- `isBorrowed`

Contoh:

```bash
GET /books?category=Novel
GET /books?author=Andrea
GET /books?isBorrowed=true
```

## Contoh request tambah buku

```json
{
  "title": "Filosofi Teras",
  "author": "Henry Manampiring",
  "category": "Self Improvement",
  "publishedYear": 2018
}
```

## Testing

```bash
npm run test
npm run test:e2e
npm run lint
```
