import { TestBed, inject } from '@angular/core/testing';

import { ManageCustomerService } from './manage-customer.service';

describe('ManageCustomerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ManageCustomerService]
    });
  });

  it('should be created', inject([ManageCustomerService], (service: ManageCustomerService) => {
    expect(service).toBeTruthy();
  }));
});
