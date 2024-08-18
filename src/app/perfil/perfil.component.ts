import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
})
export class PerfilComponent  implements OnInit {

  userProfile = {
    pictureUrl: '',
    name: '',
    email: '',
    bio: ''
  };

  hasInfoChanged = false
  photoEditable = true;

  makePhotoEditable(){
    if(this.photoEditable){
      this.takePhoto()
      return
    }
    this.photoEditable = true
  } 
  makePhotoNotEditable(){
    this.photoEditable = false
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
      console.error(error)
    }
  }


  constructor(private usuarioService: UsuarioService) { }

  ngOnInit() {
    this.usuarioService.getUserProfile().subscribe(profile => {
      this.userProfile = profile;
    });
  }
  onBlur() {
    if(!this.hasInfoChanged){
      this.hasInfoChanged = true
    }
  }
  updateUser(){
    this.usuarioService.updateUserProfile(this.userProfile)
  }
}
