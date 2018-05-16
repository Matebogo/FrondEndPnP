import { TestBed, inject } from '@angular/core/testing';

import { ManageAccountService } from './manage-account.service';

describe('ManageAccountService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ManageAccountService]
    });
  });

  it('should be created', inject([ManageAccountService], (service: ManageAccountService) => {
    expect(service).toBeTruthy();
  }));
});
