import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  public photos: string[] = [];
  public activities: any[] = [];  // Nuevo array para almacenar actividades

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
  

  // Método para agregar una actividad
  public addActivity(activity: any) {
    this.activities.push(activity);
  }

  // Método para eliminar una actividad
  public removeActivity(activity: any) {
    this.activities = this.activities.filter(a => a !== activity);
  }
}
