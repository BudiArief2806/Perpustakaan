import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';
import { Book } from './../src/modules/library/entities/book.entity';
import { setupApp } from './../src/setup-app';

type SwaggerDocumentResponse = {
  info: {
    title: string;
  };
  paths: Record<string, unknown>;
};

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    setupApp(app);
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('/books (GET)', () => {
    return request(app.getHttpServer()).get('/books').expect(200);
  });

  it('/books?category=Novel (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get('/books?category=Novel')
      .expect(200);
    const body = response.body as Book[];

    expect(body).toHaveLength(1);
    expect(body[0].title).toBe('Laskar Pelangi');
  });

  it('/books/:id/borrow (POST)', async () => {
    const response = await request(app.getHttpServer())
      .post('/books/1/borrow')
      .send({ borrowerName: 'Budi' })
      .expect(201);
    const body = response.body as Book;

    expect(body.isBorrowed).toBe(true);
    expect(body.borrowerName).toBe('Budi');
  });

  it('/books/:id (DELETE)', async () => {
    const response = await request(app.getHttpServer())
      .delete('/books/1')
      .expect(200);
    const body = response.body as Book;

    expect(body.id).toBe(1);

    await request(app.getHttpServer()).get('/books/1').expect(404);
  });

  it('/api-json (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get('/api-json')
      .expect(200);
    const body = response.body as SwaggerDocumentResponse;

    expect(body.info.title).toBe('Library API');
    expect(body.paths['/books']).toBeDefined();
    expect(body.paths['/books/{id}']).toBeDefined();
  });
});
