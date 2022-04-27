import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogClientesEstadosComprasComponent } from './dialog-clientes-estados-compras.component';

describe('DialogClientesEstadosComprasComponent', () => {
  let component: DialogClientesEstadosComprasComponent;
  let fixture: ComponentFixture<DialogClientesEstadosComprasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogClientesEstadosComprasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogClientesEstadosComprasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
