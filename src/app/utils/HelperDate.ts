export class HelperDate {
  static formatToLongDate(fecha: string): string {
    const opciones: Intl.DateTimeFormatOptions = {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    };
    const date = new Date(fecha);
    return date.toLocaleDateString('es-ES', opciones);
  }

  static SubstractDates(initialDate: string, finalDate:string): number {
    const date1 = new Date(initialDate);
    const date2 = new Date(finalDate);
    const differenceInMilliseconds = date2.getTime() - date1.getTime();
    const differenceInDays = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24));
    return differenceInDays;
  }
}
