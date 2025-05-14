import { Component, OnInit, inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Coche } from 'src/app/interfaces/coche';
import { CocheService } from 'src/app/services/coche.service';
import { DataSharingService } from 'src/app/services/data-sharing.service';

@Component({
  selector: 'app-detalles-coche',
  templateUrl: './detalles-coche.component.html',
  styleUrls: ['./detalles-coche.component.css'],
})
export class DetallesCocheComponent implements OnInit {
  private activatedRoute = inject(ActivatedRoute);
  coche!: Coche;
  idcoche!: string | number;
  showModal: boolean = false;
  isLoading: boolean = true;

  constructor(
    private router: Router,
    private cocheService: CocheService,
    private dataSharingService: DataSharingService
  ) {}

  ngOnInit(): void {
    this.idcoche = this.activatedRoute.snapshot.params['id'];
    this.findCoche(this.idcoche);
  }

  findCoche(id: string | number): void {
    this.isLoading = true;
    this.cocheService.findCoche(id).subscribe((response: Coche) => {
      this.coche = response;
      setTimeout(() => {
      this.isLoading = false;
    }, 2500);
    });
  }

  handleModal(): void {
    this.showModal = !this.showModal;
  }

  onSubmit(form: NgForm) {
    const formData = form.value;
    this.dataSharingService.setFormData(formData);
    this.router.navigate(['/reservar']);
  }
}
