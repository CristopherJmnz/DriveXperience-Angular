import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { DetallesCocheComponent } from './components/detalles-coche/detalles-coche.component';
import { MenuMarcasComponent } from './pages/menu-marcas/menu-marcas.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { CatalogoComponent } from './components/catalogo/catalogo.component';
import { ProcesoReservaComponent } from './components/proceso-reserva/proceso-reserva.component';
import { CochesCardsComponent } from './components/catalogo/components/coches-cards/coches-cards.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { LoaderComponent } from './components/loader/loader.component';
import { SkeletonCocheCardComponent } from './components/skeleton-coche-card/skeleton-coche-card.component';
import { DetallesCocheGalleryComponent } from './components/detalles-coche/components/gallery/gallery.component';
import { DetallesCocheReservaModalComponent } from './components/detalles-coche/components/reserva-modal/reserva-modal.component';
import { DxFormFieldComponent } from './components/shared/dx-form-field/dx-form-field.component';
import { DxButtonComponent } from './components/shared/dx-button/dx-button.component';
import { DxAuthFormComponent } from './components/shared/dx-auth-form/dx-auth-form.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { ReservaCardComponent } from './pages/perfil/components/reserva-card/reserva-card.component';
import { ProfileHeaderComponent } from './pages/perfil/components/profile-header/profile-header.component';
import { TabNavigationComponent } from './pages/perfil/components/tab-navigation/tab-navigation.component';
import { DashboardStatsComponent } from './pages/perfil/components/dashboard-stats/dashboard-stats.component';
import { QuickActionsComponent } from './pages/perfil/components/quick-actions/quick-actions.component';
import { ReservasListComponent } from './pages/perfil/components/reservas-list/reservas-list.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    DetallesCocheComponent,
    DetallesCocheGalleryComponent,
    DetallesCocheReservaModalComponent,
    MenuMarcasComponent,
    LoginComponent,
    RegistroComponent,
    CatalogoComponent,
    ProcesoReservaComponent,
    CochesCardsComponent,
    AboutUsComponent,
    LoaderComponent,
    SkeletonCocheCardComponent,
    DxFormFieldComponent,
    DxButtonComponent,
    DxAuthFormComponent,
    PerfilComponent,
    ReservaCardComponent,
    ProfileHeaderComponent,
    TabNavigationComponent,
    DashboardStatsComponent,
    QuickActionsComponent,
    ReservasListComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
