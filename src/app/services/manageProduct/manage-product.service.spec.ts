import { TestBed, inject } from '@angular/core/testing';
import { ManageProductService } from './manageProduct';



describe('ManageProductService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ManageProductService]
    });
  });

  it('should be created', inject([ManageProductService], (service: ManageProductService) => {
    expect(service).toBeTruthy();
  }));
});
