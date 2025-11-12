/* eslint-disable prettier/prettier */
import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrabajadorEntity } from '../trabajador/trabajador.entity';
import { AuthModule } from '../auth/auth.module';
import { UsuarioController } from './usuario.controller';
import { UsuarioEntity } from './usuario.entity/usuario.entity';
import { UsuarioService } from './usuario.service';

@Module({
  providers: [UsuarioService],
  imports: [
    TypeOrmModule.forFeature([UsuarioEntity, TrabajadorEntity]),
    forwardRef(() => AuthModule),
  ],
  controllers: [UsuarioController],
  exports: [UsuarioService],
})
export class UsuarioModule {}
