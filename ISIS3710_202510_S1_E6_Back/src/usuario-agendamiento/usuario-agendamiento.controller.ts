/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { AgendamientoDto } from '../agendamiento/agendamiento.dto/agendamiento.dto';
import { AgendamientoEntity } from '../agendamiento/agendamiento.entity/agendamiento.entity';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors/business-errors.interceptor';
import { UsuarioAgendamientoService } from './usuario-agendamiento.service';

@Controller('usuarios')
@UseInterceptors(BusinessErrorsInterceptor)
export class UsuarioAgendamientoController {
  constructor(
    private readonly usuarioAgendamientoService: UsuarioAgendamientoService,
  ) {}

  @Post(':usuarioId/agendamientos/:agendamientoId')
  async addAgendamientoUsuario(
    @Param('usuarioId') usuarioId: string,
    @Param('agendamientoId') agendamientoId: string,
  ) {
    return await this.usuarioAgendamientoService.addAgendamientoUsuario(
      usuarioId,
      agendamientoId,
    );
  }

  @Get(':usuarioId/agendamientos/:agendamientoId')
  async findAgendamientoByUsuarioIdAgendamientoId(
    @Param('usuarioId') usuarioId: string,
    @Param('agendamientoId') agendamientoId: string,
  ) {
    return await this.usuarioAgendamientoService.findAgendamientoByUsuarioIdAgendamientoId(
      usuarioId,
      agendamientoId,
    );
  }

  @Get(':usuarioId/agendamientos')
  async findAgendamientosByUsuarioId(@Param('usuarioId') usuarioId: string) {
    return await this.usuarioAgendamientoService.findAgendamientosByUsuarioId(
      usuarioId,
    );
  }

  @Post(':usuarioId/agendamientos')
  async associateAgendamientoUsuario(
    @Body() agendamientosDto: AgendamientoDto[],
    @Param('usuarioId') usuarioId: string,
  ) {
    const agendamientos = plainToInstance(AgendamientoEntity, agendamientosDto);
    return await this.usuarioAgendamientoService.associateAgendamientoUsuario(
      usuarioId,
      agendamientos,
    );
  }

  @Delete(':usuarioId/agendamientos/:agendamientoId')
  @HttpCode(204)
  async deleteAgendamientoUsuario(
    @Param('usuarioId') usuarioId: string,
    @Param('agendamientoId') agendamientoId: string,
  ) {
    return await this.usuarioAgendamientoService.deleteAgendamientoUsuario(
      usuarioId,
      agendamientoId,
    );
  }
}
