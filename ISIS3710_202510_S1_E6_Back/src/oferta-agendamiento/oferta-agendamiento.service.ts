/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OfertaEntity } from '../oferta/oferta.entity/oferta.entity';
import { Repository } from 'typeorm';
import { AgendamientoEntity } from '../agendamiento/agendamiento.entity/agendamiento.entity';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';

@Injectable()
export class OfertaAgendamientoService {
    constructor(
        @InjectRepository(OfertaEntity)
        private readonly ofertaRepository: Repository<OfertaEntity>,
        @InjectRepository(AgendamientoEntity)
        private readonly agendamientoRepository: Repository<AgendamientoEntity>
    ) {}

    async addAgendamientoToOferta(ofertaId: string, agendamientoId: string): Promise<OfertaEntity> {
        const agendamiento: AgendamientoEntity = await this.agendamientoRepository.findOne({ where: { id: agendamientoId } });
        if (!agendamiento) {
            throw new BusinessLogicException('El agendamiento con el id proporcionado no existe', BusinessError.NOT_FOUND);
        }

        const oferta: OfertaEntity = await this.ofertaRepository.findOne({ where: { id: ofertaId }, relations: ['agendamiento'] });
        if (!oferta) {
            throw new BusinessLogicException('La oferta con el id proporcionado no existe', BusinessError.NOT_FOUND);
        }

        oferta.agendamiento = agendamiento;
        return await this.ofertaRepository.save(oferta);
    }

    async findAgendamientoByOfertaIdAgendamientoId(ofertaId: string, agendamientoId: string): Promise<AgendamientoEntity> {
        const agendamiento: AgendamientoEntity = await this.agendamientoRepository.findOne({ where: { id: agendamientoId } });
        if (!agendamiento) {
            throw new BusinessLogicException('El agendamiento con el id proporcionado no existe', BusinessError.NOT_FOUND);
        }

        const oferta: OfertaEntity = await this.ofertaRepository.findOne({ where: { id: ofertaId }, relations: ['agendamiento'] });
        if (!oferta) {
            throw new BusinessLogicException('La oferta con el id proporcionado no existe', BusinessError.NOT_FOUND);
        }

        const ofertaAgendamiento: AgendamientoEntity = oferta.agendamiento;

        if (!ofertaAgendamiento) {
            throw new BusinessLogicException('La oferta no tiene un agendamiento asociado', BusinessError.NOT_FOUND);
        }

        return oferta.agendamiento;
    }

    async findAgendamientoByOfertaId(ofertaId: string): Promise<AgendamientoEntity> {
        const oferta: OfertaEntity = await this.ofertaRepository.findOne({ where: { id: ofertaId }, relations: ['agendamiento'] });
        if (!oferta) {
            throw new BusinessLogicException('La oferta con el id proporcionado no existe', BusinessError.NOT_FOUND);
        }

        return oferta.agendamiento;
    }

    async deleteAgendamientoFromOferta(ofertaId: string, agendamientoId: string): Promise<OfertaEntity> {
        const oferta: OfertaEntity = await this.ofertaRepository.findOne({ where: { id: ofertaId }, relations: ['agendamiento'] });
        if (!oferta) {
            throw new BusinessLogicException('La oferta con el id proporcionado no existe', BusinessError.NOT_FOUND);
        }

        const agendamiento: AgendamientoEntity = await this.agendamientoRepository.findOne({ where: { id: agendamientoId } });
        if (!agendamiento) {
            throw new BusinessLogicException('El agendamiento con el id proporcionado no existe', BusinessError.NOT_FOUND);
        }
        if (oferta.agendamiento.id !== agendamiento.id) {
            throw new BusinessLogicException('El agendamiento no está asociado a la oferta', BusinessError.NOT_FOUND);
        }

        oferta.agendamiento = null;
        return await this.ofertaRepository.save(oferta);
    }
}
