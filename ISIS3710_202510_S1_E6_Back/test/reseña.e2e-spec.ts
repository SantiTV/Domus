/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('ReseñaController (e2e)', () => {
  let app: INestApplication;
  let reseñaId: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
    await app.init();
  });

  it('Debe crear una reseña', async () => {
    const response = await request(app.getHttpServer())
      .post('/resenias')
      .send({
        comentario: 'Muy buen servicio',
        calificacion: 5,
        fechaReseña: new Date().toISOString(),
      })
      .expect(201);

    expect(response.body).toHaveProperty('id');
    reseñaId = response.body.id;
  });

  it('Debe obtener la reseña creada', async () => {
    const response = await request(app.getHttpServer())
      .get(`/resenias/${reseñaId}`)
      .expect(200);

    expect(response.body.comentario).toBe('Muy buen servicio');
  });

  it('Debe eliminar la reseña', async () => {
    await request(app.getHttpServer())
      .delete(`/resenias/${reseñaId}`)
      .expect(204);
  });

  afterAll(async () => {
    await app.close();
  });
});
