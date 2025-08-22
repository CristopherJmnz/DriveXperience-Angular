import { Component, ChangeDetectionStrategy, ChangeDetectorRef, OnInit, OnDestroy, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/interfaces/usuario';
import Swal from 'sweetalert2';

interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit, OnDestroy {
  formData: LoginFormData = {
    email: '',
    password: '',
    rememberMe: false,
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

  iniciarSesion(): void {
    if (!this.formData.email || !this.formData.password) {
      return;
    }

    this.isLoading = true;
    this.cdr.detectChanges();

    const user: Usuario = {
      email: this.formData.email,
      password: this.formData.password,
      apellidos: '',
      nombre: '',
      telefono: '',
      fechaNacimiento: new Date(),
      tarjetas: [],
    };

    this.usuarioService.login(user).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.cdr.detectChanges();

        if (response) {
          localStorage.setItem('usuario', JSON.stringify(response));
          this.router.navigate(['/']);

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
            title: 'Sesión iniciada correctamente',
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error de autenticación',
            text: 'Email o contraseña incorrectos',
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
