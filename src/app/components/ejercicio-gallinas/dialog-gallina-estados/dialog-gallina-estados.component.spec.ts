import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogGallinaEstadosComponent } from './dialog-gallina-estados.component';

describe('DialogGallinaEstadosComponent', () => {
  let component: DialogGallinaEstadosComponent;
  let fixture: ComponentFixture<DialogGallinaEstadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogGallinaEstadosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogGallinaEstadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
