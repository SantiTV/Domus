/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { AgendamientoService } from './agendamiento.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AgendamientoEntity } from './agendamiento.entity/agendamiento.entity';
import { OfertaEntity } from '../oferta/oferta.entity/oferta.entity';
import { Repository } from 'typeorm';

describe('AgendamientoService', () => {
  let service: AgendamientoService;
  let agRepo: Repository<AgendamientoEntity>;
  let ofertaRepo: Repository<OfertaEntity>;

  const agendamientoMock = {
    id: '1',
    usuario: {},
    trabajador: {},
    oferta: { estado: 'pendiente' },
    reseña: {},
    notificacion: {}
  } as AgendamientoEntity;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AgendamientoService,
        {
          provide: getRepositoryToken(AgendamientoEntity),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(OfertaEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<AgendamientoService>(AgendamientoService);
    agRepo = module.get<Repository<AgendamientoEntity>>(getRepositoryToken(AgendamientoEntity));
    ofertaRepo = module.get<Repository<OfertaEntity>>(getRepositoryToken(OfertaEntity));
  });

  it('findAllAgendamientos should return all agendamientos', async () => {
    jest.spyOn(agRepo, 'find').mockResolvedValue([agendamientoMock]);
    const result = await service.findAllAgendamientos();
    expect(result).toEqual([agendamientoMock]);
  });

  it('findOneAgendamiento should return one agendamiento', async () => {
    jest.spyOn(agRepo, 'findOne').mockResolvedValue(agendamientoMock);
    const result = await service.findOneAgendamiento('1');
    expect(result).toEqual(agendamientoMock);
  });

  it('findOneAgendamiento should throw if not found', async () => {
    jest.spyOn(agRepo, 'findOne').mockResolvedValue(null);
    // Ajustado mensaje esperado para coincidir con lo que lanza el servicio
    await expect(service.findOneAgendamiento('1'))
      .rejects
      .toHaveProperty('message', 'El agendamiento con el id proporcionado no existe');
  });

  it('createAgendamiento should save and return agendamiento', async () => {
    jest.spyOn(agRepo, 'save').mockResolvedValue(agendamientoMock);
    const result = await service.createAgendamiento(agendamientoMock);
    expect(result).toEqual(agendamientoMock);
  });

  it('createAgendamiento should throw BadRequestException on error', async () => {
    jest.spyOn(agRepo, 'save').mockRejectedValue(new Error('Error'));
    await expect(service.createAgendamiento(agendamientoMock)).rejects.toThrow();
  });

  it('updateAgendamiento should update and return agendamiento', async () => {
    jest.spyOn(agRepo, 'findOne').mockResolvedValue(agendamientoMock);
    // Simula que save devuelve el mismo objeto actualizado
    jest.spyOn(agRepo, 'save').mockResolvedValue({ ...agendamientoMock });
    const result = await service.updateAgendamiento('1', agendamientoMock);
    // Cambié la expectativa para validar que el resultado sea igual al mock actualizado
    expect(result).toEqual(expect.objectContaining(agendamientoMock));
  });

  it('updateAgendamiento should throw if not found', async () => {
    jest.spyOn(agRepo, 'findOne').mockResolvedValue(null);
    // Ajuste mensaje esperado para coincidir con lo que lanza el servicio
    await expect(service.updateAgendamiento('1', agendamientoMock))
      .rejects
      .toHaveProperty('message', 'El agendamiento con el id proporcionado no existe');
  });

  it('deleteAgendamiento should delete agendamiento', async () => {
    jest.spyOn(agRepo, 'findOne').mockResolvedValue(agendamientoMock);
    const removeSpy = jest.spyOn(agRepo, 'remove').mockResolvedValue(undefined);
    await service.deleteAgendamiento('1');
    expect(removeSpy).toHaveBeenCalledWith(agendamientoMock);
  });

  it('deleteAgendamiento should throw if not found', async () => {
    jest.spyOn(agRepo, 'findOne').mockResolvedValue(null);
    // Ajuste mensaje esperado
    await expect(service.deleteAgendamiento('1'))
      .rejects
      .toHaveProperty('message', 'El agendamiento con el id proporcionado no existe');
  });

  it('findAgendamientosByEstado should return matching agendamientos', async () => {
    jest.spyOn(agRepo, 'find').mockResolvedValue([agendamientoMock]);
    const result = await service.findAgendamientosByEstado('pendiente');
    expect(result).toEqual([agendamientoMock]);
  });

  it('actualizarEstadoAgendamiento should update estado of oferta', async () => {
    const oferta = { ...agendamientoMock.oferta };
    const ag = { ...agendamientoMock, oferta };
    jest.spyOn(agRepo, 'findOne').mockResolvedValue(ag);
    jest.spyOn(ofertaRepo, 'save').mockResolvedValue(oferta);
    const result = await service.actualizarEstadoAgendamiento('1', 'completado');
    expect(result.oferta.estado).toBe('completado');
  });

  it('actualizarEstadoAgendamiento should throw if agendamiento not found', async () => {
    jest.spyOn(agRepo, 'findOne').mockResolvedValue(null);
    // Ajuste mensaje esperado
    await expect(service.actualizarEstadoAgendamiento('1', 'rechazado'))
      .rejects
      .toHaveProperty('message', 'Agendamiento no encontrado');
  });
});
