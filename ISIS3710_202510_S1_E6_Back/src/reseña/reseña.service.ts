/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { ReseñaEntity } from './reseña.entity/reseña.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BusinessError, BusinessLogicException } from "../shared/errors/business-errors";

@Injectable()
export class ReseñaService {
    constructor(
        @InjectRepository(ReseñaEntity)
        private readonly reseñaRepository: Repository<ReseñaEntity>
    ) {}

    async findAll(): Promise<ReseñaEntity[]> {
        return await this.reseñaRepository.find({ relations: ["agendamiento"] });
    }

    async findOne(id: string): Promise<ReseñaEntity> {
        const reseña: ReseñaEntity = await this.reseñaRepository.findOne({where: {id}, relations: ["agendamiento"]});
        if (!reseña) {
            throw new BusinessLogicException("La reseña con el id proporcionado no existe", BusinessError.NOT_FOUND);
        }
        return reseña;
    }

    async create(reseña: ReseñaEntity): Promise<ReseñaEntity> {
        return await this.reseñaRepository.save(reseña);
    }

    async update(id: string, reseña: ReseñaEntity): Promise<ReseñaEntity> {
        const persistedReseña: ReseñaEntity = await this.reseñaRepository.findOne({where: {id}});
        if (!persistedReseña) {
            throw new BusinessLogicException("La reseña con el id proporcionado no existe", BusinessError.NOT_FOUND);
        }
        return await this.reseñaRepository.save({...persistedReseña, ...reseña});
    }

    async delete(id: string) {
        const reseña: ReseñaEntity = await this.reseñaRepository.findOne({where: {id}});
        if (!reseña) {
            throw new BusinessLogicException("La reseña con el id proporcionado no existe", BusinessError.NOT_FOUND);
        }
        await this.reseñaRepository.remove(reseña);
    }
}