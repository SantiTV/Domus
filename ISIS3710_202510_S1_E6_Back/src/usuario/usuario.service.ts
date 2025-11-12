/* eslint-disable prettier/prettier */
import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BusinessLogicException } from '../shared/errors/business-errors';
import { UpdateTrabajador } from '../trabajador/trabajador.dto/update-trabajador/update-trabajador';
import { TrabajadorEntity } from '../trabajador/trabajador.entity';
import { UsuarioEntity } from './usuario.entity/usuario.entity';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(UsuarioEntity)
    private readonly usuarioRepository: Repository<UsuarioEntity>,

    @InjectRepository(TrabajadorEntity)
    private readonly trabajadorRepository: Repository<TrabajadorEntity>,
  ) {}

  // Método para traer todos los usuarios
  async findAllUsuarios(): Promise<UsuarioEntity[]> {
    return await this.usuarioRepository.find();
  }

  // Método para obtener un usuario por su ID
  async findOneUsuario(id: string): Promise<UsuarioEntity> {
    const usuario: UsuarioEntity = await this.usuarioRepository.findOne({
      where: { idUsuario: id },
    });
    if (!usuario) {
      console.log('No se encontró el usuario.');
      throw new BusinessLogicException(
        'Usuario no encontrado',
        HttpStatus.NOT_FOUND,
      );
    }
    return usuario;
  }

  // Crear un nuevo usuario
  async createUsuario(usuario: UsuarioEntity): Promise<UsuarioEntity> {
    return await this.usuarioRepository.save(usuario);
  }

  // Actualizar un usuario existente
  async updateUsuario(
    id: string,
    usuario: UsuarioEntity,
  ): Promise<UsuarioEntity> {
    const usuarioExistente: UsuarioEntity =
      await this.usuarioRepository.findOne({ where: { idUsuario: id } });
    if (!usuarioExistente) {
      throw new BusinessLogicException(
        'Usuario no encontrado',
        HttpStatus.NOT_FOUND,
      );
    }
    return await this.usuarioRepository.save({
      ...usuarioExistente,
      ...usuario,
    });
  }

  // Eliminar un usuario
  async deleteUsuario(id: string): Promise<void> {
    const usuario: UsuarioEntity = await this.usuarioRepository.findOne({
      where: { idUsuario: id },
    });
    if (!usuario) {
      throw new BusinessLogicException(
        'Usuario no encontrado',
        HttpStatus.NOT_FOUND,
      );
    }
    await this.usuarioRepository.remove(usuario);
  }

  // Verificacion de corre para roles
  async findByCorreo(correo: string): Promise<UsuarioEntity | undefined> {
    return this.usuarioRepository.findOne({ where: { correo } });
  }

  async completarDatosTrabajador(id: string, dto: UpdateTrabajador) {
    const usuarioBase = await this.usuarioRepository.findOne({
      where: { idUsuario: id },
    });

    if (!usuarioBase) {
      throw new NotFoundException('Usuario no encontrado');
    }

    // Verificamos si ya es un Trabajador
    const trabajadorExistente = await this.trabajadorRepository.findOne({
      where: { idUsuario: id },
    });

    if (trabajadorExistente) {
      // Ya es trabajador: solo actualizamos
      trabajadorExistente.especialidad = dto.especialidad;
      trabajadorExistente.disponibilidad = dto.disponibilidad;
      trabajadorExistente.ubicacion = dto.ubicacion;
      trabajadorExistente.hojaDeVida = dto.hojaDeVida;

      return await this.trabajadorRepository.save(trabajadorExistente);
    }

    // Eliminamos el usuario base antes de crear el nuevo trabajador
    await this.usuarioRepository.remove(usuarioBase);

    // Creamos nuevo TrabajadorEntity con la misma ID
    const trabajadorNuevo = this.trabajadorRepository.create({
      ...usuarioBase, // esto incluye idUsuario, correo, nombre, etc.
      roles: 'Trabajador',
      especialidad: dto.especialidad,
      disponibilidad: dto.disponibilidad,
      ubicacion: dto.ubicacion,
      hojaDeVida: dto.hojaDeVida,
    });

    return await this.trabajadorRepository.save(trabajadorNuevo);
  }
}
