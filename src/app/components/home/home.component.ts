import {
  ChangeDetectionStrategy,
  Component,
  NgZone,
  OnDestroy,
  OnInit,
  inject,
} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit, OnDestroy {
  private ngZone = inject(NgZone);
  private revealObserver?: IntersectionObserver;
  private scrollHandler?: () => void;

  ngOnInit(): void {
    this.initScrollAnimations();
  }

  ngOnDestroy(): void {
    if (this.revealObserver) this.revealObserver.disconnect();
    if (this.scrollHandler) {
      window.removeEventListener('scroll', this.scrollHandler);
    }
  }

  private initScrollAnimations(): void {
    const els = Array.from(document.querySelectorAll<HTMLElement>('.scroll-progress'));
    const hero = document.querySelector<HTMLElement>('.hero');
    
    if (!els.length && !hero) return;

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
          } else {
            el.classList.remove('visible');
          }
        }
      }, { threshold: 0.1, root: null, rootMargin: '0px 0px -15% 0px' });

      els.forEach(el => this.revealObserver!.observe(el));

      // Simple parallax for hero only
      if (hero) {
        let ticking = false;
        const onScroll = () => {
          if (!ticking) {
            ticking = true;
            requestAnimationFrame(() => {
              const scrollY = window.scrollY;
              const parallaxImg = scrollY * 0.5;
              const parallaxContent = scrollY * 0.3;
              hero.style.setProperty('--parallaxImg', `${parallaxImg}px`);
              hero.style.setProperty('--parallax', `${parallaxContent}px`);
              ticking = false;
            });
          }
        };

        this.scrollHandler = onScroll;
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
      }
    });
  }
}
