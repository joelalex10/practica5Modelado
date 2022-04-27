import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogClientesEstadosComponent } from './dialog-clientes-estados.component';

describe('DialogClientesEstadosComponent', () => {
  let component: DialogClientesEstadosComponent;
  let fixture: ComponentFixture<DialogClientesEstadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogClientesEstadosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogClientesEstadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
