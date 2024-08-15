import { Component } from '@angular/core';
import { PhotoService } from '../servicios/photo.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  activity = {
    title: '',
    duration: null,
    calories: null,
    photo: ''
  };

  constructor(public photoService: PhotoService) {}

  async takePhoto() {
    await this.photoService.addPhoto();
    if (this.photoService.photos.length > 0) {
      this.activity.photo = this.photoService.photos[this.photoService.photos.length - 1];
    }
  }

  registerActivity() {
    if (!this.activity.title || !this.activity.duration) {
      console.error('Los campos título y duración son obligatorios.');
      return;
    }

    this.photoService.addActivity({
      title: this.activity.title,
      duration: this.activity.duration,
      calories: this.activity.calories,
      photo: this.activity.photo
    });

    console.log('Actividad registrada:', this.activity);
    this.resetForm();
  }

  resetForm() {
    this.activity = {
      title: '',
      duration: null,
      calories: null,
      photo: ''
    };

    this.photoService.photos = [];
  }

  get photos() {
    return this.photoService.photos;
  }
}
