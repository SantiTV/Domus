/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServicioEntity } from './servicio.entity/servicio.entity';
import { ServicioService } from './servicio.service';
import { ServicioController } from './servicio.controller';


@Module({
  imports: [TypeOrmModule.forFeature([ServicioEntity])],
  controllers: [ServicioController],
  providers: [ServicioService],
})
export class ServicioModule {}
