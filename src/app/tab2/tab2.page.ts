import { Component } from '@angular/core';
import { PhotoService } from '../servicios/photo.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  activities: any[] = [];

  constructor(public photoService: PhotoService) {}

  ionViewWillEnter() {
    this.loadActivities();
  }

  loadActivities() {
    this.activities = this.photoService.activities;
  }

  editActivity(activity: any) {
    console.log('Editar actividad:', activity);
  }

  deleteActivity(activity: any) {
    console.log('Eliminar actividad:', activity);
    this.photoService.removeActivity(activity);
    this.loadActivities();
  }
}
