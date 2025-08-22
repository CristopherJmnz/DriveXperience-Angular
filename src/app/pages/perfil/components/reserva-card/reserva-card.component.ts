import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Reserva } from 'src/app/interfaces/reserva';
import { ReservaEstadoService, EstadoReservaInfo } from 'src/app/services/reserva-estado.service';

@Component({
  selector: 'app-reserva-card',
  templateUrl: './reserva-card.component.html',
  styleUrls: ['./reserva-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReservaCardComponent {
  @Input() reserva!: Reserva;

  constructor(private readonly reservaEstadoService: ReservaEstadoService) {}


  public get estadoInfo(): EstadoReservaInfo {
    return this.reservaEstadoService.useReservaEstado(this.reserva);
  }

  public get estadoReserva() {
    return this.estadoInfo.estado;
  }

  public get estadoClass(): string {
    return this.estadoInfo.cssClass;
  }

  public get estadoIcon(): string {
    return this.estadoInfo.icon;
  }

  public get estadoText(): string {
    return this.estadoInfo.text;
  }

  public get estadoDescription(): string {
    return this.estadoInfo.description;
  }

  public get diasReserva(): number {
    return this.reservaEstadoService.getDuration(this.reserva);
  }

  public get fechaInicioFormateada(): string {
    return this.reservaEstadoService.getFormattedStartDate(this.reserva);
  }

  public get fechaFinFormateada(): string {
    return this.reservaEstadoService.getFormattedEndDate(this.reserva);
  }

  public get esProxima(): boolean {
    return this.estadoInfo.esProxima;
  }

  public get terminaPronto(): boolean {
    return this.estadoInfo.terminaPronto;
  }
}
