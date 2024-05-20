import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Coche } from 'src/app/interfaces/coche';
import { CocheService } from 'src/app/services/coche.service';

@Component({
  selector: 'app-detalles-coche',
  templateUrl: './detalles-coche.component.html',
  styleUrls: ['./detalles-coche.component.css'],
})
export class DetallesCocheComponent implements OnInit {
  private activatedRoute = inject(ActivatedRoute);
  coche!: Coche;
  idcoche!: string | number;
  showModal:boolean = false;


  constructor(private router: Router, private cocheService: CocheService) {}

  ngOnInit(): void {
    this.idcoche = this.activatedRoute.snapshot.params['id'];
    this.findCoche(this.idcoche);
  }

  findCoche(id: string | number): void {
    this.cocheService.findCoche(id).subscribe((response: Coche) => {
      this.coche = response;
    });
  }

  handleModal(): void {
    this.showModal = !this.showModal;
    console.log(this.showModal);
  }

  guardarFechas():void{

  }


}
