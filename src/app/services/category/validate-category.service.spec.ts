import { CategoryModel } from 'src/app/models/categories/categoryModel';
import { LocalizationServiceMock } from './../mocks/localizationServiceMock';
import { ValidateCategoryService } from './validate-category.service';
import { MessageKind } from 'src/app/messageKind';

describe('ValidateCategoryService', () => 
{
  let mockService: LocalizationServiceMock;
  let service: ValidateCategoryService;

  beforeEach(() =>
  {
    mockService = new LocalizationServiceMock();
    service = new ValidateCategoryService(mockService);
  });

  it("should return no error when the category is valid", () => 
  {
    const model = new CategoryModel("test-id", "test-title");

    const result = service.execute(model);

    expect(result.keys.length).toBe(0);
  });

  it("should return error when the title is empty", () => 
  {
    const model = new CategoryModel("test-id");
    mockService.returnValue = "test-error";

    const result = service.execute(model);

    expect(result.keys.length).toBe(1);
    expect(mockService.names[0]).toBe(MessageKind.RequiredField);
    expect(result["title"]).toBe("test-error");
  });
});
