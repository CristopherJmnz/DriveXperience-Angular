import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(public usuarioService: UsuarioService, private router: Router) {}

  logout() {
    this.usuarioService.logout();
    Swal.fire({
      position: "center",
      icon: "info",
      title: "Has cerrado sesión",
      showConfirmButton: false,
      timer: 1500
    });
    this.router.navigate(['/login']);
  }

  closeMenu(menuCheckbox: HTMLInputElement) {
    menuCheckbox.checked = false;
  }
}
