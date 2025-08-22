import { Component, OnInit } from '@angular/core';
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

  constructor(
    private dataSharingService: DataSharingService,
    private usuarioService: UsuarioService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.formData = this.dataSharingService.getFormData();
    this.fechaInicial = this.formData.fechaInicio;
    this.fechaFinal = this.formData.fechaFin;
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
      if (response) {
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
}
