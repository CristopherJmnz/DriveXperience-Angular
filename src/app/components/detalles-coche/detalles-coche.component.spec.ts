import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallesCocheComponent } from './detalles-coche.component';

describe('DetallesCocheComponent', () => {
  let component: DetallesCocheComponent;
  let fixture: ComponentFixture<DetallesCocheComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetallesCocheComponent]
    });
    fixture = TestBed.createComponent(DetallesCocheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
