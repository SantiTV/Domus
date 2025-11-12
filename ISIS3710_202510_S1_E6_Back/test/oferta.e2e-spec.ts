/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('OfertaController (e2e)', () => {
  let app: INestApplication;
  let ofertaId: string;
  let usuarioId: string;
  let servicioId: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('Debe crear un usuario para la prueba', async () => {
    const res = await request(app.getHttpServer())
      .post('/usuarios')
      .send({
        nombre: 'Prueba Usuario',
        correo: 'prueba@example.com',
        contraseña: '123456',
        telefono: '3001234567',
        roles: 'usuario',
      })
      .expect(201);

    usuarioId = res.body.idUsuario;
    expect(usuarioId).toBeDefined();
  });

  it('Debe crear un servicio para la prueba', async () => {
    const res = await request(app.getHttpServer())
      .post('/servicios')
      .send({
        nombre: 'Plomería',
        descripcion: 'Servicio básico de plomería',
        precioBase: 50000,
        categoria: 'Hogar',
      })
      .expect(201);

    servicioId = res.body.id;
    expect(servicioId).toBeDefined();
  });

  it('Debe crear una oferta', async () => {
    const response = await request(app.getHttpServer())
      .post('/ofertas')
      .send({
        descripcion: 'Necesito arreglar el lavamanos',
        fechaDeseada: '2025-06-10T00:00:00.000Z',
        horaDeseada: '2025-06-10T08:00:00.000Z',
        estado: 'Disponible',
        ubicacionServicio: 'Bogotá',
        imagenUrl: 'https://i.ibb.co/Tx7jzdZ/tuberia3.png',
        usuarioId,
        servicioId,
      })
      .expect(201);

    ofertaId = response.body.id;
    expect(ofertaId).toBeDefined();
  });

  it('Debe obtener la oferta creada', async () => {
    const response = await request(app.getHttpServer())
      .get(`/ofertas/${ofertaId}`)
      .expect(200);

    expect(response.body.descripcion).toContain('lavamanos');
  });

  it('Debe eliminar la oferta', async () => {
    await request(app.getHttpServer())
      .delete(`/ofertas/${ofertaId}`)
      .expect(204);
  });

  it('Debe eliminar el usuario de prueba', async () => {
    await request(app.getHttpServer())
      .delete(`/usuarios/${usuarioId}`)
      .expect(204);
  });

  it('Debe eliminar el servicio de prueba', async () => {
    await request(app.getHttpServer())
      .delete(`/servicios/${servicioId}`)
      .expect(204);
  });

  afterAll(async () => {
    await app.close();
  });
});
