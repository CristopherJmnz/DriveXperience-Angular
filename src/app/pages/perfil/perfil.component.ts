import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ReservaEstadoService } from 'src/app/services/reserva-estado.service';
import { Usuario } from 'src/app/interfaces/usuario';
import { Reserva } from 'src/app/interfaces/reserva';

export interface DashboardStats {
  totalReservas: number;
  reservasActivas: number;
  reservasCompletadas: number;
  totalGastado: number;
}

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PerfilComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject<void>();

  public userProfile!: Usuario;
  public dashboardStats: DashboardStats = {
    totalReservas: 0,
    reservasActivas: 0,
    reservasCompletadas: 0,
    totalGastado: 0,
  };
  public reservas: Reserva[] = [];

  public isLoading = true;
  public activeTab: 'dashboard' | 'reservas' | 'configuracion' = 'dashboard';

  constructor(
    private readonly router: Router,
    private readonly cdr: ChangeDetectorRef,
    private readonly usuarioService: UsuarioService,
    private readonly reservaEstadoService: ReservaEstadoService
  ) {}

  ngOnInit(): void {
    this.loadUserProfile();
    this.loadReservasData();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadUserProfile(): void {
    const userData = localStorage.getItem('usuario');
    if (userData) {
      this.userProfile = JSON.parse(userData);
    }
  }

  private loadReservasData(): void {
    if (!this.userProfile?.email) {
      console.warn('No se encontró email del usuario en perfil');
      this.isLoading = false;
      this.cdr.markForCheck();
      return;
    }

    this.usuarioService
      .getReservasUsuario(this.userProfile.email)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (reservas) => {
          // Ordenar las reservas por prioridad de estado y luego alfabéticamente
          this.reservas = this.reservaEstadoService.sortReservasByPriority(reservas);
          this.updateDashboardStats();
          this.isLoading = false;
          this.cdr.markForCheck();
        },
        error: (error) => {
          console.error('Error al cargar reservas:', error);
          this.reservas = [];
          this.updateDashboardStats();
          this.isLoading = false;
          this.cdr.markForCheck();
        }
      });
  }

  private updateDashboardStats(): void {
    if (this.reservas.length > 0) {
      const stats = this.reservaEstadoService.getEstadisticas(this.reservas);

      this.dashboardStats = {
        totalReservas: stats.total,
        reservasActivas: stats.activas,
        reservasCompletadas: stats.completadas,
        totalGastado: this.reservas.reduce((total, reserva) => total + (reserva.precioTotal || 0), 0),
      };
    } else {
      this.dashboardStats = {
        totalReservas: 0,
        reservasActivas: 0,
        reservasCompletadas: 0,
        totalGastado: 0,
      };
    }
  }

  public setActiveTab(tab: 'dashboard' | 'reservas' | 'configuracion'): void {
    this.activeTab = tab;
    this.cdr.markForCheck();
  }

  public logout(): void {
    this.usuarioService.logout();
    this.router.navigate(['/login']);
  }

  public editProfile(): void {
    this.setActiveTab('configuracion');
  }

  public get userInitials(): string {
    if (!this.userProfile) return 'U';
    return `${this.userProfile.nombre.charAt(
      0
    )}${this.userProfile.apellidos.charAt(0)}`.toUpperCase();
  }

  public trackByReservaId(index: number, reserva: Reserva): number {
    return reserva.idReserva;
  }
}
