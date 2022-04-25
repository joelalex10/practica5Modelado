import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogContentEstadosComponent } from './dialog-content-estados.component';

describe('DialogContentEstadosComponent', () => {
  let component: DialogContentEstadosComponent;
  let fixture: ComponentFixture<DialogContentEstadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogContentEstadosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogContentEstadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
