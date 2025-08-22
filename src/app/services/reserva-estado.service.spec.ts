import { TestBed } from '@angular/core/testing';
import { ReservaEstadoService } from './reserva-estado.service';

describe('ReservaEstadoService', () => {
  let service: ReservaEstadoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReservaEstadoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
