import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  OnDestroy,
  NgZone,
  inject,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Coche } from 'src/app/interfaces/coche';
import { CocheService } from 'src/app/services/coche.service';
import { DataSharingService } from 'src/app/services/data-sharing.service';

@Component({
  selector: 'app-detalles-coche',
  templateUrl: './detalles-coche.component.html',
  styleUrls: ['./detalles-coche.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetallesCocheComponent implements OnInit, OnDestroy {
  private activatedRoute = inject(ActivatedRoute);
  private cdr = inject(ChangeDetectorRef);
  private ngZone = inject(NgZone);
  coche!: Coche;
  idcoche!: string | number;
  showModal: boolean = false;
  isLoading: boolean = true;
  private revealObserver?: IntersectionObserver;
  // Gallery images (passed to child component)
  galleryImages: string[] = [];
  arrayName: string[] = [];

  constructor(
    private router: Router,
    private cocheService: CocheService,
    private dataSharingService: DataSharingService
  ) {}

  ngOnInit(): void {
    this.idcoche = this.activatedRoute.snapshot.params['id'];
    this.findCoche(this.idcoche);
  }

  initializeScrollProgressAnimations(): void {
    const els = Array.from(document.querySelectorAll<HTMLElement>('.scroll-progress'));
    if (!els.length) return;

    // Reduced motion: reveal immediately
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      els.forEach(el => { el.classList.add('visible'); el.style.opacity = '1'; el.style.transform = 'translate3d(0,0,0)'; });
      return;
    }

    // Simple IntersectionObserver to toggle visibility once
    this.ngZone.runOutsideAngular(() => {
      this.revealObserver = new IntersectionObserver((entries) => {
        for (const entry of entries) {
          const el = entry.target as HTMLElement;
          if (entry.isIntersecting) {
            el.classList.add('visible');
          } else {
            el.classList.remove('visible');
          }
        }
      }, { threshold: 0.1, root: null, rootMargin: '0px 0px -15% 0px' });

      els.forEach(el => this.revealObserver!.observe(el));
    });
  }

  ngOnDestroy(): void {
  if (this.revealObserver) this.revealObserver.disconnect();
  }

  findCoche(id: string | number): void {
    this.isLoading = true;
    this.cocheService.findCoche(id).subscribe((response: Coche) => {
      this.coche = response;
      this.arrayName = response.nombreCoche.split(' ');
      // Build gallery images list (imagen5..imagen10 if present)
      const candidates = [
        (this.coche as any).imagen5,
        (this.coche as any).imagen6,
        (this.coche as any).imagen7,
        (this.coche as any).imagen8,
        (this.coche as any).imagen9,
        (this.coche as any).imagen10,
      ];
      this.galleryImages = candidates.filter((v) => !!v);
      setTimeout(() => {
        this.isLoading = false;
        this.cdr.detectChanges();
        this.initializeScrollProgressAnimations();
      }, 1000);
    });
  }

  handleModal(): void {
    this.showModal = !this.showModal;
  }

  onSubmit(
    form:
      | NgForm
      | {
          fechaInicio: string;
          fechaFin: string;
          precio?: number;
          idCoche?: number | string;
        }
  ) {
    const formData = (form as any).value ? (form as NgForm).value : form;
    this.dataSharingService.setFormData(formData);
    this.router.navigate(['/reservar']);
    this.showModal = false;
  }
}
