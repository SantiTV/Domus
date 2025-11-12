/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OfertaEntity } from '../oferta/oferta.entity/oferta.entity';
import { UsuarioEntity } from '../usuario/usuario.entity/usuario.entity';
import { Repository } from 'typeorm';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';

@Injectable()
export class OfertaUsuarioService {
    constructor(
        @InjectRepository(OfertaEntity)
        private readonly ofertaRepository: Repository<OfertaEntity>,
        @InjectRepository(UsuarioEntity)
        private readonly usuarioRepository: Repository<UsuarioEntity>
    ) {}

    async addUsuarioToOferta(ofertaId: string, usuarioId: string): Promise<OfertaEntity> {
        const usuario: UsuarioEntity = await this.usuarioRepository.findOne({ where: { idUsuario: usuarioId } });
        if (!usuario) {
            throw new BusinessLogicException('El usuario con el id proporcionado no existe', BusinessError.NOT_FOUND);
        }

        const oferta: OfertaEntity = await this.ofertaRepository.findOne({ where: { id: ofertaId }, relations: ['usuario'] });
        if (!oferta) {
            throw new BusinessLogicException('La oferta con el id proporcionado no existe', BusinessError.NOT_FOUND);
        }

        oferta.usuario = usuario;
        return await this.ofertaRepository.save(oferta);
    }

    async findUsuarioByOfertaIdUsuarioId(ofertaId: string, usuarioId: string): Promise<UsuarioEntity> {
        const usuario: UsuarioEntity = await this.usuarioRepository.findOne({ where: { idUsuario: usuarioId } });
        if (!usuario) {
            throw new BusinessLogicException('El usuario con el id proporcionado no existe', BusinessError.NOT_FOUND);
        }

        const oferta: OfertaEntity = await this.ofertaRepository.findOne({ where: { id: ofertaId }, relations: ['usuario'] });
        if (!oferta) {
            throw new BusinessLogicException('La oferta con el id proporcionado no existe', BusinessError.NOT_FOUND);
        }

        const ofertaUsuario: UsuarioEntity = oferta.usuario;

        if (!ofertaUsuario) {
            throw new BusinessLogicException('La oferta no tiene un usuario asociado', BusinessError.NOT_FOUND);
        }

        return oferta.usuario;
    }

    async findUsuarioByOfertaId(ofertaId: string): Promise<UsuarioEntity> {
        const oferta: OfertaEntity = await this.ofertaRepository.findOne({ where: { id: ofertaId }, relations: ['usuario'] });
        if (!oferta) {
            throw new BusinessLogicException('La oferta con el id proporcionado no existe', BusinessError.NOT_FOUND);
        }

        return oferta.usuario;
    }

    async deleteUsuarioFromOferta(ofertaId: string, usuarioId: string): Promise<OfertaEntity> {
        const oferta: OfertaEntity = await this.ofertaRepository.findOne({ where: { id: ofertaId }, relations: ['usuario'] });
        if (!oferta) {
            throw new BusinessLogicException('La oferta con el id proporcionado no existe', BusinessError.NOT_FOUND);
        }

        const usuario: UsuarioEntity = await this.usuarioRepository.findOne({ where: { idUsuario: usuarioId } });
        if (!usuario) {
            throw new BusinessLogicException('El usuario con el id proporcionado no existe', BusinessError.NOT_FOUND);
        }

        if (oferta.usuario.idUsuario !== usuarioId) {
            throw new BusinessLogicException('El usuario no está asociado a la oferta', BusinessError.NOT_FOUND);
        }

        oferta.usuario = null;
        return await this.ofertaRepository.save(oferta);
    }

    async findByUsuarioId(usuarioId: string): Promise<OfertaEntity[]> {
        const ofertas: OfertaEntity[] = await this.ofertaRepository.find({
            where: {
                usuario: {
                    idUsuario: usuarioId,
                },
            },
            relations: ["servicio"], 
        });

        if (ofertas.length === 0) {
            throw new BusinessLogicException(
                "No se encontraron ofertas para el usuario con el id proporcionado",
                BusinessError.NOT_FOUND
            );
        }

        return ofertas;
    }
}
