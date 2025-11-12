/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { NotificacionService } from './notificacion.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotificacionEntity } from './notificacion.entity/notificacion.entity';
import { Repository } from 'typeorm';
import { BadRequestException } from '@nestjs/common';

const mockNotificacion: NotificacionEntity = {
  id: '1',
  titulo: 'Test',
  mensaje: 'Mensaje de prueba',
  fechaNotificacion: new Date(),
  agendamiento: null,
};

describe('NotificacionService', () => {
  let service: NotificacionService;
  let repo: Repository<NotificacionEntity>;

  const mockRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    save: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NotificacionService,
        {
          provide: getRepositoryToken(NotificacionEntity),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<NotificacionService>(NotificacionService);
    repo = module.get<Repository<NotificacionEntity>>(getRepositoryToken(NotificacionEntity));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findAllNotificacion', () => {
    it('debería retornar todas las notificaciones', async () => {
      jest.spyOn(repo, 'find').mockResolvedValue([mockNotificacion]);
      const result = await service.findAllNotificacion();
      expect(result).toEqual([mockNotificacion]);
      expect(repo.find).toHaveBeenCalledWith({ relations: ['agendamiento'] });
    });
  });

  describe('findOneNotificacion', () => {
    it('debería retornar una notificación existente', async () => {
      jest.spyOn(repo, 'findOne').mockResolvedValue(mockNotificacion);
      const result = await service.findOneNotificacion('1');
      expect(result).toEqual(mockNotificacion);
      expect(repo.findOne).toHaveBeenCalledWith({
        where: { id: '1' },
        relations: ['agendamiento'],
      });
    });

    it('debería lanzar BusinessLogicException si no se encuentra', async () => {
      jest.spyOn(repo, 'findOne').mockResolvedValue(null);
      await expect(service.findOneNotificacion('1')).rejects.toHaveProperty(
        'message',
        'La notificación con el id proporcionado no existe'
      );
    });
  });

  describe('createNotificacion', () => {
    it('debería crear una notificación', async () => {
      jest.spyOn(repo, 'save').mockResolvedValue(mockNotificacion);
      const result = await service.createNotificacion(mockNotificacion);
      expect(result).toEqual(mockNotificacion);
      expect(repo.save).toHaveBeenCalledWith(mockNotificacion);
    });

    it('debería lanzar BadRequestException si falla el guardado', async () => {
      jest.spyOn(repo, 'save').mockRejectedValue(new Error('DB Error'));
      await expect(service.createNotificacion(mockNotificacion)).rejects.toThrow(BadRequestException);
    });
  });

  describe('updateNotificacion', () => {
    it('debería actualizar una notificación existente', async () => {
      jest.spyOn(repo, 'findOne').mockResolvedValue(mockNotificacion);
      jest.spyOn(repo, 'save').mockResolvedValue(mockNotificacion);
      const result = await service.updateNotificacion('1', mockNotificacion);
      expect(result).toEqual(mockNotificacion);
    });

    it('debería lanzar BusinessLogicException si no se encuentra', async () => {
      jest.spyOn(repo, 'findOne').mockResolvedValue(null);
      await expect(service.updateNotificacion('1', mockNotificacion)).rejects.toHaveProperty(
        'message',
        'La notificación con el id proporcionado no existe'
      );
    });
  });

  describe('deleteNotificacion', () => {
    it('debería eliminar una notificación existente', async () => {
      jest.spyOn(repo, 'findOne').mockResolvedValue(mockNotificacion);
      jest.spyOn(repo, 'remove').mockResolvedValue(undefined);
      await expect(service.deleteNotificacion('1')).resolves.toBeUndefined();
    });

    it('debería lanzar BusinessLogicException si no se encuentra', async () => {
      jest.spyOn(repo, 'findOne').mockResolvedValue(null);
      await expect(service.deleteNotificacion('1')).rejects.toHaveProperty(
        'message',
        'La notificación con el id proporcionado no existe'
      );
    });
  });
});
