import { TestBed, inject } from '@angular/core/testing';

import { ManageBankService } from './manage-bank.service';

describe('ManageBankService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ManageBankService]
    });
  });

  it('should be created', inject([ManageBankService], (service: ManageBankService) => {
    expect(service).toBeTruthy();
  }));
});
