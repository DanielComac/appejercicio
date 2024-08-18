import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private userProfileSubject = new BehaviorSubject({
    pictureUrl: '',
    name: 'Mi usuario',
    email: 'ejemplo@gmail.com',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum.'
  });

  getUserProfile() {
    return this.userProfileSubject.asObservable();
  }

  updateUserProfile(profile: Partial<{ pictureUrl: string; name: string; email: string; bio: string }>) {
    const updatedProfile = { ...this.userProfileSubject.value, ...profile };
    this.userProfileSubject.next(updatedProfile);
  }
  constructor() { }
}
