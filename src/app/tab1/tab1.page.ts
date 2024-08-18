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
  currDay = new Date().getDay()

  constructor(private photoService: PhotoService, private router: Router) {}

  ngOnInit() {
    this.routines = this.photoService.getRoutines()
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
