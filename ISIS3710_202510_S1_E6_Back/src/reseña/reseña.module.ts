/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ReseñaService } from './reseña.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReseñaEntity } from './reseña.entity/reseña.entity';
import { ReseñaController } from './reseña.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ReseñaEntity])],
  providers: [ReseñaService],
  controllers: [ReseñaController]
})
export class ReseñaModule { }
