import { LocalizationService } from './localization.service';
import { TranslateServiceMock } from './mocks/translateServiceMock';

describe('LocalizationService', () => 
{
  let mockService: TranslateServiceMock;
  let service: LocalizationService;

  beforeEach(() =>
  {
    mockService = new TranslateServiceMock();
    service = new LocalizationService(mockService);
  });

  it('should pass the correct arguments to the translate service and return the right value', () => 
  {
    mockService.returnValue = "Test translation"
    let params = { key: "value" };

    expect(service.execute("Testkey", params));
    expect(mockService.key).toBe("Testkey");
    expect(mockService.interpolateParams).toBe(params);
  });
});
