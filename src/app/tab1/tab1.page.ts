//@ts-nocheck
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PhotoService } from '../servicios/photo.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  routines: any[] = [];
  //const routine = {
  //  id: Date.now(), // Unique ID for the routine, based on the current timestamp
  //  nombre: 'Full Body Workout', // Name of the routine
  //  img: '', // Image URL for the routine
  //  ejercicios: [
  //    {
  //      id: '1', // Unique ID for the exercise
  //      nombre: 'Push-Ups', // Name of the exercise
  //      descripcion: 'An exercise to strengthen the upper body.', // Description of the exercise
  //      series: 3, // Number of series
  //      repeticiones: 15, // Number of repetitions per series
  //      img: 'https://via.placeholder.com/100' // Image URL for the exercise
  //    },
  //    {
  //      id: '2', // Unique ID for the exercise
  //      nombre: 'Squats', // Name of the exercise
  //      descripcion: 'An exercise to strengthen the lower body.', // Description of the exercise
  //      series: 4, // Number of series
  //      repeticiones: 12, // Number of repetitions per series
  //      img: 'https://via.placeholder.com/100' // Image URL for the exercise
  //    },
  //    {
  //      id: '3', // Unique ID for the exercise
  //      nombre: 'Plank', // Name of the exercise
  //      descripcion: 'An exercise to strengthen the core.', // Description of the exercise
  //      series: 3, // Number of series
  //      repeticiones: 30, // Duration in seconds, treated as repetitions
  //      img: 'https://via.placeholder.com/100' // Image URL for the exercise
  //    }
  //  ],
  //  duracion: 45, // Total duration of the routine in minutes
  //  descanso: 60, // Rest time between exercises in seconds
  //  numdia: [1, 3, 5], // Days on which the routine is performed (e.g., Monday, Wednesday, Friday)
  //  createdAt: '08/18/2024', // Creation date of the routine
  //  createdby: 1 // ID of the user who created the routine
  //};
  currDay = new Date().getDay()

  constructor(private photoService: PhotoService, private router: Router) {}

  ngOnInit() {
    this.routines = this.photoService.getRoutines()
    //this.routines = [this.routine, this.routine, this.routine]1
  }

  get todayRoutines(): any[]{
    return this.routines.filter(r => r.numdia.includes(this.currDay.toString()))
  }
  get tomorrowRoutines(): any[]{
    const nextDay = (this.currDay + 1) % 7;
    return this.routines.filter(r => r.numdia.includes(nextDay.toString()));
  }

  get otherRoutines(): any[]{
    const nextDay = (this.currDay + 1) % 7;
    return this.routines.filter(r => !r.numdia.includes(this.currDay.toString()) && !r.numdia.includes(nextDay.toString()));
  }

  viewRoutineDetails(routineId: number) {
    this.router.navigate([`/rutina/${routineId}`]); 
  }
}
