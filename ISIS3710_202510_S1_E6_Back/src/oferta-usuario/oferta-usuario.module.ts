/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OfertaEntity } from '../oferta/oferta.entity/oferta.entity';
import { OfertaService } from '../oferta/oferta.service';
import { UsuarioEntity } from '../usuario/usuario.entity/usuario.entity';
import { OfertaUsuarioService } from './oferta-usuario.service';
import { OfertaUsuarioController } from './oferta-usuario.controller';

@Module({
    imports: [TypeOrmModule.forFeature([OfertaEntity, UsuarioEntity])],
    providers: [OfertaService, OfertaUsuarioService],
    controllers: [OfertaUsuarioController],
})
export class OfertaUsuarioModule {}
