import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { PhotoService } from '../servicios/photo.service';

interface Exercise {
  id: string; 
  name: string;
  descripcion: string;
  series: number | null;
  reps: number | null;
  imageUrl?: string;
}


@Component({
  selector: 'app-crear-rutina',
  templateUrl: './crear-rutina.component.html',
  styleUrls: ['./crear-rutina.component.scss'],
})
export class CrearRutinaComponent{
  routine = {
    name: '',
    description: '',
    duration: null,
    restTime: null,
    days: [],
    exercises: [] as Exercise[],
    imageUrl: ''
  };

  constructor(
    private alertController: AlertController,
    private navCtrl: NavController,
    private photoService: PhotoService
  ) {}

  generateId(): string {
    return `${Date.now()}`;
  }

  async addExercise() {
    const newExercise: Exercise = {
      id: this.generateId(),
      name: '',
      descripcion: '',
      series: null,
      reps: null
    };
    this.routine.exercises.push(newExercise);
  }

  removeExercise(index: number) {
    this.routine.exercises.splice(index, 1);
  }

  async createRoutine() {
    if (!this.routine.name || !this.routine.description || !this.routine.duration || !this.routine.restTime || this.routine.exercises.length === 0) {
      this.showAlert('Error', 'Por favor, completa todos los campos.');
      return;
    }

    const routineExercises = this.routine.exercises.map(exercise => ({
      id: exercise.id,
      nombre: exercise.name,
      descripcion: exercise.descripcion,
      series: exercise.series,
      repeticiones: exercise.reps,
      img: exercise.imageUrl || ''
    }))

    const incorrecExercises  = routineExercises.some(e => !e.nombre || !e.series || !e.repeticiones)
    
    if(incorrecExercises){
      this.showAlert('Error', 'Por favor otorga por lo menos el nombre, el número de series y el número repeticiones a cada ejercicio');
      return
    }

    const newRoutine = {
      id: Date.now(),
      nombre: this.routine.name,
      img: this.routine.imageUrl || '',
      ejercicios: routineExercises,
      duracion: this.routine.duration,
      descanso: this.routine.restTime,
      numdia: this.routine.days,
      createdAt: new Date().toLocaleDateString(),
      createdby: 1
    };

    console.log('Rutina creada:', newRoutine);
    this.photoService.addRoutine(newRoutine);
    this.showConfirmationAlert();
    this.resetForm();
  }

  async selectImageForRoutine() {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Camera
      });
      this.routine.imageUrl = image.dataUrl || '';
    } catch (error) {
      console.error('Error seleccionando imagen para la rutina', error);
    }
  }

  removeImageForRoutine(){
    this.routine.imageUrl = ''
  }

  async selectImageForExercise(exercise: Exercise) {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Camera
      });
      exercise.imageUrl = image.dataUrl || '';
    } catch (error) {
      console.error('Error seleccionando imagen para el ejercicio', error);
    }
  }
  removeImageForExercise(exercise: Exercise){
    exercise.imageUrl = ''
  }

  async showConfirmationAlert() {
    const alert = await this.alertController.create({
      header: 'Rutina Creada',
      message: 'Tu rutina ha sido creada exitosamente.',
      buttons: [
        {
          text: 'Ver',
          handler: () => {
            this.navCtrl.navigateRoot('/tabs/tab1');
          }
        },
        {
          text: 'Cerrar',
          role: 'cancel'
        }
      ]
    });
    await alert.present();
  }

  resetForm() {
    this.routine = {
      name: '',
      description: '',
      duration: null,
      restTime: null,
      days: [],
      exercises: [],
      imageUrl: ''
    };
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }
}
