import { Coche } from "./coche";
import { Usuario } from "./usuario";

export interface Reserva {
  idReserva: number;

  fechaFin: Date;
  fechaInicio: Date;

  precioTotal: number;

  coche: Coche;

  usuario: Usuario;
  direccionEntrega: string;
}
