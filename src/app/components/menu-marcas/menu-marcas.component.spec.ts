import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuMarcasComponent } from './menu-marcas.component';

describe('MenuMarcasComponent', () => {
  let component: MenuMarcasComponent;
  let fixture: ComponentFixture<MenuMarcasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MenuMarcasComponent]
    });
    fixture = TestBed.createComponent(MenuMarcasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
