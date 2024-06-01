import { Component, OnInit } from '@angular/core';
import { Reserva } from 'src/app/interfaces/reserva';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.component.html',
  styleUrls: ['./reservas.component.css'],
})
export class ReservasComponent implements OnInit {
  reservas!: Array<Reserva>;
  constructor(private usuarioService: UsuarioService) {}
  ngOnInit(): void {
    this.getReservasUsuario();
  }

  getReservasUsuario() {
    let email = this.usuarioService.getEmailFromLocalStorage();
    this.usuarioService
      .getReservasUsuario(email)
      .subscribe((response: Array<Reserva>) => {
        this.reservas = response;
      });
  }

  desplegar(id: string) {
    var x = document.getElementById(id)!;
    if (x.className.indexOf('w3-show') == -1) {
      x.className += ' w3-show';
    } else {
      x.className = x.className.replace(' w3-show', '');
    }
  }
}
