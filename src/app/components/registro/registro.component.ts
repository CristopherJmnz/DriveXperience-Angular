import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/interfaces/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
})
export class RegistroComponent {

  constructor(
    private usuarioService: UsuarioService,
    private _router: Router
  ) {}

  registro(form: NgForm): void {
    const formData = form.value;
    let user:Usuario={
      apellidos:formData.apellidos,
      nombre:formData.nombre,
      email:formData.email,
      password:formData.password,
      fechaNacimiento:formData.fecha,
      telefono:formData.telefono,
      tarjetas:[]
    };
    this.usuarioService.registarUser(user).subscribe(response=>{
      console.log(response==1);
      if (response==1) {
        this._router.navigate(['/login']);
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
          title: 'Registrado correctamente',
        });
      }else{
        Swal.fire({
          icon: "error",
          title: "Ups...",
          text: "Algo salio mal prueba a intentarlo más tarde"
        });
      }
    })
  }
}
