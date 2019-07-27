import { CategoryAction } from './../../redux/actions/category/categoryAction';
import { StoreMock } from '../mocks/storeMock';
import { CategoryActionKind } from 'src/app/redux/actions/category/categoryActionKind';
import { AddCategoryService } from './add-category.service';
import { nullOrEmpty } from 'src/app/util/utility';

describe('AddCategoryService', () =>
{
  let storeMock: StoreMock;
  let service: AddCategoryService;

  beforeEach(() =>
  {
    storeMock = new StoreMock();
    service = new AddCategoryService(storeMock);
  });

  it('category should be added', () => 
  {
    service.execute();
    
    let action = (storeMock.dispatchedActions[0] as CategoryAction);
    expect(action.type).toBe(CategoryActionKind.CategoryAdd);
    expect(!nullOrEmpty(action.payload.id)).toBe(true);
    expect(action.payload.isEditing).toBe(true);
  });
});
