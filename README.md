# Perpustakaan Budi 

Project ini adalah aplikasi NestJS sederhana untuk sistem perpustakaan dengan:

- `Controller`, `Service`, dan `Repository`
- mock database menggunakan array biasa
- DTO + validasi request
- dokumentasi Swagger di `/api`
- middleware logging request

## Menjalankan project
- `link Railway with Swagger : https://perpustakaan-production-f384.up.railway.app/api#/Library/LibraryController_findAll` Menggunnakan Applikasi Railway.
- `Katalog Perpustakaan *** : https://perpustakaan-production-f384.up.railway.app/books` Database library buku. 
- `Cek Judul buku by Id *** : https://perpustakaan-production-f384.up.railway.app/books/1`

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


{
  "title": "Filosofi Teras",
  "author": "Henry Manampiring",
  "category": "Self Improvement",
  "publishedYear": 2018
}


## Testing daftar Product by railway 
<img width="1755" height="955" alt="image" src="https://github.com/user-attachments/assets/069c111c-f4b4-498e-9fbb-f745904a9817" />

## Testing Apabila daftar Id buku tidak tersedia ,tidak bisa (not found).
<img width="1547" height="603" alt="image" src="https://github.com/user-attachments/assets/afcfd700-bc62-427a-bf8b-409fe1b80df6" />

### Testing meminjamkan buku h nya ketik nama dan Id .
##Sebelum meminjam " <img width="235" height="154" alt="image" src="https://github.com/user-attachments/assets/40a27bb7-57a1-4b66-8431-bc56444d5bd7" />
## sesudah meminjam akan ada perubahan di tanggal dan bolean "<img width="358" height="149" alt="image" src="https://github.com/user-attachments/assets/d3c2073c-f20c-44ba-be25-1c0ae231b10b" />
