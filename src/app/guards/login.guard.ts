import { Inject } from '@angular/core';
import { Router } from '@angular/router';

export const loginGuard = () => {
  const router = Inject(Router);
  if (localStorage.getItem('usuario')) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
