import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-quick-actions',
  templateUrl: './quick-actions.component.html',
  styleUrls: ['./quick-actions.component.css']
})
export class QuickActionsComponent {
  @Output() reservasTabClick = new EventEmitter<void>();
  @Output() configTabClick = new EventEmitter<void>();

  onReservasClick(): void {
    this.reservasTabClick.emit();
  }

  onConfigClick(): void {
    this.configTabClick.emit();
  }
}
