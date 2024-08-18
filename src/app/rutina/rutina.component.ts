import { Component, OnInit } from '@angular/core';
import { PhotoService } from '../servicios/photo.service';
import { ActivatedRoute, Router } from '@angular/router';

interface Rutina {
  id: number
  nombre: string
  img: string
  ejercicios: [
    {
      id: number,
      nombre: string
      img: string
      series: number,
      repeticiones: number,
      serieActual: number,
      descripcion: number
    }
  ],
  duracion: number,
  descanso: number,
  numdia: [number],
  createdAt: string,
  createdby: number,
}
@Component({
  selector: 'app-rutina',
  templateUrl: './rutina.component.html',
  styleUrls: ['./rutina.component.scss'],
})
export class RutinaComponent implements OnInit {
  //rutina = {
  //  id: 1,
  //  nombre: 'Día de pierna',
  //  img: 'https://via.placeholder.com/150',
  //  ejercicios: [
  //    { id: 1, series: 3, repeticiones: 12, serieActual: 1 },
  //    { id: 2, series: 4, repeticiones: 10, serieActual: 1 },
  //    { id: 3, series: 2, repeticiones: 8, serieActual: 1 }
  //  ],
  //  duracion: 120,
  //  descanso: 5,
  //  numdia: [1, 4],
  //  createdAt: '15/08/2024',
  //  createdby: 1,
  //};
  rutina: Rutina = {
    id: 0,
    nombre: "",
    img: "",
    ejercicios: [
      {
        id: 0,
        nombre: "",
        img: '',
        series: 0,
        repeticiones: 0,
        serieActual: 1,
        descripcion: 0
      }
    ],
    duracion: 0,
    descanso: 0,
    numdia: [0],
    createdAt: "",
    createdby: 0,
  };

  //ejercicios = [
  //  {
  //    id: 1,
  //    nombre: "Sentadillas",
  //    descripcion: "Ejercicio para piernas y glúteos.",
  //    img: 'https://via.placeholder.com/150',
  //    musculos: ["Cuadriceps" , "Gluteos"],
  //    createdAt: "15/08/2024",
  //    createdby: 1
  //  },
  //  {
  //    id: 2,
  //    nombre: "Press de banca",
  //    descripcion: "Ejercicio para el tren superior",
  //    img: 'https://via.placeholder.com/150',
  //    musculos: ["Pecho" , "Hombros", "Triceps"],
  //    createdAt: "15/08/2024",
  //    createdby: 1
  //  },
  //  {
  //    id: 3,
  //    nombre: "Pull up",
  //    descripcion: "Ejercicio para la espalda",
  //    img: 'https://via.placeholder.com/150',
  //    musculos: ["Espalda alta", "Biceps"],
  //    createdAt: "15/08/2024",
  //    createdby: 1
  //  },
  //]

  totalTime = 0;
  totalTimeInterval: any;
  selectedTab = 0;
  remainingTime: number = 0;
  showTimer = false;
  isTimerStopped = false;
  timerInterval: any;

  isRoutineComplete = false;

  get remainingTimeMinutes(): number {
    return Math.floor(this.remainingTime / 60);
  }

  get remainingTimeSeconds(): number {
    return this.remainingTime % 60;
  }

  get totalTimeMinutes(): number {
    return Math.floor(this.totalTime / 60);
  }

  get totalTimeSeconds(): number {
    return this.totalTime % 60;
  }

  constructor(private photoService: PhotoService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.startTotalTimeTimer();
    this.route.params.subscribe(params => {
      const id = params['id']; // 'id' should match the name in your route
      const rutina = this.photoService.getRoutines(id)
      if(!rutina){
        this.router.navigate(['/tabs/tab1'])
      }
      const newEjercicios = rutina.ejercicios.map((e: any) => {
        return { ...e, serieActual: 1 }
      })
      rutina.ejercicios = newEjercicios
      console.log(newEjercicios, rutina.ejercicios)
      this.rutina = rutina
      console.log(rutina)
    });
  }

  startTotalTimeTimer() {
    this.totalTimeInterval = setInterval(() => {
      this.totalTime += 1;
    }, 1000);
  }

  startRestTimer(isBetweenExercises: boolean = false) {
    if (!this.isTimerStopped) {
      this.remainingTime = this.rutina.descanso
    }
    this.isTimerStopped = false;
    this.showTimer = true;
    this.timerInterval = setInterval(() => {
      if (this.remainingTime > 0) {
        this.remainingTime--;
      } else {
        this.skipTimer(isBetweenExercises);
      }
    }, 1000);
  }

  add10Seconds() {
    this.remainingTime += 10;
  }

  remove10Seconds() {
    if (this.remainingTime - 10 > 0) {
      this.remainingTime -= 10;
    } else {
      this.remainingTime = 0;
    }
  }

  stopRestTimer() {
    clearInterval(this.timerInterval);
    this.isTimerStopped = true;
  }

  stopTotalTimer() {
    clearInterval(this.totalTimeInterval);
  }

  skipTimer(isBetweenExercises: boolean = false) {
    clearInterval(this.timerInterval);
    this.showTimer = false;

    if (isBetweenExercises) {
      this.selectedTab++;
    } else {
      const ejercicioActual = this.rutina.ejercicios[this.selectedTab];
      ejercicioActual.serieActual++;

      if (ejercicioActual.serieActual <= ejercicioActual.series) {
        // Esperar la interacción del usuario para comenzar la siguiente serie
        console.log("Serie completada. Inicia la siguiente serie cuando estés listo.");
      } else {
        // Avanzar al siguiente ejercicio después de completar todas las series
        this.nextExercise();
      }
    }
  }

  nextSeries() {
    const ejercicioActual = this.rutina.ejercicios[this.selectedTab];
    if (ejercicioActual.serieActual < ejercicioActual.series) {
      this.startRestTimer(false); // Iniciar descanso entre series
    } else {
      this.nextExercise();
    }
  }

  nextExercise() {
    if (this.selectedTab < this.rutina.ejercicios.length - 1) {
      this.startRestTimer(true); // Descanso entre ejercicios
    } else {
      this.stopTotalTimer();
      this.isRoutineComplete = true;
    }
  }
}
