/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { OfertaAgendamientoService } from './oferta-agendamiento.service';
import { Repository } from 'typeorm';
import { OfertaEntity } from '../oferta/oferta.entity/oferta.entity';
import { AgendamientoEntity } from '../agendamiento/agendamiento.entity/agendamiento.entity';
import { faker } from '@faker-js/faker';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('OfertaAgendamientoService', () => {
  let service: OfertaAgendamientoService;
  let ofertaRepository: Repository<OfertaEntity>;
  let agendamientoRepository: Repository<AgendamientoEntity>;
  let oferta: OfertaEntity;
  let agendamiento: AgendamientoEntity;

  const seedDatabase = async () => {
    await ofertaRepository.clear();
    await agendamientoRepository.clear();

    // Para crear un AgendamientoEntity, como no tiene campos simples, solo guardamos vacío
    agendamiento = await agendamientoRepository.save({});

    oferta = await ofertaRepository.save({
      descripcion: faker.lorem.sentence(),
      fechaDeseada: faker.date.future().toISOString(),
      horaDeseada: faker.date.future().toISOString(),
      estado: faker.lorem.word(),
      ubicacionServicio: faker.address.streetAddress(),
      agendamiento: agendamiento,
    });
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [OfertaAgendamientoService],
    }).compile();

    service = module.get<OfertaAgendamientoService>(OfertaAgendamientoService);
    ofertaRepository = module.get<Repository<OfertaEntity>>(getRepositoryToken(OfertaEntity));
    agendamientoRepository = module.get<Repository<AgendamientoEntity>>(getRepositoryToken(AgendamientoEntity));
    await seedDatabase();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('addAgendamientoToOferta should add an agendamiento to an oferta', async () => {
    const newAgendamiento: AgendamientoEntity = await agendamientoRepository.save({});

    const newOferta: OfertaEntity = await ofertaRepository.save({
      descripcion: faker.lorem.sentence(),
      fechaDeseada: faker.date.future().toISOString(),
      horaDeseada: faker.date.future().toISOString(),
      estado: faker.lorem.word(),
      ubicacionServicio: faker.address.streetAddress(),
    });

    const result: OfertaEntity = await service.addAgendamientoToOferta(newOferta.id, newAgendamiento.id);
    expect(result).not.toBeNull();
    expect(result.agendamiento).not.toBeNull();
    expect(result.agendamiento.id).toEqual(newAgendamiento.id);
  });

  it('addAgendamientoToOferta should throw an exception for an invalid agendamiento', async () => {
    const newOferta: OfertaEntity = await ofertaRepository.save({
      descripcion: faker.lorem.sentence(),
      fechaDeseada: faker.date.future().toISOString(),
      horaDeseada: faker.date.future().toISOString(),
      estado: faker.lorem.word(),
      ubicacionServicio: faker.address.streetAddress(),
    });

    await expect(() => service.addAgendamientoToOferta(newOferta.id, '0')).rejects.toHaveProperty('message', 'El agendamiento con el id proporcionado no existe');
  });

  it('addAgendamientoToOferta should throw an exception for an invalid oferta', async () => {
    const newAgendamiento: AgendamientoEntity = await agendamientoRepository.save({});

    await expect(() => service.addAgendamientoToOferta('0', newAgendamiento.id)).rejects.toHaveProperty('message', 'La oferta con el id proporcionado no existe');
  });

  it('findAgendamientoByOfertaIdAgendamientoId should return an agendamiento by oferta and agendamiento', async () => {
    const result: AgendamientoEntity = await service.findAgendamientoByOfertaIdAgendamientoId(oferta.id, agendamiento.id);
    expect(result).not.toBeNull();
    expect(result.id).toEqual(agendamiento.id);
  });

  it('findAgendamientoByOfertaIdAgendamientoId should throw an exception for an invalid oferta', async () => {
    await expect(() => service.findAgendamientoByOfertaIdAgendamientoId('0', agendamiento.id)).rejects.toHaveProperty('message', 'La oferta con el id proporcionado no existe');
  });

  it('findAgendamientoByOfertaIdAgendamientoId should throw an exception for an invalid agendamiento', async () => {
    await expect(() => service.findAgendamientoByOfertaIdAgendamientoId(oferta.id, '0')).rejects.toHaveProperty('message', 'El agendamiento con el id proporcionado no existe');
  });

  it('findAgendamientoByOfertaId should return an agendamiento by oferta', async () => {
    const result: AgendamientoEntity = await service.findAgendamientoByOfertaId(oferta.id);
    expect(result).not.toBeNull();
    expect(result.id).toEqual(agendamiento.id);
  });

  it('findAgendamientoByOfertaId should throw an exception for an agendamiento not associated to the oferta', async () => {
    const newAgendamiento: AgendamientoEntity = await agendamientoRepository.save({});

    const newOferta: OfertaEntity = await ofertaRepository.save({
      descripcion: faker.lorem.sentence(),
      fechaDeseada: faker.date.future().toISOString(),
      horaDeseada: faker.date.future().toISOString(),
      estado: faker.lorem.word(),
      ubicacionServicio: faker.address.streetAddress(),
    });

    await expect(() => service.findAgendamientoByOfertaIdAgendamientoId(newOferta.id, newAgendamiento.id)).rejects.toHaveProperty('message', 'La oferta no tiene un agendamiento asociado');
  });

  it('deleteAgendamientoFromOferta should remove an agendamiento from an oferta', async () => {
    const result: OfertaEntity = await service.deleteAgendamientoFromOferta(oferta.id, agendamiento.id);
    expect(result).not.toBeNull();
    expect(result.agendamiento).toBeNull();
  });

  it('deleteAgendamientoFromOferta should throw an exception for an invalid oferta', async () => {
    await expect(() => service.deleteAgendamientoFromOferta('0', agendamiento.id)).rejects.toHaveProperty('message', 'La oferta con el id proporcionado no existe');
  });

  it('deleteAgendamientoFromOferta should throw an exception for an invalid agendamiento', async () => {
    await expect(() => service.deleteAgendamientoFromOferta(oferta.id, '0')).rejects.toHaveProperty('message', 'El agendamiento con el id proporcionado no existe');
  });

  it('deleteAgendamientoFromOferta should throw an exception for an agendamiento not associated to the oferta', async () => {
    const newAgendamiento: AgendamientoEntity = await agendamientoRepository.save({});

    await expect(() => service.deleteAgendamientoFromOferta(oferta.id, newAgendamiento.id)).rejects.toHaveProperty('message', 'El agendamiento no está asociado a la oferta');
  });
});
