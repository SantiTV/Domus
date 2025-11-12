/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AgendamientoEntity } from '../agendamiento/agendamiento.entity/agendamiento.entity';
import {
  BusinessError,
  BusinessLogicException,
} from '../shared/errors/business-errors';
import { TrabajadorEntity } from '../trabajador/trabajador.entity';

@Injectable()
export class TrabajadorAgendamientoService {
  constructor(
    @InjectRepository(TrabajadorEntity)
    private readonly trabajadorRepository: Repository<TrabajadorEntity>,

    @InjectRepository(AgendamientoEntity)
    private readonly agendamientoRepository: Repository<AgendamientoEntity>,
  ) {}

  async addAgendamientoTrabajador(
    trabajadorId: string,
    agendamientoId: string,
  ): Promise<TrabajadorEntity> {
    const trabajador: TrabajadorEntity =
      await this.trabajadorRepository.findOne({
        where: { idUsuario: trabajadorId },
        relations: ['agendamientos'],
      });
    if (!trabajador)
      throw new BusinessLogicException(
        'El trabajador con el id proporcionado no fue encontrado',
        BusinessError.NOT_FOUND,
      );
    const agendamiento: AgendamientoEntity =
      await this.agendamientoRepository.findOne({
        where: { id: agendamientoId },
      });
    if (!agendamiento)
      throw new BusinessLogicException(
        'El agendamiento con el id proporcionado no fue encontrado',
        BusinessError.NOT_FOUND,
      );
    trabajador.agendamientos = [...trabajador.agendamientos, agendamiento];
    return await this.trabajadorRepository.save(trabajador);
  }

  async findAgendamientoByTrabajadorIdAgendamientoId(
    trabajadorId: string,
    agendamientoId: string,
  ): Promise<AgendamientoEntity> {
    const trabajador: TrabajadorEntity =
      await this.trabajadorRepository.findOne({
        where: { idUsuario: trabajadorId },
        relations: ['agendamientos'],
      });
    if (!trabajador)
      throw new BusinessLogicException(
        'El trabajador con el id proporcionado no fue encontrado',
        BusinessError.NOT_FOUND,
      );
    const agendamiento: AgendamientoEntity =
      await this.agendamientoRepository.findOne({
        where: { id: agendamientoId },
      });
    if (!agendamiento)
      throw new BusinessLogicException(
        'El agendamiento con el id proporcionado no fue encontrado',
        BusinessError.NOT_FOUND,
      );
    const agendamientoTrabajador: AgendamientoEntity =
      trabajador.agendamientos.find((e) => e.id === agendamiento.id);
    if (!agendamientoTrabajador)
      throw new BusinessLogicException(
        'El agendamiento con el id proporcionado no es parte del trabajador',
        BusinessError.NOT_FOUND,
      );
    return agendamientoTrabajador;
  }

  async findAgendamientosByTrabajadorId(
    trabajadorId: string,
  ): Promise<AgendamientoEntity[]> {
    const trabajador: TrabajadorEntity =
      await this.trabajadorRepository.findOne({
        where: { idUsuario: trabajadorId },
        relations: ['agendamientos'],
      });
    if (!trabajador)
      throw new BusinessLogicException(
        'El trabajador con el id proporcionado no fue encontrado',
        BusinessError.NOT_FOUND,
      );
    return trabajador.agendamientos;
  }

  async associateAgendamientoTrabajador(
    trabajadorId: string,
    agendamientos: AgendamientoEntity[],
  ): Promise<TrabajadorEntity> {
    const trabajador: TrabajadorEntity =
      await this.trabajadorRepository.findOne({
        where: { idUsuario: trabajadorId },
        relations: ['agendamientos'],
      });
    if (!trabajador)
      throw new BusinessLogicException(
        'El trabajador con el id proporcionado no fue encontrado',
        BusinessError.NOT_FOUND,
      );
    for (let i = 0; i < trabajador.agendamientos.length; i++) {
      const agendamiento: AgendamientoEntity =
        await this.agendamientoRepository.findOne({
          where: { id: trabajador.agendamientos[i].id },
        });
      if (!agendamiento)
        throw new BusinessLogicException(
          'El agendamiento con el id proporcionado no fue encontrado',
          BusinessError.NOT_FOUND,
        );
    }
    trabajador.agendamientos = agendamientos;
    return await this.trabajadorRepository.save(trabajador);
  }

  async deleteAgendamientoTrabajador(
    trabajadorId: string,
    agendamientoId: string,
  ) {
    const trabajador: TrabajadorEntity =
      await this.trabajadorRepository.findOne({
        where: { idUsuario: trabajadorId },
        relations: ['agendamientos'],
      });
    if (!trabajador)
      throw new BusinessLogicException(
        'El trabajador con el id proporcionado no fue encontrado',
        BusinessError.NOT_FOUND,
      );
    const agendamiento: AgendamientoEntity =
      await this.agendamientoRepository.findOne({
        where: { id: agendamientoId },
      });
    if (!agendamiento)
      throw new BusinessLogicException(
        'El agendamiento con el id proporcionado no fue encontrado',
        BusinessError.NOT_FOUND,
      );
    const agendamientoTrabajador: AgendamientoEntity =
      trabajador.agendamientos.find((e) => e.id === agendamiento.id);
    if (!agendamientoTrabajador)
      throw new BusinessLogicException(
        'El agendamiento con el id proporcionado no es parte del trabajador',
        BusinessError.NOT_FOUND,
      );
    trabajador.agendamientos = trabajador.agendamientos.filter(
      (e) => e.id !== agendamiento.id,
    );
    await this.trabajadorRepository.save(trabajador);
  }
}
