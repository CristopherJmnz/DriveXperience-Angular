import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';

@Component({
  selector: 'app-dx-button',
  templateUrl: './dx-button.component.html',
  styleUrls: ['./dx-button.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DxButtonComponent {
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() variant: 'primary' | 'secondary' | 'ghost' = 'primary';
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
  @Input() disabled: boolean = false;
  @Input() loading: boolean = false;
  @Input() fullWidth: boolean = false;
  @Input() icon: string = '';

  @Output() clicked = new EventEmitter<Event>();

  onClick(event: Event): void {
    if (!this.disabled && !this.loading) {
      this.clicked.emit(event);
    }
  }

  get buttonClasses(): string[] {
    const classes = ['dx-button', `dx-button--${this.variant}`, `dx-button--${this.size}`];

    if (this.disabled) classes.push('dx-button--disabled');
    if (this.loading) classes.push('dx-button--loading');
    if (this.fullWidth) classes.push('dx-button--full-width');
    if (this.icon) classes.push('dx-button--with-icon');

    return classes;
  }
}
