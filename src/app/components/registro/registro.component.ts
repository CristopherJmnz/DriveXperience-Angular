import { Component, ChangeDetectionStrategy, ChangeDetectorRef, OnInit, OnDestroy, NgZone } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/interfaces/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

interface RegistroFormData {
  nombre: string;
  apellidos: string;
  email: string;
  password: string;
  fechaNacimiento: string;
  acceptTerms: boolean;
}

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistroComponent implements OnInit, OnDestroy {
  formData: RegistroFormData = {
    nombre: '',
    apellidos: '',
    email: '',
    password: '',
    fechaNacimiento: '',
    acceptTerms: false,
  };

  isLoading: boolean = false;
  private revealObserver?: IntersectionObserver;

  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private ngZone: NgZone
  ) {}

  ngOnInit(): void {
    this.initScrollAnimations();
  }

  ngOnDestroy(): void {
    if (this.revealObserver) this.revealObserver.disconnect();
  }

  private initScrollAnimations(): void {
    const els = Array.from(document.querySelectorAll<HTMLElement>('.scroll-progress'));
    if (!els.length) return;

    // Reduced motion: reveal immediately
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      els.forEach(el => {
        el.classList.add('visible');
        el.style.opacity = '1';
        el.style.transform = 'translate3d(0,0,0)';
      });
      return;
    }

    // Simple IntersectionObserver to toggle visibility once
    this.ngZone.runOutsideAngular(() => {
      this.revealObserver = new IntersectionObserver((entries) => {
        for (const entry of entries) {
          const el = entry.target as HTMLElement;
          if (entry.isIntersecting) {
            el.classList.add('visible');
          }
        }
      }, { threshold: 0.1, root: null, rootMargin: '0px 0px -10% 0px' });

      els.forEach(el => this.revealObserver!.observe(el));
    });
  }

  getNombreError(field: any): string {
    if (!field.touched || !field.dirty || field.valid) {
      return '';
    }

    if (field.errors?.['required']) {
      return 'El nombre es obligatorio';
    }

    if (field.errors?.['minlength']) {
      return 'El nombre debe tener al menos 2 caracteres';
    }

    return '';
  }

  getApellidosError(field: any): string {
    if (!field.touched || !field.dirty || field.valid) {
      return '';
    }

    if (field.errors?.['required']) {
      return 'Los apellidos son obligatorios';
    }

    if (field.errors?.['minlength']) {
      return 'Los apellidos deben tener al menos 2 caracteres';
    }

    return '';
  }

  getEmailError(field: any): string {
    if (!field.touched || !field.dirty || field.valid) {
      return '';
    }

    if (field.errors?.['required']) {
      return 'El email es obligatorio';
    }

    if (field.errors?.['email']) {
      return 'Por favor ingresa un email válido';
    }

    return '';
  }

  getPasswordError(field: any): string {
    if (!field.touched || !field.dirty || field.valid) {
      return '';
    }

    if (field.errors?.['required']) {
      return 'La contraseña es obligatoria';
    }

    if (field.errors?.['minlength']) {
      return 'La contraseña debe tener al menos 6 caracteres';
    }

    return '';
  }

  getFechaError(field: any): string {
    if (!field.touched || !field.dirty || field.valid) {
      return '';
    }

    if (field.errors?.['required']) {
      return 'La fecha de nacimiento es obligatoria';
    }

    return '';
  }

  registro(form: NgForm): void {
    if (form.invalid || !this.formData.acceptTerms) {
      return;
    }

    this.isLoading = true;
    this.cdr.detectChanges();

    const user: Usuario = {
      apellidos: this.formData.apellidos,
      nombre: this.formData.nombre,
      email: this.formData.email,
      password: this.formData.password,
      fechaNacimiento: new Date(this.formData.fechaNacimiento),
      telefono: '',
      tarjetas: []
    };

    this.usuarioService.registarUser(user).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.cdr.detectChanges();

        if (response == 1) {
          this.router.navigate(['/login']);

          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
            },
          });

          Toast.fire({
            icon: 'success',
            title: 'Registro completado exitosamente',
            text: 'Ya puedes iniciar sesión con tu nueva cuenta'
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error en el registro',
            text: 'El email ya está registrado o ha ocurrido un error',
            confirmButtonColor: '#d10000',
          });
        }
      },
      error: () => {
        this.isLoading = false;
        this.cdr.detectChanges();

        Swal.fire({
          icon: 'error',
          title: 'Error del servidor',
          text: 'No se pudo conectar con el servidor. Inténtalo más tarde.',
          confirmButtonColor: '#d10000',
        });
      }
    });
  }
}
