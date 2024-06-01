import { Tarjeta } from "./tarjeta";

export interface Usuario {
  email: string;
  apellidos: string;
  fechaNacimiento: Date;
  nombre: string;
  password: string;
  telefono: string;
  tarjetas: Tarjeta[];
}
