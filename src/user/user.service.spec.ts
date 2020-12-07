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
            update: jest.fn(),
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
    it('should use given entity manager', async () => {
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

  describe('.update()', () => {
    const data = { firstName: 'Ibrahim Al Khalil' };
    const id = 1;

    it('should use given entity manager', async () => {
      const trxRepo = {
        update: jest.fn(),
      };

      const entityManager = {
        getRepository() {
          return trxRepo;
        },
      };

      await service.update(id, data, entityManager as unknown as EntityManager);
      expect(trxRepo.update).toBeCalled();
    });

    it('should update user', async () => {
      await service.update(id, data);
      expect(userRepo.update).toBeCalledWith(id, data);
    });
  });

  describe('static .getIdentityColumnNameByValue()', () => {
    it('should return email', async () => {
      expect(
        (UserService as any).getIdentityColumnNameByValue(data.email),
      ).toBe('email');
    });

    it('should return id', async () => {
      expect(
        (UserService as any).getIdentityColumnNameByValue(1),
      ).toBe('id');
    });

    it('should return username', async () => {
      expect(
        (UserService as any).getIdentityColumnNameByValue('IbrahimAlKhalil'),
      ).toBe('username');
    });
  });
});
