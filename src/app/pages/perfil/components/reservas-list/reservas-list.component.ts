import { Component, Input } from '@angular/core';
import { Reserva } from 'src/app/interfaces/reserva';

@Component({
  selector: 'app-reservas-list',
  templateUrl: './reservas-list.component.html',
  styleUrls: ['./reservas-list.component.css']
})
export class ReservasListComponent {
  @Input() reservas: Reserva[] = [];

  trackByReservaId(index: number, reserva: Reserva): number {
    return reserva.idReserva;
  }
}
