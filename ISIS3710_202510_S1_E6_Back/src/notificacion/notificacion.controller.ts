/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors/business-errors.interceptor';
import { NotificacionDto } from './notificacion.dto/notificacion.dto';
import { NotificacionEntity } from './notificacion.entity/notificacion.entity';
import { NotificacionService } from './notificacion.service';

@Controller('notificaciones')
@UseInterceptors(BusinessErrorsInterceptor)
export class NotificacionController {
  constructor(private readonly notificacionService: NotificacionService) {}

  @Get()
  async findAll() {
    return await this.notificacionService.findAllNotificacion();
  }

  @Get(':notificacionId')
  async findOne(@Param('notificacionId') notificacionId: string) {
    return await this.notificacionService.findOneNotificacion(notificacionId);
  }

  @Post()
  async create(@Body() notificacionDto: NotificacionDto) {
    const notificacion: NotificacionEntity = plainToInstance(
      NotificacionEntity,
      notificacionDto,
    );
    return await this.notificacionService.createNotificacion(notificacion);
  }

  @Put(':notificacionId')
  async update(
    @Param('notificacionId') notificacionId: string,
    @Body() notificacionDto: NotificacionDto,
  ) {
    const notificacion: NotificacionEntity = plainToInstance(
      NotificacionEntity,
      notificacionDto,
    );
    return await this.notificacionService.updateNotificacion(
      notificacionId,
      notificacion,
    );
  }

  @Delete(':notificacionId')
  @HttpCode(204)
  async delete(@Param('notificacionId') notificacionId: string) {
    return await this.notificacionService.deleteNotificacion(notificacionId);
  }
}
