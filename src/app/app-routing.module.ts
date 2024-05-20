import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { DetallesCocheComponent } from './components/detalles-coche/detalles-coche.component';
import { MenuMarcasComponent } from './components/menu-marcas/menu-marcas.component';
import { loginGuard } from './guards/login.guard';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { ReservasComponent } from './components/reservas/reservas.component';
import { CatalogoComponent } from './components/catalogo/catalogo.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'marcas', component: MenuMarcasComponent },
  { path: 'detalles/:id', component: DetallesCocheComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component:RegistroComponent },
  { path: 'catalogo', component:CatalogoComponent },
  { path: 'reservas', component: ReservasComponent, canActivate:[loginGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
