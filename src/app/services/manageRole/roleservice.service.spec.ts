import { TestBed, inject } from '@angular/core/testing';

import { RoleserviceService } from './roleservice.service';

describe('RoleserviceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RoleserviceService]
    });
  });

  it('should be created', inject([RoleserviceService], (service: RoleserviceService) => {
    expect(service).toBeTruthy();
  }));
});
