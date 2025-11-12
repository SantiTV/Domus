/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AgendamientoEntity } from './agendamiento/agendamiento.entity/agendamiento.entity';
import { AgendamientoModule } from './agendamiento/agendamiento.module';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { NotificacionEntity } from './notificacion/notificacion.entity/notificacion.entity';
import { NotificacionModule } from './notificacion/notificacion.module';
import { OfertaAgendamientoModule } from './oferta-agendamiento/oferta-agendamiento.module';
import { OfertaUsuarioModule } from './oferta-usuario/oferta-usuario.module';
import { OfertaEntity } from './oferta/oferta.entity/oferta.entity';
import { OfertaModule } from './oferta/oferta.module';
import { ReseñaAgendamientoModule } from './reseña-agendamiento/reseña-agendamiento.module';
import { ReseñaEntity } from './reseña/reseña.entity/reseña.entity';
import { ReseñaModule } from './reseña/reseña.module';
import { ServicioEntity } from './servicio/servicio.entity/servicio.entity';
import { ServicioModule } from './servicio/servicio.module';
import { TrabajadorAgendamientoModule } from './trabajador-agendamiento/trabajador-agendamiento.module';
import { TrabajadorEntity } from './trabajador/trabajador.entity';
import { TrabajadorModule } from './trabajador/trabajador.module';
import { UsuarioAgendamientoModule } from './usuario-agendamiento/usuario-agendamiento.module';
import { UsuarioEntity } from './usuario/usuario.entity/usuario.entity';
import { UsuarioModule } from './usuario/usuario.module';

@Module({
  imports: [
    TrabajadorModule,
    ReseñaModule,
    OfertaModule,
    UsuarioModule,
    AgendamientoModule,
    NotificacionModule,
    AuthModule,
    ServicioModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'Domus',
      entities: [
        OfertaEntity,
        TrabajadorEntity,
        ReseñaEntity,
        UsuarioEntity,
        AgendamientoEntity,
        NotificacionEntity,
        ServicioEntity,
      ],
      dropSchema: true,
      synchronize: true,
    }),
    TrabajadorAgendamientoModule,
    UsuarioAgendamientoModule,
    AuthModule,
    AuthModule,
    ReseñaAgendamientoModule,
    OfertaAgendamientoModule,
    OfertaUsuarioModule,
  ],
  providers: [AppService],
})
export class AppModule {}
