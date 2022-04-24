import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EjercicioDadosComponent } from './ejercicio-dados.component';

describe('EjercicioDadosComponent', () => {
  let component: EjercicioDadosComponent;
  let fixture: ComponentFixture<EjercicioDadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EjercicioDadosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EjercicioDadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
