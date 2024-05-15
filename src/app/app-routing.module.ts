import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { DetallesCocheComponent } from './components/detalles-coche/detalles-coche.component';
import { MenuMarcasComponent } from './components/menu-marcas/menu-marcas.component';
import { loginGuard } from './guards/login.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'marcas', component: MenuMarcasComponent },
  { path: 'detalles/:id', component: DetallesCocheComponent },
  // { path: 'reservas', component: ReservasComponent, canActivate:[loginGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
