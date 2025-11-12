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
import { plainToInstance } from 'class-transformer';
import { BusinessErrorsInterceptor } from 'src/shared/interceptors/business-errors/business-errors.interceptor';
import { TrabajadorDto } from './trabajador.dto/trabajador.dto';
import { TrabajadorEntity } from './trabajador.entity';
import { TrabajadorService } from './trabajador.service';

@Controller('trabajadores')
@UseInterceptors(BusinessErrorsInterceptor)
export class TrabajadorController {
  constructor(private readonly trabajadorService: TrabajadorService) {}

  @Get()
  async findAll(): Promise<TrabajadorEntity[]> {
    return await this.trabajadorService.findAllTrabajadores();
  }

  @Get(':trabajadorId')
  async findOne(
    @Param('trabajadorId') trabajadorId: string,
  ): Promise<TrabajadorEntity> {
    return await this.trabajadorService.findOneTrabajador(trabajadorId);
  }

  @Post()
  async create(
    @Body() data: TrabajadorDto & { roles: string },
  ): Promise<TrabajadorEntity> {
    const trabajador = plainToInstance(TrabajadorEntity, data);
    return await this.trabajadorService.createTrabajador(trabajador);
  }

  @Put(':trabajadorId')
  async update(
    @Param('trabajadorId') trabajadorId: string,
    @Body() trabajadorDto: TrabajadorDto,
  ): Promise<TrabajadorEntity> {
    const trabajador = plainToInstance(TrabajadorEntity, trabajadorDto);
    return await this.trabajadorService.updateTrabajador(
      trabajadorId,
      trabajador,
    );
  }

  @Delete(':trabajadorId')
  @HttpCode(204)
  async delete(@Param('trabajadorId') trabajadorId: string): Promise<void> {
    return await this.trabajadorService.deleteTrabajador(trabajadorId);
  }
}
