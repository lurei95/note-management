import { CategoryModel } from 'src/app/models/categories/categoryModel';
import { FilterCategoriesService } from './filter-categories.service';

describe('FilterCategoriesService', () => 
{
  let service: FilterCategoriesService;
  let items: CategoryModel[];

  beforeEach(() => 
  {
    service = new FilterCategoriesService();
    items = [new CategoryModel("1", "aaabbbccc"), new CategoryModel("2", "dddeeefff")]
  });

  it('should return all elements if search text empty', () => 
  {
    let result = service.filter(items, "", "1");

    items.forEach(item => expect(result).toContain(item));
  });

  it('should return all elements that contain the search text', () => 
  {
    let result = service.filter(items, "aa", "1");

    expect(result).toContain(items[0]);
  });

  it('should return selected category even when not containing the search text', () => 
  {
    let result = service.filter(items, "test123", "1");

    expect(result).toContain(items[0]);
  });
});