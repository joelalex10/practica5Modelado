import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgenciaAzucarComponent } from './agencia-azucar.component';

describe('AgenciaAzucarComponent', () => {
  let component: AgenciaAzucarComponent;
  let fixture: ComponentFixture<AgenciaAzucarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgenciaAzucarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgenciaAzucarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
