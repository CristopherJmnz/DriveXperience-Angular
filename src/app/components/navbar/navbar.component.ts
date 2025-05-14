import {
  Component,
  ElementRef,
  HostListener,
  Inject,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  @ViewChild('menuCheckbox') menuCheckbox!: ElementRef<HTMLInputElement>;
  @ViewChild('menu', { static: false }) menu!: ElementRef;
  constructor(public usuarioService: UsuarioService, private router: Router) {}

  logout() {
    this.usuarioService.logout();
    Swal.fire({
      position: 'center',
      icon: 'info',
      title: 'Has cerrado sesión',
      showConfirmButton: false,
      timer: 1500,
    });
    this.router.navigate(['/login']);
  }

  closeMenu(menuCheckbox: HTMLInputElement) {
    menuCheckbox.checked = false;
  }

  @HostListener('document:mousedown', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const menuEl = this.menuCheckbox?.nativeElement;
    const target = event.target as HTMLElement;

    // Si el menú está abierto y el clic es fuera del menú, del botón hamburguesa y del checkbox, ciérralo
    if (
      menuEl &&
      menuEl.checked &&
      !target.closest('.menu') &&
      !target.closest('.checkbtn') &&
      target !== menuEl
    ) {
      menuEl.checked = false;
    }
  }
}
