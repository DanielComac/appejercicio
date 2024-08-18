import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  public photos: string[] = [];
  public routines: any[] = [];

  constructor() { }

  public async addPhoto() {
    const photo = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100
    });
  
    if (photo.webPath) {
      this.photos.push(photo.webPath);
    } else {
      console.error('Error al tomar la foto: webPath no está definido');
    }
  }

  public addRoutine(routine: any) {
    this.routines.push(routine);
  }

  public getRoutines(id?: number) {
    if(id){
      return this.routines.find(r => r.id == id)
    }
    return this.routines;
  }

  public removeRoutine(routine: any) {
    this.routines = this.routines.filter(r => r !== routine);
  }
}
