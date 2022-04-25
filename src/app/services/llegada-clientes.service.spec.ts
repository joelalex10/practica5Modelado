import { TestBed } from '@angular/core/testing';

import { LlegadaClientesService } from './llegada-clientes.service';

describe('LlegadaClientesService', () => {
  let service: LlegadaClientesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LlegadaClientesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
