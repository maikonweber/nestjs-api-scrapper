import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getUsers', () => {
    it('should return an array of users', async () => {
      const mockUsers = [{ id: 1, name: 'John' }, { id: 2, name: 'Jane' }];

      // Configurar o comportamento do mock para a função findAll do UsersService
      jest.spyOn(usersService, 'findAll').mockResolvedValue(mockUsers);

      // Chamar a função no controlador e verificar o resultado
      const result = await controller.findAll();

      expect(result).toEqual(mockUsers);
    });
  });
