import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Firestore, collection, addDoc, collectionData, doc, docData, setDoc, deleteDoc } from '@angular/fire/firestore';
import { map, Observable } from 'rxjs';
import { getDocs, query, where } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  public photos: string[] = [];
  public routines: any[] = [];

  constructor(private firestore: Firestore) { }

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
    const routineDoc = doc(this.firestore, `rutinas/${routine.id}`);
    return setDoc(routineDoc, routine);
  }

  //public getRoutines(id?: number) {
  //  const myCollection = collection(this.firestore, 'rutinas');
  //  console.log(collectionData(myCollection))
  //  if(id){
  //    return this.routines.find(r => r.id == id)
  //  }
  //  return this.routines;
  //}

  public getRoutines(): Observable<any[]> | any {
    const myCollection = collection(this.firestore, 'rutinas');
    console.log(collectionData(myCollection))
    return collectionData(myCollection);
  }

  public getRoutine(id: string): Observable<any> {
    // Get a reference to the specific document
    const routineDoc = doc(this.firestore, `rutinas/${id}`);
    // Return the observable of the document data
    return docData(routineDoc, { idField: 'id' });
  }

  public deleteRoutine(id: number): Promise<void> {
    const routineDoc = doc(this.firestore, `rutinas/${id}`);
    return deleteDoc(routineDoc)
      .then(() => {
        console.log(`Document with ID ${id} successfully deleted.`);
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
  }


  //public removeRoutine(routine: any) {
  //  this.routines = this.routines.filter(r => r !== routine);
  //}
}
