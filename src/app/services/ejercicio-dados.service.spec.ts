import { TestBed } from '@angular/core/testing';

import { EjercicioDadosService } from './ejercicio-dados.service';

describe('EjercicioDadosService', () => {
  let service: EjercicioDadosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EjercicioDadosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
