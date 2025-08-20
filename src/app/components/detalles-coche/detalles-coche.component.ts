import {
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
})
export class DetallesCocheComponent implements OnInit, OnDestroy {
  private activatedRoute = inject(ActivatedRoute);
  private cdr = inject(ChangeDetectorRef);
  private ngZone = inject(NgZone);
  coche!: Coche;
  idcoche!: string | number;
  showModal: boolean = false;
  isLoading: boolean = true;
  private scrollHandler?: () => void;
  private resizeHandler?: () => void;
  private activeObserver?: IntersectionObserver;
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

  initializeObserver(): void {
    const fadeInRight = document.querySelectorAll('.fadeInRight');
    const fadeInUp = document.querySelectorAll('.fadeInUp');
    const fadeInLeft = document.querySelectorAll('.fadeInLeft');
    const fadeInDown = document.querySelectorAll('.fadeInDown');
    const elements = [
      ...Array.from(fadeInRight),
      ...Array.from(fadeInUp),
      ...Array.from(fadeInLeft),
      ...Array.from(fadeInDown),
    ];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    elements.forEach((el) => observer.observe(el));
  }
  initializeScrollProgressAnimations(): void {
    const elements = Array.from(
      document.querySelectorAll<HTMLElement>('.scroll-progress')
    );

    if (!elements.length) return;
    // Precompute direction once to avoid class lookups per frame
    elements.forEach((el) => {
      if (el.classList.contains('scroll-from-left')) el.dataset['dir'] = 'l';
      else if (el.classList.contains('scroll-from-right'))
        el.dataset['dir'] = 'r';
      else el.dataset['dir'] = 'b'; // bottom (default)
    });

    const baseOffset = 160; // px, smaller for less GPU work
    let ticking = false;

    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
    const lerp = (a: number, b: number, n: number) => a + (b - a) * n;

    // NOTE: Avoid IntersectionObserver gating here to prevent elements
    // from never activating due to initial CSS transforms on small screens.

    const compute = () => {
      const winH = window.innerHeight;
      const viewportCenter = winH / 2;

      // Parallax banner (subtle)
      const banner = document.querySelector<HTMLElement>('.banner');
      if (banner) {
        const br = banner.getBoundingClientRect();
        const bCenter = br.top + br.height / 2;
        let bProg = 1 - Math.abs(viewportCenter - bCenter) / (winH / 2);
        bProg = Math.max(0, Math.min(1, bProg));
        const parYImg = (1 - bProg) * -20; // up a bit
        const parYOverlay = (1 - bProg) * 10; // down a bit
        banner.style.setProperty('--parallaxImg', `${parYImg}px`);
        banner.style.setProperty('--parallax', `${parYOverlay}px`);
      }

      for (const el of elements) {
        const rect = el.getBoundingClientRect();
        // Skip far-away elements to keep work small
        if (rect.top > winH * 1.5 || rect.bottom < -winH * 0.5) {
          continue;
        }
        const elementCenter = rect.top + rect.height / 2;
        let progress =
          1 - Math.abs(viewportCenter - elementCenter) / (winH / 2);
        progress = Math.max(0, Math.min(1, progress));
        const eased = easeOutCubic(progress);

        const lastP = parseFloat(el.dataset['p'] || '0');
        const smoothed = lerp(lastP, eased, 0.2);
        el.dataset['p'] = smoothed.toFixed(4);

        const dir = el.dataset['dir'];
        const locked = el.dataset['locked'] === 'true';

        // Lock when near center
        if (eased >= 0.92) {
          el.style.opacity = '1';
          el.style.transform = 'translate3d(0,0,0)';
          el.classList.add('visible');
          el.dataset['locked'] = 'true';
        } else {
          // Unlock only if element left viewport (to re-animate on return)
          if (rect.bottom <= 0 || rect.top >= winH) {
            el.classList.remove('visible');
            el.dataset['locked'] = 'false';
          }

          if (!(locked && rect.bottom > 0 && rect.top < winH)) {
            // Progressive transform (transform + opacity only for perf)
            const distance = (1 - smoothed) * baseOffset;
            let tx = 0,
              ty = 0;
            if (dir === 'l') tx = -distance;
            else if (dir === 'r') tx = distance;
            else ty = distance; // bottom
            el.style.transform = `translate3d(${tx}px, ${ty}px, 0)`;
            el.style.opacity = String(smoothed);
          } else {
            // Keep locked visual while within viewport
            el.style.opacity = '1';
            el.style.transform = 'translate3d(0,0,0)';
            el.classList.add('visible');
          }
        }
      }
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(compute);
        ticking = true;
      }
    };

    // Run listeners outside Angular to avoid triggering change detection
    this.ngZone.runOutsideAngular(() => {
      this.scrollHandler = onScroll;
      this.resizeHandler = onScroll;
      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('resize', onScroll);
      window.addEventListener('orientationchange', onScroll);
      window.addEventListener('load', onScroll);
      // initial run
      onScroll();
    });
  }

  ngOnDestroy(): void {
    if (this.scrollHandler) {
      window.removeEventListener('scroll', this.scrollHandler);
    }
    if (this.resizeHandler) {
      window.removeEventListener('resize', this.resizeHandler);
    }
    if (this.scrollHandler) {
      window.removeEventListener('orientationchange', this.scrollHandler);
      window.removeEventListener('load', this.scrollHandler);
    }
    if (this.activeObserver) {
      this.activeObserver.disconnect();
    }
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
        this.initializeObserver();
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
