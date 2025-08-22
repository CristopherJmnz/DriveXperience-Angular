import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CochesCardsComponent } from './coches-cards.component';

describe('CochesCardsComponent', () => {
  let component: CochesCardsComponent;
  let fixture: ComponentFixture<CochesCardsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CochesCardsComponent]
    });
    fixture = TestBed.createComponent(CochesCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
