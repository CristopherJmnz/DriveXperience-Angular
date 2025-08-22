import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Usuario } from 'src/app/interfaces/usuario';

@Component({
  selector: 'app-profile-header',
  templateUrl: './profile-header.component.html',
  styleUrls: ['./profile-header.component.css']
})
export class ProfileHeaderComponent {
  @Input() userProfile: Usuario | null = null;
  @Input() userInitials: string = '';

  @Output() editProfileClick = new EventEmitter<void>();
  @Output() logoutClick = new EventEmitter<void>();

  onEditProfile(): void {
    this.editProfileClick.emit();
  }

  onLogout(): void {
    this.logoutClick.emit();
  }
}
