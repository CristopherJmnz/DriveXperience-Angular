import { Component, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/interfaces/usuario';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  @ViewChild('inputEmail') inputEmail!: ElementRef;
  @ViewChild('inputPassword') inputPassword!: ElementRef;

  constructor(
    private usuarioService: UsuarioService,
    private _router: Router
  ) {}

  iniciarSesion(): void {
    let user: Usuario = {
      email: this.inputEmail.nativeElement.value,
      password: this.inputPassword.nativeElement.value,
      apellidos: '',
      nombre: '',
      telefono: '',
      fechaNacimiento: new Date(),
      tarjetas: [],
    };

    this.usuarioService.login(user).subscribe((response) => {
      if (response) {
        localStorage.setItem('usuario', JSON.stringify(response));
        this._router.navigate(['/']);
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 2500,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          },
        });
        Toast.fire({
          icon: 'success',
          title: 'Sesión iniciada',
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Vaya...',
          text: 'Contraseña o email incorrectos',
        });
      }
    });
  }
}
