/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { OfertaService } from './oferta.service';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { faker } from '@faker-js/faker';
import { OfertaEntity } from './oferta.entity/oferta.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('OfertaService', () => {
  let service: OfertaService;
  let repository: Repository<OfertaEntity>;
  let ofertasList;
  const seedDataBase = async () => {
    repository.clear();
    ofertasList = [];
    for (let i = 0; i < 5; i++) {
      const oferta: OfertaEntity = await repository.save({
        descripcion: faker.lorem.sentence(),
        fechaDeseada: faker.date.past().toISOString().split('T')[0],
        horaDeseada: faker.date.past().toISOString().split('T')[1].substring(0, 5),
        estado: faker.lorem.word(),
        ubicacionServicio: faker.address.streetAddress(),
        agendamiento: null,
        usuario: null,
      });
      ofertasList.push(oferta);
    }
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [OfertaService],
    }).compile();

    service = module.get<OfertaService>(OfertaService);
    repository = module.get<Repository<OfertaEntity>>(getRepositoryToken(OfertaEntity));
    await seedDataBase();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findAll should return all ofertas', async () => {
    const ofertas: OfertaEntity[] = await service.findAll();
    expect(ofertas).not.toBeNull();
    expect(ofertas).toHaveLength(ofertasList.length);
  });

  it('findOne should return a oferta by id', async () => {
    const storedOferta: OfertaEntity = ofertasList[0];
    const oferta: OfertaEntity = await service.findOne(storedOferta.id);
    expect(oferta).not.toBeNull();
    expect(oferta.descripcion).toEqual(storedOferta.descripcion);
    expect(oferta.fechaDeseada).toEqual(storedOferta.fechaDeseada);
    expect(oferta.horaDeseada).toEqual(storedOferta.horaDeseada);
    expect(oferta.estado).toEqual(storedOferta.estado);
    expect(oferta.ubicacionServicio).toEqual(storedOferta.ubicacionServicio);
  });

  it('findOne should throw an exception for an invalid oferta', async () => {
    await expect(service.findOne("0"))
      .rejects
      .toHaveProperty("message", "La oferta con el id proporcionado no existe");
  });

  it('create should return a new oferta', async () => {
    const oferta: OfertaEntity = {
      id: "",
      descripcion: faker.lorem.sentence(),
      fechaDeseada: faker.date.past().toISOString().split('T')[0],
      horaDeseada: faker.date.past().toISOString().split('T')[1].substring(0, 5),
      estado: faker.lorem.word(),
      ubicacionServicio: faker.address.streetAddress(),
      agendamiento: null,
      usuario: null,
      imagenUrl: '',
      servicio: null
    };

    const newOferta: OfertaEntity = await service.create(oferta);
    expect(newOferta).not.toBeNull();

    const storedOferta: OfertaEntity = await repository.findOne({ where: { id: newOferta.id } });
    expect(storedOferta).not.toBeNull();
    expect(storedOferta.descripcion).toEqual(newOferta.descripcion);
    expect(storedOferta.fechaDeseada).toEqual(newOferta.fechaDeseada);
    expect(storedOferta.horaDeseada).toEqual(newOferta.horaDeseada);
    expect(storedOferta.estado).toEqual(newOferta.estado);
    expect(storedOferta.ubicacionServicio).toEqual(newOferta.ubicacionServicio);
  });

  it('update should modify a oferta', async () => {
    const oferta: OfertaEntity = ofertasList[0];
    oferta.descripcion = "New description";
    oferta.fechaDeseada = faker.date.past().toISOString().split('T')[0];
    oferta.horaDeseada = faker.date.past().toISOString().split('T')[1].substring(0, 5);
    oferta.estado = faker.lorem.word();
    oferta.ubicacionServicio = faker.address.streetAddress();

    const updatedOferta: OfertaEntity = await service.update(oferta.id, oferta);
    expect(updatedOferta).not.toBeNull();

    const storedOferta: OfertaEntity = await repository.findOne({ where: { id: oferta.id } });
    expect(storedOferta).not.toBeNull();
    expect(storedOferta.descripcion).toEqual(oferta.descripcion);
    expect(storedOferta.fechaDeseada).toEqual(oferta.fechaDeseada);
    expect(storedOferta.horaDeseada).toEqual(oferta.horaDeseada);
    expect(storedOferta.estado).toEqual(oferta.estado);
    expect(storedOferta.ubicacionServicio).toEqual(oferta.ubicacionServicio);
  });

  it('update should throw an exception for an invalid oferta', async () => {
    let oferta: OfertaEntity = ofertasList[0];
    oferta = {
      ...oferta,
      descripcion: "New description",
      fechaDeseada: faker.date.past().toISOString().split('T')[0],
      horaDeseada: faker.date.past().toISOString().split('T')[1].substring(0, 5),
      estado: faker.lorem.word(),
      ubicacionServicio: faker.address.streetAddress(),
    };

    await expect(service.update("0", oferta))
      .rejects
      .toHaveProperty("message", "La oferta con el id proporcionado no existe");
  });

  it('delete should remove an oferta', async () => {
    const oferta: OfertaEntity = ofertasList[0];
    await service.delete(oferta.id);
    const deletedOferta: OfertaEntity = await repository.findOne({ where: { id: oferta.id } });
    expect(deletedOferta).toBeNull();
  });

  it('delete should throw an exception for an invalid oferta', async () => {
    const oferta: OfertaEntity = ofertasList[0];
    await service.delete(oferta.id);

    await expect(service.delete("0"))
      .rejects
      .toHaveProperty("message", "La oferta con el id proporcionado no existe");
  });
});
