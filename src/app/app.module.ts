import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { PhotoService } from './servicios/photo.service'; 

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RutinaComponent } from './rutina/rutina.component';
import { FormsModule } from '@angular/forms';
import { CrearRutinaComponent } from './crear-rutina/crear-rutina.component';
import { PerfilComponent } from './perfil/perfil.component';

@NgModule({
  declarations: [AppComponent, RutinaComponent, CrearRutinaComponent, PerfilComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, FormsModule],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    PhotoService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
