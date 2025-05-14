import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkeletonCocheCardComponent } from './skeleton-coche-card.component';

describe('SkeletonCocheCardComponent', () => {
  let component: SkeletonCocheCardComponent;
  let fixture: ComponentFixture<SkeletonCocheCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SkeletonCocheCardComponent]
    });
    fixture = TestBed.createComponent(SkeletonCocheCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
