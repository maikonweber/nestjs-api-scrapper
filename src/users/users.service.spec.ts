import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;
  let mockUserService: Record<string, jest.Mock>;

  beforeEach(async () => {
    const mockUserService = {
      findAll: jest.fn(),
      findOne: jest.fn()
    }

    const module: TestingModule = await Test.createTestingModule({
      providers: [{ provide: UsersService, useValue: mockUserService }],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return an array of users', async () => {
    // Configurar o comportamento do mock para a função findAll
    const mockUsers = [{ id: 1, name: 'John' }, { id: 2, name: 'Jane' }];
    mockUserService.findAll.mockReturnValue(mockUsers);

    // Chamar a função no serviço e verificar o resultado
    const result = await service.findAll();

    expect(result).toEqual(mockUsers);
    expect(mockUserService.findAll).toHaveBeenCalled();
  });
});
