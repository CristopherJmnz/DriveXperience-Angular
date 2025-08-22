import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil, finalize } from 'rxjs';
import { Reserva } from 'src/app/interfaces/reserva';
import { UsuarioService } from 'src/app/services/usuario.service';
import { HelperDate } from 'src/app/utils/HelperDate';
import { ReservaEstadoService } from 'src/app/services/reserva-estado.service';

@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.component.html',
  styleUrls: ['./reservas.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReservasComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject<void>();

  public reservas: Array<Reserva> = [];
  public isLoading = true;
  public hasError = false;
  public expandedReservas = new Set<string>();

  constructor(
    private readonly usuarioService: UsuarioService,
    private readonly router: Router,
    private readonly cdr: ChangeDetectorRef,
    private readonly reservaEstadoService: ReservaEstadoService
  ) {}

  ngOnInit(): void {
    this.getReservasUsuario();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private getReservasUsuario(): void {
    const email = this.usuarioService.getEmailFromLocalStorage();

    if (!email) {
      this.router.navigate(['/login']);
      return;
    }

    this.isLoading = true;
    this.hasError = false;
    this.cdr.markForCheck();

    this.usuarioService.getReservasUsuario(email)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => {
          this.isLoading = false;
          this.cdr.markForCheck();
        })
      )
      .subscribe({
        next: (response: Array<Reserva>) => {
          this.reservas = response || [];
          this.cdr.markForCheck();
        },
        error: (error) => {
          console.error('Error al cargar reservas:', error);
          this.hasError = true;
          this.reservas = [];
          this.cdr.markForCheck();
        }
      });
  }

  public toggleReserva(idReserva: number): void {
    const id = idReserva.toString();
    if (this.expandedReservas.has(id)) {
      this.expandedReservas.delete(id);
    } else {
      this.expandedReservas.add(id);
    }
    this.cdr.markForCheck();
  }

  public isExpanded(idReserva: number): boolean {
    return this.expandedReservas.has(idReserva.toString());
  }

  public goToCatalogo(): void {
    this.router.navigate(['/catalogo']);
  }

  public retryLoad(): void {
    this.getReservasUsuario();
  }

  public trackByReservaId(index: number, reserva: Reserva): number {
    return reserva.idReserva;
  }

  public get hasReservas(): boolean {
    return this.reservas.length > 0;
  }

  public formatDate(date: Date | string): string {
    return HelperDate.formatToLongDate(date);
  }

  public calculateDuration(fechaInicio: Date | string, fechaFin: Date | string): number {
    return HelperDate.calculateReservationDuration(fechaInicio, fechaFin);
  }

  /**
   * Métodos simplificados usando el servicio
   */
  public getEstadoReserva(reserva: Reserva): string {
    return this.reservaEstadoService.getEstado(reserva);
  }

  public getEstadoIcon(reserva: Reserva): string {
    return this.reservaEstadoService.getIcon(reserva);
  }

  public getEstadoText(reserva: Reserva): string {
    return this.reservaEstadoService.getText(reserva);
  }

  public getEstadoCssClass(reserva: Reserva): string {
    return this.reservaEstadoService.getCssClass(reserva);
  }
}
