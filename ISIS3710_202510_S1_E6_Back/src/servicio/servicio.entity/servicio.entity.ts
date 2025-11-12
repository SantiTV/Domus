/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, OneToMany, JoinColumn } from 'typeorm';
import { TrabajadorEntity } from '../../trabajador/trabajador.entity';
import { OfertaEntity } from '../../oferta/oferta.entity/oferta.entity';

@Entity('servicio')
export class ServicioEntity {
  @PrimaryGeneratedColumn('uuid')
  idServicio: string;

  @Column()
  nombre: string;

  @Column()
  descripcion: string;

  @Column()
  precioBase: number;

  @OneToMany(() => OfertaEntity, oferta => oferta.servicio)
  @JoinColumn()
  ofertas: OfertaEntity[];

  @ManyToMany(()=> TrabajadorEntity, (trabajador) => trabajador.servicios)
  trabajadores: TrabajadorEntity[];
}
