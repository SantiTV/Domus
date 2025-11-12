/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { OfertaUsuarioService } from './oferta-usuario.service';
import { Repository } from 'typeorm';
import { OfertaEntity } from '../oferta/oferta.entity/oferta.entity';
import { UsuarioEntity } from '../usuario/usuario.entity/usuario.entity';
import { faker } from '@faker-js/faker';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('OfertaUsuarioService', () => {
  let service: OfertaUsuarioService;
  let ofertaRepository: Repository<OfertaEntity>;
  let usuarioRepository: Repository<UsuarioEntity>;
  let oferta: OfertaEntity;
  let usuario: UsuarioEntity;

  const seedDatabase = async () => {
    await ofertaRepository.clear();
    await usuarioRepository.clear();

    usuario = await usuarioRepository.save({
      nombre: faker.name.firstName(),
      correo: faker.internet.email(),
      contraseña: faker.internet.password(),
      telefono: faker.phone.number(),
      roles: 'user',
    });

    oferta = await ofertaRepository.save({
      descripcion: faker.lorem.sentence(),
      fechaDeseada: faker.date.future().toISOString(),
      horaDeseada: faker.date.future().toISOString(),
      estado: faker.lorem.word(),
      ubicacionServicio: faker.address.streetAddress(),
      usuario: usuario,  // asignar la entidad UsuarioEntity aquí
    });
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [OfertaUsuarioService],
    }).compile();

    service = module.get<OfertaUsuarioService>(OfertaUsuarioService);
    ofertaRepository = module.get<Repository<OfertaEntity>>(getRepositoryToken(OfertaEntity));
    usuarioRepository = module.get<Repository<UsuarioEntity>>(getRepositoryToken(UsuarioEntity));
    await seedDatabase();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('addUsuarioToOferta should add a usuario to an oferta', async () => {
    const newUsuario: UsuarioEntity = await usuarioRepository.save({
      nombre: faker.name.firstName(),
      correo: faker.internet.email(),
      contraseña: faker.internet.password(),
      telefono: faker.phone.number(),
      roles: 'user',
    });

    const newOferta: OfertaEntity = await ofertaRepository.save({
      descripcion: faker.lorem.sentence(),
      fechaDeseada: faker.date.future().toISOString(),
      horaDeseada: faker.date.future().toISOString(),
      estado: faker.lorem.word(),
      ubicacionServicio: faker.address.streetAddress(),
      usuario: null,
    });

    const result: OfertaEntity = await service.addUsuarioToOferta(newOferta.id, newUsuario.idUsuario);
    expect(result).not.toBeNull();
    expect(result.usuario).not.toBeNull();
    expect(result.usuario.idUsuario).toEqual(newUsuario.idUsuario);
  });

  it('addUsuarioToOferta should throw an exception for an invalid oferta', async () => {
    const newUsuario: UsuarioEntity = await usuarioRepository.save({
      nombre: faker.name.firstName(),
      correo: faker.internet.email(),
      contraseña: faker.internet.password(),
      telefono: faker.phone.number(),
      roles: 'user',
    });

    await expect(() => service.addUsuarioToOferta('0', newUsuario.idUsuario)).rejects.toHaveProperty(
      'message',
      'La oferta con el id proporcionado no existe',
    );
  });

  it('addUsuarioToOferta should throw an exception for an invalid usuario', async () => {
    const newOferta: OfertaEntity = await ofertaRepository.save({
      descripcion: faker.lorem.sentence(),
      fechaDeseada: faker.date.future().toISOString(),
      horaDeseada: faker.date.future().toISOString(),
      estado: faker.lorem.word(),
      ubicacionServicio: faker.address.streetAddress(),
      usuario: null,
    });

    await expect(() => service.addUsuarioToOferta(newOferta.id, '0')).rejects.toHaveProperty(
      'message',
      'El usuario con el id proporcionado no existe',
    );
  });

  it('findUsuarioByOfertaIdUsuarioId should return a usuario by oferta and usuario', async () => {
    const result: UsuarioEntity = await service.findUsuarioByOfertaIdUsuarioId(oferta.id, usuario.idUsuario);
    expect(result).not.toBeNull();
    expect(result.idUsuario).toEqual(usuario.idUsuario);
  });

  it('findUsuarioByOfertaIdUsuarioId should throw an exception for an invalid oferta', async () => {
    await expect(() => service.findUsuarioByOfertaIdUsuarioId('0', usuario.idUsuario)).rejects.toHaveProperty(
      'message',
      'La oferta con el id proporcionado no existe',
    );
  });

  it('findUsuarioByOfertaIdUsuarioId should throw an exception for an invalid usuario', async () => {
    await expect(() => service.findUsuarioByOfertaIdUsuarioId(oferta.id, '0')).rejects.toHaveProperty(
      'message',
      'El usuario con el id proporcionado no existe',
    );
  });

  it('findUsuarioByOfertaId should return a usuario by oferta', async () => {
    const result: UsuarioEntity = await service.findUsuarioByOfertaId(oferta.id);
    expect(result).not.toBeNull();
    expect(result.idUsuario).toEqual(usuario.idUsuario);
  });

  it('findUsuarioByOfertaId should throw an exception for a usuario not associated to the oferta', async () => {
    const newUsuario: UsuarioEntity = await usuarioRepository.save({
      nombre: faker.name.firstName(),
      correo: faker.internet.email(),
      contraseña: faker.internet.password(),
      telefono: faker.phone.number(),
      roles: 'user',
    });

    const newOferta: OfertaEntity = await ofertaRepository.save({
      descripcion: faker.lorem.sentence(),
      fechaDeseada: faker.date.future().toISOString(),
      horaDeseada: faker.date.future().toISOString(),
      estado: faker.lorem.word(),
      ubicacionServicio: faker.address.streetAddress(),
      usuario: null,
    });

    await expect(() => service.findUsuarioByOfertaIdUsuarioId(newOferta.id, newUsuario.idUsuario)).rejects.toHaveProperty(
      'message',
      'La oferta no tiene un usuario asociado',
    );
  });

  it('deleteUsuarioFromOferta should remove a usuario from an oferta', async () => {
    const result: OfertaEntity = await service.deleteUsuarioFromOferta(oferta.id, usuario.idUsuario);
    expect(result).not.toBeNull();
    expect(result.usuario).toBeNull();

    const storedOferta: OfertaEntity = await ofertaRepository.findOne({
      where: { id: oferta.id },
      relations: ['usuario'],
    });
    expect(storedOferta).not.toBeNull();
    expect(storedOferta.usuario).toBeNull();
  });

  it('deleteUsuarioFromOferta should throw an exception for an invalid usuario', async () => {
    await expect(() => service.deleteUsuarioFromOferta(oferta.id, '0')).rejects.toHaveProperty(
      'message',
      'El usuario con el id proporcionado no existe',
    );
  });

  it('deleteUsuarioFromOferta should throw an exception for an invalid oferta', async () => {
    await expect(() => service.deleteUsuarioFromOferta('0', usuario.idUsuario)).rejects.toHaveProperty(
      'message',
      'La oferta con el id proporcionado no existe',
    );
  });

  it('deleteUsuarioFromOferta should throw an exception for a usuario not associated to the oferta', async () => {
    const newUsuario: UsuarioEntity = await usuarioRepository.save({
      nombre: faker.name.firstName(),
      correo: faker.internet.email(),
      contraseña: faker.internet.password(),
      telefono: faker.phone.number(),
      roles: 'user',
    });

    await expect(() => service.deleteUsuarioFromOferta(oferta.id, newUsuario.idUsuario)).rejects.toHaveProperty(
      'message',
      'El usuario no está asociado a la oferta',
    );
  });
});
