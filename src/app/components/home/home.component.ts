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
  private scrollHandler?: () => void;

  ngOnInit(): void {
    this.initScrollAnimations();
  }

  ngOnDestroy(): void {
    if (this.scrollHandler) {
      window.removeEventListener('scroll', this.scrollHandler);
      window.removeEventListener('resize', this.scrollHandler);
      window.removeEventListener('orientationchange', this.scrollHandler);
      window.removeEventListener('load', this.scrollHandler);
    }
  }

  private initScrollAnimations() {
    const els = Array.from(
      document.querySelectorAll<HTMLElement>('.scroll-progress')
    );
    const hero = document.querySelector<HTMLElement>('.hero');
    if (!els.length && !hero) return;

    // Precompute dirs
    els.forEach((el) => {
      if (el.classList.contains('scroll-from-left')) el.dataset['dir'] = 'l';
      else if (el.classList.contains('scroll-from-right'))
        el.dataset['dir'] = 'r';
      else el.dataset['dir'] = 'b';
    });

    // Reduced motion: just show
    if (
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      els.forEach((el) => {
        el.style.opacity = '1';
        el.style.transform = 'translate3d(0,0,0)';
        el.classList.add('visible');
      });
      return;
    }

    let ticking = false;
    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
    const baseOffset = 160;

    const compute = () => {
      const winH = window.innerHeight;
      const center = winH / 2;

      // subtle hero parallax via CSS vars
      if (hero) {
        const r = hero.getBoundingClientRect();
        const hc = r.top + r.height / 2;
        let prog = 1 - Math.abs(center - hc) / (winH / 2);
        prog = Math.max(0, Math.min(1, prog));
        hero.style.setProperty('--parallaxImg', `${(1 - prog) * -16}px`);
        hero.style.setProperty('--parallax', `${(1 - prog) * 8}px`);
      }

      for (const el of els) {
        const rect = el.getBoundingClientRect();
        if (rect.top > winH * 1.5 || rect.bottom < -winH * 0.5) continue;
        // Trigger a bit earlier for brands wall to avoid visible offset when it's already in view
        const earlyFactor = el.closest?.('.brands-wall') ? 1.15 : 1.0;
        let p =
          1 -
          Math.abs(center - (rect.top + rect.height / 2)) /
            ((winH / 2) * (1 / earlyFactor));
        p = Math.max(0, Math.min(1, p));
        const eased = easeOutCubic(p);
        if (eased >= 0.95) {
          el.style.opacity = '1';
          el.style.transform = 'translate3d(0,0,0)';
          el.classList.add('visible');
          continue;
        }
        const dist = (1 - eased) * baseOffset;
        const dir = el.dataset['dir'];
        let tx = 0,
          ty = 0;
        if (dir === 'l') tx = -dist;
        else if (dir === 'r') tx = dist;
        else ty = dist;
        el.style.opacity = String(eased);
        el.style.transform = `translate3d(${tx}px,${ty}px,0)`;
      }
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(compute);
      }
    };

    this.ngZone.runOutsideAngular(() => {
      this.scrollHandler = onScroll;
      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('resize', onScroll);
      window.addEventListener('orientationchange', onScroll);
      window.addEventListener('load', onScroll);
      onScroll();
    });
  }
}
