import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private afAuth: AngularFireAuth, private router: Router) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    console.log('Checking authentication status...');
    return this.afAuth.authState.pipe(
      map(user => !!user),
      tap(isAuthenticated => {
        console.log('Is authenticated:', isAuthenticated);
        if (!isAuthenticated) {
          this.router.navigate(['/login']);
      }
    })
  );
}
}

