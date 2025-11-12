/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrabajadorEntity } from './trabajador.entity';
import { TrabajadorService } from './trabajador.service';
import { TrabajadorController } from './trabajador.controller';
import { UsuarioEntity } from '../usuario/usuario.entity/usuario.entity';

@Module({
  providers: [TrabajadorService],
  imports: [TypeOrmModule.forFeature([UsuarioEntity, TrabajadorEntity])],
  controllers: [TrabajadorController],
})
export class TrabajadorModule {}
