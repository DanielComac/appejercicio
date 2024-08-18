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
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';

@NgModule({
  declarations: [
    AppComponent, RutinaComponent, CrearRutinaComponent, PerfilComponent],
  imports: [
    BrowserModule, IonicModule.forRoot(), AppRoutingModule, FormsModule, AngularFireModule.initializeApp(environment.firebaseConfig), AngularFireAuthModule 
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    PhotoService,
    provideFirebaseApp(() => initializeApp({"projectId":"routinetracker2","appId":"1:234081969809:web:0892bc733cea56cbb7c130","storageBucket":"routinetracker2.appspot.com","apiKey":"AIzaSyDlqENOqIMpMsBrg1rHF9waBM9lqXsphpk","authDomain":"routinetracker2.firebaseapp.com","messagingSenderId":"234081969809"})),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage())
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
