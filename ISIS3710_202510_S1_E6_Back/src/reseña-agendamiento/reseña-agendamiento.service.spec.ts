/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { ReseñaAgendamientoService } from './reseña-agendamiento.service';
import { Repository } from 'typeorm';
import { ReseñaEntity } from '../reseña/reseña.entity/reseña.entity';
import { AgendamientoEntity } from '../agendamiento/agendamiento.entity/agendamiento.entity';
import { faker } from '@faker-js/faker';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('ReseñaAgendamientoService', () => {
  let service: ReseñaAgendamientoService;
  let reseñaRepository: Repository<ReseñaEntity>;
  let agendamientoRepository: Repository<AgendamientoEntity>;
  let reseña: ReseñaEntity;
  let agendamiento: AgendamientoEntity;

  const seedDatabase = async () => {
    await reseñaRepository.clear();
    await agendamientoRepository.clear();

    agendamiento = await agendamientoRepository.save({
      fechaProgramada: faker.date.past(),
      horaProgramada: faker.date.past(),
      estadoServicio: faker.lorem.word(),
      usuario: null,
      trabajador: null,
      oferta: null,
      reseña: null,
      notificacion: null,
    });

    reseña = await reseñaRepository.save({
      comentario: 'Comentario de prueba',
      calificacion: 5,
      fechaReseña: faker.date.past(),
      agendamiento: agendamiento,
    });
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [ReseñaAgendamientoService],
    }).compile();

    service = module.get<ReseñaAgendamientoService>(ReseñaAgendamientoService);
    reseñaRepository = module.get<Repository<ReseñaEntity>>(getRepositoryToken(ReseñaEntity));
    agendamientoRepository = module.get<Repository<AgendamientoEntity>>(getRepositoryToken(AgendamientoEntity));
    await seedDatabase();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('addAgendamientoToReseña should add an agendamiento to a reseña', async () => {
    const newAgendamiento: AgendamientoEntity = await agendamientoRepository.save({
      fechaProgramada: faker.date.past(),
      horaProgramada: faker.date.past(),
      estadoServicio: faker.lorem.word(),
      usuario: null,
      trabajador: null,
      oferta: null,
      reseña: null,
      notificacion: null,
    });

    const newReseña: ReseñaEntity = await reseñaRepository.save({
      comentario: 'Comentario de prueba',
      calificacion: 5,
      fechaReseña: faker.date.past(),
      agendamiento: null,
    });

    const updatedReseña: ReseñaEntity = await service.addAgendamientoToReseña(newReseña.id, newAgendamiento.id);

    expect(updatedReseña).not.toBeNull();
    expect(updatedReseña.agendamiento).not.toBeNull();
    expect(updatedReseña.agendamiento.id).toEqual(newAgendamiento.id);
  });

  it('addAgendamientoToReseña should throw an exception for an invalid reseña', async () => {
    const newAgendamiento: AgendamientoEntity = await agendamientoRepository.save({
      fechaProgramada: faker.date.past(),
      horaProgramada: faker.date.past(),
      estadoServicio: faker.lorem.word(),
      usuario: null,
      trabajador: null,
      oferta: null,
      reseña: null,
      notificacion: null,
    });

    await expect(() => service.addAgendamientoToReseña("0", newAgendamiento.id)).rejects.toHaveProperty("message", "La reseña con el id proporcionado no existe");
  });

  it('addAgendamientoToReseña should throw an exception for an invalid agendamiento', async () => {
    await expect(() => service.addAgendamientoToReseña(reseña.id, "0")).rejects.toHaveProperty("message", "El agendamiento con el id proporcionado no existe");
  });

  it('findAgendamientoByReseñaIdAgendamientoId should return agendamiento by reseña and agendamiento', async () => {
    const foundAgendamiento: AgendamientoEntity = await service.findAgendamientoByReseñaIdAgendamientoId(reseña.id, agendamiento.id);
    expect(foundAgendamiento).not.toBeNull();
    expect(foundAgendamiento.id).toEqual(agendamiento.id);
  });

  it('findAgendamientoByReseñaIdAgendamientoId should throw an exception for an invalid reseña', async () => {
    await expect(() => service.findAgendamientoByReseñaIdAgendamientoId("0", agendamiento.id)).rejects.toHaveProperty("message", "La reseña con el id proporcionado no existe");
  });

  it('findAgendamientoByReseñaIdAgendamientoId should throw an exception for an invalid agendamiento', async () => {
    await expect(() => service.findAgendamientoByReseñaIdAgendamientoId(reseña.id, "0")).rejects.toHaveProperty("message", "El agendamiento con el id proporcionado no existe");
  });

  it('findAgendamientoByReseñaId should return agendamiento by reseña', async () => {
    const foundAgendamiento: AgendamientoEntity = await service.findAgendamientoByReseñaId(reseña.id);
    expect(foundAgendamiento).not.toBeNull();
    expect(foundAgendamiento.id).toEqual(agendamiento.id);
  });

  it('findAgendamientoByReseñaId should throw an exception for an agendamiento not associated to the reseña', async () => {
    const newAgendamiento: AgendamientoEntity = await agendamientoRepository.save({
      fechaProgramada: faker.date.past(),
      horaProgramada: faker.date.past(),
      estadoServicio: faker.lorem.word(),
      usuario: null,
      trabajador: null,
      oferta: null,
      reseña: null,
      notificacion: null,
    });

    const newReseña: ReseñaEntity = await reseñaRepository.save({
      comentario: 'Comentario de prueba',
      calificacion: 5,
      fechaReseña: faker.date.past(),
      agendamiento: null,
    });

    await expect(() => service.findAgendamientoByReseñaIdAgendamientoId(newReseña.id, newAgendamiento.id)).rejects.toHaveProperty("message", "La reseña no tiene un agendamiento asociado");
  });

  it('deleteAgendamientoFromReseña should remove agendamiento from reseña', async () => {
    const updatedReseña: ReseñaEntity = await service.deleteAgendamientoFromReseña(reseña.id, agendamiento.id);
    expect(updatedReseña).not.toBeNull();
    expect(updatedReseña.agendamiento).toBeNull();
  });

  it('deleteAgendamientoFromReseña should throw an exception for an invalid reseña', async () => {
    await expect(() => service.deleteAgendamientoFromReseña("0", agendamiento.id)).rejects.toHaveProperty("message", "La reseña con el id proporcionado no existe");
  });

  it('deleteAgendamientoFromReseña should throw an exception for an invalid agendamiento', async () => {
    await expect(() => service.deleteAgendamientoFromReseña(reseña.id, "0")).rejects.toHaveProperty("message", "El agendamiento con el id proporcionado no existe");
  });

  it('deleteAgendamientoFromReseña should throw an exception for an agendamiento not associated to the reseña', async () => {
    const newAgendamiento: AgendamientoEntity = await agendamientoRepository.save({
      fechaProgramada: faker.date.past(),
      horaProgramada: faker.date.past(),
      estadoServicio: faker.lorem.word(),
      usuario: null,
      trabajador: null,
      oferta: null,
      reseña: null,
      notificacion: null,
    });

    await expect(() => service.deleteAgendamientoFromReseña(reseña.id, newAgendamiento.id)).rejects.toHaveProperty("message", "El agendamiento no está asociado a la reseña");
  });
});
