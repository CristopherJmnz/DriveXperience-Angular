import { Component, Input } from '@angular/core';

export interface DashboardStats {
  totalReservas: number;
  reservasActivas: number;
  reservasCompletadas: number;
  totalGastado: number;
}

@Component({
  selector: 'app-dashboard-stats',
  templateUrl: './dashboard-stats.component.html',
  styleUrls: ['./dashboard-stats.component.css']
})
export class DashboardStatsComponent {
  @Input() stats: DashboardStats = {
    totalReservas: 0,
    reservasActivas: 0,
    reservasCompletadas: 0,
    totalGastado: 0
  };
  @Input() isLoading: boolean = false;
}
