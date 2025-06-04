import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
  inject,
} from '@angular/core';
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
  private cdr = inject(ChangeDetectorRef);
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

  initializeObserver(): void {
    const fadeInRight = document.querySelectorAll('.fadeInRight');
    const fadeInUp = document.querySelectorAll('.fadeInUp');
    const fadeInLeft = document.querySelectorAll('.fadeInLeft');
    const fadeInDown = document.querySelectorAll('.fadeInDown');
    const elements = [
      ...Array.from(fadeInRight),
      ...Array.from(fadeInUp),
      ...Array.from(fadeInLeft),
      ...Array.from(fadeInDown),
    ];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    elements.forEach((el) => observer.observe(el));
  }

  findCoche(id: string | number): void {
    this.isLoading = true;
    this.cocheService.findCoche(id).subscribe((response: Coche) => {
      this.coche = response;
      setTimeout(() => {
        this.isLoading = false;
        this.cdr.detectChanges();
        this.initializeObserver();
      }, 1000);
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
