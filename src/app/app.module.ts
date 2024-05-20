import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { DetallesCocheComponent } from './components/detalles-coche/detalles-coche.component';
import { MenuMarcasComponent } from './components/menu-marcas/menu-marcas.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { ReservasComponent } from './components/reservas/reservas.component';
import { CatalogoComponent } from './components/catalogo/catalogo.component';
import { ProcesoReservaComponent } from './components/proceso-reserva/proceso-reserva.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    DetallesCocheComponent,
    MenuMarcasComponent,
    LoginComponent,
    RegistroComponent,
    ReservasComponent,
    CatalogoComponent,
    ProcesoReservaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
