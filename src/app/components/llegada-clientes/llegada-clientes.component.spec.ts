import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LlegadaClientesComponent } from './llegada-clientes.component';

describe('LlegadaClientesComponent', () => {
  let component: LlegadaClientesComponent;
  let fixture: ComponentFixture<LlegadaClientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LlegadaClientesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LlegadaClientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
