import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ChangeDetectionStrategy,
  ElementRef,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-dx-reserva-modal',
  templateUrl: './reserva-modal.component.html',
  styleUrls: ['./reserva-modal.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetallesCocheReservaModalComponent
  implements OnInit, OnChanges, OnDestroy
{
  @Input() open = false;
  @Input() carName = '';
  @Input() pricePerDay?: number;
  @Input() idCoche?: number | string;

  @Output() close = new EventEmitter<void>();
  @Output() submitForm = new EventEmitter<{
    fechaInicio: string;
    fechaFin: string;
    precio?: number;
    idCoche?: number | string;
  }>();

  @ViewChild('fechaInicio') fechaInicioEl?: ElementRef<HTMLInputElement>;

  private lastFocused?: HTMLElement | null;
  private touchStartY = 0;
  private currentTranslateY = 0;
  private isDragging = false;

  constructor(private host: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    this.syncBodyScroll();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['open']) {
      this.syncBodyScroll();
      if (this.open) {
        // Save last focus and move focus into modal
        this.lastFocused = document.activeElement as HTMLElement;
        setTimeout(() => {
          this.fechaInicioEl?.nativeElement?.focus();
        }, 0);
      } else {
        // Restore focus
        this.lastFocused?.focus?.();
      }
    }
  }

  ngOnDestroy(): void {
    this.unlockBodyScroll();
  }

  onBackdropClick(e: MouseEvent) {
    // Close when clicking backdrop
    if ((e.target as HTMLElement).classList.contains('dx-modal__backdrop')) {
      this.handleClose();
    }
  }

  handleClose() {
    this.unlockBodyScroll();
    this.close.emit();
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      const { fechaInicio, fechaFin } = form.value;
      this.submitForm.emit({
        fechaInicio,
        fechaFin,
        precio: this.pricePerDay,
        idCoche: this.idCoche,
      });
    }
  }

  // Focus management: Close on Escape
  @HostListener('document:keydown', ['$event'])
  onKeydown(ev: KeyboardEvent) {
    if (!this.open) return;
    if (ev.key === 'Escape') {
      ev.preventDefault();
      this.handleClose();
    }
    // Basic focus trap for Tab
    if (ev.key === 'Tab') {
      const focusable = this.getFocusableElements();
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement as HTMLElement;
      if (ev.shiftKey && active === first) {
        ev.preventDefault();
        last.focus();
      } else if (!ev.shiftKey && active === last) {
        ev.preventDefault();
        first.focus();
      }
    }
  }

  private getFocusableElements(): HTMLElement[] {
    const root: HTMLElement = this.host.nativeElement;
    return Array.from(
      root.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
    ).filter((el) => !el.hasAttribute('disabled'));
  }

  // Simple swipe-to-close for mobile
  onTouchStart(e: TouchEvent) {
    this.isDragging = true;
    this.touchStartY = e.touches[0].clientY;
    this.currentTranslateY = 0;
    this.renderer.setStyle(
      this.host.nativeElement.querySelector('.dx-sheet'),
      'transition',
      'none'
    );
  }

  onTouchMove(e: TouchEvent) {
    if (!this.isDragging) return;
    const delta = e.touches[0].clientY - this.touchStartY;
    this.currentTranslateY = Math.max(0, delta);
    this.renderer.setStyle(
      this.host.nativeElement.querySelector('.dx-sheet'),
      'transform',
      `translate3d(0, ${this.currentTranslateY}px, 0)`
    );
  }

  onTouchEnd() {
    if (!this.isDragging) return;
    this.isDragging = false;
    const sheet = this.host.nativeElement.querySelector('.dx-sheet');
    this.renderer.removeStyle(sheet, 'transition');
    if (this.currentTranslateY > 100) {
      // Close
      this.handleClose();
    } else {
      // Snap back
      this.renderer.setStyle(
        sheet,
        'transition',
        'transform 280ms cubic-bezier(0.22, 1, 0.36, 1)'
      );
      this.renderer.setStyle(sheet, 'transform', 'translate3d(0, 0, 0)');
    }
    this.currentTranslateY = 0;
  }

  private syncBodyScroll() {
    if (this.open) this.lockBodyScroll();
    else this.unlockBodyScroll();
  }

  private lockBodyScroll() {
    this.renderer.setStyle(document.body, 'overflow', 'hidden');
  }

  private unlockBodyScroll() {
    this.renderer.removeStyle(document.body, 'overflow');
  }
}
