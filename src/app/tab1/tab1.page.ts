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

  constructor(private photoService: PhotoService, private router: Router) {}

  ngOnInit() {
    this.routines = this.photoService.getRoutines(); // Obtener rutinas del servicio
  }

  viewRoutineDetails(routineId: number) {
    this.router.navigate([`/rutina/${routineId}`]); // Navegar a la página de detalles
  }
}
