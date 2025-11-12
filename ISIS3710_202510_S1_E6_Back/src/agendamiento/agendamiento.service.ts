/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OfertaEntity } from '../oferta/oferta.entity/oferta.entity';
import {
  BusinessError,
  BusinessLogicException,
} from '../shared/errors/business-errors';
import { AgendamientoEntity } from './agendamiento.entity/agendamiento.entity';

@Injectable()
export class AgendamientoService {
  constructor(
    @InjectRepository(AgendamientoEntity)
    private readonly agendamientoRepository: Repository<AgendamientoEntity>,
    @InjectRepository(OfertaEntity)
    private readonly ofertaRepository: Repository<OfertaEntity>,
  ) {}

  async findAllAgendamientos(): Promise<AgendamientoEntity[]> {
    return await this.agendamientoRepository.find({
      relations: ['usuario', 'trabajador', 'oferta', 'reseña', 'notificacion'],
    });
  }

  async findOneAgendamiento(id: string): Promise<AgendamientoEntity> {
    const ag = await this.agendamientoRepository.findOne({
      where: { id },
      relations: ['usuario', 'trabajador', 'oferta', 'reseña', 'notificacion'],
    });
    if (!ag) {
      throw new BusinessLogicException(
        'El agendamiento con el id proporcionado no existe',
        BusinessError.NOT_FOUND,
      );
    }
    return ag;
  }

  async createAgendamiento(
    agendamiento: AgendamientoEntity,
  ): Promise<AgendamientoEntity> {
    try {
      console.log('Creando agendamiento:', agendamiento);

      const agendamientoExistente = await this.agendamientoRepository.findOne({
        where: {
          oferta: { id: agendamiento.oferta.id },
        },
        relations: ['oferta'],
      });
      console.log('Agendamiento existente para oferta:', agendamientoExistente);

      if (agendamientoExistente) {
        throw new BusinessLogicException(
          'La oferta ya fue asignada a un agendamiento. No se puede reutilizar.',
          BusinessError.PRECONDITION_FAILED,
        );
      }

      const resultado = await this.agendamientoRepository.save(agendamiento);
      console.log('Agendamiento creado:', resultado);
      return resultado;
    } catch (e) {
      console.error('Error al crear el agendamiento:', e);
      if (e instanceof BusinessLogicException) throw e;
      throw new BadRequestException('No se pudo crear el agendamiento');
    }
  }

  async updateAgendamiento(
    id: string,
    agendamiento: AgendamientoEntity,
  ): Promise<AgendamientoEntity> {
    const existente = await this.agendamientoRepository.findOne({
      where: { id },
    });
    if (!existente) {
      throw new BusinessLogicException(
        'El agendamiento con el id proporcionado no existe',
        BusinessError.NOT_FOUND,
      );
    }
    return await this.agendamientoRepository.save({
      ...existente,
      ...agendamiento,
    });
  }

  async deleteAgendamiento(id: string): Promise<void> {
    const ag = await this.agendamientoRepository.findOne({ where: { id } });
    if (!ag) {
      throw new BusinessLogicException(
        'El agendamiento con el id proporcionado no existe',
        BusinessError.NOT_FOUND,
      );
    }
    await this.agendamientoRepository.remove(ag);
  }

  async findAgendamientosByEstado(
    estado: string,
  ): Promise<AgendamientoEntity[]> {
    return await this.agendamientoRepository.find({
      relations: [
        'oferta',
        'usuario',
        'trabajador',
        'oferta.servicio',
        'reseña',
      ],
      where: {
        oferta: {
          estado: estado,
        },
      },
    });
  }

  async actualizarEstadoAgendamiento(
    idAgendamiento: string,
    nuevoEstado: string,
  ): Promise<AgendamientoEntity> {
    const agendamiento = await this.agendamientoRepository.findOne({
      where: { id: idAgendamiento },
      relations: ['oferta'],
    });

    if (!agendamiento) {
      throw new BusinessLogicException(
        'Agendamiento no encontrado',
        BusinessError.NOT_FOUND,
      );
    }

    agendamiento.oferta.estado = nuevoEstado;
    await this.ofertaRepository.save(agendamiento.oferta); // Guardar el cambio en la oferta
    return agendamiento;
  }
}
