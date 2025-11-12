/* eslint-disable prettier/prettier */
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors/business-errors.interceptor';
import { AgendamientoDto } from './agendamiento.dto/agendamiento.dto';
import { AgendamientoEntity } from './agendamiento.entity/agendamiento.entity';
import { AgendamientoService } from './agendamiento.service';
import { OfertaService } from 'src/oferta/oferta.service';
import { TrabajadorService } from 'src/trabajador/trabajador.service';
import { UsuarioService } from 'src/usuario/usuario.service';

@Controller('agendamientos')
@UseInterceptors(BusinessErrorsInterceptor)
export class AgendamientoController {
  constructor(
    private readonly agendamientoService: AgendamientoService,
    private readonly usuarioService: UsuarioService,
    private readonly trabajadorService: TrabajadorService,
    private readonly ofertaService: OfertaService,
  ) { }

  @Get()
  async findAll() {
    return await this.agendamientoService.findAllAgendamientos();
  }

  @Get(':agendamientoId')
  async findOne(@Param('agendamientoId') agendamientoId: string) {
    return await this.agendamientoService.findOneAgendamiento(agendamientoId);
  }

  @Post()
  async create(@Body() agendamientoDto: AgendamientoDto) {
    // Mapea DTO a Entity
    const agendamiento: AgendamientoEntity = plainToInstance(
      AgendamientoEntity,
      agendamientoDto,
    );

    // Borra las propiedades planas para que no existan en el objeto final
    delete (agendamiento as any).usuarioId;
    delete (agendamiento as any).trabajadorId;
    delete (agendamiento as any).ofertaId;

    console.log('DTO:', agendamientoDto);

    // Busca usuario completo
    const usuario = await this.usuarioService.findOneUsuario(agendamientoDto.usuarioId);
    if (!usuario) throw new BadRequestException('Usuario no encontrado');
    agendamiento.usuario = usuario;

    // Busca trabajador completo
    const trabajador = await this.usuarioService.findOneUsuario(agendamientoDto.trabajadorId);
    if (!trabajador) throw new BadRequestException('Trabajador no encontrado');
    agendamiento.trabajador = trabajador;

    // Busca oferta completa
    const oferta = await this.ofertaService.findOne(agendamientoDto.ofertaId);
    if (!oferta) throw new BadRequestException('Oferta no encontrada');
    agendamiento.oferta = oferta;

    console.log('Entity:', agendamiento);

    // Crea agendamiento ya limpio
    return await this.agendamientoService.createAgendamiento(agendamiento);
  }



  @Put(':agendamientoId')
  async update(
    @Param('agendamientoId') agendamientoId: string,
    @Body() agendamientoDto: AgendamientoDto,
  ) {
    const agendamiento: AgendamientoEntity = plainToInstance(
      AgendamientoEntity,
      agendamientoDto,
    );
    return await this.agendamientoService.updateAgendamiento(
      agendamientoId,
      agendamiento,
    );
  }

  @Delete(':agendamientoId')
  @HttpCode(204)
  async delete(@Param('agendamientoId') agendamientoId: string) {
    return await this.agendamientoService.deleteAgendamiento(agendamientoId);
  }

  @Get('estado/:estado')
  async getAgendamientosPorEstado(@Param('estado') estado: string) {
    return await this.agendamientoService.findAgendamientosByEstado(estado);
  }

  @Patch(':id/estado/:estado')
  async actualizarEstado(@Param('id') id: string, @Param('estado') estado: string) {
    return await this.agendamientoService.actualizarEstadoAgendamiento(id, estado);
  }
}
