import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { Reservadto } from 'src/app/interfaces/reservadto';
import { DataSharingService } from 'src/app/services/data-sharing.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { HelperDate } from 'src/app/utils/HelperDate';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-proceso-reserva',
  templateUrl: './proceso-reserva.component.html',
  styleUrls: ['./proceso-reserva.component.css'],
})
export class ProcesoReservaComponent implements OnInit {
  formData: any;
  paymentResume!: string;
  fechaInicial!: string;
  fechaFinal!: string;

  // Form fields
  cardNumber: string = '';
  cardHolder: string = '';
  expiryDate: string = '';
  cvv: string = '';
  isProcessing: boolean = false;

  // Computed properties for backward compatibility
  get expiryMonth(): string {
    return this.expiryDate.split('/')[0] || '';
  }

  get expiryYear(): string {
    return this.expiryDate.split('/')[1] || '';
  }

  constructor(
    private dataSharingService: DataSharingService,
    private usuarioService: UsuarioService,
    private _router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.formData = this.dataSharingService.getFormData();

    // Verificar que tenemos datos de reserva
    if (!this.formData || !this.formData.fechaInicio || !this.formData.fechaFin) {
      // Si no hay datos, redirigir al catálogo
      Swal.fire({
        icon: 'warning',
        title: 'No hay datos de reserva',
        text: 'Por favor, selecciona un vehículo y fechas primero.',
        confirmButtonColor: '#d10000',
      }).then(() => {
        this._router.navigate(['/catalogo']);
      });
      return;
    }

    this.fechaInicial = this.formData.fechaInicio;
    this.fechaFinal = this.formData.fechaFin;
    this.previousExpiryValue = ''; // Inicializar el valor anterior

    let fechaInicioFormatted = HelperDate.formatToLongDate(
      this.formData.fechaInicio
    );
    let fechaFinFormatted = HelperDate.formatToLongDate(this.formData.fechaFin);
    let diasAlquilado = HelperDate.SubstractDates(
      this.fechaInicial,
      this.fechaFinal
    );
    let precioTotal = diasAlquilado * parseInt(this.formData.precio);
    this.paymentResume = `El precio total del alquiler desde
     el ${fechaInicioFormatted} hasta el ${fechaFinFormatted}
      es de ${precioTotal}€`;
  }

  handleReserva(): void {
    this.isProcessing = true;

    let email = this.usuarioService.getEmailFromLocalStorage();
    let diasAlquilado = HelperDate.SubstractDates(
      this.fechaInicial,
      this.fechaFinal
    );
    let precioTotal = diasAlquilado * parseInt(this.formData.precio);
    const dataReserva: Reservadto = {
      idReserva: 0,
      idCoche: this.formData.idCoche,
      email: email,
      fechaInicio: this.fechaInicial,
      fechaFin: this.fechaFinal,
      precioTotal: precioTotal,
    };

    this.usuarioService.payReserva(dataReserva).subscribe((response) => {
      this.isProcessing = false;
      if (response) {
        // Limpiar los datos de reserva después de completar exitosamente
        this.dataSharingService.clearFormData();

        this._router.navigate(['/perfil']);
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Tu reserva se ha realizado con éxito',
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  }

  // Helper methods for template
  getFechaInicioFormatted(): string {
    if (!this.formData || !this.formData.fechaInicio) return '';
    return HelperDate.formatToLongDate(this.formData.fechaInicio);
  }

  getFechaFinFormatted(): string {
    if (!this.formData || !this.formData.fechaFin) return '';
    return HelperDate.formatToLongDate(this.formData.fechaFin);
  }

  getDiasAlquilado(): number {
    if (!this.fechaInicial || !this.fechaFinal) return 0;
    return HelperDate.SubstractDates(this.fechaInicial, this.fechaFinal);
  }

  getPrecioTotal(): number {
    if (!this.formData || !this.formData.precio) return 0;
    return this.getDiasAlquilado() * parseInt(this.formData.precio);
  }

  getTaxes(): number {
    // Simulamos un 21% de IVA ya incluido en el precio
    const total = this.getPrecioTotal();
    if (total === 0) return 0;
    return Math.round(total * 0.21 / 1.21);
  }

  // Variable para rastrear el valor anterior
  private previousExpiryValue: string = '';

  // Método para formatear automáticamente la fecha de vencimiento
  formatExpiryDate(event: any): void {
    const input = event.target;
    let currentValue = input.value;
    const previousValue = this.previousExpiryValue;

    // Detectar si estamos borrando comparando longitudes
    const isDeleting = currentValue.length < previousValue.length;

    if (isDeleting) {
      // Si estamos borrando y el valor actual termina en barra, borramos también el dígito anterior
      if (currentValue.endsWith('/') && previousValue.length > currentValue.length) {
        currentValue = currentValue.slice(0, -1);
      }

      this.expiryDate = currentValue;
      this.previousExpiryValue = currentValue;

      // Usar microtask en lugar de setTimeout
      queueMicrotask(() => {
        input.value = currentValue;
        this.cdr.detectChanges();
      });
      return;
    }

    // Eliminar caracteres no numéricos
    const numbersOnly = currentValue.replace(/\D/g, '');

    // Formatear según la longitud
    let formattedValue = '';
    if (numbersOnly.length <= 2) {
      formattedValue = numbersOnly;
    } else if (numbersOnly.length <= 6) {
      formattedValue = numbersOnly.substring(0, 2) + '/' + numbersOnly.substring(2);
    } else {
      formattedValue = numbersOnly.substring(0, 2) + '/' + numbersOnly.substring(2, 6);
    }

    this.expiryDate = formattedValue;
    this.previousExpiryValue = formattedValue;

    // Usar microtask en lugar de setTimeout
    queueMicrotask(() => {
      const cursorPosition = input.selectionStart;
      input.value = formattedValue;

      // Ajustar cursor si acabamos de agregar la barra
      if (formattedValue.length === 3 && formattedValue.charAt(2) === '/' && cursorPosition === 2) {
        input.setSelectionRange(3, 3);
      }
      this.cdr.detectChanges();
    });
  }

  // Manejar eventos especiales de teclado
  onExpiryKeyDown(event: KeyboardEvent): void {
    const input = event.target as HTMLInputElement;
    const value = input.value;
    const cursorPosition = input.selectionStart || 0;

    // Permitir teclas de navegación y control
    const controlKeys = ['Backspace', 'Delete', 'Tab', 'Escape', 'Enter', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End'];

    if (controlKeys.includes(event.key)) {
      // Caso especial: Backspace cuando estamos justo después de la barra y solo hay MM/
      if (event.key === 'Backspace' &&
          cursorPosition === 3 &&
          value.length === 3 &&
          value.endsWith('/')) {
        event.preventDefault();

        // Borrar la barra y el último dígito del mes
        const newValue = value.substring(0, 1);
        this.expiryDate = newValue;
        this.previousExpiryValue = newValue;

        // Usar microtask en lugar de setTimeout
        queueMicrotask(() => {
          input.value = newValue;
          input.setSelectionRange(1, 1);
          this.cdr.detectChanges();
        });
        return;
      }

      // Para otras teclas de control, usar microtask para actualizar el valor anterior
      queueMicrotask(() => {
        this.previousExpiryValue = input.value;
      });

      return;
    }

    // Solo permitir números
    if (!/\d/.test(event.key)) {
      event.preventDefault();
      return;
    }

    // Limitar a 6 dígitos totales
    const numbersInValue = value.replace(/\D/g, '').length;
    if (numbersInValue >= 6) {
      event.preventDefault();
    }
  }

  // Validar formato de fecha de vencimiento
  isValidExpiryDate(): boolean {
    const regex = /^(0[1-9]|1[0-2])\/\d{4}$/;
    if (!regex.test(this.expiryDate)) return false;

    const [month, year] = this.expiryDate.split('/');
    const expiry = new Date(parseInt(year), parseInt(month) - 1);
    const now = new Date();

    return expiry > now;
  }
}
