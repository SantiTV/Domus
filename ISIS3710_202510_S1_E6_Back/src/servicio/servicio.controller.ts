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
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors/business-errors.interceptor';

import { ServicioService } from './servicio.service';
import { ServicioDTO } from './servicio.dto/servicio.dto';
import { ServicioEntity } from './servicio.entity/servicio.entity';
import { plainToInstance } from 'class-transformer';

@Controller('servicios')
@UseInterceptors(BusinessErrorsInterceptor)
export class ServicioController {
  constructor(
    private readonly servicioService: ServicioService
  ){}

  @Get()
  async findAllServicios() {
    return await this.servicioService.findAllServicios();
  }

  @Get(':servicioId')
  async findOneServicio(@Param('servicioId') servicioId: string) {
    return await this.servicioService.findOneServicio(servicioId);
  }

  @Post()
  async createServicio(@Body() servicioDto: ServicioDTO) {
    const servicio : ServicioEntity = plainToInstance(ServicioEntity, servicioDto);
    return await this.servicioService.createServicio(servicio);
  }

  @Put(':servicioId')
  async updateServicio(@Param('servicioId') servicioId: string, @Body() servicioDto: ServicioDTO) {
    const servicio : ServicioEntity = plainToInstance(ServicioEntity, servicioDto);
    return await this.servicioService.updateServicio(servicioId, servicio);
  }

  @Delete(':servicioId')
  @HttpCode(204)
  async deleteServicio(@Param('servicioId') servicioId: string) {
    return await this.servicioService.deleteServicio(servicioId);
  }



}
