/* eslint-disable prettier/prettier */
import {
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { NotificacionEntity } from '../../notificacion/notificacion.entity/notificacion.entity';
import { OfertaEntity } from '../../oferta/oferta.entity/oferta.entity';
import { ReseñaEntity } from '../../reseña/reseña.entity/reseña.entity';
import { UsuarioEntity } from '../../usuario/usuario.entity/usuario.entity';

@Entity('agendamiento')
export class AgendamientoEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // ManyToOne: muchos agentamientos tienen un usuario
  @ManyToOne(() => UsuarioEntity, (usuario) => usuario.agendamientos)
  usuario: UsuarioEntity;

  @ManyToOne(() => UsuarioEntity, (trabajador) => trabajador.agendamientos)
  trabajador: UsuarioEntity;

  @OneToOne(() => OfertaEntity, (oferta) => oferta.agendamiento)
  @JoinColumn()
  oferta: OfertaEntity;

  @OneToOne(() => ReseñaEntity, (reseña) => reseña.agendamiento)
  @JoinColumn()
  reseña: ReseñaEntity;

  @OneToOne(
    () => NotificacionEntity,
    (notificacion) => notificacion.agendamiento,
  )
  @JoinColumn()
  notificacion: NotificacionEntity;
}
