/* eslint-disable prettier/prettier */
import { UsuarioEntity } from "../../usuario/usuario.entity/usuario.entity";
import { AgendamientoEntity } from "../../agendamiento/agendamiento.entity/agendamiento.entity";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from "typeorm";
import { ServicioEntity } from "../../servicio/servicio.entity/servicio.entity";

@Entity('oferta')
export class OfertaEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;


    @Column()
    descripcion: string;

    @Column()
    fechaDeseada: string;

    @Column()
    horaDeseada: string;

    @Column()
    estado: string;

    @Column()
    ubicacionServicio: string;

    @Column({ nullable: true })
    imagenUrl: string;

    @OneToOne(() => AgendamientoEntity, agendamiento => agendamiento.oferta)
    @JoinColumn()
    agendamiento: AgendamientoEntity;

    @ManyToOne(() => UsuarioEntity, usuario => usuario.oferta)
    usuario: UsuarioEntity;

    @ManyToOne(() => ServicioEntity, servicio => servicio.ofertas)
    servicio: ServicioEntity;

}
