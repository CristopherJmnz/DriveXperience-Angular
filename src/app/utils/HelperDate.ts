export class HelperDate {
  /**
   * Formatea una fecha a formato largo en español
   */
  static formatToLongDate(fecha: string | Date): string {
    try {
      const opciones: Intl.DateTimeFormatOptions = {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      };
      const date = typeof fecha === 'string' ? new Date(fecha) : fecha;
      return date.toLocaleDateString('es-ES', opciones);
    } catch {
      return fecha.toString();
    }
  }

  /**
   * Formatea una fecha a formato corto DD/MM/YYYY
   */
  static formatToShortDate(fecha: string | Date): string {
    try {
      const date = typeof fecha === 'string' ? new Date(fecha) : fecha;
      return date.toLocaleDateString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
    } catch {
      return fecha.toString();
    }
  }

  /**
   * Calcula la diferencia en días entre dos fechas
   */
  static SubstractDates(initialDate: string | Date, finalDate: string | Date): number {
    try {
      const date1 = typeof initialDate === 'string' ? new Date(initialDate) : initialDate;
      const date2 = typeof finalDate === 'string' ? new Date(finalDate) : finalDate;
      
      const differenceInMilliseconds = date2.getTime() - date1.getTime();
      const differenceInDays = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24));
      
      // Asegurar que siempre devuelva al menos 1 día
      return Math.max(1, differenceInDays);
    } catch {
      return 1;
    }
  }

  /**
   * Calcula la duración en días de una reserva (incluye día de inicio y fin)
   */
  static calculateReservationDuration(fechaInicio: string | Date, fechaFin: string | Date): number {
    try {
      const date1 = typeof fechaInicio === 'string' ? new Date(fechaInicio) : fechaInicio;
      const date2 = typeof fechaFin === 'string' ? new Date(fechaFin) : fechaFin;
      
      const differenceInMilliseconds = date2.getTime() - date1.getTime();
      const differenceInDays = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24));
      
      // Para reservas, incluimos el día de inicio, por lo que sumamos 1
      return Math.max(1, differenceInDays + 1);
    } catch {
      return 1;
    }
  }

  /**
   * Verifica si una fecha es válida
   */
  static isValidDate(fecha: string | Date): boolean {
    try {
      const date = typeof fecha === 'string' ? new Date(fecha) : fecha;
      return date instanceof Date && !isNaN(date.getTime());
    } catch {
      return false;
    }
  }

  /**
   * Convierte una fecha a ISO string para comparaciones
   */
  static toISODate(fecha: string | Date): string {
    try {
      const date = typeof fecha === 'string' ? new Date(fecha) : fecha;
      return date.toISOString().split('T')[0];
    } catch {
      return '';
    }
  }
}
