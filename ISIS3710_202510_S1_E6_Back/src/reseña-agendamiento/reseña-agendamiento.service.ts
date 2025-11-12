/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AgendamientoEntity } from '../agendamiento/agendamiento.entity/agendamiento.entity';
import { ReseñaEntity } from '../reseña/reseña.entity/reseña.entity';
import { Repository } from 'typeorm';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';

@Injectable()
export class ReseñaAgendamientoService {
    constructor(
        @InjectRepository(ReseñaEntity)
        private readonly reseñaRepository: Repository<ReseñaEntity>,
        @InjectRepository(AgendamientoEntity)
        private readonly agendamientoRepository: Repository<AgendamientoEntity>,
    ) {}

    async addAgendamientoToReseña(reseñaId: string, agendamientoId: string): Promise<ReseñaEntity> {
        const agendamiento: AgendamientoEntity = await this.agendamientoRepository.findOne({ where: { id: agendamientoId } });
        if (!agendamiento) {
            throw new BusinessLogicException('El agendamiento con el id proporcionado no existe', BusinessError.NOT_FOUND);
        }

        const reseña: ReseñaEntity = await this.reseñaRepository.findOne({ where: { id: reseñaId }, relations: ['agendamiento'] });
        if (!reseña) {
            throw new BusinessLogicException('La reseña con el id proporcionado no existe', BusinessError.NOT_FOUND);
        }

        reseña.agendamiento = agendamiento;
        return await this.reseñaRepository.save(reseña);
    }

    async findAgendamientoByReseñaIdAgendamientoId(reseñaId: string, agendamientoId: string): Promise<AgendamientoEntity> {
        const agendamiento: AgendamientoEntity = await this.agendamientoRepository.findOne({ where: { id: agendamientoId } });
        if (!agendamiento) {
            throw new BusinessLogicException('El agendamiento con el id proporcionado no existe', BusinessError.NOT_FOUND);
        }

        const reseña: ReseñaEntity = await this.reseñaRepository.findOne({ where: { id: reseñaId }, relations: ['agendamiento'] });
        if (!reseña) {
            throw new BusinessLogicException('La reseña con el id proporcionado no existe', BusinessError.NOT_FOUND);
        }

        const reseñaAgendamiento: AgendamientoEntity = reseña.agendamiento;

        if (!reseñaAgendamiento) {
            throw new BusinessLogicException('La reseña no tiene un agendamiento asociado', BusinessError.NOT_FOUND);
        }

        return reseña.agendamiento;
    }

    async findAgendamientoByReseñaId(reseñaId: string): Promise<AgendamientoEntity> {
        const reseña: ReseñaEntity = await this.reseñaRepository.findOne({ where: { id: reseñaId }, relations: ['agendamiento'] });
        if (!reseña) {
            throw new BusinessLogicException('La reseña con el id proporcionado no existe', BusinessError.NOT_FOUND);
        }

        return reseña.agendamiento;
    }

    async deleteAgendamientoFromReseña(reseñaId: string, agendamientoId: string): Promise<ReseñaEntity> {
        const agendamiento: AgendamientoEntity = await this.agendamientoRepository.findOne({ where: { id: agendamientoId } });
        if (!agendamiento) {
            throw new BusinessLogicException('El agendamiento con el id proporcionado no existe', BusinessError.NOT_FOUND);
        }

        const reseña: ReseñaEntity = await this.reseñaRepository.findOne({ where: { id: reseñaId }, relations: ['agendamiento'] });
        if (!reseña) {
            throw new BusinessLogicException('La reseña con el id proporcionado no existe', BusinessError.NOT_FOUND);
        }
        if (reseña.agendamiento.id !== agendamientoId) {
            throw new BusinessLogicException('El agendamiento no está asociado a la reseña', BusinessError.NOT_FOUND);
        }

        reseña.agendamiento = null;
        return await this.reseñaRepository.save(reseña);
    }
}
