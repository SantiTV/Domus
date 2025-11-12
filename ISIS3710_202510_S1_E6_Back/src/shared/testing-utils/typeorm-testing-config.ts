/* eslint-disable prettier/prettier */
import { TypeOrmModule } from '@nestjs/typeorm';
import { OfertaEntity } from '../../oferta/oferta.entity/oferta.entity';
import { TrabajadorEntity } from '../../trabajador/trabajador.entity';
import { ReseñaEntity } from '../../reseña/reseña.entity/reseña.entity';
import { UsuarioEntity } from '../../usuario/usuario.entity/usuario.entity';
import { AgendamientoEntity } from '../../agendamiento/agendamiento.entity/agendamiento.entity';
import { NotificacionEntity } from '../../notificacion/notificacion.entity/notificacion.entity';
import { ServicioEntity } from '../../servicio/servicio.entity/servicio.entity';



export const TypeOrmTestingConfig = () => [
 TypeOrmModule.forRoot({
   type: 'sqlite',
   database: ':memory:',
   dropSchema: true,
   entities: [OfertaEntity, TrabajadorEntity, ReseñaEntity, UsuarioEntity, AgendamientoEntity, NotificacionEntity, ServicioEntity],
   synchronize: true,
 }),
 TypeOrmModule.forFeature([OfertaEntity, TrabajadorEntity, ReseñaEntity, UsuarioEntity, AgendamientoEntity, NotificacionEntity, ServicioEntity]),
];
