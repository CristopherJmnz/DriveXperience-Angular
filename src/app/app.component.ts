import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'DriveXperience-Angular';

   constructor(private router: Router) {}

  ngOnInit(): void {
    // Escuchar el evento NavigationEnd para mover el scroll hacia arriba
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0); // Mover el scroll al inicio de la página
      }
    });
  }
}
