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
import { TrabajadorAgendamientoService } from './trabajador-agendamiento.service';

@Controller('trabajadores')
@UseInterceptors(BusinessErrorsInterceptor)
export class TrabajadorAgendamientoController {
  constructor(
    private readonly trabajadorAgendamientoService: TrabajadorAgendamientoService,
  ) {}

  @Post(':trabajadorId/agendamientos/:agendamientoId')
  async addAgendamientoTrabajador(
    @Param('trabajadorId') trabajadorId: string,
    @Param('agendamientoId') agendamientoId: string,
  ) {
    return await this.trabajadorAgendamientoService.addAgendamientoTrabajador(
      trabajadorId,
      agendamientoId,
    );
  }

  @Get(':trabajadorId/agendamientos/:agendamientoId')
  async findAgendamientoByTrabajadorIdAgendamientoId(
    @Param('trabajadorId') trabajadorId: string,
    @Param('agendamientoId') agendamientoId: string,
  ) {
    return await this.trabajadorAgendamientoService.findAgendamientoByTrabajadorIdAgendamientoId(
      trabajadorId,
      agendamientoId,
    );
  }

  @Get(':trabajadorId/agendamientos')
  async findAgendamientosByTrabajadorId(
    @Param('trabajadorId') trabajadorId: string,
  ) {
    return await this.trabajadorAgendamientoService.findAgendamientosByTrabajadorId(
      trabajadorId,
    );
  }

  @Post(':trabajadorId/agendamientos')
  async associateAgendamientoTrabajador(
    @Body() agendamientosDto: AgendamientoDto[],
    @Param('trabajadorId') trabajadorId: string,
  ) {
    const agendamientos = plainToInstance(AgendamientoEntity, agendamientosDto);
    return await this.trabajadorAgendamientoService.associateAgendamientoTrabajador(
      trabajadorId,
      agendamientos,
    );
  }

  @Delete(':trabajadorId/agendamientos/:agendamientoId')
  @HttpCode(204)
  async deleteAgendamientoTrabajador(
    @Param('trabajadorId') trabajadorId: string,
    @Param('agendamientoId') agendamientoId: string,
  ) {
    return await this.trabajadorAgendamientoService.deleteAgendamientoTrabajador(
      trabajadorId,
      agendamientoId,
    );
  }
}
