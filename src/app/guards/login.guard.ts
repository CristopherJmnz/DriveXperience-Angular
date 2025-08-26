import { inject } from '@angular/core';
import {
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';

export const loginGuard = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const router = inject(Router);
  if (localStorage.getItem('usuario')) {
    return true;
  } else {
    const targetUrl = state.url;
    localStorage.setItem('redirectUrl', targetUrl);
    router.navigate(['/login']);
    return false;
  }
};
