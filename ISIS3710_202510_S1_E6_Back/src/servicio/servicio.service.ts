/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ServicioEntity } from './servicio.entity/servicio.entity';
import { Repository } from 'typeorm';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';

@Injectable()
export class ServicioService {
    constructor(
        @InjectRepository(ServicioEntity)
        private readonly servicioRepository: Repository<ServicioEntity>,
    ) {}

    async findAllServicios(): Promise<ServicioEntity[]> {
        return await this.servicioRepository.find();
    }


    async findOneServicio(id: string): Promise<ServicioEntity> {
        const servicio: ServicioEntity = await this.servicioRepository.findOne({where: {idServicio: id}});
        if (!servicio) {
            throw new BusinessLogicException(
                'El servicio con el id proporcionado no existe',BusinessError.NOT_FOUND,)
        }
        return servicio;
    }

    async createServicio(servicio: ServicioEntity): Promise<ServicioEntity> {
        return await this.servicioRepository.save(servicio);
    }

    async updateServicio(id: string, servicio: ServicioEntity): Promise<ServicioEntity> {
        const servicioPersisted: ServicioEntity = await this.servicioRepository.findOne({where: {idServicio: id}});
        if (!servicioPersisted) {
            throw new BusinessLogicException(
                'El servicio con el id proporcionado no existe',BusinessError.NOT_FOUND,)
        }
        return await this.servicioRepository.save({...servicioPersisted, ...servicio});
    }

    async deleteServicio(id: string) {
        const servicio: ServicioEntity = await this.servicioRepository.findOne({where: {idServicio: id}});
        if (!servicio) {
            throw new BusinessLogicException(
                'El servicio con el id proporcionado no existe',BusinessError.NOT_FOUND,)
        }
        await this.servicioRepository.remove(servicio);
    }

    
}
