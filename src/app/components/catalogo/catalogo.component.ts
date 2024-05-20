import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Coche } from 'src/app/interfaces/coche';
import { CocheService } from 'src/app/services/coche.service';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css']
})
export class CatalogoComponent {
  constructor(private router: Router, private cocheService: CocheService) { }

  coches! : Array<Coche>

  ngOnInit(): void {
    this.getCoches();
  }

  getCoches(){
    this.cocheService.getAllCoches().subscribe((response:Array<Coche>)=>{
      this.coches = response;
      console.log(response);
    });
  }
}
