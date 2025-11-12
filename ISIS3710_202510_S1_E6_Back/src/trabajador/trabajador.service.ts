/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TrabajadorDto } from './trabajador.dto/trabajador.dto';
import { TrabajadorEntity } from './trabajador.entity';

@Injectable()
export class TrabajadorService {
  constructor(
    @InjectRepository(TrabajadorEntity)
    private readonly trabajadorRepository: Repository<TrabajadorEntity>,
  ) {}

  async findAllTrabajadores(): Promise<TrabajadorEntity[]> {
    return await this.trabajadorRepository.find();
  }

  async findOneTrabajador(id: string): Promise<TrabajadorEntity> {
    const trabajador = await this.trabajadorRepository.findOne({
      where: { id } as any,
    });

    if (!trabajador) {
      throw new NotFoundException(`Trabajador con ID ${id} no encontrado`);
    }

    return trabajador;
  }

  async createTrabajador(
    trabajador: TrabajadorEntity,
  ): Promise<TrabajadorEntity> {
    return await this.trabajadorRepository.save(trabajador);
  }

  async updateTrabajador(
    id: string,
    data: TrabajadorDto,
  ): Promise<TrabajadorEntity> {
    const trabajador = await this.findOneTrabajador(id);
    return this.trabajadorRepository.save({ ...trabajador, ...data });
  }

  async deleteTrabajador(id: string): Promise<void> {
    const trabajador = await this.findOneTrabajador(id);
    await this.trabajadorRepository.remove(trabajador);
  }
}
