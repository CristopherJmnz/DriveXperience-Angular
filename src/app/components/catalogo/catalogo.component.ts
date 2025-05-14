import { Component } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { Coche } from 'src/app/interfaces/coche';
import { CocheService } from 'src/app/services/coche.service';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css'],
})
export class CatalogoComponent {
  constructor(private router: Router,
     private cocheService: CocheService,
     private route: ActivatedRoute) {}

  public coches!: Array<Coche>;
  public marcas:any = {
    Lamborghini: 1,
    Bugatti: 2,
    Ferrari: 3,
    Koenigsegg: 4,
  };
  public titulo: string = 'Todos los modelos';
  public marcaId!: number;
  isLoading = true;

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const marca = params['marca'];
      if (marca) {
        this.titulo = `Modelos de ${marca}`;
        this.marcaId = this.marcas[marca];
        if (this.marcaId) {
          this.getCochesPorMarca(this.marcaId);
        } else {
          this.getCoches();
        }
      } else {
        this.titulo = 'Todos los modelos';
        this.getCoches();
      }
    });
  }
  getCoches() {
    this.isLoading = true;
    this.cocheService.getAllCoches().subscribe((response: Array<Coche>) => {
      this.coches = response;
      this.isLoading = false;
    });
  }

  getCochesPorMarca(id:number | string){
    this.isLoading = true;
    this.cocheService.getCochesPorIdMarca(id).subscribe((response: Array<Coche>) => {
      this.coches = response;
      this.isLoading = false;
    });
  }

  sortCochesMayorMenor(idMarca?: number){
    this.isLoading = true;
    if (idMarca) {
      this.cocheService.getCochesMayorMenor(idMarca).subscribe((response: Array<Coche>) => {
        this.coches = response;
        this.isLoading = false;
      });
    }
    else{
      this.cocheService.getCochesMayorMenor().subscribe((response: Array<Coche>) => {
        this.coches = response;
        this.isLoading = false;
      });
    }
  }
  sortCochesMenorMayor(idMarca?: number) {
    this.isLoading = true;
    if (idMarca) {
      this.cocheService.getCochesMenorMayor(idMarca).subscribe((response: Array<Coche>) => {
        this.coches = response;
        this.isLoading = false;
      });
    } else {
      this.cocheService.getCochesMenorMayor().subscribe((response: Array<Coche>) => {
        this.coches = response;
        this.isLoading = false;
      });
    }
  }


}
