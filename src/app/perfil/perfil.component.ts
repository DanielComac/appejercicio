import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { UsuarioService } from '../services/usuario.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular'; 

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
})
export class PerfilComponent implements OnInit {

  userProfile = {
    pictureUrl: '',
    name: '',
    email: '',
    bio: ''
  };

  hasInfoChanged = false
  photoEditable = true;

  constructor(
    private usuarioService: UsuarioService,
    private afAuth: AngularFireAuth,
    private router: Router,
    private alertController: AlertController 
  ) {}

  ngOnInit() {
    this.usuarioService.getUserProfile().subscribe(profile => {
      this.userProfile = profile;
    });
  }

  makePhotoEditable() {
    if (this.photoEditable) {
      this.takePhoto();
      return;
    }
    this.photoEditable = true;
  }

  makePhotoNotEditable() {
    this.photoEditable = false;
  }

  async takePhoto() {
    this.makePhotoNotEditable();
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Camera
      });
      //@ts-ignore
      this.usuarioService.updateUserProfile({ pictureUrl: image.dataUrl });
    } catch (error) {
      console.error(error);
    }
  }

  onBlur() {
    if (!this.hasInfoChanged) {
      this.hasInfoChanged = true;
    }
  }

  updateUser() {
    this.usuarioService.updateUserProfile(this.userProfile);
  }

  async showLogoutAlert() {
    const alert = await this.alertController.create({
      header: 'Cerrar sesión',
      message: '¿Estás seguro de que deseas cerrar sesión?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Cancelado');
          }
        },
        {
          text: 'Cerrar sesión',
          handler: async () => {
            try {
              await this.afAuth.signOut();
              this.router.navigate(['/login']);
            } catch (error) {
              console.error('Error al cerrar sesión', error);
            }
          }
        }
      ]
    });

    await alert.present();
  }

  logout() {
    this.showLogoutAlert();
  }
}
