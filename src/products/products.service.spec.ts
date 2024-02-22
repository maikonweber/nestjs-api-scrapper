import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';

describe('ProductsService', () => {
  let service: ProductsService;
  let mockProductService: Record<string, jest.Mock>;

  beforeEach(async () => {
    const mockProductService = {
      create: jest.fn()
    }

    const module: TestingModule = await Test.createTestingModule({
      providers: [{ provide: ProductsService, useValue: mockProductService }],

    }).compile();

    service = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it("Should create a product", async () => {
    const productData = {
      name: "Camisa",
      type: "Camisa",
      color: "Vermelha",
      price: 35.00,
      url: "https://"
    }

    const createdProduct = await service.create(productData);

    // Assert that the created product matches the expected data
    expect(createdProduct).toEqual(productData);
  })
});
