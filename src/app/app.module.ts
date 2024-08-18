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

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent, RutinaComponent, CrearRutinaComponent, PerfilComponent],
  imports: [
    BrowserModule, IonicModule.forRoot(), AppRoutingModule, FormsModule, AngularFireModule.initializeApp(environment.firebaseConfig), AngularFireAuthModule 
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    PhotoService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
