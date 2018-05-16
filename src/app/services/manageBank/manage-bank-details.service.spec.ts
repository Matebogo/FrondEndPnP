import { TestBed, inject } from '@angular/core/testing';

import { ManageBankDetailsService } from './manage-bank-details.service';

describe('ManageBankDetailsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ManageBankDetailsService]
    });
  });

  it('should be created', inject([ManageBankDetailsService], (service: ManageBankDetailsService) => {
    expect(service).toBeTruthy();
  }));
});
