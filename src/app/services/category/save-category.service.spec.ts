import { TestBed } from '@angular/core/testing';
import { SaveCategoryService } from './save-category.service';

describe('SaveCategoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SaveCategoryService = TestBed.get(SaveCategoryService);
    expect(service).toBeTruthy();
  });
});
