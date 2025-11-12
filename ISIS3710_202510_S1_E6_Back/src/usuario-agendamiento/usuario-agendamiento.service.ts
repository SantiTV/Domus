/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AgendamientoEntity } from '../agendamiento/agendamiento.entity/agendamiento.entity';
import {
  BusinessError,
  BusinessLogicException,
} from '../shared/errors/business-errors';
import { UsuarioEntity } from '../usuario/usuario.entity/usuario.entity';

@Injectable()
export class UsuarioAgendamientoService {
  constructor(
    @InjectRepository(AgendamientoEntity)
    private readonly agendamientoRepository: Repository<AgendamientoEntity>,

    @InjectRepository(UsuarioEntity)
    private readonly usuarioRepository: Repository<UsuarioEntity>,
  ) {}

  async addAgendamientoUsuario(
    usuarioId: string,
    agendamientoId: string,
  ): Promise<UsuarioEntity> {
    const agendamiento: AgendamientoEntity =
      await this.agendamientoRepository.findOne({
        where: { id: agendamientoId },
      });
    if (!agendamiento)
      throw new BusinessLogicException(
        'El agendamiento con el id proporcionado no fue encontrado',
        BusinessError.NOT_FOUND,
      );
    const usuario: UsuarioEntity = await this.usuarioRepository.findOne({
      where: { idUsuario: usuarioId },
      relations: ['agendamientos'],
    });
    if (!usuario)
      throw new BusinessLogicException(
        'El usuario con el id proporcionado no fue encontrado',
        BusinessError.NOT_FOUND,
      );
    usuario.agendamientos = [...usuario.agendamientos, agendamiento];
    return await this.usuarioRepository.save(usuario);
  }

  async findAgendamientoByUsuarioIdAgendamientoId(
    usuarioId: string,
    agendamientoId: string,
  ): Promise<AgendamientoEntity> {
    const agendamiento: AgendamientoEntity =
      await this.agendamientoRepository.findOne({
        where: { id: agendamientoId },
      });
    if (!agendamiento)
      throw new BusinessLogicException(
        'El agendamiento con el id proporcionado no fue encontrado',
        BusinessError.NOT_FOUND,
      );
    const usuario: UsuarioEntity = await this.usuarioRepository.findOne({
      where: { idUsuario: usuarioId },
      relations: ['agendamientos'],
    });
    if (!usuario)
      throw new BusinessLogicException(
        'El usuario con el id proporcionado no fue encontrado',
        BusinessError.NOT_FOUND,
      );
    const agendamientoUsuario: AgendamientoEntity = usuario.agendamientos.find(
      (e) => e.id === agendamiento.id,
    );
    if (!agendamientoUsuario)
      throw new BusinessLogicException(
        'El agendamiento con el id proporcionado no es parte del usuario',
        BusinessError.NOT_FOUND,
      );
    return agendamientoUsuario;
  }

  async findAgendamientosByUsuarioId(
    usuarioId: string,
  ): Promise<AgendamientoEntity[]> {
    const usuario: UsuarioEntity = await this.usuarioRepository.findOne({
      where: { idUsuario: usuarioId },
      relations: ['agendamientos'],
    });
    if (!usuario)
      throw new BusinessLogicException(
        'El usuario con el id proporcionado no fue encontrado',
        BusinessError.NOT_FOUND,
      );
    return usuario.agendamientos;
  }

  async associateAgendamientoUsuario(
    usuarioId: string,
    agendamientos: AgendamientoEntity[],
  ): Promise<UsuarioEntity> {
    const usuario: UsuarioEntity = await this.usuarioRepository.findOne({
      where: { idUsuario: usuarioId },
      relations: ['agendamientos'],
    });
    if (!usuario)
      throw new BusinessLogicException(
        'El usuario con el id proporcionado no fue encontrado',
        BusinessError.NOT_FOUND,
      );
    for (let i = 0; i < usuario.agendamientos.length; i++) {
      const agendamiento: AgendamientoEntity =
        await this.agendamientoRepository.findOne({
          where: { id: usuario.agendamientos[i].id },
        });
      if (!agendamiento)
        throw new BusinessLogicException(
          'El agendamiento con el id proporcionado no fue encontrado',
          BusinessError.NOT_FOUND,
        );
    }
    usuario.agendamientos = agendamientos;
    return await this.usuarioRepository.save(usuario);
  }

  async deleteAgendamientoUsuario(usuarioId: string, agendamientoId: string) {
    const agendamiento: AgendamientoEntity =
      await this.agendamientoRepository.findOne({
        where: { id: agendamientoId },
      });
    if (!agendamiento)
      throw new BusinessLogicException(
        'El agendamiento con el id proporcionado no fue encontrado',
        BusinessError.NOT_FOUND,
      );
    const usuario: UsuarioEntity = await this.usuarioRepository.findOne({
      where: { idUsuario: usuarioId },
      relations: ['agendamientos'],
    });
    if (!usuario)
      throw new BusinessLogicException(
        'El usuario con el id proporcionado no fue encontrado',
        BusinessError.NOT_FOUND,
      );
    usuario.agendamientos = usuario.agendamientos.filter(
      (e) => e.id !== agendamiento.id,
    );
    await this.usuarioRepository.save(usuario);
  }
}
