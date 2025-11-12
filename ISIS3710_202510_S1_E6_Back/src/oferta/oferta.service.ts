/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OfertaEntity } from './oferta.entity/oferta.entity';
import { Repository } from 'typeorm';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';

@Injectable()
export class OfertaService {
    constructor(
        @InjectRepository(OfertaEntity)
        private readonly ofertaRepository: Repository<OfertaEntity>
    ) {}

    async findAll(): Promise<OfertaEntity[]> {
        return await this.ofertaRepository.find({ relations: ["agendamiento", "usuario"] });
    }

    async findOne(id: string): Promise<OfertaEntity> {
        const oferta: OfertaEntity = await this.ofertaRepository.findOne({where: {id}, relations: ["agendamiento", "usuario"]});
        if (!oferta) {
            throw new BusinessLogicException("La oferta con el id proporcionado no existe", BusinessError.NOT_FOUND);
        }
        return oferta;
    }

    async create(oferta: OfertaEntity): Promise<OfertaEntity> {
        return await this.ofertaRepository.save(oferta);
    }

    async update(id: string, oferta: OfertaEntity): Promise<OfertaEntity> {
        const persistedOferta: OfertaEntity = await this.ofertaRepository.findOne({where: {id }});
        if (!persistedOferta) {
            throw new BusinessLogicException("La oferta con el id proporcionado no existe", BusinessError.NOT_FOUND);
        }
        return await this.ofertaRepository.save({...persistedOferta, ...oferta});
    }

    async delete(id: string) {
        const reseña: OfertaEntity = await this.ofertaRepository.findOne({where: {id}});
        if (!reseña) {
            throw new BusinessLogicException("La oferta con el id proporcionado no existe", BusinessError.NOT_FOUND);
        }
        await this.ofertaRepository.remove(reseña);
    }

    async findAllDisponibles(): Promise<OfertaEntity[]> {
        return await this.ofertaRepository.find({
            where: {
            agendamiento: null,
            },
            relations: ["usuario","servicio"], 
        });
        }



}

