import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private userProfileSubject = new BehaviorSubject({
    pictureUrl: 'https://via.placeholder.com/150',
    name: 'John Doe',
    email: 'john.doe@example.com',
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
