import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { PhotoService } from '../servicios/photo.service';

interface Exercise {
  id: string; 
  name: string;
  series: number | null;
  reps: number | null;
  imageUrl?: string;
}

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
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

    const newRoutine = {
      id: Date.now(),
      nombre: this.routine.name,
      img: this.routine.imageUrl || '',
      ejercicios: this.routine.exercises.map(exercise => ({
        id: exercise.id,
        name: exercise.name,
        series: exercise.series,
        repeticiones: exercise.reps,
        img: exercise.imageUrl || ''
      })),
      duracion: this.routine.duration,
      descanso: this.routine.restTime,
      numdia: this.routine.days,
      createdAt: new Date().toLocaleDateString(),
      createdby: 1
    };

    this.photoService.addRoutine(newRoutine); // Guardar rutina en el servicio
    this.showConfirmationAlert();
    this.resetForm();
  }

  async selectImageForRoutine() {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Photos
      });
      this.routine.imageUrl = image.dataUrl || '';
    } catch (error) {
      console.error('Error seleccionando imagen para la rutina', error);
    }
  }

  async selectImageForExercise(exercise: Exercise) {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Photos
      });
      exercise.imageUrl = image.dataUrl || '';
    } catch (error) {
      console.error('Error seleccionando imagen para el ejercicio', error);
    }
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
