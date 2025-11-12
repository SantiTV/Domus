/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { TrabajadorService } from './trabajador.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TrabajadorEntity } from './trabajador.entity';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

describe('TrabajadorService', () => {
  let service: TrabajadorService;
  let repo: Repository<TrabajadorEntity>;

  const mockTrabajador: TrabajadorEntity = {
    idUsuario: '1',
    nombre: 'Juan',
    correo: 'juan@example.com',
    contraseña: '123456',
    telefono: '1234567890',
    roles: 'trabajador',
    especialidad: 'Plomería',
    agendamientos: [],
    servicios: [],
    disponibilidad: 'Lunes a Viernes',
    ubicacion: 'Bogotá',
    hojaDeVida: 'link.pdf',
    oferta: [],
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TrabajadorService,
        {
          provide: getRepositoryToken(TrabajadorEntity),
          useValue: {
            find: jest.fn().mockResolvedValue([mockTrabajador]),
            findOne: jest.fn().mockResolvedValue(mockTrabajador),
            save: jest.fn().mockResolvedValue(mockTrabajador),
            remove: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    service = module.get<TrabajadorService>(TrabajadorService);
    repo = module.get<Repository<TrabajadorEntity>>(getRepositoryToken(TrabajadorEntity));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findAllTrabajadores', () => {
    it('debería retornar todos los trabajadores', async () => {
      const result = await service.findAllTrabajadores();
      expect(result).toEqual([mockTrabajador]);
      expect(repo.find).toHaveBeenCalled();
    });
  });

  describe('findOneTrabajador', () => {
    it('debería retornar un trabajador existente', async () => {
      const result = await service.findOneTrabajador('1');
      expect(result).toEqual(mockTrabajador);
      expect(repo.findOne).toHaveBeenCalledWith({ where: { id: '1' } });
    });

    it('debería lanzar NotFoundException si no se encuentra', async () => {
      jest.spyOn(repo, 'findOne').mockResolvedValue(null);
      await expect(service.findOneTrabajador('1')).rejects.toThrowError(
        new NotFoundException('Trabajador con ID 1 no encontrado'),
      );
    });
  });

  describe('createTrabajador', () => {
    it('debería crear un trabajador', async () => {
      const result = await service.createTrabajador(mockTrabajador);
      expect(result).toEqual(mockTrabajador);
      expect(repo.save).toHaveBeenCalledWith(mockTrabajador);
    });
  });

  describe('deleteTrabajador', () => {
    it('debería eliminar un trabajador existente', async () => {
      await service.deleteTrabajador('1');
      expect(repo.remove).toHaveBeenCalledWith(mockTrabajador);
    });

    it('debería lanzar NotFoundException si no se encuentra el trabajador', async () => {
      jest.spyOn(repo, 'findOne').mockResolvedValue(null);
      await expect(service.deleteTrabajador('0')).rejects.toThrowError(
        new NotFoundException('Trabajador con ID 0 no encontrado'),
      );
    });
  });
});
