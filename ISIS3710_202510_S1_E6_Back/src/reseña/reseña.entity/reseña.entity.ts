/* eslint-disable prettier/prettier */
import { AgendamientoEntity } from "../../agendamiento/agendamiento.entity/agendamiento.entity";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn, JoinColumn } from 'typeorm';

@Entity("resenias")
export class ReseñaEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    comentario: string;

    @Column()
    calificacion: number;

    @Column()
    fechaReseña: Date;

    @OneToOne(() => AgendamientoEntity, (agendamiento) => agendamiento.reseña)
    @JoinColumn()
    agendamiento: AgendamientoEntity;
}
