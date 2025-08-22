import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { DetallesCocheComponent } from './components/detalles-coche/detalles-coche.component';
import { MenuMarcasComponent } from './pages/menu-marcas/menu-marcas.component';
import { loginGuard } from './guards/login.guard';
import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { ReservasComponent } from './components/reservas/reservas.component';
import { CatalogoComponent } from './components/catalogo/catalogo.component';
import { ProcesoReservaComponent } from './components/proceso-reserva/proceso-reserva.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { PerfilComponent } from './pages/perfil/perfil.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'marcas', component: MenuMarcasComponent },
  { path: 'detalles/:id', component: DetallesCocheComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'catalogo', component: CatalogoComponent },
  { path: 'catalogo/:marca', component: CatalogoComponent },
  {
    path: 'MisReservas',
    component: ReservasComponent,
    canActivate: [loginGuard],
  },
  {
    path: 'reservar',
    component: ProcesoReservaComponent,
    canActivate: [loginGuard],
  },
  {
    path: 'perfil',
    component: PerfilComponent,
    canActivate: [loginGuard],
  },
  { path: 'AboutUs', component: AboutUsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
