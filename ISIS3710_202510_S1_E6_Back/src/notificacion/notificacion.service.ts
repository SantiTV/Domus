/* eslint-disable prettier/prettier */
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NotificacionEntity } from './notificacion.entity/notificacion.entity';
import { Repository } from 'typeorm';
import { BusinessLogicException, BusinessError } from '../shared/errors/business-errors';

@Injectable()
export class NotificacionService {
  constructor(
    @InjectRepository(NotificacionEntity)
    private readonly notificacionRepository: Repository<NotificacionEntity>
  ) {}

  async findAllNotificacion(): Promise<NotificacionEntity[]> {
    return await this.notificacionRepository.find({ relations: ['agendamiento'] });
  }

  async findOneNotificacion(id: string): Promise<NotificacionEntity> {
    const notificacion = await this.notificacionRepository.findOne({
      where: { id },
      relations: ['agendamiento'],
    });
    if (!notificacion) {
      throw new BusinessLogicException("La notificación con el id proporcionado no existe", BusinessError.NOT_FOUND);
    }
    return notificacion;
  }

  async createNotificacion(notificacion: NotificacionEntity): Promise<NotificacionEntity> {
    try {
      return await this.notificacionRepository.save(notificacion);
    } catch (error) {
      throw new BadRequestException('Error al crear la notificación');
    }
  }

  async updateNotificacion(id: string, notificacion: NotificacionEntity): Promise<NotificacionEntity> {
    const persisted = await this.notificacionRepository.findOne({ where: { id } });
    if (!persisted) {
      throw new BusinessLogicException("La notificación con el id proporcionado no existe", BusinessError.NOT_FOUND);
    }
    return await this.notificacionRepository.save({ ...persisted, ...notificacion });
  }

  async deleteNotificacion(id: string): Promise<void> {
    const notificacion = await this.notificacionRepository.findOne({ where: { id } });
    if (!notificacion) {
      throw new BusinessLogicException("La notificación con el id proporcionado no existe", BusinessError.NOT_FOUND);
    }
    await this.notificacionRepository.remove(notificacion);
  }
}
