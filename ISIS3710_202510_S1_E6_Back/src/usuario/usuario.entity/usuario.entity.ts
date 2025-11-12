/* eslint-disable prettier/prettier */
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  TableInheritance,
} from 'typeorm';
import { AgendamientoEntity } from '../../agendamiento/agendamiento.entity/agendamiento.entity';
import { OfertaEntity } from '../../oferta/oferta.entity/oferta.entity';

@Entity('usuario')
@TableInheritance({ column: { type: 'varchar', name: 'roles' } })
export class UsuarioEntity {
  @PrimaryGeneratedColumn('uuid')
  idUsuario: string;

  @Column()
  nombre: string;

  @Column()
  correo: string;

  @Column()
  contraseña: string;

  @Column()
  telefono: string;

  @Column()
  roles: string;

  @OneToMany(() => AgendamientoEntity, (agendamiento) => agendamiento.usuario)
  agendamientos: AgendamientoEntity[];

  @OneToMany(() => OfertaEntity, (oferta) => oferta.usuario)
  oferta: OfertaEntity[];
}
