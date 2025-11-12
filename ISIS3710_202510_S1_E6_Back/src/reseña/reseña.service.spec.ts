/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { ReseñaService } from './reseña.service';
import { Repository } from 'typeorm';
import { ReseñaEntity } from './reseña.entity/reseña.entity';
import { TypeOrmTestingConfig } from "../shared/testing-utils/typeorm-testing-config";
import { getRepositoryToken } from '@nestjs/typeorm';
import { faker } from '@faker-js/faker';

describe('ReseñaService', () => {
  let service: ReseñaService;
  let repository: Repository<ReseñaEntity>;
  let reseñasList;
  const seedDataBase = async () => {
    repository.clear();
    reseñasList = [];
    for (let i = 0; i < 5; i++) {
      const reseña: ReseñaEntity = await repository.save({
        comentario: faker.lorem.sentence(),
        calificacion: faker.number.int({ min: 1, max: 5 }),
        fechaReseña: faker.date.past(),
        agendamiento: null,})
        reseñasList.push(reseña);
      
    }
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [ReseñaService],
    }).compile();

    service = module.get<ReseñaService>(ReseñaService);
    repository = module.get<Repository<ReseñaEntity>>(getRepositoryToken(ReseñaEntity));
    await seedDataBase();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findAll should return all reseñas', async () => {
    const reseñas: ReseñaEntity[] = await service.findAll();
    expect(reseñas).not.toBeNull();
    expect(reseñas).toHaveLength(reseñasList.length);
  });

  it('findOne should return a reseña by id', async () => {
    const storedReseña: ReseñaEntity = reseñasList[0];
    const reseña: ReseñaEntity = await service.findOne(storedReseña.id);
    expect(reseña).not.toBeNull();
    expect(reseña.comentario).toEqual(storedReseña.comentario);
    expect(reseña.calificacion).toEqual(storedReseña.calificacion);
    expect(reseña.fechaReseña).toEqual(storedReseña.fechaReseña);
  })

  it('findOne should throw an exception for an invalid reseña', async () => {
    await expect(() => service.findOne("0")).rejects.toHaveProperty("message", "La reseña con el id proporcionado no existe");
  });

  it('create should return a new reseña', async () => {
    const reseña: ReseñaEntity = {
      id: "",
      comentario: faker.lorem.sentence(),
      calificacion: faker.number.int({ min: 1, max: 5 }),
      fechaReseña: faker.date.past(),
      agendamiento: null,
    }

    const newReseña: ReseñaEntity = await service.create(reseña);
    expect(newReseña).not.toBeNull();

    const storedReseña: ReseñaEntity = await repository.findOne({ where: { id: newReseña.id } })
    expect(storedReseña).not.toBeNull();
    expect(storedReseña.comentario).toEqual(newReseña.comentario);
    expect(storedReseña.calificacion).toEqual(newReseña.calificacion);
    expect(storedReseña.fechaReseña).toEqual(newReseña.fechaReseña);
  });

  it('update should modify a reseña', async () => {
    const reseña: ReseñaEntity = reseñasList[0];
    reseña.comentario = "New comment";
    reseña.calificacion = 4;
    const updatedReseña: ReseñaEntity = await service.update(reseña.id, reseña);
    expect(updatedReseña).not.toBeNull();
    const storedReseña: ReseñaEntity = await repository.findOne({ where: { id: reseña.id } })
    expect(storedReseña).not.toBeNull();
    expect(storedReseña.comentario).toEqual(reseña.comentario);
    expect(storedReseña.calificacion).toEqual(reseña.calificacion);
  });

  it('update should throw an exception for an invalid reseña', async () => {
    let reseña: ReseñaEntity = reseñasList[0];
    reseña = {
      ...reseña, comentario: "New comment", calificacion: 4
    }
    await expect(() => service.update("0", reseña)).rejects.toHaveProperty("message", "La reseña con el id proporcionado no existe");
  });

  it('delete should remove a reseña', async () => {
    const reseña: ReseñaEntity = reseñasList[0];
    await service.delete(reseña.id);
    const deletedReseña: ReseñaEntity = await repository.findOne({ where: { id: reseña.id } })
    expect(deletedReseña).toBeNull();
  });

  it('delete should throw an exception for an invalid reseña', async () => {
    const reseña: ReseñaEntity = reseñasList[0];
    await service.delete(reseña.id);
    await expect(() => service.delete("0")).rejects.toHaveProperty("message", "La reseña con el id proporcionado no existe");
  });
});
