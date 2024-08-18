import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage {
  constructor(private router: Router, private usuarioService: UsuarioService) {}

  imgPerfil = ''

  ngOnInit() {
    this.usuarioService.getUserProfile().subscribe(profile => {
      this.imgPerfil = profile.pictureUrl;
    });
  }
  logout() {
    this.router.navigate(['/login']);
  }
}
