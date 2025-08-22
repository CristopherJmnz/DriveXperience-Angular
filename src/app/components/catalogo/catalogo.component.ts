import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil, finalize } from 'rxjs';
import { Coche } from 'src/app/interfaces/coche';
import { CocheService } from 'src/app/services/coche.service';

interface MarcaMap {
  [key: string]: number;
}

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CatalogoComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject<void>();

  public coches: Array<Coche> = [];
  public titulo: string = 'Todos los modelos';
  public marcaId: number | undefined;
  public isLoading = true;

  private readonly marcas: MarcaMap = {
    Lamborghini: 1,
    Bugatti: 2,
    Ferrari: 3,
    Koenigsegg: 4,
  };

  constructor(
    private readonly router: Router,
    private readonly cocheService: CocheService,
    private readonly route: ActivatedRoute,
    private readonly cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.subscribeToRouteParams();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private subscribeToRouteParams(): void {
    this.route.params
      .pipe(takeUntil(this.destroy$))
      .subscribe(params => {
        const marca = params['marca'];
        this.handleRouteChange(marca);
      });
  }

  private handleRouteChange(marca: string): void {
    if (marca && this.marcas[marca]) {
      this.titulo = `Modelos de ${marca}`;
      this.marcaId = this.marcas[marca];
      this.getCochesPorMarca(this.marcaId);
    } else {
      this.titulo = 'Todos los modelos';
      this.marcaId = undefined;
      this.getCoches();
    }
  }

  private getCoches(): void {
    this.setLoadingState(true);

    this.cocheService.getAllCoches()
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => this.setLoadingState(false))
      )
      .subscribe({
        next: (response: Array<Coche>) => {
          this.coches = response;
        },
        error: (error) => {
          console.error('Error loading cars:', error);
          this.coches = [];
        }
      });
  }

  private getCochesPorMarca(id: number): void {
    this.setLoadingState(true);

    this.cocheService.getCochesPorIdMarca(id)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => this.setLoadingState(false))
      )
      .subscribe({
        next: (response: Array<Coche>) => {
          this.coches = response;
        },
        error: (error) => {
          console.error('Error loading cars by brand:', error);
          this.coches = [];
        }
      });
  }

  public sortCochesMayorMenor(idMarca?: number): void {
    this.setLoadingState(true);

    const serviceCall = idMarca !== undefined
      ? this.cocheService.getCochesMayorMenor(idMarca)
      : this.cocheService.getCochesMayorMenor();

    serviceCall
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => this.setLoadingState(false))
      )
      .subscribe({
        next: (response: Array<Coche>) => {
          this.coches = response;
        },
        error: (error) => {
          console.error('Error sorting cars (high to low):', error);
        }
      });
  }

  public sortCochesMenorMayor(idMarca?: number): void {
    this.setLoadingState(true);

    const serviceCall = idMarca !== undefined
      ? this.cocheService.getCochesMenorMayor(idMarca)
      : this.cocheService.getCochesMenorMayor();

    serviceCall
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => this.setLoadingState(false))
      )
      .subscribe({
        next: (response: Array<Coche>) => {
          this.coches = response;
        },
        error: (error) => {
          console.error('Error sorting cars (low to high):', error);
        }
      });
  }

  private setLoadingState(loading: boolean): void {
    this.isLoading = loading;
    this.cdr.markForCheck();
  }
}
