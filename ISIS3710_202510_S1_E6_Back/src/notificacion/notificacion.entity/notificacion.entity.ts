/* eslint-disable prettier/prettier */
import { AgendamientoEntity } from "../../agendamiento/agendamiento.entity/agendamiento.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class NotificacionEntity {
        @PrimaryGeneratedColumn("uuid")
        id: string;

        @Column()
        titulo: string;

        @Column()
        mensaje: string;

        @Column()
        fechaNotificacion: Date;

        @OneToOne(()=> AgendamientoEntity, agendamiento => agendamiento.notificacion)
        @JoinColumn()
        agendamiento: AgendamientoEntity;
}
