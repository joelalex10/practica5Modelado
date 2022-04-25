import { TestBed } from '@angular/core/testing';

import { EjercicioGallinasService } from './ejercicio-gallinas.service';

describe('EjercicioGallinasService', () => {
  let service: EjercicioGallinasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EjercicioGallinasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
