import { TestBed } from '@angular/core/testing';

import { AgenciaAzucarService } from './agencia-azucar.service';

describe('AgenciaAzucarService', () => {
  let service: AgenciaAzucarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AgenciaAzucarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
