/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { NotificacionService } from './notificacion.service';
import { NotificacionEntity } from './notificacion.entity/notificacion.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificacionController } from './notificacion.controller';

@Module({
  providers: [NotificacionService],
  imports: [TypeOrmModule.forFeature([NotificacionEntity])],
  controllers: [NotificacionController]
})
export class NotificacionModule {}
