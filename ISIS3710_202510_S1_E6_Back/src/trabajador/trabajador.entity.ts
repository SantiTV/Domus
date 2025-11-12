/* eslint-disable prettier/prettier */
import { ChildEntity, Column, JoinTable, ManyToMany, OneToMany } from 'typeorm';
import { AgendamientoEntity } from '../agendamiento/agendamiento.entity/agendamiento.entity';
import { ServicioEntity } from '../servicio/servicio.entity/servicio.entity';
//import { ServiciosEntity } from './servicios.entity';
import { UsuarioEntity } from "../usuario/usuario.entity/usuario.entity";

@ChildEntity('trabajador')
export class TrabajadorEntity extends UsuarioEntity {
  @Column({ nullable: true })
  especialidad: string;

  @Column({ nullable: true })
  disponibilidad: string;

  @Column({ nullable: true })
  ubicacion: string;

  @OneToMany(
    () => AgendamientoEntity,
    (agendamiento) => agendamiento.trabajador,
  )
  agendamientos: AgendamientoEntity[];

  // @ManyToMany(() => ServiciosEntity, { cascade: true })
  @JoinTable()
  //serviciosDisponibles: ServiciosEntity[];
  @Column({ nullable: true })
  hojaDeVida: string;

  @ManyToMany(() => ServicioEntity, (servicio) => servicio.trabajadores)
  @JoinTable()
  servicios: ServicioEntity[];
}
