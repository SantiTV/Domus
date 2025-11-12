/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServicioEntity } from 'src/servicio/servicio.entity/servicio.entity';
import { ServicioService } from 'src/servicio/servicio.service';
import { TrabajadorEntity } from 'src/trabajador/trabajador.entity';
import { UsuarioEntity } from 'src/usuario/usuario.entity/usuario.entity';
import { UsuarioService } from 'src/usuario/usuario.service';
import { OfertaController } from './oferta.controller';
import { OfertaEntity } from './oferta.entity/oferta.entity';
import { OfertaService } from './oferta.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      OfertaEntity,
      UsuarioEntity,
      ServicioEntity,
      TrabajadorEntity,
    ]),
  ],
  providers: [OfertaService, UsuarioService, ServicioService],
  controllers: [OfertaController],
})
export class OfertaModule {}
