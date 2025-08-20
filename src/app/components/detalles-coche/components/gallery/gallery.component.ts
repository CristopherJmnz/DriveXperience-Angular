import { Component, Input, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-dx-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css'],
})
export class DetallesCocheGalleryComponent implements OnDestroy {
  @Input() images: string[] = [];
  @Input() carName = '';

  lightboxOpen = false;
  lightboxIndex = 0;
  private keydownHandler?: (e: KeyboardEvent) => void;
  private touchStartX = 0;

  openLightbox(index: number) {
    if (!this.images.length) return;
    this.lightboxIndex = Math.max(0, Math.min(index, this.images.length - 1));
    this.lightboxOpen = true;
    document.body.style.overflow = 'hidden';
    this.keydownHandler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') this.closeLightbox();
      else if (e.key === 'ArrowRight') this.nextImage();
      else if (e.key === 'ArrowLeft') this.prevImage();
    };
    window.addEventListener('keydown', this.keydownHandler);
  }

  closeLightbox() {
    this.lightboxOpen = false;
    document.body.style.overflow = '';
    if (this.keydownHandler) {
      window.removeEventListener('keydown', this.keydownHandler);
      this.keydownHandler = undefined;
    }
  }

  nextImage() {
    if (!this.images.length) return;
    this.lightboxIndex = (this.lightboxIndex + 1) % this.images.length;
  }

  prevImage() {
    if (!this.images.length) return;
    this.lightboxIndex = (this.lightboxIndex - 1 + this.images.length) % this.images.length;
  }

  onLightboxBackdrop(ev: MouseEvent) {
    if (ev.target === ev.currentTarget) this.closeLightbox();
  }

  onTouchStart(ev: TouchEvent) {
    if (ev.touches && ev.touches.length) this.touchStartX = ev.touches[0].clientX;
  }

  onTouchEnd(ev: TouchEvent) {
    const touch = ev.changedTouches && ev.changedTouches[0];
    if (!touch) return;
    const dx = touch.clientX - this.touchStartX;
    const threshold = 40;
    if (dx > threshold) this.prevImage();
    else if (dx < -threshold) this.nextImage();
  }

  ngOnDestroy(): void {
    if (this.keydownHandler) window.removeEventListener('keydown', this.keydownHandler);
    document.body.style.overflow = '';
  }
}
