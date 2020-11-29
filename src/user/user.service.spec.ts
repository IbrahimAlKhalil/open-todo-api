import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { UserService } from './user.service';
import { Gender, User } from './user.entity';

describe('UserService', () => {
  let userRepo: Repository<User>;
  let service: UserService;
  const data = {
    firstName: 'Ibrahim',
    lastName: 'Al Khalil',
    username: 'IbrahimAlKhalil',
    email: 'dummyemail@dummy.com',
    password: '!234567$',
    gender: Gender.male,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            create: jest.fn(() => data),
            save: jest.fn(),
            findOne: jest.fn(() => Promise.resolve(data)),
          },
        },
      ],
    }).compile();

    service = module.get(UserService);
    userRepo = module.get(
      getRepositoryToken(User),
    );
  });

  describe('.create()', () => {
    it('should use Transactional Entity Manager if given', async () => {
      const trxRepo = {
        save: jest.fn(),
        create: jest.fn(() => data),
      };

      const entityManager = {
        getRepository() {
          return trxRepo;
        },
      };

      await service.create(data, entityManager as unknown as EntityManager);

      expect(trxRepo.save).toBeCalledWith(data);
    });

    it('should create user', async () => {
      await service.create(data);

      expect(userRepo.save).toBeCalledWith(data);
    });
  });

  describe('.findOne()', () => {
    it('should find the user by email', async () => {
      await service.findOne(data.email);

      expect(userRepo.findOne).toBeCalledWith({
        where: {
          email: data.email,
        },
      });
    });

    it('should find the user by id', async () => {
      const id = 1;
      await service.findOne(id);

      expect(userRepo.findOne).toBeCalledWith({
        where: { id },
      });
    });
  });
});
