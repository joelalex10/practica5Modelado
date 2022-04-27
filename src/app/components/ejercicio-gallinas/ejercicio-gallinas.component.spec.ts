import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EjercicioGallinasComponent } from './ejercicio-gallinas.component';

describe('EjercicioGallinasComponent', () => {
  let component: EjercicioGallinasComponent;
  let fixture: ComponentFixture<EjercicioGallinasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EjercicioGallinasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EjercicioGallinasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
