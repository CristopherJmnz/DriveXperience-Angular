import { Injectable } from '@angular/core';
import { Reserva } from '../interfaces/reserva';
import { HelperDate } from '../utils/HelperDate';

export type EstadoReserva = 'pendiente' | 'activa' | 'completada' | 'expirada';

export interface EstadoReservaInfo {
  estado: EstadoReserva;
  icon: string;
  text: string;
  description: string;
  cssClass: string;
  esProxima: boolean;
  terminaPronto: boolean;
  diasRestantes?: number;
  diasParaInicio?: number;
  diasDesdeFinalizacion?: number;
}

@Injectable({
  providedIn: 'root'
})
export class ReservaEstadoService {

  constructor() { }

  public useReservaEstado(reserva: Reserva): EstadoReservaInfo {
    const estado = this.calculateEstado(reserva);
    const fechaInfo = this.calculateFechaInfo(reserva);

    return {
      estado,
      icon: this.getEstadoIcon(estado),
      text: this.getEstadoText(estado),
      description: this.getEstadoDescription(estado, fechaInfo),
      cssClass: `estado-${estado}`,
      esProxima: this.esProxima(estado, fechaInfo.diasParaInicio),
      terminaPronto: this.terminaPronto(estado, fechaInfo.diasRestantes),
      ...fechaInfo
    };
  }

  /**
   * Calcula el estado de la reserva basándose en las fechas
   */
  private calculateEstado(reserva: Reserva): EstadoReserva {
    const hoy = new Date();
    const fechaInicio = new Date(reserva.fechaInicio);
    const fechaFin = new Date(reserva.fechaFin);

    // Normalizar las fechas para comparar solo días (sin horas)
    const hoyNormalizada = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate());
    const inicioNormalizada = new Date(fechaInicio.getFullYear(), fechaInicio.getMonth(), fechaInicio.getDate());
    const finNormalizada = new Date(fechaFin.getFullYear(), fechaFin.getMonth(), fechaFin.getDate());

    if (hoyNormalizada < inicioNormalizada) {
      return 'pendiente';
    } else if (hoyNormalizada >= inicioNormalizada && hoyNormalizada <= finNormalizada) {
      return 'activa';
    } else if (hoyNormalizada > finNormalizada) {
      return 'completada';
    } else {
      return 'expirada';
    }
  }

  /**
   * Calcula información relacionada con las fechas
   */
  private calculateFechaInfo(reserva: Reserva) {
    const hoy = new Date();
    const fechaInicio = new Date(reserva.fechaInicio);
    const fechaFin = new Date(reserva.fechaFin);

    const diasParaInicio = Math.ceil((fechaInicio.getTime() - hoy.getTime()) / (1000 * 60 * 60 * 24));
    const diasRestantes = Math.ceil((fechaFin.getTime() - hoy.getTime()) / (1000 * 60 * 60 * 24));
    const diasDesdeFinalizacion = Math.floor((hoy.getTime() - fechaFin.getTime()) / (1000 * 60 * 60 * 24));

    return {
      diasParaInicio,
      diasRestantes,
      diasDesdeFinalizacion
    };
  }

  /**
   * Obtiene el ícono según el estado
   */
  private getEstadoIcon(estado: EstadoReserva): string {
    switch (estado) {
      case 'pendiente':
        return 'fas fa-hourglass-half';
      case 'activa':
        return 'fas fa-play-circle';
      case 'completada':
        return 'fas fa-check-circle';
      case 'expirada':
        return 'fas fa-times-circle';
      default:
        return 'fas fa-question-circle';
    }
  }

  /**
   * Obtiene el texto del estado
   */
  private getEstadoText(estado: EstadoReserva): string {
    switch (estado) {
      case 'pendiente':
        return 'Pendiente';
      case 'activa':
        return 'Activa';
      case 'completada':
        return 'Completada';
      case 'expirada':
        return 'Expirada';
      default:
        return 'Desconocido';
    }
  }

  /**
   * Obtiene la descripción detallada del estado
   */
  private getEstadoDescription(estado: EstadoReserva, fechaInfo: any): string {
    const { diasParaInicio, diasRestantes, diasDesdeFinalizacion } = fechaInfo;

    switch (estado) {
      case 'pendiente':
        if (diasParaInicio === 1) {
          return 'Comienza mañana';
        } else if (diasParaInicio === 0) {
          return 'Comienza hoy';
        } else {
          return `Comienza en ${diasParaInicio} días`;
        }

      case 'activa':
        if (diasRestantes === 0) {
          return 'Termina hoy';
        } else if (diasRestantes === 1) {
          return 'Termina mañana';
        } else {
          return `${diasRestantes} días restantes`;
        }

      case 'completada':
        if (diasDesdeFinalizacion === 0) {
          return 'Terminó hoy';
        } else if (diasDesdeFinalizacion === 1) {
          return 'Terminó ayer';
        } else {
          return `Terminó hace ${diasDesdeFinalizacion} días`;
        }

      case 'expirada':
        return 'Estado no válido';

      default:
        return '';
    }
  }

  /**
   * Indica si la reserva es próxima (comienza en los próximos 3 días)
   */
  private esProxima(estado: EstadoReserva, diasParaInicio?: number): boolean {
    if (estado !== 'pendiente' || diasParaInicio === undefined) return false;
    return diasParaInicio <= 3;
  }

  /**
   * Indica si la reserva está terminando pronto (termina en los próximos 2 días)
   */
  private terminaPronto(estado: EstadoReserva, diasRestantes?: number): boolean {
    if (estado !== 'activa' || diasRestantes === undefined) return false;
    return diasRestantes <= 2;
  }

  /**
   * Métodos públicos para acceso directo (compatibilidad con código existente)
   */
  public getEstado(reserva: Reserva): EstadoReserva {
    return this.calculateEstado(reserva);
  }

  public getIcon(reserva: Reserva): string {
    const estado = this.calculateEstado(reserva);
    return this.getEstadoIcon(estado);
  }

  public getText(reserva: Reserva): string {
    const estado = this.calculateEstado(reserva);
    return this.getEstadoText(estado);
  }

  public getCssClass(reserva: Reserva): string {
    const estado = this.calculateEstado(reserva);
    return `estado-${estado}`;
  }

  /**
   * Utilidades adicionales
   */
  public getDuration(reserva: Reserva): number {
    return HelperDate.calculateReservationDuration(reserva.fechaInicio, reserva.fechaFin);
  }

  public getFormattedStartDate(reserva: Reserva): string {
    return HelperDate.formatToLongDate(reserva.fechaInicio);
  }

  public getFormattedEndDate(reserva: Reserva): string {
    return HelperDate.formatToLongDate(reserva.fechaFin);
  }

  /**
   * Filtra reservas por estado
   */
  public filterByEstado(reservas: Reserva[], estado: EstadoReserva): Reserva[] {
    return reservas.filter(reserva => this.calculateEstado(reserva) === estado);
  }

  /**
   * Obtiene estadísticas de reservas agrupadas por estado
   */
  public getEstadisticas(reservas: Reserva[]) {
    const stats = {
      pendientes: 0,
      activas: 0,
      completadas: 0,
      expiradas: 0,
      proximasAComenzar: 0,
      terminandoPronto: 0,
      total: reservas.length
    };

    reservas.forEach(reserva => {
      const info = this.useReservaEstado(reserva);
      stats[`${info.estado}s` as keyof typeof stats]++;

      if (info.esProxima) stats.proximasAComenzar++;
      if (info.terminaPronto) stats.terminandoPronto++;
    });

    return stats;
  }

  /**
   * Ordena las reservas por prioridad de estado y luego alfabéticamente
   * Orden de prioridad: activa -> pendiente -> completada -> expirada
   */
  public sortReservasByPriority(reservas: Reserva[]): Reserva[] {
    const estadoPrioridad: Record<EstadoReserva, number> = {
      'activa': 1,
      'pendiente': 2,
      'completada': 3,
      'expirada': 4
    };

    return [...reservas].sort((a, b) => {
      const estadoA = this.calculateEstado(a);
      const estadoB = this.calculateEstado(b);

      const prioridadA = estadoPrioridad[estadoA];
      const prioridadB = estadoPrioridad[estadoB];

      // Primero ordenar por prioridad de estado
      if (prioridadA !== prioridadB) {
        return prioridadA - prioridadB;
      }

      // Si tienen el mismo estado, ordenar alfabéticamente por nombre del coche
      const nombreA = a.coche.nombreCoche.toLowerCase();
      const nombreB = b.coche.nombreCoche.toLowerCase();

      return nombreA.localeCompare(nombreB, 'es', {
        numeric: true,
        sensitivity: 'base'
      });
    });
  }

  /**
   * Ordena las reservas por fecha (más recientes primero)
   */
  public sortReservasByDate(reservas: Reserva[], order: 'asc' | 'desc' = 'desc'): Reserva[] {
    return [...reservas].sort((a, b) => {
      const fechaA = new Date(a.fechaInicio).getTime();
      const fechaB = new Date(b.fechaInicio).getTime();

      return order === 'desc' ? fechaB - fechaA : fechaA - fechaB;
    });
  }

  /**
   * Ordena las reservas con múltiples criterios
   */
  public sortReservasMultiple(
    reservas: Reserva[],
    criteria: Array<'priority' | 'date' | 'alphabetical'> = ['priority']
  ): Reserva[] {
    if (criteria.includes('priority')) {
      return this.sortReservasByPriority(reservas);
    }

    if (criteria.includes('date')) {
      return this.sortReservasByDate(reservas);
    }

    // Solo alfabético
    return [...reservas].sort((a, b) => {
      const nombreA = a.coche.nombreCoche.toLowerCase();
      const nombreB = b.coche.nombreCoche.toLowerCase();
      return nombreA.localeCompare(nombreB, 'es', { numeric: true, sensitivity: 'base' });
    });
  }
}
